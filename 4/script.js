'use strict';

//самовызывающаяся IIFE
(function () {

    //получение пользователей
    const getUsers = showUsers();
    getUsers();

    //слушатель на кнопке для подгрузки новых пользователей 
    document.querySelector('.all-users__load-button').addEventListener('click', () => getUsers());

    function showUsers(n = 0) {
        const loadButton = document.querySelector('.all-users__load-button');
        let page = n; //замыкание со счетчиком страниц page,
        let arrUsers = []; //в этом массиве храню всех пользователей

        return async function () {
            page++;
            const data = await getUsersData(page); //запуск асинхронной функции getUsersData для получения данных с сервера

            if (data) {
                arrUsers.push(...data?.data); //добавляю полученных пользователей в массив arrUsers

                arrUsers.sort((a, b) => a.first_name.localeCompare(b.first_name)); //сортирую массив

                document.querySelector('.all-users__users').innerHTML = ''; //очищаю div от результатов предыдущего рендера
                arrUsers.forEach(user => createCard(user, page));//создание карточек пользователей

                const loadedUsers = document.querySelectorAll('.card').length;

                //отображение количества загруженных пользователей
                document.querySelector('.all-users__total').textContent = `
        Загружено пользователей: ${loadedUsers} из ${data.total}`;

                //отключение отображения кнопки подзагрузки, если загружены все пользователи
                if (loadedUsers === data.total) loadButton.style.display = 'none';
            }
        };
    }

    //функция для получения данных пользователей с сервера с указанием страницы в параметре
    async function getUsersData(page) {
        try {
            const response = await fetch(`https://reqres.in/api/users?page=${page}`);
            if (!response.ok) throw new Error('Ошибка при выполнении запроса');

            return await response.json();
        } catch (error) {
            console.error('Произошла ошибка:', error.message);
            document.querySelector('.all-users__error').append(`Произошла ошибка: ${error.message} `);
        }
    }

    //функция для создания карточки пользователя по темплейту в HTML
    function createCard(user) {
        const template = document.querySelector('#template-character'),
            fragment = template.content.cloneNode(true);

        fragment.querySelector('.card__avatar').src = user.avatar;
        fragment.querySelector('.card__user-name').textContent = `${user.first_name} ${user.last_name}`;
        fragment.querySelector('.card__user-email .email').textContent = user.email;
        fragment.querySelector('.card__user-email .email').href = `mailto:${user.email}`;

        document.querySelector('.all-users__users').append(fragment);
    }
})();