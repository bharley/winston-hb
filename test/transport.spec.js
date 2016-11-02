/* eslint import/no-extraneous-dependencies:0, no-unused-expressions:0 */
import { expect } from 'chai';
import sinon from 'sinon';
import winston from 'winston';
import hb from 'honeybadger';
import Honeybadger from '../lib/transport';

describe('honeybadger transport', () => {
  describe('init', () => {
    it('should exist', () => {
      expect(Honeybadger).to.exist;
    });

    it('should register to Winston\'s transports', () => {
      expect(winston.transports.Honeybadger).to.exist;
      expect(winston.transports.Honeybadger).to.eql(Honeybadger);
    });
  });

  describe('constructor', () => {
    it('should create a new instance without error', () => {
      const transport = new Honeybadger();

      expect(transport).to.exist;
      expect(transport).to.be.instanceOf(Honeybadger);
    });
  });

  describe('log', () => {
    let stub;
    let transport;
    beforeEach(() => {
      const originalFactory = hb.factory;
      stub = sinon.stub(hb, 'factory', (...args) => {
        const instance = originalFactory(...args);
        instance.notify = function notify(errorOrMessage, metadata, callback) {
          callback(null, { errorOrMessage, metadata });
        };
        return instance;
      });
      transport = new Honeybadger();
    });

    it('should handle non-error contexts', (done) => {
      const message = 'This is an event worth talking about';
      const context = { user: 'John Doe' };
      transport.log('info', message, context, (err, { errorOrMessage, metadata }) => {
        expect(errorOrMessage).to.eql(message);
        expect(metadata.context).to.eql(context);
        done();
      });
    });

    it('should handle errors specially', (done) => {
      const message = 'Error processing fruits';
      const error = new Error('Something bad happened');
      transport.log('info', message, error, (err, { errorOrMessage, metadata }) => {
        expect(errorOrMessage).to.eql(error);
        expect(metadata.context).to.eql({ logMessage: message });
        done();
      });
    });

    afterEach(() => {
      stub.restore();
    });
  });
});
