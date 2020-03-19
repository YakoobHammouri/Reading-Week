require('dotenv').config();

const { v4: uuidv4 } = require('uuid');

const dbUser = require('../../models/class/db_user');

const validation = require('../../helpers/validation');

const responseMessages = require('../../helpers/responseMessage');

const generateToken = require('../../helpers/generateToken');

const registration = (req, res, next) => {
  const data = !req.body ? null : req.body;
  if (!data) {
    return res
      .status(500)
      .json(
        responseMessages.InternalErrorMessage(
          null,
          'Sorry Some Error Happened at registration please try again later',
        ),
      );
  }

  const { error } = validation.registrationValidation(data);

  if (error !== undefined) {
    // return error message if not valid

    const errorMessage = error.toString().includes('[ref:password]')
      ? 'the password not match , please re-Enter password'
      : error.toString().replace('ValidationError:', '');

    return res
      .status(400)
      .json(responseMessages.FailedMessage(null, `Oops ! ${errorMessage}`));
  }
  //= ====================================================================================
  // insert user
  data.gid = uuidv4();
  dbUser
    .insertUser(data)
    .then((result) => {
      const accesToken = generateToken(data.gid);
      res.cookie('token', accesToken);
      res.status(200).json(
        responseMessages.successMessage(
          {
            token: accesToken,
            row: result.rowCount,
          },
          ' Thank you \n  Successfully Registration , we will redirect to your profile',
        ),
      );
    })
    .catch((err) => {
      res
        .status(500)
        .json(
          responseMessages.InternalErrorMessage(
            null,
            'Sorry Some Error Happened at registration please try again later',
          ),
        );
      return next(err);
    });
};

module.exports = registration;
