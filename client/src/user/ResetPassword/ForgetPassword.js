import React, { useState } from "react";
import "./resetpass.css";

import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE, } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Link } from "react-router-dom";
import { Card , Modal} from "react-bootstrap";

const ForgetPassword = () => {
  const {
    isLoading,
    error,
    sendRequest,
    clearError,
    errorMessage,
  } = useHttpClient();
  const [changedPassword, setChangedPassword] = useState(false);

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const UpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/user/forgetpassword`,
        "PATCH",
        JSON.stringify({
          email: formState.inputs.email.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      if (!error) {
        setChangedPassword(true);
      }
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal show={error} error={errorMessage} onHide={clearError} />
      <Card className="card-2">
        <Modal.Header>
          <div className="title">
            Please enter your email address to receive a link for reset your
            password
          </div>
        </Modal.Header>
        {!isLoading && (
          <form onSubmit={UpdateSubmitHandler}>
            <div className="InputForm__reset">
              <Input
                id="email"
                element="input"
                type="text"
                placeholder="E-Mail"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address (something like abc@rst.xyz)"
                onInput={inputHandler}
              />
            </div>

            <button
              type="submit"
              disabled={!formState.isValid}
              className="button__send__mail"
            >
              Send
            </button>
          </form>
        )}
        {changedPassword && <h6>Check your mail for update your password</h6>}
        <Link className="return" to="/">
          Click to return to the login
        </Link>
      </Card>
    </React.Fragment>
  );
};

export default ForgetPassword;
