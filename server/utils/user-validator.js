const emailValidate = (email) => {
    console.log("EmailValidator")
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
    console.log("passwordvalidator")
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
    console.log("usernamevalidator")
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

const userValidateAll = (email, password, username) => {
    const errEmail = emailValidate(email)
    const errPassword = passwordValidate(password)
    const errUsername = usernameValidate(username)
    if(errEmail){
        return errEmail
    }
    
    if(errPassword){
        return errPassword;
    }
    if(errUsername){
        return errUsername
    }
    return ""

}

exports.userValidateAll = userValidateAll