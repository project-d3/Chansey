'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Delay = function Delay() {
  return _react2.default.createElement('noscript', null);
};

Delay.updateCursor = function (cursor, _ref) {
  var ms = _ref.ms;

  return Object.assign({}, cursor, {
    delay: cursor.delay + ms
  });
};

Delay.getName = function () {
  return 'Delay';
};

exports.default = Delay;