const dbUser = require('../models/class/db_user');

const validation = require('../helpers/validation');

const responseMessages = require('../helpers/responseMessage');

// check if the emile in database
// if email in database return true;
const checkUserEmailIfExist = (req, res, next) => {
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

  const { error } = validation.emilValidation({ email: data.email });

  if (error !== undefined) {
    // return error message if not valid
    return res
      .status(400)
      .json(
        responseMessages.FailedMessage(
          null,
          `Oops !${error.toString().replace('ValidationError:', '')}`,
        ),
      );
  }
  dbUser
    .getUserByEmail(data.email)
    .then((result) => {
      if (result.rowCount >= 1) {
        res
          .status(400)
          .json(
            responseMessages.FailedMessage(
              null,
              '<a href="/login ">The Email you entered is used in system , Try to Login click Here</a>',
            ),
          );
        return;
      }
      next();
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

module.exports = checkUserEmailIfExist;
