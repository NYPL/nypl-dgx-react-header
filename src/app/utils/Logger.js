import Winston from 'winston';
import 'winston-loggly';

function Logger(token) {
  this.build = function(token) {
    return new Winston.Logger({
      transports: [
        new Winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          json: false,
          colorize: true,
        }),
        new Winston.transports.Loggly({
          level: 'debug',
          handleExceptions: true,
          inputToken: token,
          subdomain: 'nypl',
          tags: ['React-Header-App'],
          json: false,
          stripColors: true,
        }),
      ],
      exitOnError: false
    });
  }
}

export default new Logger();
