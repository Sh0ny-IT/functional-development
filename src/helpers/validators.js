import {allPass, complement, compose, equals, prop, propEq} from 'ramda';
/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

// Функции для сравнения типов фигур

const isStar = prop('star'); // функция, возвращающая значение поля star
const isTriangle = prop('triangle'); // функция, возвращающая значение поля triangle
const isSquare = prop('square'); // функция, возвращающая значение поля square
const isCircle = prop('circle'); // функция, возвращающая значение поля circle

// Функции для сравнения цветов фигур

const isRed = equals('red'); // функция, возвращающая true, если цвет фигуры red
const isWhite = equals('white'); // функция, возвращающая true, если цвет фигуры white
const isGreen = equals('green'); // функция, возвращающая true, если цвет фигуры green
const isOrange = equals('orange'); // функция, возвращающая true, если цвет фигуры orange
const isBlue = equals('blue'); // функция, возвращающая true, если цвет фигуры blue


// Функции для сравнения цветов фигур

const isRedStar = compose(isRed, isStar); // функция, возвращающая true, если цвет фигуры red и тип star
const isWhiteStar = compose(isWhite, isStar); // функция, возвращающая true, если цвет фигуры white и тип star
const isGreenStar = compose(isGreen, isStar); // функция, возвращающая true, если цвет фигуры green и тип star
const isOrangeStar = compose(isOrange, isStar); // функция, возвращающая true, если цвет фигуры orange и тип star
const isBlueStar = compose(isBlue, isStar); // функция, возвращающая true, если цвет фигуры blue и тип star

const isRedTriangle = compose(isRed, isTriangle); // функция, возвращающая true, если цвет фигуры red и тип triangle
const isWhiteTriangle = compose(isWhite, isTriangle); // функция, возвращающая true, если цвет фигуры white и тип triangle
const isGreenTriangle = compose(isGreen, isTriangle); // функция, возвращающая true, если цвет фигуры green и тип triangle
const isOrangeTriangle = compose(isOrange, isTriangle); // функция, возвращающая true, если цвет фигуры orange и тип triangle
const isBlueTriangle = compose(isBlue, isTriangle); // функция, возвращающая true, если цвет фигуры blue и тип triangle

const isRedSquare = compose(isRed, isSquare); // функция, возвращающая true, если цвет фигуры red и тип square
const isWhiteSquare = compose(isWhite, isSquare); // функция, возвращающая true, если цвет фигуры white и тип square
const isGreenSquare = compose(isGreen, isSquare); // функция, возвращающая true, если цвет фигуры green и тип square
const isOrangeSquare = compose(isOrange, isSquare); // функция, возвращающая true, если цвет фигуры orange и тип square
const isBlueSquare = compose(isBlue, isSquare); // функция, возвращающая true, если цвет фигуры blue и тип square

const isRedCircle = compose(isRed, isCircle); // функция, возвращающая true, если цвет фигуры red и тип circle
const isWhiteCircle = compose(isWhite, isCircle); // функция, возвращающая true, если цвет фигуры white и тип circle
const isGreenCircle = compose(isGreen, isCircle); // функция, возвращающая true, если цвет фигуры green и тип circle
const isOrangeCircle = compose(isOrange, isCircle); // функция, возвращающая true, если цвет фигуры orange и тип circle
const isBlueCircle = compose(isBlue, isCircle); // функция, возвращающая true, если цвет фигуры blue и тип circle



// 1. Красная звезда, зеленый квадрат, все остальные белые.

export const validateFieldN1 = allPass([isRedStar, isGreenSquare, isWhiteTriangle, isWhiteCircle]);

// 2. Как минимум две фигуры зеленые.

const length = (arr) => arr.length;
const filter = (fn) => (arr) => arr.filter(fn);
const values = (obj) => Object.values(obj);
const isTwoGreen = compose(equals(2), length, filter(isGreen), values);
const isTwoOther = compose(equals(2), length, filter(complement(isGreen)), values);



export const validateFieldN2 = allPass([isTwoGreen, isTwoOther]);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = () => false;

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = () => false;

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = () => false;

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = () => false;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = () => false;

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = () => false;

// 9. Все фигуры зеленые.
export const validateFieldN9 = () => false;

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = () => false;
