import React, { useState } from "react";
// import Map from '../../shared/components/UIElements/Map';
import { Col, Image, Row, Button, Modal, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./UserItem.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import sendNotification from "../../shared/util/sendNotification";
import { useCookies } from "react-cookie";
import Icon from "@material-ui/core/Icon";
import moment from "moment-timezone/builds/moment-timezone-with-data";
const timezone = "Europe/Paris";

const UserItem = (props) => {
  const [showDetail, setShowDetail] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [showed, setShowed] = useState(false);
  const [cookies] = useCookies(["token"]);
  const { sendRequest } = useHttpClient();
  var online = false;

  if (showDetail){
    const now = new Date();
    const fin = new Date(props.last_visit)
    if ((now - fin) > 3600000 || props.online === 0) {
      online = false;
    } else if (props.online === 0) {
      online = false;
    } else {
      online = true;
    }
  }
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
      const responseData = await sendRequest(
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
      if (responseData) {
        sendNotification(
          cookies.userId,
          props.id,
          "UnLike",
          cookies.token,
          cookies.username
        );
      }
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
        sendNotification(
          cookies.userId,
          props.id,
          "Match",
          cookies.token,
          cookies.username
        );
      } else {
        sendNotification(
          cookies.userId,
          props.id,
          "Like",
          cookies.token,
          cookies.username
        );
      }
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
      <Row>
        <React.Fragment>
          <Modal
            className="profil"
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
            <Modal.Header className="modal__style">
              <Col className="titlematch">
                {" "}
                <h2 className="popularityh2">
                  <Icon className="popularityIcon">emoji_events</Icon>{" "}
                  <span>{props.popularity}</span>
                </h2>{" "}
              </Col>
              <Col className="titlematch">
                {" "}
                <h2 className="title__card3">{props.username}</h2>{" "}
              </Col>
              <Col className="titlematch">
                {" "}
                <h6 className="online">
                  {moment(props.last_visit)
                    .tz(timezone)
                    .format("DD/MM/YYYY HH:mm")}
                </h6>
                {online ? "online" : "offline"}
              </Col>
            </Modal.Header>
            <Modal.Body className="modal__style">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={props.picture}
                    alt={props.picture}
                    // REVOIR LE alt, je sais pas comment en mettre un unique
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={props.picture2}
                    alt={props.picture2}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={props.picture3}
                    alt={props.picture3}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={props.picture4}
                    alt={props.picture4}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={props.picture5}
                    alt={props.picture5}
                  />
                </Carousel.Item>
              </Carousel>
              <Row className="textmatch">
                <h3 className="textmatch">
                  {props.firstname} {props.lastname}, {props.age} years old
                </h3>
              </Row>
              <Row className="textmatch">
                <h3 className="textmatch">
                  I'm a {props.gender}, and my orientation is
                  {props.orientation}
                </h3>
              </Row>
              <Row className="textmatch">
                <h8 className="bioclass">Bio : {props.bio}</h8>
              </Row>
              <Row className="textmatch">
                <h9>Interest</h9>
                {/* <h2>Interest : {props.interest.map(interest => <li key={interest}>{interest}</li>)}</h2> */}
              </Row>
              <Row>
                <Col>
                  <button className="button__reportok" onClick={reportProfile}>
                    <Icon className="chaticon" color="primary">
                      report
                    </Icon>
                  </button>
                  <button className="button__reportok" onClick={blockProfile}>
                    <Icon className="chaticon" color="primary">
                      block
                    </Icon>
                  </button>
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
                <Icon>favorite</Icon>
              </Button>
              <Button onClick={dislikeProfile} className="like_dislike">
                <Icon>close</Icon>
              </Button>
            </Modal.Footer>
          </Modal>
          {!props.show && (
            <Button onClick={openDetailHandler} variant="light">
              <h2>{props.username}</h2>
              <Image
                src={props.picture}
                roundedCircle
                className="image__profile"
              />
            </Button>
          )}
        </React.Fragment>
        {/* </li> */}
      </Row>
    </React.Fragment>
  );
};

export default UserItem;
