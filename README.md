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
