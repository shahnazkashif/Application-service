//import npm module
const { format } = require('date-fns');
const { v4: uuid} = require('uuid');

//import common core module
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

//import some extra modules too
const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMddz\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {

        if (!fs.existsSync(path.join(__dirname, '..',  'logs')))
        {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    //logevents parameter description: request then from where the request coming from e.g. any website name and then what url is requested
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = { logger, logEvents };

// console.log(format (new Date(), 'yyyyMMdd\tHH:mm:ss'))
// console.log(uuid())



// some information regarding json file versions of packages

/*   "uuid": "^10.0.0" --> version details ->  Major.Minor.Patch 
// ^ sign means don't update the major version, only update the minor and patch version
// ~ sign means only update the patch version
// * sign means whole update/ use the absolute version every time 
// no sign mean your project only use this specific version and no updated version 
// npm i uuid@8.3.1 -> install this specific version
// npm update -> check for any new updates */