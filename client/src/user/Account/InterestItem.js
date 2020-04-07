import React, { useContext } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const InterestItem = (props) => {
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  const deleteInterest = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/user/interest/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
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
