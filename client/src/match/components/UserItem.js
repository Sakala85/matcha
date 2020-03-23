import React, { useState } from "react";
// import Map from '../../shared/components/UIElements/Map';
import { Col, Image, Row, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./UserItem.css";

const UserItem = props => {
  const [showDetail, setShowDetail] = useState(false);

  const openDetailHandler = () => setShowDetail(true);
  const closeDetailHandler = () => setShowDetail(false);

  return (
    <li key={props.id}>
      <React.Fragment>
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
            <Image
              src={props.picture}
              roundedCircle
              className="image__profile"
            />
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
            <Button onClick={closeDetailHandler} className="like_dislike">
              <Image
                src={require("../../img/iconProfile/heart.png")}
                width="50px"
                height="50px"
              />
            </Button>
            <Button onClick={closeDetailHandler} className="like_dislike">
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
