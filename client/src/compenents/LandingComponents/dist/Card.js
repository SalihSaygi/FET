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
exports.__esModule = true;
var react_1 = require("react");
var styles_1 = require("@material-ui/core/styles");
var Card_1 = require("@material-ui/core/Card");
var CardContent_1 = require("@material-ui/core/CardContent");
var CardMedia_1 = require("@material-ui/core/CardMedia");
var Typography_1 = require("@material-ui/core/Typography");
var core_1 = require("@material-ui/core");
var useStyles = styles_1.makeStyles({
    root: {
        maxWidth: 645,
        background: 'rgba(0,0,0,0.5)',
        margin: '20px'
    },
    media: {
        height: 440
    },
    title: {
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        fontSize: '2rem',
        color: '#fff'
    },
    desc: {
        fontFamily: 'Nunito',
        fontSize: '1.1rem',
        color: '#ddd'
    }
});
function ImageCard(_a) {
    var place = _a.place, checked = _a.checked;
    var classes = useStyles();
    return (react_1["default"].createElement(core_1.Collapse, __assign({ "in": checked }, (checked ? { timeout: 1000 } : {})),
        react_1["default"].createElement(Card_1["default"], { className: classes.root },
            react_1["default"].createElement(CardMedia_1["default"], { className: classes.media, image: place.imageUrl, title: "Contemplative Reptile" }),
            react_1["default"].createElement(CardContent_1["default"], null,
                react_1["default"].createElement(Typography_1["default"], { gutterBottom: true, variant: "h5", component: "h1", className: classes.title }, place.title),
                react_1["default"].createElement(Typography_1["default"], { variant: "body2", color: "textSecondary", component: "p", className: classes.desc }, place.description)))));
}
exports["default"] = ImageCard;
