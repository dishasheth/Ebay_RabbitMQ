/**
 * New node file
 */
var SimpleNodeLogger = require('simple-node-logger'),
opts = {
	logFilePath:'myebay1.log',
	timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
},
log = SimpleNodeLogger.createSimpleLogger( opts );
log.setLevel('debug');

exports.setlog=function(logstr)
{
log.debug(logstr);
};

