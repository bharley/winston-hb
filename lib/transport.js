import winston from 'winston';
import hb from 'honeybadger';

class Honeybadger extends winston.Transport {
  name = 'honeybadger';

  constructor({ honeybadger = {}, ...options } = {}) {
    super(options);

    this.hb = hb.factory(honeybadger);
  }

  log(level, winstonMessage = '', context = {}, callback) {
    if (this.silent) {
      callback(null, true);
      return;
    }

    let message;
    const metadata = {};
    if (context instanceof Error) {
      // Honeybadger really likes errors, so we prefer that to be the message argument if available
      message = context;
      metadata.context = {
        logMessage: winstonMessage,
      };
    } else {
      message = winstonMessage;
      metadata.context = context;
    }

    this.hb.notify(message, metadata, (err, notice) => {
      callback(err, notice);
    });
  }
}
winston.transports.Honeybadger = Honeybadger;

export default Honeybadger;
