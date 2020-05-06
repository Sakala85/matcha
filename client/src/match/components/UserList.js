import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
// import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useCookies } from "react-cookie";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import UserItem from "./UserItem";
import "./UserList.css";
import { Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const UserList = (props) => {
  const {
    isLoading,
    error,
    sendRequest,
    clearError,
    errorMessage,
  } = useHttpClient();
  const [cookies] = useCookies(["token"]);
  const [loadedInterest, setLoadedInterest] = useState();
  const [finalUsers, setFinalUsers] = useState(props.items);
  const [interestList, setInterestList] = useState();
  const [interestChecked, setInterestChecked] = useState([]);
  var checkedInterest = [];

  const checkElement = (e) => {
    const { id, name, checked } = e.target;
    if (checked === true) {
      checkedInterest.push({ name: name, id: id });
    } else {
      checkedInterest = checkedInterest.filter(
        (interest) => interest.name !== name
      );
    }
    setInterestChecked(checkedInterest);
    finalFilterUsers(props.items);
  };

  const interested = (usersFirstFiltered) => {
    console.log(navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    }))
    console.log("OKOK");
    var rep = false;
    if (interestChecked && interestList) {
      interestChecked.map((interestChe) => {
        rep = interestList.filter((id) => id.id_user === usersFirstFiltered.id);
        rep = rep.find(
          (interest) => +interest.id_interest_list === +interestChe.id
        );
        return null;
      });
    }
    if (rep) {
      return true;
    } else {
      return false;
    }
  };

  const finalFilterUsers = (usersFirstFiltered) => {
    var tmpFinalUsers = [];
    if (loadedInterest && interestList) {
      var returnedUsers = [];
      checkedInterest.map((interest) => {
        returnedUsers = interestList.filter(
          (interestItem) => +interestItem.id_interest_list === +interest.id
        );
        return null;
      });
    }
    if (returnedUsers) {
      returnedUsers.map((usersInterested) => {
        var tmp = usersFirstFiltered.find(
          (user) => user.id === usersInterested.id_user
        );
        if (tmp) {
          tmpFinalUsers.push(tmp);
        }
        return null;
      });
    }
    setFinalUsers(tmpFinalUsers);
  };

  // if (props.items) {
  //   finalFilterUsers(props.items)
  // }

  useEffect(() => {
    const fetchInterest = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/user/interest/${cookies.userId}`,
          "GET",
          null,
          {
            authorization: "Bearer " + cookies.token,
          }
        );
        setLoadedInterest(responseData.interest);
      } catch (err) {}
    };
    fetchInterest();
  }, [sendRequest, cookies.token, cookies.userId]);

  useEffect(() => {
    const fetchInterest = async () => {
      try {
        const responseInterestListData = await sendRequest(
          `http://localhost:5000/api/user/interest/list/all`,
          "GET",
          null,
          {
            authorization: "Bearer " + cookies.token,
          }
        );
        setInterestList(responseInterestListData.interest);
      } catch (err) {}
    };
    fetchInterest();
  }, [sendRequest, cookies.token, cookies.userId]);
  return (
    <Col md={{ span: 10, offset: 1 }}>
      <ErrorModal show={error} error={errorMessage} onHide={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <form>
        {loadedInterest &&
          loadedInterest.map((item) => (
            <div key={item.id} id={item.id} data-key={item.id}>
              <label>{item.interest}</label>
              <input
                type="checkbox"
                id={item.id}
                key={item.id}
                name={item.interest}
                onClick={checkElement}
                defaultChecked={false}
              />
            </div>
          ))}
        <label>All</label>
        <input type="checkbox" id="all" key="all" name="all" />
      </form>
      <ul>
        {finalUsers &&
          props.items.map((user) => {
            if (interested(user)) {
              return (
                <UserItem
                  key={user.id}
                  id={user.id}
                  picture={user.picture1}
                  picture2={user.picture2}
                  picture3={user.picture3}
                  picture4={user.picture4}
                  picture5={user.picture5}
                  username={user.username}
                  bio={user.bio}
                  gender={user.gender}
                  age={user.age}
                  popularity={user.popularity}
                  online={user.online}
                  // A Changer par une var Online (pas test)
                />
              );
            } else {
              return null;
            }
          })}
      </ul>
    </Col>
  );
};

export default UserList;
