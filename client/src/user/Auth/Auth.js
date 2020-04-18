import React, { useState, useContext } from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_ALPHA,
  VALIDATOR_ALPHANUMERIC,
  VALIDATOR_PASSWORD
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Link } from "react-router-dom";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    isLoading,
    error,
    sendRequest,
    clearError,
    errorMessage,
  } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.username.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          username: {
            value: "",
            isValid: false,
          },
          firstname: {
            value: "",
            isValid: false,
          },
          lastname: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/user/login",
          "POST",
          JSON.stringify({
            username: formState.inputs.username.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(
          responseData.userId,
          responseData.token,
          responseData.username
        );
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/user/signup",
          "POST",
          JSON.stringify({
            username: formState.inputs.username.value,
            firstname: formState.inputs.firstname.value,
            lastname: formState.inputs.lastname.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(
          responseData.userId,
          responseData.token,
          responseData.username
        );
      } catch (err) {}
    }
  };

  const errorHandler = () => {
    clearError();
  };

  return (
    <Container className="containerBack" fluid>
      <Row>
        <Col>
          <button className="button__logIn" onClick={handleShow}>
            LogIn or SignUp
          </button>
          <Modal show={show} onHide={handleClose}>
            <ErrorModal
              show={error}
              error={errorMessage}
              onHide={errorHandler}
            />
            <Modal.Header closeButton>
              <Modal.Title>{isLoginMode ? "LOGIN" : "SIGNUP"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={authSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                {!isLoginMode && (
                  <div className="InputForm__LogIn">
                    <Input
                      element="input"
                      id="email"
                      type="text"
                      label="E-Mail"
                      validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                      errorText="Please enter a valid email address (something like abc@rst.xyz)"
                      onInput={inputHandler}
                    />
                  </div>
                )}
                {!isLoginMode && (
                  <div className="InputForm__LogIn">
                    <Input
                      element="input"
                      id="firstname"
                      type="text"
                      label="Your Name"
                      validators={[
                        VALIDATOR_REQUIRE(),
                        VALIDATOR_ALPHA(),
                        VALIDATOR_MINLENGTH(2),
                      ]}
                      errorText="Please enter a valid Name. (min 2 characters), the name can contain only letters, or '-'"
                      onInput={inputHandler}
                    />
                  </div>
                )}
                {!isLoginMode && (
                  <div className="InputForm__LogIn">
                    <Input
                      element="input"
                      id="lastname"
                      type="text"
                      label="Your Lastname"
                      validators={[
                        VALIDATOR_REQUIRE(),
                        VALIDATOR_ALPHA(),
                        VALIDATOR_MINLENGTH(2),
                      ]}
                      errorText="Please enter a valid Lastname. (min 2 characters), the lastname can contain only letters, or '-'"
                      onInput={inputHandler}
                    />
                  </div>
                )}
                <div className="InputForm__LogIn">
                  <Input
                    element="input"
                    id="username"
                    type="text"
                    label="Your username"
                    validators={[
                      VALIDATOR_REQUIRE(),
                      VALIDATOR_ALPHANUMERIC(),
                      VALIDATOR_MINLENGTH(2),
                    ]}
                    errorText="Please enter a valid userName. (min 2 characters), the username can contain only letters, numbers, '_' and '-' "
                    onInput={inputHandler}
                  />
                </div>
                <div className="InputForm__LogIn">
                  <Input
                    element="input"
                    id="password"
                    type="password"
                    label="Password"
                    validators={[
                      VALIDATOR_REQUIRE(),
                      VALIDATOR_PASSWORD(),
                      VALIDATOR_MINLENGTH(6),
                    ]}
                    errorText="Please enter a valid Password. The password need contain 1 uppercase, 1 lowercase and 1 number (min. 6 characters)"
                    onInput={inputHandler}
                  />
                </div>
                <button
                  type="submit"
                  disabled={formState.isValid}
                  className="button__logIn__signUp"
                >
                  {isLoginMode ? "LOGIN" : "SIGNUP"}
                </button>
              </form>
            </Modal.Body>
            <button
              onClick={switchModeHandler}
              className="button__logIn__signUp__switch"
            >
              SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
            </button>
            <Link to="/forgetpassword">Mot de passe oublié?</Link>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
