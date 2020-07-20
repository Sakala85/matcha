import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import FormUser from "./FormUser";
import { Card } from "react-bootstrap";
import { useCookies } from "react-cookie";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ReactMapGL from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

const UpdateUser = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [lat, setLat] = useState(+cookies.lat);
  const [lon, setLon] = useState(+cookies.lon);
  const [loadedUser, setLoadedUser] = useState(false);
  const {
    isLoading,
    error,
    sendRequest,
    clearError,
    errorMessage,
  } = useHttpClient();
  console.log(cookies)
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lon,
    width: "40vw",
    height: "40vh",
    zoom: 15,
  });
  const setPosition = () => {
    setCookie("lat", lat);
    setCookie("lon", lon);
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/user/${cookies.userId}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + cookies.token,
          }
        );
        // ! UID (16) === UID AuthUser
        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest, cookies]);

  if (!loadedUser) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find your profile!</h2>
        </Card>
      </div>
    );
  }
  return (
    <React.Fragment>
      <ErrorModal show={error} error={errorMessage} onHide={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {
        <div>
          {loadedUser.map((item) => (
            <span key={item.id}>
              <FormUser items={item} />
            </span>
          ))}
          <div>
            <ReactMapGL
              {...viewport}
              mapboxApiAccessToken={
                "pk.eyJ1Ijoic2FrYWxhOTkiLCJhIjoiY2thNmNqcTd2MDVxajJ5cXBrNTQyeTRuZSJ9.asR8GGuGNIo2d5QghFt4eg"
              }
              mapStyle="mapbox://styles/sakala99/cka6ry0rb0un51itms8uvgt85"
              onViewportChange={(viewport) => {
                  setViewport(viewport);
                  setLat(viewport.latitude);
                  setLon(viewport.longitude);
              }}
            >
            </ReactMapGL>
            <button onClick={setPosition}>Set Position</button>
          </div>
        </div>
      }
      ;
    </React.Fragment>
  );
};

export default UpdateUser;
