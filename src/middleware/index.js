const checkPasswordStrength = (req, res, next) => {
  // use a try catch to see if req.body.password has at least one uppercase and one special character
  // if it does, pass to the next middleware handler using next();
  // if it does not, throw an error, catch it, and pass to the next handler using next(error);
}
module.exports = checkPasswordStrength