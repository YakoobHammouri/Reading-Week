const EnCode = (str, type) => {
  try {
    if (!type) {
      // set default type
      type = 'base64';
    }
    return Buffer.from(str).toString(type);
  } catch (ex) {
    return null;
  }
};

const DeCode = (str, type) => {
  try {
    if (!type) {
      // set default
      type = 'base64';
    }
    return Buffer.from(str, type).toString();
  } catch (ex) {
    return null;
  }
};

module.exports = { EnCode, DeCode };
