"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// eslint-disable-next-line import/no-anonymous-default-export
var _default = {
  getUsers: function getUsers() {
    return fetch('/users').then(function (res) {
      return res.json();
    });
  },
  findOneUser: function findOneUser(_id) {
    return fetch("/users/".concat(_id)).then(function (res) {
      return res.json();
    });
  },
  deleteUser: function deleteUser(_id) {
    return fetch("/users/".concat(_id), {
      method: 'delete'
    }).then(function (res) {
      return res.json();
    });
  },
  updateUser: function updateUser(user) {
    return fetch("/users/".concat(user._id), {
      method: "put",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (res) {
      return res.json();
    });
  },
  createUser: function createUser(user) {
    return fetch("/users/create", {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (res) {
      return res.json();
    });
  }
};
exports["default"] = _default;