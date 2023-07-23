
// Решение на ФП
// import * as R from "ramda";
// import _ from "lodash";
//
// import Api from "../tools/api";
//
// const {
//   __,
//   gt,
//   lt,
//   length,
//   compose,
//   test,
//   prop,
//   both,
//   allPass,
//   ifElse,
//   concat,
//   otherwise,
//   mathMod,
//   andThen,
//   tap,
//   partial,
//   pipe,
//   assoc,
// } = R;
// const {toNumber, toString, round} = _;
//
// // init
// const api = new Api ();
//
// // constants
// const numberRegexp = /^\d+(\.\d+)?$/;
// const URLS = {
//   BASE_NUMBERS: "https://api.tech/numbers/base",
//   BASE_ANIMALS: "https://animals.tech/",
// };
// const ERRORS = {
//   VALIDATION_ERROR: "ValidationError",
// };
// const PROPS = {
//   RESULT: "result",
//   NUMBER: "number",
// };
//
// // validation
// const isLessThan10 = lt (__, 10);
// const isMoreThan2 = gt (__, 2);
// const isInBoundaries = both (isLessThan10, isMoreThan2);
// const isLengthValid = compose (isInBoundaries, length);
// const isNumber = test (numberRegexp);
// const isInputValid = allPass ([isLengthValid, isNumber]);
//
// // mutation
// const addNumberToProps = assoc (PROPS.NUMBER, __, {from: 10, to: 2});
// const getResult = pipe (prop (PROPS.RESULT), toString);
// const square = (value) => value ** 2;
// const mod3 = mathMod (__, 3);
// const formUrlToGetAnimal = concat (URLS.BASE_ANIMALS);
//
// // api
// const convertToBinaryBase = pipe (addNumberToProps, api.get (URLS.BASE_NUMBERS));
// const getAnimal = api.get (__, {});
//
// const processSequence = ({value, writeLog, handleSuccess, handleError}) => {
//   const handleValidationError = partial (handleError, [ERRORS.VALIDATION_ERROR]);
//   const tapWriteLog = tap (writeLog);
//   const runSequence = pipe (
//     toNumber,
//     round,
//     tapWriteLog,
//     convertToBinaryBase,
//     andThen (getResult),
//     andThen (tapWriteLog),
//     andThen (length),
//     andThen (tapWriteLog),
//     andThen (square),
//     andThen (tapWriteLog),
//     andThen (mod3),
//     andThen (tapWriteLog),
//     andThen (toString),
//     andThen (formUrlToGetAnimal),
//     andThen (getAnimal),
//     andThen (getResult),
//     andThen (handleSuccess),
//     otherwise (handleError)
//   );
//
//   const runIfValid = ifElse (isInputValid, runSequence, handleValidationError);
//
//   const app = compose (runIfValid, tapWriteLog);
//
//   app (value);
// };
//
// export default processSequence;

// Решение на ООП

import Api from "../tools/api";

const api = new Api();

const numberRegexp = /^\d+(\.\d+)?$/;
const URLS = {
  BASE_NUMBERS: "https://api.tech/numbers/base",
  BASE_ANIMALS: "https://animals.tech/",
};
const ERRORS = {
  VALIDATION_ERROR: "ValidationError",
};

const isLengthValid = (value) => {
  const len = value.length;
  return len > 2 && len < 10;
};

const isNumber = (value) => numberRegexp.test(value);

const isInputValid = (value) => isLengthValid(value) && isNumber(value);

const addNumberToProps = (number) => {
  return {
    number: number,
    from: 10,
    to: 2
  };
};

const getResult = (response) => String(response.result);

const square = (value) => value ** 2;

const mod3 = (value) => value % 3;

const formUrlToGetAnimal = (remainder) => `${URLS.BASE_ANIMALS}${remainder}`;

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  writeLog(value);

  if (!isInputValid(value)) {
    handleError(ERRORS.VALIDATION_ERROR);
    return;
  }

  const roundedValue = Math.round(Number(value));
  writeLog(roundedValue);

  api.get(URLS.BASE_NUMBERS, addNumberToProps(roundedValue))
    .then((response) => {
      const binary = getResult(response);
      writeLog(binary);
      const binaryLength = binary.length;
      writeLog(binaryLength);
      const squaredValue = square(binaryLength);
      writeLog(squaredValue);
      const remainder = mod3(squaredValue);
      writeLog(remainder);
      return formUrlToGetAnimal(remainder);
    })
    .then((url) => api.get(url, {}))
    .then((response) => {
      const animal = getResult(response);
      writeLog(animal);
      handleSuccess(animal);
    })
    .catch(() => {
      handleError("API Error");
    });
};

export default processSequence;
