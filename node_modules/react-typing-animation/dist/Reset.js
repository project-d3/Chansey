'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Reset = function Reset() {
  return _react2.default.createElement('noscript', null);
};

Reset.updateCursor = function (cursor, _ref) {
  var count = _ref.count,
      delay = _ref.delay,
      speed = _ref.speed;

  return Object.assign({}, cursor, {
    numToErase: count,
    preEraseLineNum: cursor.lineNum,
    speed: speed > 0 ? speed : cursor.speed,
    delay: delay > 0 ? cursor.delay + delay : cursor.delay,
    step: 'line'
  });
};

Reset.getName = function () {
  return 'Reset';
};

exports.default = Reset;