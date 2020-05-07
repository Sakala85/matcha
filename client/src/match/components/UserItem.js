import React, { useState } from "react";
// import Map from '../../shared/components/UIElements/Map';
import { Col, Image, Row, Button, Modal, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./UserItem.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import sendNotification from "../../shared/util/sendNotification";
import { useCookies } from "react-cookie";

const UserItem = (props) => {
  const [showDetail, setShowDetail] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [showed, setShowed] = useState(false);
  const [cookies] = useCookies(["token"]);
  const { sendRequest } = useHttpClient();

  if (props.show === 1 && showed === false) {
    setShowDetail(true);
    setShowed(true);
  }
  
  const openDetailHandler = async () => {
    setShowDetail(true);
    sendNotification(
      cookies.userId,
      props.id,
      "Visit",
      cookies.token,
      cookies.username
    );
  };
  const closeDetailHandler = () => {
    setShowDetail(false);
  };
  const closeMatchHandler = () => setShowMatch(false);
  const openMatchHandler = () => setShowMatch(true);

  const dislikeProfile = async () => {
    setShowDetail(false); //SEND A VISIT NOTIF
    try {
      await sendRequest(
        `http://localhost:5000/api/user/match/dislike/${cookies.userId}`,
        "POST",
        JSON.stringify({
          disliked: props.id,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        }
      );
    } catch (err) {}
  };

  const likeProfile = async () => {
    setShowDetail(false); //SEND A VISIT NOTIF
    try {
      const response = await sendRequest(
        `http://localhost:5000/api/user/match/like/${cookies.userId}`,
        "POST",
        JSON.stringify({
          liked: props.id,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        }
      );
      if (response.result.message === "match") {
        openMatchHandler();
      }
      sendNotification(
        cookies.userId,
        props.id,
        "Like",
        cookies.token,
        cookies.username
      );
    } catch (err) {}
  };

  const reportProfile = async () => {
    setShowDetail(false); //SEND A VISIT NOTIF
    try {
      await sendRequest(
        `http://localhost:5000/api/user/match/report/${cookies.userId}`,
        "POST",
        JSON.stringify({
          reported: props.id,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        }
      );
    } catch (err) {}
  };

  const blockProfile = async () => {
    setShowDetail(false); //SEND A VISIT NOTIF
    try {
      await sendRequest(
        `http://localhost:5000/api/user/match/block/${cookies.userId}`,
        "POST",
        JSON.stringify({
          blocked: props.id,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        }
      );
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <li key={props.id}>
        <React.Fragment>
          <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showMatch}
            onHide={closeMatchHandler}
          >
            <Modal.Body className="modal__style">IT'S A MATCH !</Modal.Body>
          </Modal>
          <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showDetail}
            onHide={closeDetailHandler}
          >
            <Modal.Header className="modal__style" closeButton>
              <Modal.Title>{props.username}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal__style">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={props.picture}
                    alt={props.picture}
                    // REVOIR LE alt, je sais pas comment en mettre un unique
                    // height="400px"
                  />
                  <Carousel.Caption>
                    <h3>Description</h3>
                    <p>{props.bio}</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={props.picture2}
                    alt={props.picture2}
                    // height="400px"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={props.picture3}
                    alt={props.picture3}
                    // height="400px"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={props.picture4}
                    alt={props.picture4}
                    // height="400px"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={props.picture5}
                    alt={props.picture5}
                    // height="400px"
                  />
                </Carousel.Item>
              </Carousel>
              <h1 className="title__card">{props.username}</h1>
              <Row>
                <Col>
                  <h2>Age : {props.age}</h2>
                </Col>
                <Col>
                  <h2>Score : {props.popularity}</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ul>
                    <h2>Interest</h2>
                    {/* <h2>Interest : {props.interest.map(interest => <li key={interest}>{interest}</li>)}</h2> */}
                  </ul>
                </Col>
                <Col>
                  <h2>Bio : {props.bio}</h2>
                </Col>
                <Col>
                  <h2>{props.online}</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h2>{props.gender}</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <button onClick={reportProfile}>Report</button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <button onClick={blockProfile}>Block</button>
                </Col>
              </Row>
              <Row>
                <div className="map-container">
                  {/* <Map center={props.coordinates} zoom={16} /> */}
                </div>
              </Row>
            </Modal.Body>

            <Modal.Footer className="modal__style modal__footer">
              <Button onClick={likeProfile} className="like_dislike">
                <Image
                  src={require("../../img/iconProfile/heart.png")}
                  width="50px"
                  height="50px"
                />
              </Button>
              <Button onClick={dislikeProfile} className="like_dislike">
                <Image
                  src={require("../../img/iconProfile/remove.png")}
                  width="50px"
                  height="50px"
                />
              </Button>
            </Modal.Footer>
          </Modal>
          {!props.show && 
          <Button onClick={openDetailHandler} variant="light">
            <h2>{props.username}</h2>
            <Image
              src={props.picture}
              roundedCircle
              className="image__profile"
            />
          </Button>}
        </React.Fragment>
      </li>
    </React.Fragment>
  );
};

export default UserItem;
