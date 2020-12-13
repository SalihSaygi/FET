"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
// nodejs library that concatenates classes
var classnames_1 = require("classnames");
// @material-ui/core .
var styles_1 = require("@material-ui/core/styles");
// @material-ui/icons
// core .
var Header_1 = require("../common/Header");
var Footer_js_1 = require("../common/Footer.js");
var GridContainer_js_1 = require("../common/GridContainer.js");
var GridItem_js_1 = require("../common/GridItem.js");
var Button_js_1 = require("../common/Button.js");
var HeaderLinks_js_1 = require("../common/HeaderLinks.js");
var Parallax_js_1 = require("../common/Parallax.js");
var landingPage_js_1 = require("../../sources/jss/landingPage.js");
// Sections for this page
var ProductSection_js_1 = require("./Sections/ProductSection.js");
var TeamSection_js_1 = require("./Sections/TeamSection.js");
var WorkSection_js_1 = require("./Sections/WorkSection.js");
var react_welcome_page_1 = require("react-welcome-page");
var dashboardRoutes = [];
var useStyles = styles_1.makeStyles(landingPage_js_1["default"]);
function LandingPage(props) {
    var classes = useStyles();
    var rest = __rest(props, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { id: 'my-container' },
            react_1["default"].createElement(react_welcome_page_1["default"], { loopDuration: 1000, data: [
                    {
                        backgroundColor: 'rgb(68, 88, 119)',
                        textColor: '#A7DBAE',
                        text: 'Revort',
                        image: require('../../sources/images/logo.png')
                    }
                ] })),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(Header_1["default"], __assign({ color: "transparent", routes: dashboardRoutes, brand: "Revort", rightLinks: react_1["default"].createElement(HeaderLinks_js_1["default"], null), fixed: true, changeColorOnScroll: {
                    height: 400,
                    color: "white"
                } }, rest)),
            react_1["default"].createElement(Parallax_js_1["default"], { filter: true, image: require("../../sources/images/backgroundImage.jpg") },
                react_1["default"].createElement("div", { className: classes.container },
                    react_1["default"].createElement(GridContainer_js_1["default"], null,
                        react_1["default"].createElement(GridItem_js_1["default"], { xs: 12, sm: 12, md: 6 },
                            react_1["default"].createElement("h1", { className: classes.title }, "Finding Animals With you!"),
                            react_1["default"].createElement("h4", null,
                                "There is no need to print and put up 50 stacks of lost paper. We understand the difficulty of finding your beloved animals, so we developed ",
                                react_1["default"].createElement("bold", null, "Revort"),
                                ". Post your lost dog, and wait for your neighborhood to find it."),
                            react_1["default"].createElement("br", null),
                            react_1["default"].createElement(Button_js_1["default"], { color: "danger", size: "lg", href: "/register", target: "_blank", rel: "noopener noreferrer" },
                                react_1["default"].createElement("i", { className: "fas fa-play" }),
                                "Get Started"))))),
            react_1["default"].createElement("div", { className: classnames_1["default"](classes.main, classes.mainRaised) },
                react_1["default"].createElement("div", { className: classes.container },
                    react_1["default"].createElement(ProductSection_js_1["default"], null),
                    react_1["default"].createElement(TeamSection_js_1["default"], null),
                    react_1["default"].createElement(WorkSection_js_1["default"], null))),
            react_1["default"].createElement(Footer_js_1["default"], null))));
}
exports["default"] = LandingPage;
