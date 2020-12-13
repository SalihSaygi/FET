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
var core_1 = require("@material-ui/core");
var Sort_1 = require("@material-ui/icons/Sort");
var ExpandMore_1 = require("@material-ui/icons/ExpandMore");
var react_scroll_1 = require("react-scroll");
var useStyles = styles_1.makeStyles(function (theme) { return styles_1.createStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Nunito'
    },
    appbar: {
        background: 'none'
    },
    appbarWrapper: {
        width: '80%',
        margin: '0 auto'
    },
    appbarTitle: {
        flexGrow: 1
    },
    icon: {
        color: '#fff',
        fontSize: '2rem'
    },
    colorText: {
        color: '#5AFF3D'
    },
    container: {
        textAlign: 'center'
    },
    title: {
        color: '#fff',
        fontSize: '4.5rem'
    },
    goDown: {
        color: '#5AFF3D',
        fontSize: '4rem'
    }
}); });
function Header() {
    var classes = useStyles();
    var _a = react_1.useState(false), checked = _a[0], setChecked = _a[1];
    react_1.useEffect(function () {
        setChecked(true);
    }, []);
    return (react_1["default"].createElement("div", { className: classes.root, id: "header" },
        react_1["default"].createElement(core_1.AppBar, { className: classes.appbar, elevation: 0 },
            react_1["default"].createElement(core_1.Toolbar, { className: classes.appbarWrapper },
                react_1["default"].createElement("h1", { className: classes.appbarTitle },
                    "Re",
                    react_1["default"].createElement("span", { className: classes.colorText }, "vort.")),
                react_1["default"].createElement(core_1.IconButton, null,
                    react_1["default"].createElement(Sort_1["default"], { className: classes.icon })))),
        react_1["default"].createElement(core_1.Collapse, __assign({ "in": checked }, (checked ? { timeout: 1000 } : {}), { collapsedHeight: 50 }),
            react_1["default"].createElement("div", { className: classes.container },
                react_1["default"].createElement("h1", { className: classes.title },
                    "Let's Find Your ",
                    react_1["default"].createElement("br", null),
                    "My",
                    react_1["default"].createElement("span", { className: classes.colorText }, "Pet.")),
                react_1["default"].createElement(react_scroll_1.Link, { to: "options", smooth: true },
                    react_1["default"].createElement(core_1.IconButton, null,
                        react_1["default"].createElement(ExpandMore_1["default"], { className: classes.goDown })))))));
}
exports["default"] = Header;
