'use strict'

var AWS = require('aws-sdk');

var AWSConfig = require('./app/resource/aws-config');
var db = new AWS.DynamoDB(AWSConfig.getDynamoDBConfig());

var request = require('request');
var cheerio = require('cheerio');

Date.prototype.simpleDateFormat = require('./app/src/DatePrototype').simpleDateFormat;


/*
 * event handler
 */
exports.handler = function(event, context){
    console.log('fetching data');

    request({
        url: 'http://mod.cht.com.tw/video',
        method: 'GET'

    }, function(error, response, body){
        if (!error && response.statusCode == 200) {
            // pre process body
            var $ = cheerio.load(body);

            // parsing
            console.log('ftech data success, parsing data');
            var data = [];
            $('.expose-area .port-card__content').each(function(i, content){
                var title = $(this).find('h5.overlay-card__heading--large').text();
                var summary = $(this).find('p.overlay-card__summary').text();
                var link = $(this).find('a.port-card__inner').attr('href');

                data.push({
                    title: title,
                    title_link: "http://mod.cht.com.tw" + link,
                    text: summary
                });
            });


            // uploading data to dynamoDB
            console.log('uploading data to db');

            var params = {
                "TableName": "MOD_MOVIES",
                "Item": {
                    "id": {"N": "1"},
                    "data": {"S": JSON.stringify(data)},
                    "update_time": {"S": (new Date()).simpleDateFormat()}
                }
            }

            db.putItem(params, function(err, data){
                console.log(err, data);

                if(!err){
                    console.log('upload success');
                    context.succeed('job success, data:' + data);

                }else {
                    console.log('upload failed, err:' + err);
                    context.fail();
                }
            });

        }else{
            console.log('fetch data failed');
            context.fail();
        }
    });
}