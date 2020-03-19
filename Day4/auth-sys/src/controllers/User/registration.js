require('dotenv').config();

const db_user = require('../../models/class/db_user');

const validation = require('../../Helpers/validation');

const responseMessages = require('../../Helpers/responseMessage');

const jwt = require('jsonwebtoken');

const convereter = require('./../../Helpers/converter');

const { v4: uuidv4 } = require('uuid');

const registration = (req, res, next) => {
  console.log(req.body);

  const data = !req.body ? null : req.body;
  if (!data)
    return res.json(
      responseMessages.InternalErrorMessage(
        null,
        'Sorry Some Error Happened at registration please try again later'
      )
    );

  const { error } = validation.registrationValidation(data);

  if (error !== undefined) {
    // return error message if not valid
    return res.json(
      responseMessages.FailedMessage(
        null,
        'Oops !' + error.toString().replace('ValidationError:', '')
      )
    );
  }

  // checx if emeil in system
  db_user
    .getUserByEmail(data.email)
    .then(data => {
      if (data.rowCount > 1) {
        res.json(
          responseMessages.FailedMessage(
            null,
            'The Email you entered is in used in system'
          )
        );
        return;
      }
    })
    .catch(err => {
      res.json(
        responseMessages.InternalErrorMessage(
          null,
          'Sorry Some Error Happened at registration please try again later'
        )
      );
      return next(err);
    });

  // insert user
  data.gid = uuidv4();
  db_user
    .insertUser(data)
    .then(result => {
      console.log(convereter.EnCode(data.gid));
      const acces_token = jwt.sign(
        { id: convereter.EnCode(data.gid) },
        process.env.acces_Token_secret
      );
      res.cookie('token', acces_token);
      res.json(
        responseMessages.successMessage(
          {
            token: acces_token,
            row: result.rowCount
          },
          ' Thank you \n  Successfully Registration , we will redirect to your profile'
        )
      );
    })
    .catch(err => {
      res.json(
        responseMessages.InternalErrorMessage(
          null,
          'Sorry Some Error Happened at registration please try again later'
        )
      );
      return next(err);
    });
};

module.exports = registration;
