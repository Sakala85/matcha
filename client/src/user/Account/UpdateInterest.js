import React, { useContext } from "react";
import InterestList from "./InterestList";
import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { VALIDATOR_REQUIRE , VALIDATOR_MINLENGTH} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { Card } from "react-bootstrap";

const UpdateInterest = (props) => {
  const {
    isLoading,
    error,
    sendRequest,
    clearError,
    errorMessage,
  } = useHttpClient();
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      interest: {
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
        `http://localhost:5000/api/user/interest/${auth.userId}`,
        "POST",
        JSON.stringify({
          interest: formState.inputs.interest.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
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
      <Card className="settingsInterest">
        <InterestList />
        <ErrorModal show={error} error={errorMessage} onHide={clearError} />
        {!isLoading && (
          <form onSubmit={UpdateSubmitHandler}>
            <div className="InputForm__LogIn">
              <Input
                id="interest"
                element="input"
                type="text"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2)]}
                label="Add Interest"
                errorText="Please enter an Interest. (2 characters min.)"
                initialValue=""
                initialValid={false}
                onInput={inputHandler}
              />
              <button
                type="submit"
                disabled={!formState.isValid}
                className="button__logIn__signUp"
              >
                Add Interest
              </button>
            </div>
          </form>
        )}
      </Card>
    </React.Fragment>
  );
};

export default UpdateInterest;
