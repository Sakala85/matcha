import React, { useEffect, useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import UserList from "./UserList";
import "./FilterMatch.css";
import { Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useCookies } from "react-cookie";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import UserItem from "./UserItem";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const FilterMatch = (props) => {
  const [uniqueProfile, setUniqueProfile] = useState(false);
  const [loadedInterest, setLoadedInterest] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  const [cookies] = useCookies(["token"]);
  const [unique, setUnique] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (cookies.userId !== false && props.profile.profile) {
          const responseData = await sendRequest(
            `http://localhost:5000/api/user/match/${props.profile.profile}`,
            "GET",
            null,
            {
              Authorization: "Bearer " + cookies.token,
            }
          );
          setLoadedUsers(responseData.users);
        }
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, cookies, props]);
  useEffect(() => {
    if (uniqueProfile) {
      const fetchInterest = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:5000/api/user/interest/${uniqueProfile.id}`,
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
    }
  }, [sendRequest, cookies.token, cookies.userId, uniqueProfile]);
  function distance(lat1, lon1, lat2, lon2) {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      return dist;
    }
  }
  if (props.profile.profile && !unique && loadedUsers) {
    const user = loadedUsers.filter(
      (user) => user.username === props.profile.profile
    );
    if (user.length > 0) {
      setUniqueProfile(user[0]);
    }
    setUnique(true);
  }

  const [formState, inputHandler] = useForm(
    {
      ageMin: {
        value: "18",
        isValid: true,
      },
      ageMax: {
        value: "100",
        isValid: true,
      },
      distMax: {
        value: "100",
        isValid: true,
      },
      popMin: {
        value: "0",
        isValid: true,
      },
    },
    true
  );
  const filteredUsers1 = props.items.filter(
    (user) => user.age >= formState.inputs.ageMin.value
  );
  const filteredUsers2 = filteredUsers1.filter(
    (user) => user.age <= formState.inputs.ageMax.value
  );
  const filteredUsers3 = filteredUsers2.filter(
    (user) => +user.popularity >= +formState.inputs.popMin.value
  );
  const filteredUsers4 = filteredUsers3.filter(
    (user) =>
      +distance(user.latitude, user.longitude, cookies.lat, cookies.lon) <=
      +formState.inputs.distMax.value
  );

  return (
    <React.Fragment>
      <ErrorModal error={error} onHide={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <Col md={{ span: 10, offset: 1 }}>
        <form>
          <h4>Age</h4>
          {formState.inputs.ageMin.value}
          <Input
            id="ageMin"
            element="range"
            type="range"
            min="18"
            initialValue="18"
            max={formState.inputs.ageMax.value}
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            initialValid={true}
          />
          <Input
            id="ageMax"
            element="range"
            type="range"
            min={formState.inputs.ageMin.value}
            max="100"
            initialValue={formState.inputs.ageMax.value}
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            initialValid={true}
          />
          {formState.inputs.ageMax.value}
          <br />
          <h4>Distance</h4>
          <Input
            id="distMax"
            element="range"
            type="range"
            initialValue="20"
            min="0"
            max="1000"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            initialValid={true}
          />
          {formState.inputs.distMax.value}
          <h4>Popularite</h4>
          <Input
            id="popMin"
            element="range"
            type="range"
            initialValue="0"
            min="0"
            max="30"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            initialValid={true}
          />
          {formState.inputs.popMin.value}
        </form>
      </Col>
      {uniqueProfile && loadedInterest && (
        <UserItem
          key={uniqueProfile.id}
          id={uniqueProfile.id}
          picture={uniqueProfile.picture1}
          picture2={uniqueProfile.picture2}
          picture3={uniqueProfile.picture3}
          picture4={uniqueProfile.picture4}
          picture5={uniqueProfile.picture5}
          username={uniqueProfile.username}
          firstname={uniqueProfile.firstname}
          lastname={uniqueProfile.lastname}
          orientation={uniqueProfile.orientation}
          bio={uniqueProfile.bio}
          gender={uniqueProfile.gender}
          age={uniqueProfile.age}
          popularity={uniqueProfile.popularity}
          online={uniqueProfile.online}
          last_visit={uniqueProfile.last_visit}
          interest={loadedInterest}
          show={1}
        />
      )}
      {filteredUsers4 && <UserList items={filteredUsers4} />}
    </React.Fragment>
  );
};

export default FilterMatch;
