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

    router.get('/new', function (req, res, next) {
        res.format({
            'text/html': function () {
                res.render('new-vacationrequest', {title: 'New Request', stylesheet: `${assetBasePath}/new-vacationrequest.css`, script: `${assetBasePath}/new-vacationrequest.js`});
            },
            'default': function () {
                res.status(406).send('Not Acceptable')
            }
        });
    });

    router.post('/', (req, res) => {

        let error = validateVacationRequest(req.body);

        if(error) {
            res.status(400).send(error);
        } else if (req.body.id !== undefined) {
            res.status(400).send({error: 'Cannot specify id'});
        } else {
            let newRequest = JSON.parse(JSON.stringify(req.body));
            newRequest.id = uuid();
            vacationRequests.push(newRequest);
            res.status(201).send({id: newRequest.id});
        }
    });

    router.patch('/:id', (req, res) => {

        let index;
        let vacationRequest = vacationRequests.find((vr, i) => {
            if (vr.id === req.params.id) {
                index = i;
                return true;
            }
            return false;
        });

        let error = validateVacationRequest(req.body);

        if(error) {
            res.status(400).send(error);
        } else if (!vacationRequest) {
            res.status(404).send('Not found');
        } else {
            vacationRequests[index] = req.body;
            res.sendStatus(200);
        }
    });

    return router;
};

function validateVacationRequest(request) {

    let from = new Date(request.from);
    let to = new Date(request.to);

    if (!request.user) {
        return {error: 'User is mandatory'};
    }  else if (from == 'Invalid Date' || to == 'Invalid Date') {
        return {error: 'Bad date'};
    } else if (request.type !== 'Compensatory off time' && request.type !== 'Annual leave' && request.type !== 'Special leave') {
        return {error: 'Bad type'}
    } else {
        return null;
    }
}
