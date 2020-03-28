import React from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

const InterestItem = props => {
  const { sendRequest } = useHttpClient();

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
      <button onClick={deleteInterest}>x</button>
      {props.interest}
    </li>
  );
};

export default InterestItem;
