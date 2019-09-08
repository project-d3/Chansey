'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Speed = exports.Reset = exports.Delay = exports.Cursor = exports.Backspace = undefined;

var _Backspace = require('./Backspace');

Object.defineProperty(exports, 'Backspace', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Backspace).default;
  }
});

var _Cursor = require('./Cursor');

Object.defineProperty(exports, 'Cursor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Cursor).default;
  }
});

var _Delay = require('./Delay');

Object.defineProperty(exports, 'Delay', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Delay).default;
  }
});

var _Reset = require('./Reset');

Object.defineProperty(exports, 'Reset', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Reset).default;
  }
});

var _Speed = require('./Speed');

Object.defineProperty(exports, 'Speed', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Speed).default;
  }
});

var _Typing = require('./Typing');

var _Typing2 = _interopRequireDefault(_Typing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Typing2.default;