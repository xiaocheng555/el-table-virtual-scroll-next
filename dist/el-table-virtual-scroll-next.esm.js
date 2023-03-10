import { ElTableColumn, ElCheckbox, ElRadio } from 'element-plus';

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return _root.Date.now();
};

var now_1 = now;

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

var _trimmedEndIndex = trimmedEndIndex;

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, _trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

var _baseTrim = baseTrim;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol_1(value)) {
    return NAN;
  }
  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = _baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber;

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber_1(wait) || 0;
  if (isObject_1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now_1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now_1());
  }

  function debounced() {
    var time = now_1(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject_1(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce_1(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

var throttle_1 = throttle;

// ???????????????????????????
function isScroller(el) {
  var style = window.getComputedStyle(el, null);
  var scrollValues = ['auto', 'scroll'];
  return scrollValues.includes(style.overflow) || scrollValues.includes(style['overflow-y']);
}

// ????????????????????????
function getScrollTop(el) {
  return el === window ? window.pageYOffset : el.scrollTop;
}

// ????????????????????????
function getScrollLeft(el) {
  return el === window ? window.pageXOffset : el.scrollLeft;
}

// ????????????????????????
function setScrollTop(el, pos) {
  return el === window ? window.scroll(window.pageXOffset, pos) : el.scrollTop = pos;
}

// ????????????????????????
function setScrollLeft(el, pos) {
  return el === window ? window.scroll(pos, window.pageYOffset) : el.scrollLeft = pos;
}

// ??????????????????
function getOffsetHeight(el) {
  return el === window ? window.innerHeight : el.offsetHeight;
}

// ?????????????????????
function scrollToY(el, y) {
  if (el === window) {
    window.scroll(0, y);
  } else {
    el.scrollTop = y;
  }
}

// ??????body class??????
var TableBodyClassNames = ['.el-table__body-wrapper .el-scrollbar__view'];
var checkOrder = 0; // ??????????????????????????????????????????

var script$1 = {
  inheritAttrs: false,
  name: 'el-table-virtual-scroll',
  props: {
    // ?????????
    data: {
      type: Array,
      required: true
    },
    // ????????????????????????
    itemSize: {
      type: Number,
      "default": 60
    },
    // ??????????????????
    scrollBox: {
      type: String
    },
    // ??????????????????????????????????????????????????????????????????
    buffer: {
      type: Number,
      "default": 200
    },
    // key??????data??????????????????id
    keyProp: {
      type: String,
      "default": 'id'
    },
    // ???????????????????????????
    throttleTime: {
      type: Number,
      "default": 10
    },
    // ?????????????????????????????????
    dynamic: {
      type: Boolean,
      "default": true
    },
    // ????????????????????????
    virtualized: {
      type: Boolean,
      "default": true
    }
  },
  provide: function provide() {
    return {
      virtualScroll: this
    };
  },
  data: function data() {
    return {
      sizes: {},
      // ?????????????????????????????????
      start: 0,
      end: undefined,
      curRow: null,
      // ???????????????????????????
      isExpanding: false,
      // ?????????????????????
      columnVms: [],
      // virtual-column ????????????
      isHideAppend: false
    };
  },
  computed: {
    // ???????????????item??????key????????????????????????????????????
    offsetMap: function offsetMap(_ref) {
      var keyProp = _ref.keyProp,
        itemSize = _ref.itemSize,
        sizes = _ref.sizes,
        data = _ref.data;
      if (!this.dynamic) return {};
      var res = {};
      var total = 0;
      for (var i = 0; i < data.length; i++) {
        var key = data[i][keyProp];
        res[key] = total;
        var curSize = sizes[key];
        var size = typeof curSize === 'number' ? curSize : itemSize;
        total += size;
      }
      return res;
    },
    watchData: function watchData() {
      console.log('data change');
      return this.data;
    }
  },
  methods: {
    // ???????????????
    initData: function initData() {
      var _this = this;
      // ???????????????????????????
      this.renderData = [];
      // ?????????????????????????????????
      this.top = undefined;
      this.bottom = undefined;
      // ???????????????????????????????????????????????????????????????
      this.start = 0;
      this.end = undefined;
      // ????????????????????????????????????
      this.toTop = 0;
      // ????????????deactivated??????
      this.isDeactivated = false;
      // ???????????????????????????0-????????????top???1-????????????left???2-??????????????????top???3-??????????????????left???
      this.scrollPos = [0, 0, 0, 0];
      this.scroller = this.getScroller();
      this.setToTop();
      this.recordTablePos();

      // ????????????
      setTimeout(function () {
        _this.handleScroll();
      }, 100);

      // ????????????
      this.onScroll = !this.throttleTime ? this.handleScroll : throttle_1(this.handleScroll, this.throttleTime);
      this.scroller.addEventListener('scroll', this.onScroll, {
        passive: true
      });
      window.addEventListener('resize', this.onScroll);
    },
    // ??????????????????
    getScroller: function getScroller() {
      var el;
      if (this.scrollBox) {
        if (this.scrollBox === 'window' || this.scrollBox === window) return window;
        el = document.querySelector(this.scrollBox);
        if (!el) throw new Error(" scrollBox prop: '".concat(this.scrollBox, "' is not a valid selector"));
        if (!isScroller(el)) console.warn("Warning! scrollBox prop: '".concat(this.scrollBox, "' is not a scroll element"));
        return el;
      } else {
        this.innerScroll = true;
        return this.$el.querySelector('.el-table__body-wrapper .el-scrollbar__wrap');
      }
    },
    // ????????????????????????????????????
    setToTop: function setToTop() {
      if (this.innerScroll) {
        this.toTop = 0;
      } else {
        this.toTop = this.$el.getBoundingClientRect().top - (this.scroller === window ? 0 : this.scroller.getBoundingClientRect().top) + getScrollTop(this.scroller);
      }
    },
    // ??????????????????
    handleScroll: function handleScroll() {
      var shouldUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      // ????????????????????????????????????handleScroll?????????????????????????????????????????????scrollTop??????0
      if (this.isDeactivated) return;
      // ??????scrollPos
      this.scrollPos[0] = getScrollTop(this.scroller);
      this.scrollPos[1] = getScrollLeft(this.scroller);
      if (!this.virtualized) return;
      this.removeHoverRows();
      // ??????????????????????????????
      this.updateSizes();
      // ??????renderData
      this.calcRenderData();
      // ????????????
      this.calcPosition();
      shouldUpdate && this.updatePosition();
      // ????????????
      this.$emit('change', this.renderData, this.start, this.end);
    },
    // ????????????hover-row
    removeHoverRows: function removeHoverRows() {
      var hoverRows = this.$el.querySelectorAll('.el-table__row.hover-row');
      if (hoverRows.length > 1) {
        Array.from(hoverRows).forEach(function (row) {
          row.classList.remove('hover-row');
        });
      }
    },
    // ????????????????????????
    updateSizes: function updateSizes() {
      var _this2 = this;
      if (!this.dynamic) return;
      var rows = this.$el.querySelectorAll('.el-table__body > tbody > .el-table__row');

      // ??????????????????
      var isTree = false;
      if (rows[0] && rows[0].classList.contains('el-table__row--level-0')) {
        isTree = true;
        rows = this.$el.querySelectorAll('.el-table__body > tbody > .el-table__row.el-table__row--level-0');
      }
      Array.from(rows).forEach(function (row, index) {
        var item = _this2.renderData[index];
        if (!item) return;

        // ????????????????????????
        var offsetHeight = row.offsetHeight;
        // ???????????????????????????????????????????????????????????????
        var next = row.nextSibling;
        if (next.tagName === 'TR' && next.querySelector('.el-table__expanded-cell')) {
          offsetHeight += next.offsetHeight;
        }
        // ??????????????????????????????????????????????????????????????????
        if (isTree) {
          var _next = row.nextSibling;
          while (_next && _next.tagName === 'TR' && !_next.classList.contains('el-table__row--level-0')) {
            offsetHeight += _next.offsetHeight;
            _next = _next.nextSibling;
          }
        }
        var key = item[_this2.keyProp];
        if (_this2.sizes[key] !== offsetHeight) {
          _this2.sizes[key] = offsetHeight;
        }
      });
    },
    // ??????????????????offsetTop
    getItemOffsetTop: function getItemOffsetTop(index) {
      if (!this.dynamic) {
        return this.itemSize * index;
      }
      var item = this.data[index];
      if (item) {
        return this.offsetMap[item[this.keyProp]] || 0;
      }
      return 0;
    },
    // ???????????????????????????
    getItemSize: function getItemSize(index) {
      if (index <= -1) return 0;
      var item = this.data[index];
      if (item) {
        var key = item[this.keyProp];
        return this.sizes[key] || this.itemSize;
      }
      return this.itemSize;
    },
    // ????????????????????????????????????
    calcRenderData: function calcRenderData() {
      var scroller = this.scroller,
        data = this.data,
        buffer = this.buffer;
      // ?????????????????????????????????
      var top = this.scrollPos[0] - buffer - this.toTop;
      var bottom = this.scrollPos[0] + getOffsetHeight(scroller) + buffer - this.toTop;
      var start;
      var end;
      if (!this.dynamic) {
        start = top <= 0 ? 0 : Math.floor(top / this.itemSize);
        end = bottom <= 0 ? 0 : Math.ceil(bottom / this.itemSize);
      } else {
        // ?????????????????????????????????????????????????????????
        var l = 0;
        var r = data.length - 1;
        var mid = 0;
        while (l <= r) {
          mid = Math.floor((l + r) / 2);
          var midVal = this.getItemOffsetTop(mid);
          if (midVal < top) {
            var midNextVal = this.getItemOffsetTop(mid + 1);
            if (midNextVal > top) break;
            l = mid + 1;
          } else {
            r = mid - 1;
          }
        }

        // ??????????????????????????????????????????
        start = mid;
        end = data.length - 1;
        for (var i = start + 1; i < data.length; i++) {
          var offsetTop = this.getItemOffsetTop(i);
          if (offsetTop >= bottom) {
            end = i;
            break;
          }
        }
      }

      // ?????????????????????????????????????????????????????????1?????????????????????????????????????????????????????????????????????????????????????????????
      if (start % 2) {
        start = start - 1;
      }
      this.top = top;
      this.bottom = bottom;
      this.start = start;
      this.end = end;
      this.renderData = data.slice(start, end + 1);
    },
    // ????????????
    calcPosition: function calcPosition() {
      var _this3 = this;
      var last = this.data.length - 1;
      // ?????????????????????
      var wrapHeight = this.getItemOffsetTop(last) + this.getItemSize(last);
      // ?????????????????????????????????????????????
      var offsetTop = this.getItemOffsetTop(this.start);

      // ??????dom??????
      TableBodyClassNames.forEach(function (className) {
        var el = _this3.$el.querySelector(className);
        if (!el) return;

        // ??????wrapEl???innerEl
        if (!el.wrapEl) {
          var wrapEl = document.createElement('div');
          var innerEl = document.createElement('div');
          wrapEl.appendChild(innerEl);
          innerEl.appendChild(el.children[0]);
          el.insertBefore(wrapEl, el.firstChild);
          el.wrapEl = wrapEl;
          el.innerEl = innerEl;
        }
        if (el.wrapEl) {
          // ????????????
          el.wrapEl.style.height = wrapHeight + 'px';
          // ??????transform????????????
          el.innerEl.style.transform = "translateY(".concat(offsetTop, "px)");
          // ??????paddingTop????????????
          // el.innerEl.style.paddingTop = `${offsetTop}px`
        }
      });
    },
    // ????????????????????????????????????????????????????????????10ms?????????
    // ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????handleScroll???????????????
    updatePosition: function updatePosition() {
      var _this4 = this;
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this4.timer && clearTimeout(_this4.timer);
        // ??????false???????????????????????????
        _this4.handleScroll(false);
      }, this.throttleTime + 10);
    },
    // ??????????????????
    renderAllData: function renderAllData() {
      var _this5 = this;
      this.renderData = this.data;
      this.$emit('change', this.data, 0, this.data.length - 1);
      this.$nextTick(function () {
        // ??????????????????????????????
        TableBodyClassNames.forEach(function (className) {
          var el = _this5.$el.querySelector(className);
          if (!el) return;
          if (el.wrapEl) {
            // ????????????
            el.wrapEl.style.height = 'auto';
            // ??????transform????????????
            el.innerEl.style.transform = "translateY(".concat(0, "px)");
          }
        });
      });
    },
    // ????????????????????????
    update: function update() {
      // console.log('update')
      this.setToTop();
      this.handleScroll();
    },
    // ????????????????????????????????????
    // ??????????????????????????????n?????????????????????????????????????????????????????????????????????????????????????????????????????????
    scrollTo: function scrollTo(index) {
      var _this6 = this;
      var stop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var item = this.data[index];
      if (item && this.scroller) {
        this.updateSizes();
        this.calcRenderData();
        this.$nextTick(function () {
          var offsetTop = _this6.getItemOffsetTop(index);
          scrollToY(_this6.scroller, offsetTop);

          // ????????????scrollTo????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          if (!stop) {
            setTimeout(function () {
              _this6.scrollTo(index, true);
            }, 50);
          }
        });
      }
    },
    // ????????????????????????
    reset: function reset() {
      this.sizes = {};
      this.scrollTo(0, false);
    },
    // ??????virtual-column??????
    addColumn: function addColumn(vm) {
      this.columnVms.push(vm);
    },
    // ??????virtual-column??????
    removeColumn: function removeColumn(vm) {
      this.columnVms = this.columnVms.filter(function (item) {
        return item !== vm;
      });
    },
    // ????????????????????????
    checkAll: function checkAll(val) {
      var _this7 = this;
      this.data.forEach(function (row) {
        return _this7.checkRow(row, val, false);
      });
      this.emitSelectionChange();
      if (val === false) checkOrder = 0; // ????????????????????????checkOrder
    },
    // ????????????????????????
    checkRow: function checkRow(row, val) {
      var emit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (row.$v_checked === val) return;
      row.$v_checked = val;
      row.$v_checkedOrder = val ? checkOrder++ : undefined;
      emit && this.emitSelectionChange();
    },
    // ?????????????????????selection-change??????
    emitSelectionChange: function emitSelectionChange() {
      var selection = this.data.filter(function (row) {
        return row.$v_checked;
      }).sort(function (a, b) {
        return a.$v_checkedOrder - b.$v_checkedOrder;
      });
      this.$emit('selection-change', selection);
    },
    // ?????????????????????clearSelection??????
    clearSelection: function clearSelection() {
      this.checkAll(false);
      this.columnVms.forEach(function (vm) {
        return vm.syncCheckStatus();
      });
    },
    // ?????????????????????toggleRowSelection??????
    toggleRowSelection: function toggleRowSelection(row, selected) {
      var val = typeof selected === 'boolean' ? selected : !row.$v_checked;
      this.checkRow(row, val);
      this.columnVms.forEach(function (vm) {
        return vm.syncCheckStatus();
      });
    },
    // ????????????????????????
    setCurrentRow: function setCurrentRow(row) {
      this.curRow = row;
      this.$emit('current-change', row);
    },
    // ????????????
    updateData: function updateData(data) {
      this.$emit('update:data', data);
    },
    // ??????update????????????????????????????????????nextTick????????????????????????????????????100??????????????????????????????????????????data???virtualized?????????????????????update??????????????????update?????????updateSize????????????????????????????????????renderData??????????????????dom????????????????????????????????????????????????renderData??????????????????????????????update??????renderData????????????????????????dom??????????????????renderData???dom???????????????????????????????????????????????????????????????????????????????????????????????????nextTick???????????????????????????bug?????????
    doUpdate: function doUpdate() {
      var _this8 = this;
      if (this.hasDoUpdate) return; // nextTick????????????????????????????????????
      if (!this.scroller) return; // scroller?????????????????????????????????????????????

      // ????????????????????????????????????????????????el-table__append-wrapper???????????????????????????????????????????????????append????????????
      this.isHideAppend = true;
      this.update();
      this.hasDoUpdate = true;
      this.$nextTick(function () {
        _this8.hasDoUpdate = false;
        _this8.isHideAppend = false;
      });
    },
    // ????????????x???y???????????????
    recordTablePos: function recordTablePos() {
      var _this9 = this;
      if (this.innerScroll || this.isDeactivated) return;
      this.tableBodyEl = this.$el.querySelector('.el-table__body-wrapper');
      this.onTableScroll = throttle_1(function () {
        _this9.scrollPos[2] = getScrollTop(_this9.tableBodyEl);
        _this9.scrollPos[3] = getScrollLeft(_this9.tableBodyEl);
      }, 100);
      this.tableBodyEl.addEventListener('scroll', this.onTableScroll, {
        passive: true
      });
    },
    // ??????y????????????????????????????????????????????????
    restoreScrollY: function restoreScrollY() {
      var _this10 = this;
      if (!this.scroller) return;

      // ??????????????????????????????
      var _this$scrollPos = _slicedToArray(this.scrollPos, 4),
        top = _this$scrollPos[0],
        left = _this$scrollPos[1],
        top2 = _this$scrollPos[2],
        left2 = _this$scrollPos[3];
      if (this.innerScroll) {
        // ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????scrollTop????????????
        setTimeout(function () {
          setScrollTop(_this10.scroller, top);
          setScrollLeft(_this10.scroller, left);
          // ??????????????????????????????????????????????????????y???????????????
          var leftScroller = document.querySelector(TableBodyClassNames[1]);
          var rightScroller = document.querySelector(TableBodyClassNames[2]);
          if (leftScroller) setScrollTop(leftScroller, top);
          if (rightScroller) setScrollTop(rightScroller, top);
        }, 50);
      } else {
        setScrollTop(this.scroller, top);
        setScrollLeft(this.scroller, left);
        // ???????????????????????????
        setScrollTop(this.tableBodyEl, top2);
        setScrollLeft(this.tableBodyEl, left2);
      }
    }
  },
  watch: {
    'data.length': function dataLength() {
      if (!this.virtualized) {
        this.renderAllData();
      } else {
        this.doUpdate();
      }
    },
    virtualized: {
      immediate: true,
      handler: function handler(val) {
        if (!val) {
          this.renderAllData();
        } else {
          this.doUpdate();
        }
      }
    }
  },
  created: function created() {
    var _this11 = this;
    this.$nextTick(function () {
      _this11.initData();
    });
  },
  beforeUnmount: function beforeUnmount() {
    if (this.scroller) {
      this.scroller.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onScroll);
    }
  },
  activated: function activated() {
    this.isDeactivated = false;
    this.restoreScrollY();
  },
  deactivated: function deactivated() {
    this.isDeactivated = true;
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "el-table-virtual-scroll",
    "class": [_vm.isHideAppend ? "hide-append" : ""]
  }, [_vm._t("default")], 2);
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

