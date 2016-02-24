import winston from 'winston';
import 'winston-loggly';

function Logger(token) {
  this.build = function(token) {
    return new winston.Logger({
      transports: [
        new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          json: false,
          colorize: true,
        }),
        new winston.transports.Loggly({
          level: 'debug',
          handleExceptions: true,
          inputToken: token,
          subdomain: 'nypl',
          tags: ['Winston-NodeJS'],
          json: false,
        }),
      ],
      exitOnError: false
    });
  }
}

export default new Logger();
