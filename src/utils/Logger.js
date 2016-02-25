import Winston from 'winston';
import 'winston-loggly';

const nodeEnv = process.env.NODE_ENV;
const logglyToken = process.env.LOGGLY_TOKEN || null;
const logglySubdomain = process.env.LOGGLY_SUBDOMAIN || null;

function Logger() {
  const loggly = (logglyToken && logglySubdomain) ?
    new Winston.transports.Loggly({
      level: 'error',
      handleExceptions: true,
      inputToken: logglyToken,
      subdomain: logglySubdomain,
      tags: ['Header-App'],
      json: false,
      stripColors: true,
    }
  ): null;
  const console = new Winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  });

  this.build = function() {
    return new Winston.Logger({
      transports: (nodeEnv !== 'development' && loggly) ?
        [loggly, console]:[console],
      exitOnError: false
    });
  }
}

export default new Logger();