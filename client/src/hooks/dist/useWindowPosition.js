"use strict";
exports.__esModule = true;
var react_1 = require("react");
function useWindowPosition(id) {
    var _a = react_1.useState(false), animation = _a[0], setAnimation = _a[1];
    react_1.useLayoutEffect(function () {
        function updatePosition() {
            var offetSetHeight = window.document.getElementById(id).offsetHeight;
            if (window.pageYOffset > offetSetHeight * 0.7) {
                setAnimation(true);
            }
        }
        window.addEventListener('scroll', updatePosition);
        updatePosition();
        return function () { return window.removeEventListener('scroll', updatePosition); };
    }, [id]);
    return animation;
}
exports["default"] = useWindowPosition;
