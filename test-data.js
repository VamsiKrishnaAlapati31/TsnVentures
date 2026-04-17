const fs = require('fs');
const content = fs.readFileSync('js/venture-data.js', 'utf8');
eval(content);

console.log("Keys available in VENTURES:");
console.log(Object.keys(VENTURES));

const id = 'green-valley';
console.log("\nChecking id:", id);
console.log(VENTURES[id] ? "Found" : "Not Found");
