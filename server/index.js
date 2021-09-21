const express = require('express');
const morgan = require('morgan');
const api = require('../api/router/cropnet');

const start = (options) => {
    return new Promise((resolve, reject) => {
        const app = express();
        app.use(morgan('dev'));
        app.use(express.json());
        app.use('/cropnet/api/v1', api(express.Router(), options));
        app.use((err, req, res, next) => {
            reject(new Error('Something went wrong!, ' + err));
            res.status(500).send('Something went wrong');
        });

        console.log(`server started on port ${options.port}`)
        const server = app.listen(options.port, () => resolve(server));
    })
}

module.exports = Object.assign({}, {start});
