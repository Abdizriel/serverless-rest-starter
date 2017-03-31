export function respondWithResult(body, statusCode = 200) {
  return buildResponse(statusCode, body);
}

export function handleError(body) {
  return buildResponse(500, body);
}

export function handleEntityNotFound(body) {
  return buildResponse(404, body);
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body),
  };
}
