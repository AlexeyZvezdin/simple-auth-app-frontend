import matches from "validator/lib/matches";

const validatePass = pass =>
  new Promise((resolve, reject) => {
    let isMatches = matches(
      pass,
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&]).{7,12}$"
      // В некоторых случаях реджекс не срабатывает, почему пока еще не разбирался
      // Не работало потому что *d не был экранирован, заменил на [0-9]
    );
    if (!isMatches && pass.length > 2) {
      resolve({ SignInPasswordClass: "SignInRedTextField", Password: pass });
    } else if (isMatches) {
      resolve({ SignInPasswordClass: "SignInGreenTextField", Password: pass });
    } else {
      resolve({ SignInPasswordClass: "null", Password: pass });
    }
  });

export default validatePass;
/*
  Сюда перенсти надо всю валидацию это раз.
  Во-вторых, передавать не название класса 
  через пропс
а просто пропсом его, а уже внитри условием 
выбирать
Валидация должна происходить в самом элементе,
 а не в его контейнере
Пассворд и имейл класснейм объединить или 
в обхект или 
в массив и не перегружать двумя связанными 
смыслом 
переменными компоннет
Почти все надо перенести в функциональный 
компонент

Ну плюсы у всего есть, например я сначала 
теперь
буду всегда рисовать юмл диаграммы и строить
 архитектуру 
приложения прежде чем начну хуярить его 
невзирая ни на что.

Хуй знает, вообще сейчас не понимаю что меня 
подвигло на такой говнокод, только лишь 
мое физическое состояние, больше никакого 
объяснения нет
Я не стал особо умнее или не получил особо 
много
опыта с тех пор, так что как-то так, хотя 
чето изменлосьпосле 
этого проекта, он показал много проблемных 
мест
*/
