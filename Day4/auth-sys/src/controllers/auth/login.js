require('dotenv').config();

const bcrypt = require('bcrypt');

const dbUser = require('../../models/class/db_user');

const responseMessages = require('../../helpers/responseMessage');

const validation = require('../../helpers/validation');

const generateToken = require('../../helpers/generateToken');

const login = (req, res, next) => {
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

  // ===============================================================================================
  // validation

  const { error } = validation.logInValidation(data);

  if (error !== undefined) {
    // return error message if not valid
    return res
      .status(400)
      .json(
        responseMessages.FailedMessage(
          null,
          `Oops ! ${error.toString().replace('ValidationError:', '')}`,
        ),
      );
  }
  // ===============================================================================================
  // login
  dbUser
    .getUserByEmail(data.email)
    .then(async (result) => {
      if (result.rowCount === 0) {
        return res
          .status(404)
          .json(
            responseMessages.NotFoundMessage(
              null,
              '<a href="/registration">Oops ! sorry no Account matching with your inputs , if you are not Register Click Here</a> ',
            ),
          );
      }
      // check password
      const user = result.rows[0];
      const checkpassword = await bcrypt.compare(data.password, user.password);
      if (!checkpassword) {
        // wrong password
        return res
          .status(401)
          .json(
            responseMessages.UnauthorizedMessage(
              null,
              'Oops ! Sorry wrong Email or  password, please enter your data again! ',
            ),
          );
      }
      // password Mathing , user log in successtully
      const token = generateToken(user.gid);
      res.cookie('token', token);
      res.status(200).json(
        responseMessages.successMessage(
          {
            token,
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

module.exports = login;
