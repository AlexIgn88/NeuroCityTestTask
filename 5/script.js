'use strict';

//чтобы не засорять глобальную область видимости записал в константу IIFE
const registrationFormValidation = (function () {
    
    //Записываю в константы элементы
    const
        form = document.querySelector('.registration-form'),

        nameInput = document.getElementById('form-name'),
        phoneInput = document.getElementById('form-phone'),
        passwordInput = document.getElementById('form-password'),
        confirmPasswordInput = document.getElementById('form-confirm-password'),

        nameError = document.getElementById('form-name-error'),
        phoneError = document.getElementById('form-phone-error'),
        passwordError = document.getElementById('form-password-error'),
        confirmPasswordError = document.getElementById('form-confirm-password-error');

    //Прикрепляю слушатель validateForm на форму на событие 'submit'
    form.addEventListener('submit', validateForm);

    //Функция-слушатель validateForm
    function validateForm(event) {
        event.preventDefault();
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        if (isNameValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
            alert('Форма отправлена');
            form.reset();
        }
    }

    //Этой функцией проверяю имя
    function validateName() {
        const name = nameInput.value.trim();
        //использую регулярное выражение для проверки правильности ввода имени, учитываю вероятный ввод буквы ё
        const validName = /^[a-zA-Zа-яА-ЯёЁ]{3,30}$/.test(name);
        const errorText = 'Имя должно содержать только кириллицу/латиницу и быть от 3 до 30 символов';

        if (name === '') return showTextForRequiredField(nameInput, nameError)

        if (!validName)
            return showError(nameInput, nameError, errorText, validName)
        else return showValid(nameInput, nameError, validName);
    }

    //Этой функцией проверяю телефон
    function validatePhone() {
        const phone = phoneInput.value.trim();
        //использую регулярное выражение для проверки правильности ввода номера. Плюс необязательный
        const validPhone = /^\+?\d{10,15}$/.test(phone);
        const errorText = 'Телефон должен содержать от 10 до 15 цифр и может начинаться с плюса';

        if (phone === '') return showTextForRequiredField(phoneInput, phoneError)

        if (!validPhone)
            return showError(phoneInput, phoneError, errorText, validPhone)
        else return showValid(phoneInput, phoneError, validPhone);
    }

    //Этой функцией проверяю пароль
    function validatePassword() {
        const password = passwordInput.value.trim();
        //использую регулярное выражение для проверки правильности ввода пароля
        const validPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,40}/.test(password);
        const errorText = 'Пароль должен содержать от 8 до 40 символов, хотя бы одну заглавную букву и цифру';

        if (password === '') return showTextForRequiredField(passwordInput, passwordError)

        if (!validPassword)
            return showError(passwordInput, passwordError, errorText, validPassword)
        else return showValid(passwordInput, passwordError, validPassword);
    }

    //Этой функцией проверяю, совпадает ли пароль
    function validateConfirmPassword() {
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const errorText = 'Пароли не совпадают';
        const isPasswordsIdentical = password === confirmPassword;

        if (confirmPassword === '') return showTextForRequiredField(confirmPasswordInput, confirmPasswordError)

        if (!isPasswordsIdentical)
            return showError(confirmPasswordInput, confirmPasswordError, errorText, isPasswordsIdentical);
        else
            return showValid(confirmPasswordInput, confirmPasswordError, isPasswordsIdentical);
    }

    //показываю ошибку, если неверно
    function showError(inputElem, messageErrorElem, errorText, validValue) {
        inputElem.classList.add('input-invalid');
        messageErrorElem.textContent = errorText;
        return validValue;
    }

    //убираю ошибку
    function showValid(inputElem, messageErrorElem, validValue) {
        inputElem.classList.remove('input-invalid');
        messageErrorElem.textContent = '';
        return validValue;
    }

    //если не использовать атрибут required в html, незаполненное поле подсветится
    function showTextForRequiredField(inputElem, messageErrorElem) {
        const text = 'Поле обязательно для заполнения';
        inputElem.classList.add('input-invalid');
        messageErrorElem.textContent = text;
        return false;
    }
})();