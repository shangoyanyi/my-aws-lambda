console.log('Hello my-aws-lambda');

Date.prototype.simpleDateFormat = require('./app/src/DatePrototype').simpleDateFormat;

console.log((new Date()).simpleDateFormat());
