'use strict';

import * as dynamodb from '../lib/dynamodb';
import { respondWithResult, handleError } from '../lib/response';

export function create (event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the time to be updated
    // - 'userId': User Pool sub of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.authorizer.claims.sub,
      noteId: event.pathParameters.id,
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: 'SET content = :content',
    ExpressionAttributeValues: {
      ':content': data.content ? data.content : null
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    const result = await dynamoDbLib.call('update', params);
    callback(null, respondWithResult({ status: true }));
  } catch(e) {
    callback(null, handleError({ status: false }));
  }

}
