// mysql connection
const { con } = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.register = (req, res) => {
    var today = new Date();
    
    bcrypt.hash(req.body.token, saltRounds, function(err, token) {
        // Store hash in your password DB.
        const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        var user = {
            'email': req.body.email,
            'password_token': token,
            'created_at': currentTime
        }
        con.connection.query('INSERT INTO users SET ?', user, (err, result, fields) => {
            if (err) {
                console.log(err);
                res.send({
                    code: 400,
                    failed: 'Error!'
                })
            } else {
                var resUser = {
                    _id: result.insertId.toString(),
                    pwdToken: token
                }
                res.send({
                    code: 200,
                    success: 'User successfully registered!',
                    user: resUser
                })
            }
        });
    });
}

exports.login = (req, res) => {
    console.log('login');
    const email = req.body.email;
    const password = req.body.token;
    con.connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results, fields) => {
        if (err) {
            res.send({
                code: 400,
                failed: 'Error!'
            });
        } else {
            if (results.length > 0) {
                bcrypt.compare(password, results[0].password_token, (error, compare_result) => {
                    if (compare_result) {
                        var resUser = {
                            _id: results[0].id.toString(),
                            pwdToken: results[0].password_token
                        }
                        res.send({
                            code: 200,
                            success: 'Login successfully',
                            user: resUser
                        });
                    } else {
                        res.send({
                            code: 204,
                            success: 'Email and password does not match'
                        });
                    }
                });
            } else {
                res.send({
                    code: 204,
                    success: 'Email does not exist.'
                })
            }
        }
    });
}
