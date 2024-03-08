'use strict';

//записал в константу самовызывающуюся IIFE
const animations = (function () {

  //массив всех фигур
  const shapes = document.querySelectorAll('.shape');

  //вешаю слушатель на событие 'click' на каждую
  shapes.forEach(shape => {
    shape.addEventListener('click', () => {
      enableAnimation(shape);
    });
  });

  //слушатель для кнопки сброса анимации
  document.querySelector('.main-container__reset-animation').addEventListener('click', () => resetAnimation());

  //функция, которая перекидывает классы для запуска анимации
  function enableAnimation(element) {

    const selectValue = document.querySelector('.main-container__select-animation').value;

    switch (selectValue) {
      case 'Пульсация':
        element.classList.remove('move');
        element.classList.remove('rotate');
        element.classList.remove('transform3d');
        element.classList.toggle('pulse');
        return;
      case 'Перемещение':
        element.classList.remove('pulse');
        element.classList.remove('rotate');
        element.classList.remove('transform3d');
        element.classList.toggle('move');
        return;
      case 'Вращение':
        element.classList.remove('pulse');
        element.classList.remove('move');
        element.classList.remove('transform3d');
        element.classList.toggle('rotate');
        return;
      case '3D-трансформация':
        element.classList.remove('pulse');
        element.classList.remove('move');
        element.classList.remove('rotate');
        element.classList.toggle('transform3d');
        return;
      default: return;
    }
  }

  //функция сброса анимации
  function resetAnimation() {

    shapes.forEach(shape => {
      shape.classList.remove('pulse');
      shape.classList.remove('move');
      shape.classList.remove('rotate');
      shape.classList.remove('transform3d');
    })
  }
})();