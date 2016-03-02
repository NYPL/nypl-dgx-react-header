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
    // If lack of token or subdomain, just don't stat any transport on production
    let transportsArray = (this.buildLoggly()) ? [this.buildLoggly()] : [];

    // Always have Winston.transports.Console with on development
    if (this.nodeEnv !== 'production') {
      transportsArray = [this.buildConsole()];
    }

    return new Winston.Logger({
      transports: transportsArray,
      exitOnError: false
    });
  }
}

export default new Logger;
