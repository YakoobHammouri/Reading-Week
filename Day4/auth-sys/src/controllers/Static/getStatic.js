const { join } = require('path');

buildPublicPath = fileName => {
  if (!fileName) return null;
  return join(__dirname, '..', '..', '..', 'public', fileName);
};

const registrationPage = (req, res) =>
  res.sendFile(buildPublicPath('registration.html'));

const profilePage = (req, res) => {
  res.sendFile(buildPublicPath('userProfile.html'));
};
module.exports = { registrationPage, profilePage };
