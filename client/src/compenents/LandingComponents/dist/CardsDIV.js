"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styles_1 = require("@material-ui/core/styles");
var OptionCard_1 = require("./OptionCard");
var CardData_1 = require("./CardData");
var useWindowPosition_1 = require("../../hooks/useWindowPosition");
var useStyles = styles_1.makeStyles(function (theme) {
    var _a;
    return ({
        root: (_a = {
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            },
            _a[theme.breakpoints.down('md')] = {
                flexDirection: 'column'
            },
            _a)
    });
});
function CardsDIV() {
    var classes = useStyles();
    var checked = useWindowPosition_1["default"]('header');
    return (react_1["default"].createElement("div", { className: classes.root, id: "options" },
        react_1["default"].createElement(OptionCard_1["default"], { card: CardData_1["default"][1], checked: checked }),
        react_1["default"].createElement(OptionCard_1["default"], { card: CardData_1["default"][0], checked: checked })));
}
exports["default"] = CardsDIV;
