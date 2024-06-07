/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './WelcomeScreen.css';
import logo from "./images/meet-logo.png"
import icon from "./images/file.png"
import logoblue from "./images/meet-logo-blue.png"

function WelcomeScreen(props) {
  return props.showWelcomeScreen ?
  (
    <div className="WelcomeScreen">
      <section className="main">
        <header>
          <a href="#" className="logo"><img alt='logo-img' src = {logo}/></a>
          <a href="#" className="name">Meet App</a>
          <a href="https://alqatrony.github.io/Meet-App/privacy.html" className="privacy">
            <img src = {icon} style={{ maxWidth:'1.4em' }} className='img'/> Privacy policy</a>
        </header>
        <div className="contentBx">
          <div className="text">
            <h1>MEET APP</h1>
            <p>Welcome to the Meet App log in and Find the next event in your city or the nearest city to you and add it to your calendar </p>
            <h4>
              Log in to see upcoming events around the world for full-stack developers
            </h4>
            <div className="btns">
              <a className="button_cont" onClick={() => { props.getAccessToken() }}
                  rel="nofollow noopener">
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      alt="Google sign-in"
                    />
                  </div>
                <b className="btn">Sign in with google</b>
              </a>
              <a href="https://alqatrony.github.io/Meet-App/privacy.html" className="privacyInmobile">
              <img src = {icon} style={{ maxWidth:'1.4em' }} className='img'/> Privacy policy</a>
            </div>
          </div>
          <div className="logoblue">
              <img alt='logo-img' style={{ maxWidth:'20em' }} src = {logoblue}/>
          </div>
        </div>
      </section>
    </div>
  ) : null
}
export default WelcomeScreen;