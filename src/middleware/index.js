const checkPasswordStrength = (req, res, next) => {
  // use a try catch to see if req.body.password has at least one uppercase and one special character
  // if it does, pass to the next middleware handler using next();
  // if it does not, throw an error, catch it, and pass to the next handler using next(error);
  try {
    const password = req.password.body;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[\W_]+/.test(password);
    if (!hasSpecialCharacter) {
      throw new Error('Password needs special character')
    }
    if (!hasUppercase) {
      throw new Error('Password needs uppercase')
    }
    next();
  } catch (error) {
    next(error)
  }

  // Another way:
  /* 
  const checkPasswordStrength = (req, res, next) => {
  try {
    const uppercaseRegex = /[A-Z]/;
    const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    const hasUppercase = uppercaseRegex.test(req.body.password);
    const hasSpecialCharacter = symbolRegex.test(req.body.password);

    if (hasSpecialCharacter && hasUppercase) {
      next();
    } else {
      throw new Error('Password must contain an uppercase and a special character')
    }
  } catch(error) {
    next(error);
  }
  */

}
module.exports = checkPasswordStrength