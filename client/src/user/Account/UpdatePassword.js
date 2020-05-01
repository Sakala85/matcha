import React, { useState, useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_PASSWORD,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { Modal} from "react-bootstrap";

const UpdatePassword = () => {
  const { isLoading, error, sendRequest, clearError, errorMessage } = useHttpClient();
  const [changedPassword, setChangedPassword] = useState(false);
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      oldPassword: {
        value: '',
        isValid: false
      },
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
        `http://localhost:5000/api/user/pwd/${auth.userId}`,
        "PATCH",
        JSON.stringify({
            oldPassword: formState.inputs.oldPassword.value,
            newPassword: formState.inputs.newPassword.value,
            repeatPassword: formState.inputs.repeatPassword.value
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token
        }
      );
      if (!error){setChangedPassword(true)}
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
        <Modal.Header>
          <div className="titleUpdate">Password settings</div>
        </Modal.Header>
        {!isLoading && (
          <form className="formUpdatePassword" onSubmit={UpdateSubmitHandler}>
            <div className="InputForm__Password">
              <Input
                id="oldPassword"
                element="input"
                type="password"
                label="Old Password"
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
                id="newPassword"
                element="input"
                type="password"
                label="New Password"
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
                label="Repeat Password"
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
              className="button__logIn__signUp"
            >
              Update Password
            </button>
          </form>
        )}
        {changedPassword && <h3>Password Changed</h3>}

    </React.Fragment>
  );
};

export default UpdatePassword;
