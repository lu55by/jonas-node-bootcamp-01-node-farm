import fs from 'fs';

// Read file sync using fs
const fileInput = fs.readFileSync('txt/input.txt', 'utf8');
console.log('fileInput -> ', fileInput);

const outputContent = `This is what we know about the avocado: ${fileInput}.\nCreated on ${Date.now()}`;
fs.writeFileSync('txt/output.txt', outputContent);