import React from "react";

import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const UpdateProfile = props => {
  const {
    isLoading,
    error,
    sendRequest,
    clearError,
    errorMessage
  } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {

      firstname: {
        value: props.items.firstname,
        isValid: false
      },
      lastname: {
        value: props.items.lastname,
        isValid: false
      },
      email: {
        value: props.items.mail,
        isValid: false
      },
      bio: {
        value: props.items.bio,
        isValid: false
      },
      gender: {
        value: props.items.gender,
        isValid: true
      },
      orientation: {
        value: props.items.orientation,
        isValid: true
      }
    },
    false
  );

  const UpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/user/20`,
        "PATCH",
        JSON.stringify({
          firstname: formState.inputs.firstname.value,
          lastname: formState.inputs.lastname.value,
          email: formState.inputs.email.value,
          bio: formState.inputs.bio.value,
          gender: formState.inputs.gender.value,
          orientation: formState.inputs.orientation.value
        }),
        {
          "Content-Type": "application/json"
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
  const handleChange = () => {};

  return (
    <React.Fragment>
      <ErrorModal show={error} error={errorMessage} onHide={clearError} />
      {!isLoading && (
        <form onSubmit={UpdateSubmitHandler}>
          <div className="InputForm__LogIn">
            <Input
              id="firstname"
              element="input"
              type="text"
              label="Firstname"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid firstname."
              onInput={inputHandler}
              initialValue={formState.inputs.firstname.value}
              initialValid={true}
            />
          </div>
          <div className="InputForm__LogIn">
            <Input
              id="lastname"
              element="input"
              type="text"
              label="Lastname"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid lastname."
              onInput={inputHandler}
              initialValue={formState.inputs.lastname.value}
              initialValid={true}
            />
          </div>
          <div className="InputForm__LogIn">
            <Input
              id="email"
              element="input"
              type="text"
              label="Email"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email."
              onInput={inputHandler}
              initialValue={formState.inputs.email.value}
              initialValid={true}
            />
          </div>
          <div className="InputForm__LogIn">
            <Input
              id="bio"
              element="textarea"
              label="Bio"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid Bio (min. 5 characters)."
              onInput={inputHandler}
              initialValue={formState.inputs.bio.value}
              initialValid={true}
            />
          </div>
          <Input
            id="gender"
            validators={[VALIDATOR_REQUIRE()]}
            element="gender"
            label="Gender"
            errorText="Please enter a valid Gender."
            initialValid={true}
            onInput={inputHandler}
            initialValue={formState.inputs.gender.value}
          />
          <Input
            id="orientation"
            element="orientation"
            validators={[VALIDATOR_REQUIRE()]}
            label="Orientation"
            errorText="Please enter an Orientation."
            initialValid={true}
            onInput={inputHandler}
            initialValue={formState.inputs.orientation.value}
          />
          {console.log(formState)}
          <button
            type="submit"
            disabled={!formState.isValid}
            className="button__logIn__signUp"
          >
            Update Profile
          </button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateProfile;
