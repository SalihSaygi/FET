"use strict";
exports.__esModule = true;
var material_kit_react_js_1 = require("./material-kit-react.js");
var styles_1 = require("@material-ui/core/styles");
var footerStyle = styles_1.createStyles({
    block: {
        color: "inherit",
        padding: "0.9375rem",
        fontWeight: 500,
        fontSize: "12px",
        textTransform: "uppercase",
        borderRadius: "3px",
        textDecoration: "none",
        position: "relative",
        display: "block"
    },
    left: {
        float: "left",
        display: "block"
    },
    right: {
        padding: "15px 0",
        margin: "0",
        float: "right"
    },
    footer: {
        padding: "0.9375rem 0",
        textAlign: "center",
        display: "flex",
        zIndex: 2,
        position: "relative"
    },
    a: {
        color: material_kit_react_js_1.primaryColor,
        textDecoration: "none",
        backgroundColor: "transparent"
    },
    footerWhiteFont: {
        "&,&:hover,&:focus": {
            color: "#FFFFFF"
        }
    },
    container: material_kit_react_js_1.container,
    list: {
        marginBottom: "0",
        padding: "0",
        marginTop: "0"
    },
    inlineBlock: {
        display: "inline-block",
        padding: "0px",
        width: "auto"
    },
    icon: {
        width: "18px",
        height: "18px",
        position: "relative",
        top: "3px"
    }
});
exports["default"] = footerStyle;
