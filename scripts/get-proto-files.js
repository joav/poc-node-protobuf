const fs = require('fs');
const path = require('path');

const result = fs.readdirSync(path.join(__dirname, '..', 'proto-messages'));

console.log("./proto-messages/"+result.join(" ./proto-messages"));