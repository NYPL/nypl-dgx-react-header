import winston from 'winston';
import 'winston-loggly';

function Logger() {
// console.log('this is token', token);
  this.build = function() {
    return new winston.Logger({
      transports: [
        new winston.transports.Console({
          level: 'info',
          handleExceptions: true,
          json: false,
          colorize: true,
        }),
        // new winston.transports.Loggly({
        //   level: 'debug',
        //   handleExceptions: true,
        //   inputToken: token,
        //   subdomain: 'nypl',
        //   tags: ['Winston-NodeJS'],
        //   json: false,
        // }),
      ],
      exitOnError: false
    });
  }
}

export default new Logger();