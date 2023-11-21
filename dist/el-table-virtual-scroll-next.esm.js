import { openBlock, createElementBlock, normalizeClass, renderSlot, resolveComponent, createBlock, mergeProps, withCtx, normalizeProps, guardReactiveProps, createCommentVNode, Fragment, createTextVNode, toDisplayString, createElementVNode, normalizeStyle } from 'vue';

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
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
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
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

// 判断是否是滚动容器
function isScroller(el) {
  var style = window.getComputedStyle(el, null);
  var scrollValues = ['auto', 'scroll'];
  return scrollValues.includes(style.overflow) || scrollValues.includes(style['overflow-y']);
}

// 获取容器滚动位置
function getScrollTop(el) {
  return el === window ? window.pageYOffset : el.scrollTop;
}

// 获取容器滚动位置
function getScrollLeft(el) {
  return el === window ? window.pageXOffset : el.scrollLeft;
}

// 设置容器滚动位置
function setScrollTop(el, pos) {
  return el === window ? window.scroll(window.pageXOffset, pos) : el.scrollTop = pos;
}

// 设置容器滚动位置
function setScrollLeft(el, pos) {
  return el === window ? window.scroll(pos, window.pageYOffset) : el.scrollLeft = pos;
}

// 获取容器高度
function getOffsetHeight(el) {
  return el === window ? window.innerHeight : el.offsetHeight;
}

// 滚动到某个位置
function scrollToY(el, y) {
  if (el === window) {
    window.scroll(0, y);
  } else {
    el.scrollTop = y;
  }
}

// 是否为空 undefine or null
function isEmpty(val) {
  return typeof val === 'undefined' || val === null;
}

// 表格body class名称
var TableBodyClassNames = ['.el-table__body-wrapper .el-scrollbar__view'];
var checkOrder = 0; // 多选：记录多选选项改变的顺序

