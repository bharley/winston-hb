import winston from 'winston';
import hb from 'honeybadger';

class Honeybadger extends winston.Transport {
  name = 'honeybadger';

  constructor({ honeybadger = {}, ...options } = {}) {
    super(options);

    this.hb = hb.factory(honeybadger);
  }

  log(level, message = '', context = {}, callback) {
    if (this.silent) {
      callback(null, true);
      return;
    }

    const metadata = {
      context,
    };

    this.hb.notify(message, metadata, (err, notice) => {
      callback(err, notice);
    });
  }
}
winston.transports.Honeybadger = Honeybadger;

export default Honeybadger;
