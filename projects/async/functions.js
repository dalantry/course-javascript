/* ДЗ 5 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунд

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
  return new Promise((resolve) => {
    const request = new XMLHttpRequest();
    request.open(
      'GET',
      'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json',
      true
    );

    request.onload = (request) => {
      let text = request.currentTarget.responseText.replace(/(\r\n|\n|\r)/gm, ' ');
      text = text.replace('[', '');
      text = text.replace(']', '');
      text = text.replace(/\s/g, '');
      while (text.includes('{"name":"' && '"}')) {
        text = text.replace('{"name":"', '');
        text = text.replace('"}', '');
      }
      const array = text.split(',');
      array.sort();
      const newArray = array.map((el) => {
        const obj = {};
        obj.name = el;

        return obj;
      });
      resolve(newArray);
    };
    request.send();
  });
}

export { delayPromise, loadAndSortTowns };
