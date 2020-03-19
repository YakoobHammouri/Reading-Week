const converter = require('../../helpers/converter');

const validation = require('../../helpers/validation');

const responseMessages = require('../../helpers/responseMessage');

const dbUser = require('../../models/class/db_user');

const userProfile = (req, res, next) => {
  const userId = !req.user ? null : req.user.id;

  if (!userId) {
    return res
      .status(401)
      .clearCookie('token')
      .json(
        responseMessages.InternalErrorMessage(
          null,
          'Sorry Some Error Happened at registration please try again later',
        ),
      );
  }

  // ===========================================================================================
  // decode base64 userId
  // and check if Valid uuid
  const decodeUserId = converter.DeCode(userId);
  if (!validation.V4UUIDValidation(decodeUserId)) {
    return res
      .status(401)
      .clearCookie('token')
      .json(
        responseMessages.InternalErrorMessage(
          null,
          'Sorry Some Error Happened at registration please try again later',
        ),
      );
  }

  // ===========================================================================================
  // get user by gid
  dbUser
    .getUserByGID(decodeUserId)
    .then((result) => {
      if (result.rowCount === 0) {
        // check if the result empty , there problem is decodeUserId
        return res
          .status(401)
          .clearCookie('token')
          .json(
            responseMessages.InternalErrorMessage(
              null,
              'Sorry Some Error Happened at registration please try again later',
            ),
          );
      }
      const user = result.rows[0];
      return res.status(200).json(
        responseMessages.successMessage(
          {
            name: user.name,
            email: user.email,
            phone: user.phone,
          },
          'user profile',
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

module.exports = userProfile;
