'use strict';

import uuid from 'uuid';
import * as dynamodb from '../lib/dynamodb';
import { respondWithResult, handleError } from '../lib/response';

export function create (event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      userId: event.requestContext.authorizer.claims.sub,
      serviceId: uuid.v4(),
      content: data.content,
      createdAt: new Date().getTime()
    }
  };

  try {
    const result = await dynamoDbLib.call('put', params);
    callback(null, respondWithResult(params.Item));
  } catch(e) {
    callback(null, handleError({ status: false }));
  }

}
