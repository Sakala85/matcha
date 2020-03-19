import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from '../../shared/context/auth-context';
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  return (
    <div className="form__Auth">
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <div className="InputForm__LogIn">
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          </div>
        )}
        <div className="InputForm__LogIn">
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
        </div>
        <div className="InputForm__LogIn">
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          />
        </div>
        <Button type="submit" disabled={!formState.isValid} variant="dark">
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <br/>
      <Button onClick={switchModeHandler} variant="dark">
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </div>
  );
};

export default Auth;
