import React, { useState, useContext } from "react";
// import Map from '../../shared/components/UIElements/Map';
import { Col, Image, Row, Button, Modal, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./UserItem.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import sendNotification from "../../shared/util/sendNotification";

const UserItem = (props) => {
  const [showDetail, setShowDetail] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const openDetailHandler = async () => {
    setShowDetail(true);
    sendNotification(auth.userId, props.id, "Visit", auth.token);
  };
  const closeDetailHandler = () => setShowDetail(false);
  const closeMatchHandler = () => setShowMatch(false);
  const openMatchHandler = () => setShowMatch(true);

  const dislikeProfile = async () => {
    setShowDetail(false); //SEND A VISIT NOTIF
    try {
      await sendRequest(
        `http://localhost:5000/api/user/match/dislike/${auth.userId}`,
        "POST",
        JSON.stringify({
          disliked: props.id,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
  };

  const likeProfile = async () => {
    setShowDetail(false); //SEND A VISIT NOTIF
    try {
      const response = await sendRequest(
        `http://localhost:5000/api/user/match/like/${auth.userId}`,
        "POST",
        JSON.stringify({
          liked: props.id,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      if (response.result.message === "match") {
        openMatchHandler();
      }
      sendNotification(auth.userId, props.id, "Like", auth.token);
    } catch (err) {}
  };

  return (
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
                  height="400px"
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
                  height="400px"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={props.picture3}
                  alt={props.picture3}
                  height="400px"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={props.picture4}
                  alt={props.picture4}
                  height="400px"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={props.picture5}
                  alt={props.picture5}
                  height="400px"
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

        <Button onClick={openDetailHandler} variant="light">
          <h2>{props.username}</h2>
          <Image src={props.picture} roundedCircle className="image__profile" />
        </Button>
      </React.Fragment>
    </li>
  );
};

export default UserItem;
