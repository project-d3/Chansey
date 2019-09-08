'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCircularReplacer = exports.replaceTreeText = exports.extractText = exports.randomize = exports.gaussianRandomInRange = exports.randomInRange = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voidHTMLElements = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

var flatten = function flatten(arr) {
  return arr.reduce(function (acc, item) {
    return acc.concat(Array.isArray(item) ? _react.Children.toArray(flatten(item)) : _react.Children.toArray(item));
  }, []);
};

var removeUndefined = function removeUndefined(arr) {
  return arr.filter(function (node) {
    return node !== undefined;
  });
};

var isTypingComponent = function isTypingComponent(struct) {
  return ['Backspace', 'Delay', 'Speed', 'Reset'].some(function (sub) {
    return struct.type && struct.type.getName && struct.type.getName() === sub;
  });
};

var randomInRange = exports.randomInRange = function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var gaussianRandomInRange = exports.gaussianRandomInRange = function gaussianRandomInRange(min, max) {
  var total = randomInRange(min, max);

  for (var i = 0; i < 5; i++) {
    total += randomInRange(min, max);
  }

  return Math.floor(total / 6);
};

var randomize = exports.randomize = function randomize(avg) {
  var randomPercentage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;

  return gaussianRandomInRange(avg + avg * randomPercentage, avg - avg * randomPercentage);
};

var extractText = exports.extractText = function extractText() {
  var traverse = function traverse(node) {
    if (isTypingComponent(node)) {
      return node;
    } else if (_react2.default.isValidElement(node)) {
      if (voidHTMLElements.indexOf(node.type) !== -1) {
        return '\n';
      }
      return _react.Children.map(node.props.children, function (child) {
        return traverse(child);
      });
    } else if (Array.isArray(node)) {
      return node.map(function (el) {
        return traverse(el);
      });
    }
    return String(node);
  };
  var text = traverse.apply(undefined, arguments);
  return Array.isArray(text) ? removeUndefined(flatten(text)) : removeUndefined([text]);
};

var replaceTreeText = exports.replaceTreeText = function replaceTreeText(tree, txt, cursor, hideCursor) {
  var traverse = function traverse(node, text) {
    if (text.length < 1) {
      return undefined;
    }

    if (isTypingComponent(node)) {
      return undefined;
    } else if (_react2.default.isValidElement(node)) {
      if (voidHTMLElements.indexOf(node.type) !== -1) {
        if (text.length === 1) {
          return _react.Children.toArray([text.shift() === '' ? undefined : node, hideCursor ? null : cursor]);
        }
        return text.shift() === '' ? undefined : node;
      }

      return _react2.default.createElement(node.type, Object.assign({}, node.props, {
        key: node.key || 'Typing.' + _shortid2.default.generate()
      }), removeUndefined(_react.Children.toArray(node.props.children).map(function (child) {
        return traverse(child, text);
      })));
    } else if (Array.isArray(node)) {
      return removeUndefined(node.map(function (el) {
        return traverse(el, text);
      }));
    }
    return text.length === 1 ? _react.Children.toArray([text.shift(), hideCursor ? null : cursor]) : text.shift() || '';
  };
  return traverse(tree, txt.slice());
};

var getCircularReplacer = exports.getCircularReplacer = function getCircularReplacer() {
  var seen = new WeakSet();

  return function (key, value) {
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      try {
        seen.add(value);
      } catch (e) {
        // The following will break MS Edge:
        // seen.add(window.location);
        // See:
        // https://github.com/Microsoft/ChakraCore/pull/3522
      }
    }
    return value;
  };
};