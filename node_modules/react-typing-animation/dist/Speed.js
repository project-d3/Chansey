'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Speed = function Speed() {
  return _react2.default.createElement('noscript', null);
};

Speed.updateCursor = function (cursor, _ref) {
  var ms = _ref.ms;

  return Object.assign({}, cursor, {
    speed: ms
  });
};

Speed.getName = function () {
  return 'Speed';
};

exports.default = Speed;