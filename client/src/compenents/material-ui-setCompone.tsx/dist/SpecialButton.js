"use strict";
exports.__esModule = true;
exports.Button = void 0;
var react_1 = require("react");
require("../../sources/css/specialButton");
var react_router_dom_1 = require("react-router-dom");
var STYLES = ['btn--primary', 'btn--outline', 'btn--test'];
var SIZES = ['btn--medium', 'btn--large'];
exports.Button = function (_a) {
    var children = _a.children, buttonType = _a.buttonType, onClick = _a.onClick, buttonStyle = _a.buttonStyle, buttonSize = _a.buttonSize;
    var checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];
    var checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    return (react_1["default"].createElement(react_router_dom_1.Link, { to: '/sign-up', className: 'btn-mobile' },
        react_1["default"].createElement("button", { className: "btn " + checkButtonStyle + " " + checkButtonSize, onClick: onClick, type: buttonType }, children)));
};
