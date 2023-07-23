const R = require('ramda');

// R.inc(2)
// console.log (R.inc(2))

const sum = (a, b) => a + b;

// функция конструкция первого класса

// чистая функция
// не имеет побочных эффектов
// возвращает одинаковый результат для одинаковых аргументов
// не зависит от внешнего контекста

// примеры чистых функций
function arrLength(arr) {
    return arr.length;
}

// иммутабельность
// структуры данных неизменяемы
const nums = [1, 2, 3, 4, 5];

// math.js

// sum and substraction

const res = R.add(2)(3); // каррирование
console.log (res);
const add6 = R.add(6);
console.log (add6(10));


// string.js

// Format string

console.log (R.toLower('HELLO_toLower'));
console.log (R.toUpper('hello_toUpper'));

// trim

console.log (R.trim('   trim   '));

//
str = 'I love cats';



console.log (R.replace(/cats/, 'React') ( str));

// split

console.log (R.split(' ') (str));

// tostring

console.log (R.toString ([1,2,3,4,5]));
console.log (R.toString ({a: 1, inc() {return this.a + 1}}));

// test regexp

console.log (R.match(/[a-z]a/g) (str));
console.log (R.test (/[a-z]a/g) (str));


// main concats

console.log (R.concat(str) (' world'));

//head

console.log (R.head ([1,2,3,4,5]));
//  last

console.log (R.last ([1,2,3,4,5]));

// length

console.log (R.length (str));

// pipe and compose

// get youtube link

const link = 'https://www.youtube.com/watch?v=K8kua5B5K3I';
const embedLink = 'https://www.youtube.com/embed/';




const convertLink = R.pipe (
  R.match('[?&]v=([^&]+)'),
  R.head,
  R.split('='),
  R.last,
  R.concat(embedLink),
)

console.log (convertLink(link));


// sizes

const sizes = {
  xs: '1rem',
  sm: '2rem',
  md: '3rem',
  lg: '4rem',
  xl: '5rem',}

const convertRem = R.pipe (
parseFloat,
R.multiply(16),
  Math.round,
  R.toString,
  R.concat(R.__,'px'),
  )
console.log (R.map(convertRem)(sizes))


// object.js

const person = {
  name: 'Mikhail',
  secondName: 'Petrov',
  age: 33,
  city: 'Moscow',
  country: 'Russia',
  job: 'Frontend',
  friends: ['Alex', 'Max', 'Leo'],
  language: "ru",
  car: {
    model: 'BMW',
    year: 2020,
  }
}

const person2 = {
  name: 'Maksim',
  age: 25,
  city: 'New York',
  country: 'USA',
  job: 'Backend',
  secondName: 'Ivanov',
  friends: ['Alex', 'Max', 'Leo'],
  language: "en",
  car: {
    model: 'Audi',
    year: 2019,
    engine: {
      volume: 2.0,
      type: 'diesel',
    }
  }
}

console.log (R.prop('name')(person))
console.log (R.props(['name', 'age', 'city'])(person))
console.log (R.propOr('default', 'car')(person)) // если нет свойства, то вернет default
console.log (R.values(person))
console.log (R.keys(person))
console.log (R.path(['car', 'model'])(person))
console.log (R.pathOr('default', ['car', 'model'])(person)) // если нет свойства, то вернет default
console.log (R.toPairs(person)) // массив массивов

// copy object

const isNumber = R.is(Number); // проверка на тип

console.log (R.pick(['name', 'age', 'city'])(person))
console.log (R.pickAll(['name', 'age', 'city','??'])(person) )// если нет свойства, то вернет undefined
console.log (R.pickBy(isNumber)(person)) // возвращает при определенном условии
console.log (R.project(['name', 'age', 'city'])([person, person2])) // возвращает массив объектов с указанными свойствами
R.dissoc('age')(person) // удаляет свойство из объекта
console.log (R.omit(['name', 'age', 'city'])(person) )// удаляет указанные свойства из объекта
console.log (R.dissocPath(['car', 'model'])(person) )// удаляет свойство из объекта
R.clone(person) // копирует объект

// Predicates true or false
console.log (R.has('name')(person) )// проверка на наличие свойства

console.log (R.hasIn('toString')(person) )// проверка на наличие метода наследуемого объекта
console.log (R.has('toString')(person) )// проверка на наличие метода наследуемого объекта

R.hasPath(['car','model'])(person) // проверка на наличие свойства в объекте

console.log ('проверка на равенство свойств',R.eqProps('name')(person, person2) )//

console.log ("проверка на тип",R.propIs(Number, 'age')(person)) // проверка на тип

console.log ('добавляет свойство в объект',R.assoc('age', 34)(person) )// добавляет свойство в объект
console.log ('добавляет свойство в объект',R.assocPath(['car', 'model'], 'Audi')(person) )// добавляет свойство в объект


// merge objects

console.log (R.mergeLeft(person, person2)) // объединяет объекты, если есть одинаковые свойства, то берет из второго объекта
console.log (R.mergeRight(person, person2)) // объединяет объекты, если есть одинаковые свойства, то берет из первого объекта
console.log (R.mergeDeepRight(person, person2) )// объединяет объекты, если есть одинаковые свойства, то берет из второго объекта
R.mergeAll()


const hasName = R.has('name');

hasName(person)

// new object

console.log (R.applySpec({
  name: R.prop('name'),
  age: R.prop('age'),
  car: R.prop('car'),
  fullName: R.pipe(
    R.props(['name', 'secondName'],R.join(' ')),
  )

})(person))


console.log (R.ap(R.multiply, R.add(4))(2) )// применяет функцию к значению
