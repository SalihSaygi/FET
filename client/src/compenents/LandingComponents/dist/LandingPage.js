"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var Header_1 = require("./Header");
var CardsDIV_1 = require("./CardsDIV");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        minHeight: '100vh',
        backgroundImage: "url(" + (process.env.PUBLIC_URL + '/assets/bg.jpg') + ")",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
}); });
function LandingPage() {
    var classes = useStyles();
    return (react_1["default"].createElement("div", { className: classes.root },
        react_1["default"].createElement(core_1.CssBaseline, null),
        react_1["default"].createElement(Header_1["default"], null),
        react_1["default"].createElement(CardsDIV_1["default"], null)));
}
exports["default"] = LandingPage;