/* style */
var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-79cf862c_0", {
    source: ".hide-append[data-v-79cf862c] :deep(.el-table__append-wrapper) {\n  display: none;\n}\n",
    map: {
      "version": 3,
      "sources": ["el-table-virtual-scroll.vue"],
      "names": [],
      "mappings": "AAAA;EACE,aAAa;AACf",
      "file": "el-table-virtual-scroll.vue",
      "sourcesContent": [".hide-append :deep(.el-table__append-wrapper) {\n  display: none;\n}\n"]
    },
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__$1 = "data-v-79cf862c";
/* module identifier */
var __vue_module_identifier__$1 = undefined;
/* functional template */
var __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

var script = {
  inheritAttrs: false,
  name: 'el-table-virtual-column',
  components: {
    ElTableColumn: ElTableColumn,
    ElCheckbox: ElCheckbox,
    ElRadio: ElRadio
  },
  inject: ['virtualScroll'],
  props: {
    load: {
      type: Function
    },
    indent: {
      type: Number,
      "default": 16
    }
  },
  data: function data() {
    return {
      isCheckedAll: false,
      // ??????
      isCheckedImn: false,
      // ??????????????????
      isTree: false,
      type: undefined
    };
  },
  methods: {
    // ?????????????????????
    onCheckAllRows: function onCheckAllRows(val) {
      val = this.isCheckedImn ? true : val;
      this.virtualScroll.checkAll(val);
      this.isCheckedAll = val;
      this.isCheckedImn = false;
    },
    // ??????????????????
    onCheckRow: function onCheckRow(row, val) {
      this.virtualScroll.checkRow(row, val);
      this.syncCheckStatus();
    },
    // ??????????????????????????????
    syncCheckStatus: function syncCheckStatus() {
      var list = this.virtualScroll.data;
      var checkedLen = list.filter(function (row) {
        return row.$v_checked === true;
      }).length;
      if (checkedLen === 0) {
        this.isCheckedAll = false;
        this.isCheckedImn = false;
      } else if (checkedLen === list.length) {
        this.isCheckedAll = true;
        this.isCheckedImn = false;
      } else {
        this.isCheckedAll = false;
        this.isCheckedImn = true;
      }
    },
    onRadioChange: function onRadioChange(row) {
      this.virtualScroll.setCurrentRow(row);
    },
    // ???????????????
    getIndex: function getIndex(scope) {
      var index = this.virtualScroll.start + scope.$index;
      if (typeof this.$attrs.index === 'function') {
        return this.$attrs.index(index);
      }
      return index + 1;
    },
    // ??????????????????
    onTreeNodeExpand: function onTreeNodeExpand(row) {
      this.$set(row, '$v_expanded', !row.$v_expanded);
      if (row.$v_expanded) {
        this.loadChildNodes(row);
      } else {
        this.hideChildNodes(row);
      }
    },
    // ???????????????
    loadChildNodes: function loadChildNodes(row) {
      // ????????????????????????????????????????????????
      if (row.$v_loaded) {
        var list = this.virtualScroll.data;
        var index = list.findIndex(function (item) {
          return item === row;
        });
        if (index > -1) {
          this.virtualScroll.updateData([].concat(_toConsumableArray(list.slice(0, index + 1)), _toConsumableArray(row.$v_hideNodes), _toConsumableArray(list.slice(index + 1))));
        }
        return;
      }

      // ??????????????????????????????
      this.$set(row, '$v_loading', true);
      this.load && this.load(row, resolve.bind(this));
      function resolve(data) {
        if (Array.isArray(!data)) data = [];
        this.$set(row, '$v_loading', false);
        this.$set(row, '$v_loaded', true);
        this.$set(row, '$v_hasChildren', !!data.length);
        data.forEach(function (item) {
          item.$level = typeof row.$level === 'number' ? row.$level + 1 : 2;
        });
        // ?????????????????????????????????????????????
        var list = this.virtualScroll.data;
        var index = list.findIndex(function (item) {
          return item === row;
        });
        if (index > -1) {
          this.virtualScroll.updateData([].concat(_toConsumableArray(list.slice(0, index + 1)), _toConsumableArray(data), _toConsumableArray(list.slice(index + 1))));
        }
      }
    },
    // ???????????????
    hideChildNodes: function hideChildNodes(row) {
      var list = this.virtualScroll.data;
      var index = list.findIndex(function (item) {
        return item === row;
      });
      if (index === -1) return;

      // ???????????????????????????????????????
      var hideNodes = [];
      for (var i = index + 1; i < list.length; i++) {
        var curRow = list[i];
        if ((curRow.$level || 1) <= (row.$level || 1)) break;
        hideNodes.push(curRow);
      }
      this.$set(row, '$v_hideNodes', hideNodes);
      // ????????????????????????
      var newList = list.filter(function (item) {
        return !hideNodes.includes(item);
      });
      this.virtualScroll.updateData(newList);
      this.virtualScroll.update();
    }
  },
  created: function created() {
    this.$set = function (data, key, value) {
      data[key] = value;
    };
    this.virtualScroll.addColumn(this);
    var type = this.$attrs.type;
    if (['index', 'selection', 'radio', 'tree'].includes(type)) {
      this.type = 'v-' + type;
    } else {
      this.type = type;
    }
    if (type === 'tree') {
      this.isTree = true;
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.virtualScroll.removeColumn(this);
  }
};

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("el-table-column", _vm._b({
    attrs: {
      "class-name": _vm.isTree ? "el-table__row--level" : ""
    },
    scopedSlots: _vm._u([{
      key: "header",
      fn: function fn(scope) {
        return [_vm._t("header", function () {
          return [scope.column.type === "v-selection" ? _c("el-checkbox", {
            attrs: {
              indeterminate: _vm.isCheckedImn
            },
            on: {
              change: _vm.onCheckAllRows
            },
            model: {
              value: _vm.isCheckedAll,
              callback: function callback($$v) {
                _vm.isCheckedAll = $$v;
              },
              expression: "isCheckedAll"
            }
          }) : [_vm._v("\n        " + _vm._s(scope.column.label) + "\n      ")]];
        }, null, scope)];
      }
    }, {
      key: "default",
      fn: function fn(scope) {
        return [scope.column && scope.column.type === "v-tree" ? [_c("span", {
          staticClass: "el-table__indent",
          style: {
            paddingLeft: (scope.row.$level - 1) * _vm.indent + "px"
          }
        }), _vm._v(" "), scope.row.$v_hasChildren !== false ? _c("div", {
          staticClass: "el-table__expand-icon",
          "class": scope.row.$v_expanded ? "el-table__expand-icon--expanded" : "",
          on: {
            click: function click($event) {
              return _vm.onTreeNodeExpand(scope.row);
            }
          }
        }, [scope.row.$v_loading ? _c("i", {
          staticClass: "el-icon is-loading"
        }, [_c("svg", {
          attrs: {
            viewBox: "0 0 1024 1024",
            xmlns: "http://www.w3.org/2000/svg"
          }
        }, [_c("path", {
          attrs: {
            fill: "currentColor",
            d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
          }
        })])]) : _c("i", {
          staticClass: "el-icon"
        }, [_c("svg", {
          attrs: {
            viewBox: "0 0 1024 1024",
            xmlns: "http://www.w3.org/2000/svg"
          }
        }, [_c("path", {
          attrs: {
            fill: "currentColor",
            d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
          }
        })])])]) : _c("span", {
          staticClass: "el-table__placeholder"
        })] : _vm._e(), _vm._v(" "), _vm._t("default", function () {
          return [scope.column.type === "v-selection" ? _c("el-checkbox", {
            attrs: {
              "model-value": scope.row.$v_checked
            },
            on: {
              change: function change($event) {
                return _vm.onCheckRow(scope.row, !scope.row.$v_checked);
              }
            }
          }) : _vm._e(), _vm._v(" "), scope.column.type === "v-radio" ? _c("el-radio", {
            attrs: {
              label: true,
              "model-value": _vm.virtualScroll.curRow === scope.row
            },
            on: {
              change: function change($event) {
                return _vm.onRadioChange(scope.row);
              }
            }
          }, [_c("span")]) : scope.column.type === "v-index" ? _c("span", [_vm._v("\n        " + _vm._s(_vm.getIndex(scope)) + "\n      ")]) : [_vm._v("\n        " + _vm._s(scope.row[scope.column.property]) + "\n      ")]];
        }, null, scope)];
      }
    }], null, true)
  }, "el-table-column", Object.assign({}, _vm.$attrs, {
    type: _vm.type
  }), false));
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

/* style */
var __vue_inject_styles__ = undefined;
/* scoped */
var __vue_scope_id__ = "data-v-294de13d";
/* module identifier */
var __vue_module_identifier__ = undefined;
/* functional template */
var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

export { __vue_component__ as VirtualColumn, __vue_component__$1 as VirtualScroll, __vue_component__$1 as default };
