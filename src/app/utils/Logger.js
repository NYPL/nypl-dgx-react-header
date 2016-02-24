import Winston from 'winston';
import 'winston-loggly';

const nodeEnv = process.env.NODE_ENV;

function Logger() {
  const logglyToken = process.env.LOGGLY_TOKEN;
  const loggly = new Winston.transports.Loggly({
    level: 'error',
    handleExceptions: true,
    inputToken: logglyToken,
    subdomain: 'nypl',
    tags: ['React-Header-App'],
    json: false,
    stripColors: true,
  });
  const console = new Winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  });

  this.build = function() {
    return new Winston.Logger({
      transports: (nodeEnv === 'production') ? [loggly, console]:[console],
      exitOnError: false
    });
  }
}

export default new Logger();

