'use strict';

//самовызывающаяся IIFE
(function () {

    //получение пользователей
    const getUsers = showUsers();
    getUsers();

    //слушатель на кнопке для подгрузки новых пользователей 
    document.querySelector('.all-users__load-button').addEventListener('click', () => getUsers());

    //замыкание со счетчиком страниц page
    //и запуск асинхронной функции getUsersData для получения данных с сервера
    //сортировка и создание карточек пользователей функцией createCard
    //отображение количества загруженных пользователей
    //и отключение отображения кнопки подзагрузки, если загружены все пользователи
    function showUsers(n = 0) {
        const loadButton = document.querySelector('.all-users__load-button');
        let page = n;

        return async function () {
            page++;
            const data = await getUsersData(page);

            if (data) {
                const divPageUsers = document.createElement('div');
                const h3PageNumber = document.createElement('h3');
                const hr = document.createElement('hr');
                divPageUsers.classList.add(`all-users__users${page}`);
                divPageUsers.classList.add('users');

                h3PageNumber.classList.add('pages__page-number');
                h3PageNumber.textContent = `Страница ${page}`;
                document.querySelector('.all-users__pages').append(h3PageNumber);

                const sortedUsers = data?.data.sort((a, b) => a.first_name.localeCompare(b.first_name));

                document.querySelector('.all-users__pages').append(divPageUsers);
                sortedUsers.forEach(user => createCard(user, page));
                document.querySelector('.all-users__pages').append(hr);

                const loadedUsers = document.querySelectorAll('.card').length;

                document.querySelector('.all-users__total').textContent = `
        Загружено пользователей: ${loadedUsers} из ${data.total}`;
                if (loadedUsers === data.total) loadButton.style.display = 'none';
            }
        };
    }

    //функция для получения данных пользователей с сервера с указанием страницы в параметре
    async function getUsersData(page) {
        try {
            const response = await fetch(`https://reqres.in/api/users?page=${page}`);
            if (!response.ok) throw new Error('Ошибка при выполнении запроса');

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Произошла ошибка:', error.message);
            document.querySelector('.all-users__error').append(`Произошла ошибка: ${error.message} `);
        }
    }

    //функция для создания карточки пользователя по темплейту в HTML
    function createCard(user, page) {
        const template = document.querySelector('#template-character'),
            fragment = template.content.cloneNode(true);

        fragment.querySelector('.card__avatar').src = user.avatar;
        fragment.querySelector('.card__user-name').textContent = `${user.first_name} ${user.last_name}`;
        fragment.querySelector('.card__user-email .email').textContent = user.email;
        fragment.querySelector('.card__user-email .email').href = `mailto:${user.email}`;

        document.querySelector(`.all-users__users${page}`).append(fragment);
    }
})();