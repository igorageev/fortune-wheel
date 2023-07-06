import './assets/style.css';
import { gsap } from 'gsap';
import { Winwheel } from './vendors/winwheel/winwheel.js';

window.TweenMax = gsap;

let initSegments = [
        { fillStyle: '#24A9DA', text: 'Илья' }, // Системные аналитики
        { fillStyle: '#9A2479', text: 'Синдереллы' },
        { fillStyle: '#F0544A', text: 'Самокаты' }, 
        { fillStyle: '#273A92', text: 'Алексей' },
        { fillStyle: '#24A9DA', text: 'Сопровождение' }, // Группа сопровождения проектов
        { fillStyle: '#9A2479', text: 'Дизайнеры' },
        { fillStyle: '#F0544A', text: 'Дубниум' },
        { fillStyle: '#24A9DA', text: 'Бухгалтерия' },
        { fillStyle: '#9A2479', text: 'Продажи' }, // Отдел продаж
        { fillStyle: '#F0544A', text: 'Дружная' },
        { fillStyle: '#EFBD43', text: 'Наташа' },
    ],
    plug = '⭐ ⭐ ⭐', // Чем будут замещаться названия выпавших сегментов
    isAnimation = false, // Флаг движения колеса
    selected = Array.from({ length: initSegments.length }, (x, i) => i + 1); // Номера невыпадавших сегментов

// Настройка колеса Фортуны
let wheel = new Winwheel({
    numSegments: initSegments.length,
    segments: initSegments.map((x) => x),
    lineWidth: 0,
    strokeStyle: 'transparent',
    textFillStyle: 'white',
    textAlignment: 'outer',
    textMargin: 32,
    textFontFamily: 'Lobster',
    textFontSize: 28,
    animation: {
        type: 'spinToStop',
        duration: 5,
        spins: 2,
        callbackBefore: 'spinning()',
        callbackFinished: 'finish()'
    },
});

// Кнопка запуска колеса
const elSpin = document.querySelector('#spin'); 
elSpin.addEventListener('click', (event) => {
    if (!isAnimation) {
        isAnimation = true;
        event.stopPropagation();
        wheel.rotationAngle = wheel.rotationAngle % 90;
        // Метод выбора случайного номера в зависимости от наличия невыпадавших сегментов
        if (selected.length > 0) {
            wheel.animation.stopAngle = wheel.getRandomForSegment(rand());
        } else {
            wheel.animation.stopAngle = wheel.getRandomForSegment(
                Math.floor(Math.random() * initSegments.length) + 1
            );
        }
        // Начинаем крутить колесо
        wheel.startAnimation();
    }
});

// Пока колесо крутится
window.spinning = () => {
    elSpin.textContent = initSegments[wheel.getIndicatedSegmentNumber() - 1].text;
    elSpin.style.background = wheel.getIndicatedSegment().fillStyle;
};

// Колесо остановилось
window.finish = () => {
    let number = wheel.getIndicatedSegmentNumber();
    wheel.segments[number].text = plug;
    selected = selected.filter((e) => e !== number);
    wheel.draw();
    console.log('finished: ' + selected);
    isAnimation = false;
};

// Выбор случайного номера сегмента
const rand = () => {
    let find = Math.floor(Math.random() * (selected.length - 1 - 0) + 0);
    return selected[find];
};

// Ловим клики на колесе
canvas.onclick = function (e) {
    // Вызываем getSegmentNumberAt с передачей координат клика
    let clickedSegment = wheel.getSegmentNumberAt(e.clientX, e.clientY);
    // Определяем что делать с выбранным сегментом
    if (clickedSegment) {
        if (wheel.segments[clickedSegment].text == plug) {
            wheel.segments[clickedSegment].text = initSegments[clickedSegment - 1].text;
            selected.push(clickedSegment);
        } else {
            wheel.segments[clickedSegment].text = plug;
            selected = selected.filter((e) => e !== clickedSegment);
        }
        console.log('canvas click: ' + selected);
        wheel.draw();
    }
};

// Шутка
const elEasteregg = document.querySelector('#easteregg');
elEasteregg.addEventListener('click', (event) => {
    elEasteregg.classList.add('show');
    setTimeout(() => elEasteregg.classList.remove('show'), 700);
});