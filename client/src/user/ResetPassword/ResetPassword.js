import React, { useState } from "react";
import "./resetpass.css";

import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_PASSWORD,
  VALIDATOR_REQUIRE
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams, useHistory, Link } from "react-router-dom";
import { Card , Modal} from "react-bootstrap";

const ReinitializePassword = () => {
  const { isLoading, error, sendRequest, clearError, errorMessage } = useHttpClient();
  const [changedPassword, setChangedPassword] = useState(false);
  const tokenPassword = useParams().tokenPassword;

  let history = useHistory()
  const [formState, inputHandler] = useForm(
    {
      newPassword: {
        value: '',
        isValid: false
      },
      repeatPassword: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const UpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/user/resetpassword/${tokenPassword}`,
        "PATCH",
        JSON.stringify({
          newPassword: formState.inputs.newPassword.value,
          repeatPassword: formState.inputs.repeatPassword.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      if (!error){
        setChangedPassword(true)
        history.push("/match");

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
            You can choose now your new password. <br></br>
            The password need contain 1 uppercase, 1 lowercase and 1 number
            (min. 6 characters)
          </div>
        </Modal.Header>
        {!isLoading && (
          <form onSubmit={UpdateSubmitHandler}>
            <div className="InputForm__LogIn">
              <Input
                id="newPassword"
                element="input"
                type="password"
                placeholder="New Password"
                validators={[
                  VALIDATOR_REQUIRE(),
                  VALIDATOR_MINLENGTH(6),
                  VALIDATOR_PASSWORD(),
                ]}
                errorText="Please enter a valid Password. The password need contain 1 uppercase, 1 lowercase and 1 number (min. 6 characters)"
                onInput={inputHandler}
                initialValue={""}
                initialValid={false}
              />
            </div>
            <div className="InputForm__LogIn">
              <Input
                id="repeatPassword"
                element="input"
                type="password"
                placeholder="Repeat Password"
                validators={[
                  VALIDATOR_REQUIRE(),
                  VALIDATOR_MINLENGTH(6),
                  VALIDATOR_PASSWORD(),
                ]}
                errorText="Please enter a valid Password. The password need contain 1 uppercase, 1 lowercase and 1 number (min. 6 characters)"
                onInput={inputHandler}
                initialValue={""}
                initialValid={false}
              />
            </div>
            <button
              type="submit"
              disabled={!formState.isValid}
              className="button__reset"
            >
              update
            </button>
          </form>
        )}
        {changedPassword && <h6>Password Changed</h6>}
        <Link className="return" to="/">
          Click to return to the login
        </Link>
      </Card>
    </React.Fragment>
  );
};

export default ReinitializePassword;
