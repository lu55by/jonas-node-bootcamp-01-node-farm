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
const productDataStr: string = fs.readFileSync(`${rootDir}/dev-data/data.json`, 'utf-8');
const productsData: Product[] = JSON.parse(productDataStr);
console.log('Read and parsed products data -> ', productsData);

// Create server using http
const server = http.createServer((req, res) => {
    console.log('Request received.');
    const pathName = req.url;
    console.log('url -> ', pathName);
    if (pathName === '/' || pathName === '/overview') {
        res.end('Overview page');
    } else if (pathName === '/product') {
        res.end('Product page');
    } else if (pathName === '/api') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(productDataStr);
    } else {
        res.writeHead(404, {'Content-Type': 'text/html', 'My-Custom-Header': 'value'});
        res.end('<h1>Page Not Found!</h1>');
    }
    res.end('Hello from server');
});

// Listen on port 8000
server.listen(PORT, 'localhost', () => {
// server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});
