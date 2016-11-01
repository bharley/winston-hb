/* eslint import/no-extraneous-dependencies:0, no-unused-expressions:0 */
import { expect } from 'chai';
import winston from 'winston';
import Honeybadger from '../lib/transport';

describe('honeybadger transport', () => {
  it('should exist', () => {
    expect(Honeybadger).to.exist;
  });

  it('should register to Winston\'s transports', () => {
    expect(winston.transports.Honeybadger).to.exist;
    expect(winston.transports.Honeybadger).to.eql(Honeybadger);
  });
});
