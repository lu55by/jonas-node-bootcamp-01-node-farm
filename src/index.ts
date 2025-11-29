import fs from 'fs';
import * as http from "node:http";

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

// Create server using http
const server = http.createServer((req, res) => {
    console.log('Request received.');
    res.end('Hello from server');
});

// Listen on port 8000
server.listen(8000, 'localhost', () => {
// server.listen(8000, '127.0.0.1', () => {
    console.log('Server listening on port http://localhost:8000');
});
