"use strict";
exports.__esModule = true;
exports.Comment = void 0;
var react_1 = require("react");
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var faker_1 = require("faker");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    fonts: {
        fontWeight: "bold"
    },
    inline: {
        display: "inline"
    }
}); });
exports.Comment = function () {
    var classes = useStyles();
    return (react_1["default"].createElement(core_1.List, { className: classes.root }, comments.map(function (comment) {
        console.log("Comment", comment);
        return (react_1["default"].createElement(react_1["default"].Fragment, { key: comment.id },
            react_1["default"].createElement(core_1.ListItem, { key: comment.id, alignItems: "flex-start" },
                react_1["default"].createElement(core_1.ListItemAvatar, null,
                    react_1["default"].createElement(core_1.Avatar, { alt: "avatar", src: faker_1["default"].image.avatar() })),
                react_1["default"].createElement(core_1.ListItemText, { primary: react_1["default"].createElement(core_1.Typography, { className: classes.fonts }, comment.name), secondary: react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(core_1.Typography, { component: "span", variant: "body2", className: classes.inline, color: "textPrimary" }, comment.email), " - " + comment.body) })),
            react_1["default"].createElement(core_1.Divider, null)));
    })));
};
exports["default"] = exports.Comment;
var Comment = function (_a) {
    var comments = _a.comments;
    return ();
};
exports["default"] = exports.Comment;
