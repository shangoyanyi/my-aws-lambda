/*
 * Complete this config file to use dynamoDB/S3 and other aws services.
 * You need to use AMI to create your own accessKeyId and secretAccessKey. 
 */

var dynamoDBConfig = {
    'accessKeyId': 'YOUR_ACCESS_KEY_ID',
    'secretAccessKey': 'YOUR_SECRET_ACCESS_KEY',
    'region': 'YOUR_REGION'
}

var s3Config = {
    'accessKeyId': 'YOUR_ACCESS_KEY_ID',
    'secretAccessKey': 'YOUR_SECRET_ACCESS_KEY',
    'region': 'YOUR_REGION'
}


module.exports = {
    getDynamoDBConfig: function(){
        return dynamoDBConfig;
    },
    getS3Config: function(){
        return s3Config;
    }
};