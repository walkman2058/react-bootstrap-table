'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Editor = require('./Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _Notification = require('./Notification.js');

var _Notification2 = _interopRequireDefault(_Notification);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableEditColumn = function (_Component) {
  _inherits(TableEditColumn, _Component);

  function TableEditColumn(props) {
    _classCallCheck(this, TableEditColumn);

    var _this = _possibleConstructorReturn(this, (TableEditColumn.__proto__ || Object.getPrototypeOf(TableEditColumn)).call(this, props));

    _this.handleKeyPress = function () {
      return _this.__handleKeyPress__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleBlur = function () {
      return _this.__handleBlur__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleCustomUpdate = function () {
      return _this.__handleCustomUpdate__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.notifyToastr = function () {
      return _this.__notifyToastr__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleClick = function () {
      return _this.__handleClick__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.timeouteClear = 0;
    var _this$props = _this.props,
        fieldValue = _this$props.fieldValue,
        row = _this$props.row,
        className = _this$props.className;

    _this.state = {
      shakeEditor: false,
      className: typeof className === 'function' ? className(fieldValue, row) : className
    };
    return _this;
  }

  _createClass(TableEditColumn, [{
    key: '__handleKeyPress__REACT_HOT_LOADER__',
    value: function __handleKeyPress__REACT_HOT_LOADER__(e) {
      if (e.keyCode === 13) {
        // Pressed ENTER
        var value = e.currentTarget.type === 'checkbox' ? this._getCheckBoxValue(e) : e.currentTarget.value;

        if (!this.validator(value)) {
          return;
        }
        this.props.completeEdit(value, this.props.rowIndex, this.props.colIndex);
      } else if (e.keyCode === 27) {
        this.props.completeEdit(null, this.props.rowIndex, this.props.colIndex);
      } else if (e.keyCode === 9) {
        this.props.onTab(this.props.rowIndex + 1, this.props.colIndex + 1, 'tab', e);
        e.preventDefault();
      } else if (e.type === 'click' && !this.props.blurToSave) {
        // textarea click save button
        var _value = e.target.parentElement.firstChild.value;
        if (!this.validator(_value)) {
          return;
        }
        this.props.completeEdit(_value, this.props.rowIndex, this.props.colIndex);
      }
    }
  }, {
    key: '__handleBlur__REACT_HOT_LOADER__',
    value: function __handleBlur__REACT_HOT_LOADER__(e) {
      e.stopPropagation();
      if (this.props.blurToSave) {
        var value = e.currentTarget.type === 'checkbox' ? this._getCheckBoxValue(e) : e.currentTarget.value;
        if (!this.validator(value)) {
          return;
        }
        this.props.completeEdit(value, this.props.rowIndex, this.props.colIndex);
      }
    }
  }, {
    key: '__handleCustomUpdate__REACT_HOT_LOADER__',


    // modified by iuculanop
    // BEGIN
    value: function __handleCustomUpdate__REACT_HOT_LOADER__(value) {
      if (!this.validator(value)) {
        return;
      }
      this.props.completeEdit(value, this.props.rowIndex, this.props.colIndex);
    }
  }, {
    key: 'validator',
    value: function validator(value) {
      var ts = this;
      var valid = true;
      if (ts.props.editable.validator) {
        var input = ts.refs.inputRef;
        var checkVal = ts.props.editable.validator(value, this.props.row);
        var responseType = typeof checkVal === 'undefined' ? 'undefined' : _typeof(checkVal);
        if (responseType !== 'object' && checkVal !== true) {
          valid = false;
          this.notifyToastr('error', checkVal, _Const2.default.CANCEL_TOASTR);
        } else if (responseType === 'object' && checkVal.isValid !== true) {
          valid = false;
          this.notifyToastr(checkVal.notification.type, checkVal.notification.msg, checkVal.notification.title);
        }
        if (!valid) {
          // animate input
          ts.clearTimeout();
          var _props = this.props,
              invalidColumnClassName = _props.invalidColumnClassName,
              row = _props.row;

          var className = typeof invalidColumnClassName === 'function' ? invalidColumnClassName(value, row) : invalidColumnClassName;
          ts.setState({ shakeEditor: true, className: className });
          ts.timeouteClear = setTimeout(function () {
            ts.setState({ shakeEditor: false });
          }, 300);
          input.focus();
          return valid;
        }
      }
      return valid;
    }
    // END

  }, {
    key: '__notifyToastr__REACT_HOT_LOADER__',
    value: function __notifyToastr__REACT_HOT_LOADER__(type, message, title) {
      var toastr = true;
      var beforeShowError = this.props.beforeShowError;

      if (beforeShowError) {
        toastr = beforeShowError(type, message, title);
      }
      if (toastr) {
        this.refs.notifier.notice(type, message, title);
      }
    }
  }, {
    key: 'clearTimeout',
    value: function (_clearTimeout) {
      function clearTimeout() {
        return _clearTimeout.apply(this, arguments);
      }

      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };

      return clearTimeout;
    }(function () {
      if (this.timeouteClear !== 0) {
        clearTimeout(this.timeouteClear);
        this.timeouteClear = 0;
      }
    })
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refs.inputRef.focus();
      var dom = _reactDom2.default.findDOMNode(this);
      if (this.props.isFocus) {
        dom.focus();
      } else {
        dom.blur();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var dom = _reactDom2.default.findDOMNode(this);
      if (this.props.isFocus) {
        dom.focus();
      } else {
        dom.blur();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearTimeout();
    }
  }, {
    key: '__handleClick__REACT_HOT_LOADER__',
    value: function __handleClick__REACT_HOT_LOADER__(e) {
      if (e.target.tagName !== 'TD') {
        e.stopPropagation();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          editable = _props2.editable,
          format = _props2.format,
          customEditor = _props2.customEditor,
          isFocus = _props2.isFocus,
          customStyleWithNav = _props2.customStyleWithNav,
          row = _props2.row;
      var shakeEditor = this.state.shakeEditor;

      var attr = {
        ref: 'inputRef',
        onKeyDown: this.handleKeyPress,
        onBlur: this.handleBlur
      };
      var style = { position: 'relative' };
      var fieldValue = this.props.fieldValue;
      var className = this.state.className;
      // put placeholder if exist

      editable.placeholder && (attr.placeholder = editable.placeholder);

      var editorClass = (0, _classnames2.default)({ 'animated': shakeEditor, 'shake': shakeEditor });
      var cellEditor = void 0;
      if (customEditor) {
        var customEditorProps = _extends({
          row: row
        }, attr, {
          defaultValue: fieldValue || ''
        }, customEditor.customEditorParameters);
        cellEditor = customEditor.getElement(this.handleCustomUpdate, customEditorProps);
      } else {
        fieldValue = fieldValue === 0 ? '0' : fieldValue;
        cellEditor = (0, _Editor2.default)(editable, attr, format, editorClass, fieldValue || '');
      }

      if (isFocus) {
        if (customStyleWithNav) {
          var customStyle = typeof customStyleWithNav === 'function' ? customStyleWithNav(fieldValue, row) : customStyleWithNav;
          style = _extends({}, style, customStyle);
        } else {
          className = className + ' default-focus-cell';
        }
      }

      return _react2.default.createElement(
        'td',
        { ref: 'td',
          style: style,
          className: className,
          onClick: this.handleClick },
        cellEditor,
        _react2.default.createElement(_Notification2.default, { ref: 'notifier' })
      );
    }
  }, {
    key: '_getCheckBoxValue',
    value: function _getCheckBoxValue(e) {
      var value = '';
      var values = e.currentTarget.value.split(':');
      value = e.currentTarget.checked ? values[0] : values[1];
      return value;
    }
  }]);

  return TableEditColumn;
}(_react.Component);

TableEditColumn.propTypes = {
  completeEdit: _react.PropTypes.func,
  rowIndex: _react.PropTypes.number,
  colIndex: _react.PropTypes.number,
  blurToSave: _react.PropTypes.bool,
  editable: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.object]),
  format: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func]),
  row: _react.PropTypes.any,
  fieldValue: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool, _react.PropTypes.number, _react.PropTypes.array, _react.PropTypes.object]),
  className: _react.PropTypes.any,
  beforeShowError: _react.PropTypes.func,
  isFocus: _react.PropTypes.bool,
  customStyleWithNav: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object])
};

var _default = TableEditColumn;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TableEditColumn, 'TableEditColumn', 'C:/Users/v.kirilenko/Desktop/react-bootstrap-table/src/TableEditColumn.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/v.kirilenko/Desktop/react-bootstrap-table/src/TableEditColumn.js');
}();

;