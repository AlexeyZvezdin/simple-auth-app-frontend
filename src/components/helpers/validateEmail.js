import isEmail from "validator/lib/isEmail";

const validateEmail = email =>
  new Promise((resolve, reject) => {
    if (isEmail(email) === true) {
      resolve({ SignInEmailClass: "SignInGreenTextField", Email: email });
    } else if (isEmail(email) === false && email.length > 2) {
      resolve({ SignInEmailClass: "SignInRedTextField", Email: email });
    } else {
      resolve({ SignInEmailClass: "null", Email: email });
    }
  });

export default validateEmail;
