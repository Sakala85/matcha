import React, { useEffect, useState} from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./ConfirmEmail.css";

const ConfirmEmail = () => {
  const [loadedUser, setLoadedUser] = useState();
  const { sendRequest } = useHttpClient();
  const tokenEmail = useParams().tokenEmail;

  useEffect(() => {
    const confirmEmail = async () => {
      try {
          const responseData = await sendRequest(

            `http://localhost:5000/api/user/valid/${tokenEmail}`,
            "GET",
            null
          );
          setLoadedUser(responseData.user);
      } catch (err) {
      }
    
    };
    confirmEmail();    
  }, [sendRequest]);
  
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            <h2>
              {loadedUser
                ? `Congrats ${loadedUser.firstname} your email are confirmed, you can now connect`
                : "The token has expired"}
            </h2>
            <Button href="/login">Login</Button>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};
export default ConfirmEmail;
