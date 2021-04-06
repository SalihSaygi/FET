import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core .
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom"
// @material-ui/icons

// core .
import Header from "../common/Header";
import Footer from "../common/Footer.js";
import GridContainer from "../common/GridContainer.js";
import GridItem from "../common/GridItem.js";
import Button from "../common/Button.js";
import HeaderLinks from "../common/HeaderLinks.js";
import Parallax from "../common/Parallax.js";

import styles from "../../sources/jss/landingPage.js"

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
                    image: require('../../sources/images/logo.png')
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
      <Parallax filter image={require("../../sources/images/backgroundImage.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Finding Animals With you!</h1>
              <h4>
                There is no need to print and put up 50 stacks of lost paper.
                We understand the difficulty of finding your beloved animals, so we developed <bold>Revort</bold>.
                Post your lost dog, and wait for your neighborhood to find it.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="/register"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Get Started
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
