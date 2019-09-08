'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _utils = require('./utils');

var _Backspace = require('./Backspace');

var _Backspace2 = _interopRequireDefault(_Backspace);

var _Reset = require('./Reset');

var _Reset2 = _interopRequireDefault(_Reset);

var _Delay = require('./Delay');

var _Delay2 = _interopRequireDefault(_Delay);

var _Speed = require('./Speed');

var _Speed2 = _interopRequireDefault(_Speed);

var _Cursor = require('./Cursor');

var _Cursor2 = _interopRequireDefault(_Cursor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Typing = function (_Component) {
  _inherits(Typing, _Component);

  function Typing() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, Typing);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Typing.__proto__ || Object.getPrototypeOf(Typing)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isFinished: false,
      text: []
    }, _this.updateState = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(state) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this.hasMounted) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', new Promise(function (resolve) {
                  _this.setState(state, resolve);
                }));

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.resetState = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', _this.updateState({
                toType: (0, _utils.extractText)(_this.props.children),
                cursor: {
                  lineNum: 0,
                  charPos: 0,
                  numToErase: 0,
                  preEraseLineNum: 0,
                  delay: _this.props.startDelay,
                  speed: _this.props.speed,
                  step: 'char'
                }
              }));

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    })), _this.beginTyping = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var cursor;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              cursor = Object.assign({}, _this.state.cursor);

              if (!(_this.state.toType.length > 0 || cursor.numToErase > 0)) {
                _context3.next = 10;
                break;
              }

              _context3.next = 4;
              return _this.props.onBeforeType(_this.state.text);

            case 4:
              _context3.next = 6;
              return _this.type();

            case 6:
              _context3.next = 8;
              return _this.props.onAfterType(_this.state.text);

            case 8:
              _context3.next = 18;
              break;

            case 10:
              _context3.next = 12;
              return _this.props.onFinishedTyping();

            case 12:
              if (!_this.props.loop) {
                _context3.next = 17;
                break;
              }

              _context3.next = 15;
              return _this.resetState();

            case 15:
              _context3.next = 18;
              break;

            case 17:
              return _context3.abrupt('return', _this.updateState({ isFinished: true }));

            case 18:
              if (!_this.hasMounted) {
                _context3.next = 20;
                break;
              }

              return _context3.abrupt('return', _this.beginTyping());

            case 20:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    })), _this.type = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      var toType, cursor;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              toType = [].concat(_toConsumableArray(_this.state.toType));
              cursor = Object.assign({}, _this.state.cursor);


              while (toType && toType[0] && toType[0].type && toType[0].type.updateCursor && cursor.numToErase < 1) {
                cursor = toType[0].type.updateCursor(cursor, toType[0].props);
                toType.shift();
              }

              _context4.next = 5;
              return _this.updateState({ cursor: cursor, toType: toType });

            case 5:
              return _context4.abrupt('return', _this.animateNextStep());

            case 6:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this2);
    })), _this.animateNextStep = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt('return', new Promise(function (resolve) {
                setTimeout(_asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
                  var _this$state, cursor, toType;

                  return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _this$state = _this.state, cursor = _this$state.cursor, toType = _this$state.toType;
                          _context5.next = 3;
                          return _this.updateState({ cursor: Object.assign({}, cursor, { delay: 0 }) });

                        case 3:
                          if (!(cursor.step === 'char' && cursor.numToErase < 1)) {
                            _context5.next = 9;
                            break;
                          }

                          if (!(toType.length > 0)) {
                            _context5.next = 7;
                            break;
                          }

                          _context5.next = 7;
                          return _this.typeCharacter();

                        case 7:
                          _context5.next = 11;
                          break;

                        case 9:
                          _context5.next = 11;
                          return _this.erase();

                        case 11:

                          resolve();

                        case 12:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  }, _callee5, _this2);
                })), _this.state.cursor.delay);
              }));

            case 1:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this2);
    })), _this.typeCharacter = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt('return', new Promise(function () {
                var _ref9 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(resolve) {
                  var toType, text, cursor;
                  return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          toType = [].concat(_toConsumableArray(_this.state.toType));
                          text = [].concat(_toConsumableArray(_this.state.text));
                          cursor = Object.assign({}, _this.state.cursor);


                          if (text.length - 1 < cursor.lineNum) {
                            text[cursor.lineNum] = '';
                          }

                          text[cursor.lineNum] += toType[0][cursor.charPos];
                          cursor.charPos += 1;

                          if (toType[0].length - 1 < cursor.charPos) {
                            cursor.lineNum += 1;
                            cursor.charPos = 0;
                            toType.shift();
                          }

                          _context7.next = 9;
                          return _this.updateState({ cursor: cursor, text: text, toType: toType });

                        case 9:

                          setTimeout(resolve, (0, _utils.randomize)(cursor.speed));

                        case 10:
                        case 'end':
                          return _context7.stop();
                      }
                    }
                  }, _callee7, _this2);
                }));

                return function (_x2) {
                  return _ref9.apply(this, arguments);
                };
              }()));

            case 1:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this2);
    })), _this.erase = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt('return', new Promise(function () {
                var _ref11 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee9(resolve) {
                  var text, cursor;
                  return _regenerator2.default.wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          text = [].concat(_toConsumableArray(_this.state.text));
                          cursor = Object.assign({}, _this.state.cursor);

                        case 2:
                          if (!(cursor.lineNum > text.length - 1 || cursor.charPos < 0)) {
                            _context9.next = 9;
                            break;
                          }

                          cursor.lineNum -= 1;

                          if (!(cursor.lineNum < 0)) {
                            _context9.next = 6;
                            break;
                          }

                          return _context9.abrupt('break', 9);

                        case 6:

                          cursor.charPos = text[cursor.lineNum].length ? text[cursor.lineNum].length - 1 : 0;
                          _context9.next = 2;
                          break;

                        case 9:

                          if (cursor.step === 'char' && cursor.lineNum >= 0) {
                            text[cursor.lineNum] = text[cursor.lineNum].substr(0, text[cursor.lineNum].length - 1);
                          } else if (cursor.numToErase > 0) {
                            text[cursor.lineNum] = '';
                          } else {
                            text.length = 0;
                          }

                          cursor.charPos -= 1;
                          cursor.numToErase -= 1;

                          if (cursor.numToErase < 1) {
                            cursor.lineNum = cursor.preEraseLineNum;
                            cursor.charPos = 0;
                            cursor.step = 'char';
                          }

                          _context9.next = 15;
                          return _this.updateState({ cursor: cursor, text: text });

                        case 15:

                          setTimeout(resolve, (0, _utils.randomize)(cursor.speed));

                        case 16:
                        case 'end':
                          return _context9.stop();
                      }
                    }
                  }, _callee9, _this2);
                }));

                return function (_x3) {
                  return _ref11.apply(this, arguments);
                };
              }()));

            case 1:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, _this2);
    })), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Typing, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var children = this.props.children;


      if (children !== undefined && JSON.stringify(children, (0, _utils.getCircularReplacer)()) !== JSON.stringify(prevProps.children, (0, _utils.getCircularReplacer)())) {
        this.resetState();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this.hasMounted = true;
      this.resetState().then(_asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return _this3.props.onStartedTyping();

              case 2:
                (0, _raf2.default)(_this3.beginTyping);

              case 3:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, _this3);
      })));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.hasMounted = false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          cursorClassName = _props.cursorClassName,
          hideCursor = _props.hideCursor;
      var _state = this.state,
          isFinished = _state.isFinished,
          text = _state.text;


      var cursor = this.props.cursor || _react2.default.createElement(_Cursor2.default, { className: cursorClassName });

      var filled = (0, _utils.replaceTreeText)(children, text, cursor, isFinished || hideCursor);

      return _react2.default.createElement(
        'div',
        { className: className },
        filled
      );
    }
  }]);

  return Typing;
}(_react.Component);

Typing.propTypes = {
  children: _propTypes2.default.node.isRequired,
  className: _propTypes2.default.string,
  cursor: _propTypes2.default.node,
  cursorClassName: _propTypes2.default.string,
  speed: _propTypes2.default.number,
  startDelay: _propTypes2.default.number,
  loop: _propTypes2.default.bool,
  onStartedTyping: _propTypes2.default.func,
  onBeforeType: _propTypes2.default.func,
  onAfterType: _propTypes2.default.func,
  onFinishedTyping: _propTypes2.default.func
};

Typing.defaultProps = {
  className: '',
  cursorClassName: '',
  speed: 50,
  startDelay: 0,
  loop: false,
  onStartedTyping: function onStartedTyping() {},
  onBeforeType: function onBeforeType() {},
  onAfterType: function onAfterType() {},
  onFinishedTyping: function onFinishedTyping() {}
};

Typing.Backspace = _Backspace2.default;
Typing.Reset = _Reset2.default;
Typing.Delay = _Delay2.default;
Typing.Speed = _Speed2.default;
Typing.Cursor = _Cursor2.default;

exports.default = Typing;