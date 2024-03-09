'use strict';

//массив ссылок на картинки слайдов
const slideImages = [
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg",
  "img/6.jpg",
  "img/7.jpg",
];

//класс для слайдера
//конструктор принимает массив ссылок на картинки слайдов
//методы класса: 
//nextSlide - показать следующий слайд, previousSlide - показать предыдущий слайд, 
//displaySlide - показать слайд
class Slider {
  constructor(images) {
    this.images = images;
    this.currentSlideIndex = 0;
    this.totalSlides = this.images.length;
    this.sliderImage = document.querySelector('.container__img');
  }

  nextSlide() {
    this.currentSlideIndex++;
    if (this.currentSlideIndex >= this.totalSlides) {
      this.currentSlideIndex = 0;
    }
    this.displaySlide();
  }

  previousSlide() {
    this.currentSlideIndex--;
    if (this.currentSlideIndex < 0) {
      this.currentSlideIndex = this.totalSlides - 1;
    }
    this.displaySlide();
  }
  displaySlide() {
    const currentSlideImage = this.images[this.currentSlideIndex];
    this.sliderImage.classList.add('fade-out');
    setTimeout(() => {
      this.sliderImage.setAttribute('src', currentSlideImage);
      this.sliderImage.classList.remove('fade-out');
    }, 500);
  }
}

//создаю новый экземпляр класса Слайдер
const slider = new Slider(slideImages);

//слушатель для кнопки назад
document.querySelector('.back').addEventListener('click', () => {
  slider.previousSlide();
});

//слушатель для кнопки вперед
document.querySelector('.forward').addEventListener('click', () => {
  slider.nextSlide();
});
