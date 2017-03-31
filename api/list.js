'use strict';

import * as dynamodb from '../lib/dynamodb';
import { respondWithResult, handleError } from '../lib/response';

export function list (event, context, callback) {
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId' partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be User Pool sub of the authenticated user
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.authorizer.claims.sub,
    }
  };

  try {
    const result = await dynamoDbLib.call('query', params);
    callback(null, respondWithResult(result.Items));
  } catch(e) {
    callback(null, handleError({ status: false }));
  }

}
