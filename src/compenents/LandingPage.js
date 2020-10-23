import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core .
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core .
import Header from "./common/Header";
import Footer from "./common/Footer.js";
import GridContainer from "./common/GridContainer.js";
import GridItem from "./common/GridItem.js";
import Button from "./common/Button.js";
import HeaderLinks from "./common/HeaderLinks.js";
import Parallax from "./common/Parallax.js";

import styles from "../sources/jss/landingPage.js"

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";

import Welcome from 'react-welcome-page'

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <>
    <div id='my-container'>
        <Welcome
            loopDuration={1000} 
            data={
                [
                {
                    backgroundColor: 'rgb(68, 88, 119)',
                    textColor: '#A7DBAE',
                    text: 'Revort',
                    image: require('../sources/images/logo.png')
                }
                ]
            }
        />
        
      </div>
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Revort"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={require("../sources/images/backgroundImage.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Story Starts With Us.</h1>
              <h4>
                Every landing page needs a small description after the big bold
                title, that{"'"}s why we added this text here. Add here all the
                information that can make you or your product create the first
                impression.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection />
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
}
