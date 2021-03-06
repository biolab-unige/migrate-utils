#! /usr/bin/env node

var logger = require('./logger.js');
var Migrator = require("./lib/Migrator.js");
logger.log('info', "Creating new migrator");
var migrator = new Migrator();
var DEFAULT_LOCATION = '../xtens-app/assets/dataFiles/tmp';

migrator.migrateCGH(DEFAULT_LOCATION,'.xlsx', process)
.then(function(summary) {
    logger.log('info', 'migrate: done!');
    process.send(summary, function () {
        if (summary.error) {
            process.exit(1);
        }
        process.exit(0);
    });

})
.catch(function(err) {
    logger.log('error', err);
    process.exit(1);
});
