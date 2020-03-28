import React from "react";
import PictureItem from "./PictureItem";
import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const UpdatePicture = props => {
  
  return (
      <ul>
          <li key="1"><PictureItem default={props.items.picture1} picture="picture1"/></li>
          <li key="2"><PictureItem default={props.items.picture2} picture="picture2"/></li>
          <li key="3"><PictureItem default={props.items.picture3} picture="picture3"/></li>
          <li key="4"><PictureItem default={props.items.picture4} picture="picture4"/></li>
          <li key="5"><PictureItem default={props.items.picture5} picture="picture5"/></li>
      </ul>
  );
};

export default UpdatePicture;