'use strict';

import * as dynamodb from '../lib/dynamodb';
import { respondWithResult, handleError, handleEntityNotFound } from '../lib/response';

export function get (event, context, callback) {
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the time to be retrieved
    // - 'userId': federated identity ID of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.authorizer.claims.sub,
      noteId: event.pathParameters.id,
    }
  };

  try {
    const result = await dynamodb.call('get', params);

    if(!result.Item) {
      const error = { error: 'Service not found.', status: false };
      callback(null, handleEntityNotFound(error));
    }

    callback(null, respondWithResult(result.Item));
  } catch(e) {
    callback(null, handleError({ status: false }));
  }

}
