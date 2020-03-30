const express = require('express');

module.exports = function (assetBasePath) {
    const router = express.Router();

    router.get('/', function (req, res, next) {
        res.format({
            'text/html': function () {
                res.render('vacationrequests', {title: 'a', stylesheet: `${assetBasePath}/vacationrequests.css`, script: `${assetBasePath}/vacationrequests.js`});
            },
            'application/hal+json': function () {
                res.send({
                    vacationRequests: [
                        {
                            id: '06e8c6be-0ad6-46e5-952e-1bc3d3cbe856',
                            user: "Lennart Klose",
                            from: new Date('2020-04-01'),
                            to: new Date('2020-12-31'),
                            state: 'GRANTED',
                            type: 'Compensatory off time',
                            comment: 'I worked so hard.'
                        },
                        {
                            id: '8d404a9c-81ff-4cde-bb26-9801ee219b2d',
                            user: "Martin Testrot",
                            from: new Date('2020-12-24'),
                            to: new Date('2020-12-31'),
                            state: 'DENIED',
                            type: 'Annual leave'
                        }
                    ]
                });
            },
            'default': function () {
                res.status(406).send('Not Acceptable')
            }
        });
    });
    return router;
};

