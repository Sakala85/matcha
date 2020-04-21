import React, { useContext } from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { AuthContext } from "../../shared/context/auth-context";
import { Card } from "react-bootstrap";

const UpdatePicture = props => {
  const { isLoading, error, sendRequest, clearError, errorMessage } = useHttpClient();
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      picture1: {
        value: null,
        isValid: false
      },
      picture2: {
        value: null,
        isValid: false
      },
      picture3: {
        value: null,
        isValid: false
      },
      picture4: {
        value: null,
        isValid: false
      },
      picture5: {
        value: null,
        isValid: false
      },
    },
    false
  );

  const pictureSubmitHandler1 = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", "picture1");
      formData.append("image", formState.inputs.picture1.value);
      await sendRequest(
        `http://localhost:5000/api/user/picture/${auth.userId}`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
  };
  const pictureSubmitHandler2 = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", "picture2");
      formData.append("image", formState.inputs.picture2.value);
      await sendRequest(
        `http://localhost:5000/api/user/picture/${auth.userId}`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
  };
  const pictureSubmitHandler3 = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", "picture3");
      formData.append("image", formState.inputs.picture3.value);
      await sendRequest(
        `http://localhost:5000/api/user/picture/${auth.userId}`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
  };
  const pictureSubmitHandler4 = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", "picture4");
      formData.append("image", formState.inputs.picture4.value);
      await sendRequest(
        `http://localhost:5000/api/user/picture/${auth.userId}`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
  };
  const pictureSubmitHandler5 = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", "picture5");
      formData.append("image", formState.inputs.picture5.value);
      await sendRequest(
        `http://localhost:5000/api/user/picture/${auth.userId}`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
  };


  return (
    <React.Fragment>
      <Card className="settingsPicture">
        <ErrorModal show={error} error={errorMessage} onHide={clearError} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        <form onSubmit={pictureSubmitHandler1}>
          <ImageUpload
            default={props.items.picture1}
            center
            id="picture1"
            onInput={inputHandler}
            errorText="Please provide an Image !"
          />
          <button className="button__logIn__signUp" type="submit">
            SAVE IMAGE
          </button>
        </form>
        <form onSubmit={pictureSubmitHandler2}>
          <ImageUpload
            default={props.items.picture2}
            center
            id="picture2"
            onInput={inputHandler}
            errorText="Please provide an Image !"
          />
          <button className="button__logIn__signUp" type="submit">
            SAVE IMAGE
          </button>
        </form>
        <form onSubmit={pictureSubmitHandler3}>
          <ImageUpload
            default={props.items.picture3}
            center
            id="picture3"
            onInput={inputHandler}
            errorText="Please provide an Image !"
          />
          <button className="button__logIn__signUp" type="submit">
            SAVE IMAGE
          </button>
        </form>
        <form onSubmit={pictureSubmitHandler4}>
          <ImageUpload
            default={props.items.picture4}
            center
            id="picture4"
            onInput={inputHandler}
            errorText="Please provide an Image !"
          />
          <button className="button__logIn__signUp" type="submit">
            SAVE IMAGE
          </button>
        </form>
        <form onSubmit={pictureSubmitHandler5}>
          <ImageUpload
            default={props.items.picture5}
            center
            id="picture5"
            onInput={inputHandler}
            errorText="Please provide an Image !"
          />
          <button className="button__logIn__signUp" type="submit">
            SAVE IMAGE
          </button>
        </form>
      </Card>
    </React.Fragment>
  );
};



export default UpdatePicture;