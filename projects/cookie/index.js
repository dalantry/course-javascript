/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

document.addEventListener('DOMContentLoaded', () => {
  loadTable(objCookies);
});

filterNameInput.addEventListener('input', function () {
  filter(objCookies);
});

addButton.addEventListener('click', () => {
  document.cookie = `${addNameInput.value} = ${addValueInput.value}`;

  objCookies = parseCookies();

  filter(objCookies);
});

function parseCookies() {
  const cookies = document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev;
  }, {});

  return cookies;
}

let objCookies = parseCookies();

function loadTable(obj) {
  listTable.innerHTML = '';

  for (const el in obj) {
    const newCookie = document.createElement('tr');
    const newCookieName = document.createElement('td');
    const newCookieValue = document.createElement('td');
    const deleteButton = document.createElement('button');

    newCookieName.innerHTML = el;
    newCookieValue.innerHTML = obj[el];
    deleteButton.innerHTML = 'удалить';

    listTable.insertBefore(newCookie, listTable.firstChild);
    newCookie.insertBefore(deleteButton, newCookie.firstChild);
    newCookie.insertBefore(newCookieValue, deleteButton);
    newCookie.insertBefore(newCookieName, newCookieValue);

    deleteButton.addEventListener('click', (e) => {
      const parent = e.target.parentElement;
      const cookieName = parent.firstChild.textContent;

      deleteCookie(cookieName);
      parent.remove();
    });
  }
}

function deleteCookie(cookieName) {
  const cookieDate = new Date();
  cookieDate.setTime(cookieDate.getTime() - 1);
  document.cookie = cookieName += '=; expires=' + cookieDate.toGMTString();
}

function filter(obj) {
  const str = filterNameInput.value;
  const result = {};

  for (const el in obj) {
    if (el.includes(str) || obj[el].includes(str)) {
      result[el] = obj[el];
    }
  }
  loadTable(result);
  return result;
}
