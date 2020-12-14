"use strict";
exports.__esModule = true;
exports.SocketIOProvider = exports.useSocket = void 0;
var react_1 = require("react");
var socket_io_client_1 = require("socket.io-client");
var axios_1 = require("axios");
var api = axios_1["default"].create({
    baseURL: 'http://localhost:3031/users',
    responseType: 'json'
});
var SocketIOContext = react_1["default"].createContext(null);
function useSocket() {
    return react_1.useContext(SocketIOContext);
}
exports.useSocket = useSocket;
exports.SocketIOProvider = function (_a) {
    var _b = react_1.useState(), socket = _b[0], setSocket = _b[1];
    var _c = react_1.useState(), id = _c[0], setId = _c[1];
    react_1.useEffect(function () {
        api.get('/:id')
            .then(function (res) { return res.data.user._id; });
        var newSocket = socket_io_client_1["default"]('http://localhost:3050', { query: { id: id } });
        setSocket(newSocket);
        return function () { return newSocket.close(); };
    }, []);
    return (react_1["default"].createElement(SocketIOContext.Provider, { value: { socket: [socket, setSocket], id: [id, setId] } }, children));
};
