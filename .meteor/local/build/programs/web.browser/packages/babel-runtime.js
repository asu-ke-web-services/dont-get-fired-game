//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var process = Package.meteor.process;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;

/* Package-scope variables */
var babelHelpers;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/babel-runtime/babel-runtime.js                                                                 //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
var hasOwn = Object.prototype.hasOwnProperty;                                                              // 1
                                                                                                           // 2
function canDefineNonEnumerableProperties() {                                                              // 3
  var testObj = {};                                                                                        // 4
  var testPropName = "t";                                                                                  // 5
                                                                                                           // 6
  try {                                                                                                    // 7
    Object.defineProperty(testObj, testPropName, {                                                         // 8
      enumerable: false,                                                                                   // 9
      value: testObj                                                                                       // 10
    });                                                                                                    // 11
                                                                                                           // 12
    for (var k in testObj) {                                                                               // 13
      if (k === testPropName) {                                                                            // 14
        return false;                                                                                      // 15
      }                                                                                                    // 16
    }                                                                                                      // 17
  } catch (e) {                                                                                            // 18
    return false;                                                                                          // 19
  }                                                                                                        // 20
                                                                                                           // 21
  return testObj[testPropName] === testObj;                                                                // 22
}                                                                                                          // 23
                                                                                                           // 24
