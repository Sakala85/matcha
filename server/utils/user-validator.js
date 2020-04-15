// Constantes de type de validation

const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_PASSWORD = "PASSWORD"
const VALIDATOR_TYPE_FILE = "FILE";
const VALIDATOR_TYPE_NUMBER = "NUMBER"
const VALIDATOR_TYPE_ALPHA = "ALPHA"
const VALIDATOR_TYPE_ALPHANUMERIC = "ALPHANUMERIC"
const VALIDATOR_TYPE_ORIENTATION = "ORIENTATION"
const VALIDATOR_TYPE_GENDER = "GENDER"

const GENDER_TYPE_MAN = "Man";
const GENDER_TYPE_WOMAN = "Woman";
const ORIENTATION_TYPE_MAN = "Man";
const ORIENTATION_TYPE_WOMAN = "Woman";
const ORIENTATION_TYPE_BOTH = "Both";


const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
const VALIDATOR_NUMBER = () => ({ type: VALIDATOR_TYPE_NUMBER });
const VALIDATOR_ALPHA = () => ({type: VALIDATOR_TYPE_ALPHA});
const VALIDATOR_ALPHANUMERIC = () => ({type: VALIDATOR_TYPE_ALPHANUMERIC});
const VALIDATOR_ORIENTATION = () => ({type: VALIDATOR_TYPE_ORIENTATION})
const VALIDATOR_GENDER = () => ({type: VALIDATOR_TYPE_GENDER})
const VALIDATOR_PASSWORD = () => ({ type: VALIDATOR_TYPE_PASSWORD });


const validate = (value, validators) => {
    let isValid = {valid: true};
  
    for (const validator of validators) {
      if (validator.type === VALIDATOR_TYPE_REQUIRE && !(value)) {
          return {valid: false, message: `Missing informations, fill the form! : error message de type ${VALIDATOR_TYPE_REQUIRE}`}
      }
      if (validator.type === VALIDATOR_TYPE_EMAIL && !(/^\S+@\S+\.\S+$/).test(value)) {
        return {valid: false, message: `Email must be something like abc@rst.xyz : error message de type ${VALIDATOR_TYPE_EMAIL}`}
      }
      if (validator.type === VALIDATOR_TYPE_PASSWORD && !(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/).test(value) ) {
        return {valid: false, message: `The password need contain 1 uppercase, 1 lowercase & 1 number: error message de type ${VALIDATOR_TYPE_PASSWORD}`};
      }
      if (validator.type === VALIDATOR_TYPE_MINLENGTH && !(value.trim().length >= validator.val)) {
          return {valid: false, message: `The ${value} have a length too short: error message de type ${VALIDATOR_TYPE_MINLENGTH}`}
      }
      if (validator.type === VALIDATOR_TYPE_MAXLENGTH && !(value.trim().length <= validator.val)) {
          return {valid: false, message: `The ${value} have a length too long: error Message de type ${VALIDATOR_TYPE_MAXLENGTH}`}
      }
      if (validator.type === VALIDATOR_TYPE_MIN && !(+value >= validator.val)) {
          return {valid: false, message: `The ${value} error Message de type ${VALIDATOR_TYPE_MIN}`}
      }
      if (validator.type === VALIDATOR_TYPE_MAX && !(+value <= validator.val)) {
          return {valid: false, message: `The ${value} error Message de type ${VALIDATOR_TYPE_MAX}`}
      }
      if (validator.type === VALIDATOR_TYPE_NUMBER && !(Number.isInteger(Number(value)))) { 
          return {valid: false, message: `The ${value} is not a valid number: error Message de type ${VALIDATOR_TYPE_NUMBER}`}
      }
      if (validator.type === VALIDATOR_TYPE_ALPHA && !(/^[a-zA-Z.-]*$/).test(value)) {
          return {valid: false, message: `The ${value} it's wrong, this input should contain only letters or '-': error Message de type ${VALIDATOR_TYPE_ALPHA}`}
      }
      if (validator.type === VALIDATOR_TYPE_ALPHANUMERIC && !(/^[a-zA-Z0-9_.-]*$/).test(value)) {
          return {valid: false, message: `The ${value} it's wrong, this input can contain only letters, numbers & '_' & '-' : error Message de type ${VALIDATOR_TYPE_ALPHANUMERIC}`}
      }
      if (validator.type === VALIDATOR_TYPE_GENDER && value !== GENDER_TYPE_MAN && value !== GENDER_TYPE_WOMAN) {
          return {valid: false, message: `The ${value} it's not a valid gender : error Message de type ${VALIDATOR_TYPE_GENDER}`}
      }
      if (validator.type === VALIDATOR_TYPE_ORIENTATION && value !== ORIENTATION_TYPE_MAN && value !== ORIENTATION_TYPE_WOMAN && value !== ORIENTATION_TYPE_BOTH) {
          return {valid: false, message: `The ${value} it's not a valid orientation : error Message de type ${VALIDATOR_TYPE_ORIENTATION}`}
      }
    }
    return isValid;
  };
  

