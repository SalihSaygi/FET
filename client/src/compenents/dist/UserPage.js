"use strict";
exports.__esModule = true;
exports.About = void 0;
var react_1 = require("react");
var UserProvider_1 = require("../contexts/UserProvider");
function About() {
    var user = react_1.useContext(UserProvider_1.UserContext).user;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h2", null, "About"),
        react_1["default"].createElement("pre", null, JSON.stringify(user, null, 2))));
}
exports.About = About;
