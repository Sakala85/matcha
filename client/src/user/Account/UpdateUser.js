import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import FormUser from "./FormUser";
import { Card } from "react-bootstrap";
import {useCookies} from "react-cookie";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ReactMapGL from "react-map-gl";

const UpdateUser = () => {
  const [cookies] = useCookies(['token']);
  const [loadedUser, setLoadedUser] = useState(false);
  const {
    isLoading,
    error,
    sendRequest,
    clearError,
    errorMessage,
  } = useHttpClient();
  const [viewport, setViewport] = useState({
    latitude: +cookies.lat,
    longitude: +cookies.lon,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });
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
        mapboxApiAccessToken={"pk.eyJ1Ijoic2FrYWxhOTkiLCJhIjoiY2thNmNqcTd2MDVxajJ5cXBrNTQyeTRuZSJ9.asR8GGuGNIo2d5QghFt4eg"}
        // mapStyle="mapbox://styles/leighhalliday/cjufmjn1r2kic1fl9wxg7u1l4"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {/* {parkDate.features.map(park => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
              <img src="/skateboarding.svg" alt="Skate Park Icon" />
            </button>
          </Marker>
        ))} */}
{/* 
        {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        ) : null} */}
      </ReactMapGL>
    </div>
        </div>
      }
      ;
    </React.Fragment>
  );
};

export default UpdateUser;
