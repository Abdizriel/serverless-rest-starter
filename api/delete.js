'use strict';

import * as dynamodb from '../lib/dynamodb';
import { respondWithResult, handleError } from '../lib/response';

export function create (event, context, callback) {
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the time to be removed
    // - 'userId': User Pool sub of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.authorizer.claims.sub,
      noteId: event.pathParameters.id,
    }
  };

  try {
    const result = await dynamoDbLib.call('delete', params);
    callback(null, respondWithResult({ status: true }));
  } catch(e) {
    callback(null, handleError({ status: false }));
  }

}
