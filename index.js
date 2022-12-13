
const http = require('http');
const fs = require('fs');
const port = 8080;
const htmlPdf = require('html-pdf');
const ejs = require('ejs');

const requestHandler = (request, response) => {

    if (request.url.indexOf('.') != -1){

        response.end(fs.readFileSync(__dirname + request.url));

    } else {

        let date = new Date();
        let month = date.getMonth() + 1;
        month = (month < 10 ? '0' + month : month);
        let day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        date = day + '.' + month + '.' + date.getFullYear();

        const params = {
            name: "Аида Дроган",
            email: "business@marinabaytravel.sg",
            id: "127001",
            number: "2022-09-1525",
            tel: "+65 9830 3900",
            address: "Block 113A, Mcnair Rd, #29-284, Singapore 322113,",
            company: "Marina Bay Travel Pte Ltd",
            logo: "https://i.yapx.ru/UKyo0.png",
            back: "https://i.yapx.ru/UK1Yr.jpg",
            date: date,
            billto: "JSP Business Travel Company",
            item1: ["24.12-29.12","Shangri-La Rasa Sentosa (5 x nights)", "1 x Deluxe Sea View Room BB", "2349", "1"],
            item2: ["29.12-03.01","Shangri-La Rasa Sentosa (5 x nights)", "1 x Deluxe Sea View Room BB", "2349", "1"],
            item3: ["29.12-03.01","Hotel Ritz Carlton Singapore (5 x nights)", "1 x Deluxe Kallang DBL room ABF", "2930", "1"],
            item4: ["29.12-03.01","Hotel Ritz Carlton Singapore (5 x nights)", "1 x Deluxe Kallang DBL room ABF", "5829", "1"],
            item5: ["---","E-Visa Singapore", "", "80", "5"],
            currency: "BTC",
            accountusd: "601-486038-201",
			accountname: "Marina Bay Travel Pte. Ltd.",
			bankname: "OCBC Limited",
			bankaddress: "65 Chulia Street OCBC Centre, Singapore",
			swiftcode: "OCBCSGSG",
            paybefore: "17 Jul 2022"
        };

        


        ejs.renderFile(__dirname + '/template.ejs', params, (err, html) => {

            const options = { format: 'A4'};
            const fileName = __dirname + '/file.pdf';

            const renderHtml = html.replace(/img src=\"\//g, 'img src="file://' + __dirname + "/");

            htmlPdf.create(renderHtml, options).toFile(fileName, (err) => {

                if (err) {
                    console.log('Ошибка конвертации', err)
                }

                response.end(html);
            });

        })
    }

};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {

    if (err) {
        return console.log('Ошибка сервера', err)
    }

    console.log(`Вишу на порту ${port}`);
});