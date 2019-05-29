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
// GET for /api/bears
// Returnes a list of all the zoos in the database
router.get('/', async (req, res) => {
    try {
        const bears = await db('bears');
        res.status(200).json(bears);
      } catch (error) {
        res.status(500).json({
          message: 'Error retrieving bears',
          error: error
        });
      }
});

module.exports = router;