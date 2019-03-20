// mysql connection
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models').User;

exports.register = (req, res) => {
    bcrypt.hash(req.body.token, saltRounds, function(err, token) {
        // Store hash in your password DB.
        // sequelize create user
        const user = User.build({
            'email': req.body.email,
            'password_token': token
        });
        user.save().then(u => {
            console.log('created: ' + u);
            const resUser = {
                _id: u.id,
                pwdToken: u.password_token
            };
            res.send({
                code: 200,
                success: 'User successfully registered!',
                user: resUser
            });
        });
    });
}

exports.login = (req, res) => {
    console.log('login');
    const email = req.body.email;
    const password = req.body.token;
    // sequelize login user
    User.findOne({
        attributes: ['id', 'password_token'],
        where: {
            email
        }
    }).then(u => {
      if (u) {
        bcrypt.compare(password, u.password_token, (error, compare_result) => {
          if (compare_result) {
              var resUser = {
                  _id: u.id.toString(),
                  pwdToken: u.password_token
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
    })
}
