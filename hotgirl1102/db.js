const pg = require('pg');

const config = {
  user: 'kyreohmtxstplx',
  database: 'd3sdrm0knuaur9',
  password: 'e4ccbccdabbefcecc52c1f1fa263a4333a6b265fb1d970750151060538b279b7',
  host: 'ec2-54-221-210-126.compute-1.amazonaws.com',
  port: 5432,
  max: 5,
  idleTimeoutMillis: 10000,
  ssl: true
};

const pool = new pg.Pool(config);

function queryDB(sql, arrayData) {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) return reject(err);
            client.query(sql, arrayData, (queryErr, result) => {
                done(queryErr);
                if (queryErr) return reject(queryErr);
                resolve(result);
            });
        });
    });
}

const getHotGirlById = id => (
    queryDB('SELECT * FROM "HotGirl" WHERE id = $1', [id])
    .then(result => result.rows[0])
);

const hitLike = id => (
    queryDB('UPDATE public."HotGirl" SET likes = likes + 1 WHERE id = $1', [id])
);

const hitDislike = id => (
    queryDB('UPDATE public."HotGirl" SET dislikes = dislikes + 1 WHERE id = $1', [id])
);

module.exports = { getHotGirlById, hitDislike, hitLike };