// The name `babelHelpers` is hard-coded in Babel.  Otherwise we would make it                             // 25
// something capitalized and more descriptive, like `BabelRuntime`.                                        // 26
babelHelpers = {                                                                                           // 27
  // Meteor-specific runtime helper for wrapping the object of for-in                                      // 28
  // loops, so that inherited Array methods defined by es5-shim can be                                     // 29
  // ignored in browsers where they cannot be defined as non-enumerable.                                   // 30
  sanitizeForInObject: canDefineNonEnumerableProperties()                                                  // 31
    ? function (value) { return value; }                                                                   // 32
    : function (obj) {                                                                                     // 33
      if (Array.isArray(obj)) {                                                                            // 34
        var newObj = {};                                                                                   // 35
        var keys = Object.keys(obj);                                                                       // 36
        var keyCount = keys.length;                                                                        // 37
        for (var i = 0; i < keyCount; ++i) {                                                               // 38
          var key = keys[i];                                                                               // 39
          newObj[key] = obj[key];                                                                          // 40
        }                                                                                                  // 41
        return newObj;                                                                                     // 42
      }                                                                                                    // 43
                                                                                                           // 44
      return obj;                                                                                          // 45
    },                                                                                                     // 46
                                                                                                           // 47
  // es6.templateLiterals                                                                                  // 48
  // Constructs the object passed to the tag function in a tagged                                          // 49
  // template literal.                                                                                     // 50
  taggedTemplateLiteralLoose: function (strings, raw) {                                                    // 51
    // Babel's own version of this calls Object.freeze on `strings` and                                    // 52
    // `strings.raw`, but it doesn't seem worth the compatibility and                                      // 53
    // performance concerns.  If you're writing code against this helper,                                  // 54
    // don't add properties to these objects.                                                              // 55
    strings.raw = raw;                                                                                     // 56
    return strings;                                                                                        // 57
  },                                                                                                       // 58
                                                                                                           // 59
  // es6.classes                                                                                           // 60
  // Checks that a class constructor is being called with `new`, and throws                                // 61
  // an error if it is not.                                                                                // 62
  classCallCheck: function (instance, Constructor) {                                                       // 63
    if (!(instance instanceof Constructor)) {                                                              // 64
      throw new TypeError("Cannot call a class as a function");                                            // 65
    }                                                                                                      // 66
  },                                                                                                       // 67
                                                                                                           // 68
  // es6.classes                                                                                           // 69
  inherits: function (subClass, superClass) {                                                              // 70
    if (typeof superClass !== "function" && superClass !== null) {                                         // 71
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }                                                                                                      // 73
                                                                                                           // 74
    if (superClass) {                                                                                      // 75
      if (Object.create) {                                                                                 // 76
        // All but IE 8                                                                                    // 77
        subClass.prototype = Object.create(superClass.prototype, {                                         // 78
          constructor: {                                                                                   // 79
            value: subClass,                                                                               // 80
            enumerable: false,                                                                             // 81
            writable: true,                                                                                // 82
            configurable: true                                                                             // 83
          }                                                                                                // 84
        });                                                                                                // 85
      } else {                                                                                             // 86
        // IE 8 path.  Slightly worse for modern browsers, because `constructor`                           // 87
        // is enumerable and shows up in the inspector unnecessarily.                                      // 88
        // It's not an "own" property of any instance though.                                              // 89
        //                                                                                                 // 90
        // For correctness when writing code,                                                              // 91
        // don't enumerate all the own-and-inherited properties of an instance                             // 92
        // of a class and expect not to find `constructor` (but who does that?).                           // 93
        var F = function () {                                                                              // 94
          this.constructor = subClass;                                                                     // 95
        };                                                                                                 // 96
        F.prototype = superClass.prototype;                                                                // 97
        subClass.prototype = new F();                                                                      // 98
      }                                                                                                    // 99
                                                                                                           // 100
      // For modern browsers, this would be `subClass.__proto__ = superClass`,                             // 101
      // but IE <=10 don't support `__proto__`, and in this case the difference                            // 102
      // would be detectable; code that works in modern browsers could easily                              // 103
      // fail on IE 8 if we ever used the `__proto__` trick.                                               // 104
      //                                                                                                   // 105
      // There's no perfect way to make static methods inherited if they are                               // 106
      // assigned after declaration of the classes.  The best we can do is                                 // 107
      // to copy them.  In other words, when you write `class Foo                                          // 108
      // extends Bar`, we copy the static methods from Bar onto Foo, but future                            // 109
      // ones are not copied.                                                                              // 110
      //                                                                                                   // 111
      // For correctness when writing code, don't add static methods to a class                            // 112
      // after you subclass it.                                                                            // 113
                                                                                                           // 114
      // The ecmascript-runtime package provides adequate polyfills for                                    // 115
      // all of these Object.* functions (and Array#forEach), and anyone                                   // 116
      // using babel-runtime is almost certainly using it because of the                                   // 117
      // ecmascript package, which also implies ecmascript-runtime.                                        // 118
      Object.getOwnPropertyNames(superClass).forEach(function (k) {                                        // 119
        // This property descriptor dance preserves getter/setter behavior                                 // 120
        // in browsers that support accessor properties (all except                                        // 121
        // IE8). In IE8, the superClass can't have accessor properties                                     // 122
        // anyway, so this code is still safe.                                                             // 123
        var descriptor = Object.getOwnPropertyDescriptor(superClass, k);                                   // 124
        if (descriptor && typeof descriptor === "object") {                                                // 125
          if (Object.getOwnPropertyDescriptor(subClass, k)) {                                              // 126
            // If subClass already has a property by this name, then it                                    // 127
            // would not be inherited, so it should not be copied. This                                    // 128
            // notably excludes properties like .prototype and .name.                                      // 129
            return;                                                                                        // 130
          }                                                                                                // 131
                                                                                                           // 132
          Object.defineProperty(subClass, k, descriptor);                                                  // 133
        }                                                                                                  // 134
      });                                                                                                  // 135
    }                                                                                                      // 136
  },                                                                                                       // 137
                                                                                                           // 138
  createClass: (function () {                                                                              // 139
    var hasDefineProperty = false;                                                                         // 140
    try {                                                                                                  // 141
      // IE 8 has a broken Object.defineProperty, so feature-test by                                       // 142
      // trying to call it.                                                                                // 143
      Object.defineProperty({}, 'x', {});                                                                  // 144
      hasDefineProperty = true;                                                                            // 145
    } catch (e) {}                                                                                         // 146
                                                                                                           // 147
    function defineProperties(target, props) {                                                             // 148
      for (var i = 0; i < props.length; i++) {                                                             // 149
        var descriptor = props[i];                                                                         // 150
        descriptor.enumerable = descriptor.enumerable || false;                                            // 151
        descriptor.configurable = true;                                                                    // 152
        if ("value" in descriptor) descriptor.writable = true;                                             // 153
        Object.defineProperty(target, descriptor.key, descriptor);                                         // 154
      }                                                                                                    // 155
    }                                                                                                      // 156
                                                                                                           // 157
    return function (Constructor, protoProps, staticProps) {                                               // 158
      if (! hasDefineProperty) {                                                                           // 159
        // e.g. `class Foo { get bar() {} }`.  If you try to use getters and                               // 160
        // setters in IE 8, you will get a big nasty error, with or without                                // 161
        // Babel.  I don't know of any other syntax features besides getters                               // 162
        // and setters that will trigger this error.                                                       // 163
        throw new Error(                                                                                   // 164
          "Your browser does not support this type of class property.  " +                                 // 165
            "For example, Internet Explorer 8 does not support getters and " +                             // 166
            "setters.");                                                                                   // 167
      }                                                                                                    // 168
                                                                                                           // 169
      if (protoProps) defineProperties(Constructor.prototype, protoProps);                                 // 170
      if (staticProps) defineProperties(Constructor, staticProps);                                         // 171
      return Constructor;                                                                                  // 172
    };                                                                                                     // 173
  })(),                                                                                                    // 174
                                                                                                           // 175
  interopRequireDefault: function (obj) {                                                                  // 176
    return obj && obj.__esModule ? obj : { 'default': obj };                                               // 177
  },                                                                                                       // 178
                                                                                                           // 179
  // es7.objectRestSpread and react (JSX)                                                                  // 180
  _extends: Object.assign || (function (target) {                                                          // 181
    for (var i = 1; i < arguments.length; i++) {                                                           // 182
      var source = arguments[i];                                                                           // 183
      for (var key in source) {                                                                            // 184
        if (hasOwn.call(source, key)) {                                                                    // 185
          target[key] = source[key];                                                                       // 186
        }                                                                                                  // 187
      }                                                                                                    // 188
    }                                                                                                      // 189
    return target;                                                                                         // 190
  }),                                                                                                      // 191
                                                                                                           // 192
  // es6.destructuring                                                                                     // 193
  objectWithoutProperties: function (obj, keys) {                                                          // 194
    var target = {};                                                                                       // 195
    outer: for (var i in obj) {                                                                            // 196
      if (! hasOwn.call(obj, i)) continue;                                                                 // 197
      for (var j = 0; j < keys.length; j++) {                                                              // 198
        if (keys[j] === i) continue outer;                                                                 // 199
      }                                                                                                    // 200
      target[i] = obj[i];                                                                                  // 201
    }                                                                                                      // 202
    return target;                                                                                         // 203
  },                                                                                                       // 204
                                                                                                           // 205
  // es6.destructuring                                                                                     // 206
  objectDestructuringEmpty: function (obj) {                                                               // 207
    if (obj == null) throw new TypeError("Cannot destructure undefined");                                  // 208
  },                                                                                                       // 209
                                                                                                           // 210
  // es6.spread                                                                                            // 211
  bind: Function.prototype.bind || (function () {                                                          // 212
    var isCallable = function (value) { return typeof value === 'function'; };                             // 213
    var $Object = Object;                                                                                  // 214
    var to_string = Object.prototype.toString;                                                             // 215
    var array_slice = Array.prototype.slice;                                                               // 216
    var array_concat = Array.prototype.concat;                                                             // 217
    var array_push = Array.prototype.push;                                                                 // 218
    var max = Math.max;                                                                                    // 219
    var Empty = function Empty() {};                                                                       // 220
                                                                                                           // 221
    // Copied from es5-shim.js (3ac7942).  See original for more comments.                                 // 222
    return function bind(that) {                                                                           // 223
      var target = this;                                                                                   // 224
      if (!isCallable(target)) {                                                                           // 225
        throw new TypeError('Function.prototype.bind called on incompatible ' + target);                   // 226
      }                                                                                                    // 227
                                                                                                           // 228
      var args = array_slice.call(arguments, 1);                                                           // 229
                                                                                                           // 230
      var bound;                                                                                           // 231
      var binder = function () {                                                                           // 232
                                                                                                           // 233
        if (this instanceof bound) {                                                                       // 234
          var result = target.apply(                                                                       // 235
            this,                                                                                          // 236
            array_concat.call(args, array_slice.call(arguments))                                           // 237
          );                                                                                               // 238
          if ($Object(result) === result) {                                                                // 239
            return result;                                                                                 // 240
          }                                                                                                // 241
          return this;                                                                                     // 242
        } else {                                                                                           // 243
          return target.apply(                                                                             // 244
            that,                                                                                          // 245
            array_concat.call(args, array_slice.call(arguments))                                           // 246
          );                                                                                               // 247
        }                                                                                                  // 248
      };                                                                                                   // 249
                                                                                                           // 250
      var boundLength = max(0, target.length - args.length);                                               // 251
                                                                                                           // 252
      var boundArgs = [];                                                                                  // 253
      for (var i = 0; i < boundLength; i++) {                                                              // 254
        array_push.call(boundArgs, '$' + i);                                                               // 255
      }                                                                                                    // 256
                                                                                                           // 257
      // Create a Function from source code so that it has the right `.length`.                            // 258
      // Probably not important for Babel.  This code violates CSPs that ban                               // 259
      // `eval`, but the browsers that need this polyfill don't have CSP!                                  // 260
      bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);
                                                                                                           // 262
      if (target.prototype) {                                                                              // 263
        Empty.prototype = target.prototype;                                                                // 264
        bound.prototype = new Empty();                                                                     // 265
        Empty.prototype = null;                                                                            // 266
      }                                                                                                    // 267
                                                                                                           // 268
      return bound;                                                                                        // 269
    };                                                                                                     // 270
                                                                                                           // 271
  })(),                                                                                                    // 272
                                                                                                           // 273
  slice: Array.prototype.slice                                                                             // 274
};                                                                                                         // 275
                                                                                                           // 276
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['babel-runtime'] = {}, {
  babelHelpers: babelHelpers
});

})();