var script$1 = {
  inheritAttrs: false,
  name: 'el-table-virtual-scroll',
  props: {
    // 总数据
    data: {
      type: Array,
      required: true
    },
    // 每一行的预估高度
    itemSize: {
      type: Number,
      "default": 60
    },
    // 指定滚动容器
    scrollBox: {
      type: String
    },
    // 顶部和底部缓冲区域，值越大显示表格的行数越多
    buffer: {
      type: Number,
      "default": 200
    },
    // key值，data数据中的唯一id
    keyProp: {
      type: String,
      "default": 'id'
    },
    // 滚动事件的节流时间
    throttleTime: {
      type: Number,
      "default": 10
    },
    // 是否获取表格行动态高度
    dynamic: {
      type: Boolean,
      "default": true
    },
    // 是否开启虚拟滚动
    virtualized: {
      type: Boolean,
      "default": true
    },
    // 表格行合并时，合并在一起的行返回相同的key值
    rowSpanKey: {
      type: Function
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
      // 尺寸映射（依赖响应式）
      start: 0,
      end: undefined,
      curRow: null,
      // 表格单选：选中的行
      isExpanding: false,
      // 列是否正在展开
      columnVms: [],
      // virtual-column 组件实例
      isHideAppend: false,
      stopAmin: false // 是否停止row过渡动画
    };
  },

  computed: {
    // 计算出每个item（的key值）到滚动容器顶部的距离
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
    }
  },
  methods: {
    // 初始化数据
    initData: function initData() {
      var _this = this;
      // 可视范围内显示数据
      this.renderData = [];
      // 页面可视范围顶端、底部
      this.top = undefined;
      this.bottom = undefined;
      // 截取页面可视范围内显示数据的开始和结尾索引
      this.start = 0;
      this.end = undefined;
      // 设置表格到滚动容器的距离
      this.toTop = 0;
      // 组件是否deactivated状态
      this.isDeactivated = false;
      // 滚动容器滚动位置【0-滚动容器top；1-滚动容器left；2-表格滚动容器top；3-表格滚动容器left】
      this.scrollPos = [0, 0, 0, 0];
      this.scroller = this.getScroller();
      this.setToTop();
      this.recordTablePos();

      // 初次执行
      setTimeout(function () {
        _this.handleScroll();
      }, 100);

      // 监听事件
      this.onScroll = !this.throttleTime ? this.handleScroll : throttle_1(this.handleScroll, this.throttleTime);
      this.scroller.addEventListener('scroll', this.onScroll, {
        passive: true
      });
      window.addEventListener('resize', this.onScroll);
    },
    // 获取滚动元素
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
    // 设置表格到滚动容器的距离
    setToTop: function setToTop() {
      if (this.innerScroll) {
        this.toTop = 0;
      } else {
        this.toTop = this.$el.getBoundingClientRect().top - (this.scroller === window ? 0 : this.scroller.getBoundingClientRect().top) + getScrollTop(this.scroller);
      }
    },
    // 处理滚动事件
    handleScroll: function handleScroll() {
      var _this2 = this;
      var shouldUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.stopAmin = true;
      this.$nextTick(function () {
        _this2.stopAmin = false;
      });

      // 如果组件失活，则不再执行handleScroll；否则外部容器滚动情况下记录的scrollTop会是0
      if (this.isDeactivated) return;
      // 记录scrollPos
      this.scrollPos[0] = getScrollTop(this.scroller);
      this.scrollPos[1] = getScrollLeft(this.scroller);
      if (!this.virtualized) return;

      // 更新当前尺寸（高度）
      this.updateSizes();
      // 计算renderData
      this.calcRenderData();
      // 计算位置
      this.calcPosition();
      shouldUpdate && this.updatePosition();
      // 触发事件
      this.$emit('change', this.renderData, this.start, this.end);
    },
    // 更新尺寸（高度）
    updateSizes: function updateSizes() {
      var _this3 = this;
      if (!this.dynamic) return;
      var rows = this.$el.querySelectorAll('.el-table__body > tbody > .el-table__row');

      // 处理树形表格
      var isTree = false;
      if (rows[0] && rows[0].classList.contains('el-table__row--level-0')) {
        isTree = true;
        rows = this.$el.querySelectorAll('.el-table__body > tbody > .el-table__row.el-table__row--level-0');
      }
      Array.from(rows).forEach(function (row, index) {
        var item = _this3.renderData[index];
        if (!item) return;

        // 计算表格行的高度
        var offsetHeight = row.offsetHeight;
        // 表格行如果有扩展行，需要加上扩展内容的高度
        var next = row.nextSibling;
        if (next.tagName === 'TR' && next.querySelector('.el-table__expanded-cell')) {
          offsetHeight += next.offsetHeight;
        }
        // 表格行如果有子孙节点，需要加上子孙节点的高度
        if (isTree) {
          var _next = row.nextSibling;
          while (_next && _next.tagName === 'TR' && !_next.classList.contains('el-table__row--level-0')) {
            offsetHeight += _next.offsetHeight;
            _next = _next.nextSibling;
          }
        }
        var key = item[_this3.keyProp];
        if (_this3.sizes[key] !== offsetHeight) {
          _this3.sizes[key] = offsetHeight;
        }
      });
    },
    // 获取某条数据offsetTop
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
    // 获取某条数据的尺寸
    getItemSize: function getItemSize(index) {
      if (index <= -1) return 0;
      var item = this.data[index];
      if (item) {
        var key = item[this.keyProp];
        return this.sizes[key] || this.itemSize;
      }
      return this.itemSize;
    },
    // 计算只在视图上渲染的数据
    calcRenderData: function calcRenderData() {
      var scroller = this.scroller,
        data = this.data,
        buffer = this.buffer;
      // 计算可视范围顶部、底部
      var top = this.scrollPos[0] - buffer - this.toTop;
      var bottom = this.scrollPos[0] + getOffsetHeight(scroller) + buffer - this.toTop;
      var start;
      var end;
      if (!this.dynamic) {
        start = top <= 0 ? 0 : Math.floor(top / this.itemSize);
        end = bottom <= 0 ? 0 : Math.ceil(bottom / this.itemSize);
      } else {
        // 二分法计算可视范围内的开始的第一个内容
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

        // 计算渲染内容的开始、结束索引
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
      if (this.isRowSpan()) {
        // 计算包含合并行的开始结束区间（⚠️注意：合并行不支持使用斑马纹，因为不能100%确定合并行的开始行是偶数，可能会向上找一直到第一行，导致渲染非常多行，浪费性能）
        var _this$calcRenderSpanD = this.calcRenderSpanData(start, end);
        var _this$calcRenderSpanD2 = _slicedToArray(_this$calcRenderSpanD, 2);
        start = _this$calcRenderSpanD2[0];
        end = _this$calcRenderSpanD2[1];
      } else {
        // 开始索引始终保持偶数，如果为奇数，则加1使其保持偶数【确保表格行的偶数数一致，不会导致斑马纹乱序显示】
        if (start % 2) start = start - 1;
      }
      this.top = top;
      this.bottom = bottom;
      this.start = start;
      this.end = end;
      this.renderData = data.slice(start, end + 1);
    },
    // 如果存在合并行的情况，渲染的数据范围扩大到包含合并行
    calcRenderSpanData: function calcRenderSpanData(start, end) {
      // 从开始节点向上查找是否有合并行
      var prevKey;
      while (start > 0) {
        var curRow = this.data[start];
        var curkey = this.rowSpanKey(curRow, start);
        // 如果不存在key，说明当前行不属于合并行
        if (isEmpty(curkey)) break;

        // 如果当前行与后面一行的key不相同，说明则当前行不属于合并行，从后一行开始截断
        if (!isEmpty(prevKey) && prevKey !== curkey) {
          start++;
          break;
        }
        prevKey = curkey;
        start--;
      }

      // 从末端节点向下查找是否有合并行
      var len = this.data.length;
      prevKey = undefined;
      while (end < len) {
        var _curRow = this.data[end];
        var _curkey = this.rowSpanKey(_curRow, end);
        // 如果不存在key，说明当前行不属于合并行
        if (!_curkey) break;

        // 如果当前行与前面一行的key不相同，说明则当前行不属于合并行，从前一行开始截断
        if (prevKey && prevKey !== _curkey) {
          end--;
          break;
        }
        prevKey = _curkey;
        end++;
      }
      return [start, end];
    },
    // 是否是合并行
    isRowSpan: function isRowSpan() {
      return typeof this.rowSpanKey === 'function';
    },
    // 计算位置
    calcPosition: function calcPosition() {
      var _this4 = this;
      var last = this.data.length - 1;
      // 计算内容总高度
      var wrapHeight = this.getItemOffsetTop(last) + this.getItemSize(last);
      // 计算当前滚动位置需要撑起的高度
      var offsetTop = this.getItemOffsetTop(this.start);

      // 设置dom位置
      TableBodyClassNames.forEach(function (className) {
        var el = _this4.$el.querySelector(className);
        if (!el) return;

        // 创建wrapEl、innerEl
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
          // 设置高度
          el.wrapEl.style.height = wrapHeight + 'px';
          // 设置transform撑起高度
          el.innerEl.style.transform = "translateY(".concat(offsetTop, "px)");
          // 设置paddingTop撑起高度
          // el.innerEl.style.paddingTop = `${offsetTop}px`
        }
      });
    },
    // 空闲时更新位置（触发时间：滚动停止后等待10ms执行）
    // 滚动停止之后，偶尔表格的行发生高度变更，那么当前计算的渲染数据是不正确的；那么需要手动触发最后一次handleScroll来重新计算
    updatePosition: function updatePosition() {
      var _this5 = this;
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this5.timer && clearTimeout(_this5.timer);
        // 传入false，避免一直循环调用
        _this5.handleScroll(false);
      }, this.throttleTime + 10);
    },
    // 渲染全部数据
    renderAllData: function renderAllData() {
      var _this6 = this;
      this.renderData = this.data;
      this.$emit('change', this.data, 0, this.data.length - 1);
      this.$nextTick(function () {
        // 清除撑起的高度和位置
        TableBodyClassNames.forEach(function (className) {
          var el = _this6.$el.querySelector(className);
          if (!el) return;
          if (el.wrapEl) {
            // 设置高度
            el.wrapEl.style.height = 'auto';
            // 设置transform撑起高度
            el.innerEl.style.transform = "translateY(".concat(0, "px)");
          }
        });
      });
    },
    // 【外部调用】更新
    update: function update() {
      // console.log('update')
      this.setToTop();
      this.handleScroll();
    },
    // 【外部调用】滚动到第几行
    // （不太精确：滚动到第n行时，如果周围的表格行计算出真实高度后会更新高度，导致内容坍塌或撑起）
    scrollTo: function scrollTo(index) {
      var _this7 = this;
      var stop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var item = this.data[index];
      if (item && this.scroller) {
        this.updateSizes();
        this.calcRenderData();
        this.$nextTick(function () {
          var offsetTop = _this7.getItemOffsetTop(index);
          scrollToY(_this7.scroller, offsetTop);

          // 调用两次scrollTo，第一次滚动时，如果表格行初次渲染高度发生变化时，会导致滚动位置有偏差，此时需要第二次执行滚动，确保滚动位置无误
          if (!stop) {
            setTimeout(function () {
              _this7.scrollTo(index, true);
            }, 50);
          }
        });
      }
    },
    // 【外部调用】重置
    reset: function reset() {
      this.sizes = {};
      this.scrollTo(0, false);
    },
    // 添加virtual-column实例
    addColumn: function addColumn(vm) {
      this.columnVms.push(vm);
    },
    // 移除virtual-column实例
    removeColumn: function removeColumn(vm) {
      this.columnVms = this.columnVms.filter(function (item) {
        return item !== vm;
      });
    },
    // 多选：选中所有列
    checkAll: function checkAll(val) {
      var _this8 = this;
      this.data.forEach(function (row) {
        return _this8.checkRow(row, val, false);
      });
      this.emitSelectionChange();
      if (val === false) checkOrder = 0; // 取消全选，则重置checkOrder
    },
    // 多选：选中某一列
    checkRow: function checkRow(row, val) {
      var emit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (row.$v_checked === val) return;
      row.$v_checked = val;
      row.$v_checkedOrder = val ? checkOrder++ : undefined;
      emit && this.emitSelectionChange();
    },
    // 多选：兼容表格selection-change事件
    emitSelectionChange: function emitSelectionChange() {
      var selection = this.data.filter(function (row) {
        return row.$v_checked;
      }).sort(function (a, b) {
        return a.$v_checkedOrder - b.$v_checkedOrder;
      });
      this.$emit('selection-change', selection);
    },
    // 多选：兼容表格clearSelection方法
    clearSelection: function clearSelection() {
      this.checkAll(false);
      this.columnVms.forEach(function (vm) {
        return vm.syncCheckStatus();
      });
    },
    // 多选：兼容表格toggleRowSelection方法
    toggleRowSelection: function toggleRowSelection(row, selected) {
      var val = typeof selected === 'boolean' ? selected : !row.$v_checked;
      this.checkRow(row, val);
      this.columnVms.forEach(function (vm) {
        return vm.syncCheckStatus();
      });
    },
    // 单选：设置选中行
    setCurrentRow: function setCurrentRow(row) {
      this.curRow = row;
      this.$emit('current-change', row);
    },
    // 更新数据
    updateData: function updateData(data) {
      this.$emit('update:data', data);
    },
    // 执行update方法更新虚拟滚动，且每次nextTick只能执行一次【在数据大于100条开启虚拟滚动时，由于监听了data、virtualized会连续触发两次update方法：第一次update时，（updateSize）计算尺寸里的渲染数据（renderData）与表格行的dom是一一对应，之后会改变渲染数据（renderData）的值；而第二次执行update时，renderData改变了，而表格行dom未改变，导致renderData与dom不一一对应，从而位置计算错误，最终渲染的数据对应不上。因此使用每次nextTick只能执行一次来避免bug发生】
    doUpdate: function doUpdate() {
      var _this9 = this;
      if (this.hasDoUpdate) return; // nextTick内已经执行过一次就不执行
      if (!this.scroller) return; // scroller不存在说明未初始化完成，不执行

      // 启动虚拟滚动的瞬间，需要暂时隐藏el-table__append-wrapper里的内容，不然会导致滚动位置一直到append的内容处
      this.isHideAppend = true;
      this.update();
      this.hasDoUpdate = true;
      this.$nextTick(function () {
        _this9.hasDoUpdate = false;
        _this9.isHideAppend = false;
      });
    },
    // 记录表格x、y轴滚动位置
    recordTablePos: function recordTablePos() {
      var _this10 = this;
      if (this.innerScroll || this.isDeactivated) return;
      this.tableBodyEl = this.$el.querySelector('.el-table__body-wrapper');
      this.onTableScroll = throttle_1(function () {
        _this10.scrollPos[2] = getScrollTop(_this10.tableBodyEl);
        _this10.scrollPos[3] = getScrollLeft(_this10.tableBodyEl);
      }, 100);
      this.tableBodyEl.addEventListener('scroll', this.onTableScroll, {
        passive: true
      });
    },
    // 恢复y轴滚动位置（仅支持表格内部滚动）
    restoreScrollY: function restoreScrollY() {
      var _this11 = this;
      if (!this.scroller) return;

      // 恢复滚动容器滚动位置
      var _this$scrollPos = _slicedToArray(this.scrollPos, 4),
        top = _this$scrollPos[0],
        left = _this$scrollPos[1],
        top2 = _this$scrollPos[2],
        left2 = _this$scrollPos[3];
      if (this.innerScroll) {
        // 表格内部滚动需要等待一段时间才执行恢复滚动位置，是因为表格需要等待一段时间才设置滚动容器高度，此时设置scrollTop才会生效
        setTimeout(function () {
          setScrollTop(_this11.scroller, top);
          setScrollLeft(_this11.scroller, left);
          // 内部滚动且固定列，则固定列也需要恢复y轴滚动位置
          var leftScroller = document.querySelector(TableBodyClassNames[1]);
          var rightScroller = document.querySelector(TableBodyClassNames[2]);
          if (leftScroller) setScrollTop(leftScroller, top);
          if (rightScroller) setScrollTop(rightScroller, top);
        }, 50);
      } else {
        setScrollTop(this.scroller, top);
        setScrollLeft(this.scroller, left);
        // 恢复表格内滚动位置
        setScrollTop(this.tableBodyEl, top2);
        setScrollLeft(this.tableBodyEl, left2);
      }
    }
  },
  watch: {
    data: function data() {
      if (!this.virtualized) {
        this.renderAllData();
      } else {
        this.doUpdate();
      }
    },
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
    var _this12 = this;
    this.$nextTick(function () {
      _this12.initData();
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

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    "class": normalizeClass(["el-table-virtual-scroll", [$data.isHideAppend ? 'hide-append' : '', $data.stopAmin ? 'no-row-amin' : '']])
  }, [renderSlot(_ctx.$slots, "default")], 2 /* CLASS */);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".hide-append[data-v-6ee4cd4b] [data-v-6ee4cd4b] .el-table__append-wrapper {\n  display: none;\n}\n.no-row-amin[data-v-6ee4cd4b] [data-v-6ee4cd4b] .hover-row td.el-table__cell {\n  background: inherit !important;\n}\n";
styleInject(css_248z);

script$1.render = render$1;
script$1.__scopeId = "data-v-6ee4cd4b";
script$1.__file = "src/el-table-virtual-scroll.vue";

// import {
//   ElTableColumn,
//   ElCheckbox,
//   ElRadio
// } from 'element-plus'

var script = {
  inheritAttrs: false,
  name: 'el-table-virtual-column',
  components: {
    // ElTableColumn,
    // ElCheckbox,
    // ElRadio
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
      // 全选
      isCheckedImn: false,
      // 控制半选样式
      isTree: false,
      type: undefined
    };
  },
  methods: {
    // 选择表格所有行
    onCheckAllRows: function onCheckAllRows(val) {
      val = this.isCheckedImn ? true : val;
      this.virtualScroll.checkAll(val);
      this.isCheckedAll = val;
      this.isCheckedImn = false;
    },
    // 选择表格某行
    onCheckRow: function onCheckRow(row, val) {
      this.virtualScroll.checkRow(row, val);
      this.syncCheckStatus();
    },
    // 同步全选、半选框状态
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
    // 获取索引值
    getIndex: function getIndex(scope) {
      var index = this.virtualScroll.start + scope.$index;
      if (typeof this.$attrs.index === 'function') {
        return this.$attrs.index(index);
      }
      return index + 1;
    },
    // 展开收起事件
    onTreeNodeExpand: function onTreeNodeExpand(row) {
      this.$set(row, '$v_expanded', !row.$v_expanded);
      if (row.$v_expanded) {
        this.loadChildNodes(row);
      } else {
        this.hideChildNodes(row);
      }
    },
    // 加载子节点
    loadChildNodes: function loadChildNodes(row) {
      // 如果已经加载，则显示隐藏的字节点
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

      // 获取子节点数据并显示
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
        // 所有子节点插入到当前同级节点下
        var list = this.virtualScroll.data;
        var index = list.findIndex(function (item) {
          return item === row;
        });
        if (index > -1) {
          this.virtualScroll.updateData([].concat(_toConsumableArray(list.slice(0, index + 1)), _toConsumableArray(data), _toConsumableArray(list.slice(index + 1))));
        }
      }
    },
    // 隐藏子节点
    hideChildNodes: function hideChildNodes(row) {
      var list = this.virtualScroll.data;
      var index = list.findIndex(function (item) {
        return item === row;
      });
      if (index === -1) return;

      // 查找当前节点的所有子孙节点
      var hideNodes = [];
      for (var i = index + 1; i < list.length; i++) {
        var curRow = list[i];
        if ((curRow.$level || 1) <= (row.$level || 1)) break;
        hideNodes.push(curRow);
      }
      this.$set(row, '$v_hideNodes', hideNodes);
      // 隐藏所有子孙节点
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

var _hoisted_1 = ["onClick"];
var _hoisted_2 = {
  key: 0,
  "class": "el-icon is-loading"
};
var _hoisted_3 = /*#__PURE__*/createElementVNode("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [/*#__PURE__*/createElementVNode("path", {
  fill: "currentColor",
  d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
})], -1 /* HOISTED */);
var _hoisted_4 = [_hoisted_3];
var _hoisted_5 = {
  key: 1,
  "class": "el-icon"
};
var _hoisted_6 = /*#__PURE__*/createElementVNode("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [/*#__PURE__*/createElementVNode("path", {
  fill: "currentColor",
  d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
})], -1 /* HOISTED */);
var _hoisted_7 = [_hoisted_6];
var _hoisted_8 = {
  key: 1,
  "class": "el-table__placeholder"
};
var _hoisted_9 = /*#__PURE__*/createElementVNode("span", null, null, -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_el_checkbox = resolveComponent("el-checkbox");
  var _component_el_radio = resolveComponent("el-radio");
  var _component_el_table_column = resolveComponent("el-table-column");
  return openBlock(), createBlock(_component_el_table_column, mergeProps(_objectSpread2(_objectSpread2({}, _ctx.$attrs), {}, {
    type: $data.type
  }), {
    "class-name": $data.isTree ? 'el-table__row--level' : ''
  }), {
    header: withCtx(function (scope) {
      return [renderSlot(_ctx.$slots, "header", normalizeProps(guardReactiveProps(scope)), function () {
        return [createCommentVNode(" 多选类型-全选 "), scope.column.type === 'v-selection' ? (openBlock(), createBlock(_component_el_checkbox, {
          key: 0,
          modelValue: $data.isCheckedAll,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
            return $data.isCheckedAll = $event;
          }),
          indeterminate: $data.isCheckedImn,
          onChange: $options.onCheckAllRows
        }, null, 8 /* PROPS */, ["modelValue", "indeterminate", "onChange"])) : (openBlock(), createElementBlock(Fragment, {
          key: 1
        }, [createTextVNode(toDisplayString(scope.column.label), 1 /* TEXT */)], 64 /* STABLE_FRAGMENT */))];
      })];
    }),

    "default": withCtx(function (scope) {
      return [createCommentVNode(" v-tree类型 "), scope.column && scope.column.type === 'v-tree' ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [createElementVNode("span", {
        "class": "el-table__indent",
        style: normalizeStyle({
          paddingLeft: "".concat((scope.row.$level - 1) * $props.indent, "px")
        })
      }, null, 4 /* STYLE */), scope.row.$v_hasChildren !== false ? (openBlock(), createElementBlock("div", {
        key: 0,
        "class": normalizeClass(["el-table__expand-icon", scope.row.$v_expanded ? 'el-table__expand-icon--expanded' : '']),
        onClick: function onClick($event) {
          return $options.onTreeNodeExpand(scope.row);
        }
      }, [scope.row.$v_loading ? (openBlock(), createElementBlock("i", _hoisted_2, [].concat(_hoisted_4))) : (openBlock(), createElementBlock("i", _hoisted_5, [].concat(_hoisted_7)))], 10 /* CLASS, PROPS */, _hoisted_1)) : (openBlock(), createElementBlock("span", _hoisted_8))], 64 /* STABLE_FRAGMENT */)) : createCommentVNode("v-if", true), renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(scope)), function () {
        return [createCommentVNode(" 多选类型 "), scope.column.type === 'v-selection' ? (openBlock(), createBlock(_component_el_checkbox, {
          key: 0,
          "model-value": scope.row.$v_checked,
          onChange: function onChange($event) {
            return $options.onCheckRow(scope.row, !scope.row.$v_checked);
          }
        }, null, 8 /* PROPS */, ["model-value", "onChange"])) : createCommentVNode("v-if", true), createCommentVNode(" 单选类型 "), scope.column.type === 'v-radio' ? (openBlock(), createBlock(_component_el_radio, {
          key: 1,
          label: true,
          "model-value": $options.virtualScroll.curRow === scope.row,
          onChange: function onChange($event) {
            return $options.onRadioChange(scope.row);
          }
        }, {
          "default": withCtx(function () {
            return [_hoisted_9];
          }),
          _: 2 /* DYNAMIC */
        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["model-value", "onChange"])) : scope.column.type === 'v-index' ? (openBlock(), createElementBlock(Fragment, {
          key: 2
        }, [createCommentVNode(" v-index类型 "), createElementVNode("span", null, toDisplayString($options.getIndex(scope)), 1 /* TEXT */)], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */)) : (openBlock(), createElementBlock(Fragment, {
          key: 3
        }, [createCommentVNode(" 支持嵌套 "), renderSlot(_ctx.$slots, "default", {}, function () {
          return [createTextVNode(toDisplayString(scope.row[scope.column.property]), 1 /* TEXT */)];
        })], 64 /* STABLE_FRAGMENT */))];
      })];
    }),

    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */, ["class-name"]);
}

script.render = render;
script.__file = "src/el-table-virtual-column.vue";

export { script as VirtualColumn, script$1 as VirtualScroll, script$1 as default };
