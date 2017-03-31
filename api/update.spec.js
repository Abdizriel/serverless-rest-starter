'use strict';

const mod = require('./update');
const mochaPlugin = require('serverless-mocha-plugin');

const lambdaWrapper = mochaPlugin.lambdaWrapper;
const expect = mochaPlugin.chai.expect;
const wrapped = lambdaWrapper.wrap(mod, { handler: 'update' });

describe('update', () => {
  it('should return statusCode 200', () => {
    return wrapped.run({})
      .then(response => {
        const body = JSON.parse(response.body);
        expect(response.statusCode).to.be.equal(200);
      });
  });
});
