const mysql = require('mysql');
const localMysql = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'weight_teller_development'
}
const con = mysql.createConnection(localMysql);
con.connect();

// const sequelize = new Sequelize('weight_teller_development', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     operatorsAliases: false,
//     pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//     }
// });
// sequelize.authenticate();
module.exports.connection = con;


// exports.con = con;
// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//     exports.sequelize = sequelize;
// })
// .catch(err => {
//     console.error('Unable to connect to the database:', err);
// });
// // USER Schema
// connection.query('CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id), email VARCHAR(32), password_token VARCHAR(255), created_at DATETIME)');
// // IMAGE Schema
// connection.query('CREATE TABLE IF NOT EXISTS images (id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id), path VARCHAR(255), filename VARCHAR(255), created_at DATETIME, title VARCHAR(255), user_id INT NOT NULL REFERENCES users(id))');
// // ANNOTATION Schema
// connection.query('CREATE TABLE IF NOT EXISTS annotations (id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id), label VARCHAR(255), numeric_value FLOAT(10), string_value VARCHAR(255), units VARCHAR(255), image_id INT NOT NULL REFERENCES images(id), created_at DATETIME)');
// module.exports.connection = connection;
