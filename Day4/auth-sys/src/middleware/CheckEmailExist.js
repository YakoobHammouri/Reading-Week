const db_user = require('./../models/class/db_user');

const validation = require('../Helpers/validation');

const responseMessages = require('../Helpers/responseMessage');

// check if the emile in database
// if email in database return true;
//
const checkUserEmailIfExist = (req, res, next) => {
  const data = !req.body ? null : req.body;
  if (!data) {
    return res
      .status(500)
      .json(
        responseMessages.InternalErrorMessage(
          null,
          'Sorry Some Error Happened at registration please try again later'
        )
      );
  }
  const { error } = validation.emilValidation({ email: data.email });
  if (error !== undefined) {
    // return error message if not valid
    return res
      .status(400)
      .json(
        responseMessages.FailedMessage(
          null,
          'Oops !' + error.toString().replace('ValidationError:', '')
        )
      );
  }
  db_user
    .getUserByEmail(data.email)
    .then(data => {
      if (data.rowCount >= 1) {
        res
          .status(400)
          .json(
            responseMessages.FailedMessage(
              null,
              'The Email you entered is used in system'
            )
          );
        return;
      }
      next();
    })
    .catch(err => {
      return res
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

module.exports = checkUserEmailIfExist;
