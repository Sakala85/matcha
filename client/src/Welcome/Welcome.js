import React from "react";
import "./Welcome.css";
import "bootstrap/dist/css/bootstrap.css";
const Welcome = () => {
  return (
    <div className="card__style">
      <br/>
      <br/>
      <br/>
        <h1 className="title__text">Find<br/>Love</h1>
      <div className="login__position">
      <div className="card__container">
            <h1 className="inscritpion__text">Free Inscription</h1>
            <form>
              <input type="text"/>
              <br/>
              <input type="text"/>
            <div className="button_cont" align="center">
              <a className="example_f" href="add-website-here" target="_blank" rel="nofollow"><span />Sign Up</a>
            </div>
            </form>
            </div>

      </div>
    </div>
  );
};

export default Welcome;
