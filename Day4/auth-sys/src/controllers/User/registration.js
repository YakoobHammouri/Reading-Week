require('dotenv').config();

const db_user = require('../../models/class/db_user');

const validation = require('../../Helpers/validation');

const responseMessages = require('../../Helpers/responseMessage');

const jwt = require('jsonwebtoken');

const convereter = require('./../../Helpers/converter');

const { v4: uuidv4 } = require('uuid');

const registration = (req, res, next) => {
  console.log('startt registretd');

  const data = !req.body ? null : req.body;
  if (!data)
    return res
      .status(500)
      .json(
        responseMessages.InternalErrorMessage(
          null,
          'Sorry Some Error Happened at registration please try again later'
        )
      );

  const { error } = validation.registrationValidation(data);

  if (error !== undefined) {
    // return error message if not valid

    const errorMessage = error.toString().includes('[ref:password]')
      ? 'the password not match , please re-Enter password'
      : error.toString().replace('ValidationError:', '');

    return res
      .status(400)
      .json(responseMessages.FailedMessage(null, 'Oops ! ' + errorMessage));
  }
  //=====================================================================================
  // insert user
  data.gid = uuidv4();
  db_user
    .insertUser(data)
    .then(result => {
      const acces_token = jwt.sign(
        { id: convereter.EnCode(data.gid) },
        process.env.acces_Token_secret
      );
      res.cookie('token', acces_token);
      res.status(200).json(
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
      res
        .status(500)
        .json(
          responseMessages.InternalErrorMessage(
            null,
            'Sorry Some Error Happened at registration please try again later'
          )
        );
      return next(err);
    });
};

module.exports = registration;
