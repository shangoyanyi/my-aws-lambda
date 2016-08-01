'use strict'

var AWS = require('aws-sdk');

var AWSConfig = require('./app/resource/aws-config');
var db = new AWS.DynamoDB(AWSConfig.getDynamoDBConfig());


// list all data
var list = function(resource, callback){
    db.scan({TableName: resource}, function(err, data){
        if(err){
           console.log(err);
           callback.error(err);           
           
        } else{
           console.log(JSON.stringify(data));
           callback.success(data);
        }
    });
};


/**
 * read an item
 * this method well get attribute "key" from params
 * "key" must follow this formation:
 * 
 * key: {
 *  field_name1: {field_type: field_value},
 *  field_name2: {field_type: field_value},
 *  ...  
 * }
 * 
 */
var read = function(resource, key, callback){
    var query = {
        'TableName': resource,
        'Key': key
    };
    
    db.getItem(query, function(err, data){
       if(err){
           console.log(err);
           callback.error(err);           
           
        } else{
           console.log(JSON.stringify(data));
           callback.success(data);
        }
    });
}


/**
 * create an item
 * this method needs an attribute "item" from params
 * "item" must follow this formation:
 * 
 * item: {
 *  field_name1: {field_type: field_value},
 *  field_name2: {field_type: field_value},
 *  ...  
 * }
 * 
 */
var create = function(resource, item, callback){
    var query = {
        'TableName': resource,
        'Item': item
    };
    
    db.putItem(query, function(err, data){
       if(err){
           console.log(err);
           callback.error(err);           
           
        } else{
           console.log(JSON.stringify(data));
           callback.success(data);
        }
    });
}


/**
 * update an item
 * this method needs attribute "key"、"UpdateExpression" and "ExpressionAttributeValues" from params
 *
 * "key" must follow this formation: 
 * key: {
 *  field_name1: {field_type: field_value},
 *  field_name2: {field_type: field_value},
 *  ...  
 * }
 * 
 * "UpdateExpression" must follow this formation:
 * UpdateExpression: 'set field_name1= :name1, field_name2= :name2'
 * 
 * "ExpressionAttributeValues"  must follow this formation:
 * ExpressionAttributeValues: {
 *  ':name1': {field_type: value1},
 *  ':name2': {field_type: value2},
 *  ...
 * }
 * 
 */
var update = function(resource, key, updateExpression, expressionAttributeValues, callback){
    var query = {
        'TableName': resource,
        'Key': key,
        'UpdateExpression': updateExpression,
        'ExpressionAttributeValues': expressionAttributeValues,
        ReturnValues: 'UPDATED_NEW'
    };
    
    db.updateItem(query, function(err, data){
       if(err){
           console.log(err);
           callback.error(err);           
           
        } else{
           console.log(JSON.stringify(data));
           callback.success(data);
        }
    });
}


/**
 * delete an item
 * this method needs an attribute "key" from params
 * "key" must follow this formation:
 * 
 * key: {
 *  field_name1: {field_type: field_value},
 *  field_name2: {field_type: field_value},
 *  ...  
 * }
 * 
 */
var del = function(resource, key, callback){
    var query = {
        'TableName': resource,
        'Key': key
    };
    
    db.deleteItem(query, function(err, data){
       if(err){
           console.log(err);
           callback.error(err);           
           
        } else{
           console.log(JSON.stringify(data));
           callback.success(data);
        }
    });
}


var Actions = {
    List: {
        name: 'list',
        do: list
    },
    Read: {
        name: 'read',
        do: read
    },
    Create: {
        name: 'create',
        do: create
    },
    Update: {
        name: 'update',
        do: update
    },
    Delete: {
        name: 'delete',
        do: del
    }
};


/*
 * event handler
 */
exports.handler = function(event, context){
    console.log('action:' + JSON.stringify(event.action));
    console.log('resource:' + JSON.stringify(event.resource));
    console.log('params:' + JSON.stringify(event.params));
    
    
    if (event.action == Actions.List.name){
        Actions.List.do(event.resource, {
            success: function(data){
                context.succeed(data);
            },
            error: function(err){
                context.fail();
            }
        })
    }
    
    
    if (event.action == Actions.Read.name){
        Actions.Read.do(event.resource, event.params.key, {
            success: function(data){
                context.succeed(data);
            },
            error: function(err){
                context.fail();
            }
        })
    }
    
    
    if (event.action == Actions.Create.name){
        Actions.Create.do(event.resource, event.params.item, {
            success: function(data){
                context.succeed(data);
            },
            error: function(err){
                context.fail();
            }
        })
    }
    
    
    if (event.action == Actions.Update.name){
        Actions.Update.do(event.resource, event.params.key, event.params.updateExpression, event.params.expressionAttributeValues, {
            success: function(data){
                context.succeed(data);
            },
            error: function(err){
                context.fail();
            }
        })
    }
    
    
    if (event.action == Actions.Delete.name){
        Actions.Delete.do(event.resource, event.params.key, {
            success: function(data){
                context.succeed(data);
            },
            error: function(err){
                context.fail();
            }
        })
    }
}