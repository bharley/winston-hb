# winston-hb
[![Build Status](https://travis-ci.org/bharley/winston-hb.svg?branch=master)](https://travis-ci.org/bharley/winston-hb)

A [Honeybadger] transport for [Winston].

# Installation

```
npm i -S winston-hb
```

# Usage

```js
import winston from 'winston';
import Honeybadger from 'winston-hb';

winston.add(winston.transports.Honeybadger, options);
```

This transport respects several options:

- **level:** Level of messages that this transport should log&mdash;you're likely going to want
  to set this to `error` to prevent spamming Honeybadger with irrelevant information
- **silent:** Boolean flag indicating whether to suppress output, defaults to false.
- **honeybadger:** Object that gets passed straight into the Honeybadger factory method, useful
  if you do not want to use environment variables to configure Honeybadger

You will need to configure Honeybadger through environment variables or the configuration option
documented above. See [Honeybadger]'s setup instructions for more information.

## Log Handling

Since Honeybadger operates around error messages, you can pass error objects into your log in one
of three ways:

```js
const err = new Error('Something bad happened');

// As the first argument:
winston.error(err);
// As the second argument:
winston.error('Problem in plumbus', err);
// As `error` in an object in the second argument (the rest of the object will be sent to Honeybadger as context):
winston.error('Problem in reactor', { radiationLevel: 12, error: err });
```

# Contributing

Pull requests are welcome. Code style is inherited from [airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)
and enforced by [eslint]. You can check that your changes respect the code style by running
the `lint` command:

```
npm run lint
```

If you're submitting a bugfix, a test to document (and prevent) the issue is welcome.

[Winston]: https://github.com/winstonjs/winston
[Honeybadger]: https://github.com/honeybadger-io/honeybadger-node
[eslint]: http://eslint.org/
