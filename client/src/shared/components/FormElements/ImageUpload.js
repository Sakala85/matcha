import React, { useRef, useState, useEffect } from 'react';
import Icon from "@material-ui/core/Icon";

import './ImageUpload.css';

const ImageUpload = props => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = event => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      {/* <div className={`image-upload ${props.center && "center"}`}> */}
      <div>
        {previewUrl && <img className="update-photo" src={previewUrl} alt="Preview" />}
        {!previewUrl && <img className="update-photo" src={props.default} alt="oldPick" />}
      </div>
      <div>

       {isValid && <button className="disketteBouton">
          <Icon className="savedisket"> save</Icon>
        </button>}
      </div>
      <div>
        <button type="button" onClick={pickImageHandler}  className="penBouton">
          <Icon className="change-image"> create</Icon>
        </button>
      </div>

    </div>
  );
};

export default ImageUpload;
