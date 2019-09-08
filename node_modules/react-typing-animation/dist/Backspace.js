'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Backspace = function Backspace() {
  return _react2.default.createElement('noscript', null);
};

Backspace.updateCursor = function (cursor, _ref) {
  var speed = _ref.speed,
      count = _ref.count,
      delay = _ref.delay;

  return Object.assign({}, cursor, {
    numToErase: count,
    preEraseLineNum: cursor.lineNum,
    speed: speed > 0 ? speed : cursor.speed,
    delay: delay > 0 ? cursor.delay + delay : cursor.delay
  });
};

Backspace.getName = function () {
  return 'Backspace';
};

exports.default = Backspace;