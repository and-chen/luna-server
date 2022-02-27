var { Pool } = require('pg');

var pool = new Pool({    
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'admin',
    database: 'testdb'
} );

// const getUser = (req, res) => {
//     var query = 'SELECT * FROM users WHERE username = $1 AND password = $2;'
//     var values = [req.body.username, req.body.password]
//     pool.query(query, values, (err, result) => {
//         if (err) reject(err);
        
//         res.status(200).json(result.rows);
//     });
// }

module.exports = pool;