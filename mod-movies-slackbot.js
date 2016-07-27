'use strict';

var AWS = require('aws-sdk');

var AWSConfig = require('./app/resource/aws-config');
var db = new AWS.DynamoDB(AWSConfig.getDynamoDBConfig());

/*
 * handler
 */
exports.handler = (event, context, callback) => {
    var params = {
        TableName: 'MOD_MOVIES',
        Limit: 1
    };
    
    db.scan(params, function(err, result){
        if(err){
            console.log(err, result);
            context.fail();
            
        }else{
            console.log(result);
            console.log(JSON.parse(result.Items[0].data.S));
            
            // 建立符合規範的 slack response body
            var responseBody = {
                text: "今天的電影清單 (更新時間: " + result.Items[0].update_time.S + " ):",
                attachments: JSON.parse(result.Items[0].data.S)
            }
            
            context.succeed(responseBody);
        }
    });
    
};