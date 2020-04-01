const express = require('express');
const uuid = require('uuid');

var vacationRequests = [
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
];

module.exports = function (assetBasePath) {
    const router = express.Router();

    router.get('/', function (req, res, next) {
        res.format({
            'text/html': function () {
                res.render('vacationrequests', {title: 'Vacation requests', stylesheet: `${assetBasePath}/vacationrequests.css`, script: `${assetBasePath}/vacationrequests.js`});
            },
            'application/hal+json': function () {
                res.send({
                    vacationRequests: vacationRequests
                });
            },
            'default': function () {
                res.status(406).send('Not Acceptable')
            }
        });
    });

    router.post('/', (req, res) => {

        let from = new Date(req.body.from);
        let to = new Date(req.body.to);
        
        if (req.body.id !== undefined) {
            res.status(400).send({error: 'Cannot specify id'});
        } else if (from == 'Invalid Date' || to == 'Invalid Date') {
            res.status(400).send({error: 'Bad date'});
        } else if (req.body.state !== 'REQUESTED' && req.body.state !== 'DENIED' && req.body.state !== 'GRANTED') {
            res.status(400).send({error: 'Bad status'})
        } else if (req.body.type !== 'Compensatory off time' && req.body.type !== 'Annual leave' && req.body.type !== 'Special leave') {
            res.status(400).send({error: 'Bad status'})
        } else {
            let newRequest = JSON.parse(JSON.stringify(req.body));
            newRequest.id = uuid();
            vacationRequests.push(newRequest);
            res.status(201).send({id: newRequest.id});
        }
    });

    return router;
};

