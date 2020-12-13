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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ConversationsProvider = exports.useConversations = void 0;
var react_1 = require("react");
var useLocalStorage_1 = require("../hooks/useLocalStorage");
var ContactProvider_1 = require("./ContactProvider");
var SocketIOProvider_1 = require("./SocketIOProvider");
var ConversationsContext = react_1["default"].createContext();
function useConversations() {
    return react_1.useContext(ConversationsContext);
}
exports.useConversations = useConversations;
function ConversationsProvider(_a) {
    var children = _a.children;
    var _b = SocketIOProvider_1.useSocket(), socketItem = _b.socketItem, idItem = _b.idItem;
    var socket = socketItem[0], setSocket = socketItem[1];
    var id = idItem[0], setId = idItem[1];
    var _c = useLocalStorage_1["default"]('conversations', []), conversations = _c[0], setConversations = _c[1];
    var _d = react_1.useState(0), selectedConversationIndex = _d[0], setSelectedConversationIndex = _d[1];
    var contacts = ContactProvider_1.useContacts().contacts;
    function createConversation(recipients) {
        setConversations(function (prevConversations) {
            return __spreadArrays(prevConversations, [{ recipients: recipients, messages: [] }]);
        });
    }
    var addMessageToConversation = react_1.useCallback(function (_a) {
        var recipients = _a.recipients, text = _a.text, sender = _a.sender;
        setConversations(function (prevConversations) {
            var madeChange = false;
            var newMessage = { sender: sender, text: text };
            var newConversations = prevConversations.map(function (conversation) {
                if (arrayEquality(conversation.recipients, recipients)) {
                    madeChange = true;
                    return __assign(__assign({}, conversation), { messages: __spreadArrays(conversation.messages, [newMessage]) });
                }
                return conversation;
            });
            if (madeChange) {
                return newConversations;
            }
            else {
                return __spreadArrays(prevConversations, [
                    { recipients: recipients, messages: [newMessage] }
                ]);
            }
        });
    }, [setConversations]);
    react_1.useEffect(function () {
        if (socket == null)
            return;
        socket.on('receive-message', addMessageToConversation);
        return function () { return socket.off('receive-message'); };
    }, [socket, addMessageToConversation]);
    function sendMessage(recipients, text) {
        socket.emit('send-message', { recipients: recipients, text: text });
        addMessageToConversation({ recipients: recipients, text: text, sender: id });
    }
    var formattedConversations = conversations.map(function (conversation, index) {
        var recipients = conversation.recipients.map(function (recipient) {
            var contact = contacts.find(function (contact) {
                return contact.id === recipient;
            });
            var name = (contact && contact.name) || recipient;
            return { id: recipient, name: name };
        });
        var messages = conversation.messages.map(function (message) {
            var contact = contacts.find(function (contact) {
                return contact.id === message.sender;
            });
            var name = (contact && contact.name) || message.sender;
            var fromMe = id === message.sender;
            return __assign(__assign({}, message), { senderName: name, fromMe: fromMe });
        });
        var selected = index === selectedConversationIndex;
        return __assign(__assign({}, conversation), { messages: messages, recipients: recipients, selected: selected });
    });
    var value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage: sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        createConversation: createConversation
    };
    return (react_1["default"].createElement(ConversationsContext.Provider, { value: value }, children));
}
exports.ConversationsProvider = ConversationsProvider;
function arrayEquality(a, b) {
    if (a.length !== b.length)
        return false;
    a.sort();
    b.sort();
    return a.every(function (element, index) {
        return element === b[index];
    });
}
