# My AWS Lambda
A sample project of Amazon lambda (and DynamoDB as well).

# Configuration
You can configure this project easily as well as you follow these steps

1. Find aws-config.sample.js in folder /app/resource
2. replace accessKeyId/secretAccessKey/region as your own
3. Save and change file name into aws-config.js
4. Congrats!

## lambda module: mod-movies-crawler
A web crawler to get MOD movies and update dynamoDB.

## lambda module: mod-movies-slackbot
A slack request handler to answer MOD movies from dynamoDB.


