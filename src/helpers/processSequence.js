import Api from '../tools/api';
import {__, andThen, gt, lt, pipe, compose, prop, assoc} from 'ramda';

const api = new Api();

const square = num => num ** 2;
const gtTwo = gt(__, 2);
const ltTen = lt(__, 10);
const positiveNumber = num => Number(num) > 0;

const RegExpNumber = /^[0-9]*\.?[0-9]+$/;
const testOnlyNumbers = value => RegExpNumber.test(value);

const validate = value => (
  gtTwo(value.length) &&
  ltTen(value.length) &&
  testOnlyNumbers(value) &&
  positiveNumber(value)
);

const API_NUMBERS_URL = 'https://api.tech/numbers/base';
const API_ANIMALS_URL = 'https://animals.tech/';
const getApiResult = compose(String, prop('result'));

const assocNumberToBinary = assoc('number', __, { from: 10, to: 2 });

const apiGetNumberBinaryBase = compose(
  api.get(API_NUMBERS_URL),
  assocNumberToBinary
);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  writeLog(value);

  if (!validate(value)) {
    handleError('ValidationError');
    return;
  }

  const roundedValue = Math.round(Number(value));
  writeLog(roundedValue);


  api.get(API_NUMBERS_URL, { from: 10, to: 2, number: roundedValue })
    .then(getApiResult)
    .then(binary => {
      writeLog(binary);

      const binaryLength = binary.length;
      writeLog(binaryLength);

      const squaredValue = square(binaryLength);
      writeLog(squaredValue);

      const remainder = squaredValue % 3;
      writeLog(remainder);

      return api.get(`${API_ANIMALS_URL}${remainder}`);
    })
    .then(getApiResult)
    .then(animal => {
      writeLog(animal);
      handleSuccess(animal);
    })
    .then(response => {
      console.log(response);
      return getApiResult(response);
    })
    .catch(() => {
      handleError('API Error');
    });
};


export default processSequence;
