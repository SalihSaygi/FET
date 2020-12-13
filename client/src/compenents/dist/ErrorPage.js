"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styles_1 = require("@material-ui/core/styles");
require("../sources/css/404.css");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    background: {
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#000000",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}); });
function ErrorPage() {
    var classes = useStyles();
    return (react_1["default"].createElement("div", { className: classes.background },
        react_1["default"].createElement("h1", { className: "text" }, "404")));
}
exports["default"] = ErrorPage;
function stars() {
    var count = 50;
}
