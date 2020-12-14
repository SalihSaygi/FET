"use strict";
exports.__esModule = true;
var react_1 = require("react");
var IconButton_1 = require("@material-ui/core/IconButton");
var Badge_1 = require("@material-ui/core/Badge");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var Menu_1 = require("@material-ui/core/Menu");
var AccountCircle_1 = require("@material-ui/icons/AccountCircle");
var Mail_1 = require("@material-ui/icons/Mail");
var Notifications_1 = require("@material-ui/icons/Notifications");
JSX.Element;
{
    var classes = useStyles();
    var _a = react_1["default"].useState(0), notificationCounter = _a[0], setNotificationCounter = _a[1];
    var _b = react_1["default"].useState(0), messageCounter = _b[0], setMessageCounter = _b[1];
    var _c = react_1["default"].useState(null), anchorEl = _c[0], setAnchorEl_1 = _c[1];
    var _d = react_1["default"].useState(null), mobileMoreAnchorEl = _d[0], setMobileMoreAnchorEl_1 = _d[1];
    var isMenuOpen = Boolean(anchorEl);
    var isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    var handleProfileMenuOpen = function (event) {
        setAnchorEl_1(event.currentTarget);
    };
    var handleMobileMenuClose_1 = function () {
        setMobileMoreAnchorEl_1(null);
    };
    var handleMenuClose = function () {
        setAnchorEl_1(null);
        handleMobileMenuClose_1();
    };
    var handleMobileMenuOpen = function (event) {
        setMobileMoreAnchorEl_1(event.currentTarget);
    };
    var menuId = 'primary-search-account-menu';
    var renderMenu = (react_1["default"].createElement(Menu_1["default"], { anchorEl: anchorEl, anchorOrigin: { vertical: 'top', horizontal: 'right' }, id: menuId, keepMounted: true, transformOrigin: { vertical: 'top', horizontal: 'right' }, open: isMenuOpen, onClose: handleMenuClose },
        react_1["default"].createElement(MenuItem_1["default"], { onClick: handleMenuClose }, "Profile"),
        react_1["default"].createElement(MenuItem_1["default"], { onClick: handleMenuClose }, "Appearance Settings"),
        react_1["default"].createElement(MenuItem_1["default"], { onClick: handleMenuClose }, "Sign Out"),
        react_1["default"].createElement(MenuItem_1["default"], { onClick: handleMenuClose }, "Blocked Users"),
        react_1["default"].createElement(MenuItem_1["default"], { onClick: handleMenuClose }, "Theme")));
    var mobileMenuId = 'primary-search-account-menu-mobile';
    var renderMobileMenu = (react_1["default"].createElement(Menu_1["default"], { anchorEl: mobileMoreAnchorEl, anchorOrigin: { vertical: 'top', horizontal: 'right' }, id: mobileMenuId, keepMounted: true, transformOrigin: { vertical: 'top', horizontal: 'right' }, open: isMobileMenuOpen, onClose: handleMobileMenuClose_1 },
        react_1["default"].createElement(MenuItem_1["default"], null,
            react_1["default"].createElement(IconButton_1["default"], { "aria-label": "show new messages", color: "inherit" },
                react_1["default"].createElement(Badge_1["default"], { badgeContent: messageCounter, color: "secondary" },
                    react_1["default"].createElement(Mail_1["default"], null))),
            react_1["default"].createElement("p", null, "Messages")),
        react_1["default"].createElement(MenuItem_1["default"], null,
            react_1["default"].createElement(IconButton_1["default"], { "aria-label": "show new notifications", color: "inherit" },
                react_1["default"].createElement(Badge_1["default"], { badgeContent: messageCounter, color: "secondary" },
                    react_1["default"].createElement(Notifications_1["default"], null))),
            react_1["default"].createElement("p", null, "Notifications")),
        react_1["default"].createElement(MenuItem_1["default"], { onClick: handleProfileMenuOpen },
            react_1["default"].createElement(IconButton_1["default"], { "aria-label": "account of current user", "aria-controls": "primary-search-account-menu", "aria-haspopup": "true", color: "inherit" },
                react_1["default"].createElement(AccountCircle_1["default"], null)),
            react_1["default"].createElement("p", null, "Profile"))));
    return (react_1["default"].createElement("div", { className: classes.grow },
        react_1["default"].createElement(AppBar_1["default"], { position: "static" },
            react_1["default"].createElement(Toolbar_1["default"], null,
                react_1["default"].createElement(IconButton_1["default"], { edge: "start", className: classes.menuButton, color: "inherit", "aria-label": "open drawer" },
                    react_1["default"].createElement(Menu_2["default"], null)),
                react_1["default"].createElement(Typography_1["default"], { className: classes.title, variant: "h6", noWrap: true }, "Revort"),
                react_1["default"].createElement("div", { className: classes.search },
                    react_1["default"].createElement("div", { className: classes.searchIcon },
                        react_1["default"].createElement(Search_1["default"], null)),
                    react_1["default"].createElement(InputBase_1["default"], { placeholder: "Search Profiles", classes: {
                            root: classes.inputRoot,
                            input: classes.inputInput
                        }, inputProps: { 'aria-label': 'search' } })),
                react_1["default"].createElement("div", { className: classes.grow }),
                react_1["default"].createElement("div", { className: classes.sectionDesktop },
                    react_1["default"].createElement(IconButton_1["default"], { "aria-label": "show new mails", color: "inherit" },
                        react_1["default"].createElement(Badge_1["default"], { badgeContent: messageCounter, color: "secondary" },
                            react_1["default"].createElement(Mail_1["default"], null))),
                    react_1["default"].createElement(IconButton_1["default"], { "aria-label": "show new notifications", color: "inherit" },
                        react_1["default"].createElement(Badge_1["default"], { badgeContent: notificationCounter, color: "secondary" },
                            react_1["default"].createElement(Notifications_1["default"], null))),
                    react_1["default"].createElement(IconButton_1["default"], { edge: "end", "aria-label": "account of current user", "aria-controls": menuId, "aria-haspopup": "true", onClick: handleProfileMenuOpen, color: "inherit" },
                        react_1["default"].createElement(AccountCircle_1["default"], null))),
                react_1["default"].createElement("div", { className: classes.sectionMobile },
                    react_1["default"].createElement(IconButton_1["default"], { "aria-label": "show more", "aria-controls": mobileMenuId, "aria-haspopup": "true", onClick: handleMobileMenuOpen, color: "inherit" },
                        react_1["default"].createElement(MoreVert_1["default"], null))))),
        renderMobileMenu,
        renderMenu));
}
;
