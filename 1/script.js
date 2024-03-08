'use strict';

//массив названий файлов с картинками
const slideImages = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
];

//класс для слайдера
//в конструктов принимает массив названий файлов с картинками
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
