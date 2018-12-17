
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var Account = require('./model/finance')


var app = express()
var router = express.Router()

var port = process.env.API_PORT || 3001

var mongoDB = 'mongodb://John:1qaz2345@ds113906.mlab.com:13906/commentboxbd'
mongoose.connect(mongoDB, { useMongoClient: true })
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')

    res.setHeader('Cache-Control', 'no-cache')
    next()
});

router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

router.route('/finance')
    .get(function(req, res) {
        Account.find(function(err, accounts) {
            if (err)
                res.send(err)
            res.json(accounts)
        })
    })
    .post(function(req, res) {
        var account = new Account()
        account.author = req.body.author
        account.text = req.body.text
        account.account = req.body.account
        account.save(function(err) {
            if (err)
                res.send(err)
            res.json({ message: 'Account successfully added!' })
        });
    });

router.route('/finance/:account_id')
    .put(function(req, res) {
        Account.findById(req.params.account_id, function(err, account) {
            if (err)
                res.send(err)
            (req.body.author) ? account.author = req.body.author : null;
            (req.body.text) ? account.text = req.body.text : null;
            (req.body.account) ? account.account = req.body.account : null;
            account.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Account has been updated' });
            });
        });
    })
    .delete(function(req, res) {
        Account.remove({ _id: req.params.account_id }, function(err, account) {
            if (err)
                res.send(err)
            res.json({ message: 'Account has been deleted' })
        })
    });

app.use('/api', router)

app.listen(port, function() {
    console.log(`api running on port ${port}`)
});