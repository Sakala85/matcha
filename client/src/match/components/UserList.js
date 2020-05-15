import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
// import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useCookies } from "react-cookie";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import UserItem from "./UserItem";
import "./UserList.css";
import { Row } from "react-bootstrap";
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
  const [all, setAll] = useState(true);
  const [interestList, setInterestList] = useState();
  const [checkedInterest, setCheckedInterest] = useState([]);

  const checkElement = (e) => {
    const { id, name, checked } = e.target;
      var tmp = checkedInterest;
      if (checked === true) {
      tmp.push({ name: name, id: id });
      setCheckedInterest(tmp);
    } else {
      tmp = tmp.filter((interest) => interest.name !== name)
      setCheckedInterest(tmp);
    }
    finalFilterUsers(props.items);
  };

  const getInterest = (userIdI) => {
    const rep = interestList.filter((id) => id.id_user === userIdI);
    console.log(rep)
    return(rep)
  }

  const checkAll = () => {
    if (all === true) {
      setAll(false)
    } else {
      setAll(true)
    }
  }

  const interested = (usersFirstFiltered) => {
    if (all === true) {
      return (true);
    }
    var rep = false;
    if (checkedInterest && interestList) {
      checkedInterest.map((interestChe) => {
        if (!rep){
          rep = interestList.filter((id) => id.id_user === usersFirstFiltered.id);
          rep = rep.find(
            (interest) => +interest.id_interest_list === +interestChe.id
          );
        }
        
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
          (user) => +user.id === +usersInterested.id_user
        );
        if (tmp) {
          tmpFinalUsers.push(tmp);
        }
        return null;
      });
    }
    setFinalUsers(tmpFinalUsers);
  };

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
    <Row md={{ span: 10, offset: 1 }}>
      <ErrorModal show={error} error={errorMessage} onHide={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <form className="interest">
        {loadedInterest &&
          loadedInterest.map((item) => (
            <div key={item.id} id={item.id} data-key={item.id}>
              <label>{item.interest}</label>
              <input
                type="checkbox"
                id={item.id_interest_list}
                key={item.id}
                name={item.interest}
                onClick={checkElement}
                defaultChecked={false}
              />
            </div>
          ))}
        <label>All</label>
        <input
          type="checkbox"
          id="all"
          key="all"
          name="all"
          onClick={checkAll}
          defaultChecked={true}
        />
      </form>
      {/* <ul> */}
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
                  firstname={user.firstname}
                  lastname={user.lastname}
                  orientation={user.orientation}
                  bio={user.bio}
                  gender={user.gender}
                  interest={getInterest(user.id)}
                  age={user.age}
                  popularity={user.popularity}
                  online={user.online}
                  last_visit={user.last_visit}
                />
              );
            } else {
              return null;
            }
          })}
        {/* </ul> */}
    </Row>
  );
};

export default UserList;