const userValidateAll = (email, password, username, firstname, lastname) => {
    const isValid = {valid: true}

    const passwordValid = validate(password, [VALIDATOR_REQUIRE(), VALIDATOR_PASSWORD(), VALIDATOR_MINLENGTH(6), VALIDATOR_MAXLENGTH(30)]);
    const emailValid = validate(email, [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]);
    const firstnameValid = validate(firstname, [VALIDATOR_REQUIRE(), VALIDATOR_ALPHA(), VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(15)]);
    const lastnameValid = validate(lastname, [VALIDATOR_REQUIRE(), VALIDATOR_ALPHA(), VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(15)]);
    const usernameValid = validate(username, [VALIDATOR_REQUIRE(), VALIDATOR_ALPHANUMERIC(), VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(15)]);

    if (!passwordValid.valid) {
        return passwordValid;
    }
    if (!emailValid.valid) {
        return emailValid;
    }
    if (!firstnameValid.valid) {
        return firstnameValid;
    }
    if (!lastnameValid.valid) {
        return lastnameValid;
    }
    if (!usernameValid.valid) {
        return usernameValid;
    }
    return isValid
}

const updateUserValidate = ( username, firstname, lastname, email, bio, gender, orientation, age, userId) => {
    const isValid = {valid: true}

    const usernameValid = validate(username, [VALIDATOR_REQUIRE(), VALIDATOR_ALPHANUMERIC(), VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(15)]);
    const firstnameValid = validate(firstname, [VALIDATOR_REQUIRE(), VALIDATOR_ALPHA(), VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(15)]);
    const lastnameValid = validate(lastname, [VALIDATOR_REQUIRE(), VALIDATOR_ALPHA(), VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(15)]);
    const emailValid = validate(email, [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]);
    const bioValid = validate(bio, [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(255)]);
    const genderValid = validate(gender, [VALIDATOR_REQUIRE(), VALIDATOR_GENDER()]);
    const orientationValid = validate(orientation, [VALIDATOR_REQUIRE(), VALIDATOR_ORIENTATION()]);
    const ageValid = validate(age, [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER(), VALIDATOR_MIN(18), VALIDATOR_MAX(120)]);
    const userIdValid = validate(userId, [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]);

    if (!usernameValid.valid) {
        return usernameValid;
    }
    if (!firstnameValid.valid) {
        return firstnameValid;
    }
    if (!lastnameValid.valid) {
        return lastnameValid;
    }
    if (!emailValid.valid) {
        return emailValid;
    }
    if (!bioValid.valid) {
        return bioValid;
    }
    if (!genderValid.valid) {
      return genderValid;
    }
    if (!orientationValid.valid) {
      return orientationValid;
    }
    if (!ageValid.valid) {
      return ageValid;
    }
    if (!userIdValid.valid) {
      return userIdValid;
    }
    return isValid
}

exports.userValidateAll = userValidateAll;
exports.updateUserValidate = updateUserValidate;
exports.validate = validate;
exports.VALIDATOR_MIN = VALIDATOR_MIN;
exports.VALIDATOR_MAX = VALIDATOR_MAX;
exports.VALIDATOR_EMAIL = VALIDATOR_EMAIL;
exports.VALIDATOR_NUMBER = VALIDATOR_NUMBER;
exports.VALIDATOR_ALPHA = VALIDATOR_ALPHA;
exports.VALIDATOR_ALPHANUMERIC = VALIDATOR_ALPHANUMERIC;
exports.VALIDATOR_GENDER = VALIDATOR_GENDER;
exports.VALIDATOR_PASSWORD = VALIDATOR_PASSWORD;
exports.VALIDATOR_REQUIRE = VALIDATOR_REQUIRE;
exports.VALIDATOR_MINLENGTH = VALIDATOR_MINLENGTH;