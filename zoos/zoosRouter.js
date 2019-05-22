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
// Returnes a list of all the zoos in the database
router.get('/', async (req, res) => {
    try {
        const zoos = await db('zoos');
        res.status(200).json(zoos);
      } catch (error) {
        res.status(500).json({
          message: 'Error retrieving zoos',
          error: error
        });
      }
});

// Same GET request but tried other syntax

// router.get('/', (req,res) => {
//     db('zoos')
//         .then(zoos => {
//             res.status(200).json(zoos);
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Error retrieving zoos', error: error});
//         });
// });

// GET BY ID for /api/zoos/:id
// Returns zoo object with specified id
router.get('/:id', async (req, res) => {
    try {
        const zoo = await db('zoos')
            .where({id: req.params.id })
            .first()
            if(zoo) {
                res.status(200).json(zoo);
            } else {
                res.status(404).json({ message: "Zoo with the specified ID does not exist." })
            }
    } catch (error) {
        res.status(500).json({ 
            message: "Zoo information could not be retrieved.",
            error: error 
        });
    }
});

// POST for /api/zoos
// Returns new zoo object
router.post('/', (req, res) => {
    db('zoos')
        .insert(req.body, 'id')
        .then(ids => {
            db('zoos')
                .where({ id: ids[0] })
                .first()
                .then(zoo => {
                    res.status(201).json(zoo);
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'Error adding zoo',
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error adding zoo',
                error: error
              });
        });
});

module.exports = router;