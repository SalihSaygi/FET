"use strict";
exports.__esModule = true;
exports.ContentPage = void 0;
var react_1 = require("react");
var styles_1 = require("@material-ui/core/styles");
var IconButton_1 = require("@material-ui/core/IconButton");
var Typography_1 = require("@material-ui/core/Typography");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var Menu_1 = require("@material-ui/core/Menu");
var MoreVert_1 = require("@material-ui/icons/MoreVert");
var prop_types_1 = require("prop-types");
var Card_1 = require("@material-ui/core/Card");
var CardHeader_1 = require("@material-ui/core/CardHeader");
var CardContent_1 = require("@material-ui/core/CardContent");
var CardMedia_1 = require("@material-ui/core/CardMedia");
var Avatar_1 = require("@material-ui/core/Avatar");
var Skeleton_1 = require("@material-ui/lab/Skeleton");
var Box_1 = require("@material-ui/core/Box");
var CommentData_1 = require("./CommentData");
var useStyles = styles_1.makeStyles(function (theme) {
    var _a, _b, _c, _d, _e;
    return ({
        card: {
            maxWidth: 345,
            margin: theme.spacing(2)
        },
        media: {
            height: 190
        },
        grow: {
            flexGrow: 1
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: (_a = {
                display: 'none'
            },
            _a[theme.breakpoints.up('sm')] = {
                display: 'block'
            },
            _a),
        search: (_b = {
                position: 'relative',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: styles_1.fade(theme.palette.common.white, 0.15),
                '&:hover': {
                    backgroundColor: styles_1.fade(theme.palette.common.white, 0.25)
                },
                marginRight: theme.spacing(2),
                marginLeft: 0,
                width: '100%'
            },
            _b[theme.breakpoints.up('sm')] = {
                marginLeft: theme.spacing(3),
                width: 'auto'
            },
            _b),
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        inputRoot: {
            color: 'inherit'
        },
        inputInput: (_c = {
                padding: theme.spacing(1, 1, 1, 0),
                // vertical padding + font size from searchIcon
                paddingLeft: "calc(1em + " + theme.spacing(4) + "px)",
                transition: theme.transitions.create('width'),
                width: '100%'
            },
            _c[theme.breakpoints.up('md')] = {
                width: '20ch'
            },
            _c),
        sectionDesktop: (_d = {
                display: 'none'
            },
            _d[theme.breakpoints.up('md')] = {
                display: 'flex'
            },
            _d),
        sectionMobile: (_e = {
                display: 'flex'
            },
            _e[theme.breakpoints.up('md')] = {
                display: 'none'
            },
            _e)
    });
});
var options = [
    "Edit",
    "Delete",
    "Found",
];
var ITEM_HEIGHT = 48;
function PostOptions() {
    var _a = react_1["default"].useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(IconButton_1["default"], { "aria-label": "more", "aria-controls": "long-menu", "aria-haspopup": "true", onClick: handleClick },
            react_1["default"].createElement(MoreVert_1["default"], null)),
        react_1["default"].createElement(Menu_1["default"], { id: "long-menu", anchorEl: anchorEl, keepMounted: true, open: open, onClose: handleClose, PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch'
                }
            } }, options.map(function (option) { return (react_1["default"].createElement(MenuItem_1["default"], { key: option, selected: option === 'Pyxis', onClick: handleClose }, option)); }))));
}
function Comments() {
    return (react_1["default"].createElement("div", { style: { width: '10%' } }, CommentData_1["default"].map(function (comment, index) { return (react_1["default"].createElement(Box_1["default"], { key: index, component: "span", display: "block", p: 1, m: 1, bgcolor: "background.paper" }, comment.text)); })));
}
function Media(props) {
    var _a = props.loading, loading = _a === void 0 ? false : _a;
    var classes = useStyles();
    return (react_1["default"].createElement(Card_1["default"], { className: classes.card },
        react_1["default"].createElement(CardHeader_1["default"], { avatar: loading ? (react_1["default"].createElement(Skeleton_1["default"], { animation: "wave", variant: "circle", width: 40, height: 40 })) : (react_1["default"].createElement(Avatar_1["default"], { alt: "Ted talk", src: "https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg" })), action: loading ? null : (react_1["default"].createElement(ReportOptions, null)), title: loading ? (react_1["default"].createElement(Skeleton_1["default"], { animation: "wave", height: 10, width: "80%", style: { marginBottom: 6 } })) : ('Ted'), subheader: loading ? react_1["default"].createElement(Skeleton_1["default"], { animation: "wave", height: 10, width: "40%" }) : '5 hours ago' }),
        loading ? (react_1["default"].createElement(Skeleton_1["default"], { animation: "wave", variant: "rect", className: classes.media })) : (react_1["default"].createElement(CardMedia_1["default"], { className: classes.media, image: "https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512", title: "Ted talk" })),
        react_1["default"].createElement(CardContent_1["default"], null, loading ? (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(Skeleton_1["default"], { animation: "wave", height: 10, style: { marginBottom: 6 } }),
            react_1["default"].createElement(Skeleton_1["default"], { animation: "wave", height: 10, width: "80%" }))) : (react_1["default"].createElement(Typography_1["default"], { variant: "body2", color: "textSecondary", component: "p" }, "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:")))));
}
Media.propTypes = {
    loading: prop_types_1["default"].bool
};
function Reports() {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(Media, { loading: true }),
        react_1["default"].createElement(Media, { owner: true })));
}
function ContentPage() {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(ContentPageNavbar, null),
        react_1["default"].createElement(Reports, null)));
}
exports.ContentPage = ContentPage;
