import React from "react";
import { Parallax } from "react-parallax";
const insideStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};
const parallaxHeader = {
  textAlign: "center",
  color: " white",
  textDecoration: "3px 3px 3px black",
  textShadow: "1px 1px 1px gray",
};
const ImgBanner = (props) => {
  return (
    <header>
      <Parallax bgImage={props.img} strength={500} style={parallaxHeader}>
        <div style={{ height: 400 }}>
          <div style={insideStyles}>
            <h1>{props.pageTitle}</h1>
            <p>{props.pageDetails}</p>
          </div>
        </div>
      </Parallax>
    </header>
  );
};

export default ImgBanner;
