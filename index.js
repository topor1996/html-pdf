
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
            item1: "Shangri-La Rasa Sentosa (5 x nights)",
            itemdesc1: "1 x Deluxe Sea View Room BB",
            item2: "Shangri-La Rasa Sentosa (5 x nights)",
            itemdesc2: "1 x Deluxe Sea View Room BB",
            item3: "Hotel Ritz Carlton Singapore (5 x nights)",
            itemdesc3: "1 x Deluxe Kallang DBL room ABF",
            item4: "Hotel Ritz Carlton Singapore (5 x nights)",
            itemdesc4: "1 x Deluxe Kallang DBL room ABF",
            item5: "E-Visa Singapore",
            itemdesc5: "",
            quantity: 1,
            price: 66,
            price1: 2349,
            qty1: 1,
            sum1: 2349 * 1,
            price2: 2349,
            qty2: 1,
            sum2: 2349 * 1,
            price3: 2930,
            qty3: 1,
            sum3: 2930 * 1,
            price4: 5829,
            qty4: 1,
            sum4: 5829*1,
            price5: 80,
            qty5: 5,
            sum5: 80 * 5,
            currency: "BTC",
            product: "Вундер-Вафля (меч, серебро)",
            units: "штука",
            accountusd: "601-486038-201",
			accountname: "Marina Bay Travel Pte. Ltd.",
			bankname: "OCBC Limited",
			bankaddress: "65 Chulia Street OCBC Centre, Singapore",
			swiftcode: "OCBCSGSG",
            paybefore: "17 Jul 2022",
            result: "13,857"
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