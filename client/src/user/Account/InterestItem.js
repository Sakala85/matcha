import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

const InterestItem = props => {
    const {
      isLoading,
      error,
      sendRequest,
      clearError,
      errorMessage
    } = useHttpClient();

    const deleteInterest = async () => {
      try {
        await sendRequest(
          `http://localhost:5000/api/user/interest/${props.id}`,
          "DELETE"
        );
      } catch (err) {}
      props.onDelete(props.id);
    };

  return (
    <li key={props.id}>
      {console.log(props.id)}
      <button onClick={deleteInterest}>x</button>
      {props.interest}
    </li>
  );
};

export default InterestItem;
