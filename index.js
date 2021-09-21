'use strict';

const { EventEmitter } = require('events');
const server = require('./server');
const controllers = require('./api/controller')
const config = require('./config/');
const logs = require('./logs/');
const mediator = new EventEmitter();

process.on('uncaughtException', (err, origin) => {
    logs('error', err);
    logs('debug', 'uncaughtException at: '+ origin);
});

process.on('unhandledRejection', (reason, promise) => {
    logs('error', reason);
    logs('debug', 'Unhandled rejection at: ' + promise);
});

process.on('uncaughtRejection', (err, promise) => {
    logs('error', err);
    logs('debug', 'uncaughtRejection at: ' + promise);
});

process.on('warning', (msg) => {
    logs('debug', msg);
});

// On the `server.ready` event trigger start the whole service
mediator.on('server.ready', () => {
    return server.start({
        port: config.serverSettings.port,
        ssl: config.serverSettings.ssl,
        controllers
    }).then(app => {
        app.on('close', () => {
            process.exit(0)
        })
    })
});

mediator.on('server.error', (err) => {
    logs('error', err);
});

mediator.emit('server.ready')

// config.db.connect(config.dbSettings, mediator);
// mediator.emit('boot.ready');
