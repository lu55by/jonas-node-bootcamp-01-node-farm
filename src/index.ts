import fs from 'fs';
import * as http from "node:http";
import type {Product} from "./types/index.js";
import {fileURLToPath} from 'url';
import * as path from "node:path";

const PORT = 8000;
const __filename = fileURLToPath(import.meta.url);
// Current dir of the file
const __dirname = path.dirname(__filename);
// Root dir
const rootDir = path.join(__dirname, '..');

///////////////////////////////////////////
// FILE

// Read and write file sync (Blocking)
// const fileInput = fs.readFileSync('txt/input.txt', 'utf8');
// console.log('fileInput -> ', fileInput);
// const outputContent = `This is what we know about the avocado: ${fileInput}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('txt/output.txt', outputContent);
// console.log('File Written');

// Read file async (Non-blocking)
// fs.readFile('txt/start2.txt', "utf-8", (err, data1) => {
//     if (err) {
//         console.error("ERROR: readFileSync failed -> \n", err.message);
//         return;
//     }
//     console.log('data1 ->', data1);
//     fs.readFile(`txt/${data1}.txt`, "utf-8", (err, data2) => {
//         console.log('data2 ->', data2);
//         fs.readFile(`txt/append.txt`, "utf-8", (err, data3) => {
//             console.log('data3 ->', data3);
//             fs.writeFile('txt/final.txt', `${data2}\n${data3}`, "utf-8", (err) => {
//                 if (!err) console.log('File Written');
//             });
//         })
//     })
// })
// console.log('Reading and writing start...');

/////////////////////////////////////////
// SERVER

// Read the product data with fs.readFileSync at the top level
const templateOverviewHtml: string = fs.readFileSync(`${rootDir}/templates/template-overview.html`, 'utf8');
const templateCardHtml: string = fs.readFileSync(`${rootDir}/templates/template-card.html`, 'utf8');
const templateProductHtml: string = fs.readFileSync(`${rootDir}/templates/template-product.html`, 'utf8');
const productDataStr: string = fs.readFileSync(`${rootDir}/dev-data/data.json`, 'utf-8');
const productsData: Product[] = JSON.parse(productDataStr);
console.log('Read and parsed products data Len ->', productsData.length);

function replaceHtmlContent(templateCard: string, product: Product) {
    const {id, productName, image, organic, quantity, price} = product;
    let rs: string = templateCard.replace(/{%ID%}/g, id.toString());
    rs = rs.replace(/{%PRODUCT_NAME%}/g, productName);
    rs = rs.replace(/{%PRODUCT_IMAGE%}/g, image);
    rs = rs.replace(/{%NOT_ORGANIC%}/g, organic ? '' : 'not-organic');
    rs = rs.replace(/{%PRODUCT_QUANTITY%}/g, quantity);
    rs = rs.replace(/{%PRODUCT_PRICE%}/g, price);
    return rs;
}

// Create server using http
const server = http.createServer((req, res) => {
    try {
        console.log('Request received.');
        const pathName = req.url;
        console.log('url -> ', pathName);

        if (pathName === '/' || pathName === '/overview') {
            // Loop through and replace the specific placeholder in the templateCardHtml with read product obj props.
            const templateCardsHtml: string = productsData.map((product: Product): string => replaceHtmlContent(templateCardHtml, product)).join('');
            // Replace specific placeholder in the templateOverviewHtml with replaced templateCardsHtml
            const replacedTemplateOverview: string = templateOverviewHtml.replace(/{%PRODUCT_CARDS%}/g, templateCardsHtml);

            // Send the final html
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(replacedTemplateOverview);

        } else if (pathName === '/product') {
            res.end('Product page');

        } else if (pathName === '/api') {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(productDataStr);

        } else {
            res.writeHead(404, {'Content-Type': 'text/html', 'My-Custom-Header': 'value'});
            res.end('<h1>Page Not Found!</h1>');
        }
    } catch (e) {
        console.error(e);
    }
});

// Listen on port 8000
server.listen(PORT, 'localhost', () => {
// server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});
