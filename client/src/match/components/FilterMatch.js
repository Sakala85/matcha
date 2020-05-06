import React from "react";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import UserList from "./UserList";
import "./FilterMatch.css";
import { Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
const FilterMatch = (props) => {
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
  return (
    <React.Fragment>
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
            initialValue="100"
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
            max="100"
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
      {filteredUsers3 && <UserList items={filteredUsers3} />}
    </React.Fragment>
  );
};

export default FilterMatch;
