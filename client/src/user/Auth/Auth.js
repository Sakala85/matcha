import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from "../../shared/components/FormElements/Input";
import {
  // VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState();
  const [errorState, setErrorState] = useState();
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
          pseudo: {
            value: "",
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginMode) {
    } else {
      try {
        setisLoading(true);
        const response = await fetch("http://localhost:5000/api/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            pseudo: formState.inputs.pseudo.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });
        const responseData = await response.json();
        if(!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setisLoading(false);
        auth.login();
      } catch (err) {
        console.log(err);
        setError(err.message || "Something went wrong please try again");
        setErrorState(true);
      }
    }
    setisLoading(false);
  };

  const errorHandler = () => {
    setErrorState(false);
  }

  return (
    <React.Fragment>
      <ErrorModal show={errorState} error={error} onHide={errorHandler} />
    <div className="form__Auth">
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <div className="InputForm__LogIn">
            {isLoading && <LoadingSpinner asOverlay/>}
            <Input
              element="input"
              id="pseudo"
              type="text"
              label="Your Pseudo"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a pseudo."
              onInput={inputHandler}
            />
          </div>
        )}
        <div className="InputForm__LogIn">
          <Input
            element="input"
            id="email"
            type="text"
            label="E-Mail"
            validators={[VALIDATOR_REQUIRE()]}
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
      <br />
      <Button onClick={switchModeHandler} variant="dark">
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </div>
    </React.Fragment>
  );
};

export default Auth;
