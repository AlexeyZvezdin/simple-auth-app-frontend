import matches from "validator/lib/matches";

const validatePass = pass =>
  new Promise((resolve, reject) => {
    let isMatches = matches(
      pass,
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&]).{7,12}$"
      // Не работало потому что *d не был экранирован, заменил на [0-9]
      // К сожалению пропускает пробелы
    );
    if (!isMatches && pass.length > 2) {
      resolve({ SignInPasswordClass: "SignInRedTextField", Password: pass });
    } else if (isMatches) {
      // Первый раз в жизни увидел надобность тайпскрипта. Но цена внедрения сомнительна
      resolve({
        SignInPasswordClass: "SignInGreenTextField",
        Password: pass,
        Check: true
      });
    } else {
      resolve({ SignInPasswordClass: "null", Password: pass });
    }
  });

export default validatePass;
