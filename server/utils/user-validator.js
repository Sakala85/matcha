const emailValidate = (email) => {
    //emailRegex verifie si email correspond a abc@rst.xyz
    const emailRegex = RegExp("[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", "g");
    if(!email) {
        return "Error empty email bitch!- your email must be something like abc@rst.xyz";
    }
    if(!emailRegex.test(email) ){
        return "Email must be something like abc@rst.xyz";
    }
    return ""
};


const passwordValidate = (password) => {
    const illegalChars =  /\W/;
    if (!password) {
        return "Error empty password bitch!";
    }
    if(password.length < 5){
        return "The password is too short, minimum 5 chars";
    }
    if(illegalChars.test(password)){
        return "The Password can only contains '-', '_', alpha-num.";
    }
    return ""
};

const usernameValidate = (username) => {
    const illegalChars = /\W/;
    if(!username) {
        return "Error empty username bitch!";
    }
    if(username.length < 2 ){
        return "The username is too short, minimum 2 chars";
    }
    if (username.length > 15) {
        return "The username is too long, maximum 15 chars";
    }
    if (illegalChars.test(username)) {
      return "The username can only contains '-', '_', alpha-num.";
    }
    return ""
};

const validatorRequire = (param) => {
    // const illegalChars = /\W/;
    if(!param) {
        return false;
    }
    return true;
};

const validatorIsId = (param) => {
    if(Number.isInteger(param)){
    return true;
    }
    return false;
}

const lastnameValidate = (lastname) => {
    //const illegalChars = /\W/;
    if (!lastname) {
        return "Error empty lastname!";
    }
    return "";
};

const firstnameValidate = (firstname) => {
  //const illegalChars = /\W/;
  if (!firstname) {
    return "Error empty firstname!";
  }
  return "";
};

const userValidateAll = (email, password, username, firstname, lastname) => {
    const errEmail = emailValidate(email)
    const errPassword = passwordValidate(password)
    const errUsername = usernameValidate(username)
    const errFirstname = firstnameValidate(firstname)
    const errLastname = lastnameValidate(lastname);

    if(errEmail){
        return errEmail
    }
    if(errPassword){
        return errPassword;
    }
    if(errUsername){
        return errUsername
    }  
    if (errFirstname) {
        return errFirstname;
    }
    if (errLastname) {
      return errLastname;
    }
    return ""
};

exports.userValidateAll = userValidateAll
exports.validatorRequire = validatorRequire
exports.validatorIsId = validatorIsId
