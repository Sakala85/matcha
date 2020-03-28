import React from "react";
import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const PictureItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const pictureSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", props.picture);
      formData.append("image", formState.inputs.image.value);
      await sendRequest(
        "http://localhost:5000/api/user/picture/20",
        "PATCH",
        formData
      );
    } catch (err) {}
  };

  return (
    <form onSubmit={pictureSubmitHandler}>
      <ImageUpload
        default={props.default}
        center
        id="image"
        onInput={inputHandler}
        errorText="Please provide an Image !"
      />
      <button className="button__logIn__signUp" type="submit">
        SAVE IMAGE
      </button>
    </form>
  );
};

export default PictureItem;
