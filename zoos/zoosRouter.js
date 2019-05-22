const knex = require('knex');
const router = require ('express').Router();

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.sqlite3'
    },
    useNullAsDefault: true,
    debug: true
}

const db = knex(knexConfig);

// routes

// GET for /api/zoos
router.get('/', (req,res) => {
    db('zoos')
        .then(zoos => {
            res.status(200).json(zoos);
        })
        .catch(err => {
            console.log(err);
        });
});


module.exports = router;