'use strict';

//использовал самовызывающуюся функцию 
const watchTV = (function () {
    //элементы в константы
    const
        video = document.querySelector('.video-container__video'),
        overlay = document.querySelector('.video-container__overlay');

    //слушатель на событие 'click' - запуск и пауза
    video.addEventListener('click', () => {
        (video.paused) ? video.play() : video.pause()
    });

    //слушатель на событие 'ended' - сбросить на начальный кадр видео
    video.addEventListener('ended', () => {
        video.currentTime = 0;
        video.pause();
    });

    //слушатель на событие 'timeupdate'
    //для обновления времени на "телевизоре" в оверлейном "дисплее"
    video.addEventListener('timeupdate', () => updateTimeInOverlay(video, overlay));

    //функция задает в оверлейном "дисплее" время текущее/общее 
    function updateTimeInOverlay(video, overlay) {
        //константы для текущего времени
        const
            currentTime = video.currentTime,
            minutes = Math.floor(currentTime / 60).toString(),
            seconds = Math.floor(currentTime % 60).toString(),
            milliseconds = Math.floor((currentTime - Math.floor(currentTime)) * 1000).toString(),
            formattedTime = `
        ${minutes.padStart(2, '0')} : ${seconds.padStart(2, '0')} : ${milliseconds.padStart(3, '0')}`;

        //константы для общей продолжительности времени
        const
            duration = video.duration,
            minutesDuration = Math.floor(duration / 60).toString(),
            secondsDuration = Math.floor(duration % 60).toString(),
            millisecondsDuration = Math.floor((duration - Math.floor(duration)) * 1000).toString(),
            formattedDuration = `
        ${minutesDuration.padStart(2, '0')} : ${secondsDuration.padStart(2, '0')} : ${millisecondsDuration.padStart(3, '0')}`;

        //выставляю в оверлейном "дисплее" время текущее/общее
        overlay.textContent = `${formattedTime} / ${formattedDuration}`;
    }
})();

