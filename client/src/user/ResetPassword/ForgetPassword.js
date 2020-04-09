import React, { useState } from "react";

import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { VALIDATOR_EMAIL } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

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
      }
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
          "Content-Type": "application/json"
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
      {!isLoading && (
        <form onSubmit={UpdateSubmitHandler}>
          <div className="InputForm__LogIn">
            <Input
              id="email"
              element="input"
              type="text"
              label="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            />
          </div>
        
          <button
            type="submit"
            disabled={!formState.isValid}
            className="button__logIn__signUp"
          >
            Change Password
          </button>
        </form>
      )}
      {changedPassword && <h3>Check tes mails pour changer de mdp</h3>}
    </React.Fragment>
  );
};

export default ForgetPassword;
