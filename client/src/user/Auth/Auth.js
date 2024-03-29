import React, { useState, useContext } from "react";
import { Modal, Container, Row, Col, Card } from "react-bootstrap";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_ALPHA,
  VALIDATOR_ALPHANUMERIC,
  VALIDATOR_PASSWORD,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Link } from "react-router-dom";
import image1 from "./img/femmelove.png";
import image2 from "./img/hommelove.png";
import image3 from "./img/cadenas.png";
import { useCookies } from "react-cookie";
import $ from "jquery";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [cookies, setCookie] = useCookies(["token"]);
  const [lat, setLat] = useState(false);
  const [lon, setLon] = useState(false);
  const [nav, setNav] = useState(false);
  const [location, setLocation] = useState(false);

  if (!lat || !lon) {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
      setNav(true);
      console.log(lat + lon + "Setted by navigator");
    });
    if (!nav) {
      $.ajax("http://ip-api.com/json").then(function success(response) {
        setLat(response.lat);
        setLon(response.lon);
        setLocation(true);
      });
      console.log(lat + lon + "Setted by ajax and network");
    } else if (!location) {
      setLat(49.0);
      setLon(-48.0);
      console.log("Default Location attributed");
    }
  }
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
          email: undefined,
          firstname: undefined,
          lastname: undefined,
        },
        formState.inputs.username.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          email: {
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
    if (
      isLoginMode &&
      formState.inputs.username.value === "admin1" &&
      formState.inputs.password.value === "Admin123"
    ) {
      let d = new Date();
      d.setTime(d.getTime() + 60 * 60 * 1000);
      setCookie("admin", "123", { path: "/", expires: d });
      d = cookies.admin;
      window.location.reload();
    } else if (isLoginMode && formState.inputs.username.value !== "admin") {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/user/login",
          "POST",
          JSON.stringify({
            username: formState.inputs.username.value,
            password: formState.inputs.password.value,
            lat: lat,
            lon: lon,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(
          responseData.userId,
          responseData.token,
          responseData.username,
          responseData.orientation,
          lat,
          lon,
          responseData.valid_profil,
          responseData.valid_email,
          responseData.gender
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
            lat: lat,
            lon: lon,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(
          responseData.userId,
          responseData.token,
          responseData.username,
          responseData.orientation,
          lat,
          lon,
          responseData.valid_profil,
          responseData.valid_email,
          responseData.gender
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
          <Card className="card-auth">
            <ErrorModal
              show={error}
              error={errorMessage}
              onHide={errorHandler}
            />
            <Modal.Header>
              <button
                onClick={switchModeHandler}
                className="button__logIn__signUp__switch"
              >
                SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
              </button>
              {/* <Modal.Title>{isLoginMode ? "LOGIN" : "SIGNUP"}</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
              {!isLoginMode && (
                <div className="InputForm__LogIn">
                  <img className="auth" src={image1} alt="image1" />
                  <img className="auth" src={image2} alt="image2" />
                </div>
              )}
              <form onSubmit={authSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                {!isLoginMode && (
                  <div className="InputForm__LogIn">
                    <Input
                      element="input"
                      id="email"
                      type="text"
                      placeholder="E-Mail"
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
                      placeholder="Name"
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
                      placeholder="Lastname"
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
                {isLoginMode && (
                  <div className="InputForm__LogIn">
                    <img className="auth" src={image3} alt="image3" />
                  </div>
                )}
                <div className="InputForm__LogIn">
                  <Input
                    element="input"
                    id="username"
                    type="text"
                    placeholder="Username"
                    validators={[
                      VALIDATOR_REQUIRE(),
                      VALIDATOR_ALPHANUMERIC(),
                      VALIDATOR_MINLENGTH(2),
                    ]}
                    errorText="Please enter a valid username. (min 2 characters), the username can contain only letters, numbers, '_' and '-' "
                    onInput={inputHandler}
                  />
                </div>
                <div className="InputForm__LogIn">
                  <Input
                    element="input"
                    id="password"
                    type="password"
                    placeholder="Password"
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
                  disabled={!formState.isValid}
                  className="button__logIn__signUp"
                >
                  {isLoginMode ? "login" : "signup"}
                </button>
              </form>
            </Modal.Body>

            <Link to="/forgetpassword">Mot de passe oublié?</Link>
            {/* </Modal> */}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
