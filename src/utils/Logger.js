import Winston from 'winston';
import 'winston-loggly';

class Logger {
  constructor() {
    this.nodeEnv = process.env.NODE_ENV;
    this.logglyToken = process.env.LOGGLY_TOKEN || null;
    this.logglySubdomain = process.env.LOGGLY_SUBDOMAIN || null;
  }

  buildLoggly() {
    if (this.logglyToken && this.logglySubdomain) {
      return new Winston.transports.Loggly({
        level: 'error',
        handleExceptions: true,
        inputToken: this.logglyToken,
        subdomain: this.logglySubdomain,
        tags: ['Header-App'],
        json: false,
        stripColors: true,
      });
    }

    return null;
  }

  buildConsole() {
    return new Winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    });
  }

  build() {
    return new Winston.Logger({
      transports: (this.nodeEnv === 'production' && this.buildLoggly()) ?
        [this.buildLoggly(), this.buildConsole()]:[this.buildConsole()],
      exitOnError: false
    });
  }
}

export default new Logger;
