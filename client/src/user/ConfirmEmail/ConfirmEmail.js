import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./ConfirmEmail.css";
import { useCookies } from "react-cookie";

const ConfirmEmail = () => {
  const [loadedUser, setLoadedUser] = useState();
  const { sendRequest } = useHttpClient();
  const tokenEmail = useParams().tokenEmail;
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/user/valid/${tokenEmail}`,
          "GET",
          null
        );
        setLoadedUser(responseData.user);
        let d = new Date();
        d.setTime(d.getTime() + 60 * 60 * 1000);
        if (cookies && responseData.user) {
          setCookie("valid_email", "1", { path: "/", expires: d });
        }
      } catch (err) {}
    };
    confirmEmail();
  }, [sendRequest, tokenEmail, setCookie, cookies]);

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
