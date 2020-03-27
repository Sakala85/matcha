import React, { useState } from "react";

import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UpdatePassword = () => {
  const { isLoading, error, sendRequest, clearError, errorMessage } = useHttpClient();
  const [changedPassword, setChangedPassword] = useState(false);

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
        `http://localhost:5000/api/user/pwd/20`,
        "PATCH",
        JSON.stringify({
            oldPassword: formState.inputs.oldPassword.value,
            newPassword: formState.inputs.newPassword.value,
            repeatPassword: formState.inputs.repeatPassword.value
        }),
        {
          "Content-Type": "application/json"
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
      {!isLoading && (
        <form onSubmit={UpdateSubmitHandler}>
          <div className="InputForm__LogIn">
            <Input
              id="oldPassword"
              element="input"
              type="password"
              label="Old Password"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid Password. (min. 5 characters)."
              onInput={inputHandler}
              initialValue={''}
              initialValid={false}
            />
          </div>
          <div className="InputForm__LogIn">
            <Input
              id="newPassword"
              element="input"
              type="password"
              label="New Password"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid Password. (min. 5 characters)."
              onInput={inputHandler}
              initialValue={''}
              initialValid={false}
            />
          </div>
          <div className="InputForm__LogIn">
            <Input
              id="repeatPassword"
              element="input"
              type="password"
              label="Repeat Password"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid Password. (min. 5 characters)."
              onInput={inputHandler}
              initialValue={''}
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
