(function () {

/* Package-scope variables */
var Date, parseInt, originalStringReplace;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/es5-shim/import_globals.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var global = this;                                                                                                     // 1
                                                                                                                       // 2
// Because the es5-{shim,sham}.js code assigns to Date and parseInt,                                                   // 3
// Meteor treats them as package variables, and so declares them as                                                    // 4
// variables in package scope, which causes some references to Date and                                                // 5
// parseInt in the shim/sham code to refer to those undefined package                                                  // 6
// variables. The simplest solution seems to be to initialize the package                                              // 7
// variables to their appropriate global values.                                                                       // 8
Date = global.Date;                                                                                                    // 9
parseInt = global.parseInt;                                                                                            // 10
                                                                                                                       // 11
// Save the original String#replace method, because es5-shim's                                                         // 12
// reimplementation of it causes problems in markdown/showdown.js.                                                     // 13
// This original method will be restored in export_globals.js.                                                         // 14
originalStringReplace = String.prototype.replace;                                                                      // 15
                                                                                                                       // 16
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/es5-shim/.npm/package/node_modules/es5-shim/es5-shim.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*!                                                                                                                    // 1
 * https://github.com/es-shims/es5-shim                                                                                // 2
 * @license es5-shim Copyright 2009-2015 by contributors, MIT License                                                  // 3
 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE                                                        // 4
 */                                                                                                                    // 5
                                                                                                                       // 6
// vim: ts=4 sts=4 sw=4 expandtab                                                                                      // 7
                                                                                                                       // 8
// Add semicolon to prevent IIFE from being passed as argument to concatenated code.                                   // 9
;                                                                                                                      // 10
                                                                                                                       // 11
// UMD (Universal Module Definition)                                                                                   // 12
// see https://github.com/umdjs/umd/blob/master/returnExports.js                                                       // 13
(function (root, factory) {                                                                                            // 14
    'use strict';                                                                                                      // 15
                                                                                                                       // 16
    /* global define, exports, module */                                                                               // 17
    if (typeof define === 'function' && define.amd) {                                                                  // 18
        // AMD. Register as an anonymous module.                                                                       // 19
        define(factory);                                                                                               // 20
    } else if (typeof exports === 'object') {                                                                          // 21
        // Node. Does not work with strict CommonJS, but                                                               // 22
        // only CommonJS-like enviroments that support module.exports,                                                 // 23
        // like Node.                                                                                                  // 24
        module.exports = factory();                                                                                    // 25
    } else {                                                                                                           // 26
        // Browser globals (root is window)                                                                            // 27
        root.returnExports = factory();                                                                                // 28
    }                                                                                                                  // 29
}(this, function () {                                                                                                  // 30
                                                                                                                       // 31
/**                                                                                                                    // 32
 * Brings an environment as close to ECMAScript 5 compliance                                                           // 33
 * as is possible with the facilities of erstwhile engines.                                                            // 34
 *                                                                                                                     // 35
 * Annotated ES5: http://es5.github.com/ (specific links below)                                                        // 36
 * ES5 Spec: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf                                 // 37
 * Required reading: http://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/                    // 38
 */                                                                                                                    // 39
                                                                                                                       // 40
// Shortcut to an often accessed properties, in order to avoid multiple                                                // 41
// dereference that costs universally. This also holds a reference to known-good                                       // 42
// functions.                                                                                                          // 43
var $Array = Array;                                                                                                    // 44
var ArrayPrototype = $Array.prototype;                                                                                 // 45
var $Object = Object;                                                                                                  // 46
var ObjectPrototype = $Object.prototype;                                                                               // 47
var FunctionPrototype = Function.prototype;                                                                            // 48
var $String = String;                                                                                                  // 49
var StringPrototype = $String.prototype;                                                                               // 50
var $Number = Number;                                                                                                  // 51
var NumberPrototype = $Number.prototype;                                                                               // 52
var array_slice = ArrayPrototype.slice;                                                                                // 53
var array_splice = ArrayPrototype.splice;                                                                              // 54
var array_push = ArrayPrototype.push;                                                                                  // 55
var array_unshift = ArrayPrototype.unshift;                                                                            // 56
var array_concat = ArrayPrototype.concat;                                                                              // 57
var call = FunctionPrototype.call;                                                                                     // 58
var max = Math.max;                                                                                                    // 59
var min = Math.min;                                                                                                    // 60
                                                                                                                       // 61
// Having a toString local variable name breaks in Opera so use to_string.                                             // 62
var to_string = ObjectPrototype.toString;                                                                              // 63
                                                                                                                       // 64
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';                           // 65
var isCallable; /* inlined from https://npmjs.com/is-callable */ var fnToStr = Function.prototype.toString, tryFunctionObject = function tryFunctionObject(value) { try { fnToStr.call(value); return true; } catch (e) { return false; } }, fnClass = '[object Function]', genClass = '[object GeneratorFunction]'; isCallable = function isCallable(value) { if (typeof value !== 'function') { return false; } if (hasToStringTag) { return tryFunctionObject(value); } var strClass = to_string.call(value); return strClass === fnClass || strClass === genClass; };
var isRegex; /* inlined from https://npmjs.com/is-regex */ var regexExec = RegExp.prototype.exec, tryRegexExec = function tryRegexExec(value) { try { regexExec.call(value); return true; } catch (e) { return false; } }, regexClass = '[object RegExp]'; isRegex = function isRegex(value) { if (typeof value !== 'object') { return false; } return hasToStringTag ? tryRegexExec(value) : to_string.call(value) === regexClass; };
var isString; /* inlined from https://npmjs.com/is-string */ var strValue = String.prototype.valueOf, tryStringObject = function tryStringObject(value) { try { strValue.call(value); return true; } catch (e) { return false; } }, stringClass = '[object String]'; isString = function isString(value) { if (typeof value === 'string') { return true; } if (typeof value !== 'object') { return false; } return hasToStringTag ? tryStringObject(value) : to_string.call(value) === stringClass; };
                                                                                                                       // 69
/* inlined from http://npmjs.com/define-properties */                                                                  // 70
var defineProperties = (function (has) {                                                                               // 71
  var supportsDescriptors = $Object.defineProperty && (function () {                                                   // 72
      try {                                                                                                            // 73
          var obj = {};                                                                                                // 74
          $Object.defineProperty(obj, 'x', { enumerable: false, value: obj });                                         // 75
          for (var _ in obj) { return false; }                                                                         // 76
          return obj.x === obj;                                                                                        // 77
      } catch (e) { /* this is ES3 */                                                                                  // 78
          return false;                                                                                                // 79
      }                                                                                                                // 80
  }());                                                                                                                // 81
                                                                                                                       // 82
  // Define configurable, writable and non-enumerable props                                                            // 83
  // if they don't exist.                                                                                              // 84
  var defineProperty;                                                                                                  // 85
  if (supportsDescriptors) {                                                                                           // 86
      defineProperty = function (object, name, method, forceAssign) {                                                  // 87
          if (!forceAssign && (name in object)) { return; }                                                            // 88
          $Object.defineProperty(object, name, {                                                                       // 89
              configurable: true,                                                                                      // 90
              enumerable: false,                                                                                       // 91
              writable: true,                                                                                          // 92
              value: method                                                                                            // 93
          });                                                                                                          // 94
      };                                                                                                               // 95
  } else {                                                                                                             // 96
      defineProperty = function (object, name, method, forceAssign) {                                                  // 97
          if (!forceAssign && (name in object)) { return; }                                                            // 98
          object[name] = method;                                                                                       // 99
      };                                                                                                               // 100
  }                                                                                                                    // 101
  return function defineProperties(object, map, forceAssign) {                                                         // 102
      for (var name in map) {                                                                                          // 103
          if (has.call(map, name)) {                                                                                   // 104
            defineProperty(object, name, map[name], forceAssign);                                                      // 105
          }                                                                                                            // 106
      }                                                                                                                // 107
  };                                                                                                                   // 108
}(ObjectPrototype.hasOwnProperty));                                                                                    // 109
                                                                                                                       // 110
//                                                                                                                     // 111
// Util                                                                                                                // 112
// ======                                                                                                              // 113
//                                                                                                                     // 114
                                                                                                                       // 115
/* replaceable with https://npmjs.com/package/es-abstract /helpers/isPrimitive */                                      // 116
var isPrimitive = function isPrimitive(input) {                                                                        // 117
    var type = typeof input;                                                                                           // 118
    return input === null || (type !== 'object' && type !== 'function');                                               // 119
};                                                                                                                     // 120
                                                                                                                       // 121
var isActualNaN = $Number.isNaN || function (x) { return x !== x; };                                                   // 122
                                                                                                                       // 123
var ES = {                                                                                                             // 124
    // ES5 9.4                                                                                                         // 125
    // http://es5.github.com/#x9.4                                                                                     // 126
    // http://jsperf.com/to-integer                                                                                    // 127
    /* replaceable with https://npmjs.com/package/es-abstract ES5.ToInteger */                                         // 128
    ToInteger: function ToInteger(num) {                                                                               // 129
        var n = +num;                                                                                                  // 130
        if (isActualNaN(n)) {                                                                                          // 131
            n = 0;                                                                                                     // 132
        } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {                                                       // 133
            n = (n > 0 || -1) * Math.floor(Math.abs(n));                                                               // 134
        }                                                                                                              // 135
        return n;                                                                                                      // 136
    },                                                                                                                 // 137
                                                                                                                       // 138
    /* replaceable with https://npmjs.com/package/es-abstract ES5.ToPrimitive */                                       // 139
    ToPrimitive: function ToPrimitive(input) {                                                                         // 140
        var val, valueOf, toStr;                                                                                       // 141
        if (isPrimitive(input)) {                                                                                      // 142
            return input;                                                                                              // 143
        }                                                                                                              // 144
        valueOf = input.valueOf;                                                                                       // 145
        if (isCallable(valueOf)) {                                                                                     // 146
            val = valueOf.call(input);                                                                                 // 147
            if (isPrimitive(val)) {                                                                                    // 148
                return val;                                                                                            // 149
            }                                                                                                          // 150
        }                                                                                                              // 151
        toStr = input.toString;                                                                                        // 152
        if (isCallable(toStr)) {                                                                                       // 153
            val = toStr.call(input);                                                                                   // 154
            if (isPrimitive(val)) {                                                                                    // 155
                return val;                                                                                            // 156
            }                                                                                                          // 157
        }                                                                                                              // 158
        throw new TypeError();                                                                                         // 159
    },                                                                                                                 // 160
                                                                                                                       // 161
    // ES5 9.9                                                                                                         // 162
    // http://es5.github.com/#x9.9                                                                                     // 163
    /* replaceable with https://npmjs.com/package/es-abstract ES5.ToObject */                                          // 164
    ToObject: function (o) {                                                                                           // 165
        /* jshint eqnull: true */                                                                                      // 166
        if (o == null) { // this matches both null and undefined                                                       // 167
            throw new TypeError("can't convert " + o + ' to object');                                                  // 168
        }                                                                                                              // 169
        return $Object(o);                                                                                             // 170
    },                                                                                                                 // 171
                                                                                                                       // 172
    /* replaceable with https://npmjs.com/package/es-abstract ES5.ToUint32 */                                          // 173
    ToUint32: function ToUint32(x) {                                                                                   // 174
        return x >>> 0;                                                                                                // 175
    }                                                                                                                  // 176
};                                                                                                                     // 177
                                                                                                                       // 178
//                                                                                                                     // 179
// Function                                                                                                            // 180
// ========                                                                                                            // 181
//                                                                                                                     // 182
                                                                                                                       // 183
// ES-5 15.3.4.5                                                                                                       // 184
// http://es5.github.com/#x15.3.4.5                                                                                    // 185
                                                                                                                       // 186
var Empty = function Empty() {};                                                                                       // 187
                                                                                                                       // 188
defineProperties(FunctionPrototype, {                                                                                  // 189
    bind: function bind(that) { // .length is 1                                                                        // 190
        // 1. Let Target be the this value.                                                                            // 191
        var target = this;                                                                                             // 192
        // 2. If IsCallable(Target) is false, throw a TypeError exception.                                             // 193
        if (!isCallable(target)) {                                                                                     // 194
            throw new TypeError('Function.prototype.bind called on incompatible ' + target);                           // 195
        }                                                                                                              // 196
        // 3. Let A be a new (possibly empty) internal list of all of the                                              // 197
        //   argument values provided after thisArg (arg1, arg2 etc), in order.                                        // 198
        // XXX slicedArgs will stand in for "A" if used                                                                // 199
        var args = array_slice.call(arguments, 1); // for normal call                                                  // 200
        // 4. Let F be a new native ECMAScript object.                                                                 // 201
        // 11. Set the [[Prototype]] internal property of F to the standard                                            // 202
        //   built-in Function prototype object as specified in 15.3.3.1.                                              // 203
        // 12. Set the [[Call]] internal property of F as described in                                                 // 204
        //   15.3.4.5.1.                                                                                               // 205
        // 13. Set the [[Construct]] internal property of F as described in                                            // 206
        //   15.3.4.5.2.                                                                                               // 207
        // 14. Set the [[HasInstance]] internal property of F as described in                                          // 208
        //   15.3.4.5.3.                                                                                               // 209
        var bound;                                                                                                     // 210
        var binder = function () {                                                                                     // 211
                                                                                                                       // 212
            if (this instanceof bound) {                                                                               // 213
                // 15.3.4.5.2 [[Construct]]                                                                            // 214
                // When the [[Construct]] internal method of a function object,                                        // 215
                // F that was created using the bind function is called with a                                         // 216
                // list of arguments ExtraArgs, the following steps are taken:                                         // 217
                // 1. Let target be the value of F's [[TargetFunction]]                                                // 218
                //   internal property.                                                                                // 219
                // 2. If target has no [[Construct]] internal method, a                                                // 220
                //   TypeError exception is thrown.                                                                    // 221
                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal                                         // 222
                //   property.                                                                                         // 223
                // 4. Let args be a new list containing the same values as the                                         // 224
                //   list boundArgs in the same order followed by the same                                             // 225
                //   values as the list ExtraArgs in the same order.                                                   // 226
                // 5. Return the result of calling the [[Construct]] internal                                          // 227
                //   method of target providing args as the arguments.                                                 // 228
                                                                                                                       // 229
                var result = target.apply(                                                                             // 230
                    this,                                                                                              // 231
                    array_concat.call(args, array_slice.call(arguments))                                               // 232
                );                                                                                                     // 233
                if ($Object(result) === result) {                                                                      // 234
                    return result;                                                                                     // 235
                }                                                                                                      // 236
                return this;                                                                                           // 237
                                                                                                                       // 238
            } else {                                                                                                   // 239
                // 15.3.4.5.1 [[Call]]                                                                                 // 240
                // When the [[Call]] internal method of a function object, F,                                          // 241
                // which was created using the bind function is called with a                                          // 242
                // this value and a list of arguments ExtraArgs, the following                                         // 243
                // steps are taken:                                                                                    // 244
                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal                                         // 245
                //   property.                                                                                         // 246
                // 2. Let boundThis be the value of F's [[BoundThis]] internal                                         // 247
                //   property.                                                                                         // 248
                // 3. Let target be the value of F's [[TargetFunction]] internal                                       // 249
                //   property.                                                                                         // 250
                // 4. Let args be a new list containing the same values as the                                         // 251
                //   list boundArgs in the same order followed by the same                                             // 252
                //   values as the list ExtraArgs in the same order.                                                   // 253
                // 5. Return the result of calling the [[Call]] internal method                                        // 254
                //   of target providing boundThis as the this value and                                               // 255
                //   providing args as the arguments.                                                                  // 256
                                                                                                                       // 257
                // equiv: target.call(this, ...boundArgs, ...args)                                                     // 258
                return target.apply(                                                                                   // 259
                    that,                                                                                              // 260
                    array_concat.call(args, array_slice.call(arguments))                                               // 261
                );                                                                                                     // 262
                                                                                                                       // 263
            }                                                                                                          // 264
                                                                                                                       // 265
        };                                                                                                             // 266
                                                                                                                       // 267
        // 15. If the [[Class]] internal property of Target is "Function", then                                        // 268
        //     a. Let L be the length property of Target minus the length of A.                                        // 269
        //     b. Set the length own property of F to either 0 or L, whichever is                                      // 270
        //       larger.                                                                                               // 271
        // 16. Else set the length own property of F to 0.                                                             // 272
                                                                                                                       // 273
        var boundLength = max(0, target.length - args.length);                                                         // 274
                                                                                                                       // 275
        // 17. Set the attributes of the length own property of F to the values                                        // 276
        //   specified in 15.3.5.1.                                                                                    // 277
        var boundArgs = [];                                                                                            // 278
        for (var i = 0; i < boundLength; i++) {                                                                        // 279
            array_push.call(boundArgs, '$' + i);                                                                       // 280
        }                                                                                                              // 281
                                                                                                                       // 282
        // XXX Build a dynamic function with desired amount of arguments is the only                                   // 283
        // way to set the length property of a function.                                                               // 284
        // In environments where Content Security Policies enabled (Chrome extensions,                                 // 285
        // for ex.) all use of eval or Function costructor throws an exception.                                        // 286
        // However in all of these environments Function.prototype.bind exists                                         // 287
        // and so this code will never be executed.                                                                    // 288
        bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);
                                                                                                                       // 290
        if (target.prototype) {                                                                                        // 291
            Empty.prototype = target.prototype;                                                                        // 292
            bound.prototype = new Empty();                                                                             // 293
            // Clean up dangling references.                                                                           // 294
            Empty.prototype = null;                                                                                    // 295
        }                                                                                                              // 296
                                                                                                                       // 297
        // TODO                                                                                                        // 298
        // 18. Set the [[Extensible]] internal property of F to true.                                                  // 299
                                                                                                                       // 300
        // TODO                                                                                                        // 301
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).                                         // 302
        // 20. Call the [[DefineOwnProperty]] internal method of F with                                                // 303
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:                                        // 304
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and                                             // 305
        //   false.                                                                                                    // 306
        // 21. Call the [[DefineOwnProperty]] internal method of F with                                                // 307
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,                                              // 308
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},                                        // 309
        //   and false.                                                                                                // 310
                                                                                                                       // 311
        // TODO                                                                                                        // 312
        // NOTE Function objects created using Function.prototype.bind do not                                          // 313
        // have a prototype property or the [[Code]], [[FormalParameters]], and                                        // 314
        // [[Scope]] internal properties.                                                                              // 315
        // XXX can't delete prototype in pure-js.                                                                      // 316
                                                                                                                       // 317
        // 22. Return F.                                                                                               // 318
        return bound;                                                                                                  // 319
    }                                                                                                                  // 320
});                                                                                                                    // 321
                                                                                                                       // 322
// _Please note: Shortcuts are defined after `Function.prototype.bind` as we                                           // 323
// us it in defining shortcuts.                                                                                        // 324
var owns = call.bind(ObjectPrototype.hasOwnProperty);                                                                  // 325
var toStr = call.bind(ObjectPrototype.toString);                                                                       // 326
var strSlice = call.bind(StringPrototype.slice);                                                                       // 327
var strSplit = call.bind(StringPrototype.split);                                                                       // 328
var strIndexOf = call.bind(StringPrototype.indexOf);                                                                   // 329
var push = call.bind(array_push);                                                                                      // 330
                                                                                                                       // 331
//                                                                                                                     // 332
// Array                                                                                                               // 333
// =====                                                                                                               // 334
//                                                                                                                     // 335
                                                                                                                       // 336
var isArray = $Array.isArray || function isArray(obj) {                                                                // 337
    return toStr(obj) === '[object Array]';                                                                            // 338
};                                                                                                                     // 339
                                                                                                                       // 340
// ES5 15.4.4.12                                                                                                       // 341
// http://es5.github.com/#x15.4.4.13                                                                                   // 342
// Return len+argCount.                                                                                                // 343
// [bugfix, ielt8]                                                                                                     // 344
// IE < 8 bug: [].unshift(0) === undefined but should be "1"                                                           // 345
var hasUnshiftReturnValueBug = [].unshift(0) !== 1;                                                                    // 346
defineProperties(ArrayPrototype, {                                                                                     // 347
    unshift: function () {                                                                                             // 348
        array_unshift.apply(this, arguments);                                                                          // 349
        return this.length;                                                                                            // 350
    }                                                                                                                  // 351
}, hasUnshiftReturnValueBug);                                                                                          // 352
                                                                                                                       // 353
// ES5 15.4.3.2                                                                                                        // 354
// http://es5.github.com/#x15.4.3.2                                                                                    // 355
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray                                  // 356
defineProperties($Array, { isArray: isArray });                                                                        // 357
                                                                                                                       // 358
// The IsCallable() check in the Array functions                                                                       // 359
// has been replaced with a strict check on the                                                                        // 360
// internal class of the object to trap cases where                                                                    // 361
// the provided function was actually a regular                                                                        // 362
// expression literal, which in V8 and                                                                                 // 363
// JavaScriptCore is a typeof "function".  Only in                                                                     // 364
// V8 are regular expression literals permitted as                                                                     // 365
// reduce parameters, so it is desirable in the                                                                        // 366
// general case for the shim to match the more                                                                         // 367
// strict and common behavior of rejecting regular                                                                     // 368
// expressions.                                                                                                        // 369
                                                                                                                       // 370
// ES5 15.4.4.18                                                                                                       // 371
// http://es5.github.com/#x15.4.4.18                                                                                   // 372
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach                                  // 373
                                                                                                                       // 374
// Check failure of by-index access of string characters (IE < 9)                                                      // 375
// and failure of `0 in boxedString` (Rhino)                                                                           // 376
var boxedString = $Object('a');                                                                                        // 377
var splitString = boxedString[0] !== 'a' || !(0 in boxedString);                                                       // 378
                                                                                                                       // 379
var properlyBoxesContext = function properlyBoxed(method) {                                                            // 380
    // Check node 0.6.21 bug where third parameter is not boxed                                                        // 381
    var properlyBoxesNonStrict = true;                                                                                 // 382
    var properlyBoxesStrict = true;                                                                                    // 383
    if (method) {                                                                                                      // 384
        method.call('foo', function (_, __, context) {                                                                 // 385
            if (typeof context !== 'object') { properlyBoxesNonStrict = false; }                                       // 386
        });                                                                                                            // 387
                                                                                                                       // 388
        method.call([1], function () {                                                                                 // 389
            'use strict';                                                                                              // 390
                                                                                                                       // 391
            properlyBoxesStrict = typeof this === 'string';                                                            // 392
        }, 'x');                                                                                                       // 393
    }                                                                                                                  // 394
    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;                                                  // 395
};                                                                                                                     // 396
                                                                                                                       // 397
defineProperties(ArrayPrototype, {                                                                                     // 398
    forEach: function forEach(callbackfn/*, thisArg*/) {                                                               // 399
        var object = ES.ToObject(this);                                                                                // 400
        var self = splitString && isString(this) ? strSplit(this, '') : object;                                        // 401
        var i = -1;                                                                                                    // 402
        var length = ES.ToUint32(self.length);                                                                         // 403
        var T;                                                                                                         // 404
        if (arguments.length > 1) {                                                                                    // 405
          T = arguments[1];                                                                                            // 406
        }                                                                                                              // 407
                                                                                                                       // 408
        // If no callback function or if callback is not a callable function                                           // 409
        if (!isCallable(callbackfn)) {                                                                                 // 410
            throw new TypeError('Array.prototype.forEach callback must be a function');                                // 411
        }                                                                                                              // 412
                                                                                                                       // 413
        while (++i < length) {                                                                                         // 414
            if (i in self) {                                                                                           // 415
                // Invoke the callback function with call, passing arguments:                                          // 416
                // context, property value, property key, thisArg object                                               // 417
                if (typeof T === 'undefined') {                                                                        // 418
                    callbackfn(self[i], i, object);                                                                    // 419
                } else {                                                                                               // 420
                    callbackfn.call(T, self[i], i, object);                                                            // 421
                }                                                                                                      // 422
            }                                                                                                          // 423
        }                                                                                                              // 424
    }                                                                                                                  // 425
}, !properlyBoxesContext(ArrayPrototype.forEach));                                                                     // 426
                                                                                                                       // 427
// ES5 15.4.4.19                                                                                                       // 428
// http://es5.github.com/#x15.4.4.19                                                                                   // 429
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map                                    // 430
defineProperties(ArrayPrototype, {                                                                                     // 431
    map: function map(callbackfn/*, thisArg*/) {                                                                       // 432
        var object = ES.ToObject(this);                                                                                // 433
        var self = splitString && isString(this) ? strSplit(this, '') : object;                                        // 434
        var length = ES.ToUint32(self.length);                                                                         // 435
        var result = $Array(length);                                                                                   // 436
        var T;                                                                                                         // 437
        if (arguments.length > 1) {                                                                                    // 438
            T = arguments[1];                                                                                          // 439
        }                                                                                                              // 440
                                                                                                                       // 441
        // If no callback function or if callback is not a callable function                                           // 442
        if (!isCallable(callbackfn)) {                                                                                 // 443
            throw new TypeError('Array.prototype.map callback must be a function');                                    // 444
        }                                                                                                              // 445
                                                                                                                       // 446
        for (var i = 0; i < length; i++) {                                                                             // 447
            if (i in self) {                                                                                           // 448
                if (typeof T === 'undefined') {                                                                        // 449
                    result[i] = callbackfn(self[i], i, object);                                                        // 450
                } else {                                                                                               // 451
                    result[i] = callbackfn.call(T, self[i], i, object);                                                // 452
                }                                                                                                      // 453
            }                                                                                                          // 454
        }                                                                                                              // 455
        return result;                                                                                                 // 456
    }                                                                                                                  // 457
}, !properlyBoxesContext(ArrayPrototype.map));                                                                         // 458
                                                                                                                       // 459
// ES5 15.4.4.20                                                                                                       // 460
// http://es5.github.com/#x15.4.4.20                                                                                   // 461
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter                                 // 462
defineProperties(ArrayPrototype, {                                                                                     // 463
    filter: function filter(callbackfn/*, thisArg*/) {                                                                 // 464
        var object = ES.ToObject(this);                                                                                // 465
        var self = splitString && isString(this) ? strSplit(this, '') : object;                                        // 466
        var length = ES.ToUint32(self.length);                                                                         // 467
        var result = [];                                                                                               // 468
        var value;                                                                                                     // 469
        var T;                                                                                                         // 470
        if (arguments.length > 1) {                                                                                    // 471
            T = arguments[1];                                                                                          // 472
        }                                                                                                              // 473
                                                                                                                       // 474
        // If no callback function or if callback is not a callable function                                           // 475
        if (!isCallable(callbackfn)) {                                                                                 // 476
            throw new TypeError('Array.prototype.filter callback must be a function');                                 // 477
        }                                                                                                              // 478
                                                                                                                       // 479
        for (var i = 0; i < length; i++) {                                                                             // 480
            if (i in self) {                                                                                           // 481
                value = self[i];                                                                                       // 482
                if (typeof T === 'undefined' ? callbackfn(value, i, object) : callbackfn.call(T, value, i, object)) {  // 483
                    push(result, value);                                                                               // 484
                }                                                                                                      // 485
            }                                                                                                          // 486
        }                                                                                                              // 487
        return result;                                                                                                 // 488
    }                                                                                                                  // 489
}, !properlyBoxesContext(ArrayPrototype.filter));                                                                      // 490
                                                                                                                       // 491
// ES5 15.4.4.16                                                                                                       // 492
// http://es5.github.com/#x15.4.4.16                                                                                   // 493
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every                                    // 494
defineProperties(ArrayPrototype, {                                                                                     // 495
    every: function every(callbackfn/*, thisArg*/) {                                                                   // 496
        var object = ES.ToObject(this);                                                                                // 497
        var self = splitString && isString(this) ? strSplit(this, '') : object;                                        // 498
        var length = ES.ToUint32(self.length);                                                                         // 499
        var T;                                                                                                         // 500
        if (arguments.length > 1) {                                                                                    // 501
            T = arguments[1];                                                                                          // 502
        }                                                                                                              // 503
                                                                                                                       // 504
        // If no callback function or if callback is not a callable function                                           // 505
        if (!isCallable(callbackfn)) {                                                                                 // 506
            throw new TypeError('Array.prototype.every callback must be a function');                                  // 507
        }                                                                                                              // 508
                                                                                                                       // 509
        for (var i = 0; i < length; i++) {                                                                             // 510
            if (i in self && !(typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
                return false;                                                                                          // 512
            }                                                                                                          // 513
        }                                                                                                              // 514
        return true;                                                                                                   // 515
    }                                                                                                                  // 516
}, !properlyBoxesContext(ArrayPrototype.every));                                                                       // 517
                                                                                                                       // 518
// ES5 15.4.4.17                                                                                                       // 519
// http://es5.github.com/#x15.4.4.17                                                                                   // 520
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some                                     // 521
defineProperties(ArrayPrototype, {                                                                                     // 522
    some: function some(callbackfn/*, thisArg */) {                                                                    // 523
        var object = ES.ToObject(this);                                                                                // 524
        var self = splitString && isString(this) ? strSplit(this, '') : object;                                        // 525
        var length = ES.ToUint32(self.length);                                                                         // 526
        var T;                                                                                                         // 527
        if (arguments.length > 1) {                                                                                    // 528
            T = arguments[1];                                                                                          // 529
        }                                                                                                              // 530
                                                                                                                       // 531
        // If no callback function or if callback is not a callable function                                           // 532
        if (!isCallable(callbackfn)) {                                                                                 // 533
            throw new TypeError('Array.prototype.some callback must be a function');                                   // 534
        }                                                                                                              // 535
                                                                                                                       // 536
        for (var i = 0; i < length; i++) {                                                                             // 537
            if (i in self && (typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
                return true;                                                                                           // 539
            }                                                                                                          // 540
        }                                                                                                              // 541
        return false;                                                                                                  // 542
    }                                                                                                                  // 543
}, !properlyBoxesContext(ArrayPrototype.some));                                                                        // 544
                                                                                                                       // 545
// ES5 15.4.4.21                                                                                                       // 546
// http://es5.github.com/#x15.4.4.21                                                                                   // 547
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce                                 // 548
var reduceCoercesToObject = false;                                                                                     // 549
if (ArrayPrototype.reduce) {                                                                                           // 550
    reduceCoercesToObject = typeof ArrayPrototype.reduce.call('es5', function (_, __, ___, list) { return list; }) === 'object';
}                                                                                                                      // 552
defineProperties(ArrayPrototype, {                                                                                     // 553
    reduce: function reduce(callbackfn/*, initialValue*/) {                                                            // 554
        var object = ES.ToObject(this);                                                                                // 555
        var self = splitString && isString(this) ? strSplit(this, '') : object;                                        // 556
        var length = ES.ToUint32(self.length);                                                                         // 557
                                                                                                                       // 558
        // If no callback function or if callback is not a callable function                                           // 559
        if (!isCallable(callbackfn)) {                                                                                 // 560
            throw new TypeError('Array.prototype.reduce callback must be a function');                                 // 561
        }                                                                                                              // 562
                                                                                                                       // 563
        // no value to return if no initial value and an empty array                                                   // 564
        if (length === 0 && arguments.length === 1) {                                                                  // 565
            throw new TypeError('reduce of empty array with no initial value');                                        // 566
        }                                                                                                              // 567
                                                                                                                       // 568
        var i = 0;                                                                                                     // 569
        var result;                                                                                                    // 570
        if (arguments.length >= 2) {                                                                                   // 571
            result = arguments[1];                                                                                     // 572
        } else {                                                                                                       // 573
            do {                                                                                                       // 574
                if (i in self) {                                                                                       // 575
                    result = self[i++];                                                                                // 576
                    break;                                                                                             // 577
                }                                                                                                      // 578
                                                                                                                       // 579
                // if array contains no values, no initial value to return                                             // 580
                if (++i >= length) {                                                                                   // 581
                    throw new TypeError('reduce of empty array with no initial value');                                // 582
                }                                                                                                      // 583
            } while (true);                                                                                            // 584
        }                                                                                                              // 585
                                                                                                                       // 586
        for (; i < length; i++) {                                                                                      // 587
            if (i in self) {                                                                                           // 588
                result = callbackfn(result, self[i], i, object);                                                       // 589
            }                                                                                                          // 590
        }                                                                                                              // 591
                                                                                                                       // 592
        return result;                                                                                                 // 593
    }                                                                                                                  // 594
}, !reduceCoercesToObject);                                                                                            // 595
                                                                                                                       // 596
// ES5 15.4.4.22                                                                                                       // 597
// http://es5.github.com/#x15.4.4.22                                                                                   // 598
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight                            // 599
var reduceRightCoercesToObject = false;                                                                                // 600
if (ArrayPrototype.reduceRight) {                                                                                      // 601
    reduceRightCoercesToObject = typeof ArrayPrototype.reduceRight.call('es5', function (_, __, ___, list) { return list; }) === 'object';
}                                                                                                                      // 603
defineProperties(ArrayPrototype, {                                                                                     // 604
    reduceRight: function reduceRight(callbackfn/*, initial*/) {                                                       // 605
        var object = ES.ToObject(this);                                                                                // 606
        var self = splitString && isString(this) ? strSplit(this, '') : object;                                        // 607
        var length = ES.ToUint32(self.length);                                                                         // 608
                                                                                                                       // 609
        // If no callback function or if callback is not a callable function                                           // 610
        if (!isCallable(callbackfn)) {                                                                                 // 611
            throw new TypeError('Array.prototype.reduceRight callback must be a function');                            // 612
        }                                                                                                              // 613
                                                                                                                       // 614
        // no value to return if no initial value, empty array                                                         // 615
        if (length === 0 && arguments.length === 1) {                                                                  // 616
            throw new TypeError('reduceRight of empty array with no initial value');                                   // 617
        }                                                                                                              // 618
                                                                                                                       // 619
        var result;                                                                                                    // 620
        var i = length - 1;                                                                                            // 621
        if (arguments.length >= 2) {                                                                                   // 622
            result = arguments[1];                                                                                     // 623
        } else {                                                                                                       // 624
            do {                                                                                                       // 625
                if (i in self) {                                                                                       // 626
                    result = self[i--];                                                                                // 627
                    break;                                                                                             // 628
                }                                                                                                      // 629
                                                                                                                       // 630
                // if array contains no values, no initial value to return                                             // 631
                if (--i < 0) {                                                                                         // 632
                    throw new TypeError('reduceRight of empty array with no initial value');                           // 633
                }                                                                                                      // 634
            } while (true);                                                                                            // 635
        }                                                                                                              // 636
                                                                                                                       // 637
        if (i < 0) {                                                                                                   // 638
            return result;                                                                                             // 639
        }                                                                                                              // 640
                                                                                                                       // 641
        do {                                                                                                           // 642
            if (i in self) {                                                                                           // 643
                result = callbackfn(result, self[i], i, object);                                                       // 644
            }                                                                                                          // 645
        } while (i--);                                                                                                 // 646
                                                                                                                       // 647
        return result;                                                                                                 // 648
    }                                                                                                                  // 649
}, !reduceRightCoercesToObject);                                                                                       // 650
                                                                                                                       // 651
// ES5 15.4.4.14                                                                                                       // 652
// http://es5.github.com/#x15.4.4.14                                                                                   // 653
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf                                  // 654
var hasFirefox2IndexOfBug = ArrayPrototype.indexOf && [0, 1].indexOf(1, 2) !== -1;                                     // 655
defineProperties(ArrayPrototype, {                                                                                     // 656
    indexOf: function indexOf(searchElement/*, fromIndex */) {                                                         // 657
        var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);                             // 658
        var length = ES.ToUint32(self.length);                                                                         // 659
                                                                                                                       // 660
        if (length === 0) {                                                                                            // 661
            return -1;                                                                                                 // 662
        }                                                                                                              // 663
                                                                                                                       // 664
        var i = 0;                                                                                                     // 665
        if (arguments.length > 1) {                                                                                    // 666
            i = ES.ToInteger(arguments[1]);                                                                            // 667
        }                                                                                                              // 668
                                                                                                                       // 669
        // handle negative indices                                                                                     // 670
        i = i >= 0 ? i : max(0, length + i);                                                                           // 671
        for (; i < length; i++) {                                                                                      // 672
            if (i in self && self[i] === searchElement) {                                                              // 673
                return i;                                                                                              // 674
            }                                                                                                          // 675
        }                                                                                                              // 676
        return -1;                                                                                                     // 677
    }                                                                                                                  // 678
}, hasFirefox2IndexOfBug);                                                                                             // 679
                                                                                                                       // 680
// ES5 15.4.4.15                                                                                                       // 681
// http://es5.github.com/#x15.4.4.15                                                                                   // 682
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf                              // 683
var hasFirefox2LastIndexOfBug = ArrayPrototype.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;                        // 684
defineProperties(ArrayPrototype, {                                                                                     // 685
    lastIndexOf: function lastIndexOf(searchElement/*, fromIndex */) {                                                 // 686
        var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);                             // 687
        var length = ES.ToUint32(self.length);                                                                         // 688
                                                                                                                       // 689
        if (length === 0) {                                                                                            // 690
            return -1;                                                                                                 // 691
        }                                                                                                              // 692
        var i = length - 1;                                                                                            // 693
        if (arguments.length > 1) {                                                                                    // 694
            i = min(i, ES.ToInteger(arguments[1]));                                                                    // 695
        }                                                                                                              // 696
        // handle negative indices                                                                                     // 697
        i = i >= 0 ? i : length - Math.abs(i);                                                                         // 698
        for (; i >= 0; i--) {                                                                                          // 699
            if (i in self && searchElement === self[i]) {                                                              // 700
                return i;                                                                                              // 701
            }                                                                                                          // 702
        }                                                                                                              // 703
        return -1;                                                                                                     // 704
    }                                                                                                                  // 705
}, hasFirefox2LastIndexOfBug);                                                                                         // 706
                                                                                                                       // 707
// ES5 15.4.4.12                                                                                                       // 708
// http://es5.github.com/#x15.4.4.12                                                                                   // 709
var spliceNoopReturnsEmptyArray = (function () {                                                                       // 710
    var a = [1, 2];                                                                                                    // 711
    var result = a.splice();                                                                                           // 712
    return a.length === 2 && isArray(result) && result.length === 0;                                                   // 713
}());                                                                                                                  // 714
defineProperties(ArrayPrototype, {                                                                                     // 715
    // Safari 5.0 bug where .splice() returns undefined                                                                // 716
    splice: function splice(start, deleteCount) {                                                                      // 717
        if (arguments.length === 0) {                                                                                  // 718
            return [];                                                                                                 // 719
        } else {                                                                                                       // 720
            return array_splice.apply(this, arguments);                                                                // 721
        }                                                                                                              // 722
    }                                                                                                                  // 723
}, !spliceNoopReturnsEmptyArray);                                                                                      // 724
                                                                                                                       // 725
var spliceWorksWithEmptyObject = (function () {                                                                        // 726
    var obj = {};                                                                                                      // 727
    ArrayPrototype.splice.call(obj, 0, 0, 1);                                                                          // 728
    return obj.length === 1;                                                                                           // 729
}());                                                                                                                  // 730
defineProperties(ArrayPrototype, {                                                                                     // 731
    splice: function splice(start, deleteCount) {                                                                      // 732
        if (arguments.length === 0) { return []; }                                                                     // 733
        var args = arguments;                                                                                          // 734
        this.length = max(ES.ToInteger(this.length), 0);                                                               // 735
        if (arguments.length > 0 && typeof deleteCount !== 'number') {                                                 // 736
            args = array_slice.call(arguments);                                                                        // 737
            if (args.length < 2) {                                                                                     // 738
                push(args, this.length - start);                                                                       // 739
            } else {                                                                                                   // 740
                args[1] = ES.ToInteger(deleteCount);                                                                   // 741
            }                                                                                                          // 742
        }                                                                                                              // 743
        return array_splice.apply(this, args);                                                                         // 744
    }                                                                                                                  // 745
}, !spliceWorksWithEmptyObject);                                                                                       // 746
var spliceWorksWithLargeSparseArrays = (function () {                                                                  // 747
    // Per https://github.com/es-shims/es5-shim/issues/295                                                             // 748
    // Safari 7/8 breaks with sparse arrays of size 1e5 or greater                                                     // 749
    var arr = new $Array(1e5);                                                                                         // 750
    // note: the index MUST be 8 or larger or the test will false pass                                                 // 751
    arr[8] = 'x';                                                                                                      // 752
    arr.splice(1, 1);                                                                                                  // 753
    // note: this test must be defined *after* the indexOf shim                                                        // 754
    // per https://github.com/es-shims/es5-shim/issues/313                                                             // 755
    return arr.indexOf('x') === 7;                                                                                     // 756
}());                                                                                                                  // 757
var spliceWorksWithSmallSparseArrays = (function () {                                                                  // 758
    // Per https://github.com/es-shims/es5-shim/issues/295                                                             // 759
    // Opera 12.15 breaks on this, no idea why.                                                                        // 760
    var n = 256;                                                                                                       // 761
    var arr = [];                                                                                                      // 762
    arr[n] = 'a';                                                                                                      // 763
    arr.splice(n + 1, 0, 'b');                                                                                         // 764
    return arr[n] === 'a';                                                                                             // 765
}());                                                                                                                  // 766
defineProperties(ArrayPrototype, {                                                                                     // 767
    splice: function splice(start, deleteCount) {                                                                      // 768
        var O = ES.ToObject(this);                                                                                     // 769
        var A = [];                                                                                                    // 770
        var len = ES.ToUint32(O.length);                                                                               // 771
        var relativeStart = ES.ToInteger(start);                                                                       // 772
        var actualStart = relativeStart < 0 ? max((len + relativeStart), 0) : min(relativeStart, len);                 // 773
        var actualDeleteCount = min(max(ES.ToInteger(deleteCount), 0), len - actualStart);                             // 774
                                                                                                                       // 775
        var k = 0;                                                                                                     // 776
        var from;                                                                                                      // 777
        while (k < actualDeleteCount) {                                                                                // 778
            from = $String(actualStart + k);                                                                           // 779
            if (owns(O, from)) {                                                                                       // 780
                A[k] = O[from];                                                                                        // 781
            }                                                                                                          // 782
            k += 1;                                                                                                    // 783
        }                                                                                                              // 784
                                                                                                                       // 785
        var items = array_slice.call(arguments, 2);                                                                    // 786
        var itemCount = items.length;                                                                                  // 787
        var to;                                                                                                        // 788
        if (itemCount < actualDeleteCount) {                                                                           // 789
            k = actualStart;                                                                                           // 790
            while (k < (len - actualDeleteCount)) {                                                                    // 791
                from = $String(k + actualDeleteCount);                                                                 // 792
                to = $String(k + itemCount);                                                                           // 793
                if (owns(O, from)) {                                                                                   // 794
                    O[to] = O[from];                                                                                   // 795
                } else {                                                                                               // 796
                    delete O[to];                                                                                      // 797
                }                                                                                                      // 798
                k += 1;                                                                                                // 799
            }                                                                                                          // 800
            k = len;                                                                                                   // 801
            while (k > (len - actualDeleteCount + itemCount)) {                                                        // 802
                delete O[k - 1];                                                                                       // 803
                k -= 1;                                                                                                // 804
            }                                                                                                          // 805
        } else if (itemCount > actualDeleteCount) {                                                                    // 806
            k = len - actualDeleteCount;                                                                               // 807
            while (k > actualStart) {                                                                                  // 808
                from = $String(k + actualDeleteCount - 1);                                                             // 809
                to = $String(k + itemCount - 1);                                                                       // 810
                if (owns(O, from)) {                                                                                   // 811
                    O[to] = O[from];                                                                                   // 812
                } else {                                                                                               // 813
                    delete O[to];                                                                                      // 814
                }                                                                                                      // 815
                k -= 1;                                                                                                // 816
            }                                                                                                          // 817
        }                                                                                                              // 818
        k = actualStart;                                                                                               // 819
        for (var i = 0; i < items.length; ++i) {                                                                       // 820
            O[k] = items[i];                                                                                           // 821
            k += 1;                                                                                                    // 822
        }                                                                                                              // 823
        O.length = len - actualDeleteCount + itemCount;                                                                // 824
                                                                                                                       // 825
        return A;                                                                                                      // 826
    }                                                                                                                  // 827
}, !spliceWorksWithLargeSparseArrays || !spliceWorksWithSmallSparseArrays);                                            // 828
                                                                                                                       // 829
var hasJoinUndefinedBug = [1, 2].join(undefined) !== '1,2';                                                            // 830
var originalJoin = ArrayPrototype.join;                                                                                // 831
defineProperties(ArrayPrototype, {                                                                                     // 832
    join: function join(separator) {                                                                                   // 833
        return originalJoin.call(this, typeof separator === 'undefined' ? ',' : separator);                            // 834
    }                                                                                                                  // 835
}, hasJoinUndefinedBug);                                                                                               // 836
                                                                                                                       // 837
var pushShim = function push(item) {                                                                                   // 838
    var O = ES.ToObject(this);                                                                                         // 839
    var n = ES.ToUint32(O.length);                                                                                     // 840
    var i = 0;                                                                                                         // 841
    while (i < arguments.length) {                                                                                     // 842
        O[n + i] = arguments[i];                                                                                       // 843
        i += 1;                                                                                                        // 844
    }                                                                                                                  // 845
    O.length = n + i;                                                                                                  // 846
    return n + i;                                                                                                      // 847
};                                                                                                                     // 848
                                                                                                                       // 849
var pushIsNotGeneric = (function () {                                                                                  // 850
    var obj = {};                                                                                                      // 851
    var result = Array.prototype.push.call(obj, undefined);                                                            // 852
    return result !== 1 || obj.length !== 1 || typeof obj[0] !== 'undefined' || !owns(obj, 0);                         // 853
}());                                                                                                                  // 854
defineProperties(ArrayPrototype, {                                                                                     // 855
    push: function push(item) {                                                                                        // 856
        if (isArray(this)) {                                                                                           // 857
            return array_push.apply(this, arguments);                                                                  // 858
        }                                                                                                              // 859
        return pushShim.apply(this, arguments);                                                                        // 860
    }                                                                                                                  // 861
}, pushIsNotGeneric);                                                                                                  // 862
                                                                                                                       // 863
// This fixes a very weird bug in Opera 10.6 when pushing `undefined                                                   // 864
var pushUndefinedIsWeird = (function () {                                                                              // 865
    var arr = [];                                                                                                      // 866
    var result = arr.push(undefined);                                                                                  // 867
    return result !== 1 || arr.length !== 1 || typeof arr[0] !== 'undefined' || !owns(arr, 0);                         // 868
}());                                                                                                                  // 869
defineProperties(ArrayPrototype, { push: pushShim }, pushUndefinedIsWeird);                                            // 870
                                                                                                                       // 871
//                                                                                                                     // 872
// Object                                                                                                              // 873
// ======                                                                                                              // 874
//                                                                                                                     // 875
                                                                                                                       // 876
// ES5 15.2.3.14                                                                                                       // 877
// http://es5.github.com/#x15.2.3.14                                                                                   // 878
                                                                                                                       // 879
// http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation                                 // 880
var hasDontEnumBug = !({ 'toString': null }).propertyIsEnumerable('toString');                                         // 881
var hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype');                                                // 882
var hasStringEnumBug = !owns('x', '0');                                                                                // 883
var equalsConstructorPrototype = function (o) {                                                                        // 884
    var ctor = o.constructor;                                                                                          // 885
    return ctor && ctor.prototype === o;                                                                               // 886
};                                                                                                                     // 887
var blacklistedKeys = {                                                                                                // 888
    $window: true,                                                                                                     // 889
    $console: true,                                                                                                    // 890
    $parent: true,                                                                                                     // 891
    $self: true,                                                                                                       // 892
    $frame: true,                                                                                                      // 893
    $frames: true,                                                                                                     // 894
    $frameElement: true,                                                                                               // 895
    $webkitIndexedDB: true,                                                                                            // 896
    $webkitStorageInfo: true                                                                                           // 897
};                                                                                                                     // 898
var hasAutomationEqualityBug = (function () {                                                                          // 899
    /* globals window */                                                                                               // 900
    if (typeof window === 'undefined') { return false; }                                                               // 901
    for (var k in window) {                                                                                            // 902
        try {                                                                                                          // 903
            if (!blacklistedKeys['$' + k] && owns(window, k) && window[k] !== null && typeof window[k] === 'object') {
                equalsConstructorPrototype(window[k]);                                                                 // 905
            }                                                                                                          // 906
        } catch (e) {                                                                                                  // 907
            return true;                                                                                               // 908
        }                                                                                                              // 909
    }                                                                                                                  // 910
    return false;                                                                                                      // 911
}());                                                                                                                  // 912
var equalsConstructorPrototypeIfNotBuggy = function (object) {                                                         // 913
    if (typeof window === 'undefined' || !hasAutomationEqualityBug) { return equalsConstructorPrototype(object); }     // 914
    try {                                                                                                              // 915
        return equalsConstructorPrototype(object);                                                                     // 916
    } catch (e) {                                                                                                      // 917
        return false;                                                                                                  // 918
    }                                                                                                                  // 919
};                                                                                                                     // 920
var dontEnums = [                                                                                                      // 921
    'toString',                                                                                                        // 922
    'toLocaleString',                                                                                                  // 923
    'valueOf',                                                                                                         // 924
    'hasOwnProperty',                                                                                                  // 925
    'isPrototypeOf',                                                                                                   // 926
    'propertyIsEnumerable',                                                                                            // 927
    'constructor'                                                                                                      // 928
];                                                                                                                     // 929
var dontEnumsLength = dontEnums.length;                                                                                // 930
                                                                                                                       // 931
// taken directly from https://github.com/ljharb/is-arguments/blob/master/index.js                                     // 932
// can be replaced with require('is-arguments') if we ever use a build process instead                                 // 933
var isStandardArguments = function isArguments(value) {                                                                // 934
    return toStr(value) === '[object Arguments]';                                                                      // 935
};                                                                                                                     // 936
var isLegacyArguments = function isArguments(value) {                                                                  // 937
    return value !== null &&                                                                                           // 938
        typeof value === 'object' &&                                                                                   // 939
        typeof value.length === 'number' &&                                                                            // 940
        value.length >= 0 &&                                                                                           // 941
        !isArray(value) &&                                                                                             // 942
        isCallable(value.callee);                                                                                      // 943
};                                                                                                                     // 944
var isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;                            // 945
                                                                                                                       // 946
defineProperties($Object, {                                                                                            // 947
    keys: function keys(object) {                                                                                      // 948
        var isFn = isCallable(object);                                                                                 // 949
        var isArgs = isArguments(object);                                                                              // 950
        var isObject = object !== null && typeof object === 'object';                                                  // 951
        var isStr = isObject && isString(object);                                                                      // 952
                                                                                                                       // 953
        if (!isObject && !isFn && !isArgs) {                                                                           // 954
            throw new TypeError('Object.keys called on a non-object');                                                 // 955
        }                                                                                                              // 956
                                                                                                                       // 957
        var theKeys = [];                                                                                              // 958
        var skipProto = hasProtoEnumBug && isFn;                                                                       // 959
        if ((isStr && hasStringEnumBug) || isArgs) {                                                                   // 960
            for (var i = 0; i < object.length; ++i) {                                                                  // 961
                push(theKeys, $String(i));                                                                             // 962
            }                                                                                                          // 963
        }                                                                                                              // 964
                                                                                                                       // 965
        if (!isArgs) {                                                                                                 // 966
            for (var name in object) {                                                                                 // 967
                if (!(skipProto && name === 'prototype') && owns(object, name)) {                                      // 968
                    push(theKeys, $String(name));                                                                      // 969
                }                                                                                                      // 970
            }                                                                                                          // 971
        }                                                                                                              // 972
                                                                                                                       // 973
        if (hasDontEnumBug) {                                                                                          // 974
            var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);                                        // 975
            for (var j = 0; j < dontEnumsLength; j++) {                                                                // 976
                var dontEnum = dontEnums[j];                                                                           // 977
                if (!(skipConstructor && dontEnum === 'constructor') && owns(object, dontEnum)) {                      // 978
                    push(theKeys, dontEnum);                                                                           // 979
                }                                                                                                      // 980
            }                                                                                                          // 981
        }                                                                                                              // 982
        return theKeys;                                                                                                // 983
    }                                                                                                                  // 984
});                                                                                                                    // 985
                                                                                                                       // 986
var keysWorksWithArguments = $Object.keys && (function () {                                                            // 987
    // Safari 5.0 bug                                                                                                  // 988
    return $Object.keys(arguments).length === 2;                                                                       // 989
}(1, 2));                                                                                                              // 990
var keysHasArgumentsLengthBug = $Object.keys && (function () {                                                         // 991
    var argKeys = $Object.keys(arguments);                                                                             // 992
    return arguments.length !== 1 || argKeys.length !== 1 || argKeys[0] !== 1;                                         // 993
}(1));                                                                                                                 // 994
var originalKeys = $Object.keys;                                                                                       // 995
defineProperties($Object, {                                                                                            // 996
    keys: function keys(object) {                                                                                      // 997
        if (isArguments(object)) {                                                                                     // 998
            return originalKeys(array_slice.call(object));                                                             // 999
        } else {                                                                                                       // 1000
            return originalKeys(object);                                                                               // 1001
        }                                                                                                              // 1002
    }                                                                                                                  // 1003
}, !keysWorksWithArguments || keysHasArgumentsLengthBug);                                                              // 1004
                                                                                                                       // 1005
//                                                                                                                     // 1006
// Date                                                                                                                // 1007
// ====                                                                                                                // 1008
//                                                                                                                     // 1009
                                                                                                                       // 1010
// ES5 15.9.5.43                                                                                                       // 1011
// http://es5.github.com/#x15.9.5.43                                                                                   // 1012
// This function returns a String value represent the instance in time                                                 // 1013
// represented by this Date object. The format of the String is the Date Time                                          // 1014
// string format defined in 15.9.1.15. All fields are present in the String.                                           // 1015
// The time zone is always UTC, denoted by the suffix Z. If the time value of                                          // 1016
// this object is not a finite Number a RangeError exception is thrown.                                                // 1017
var negativeDate = -62198755200000;                                                                                    // 1018
var negativeYearString = '-000001';                                                                                    // 1019
var hasNegativeDateBug = Date.prototype.toISOString && new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1;
var hasSafari51DateBug = Date.prototype.toISOString && new Date(-1).toISOString() !== '1969-12-31T23:59:59.999Z';      // 1021
                                                                                                                       // 1022
defineProperties(Date.prototype, {                                                                                     // 1023
    toISOString: function toISOString() {                                                                              // 1024
        var result, length, value, year, month;                                                                        // 1025
        if (!isFinite(this)) {                                                                                         // 1026
            throw new RangeError('Date.prototype.toISOString called on non-finite value.');                            // 1027
        }                                                                                                              // 1028
                                                                                                                       // 1029
        year = this.getUTCFullYear();                                                                                  // 1030
                                                                                                                       // 1031
        month = this.getUTCMonth();                                                                                    // 1032
        // see https://github.com/es-shims/es5-shim/issues/111                                                         // 1033
        year += Math.floor(month / 12);                                                                                // 1034
        month = (month % 12 + 12) % 12;                                                                                // 1035
                                                                                                                       // 1036
        // the date time string format is specified in 15.9.1.15.                                                      // 1037
        result = [month + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()];       // 1038
        year = (                                                                                                       // 1039
            (year < 0 ? '-' : (year > 9999 ? '+' : '')) +                                                              // 1040
            strSlice('00000' + Math.abs(year), (0 <= year && year <= 9999) ? -4 : -6)                                  // 1041
        );                                                                                                             // 1042
                                                                                                                       // 1043
        length = result.length;                                                                                        // 1044
        while (length--) {                                                                                             // 1045
            value = result[length];                                                                                    // 1046
            // pad months, days, hours, minutes, and seconds to have two                                               // 1047
            // digits.                                                                                                 // 1048
            if (value < 10) {                                                                                          // 1049
                result[length] = '0' + value;                                                                          // 1050
            }                                                                                                          // 1051
        }                                                                                                              // 1052
        // pad milliseconds to have three digits.                                                                      // 1053
        return (                                                                                                       // 1054
            year + '-' + array_slice.call(result, 0, 2).join('-') +                                                    // 1055
            'T' + array_slice.call(result, 2).join(':') + '.' +                                                        // 1056
            strSlice('000' + this.getUTCMilliseconds(), -3) + 'Z'                                                      // 1057
        );                                                                                                             // 1058
    }                                                                                                                  // 1059
}, hasNegativeDateBug || hasSafari51DateBug);                                                                          // 1060
                                                                                                                       // 1061
// ES5 15.9.5.44                                                                                                       // 1062
// http://es5.github.com/#x15.9.5.44                                                                                   // 1063
// This function provides a String representation of a Date object for use by                                          // 1064
// JSON.stringify (15.12.3).                                                                                           // 1065
var dateToJSONIsSupported = (function () {                                                                             // 1066
    try {                                                                                                              // 1067
        return Date.prototype.toJSON &&                                                                                // 1068
            new Date(NaN).toJSON() === null &&                                                                         // 1069
            new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1 &&                                      // 1070
            Date.prototype.toJSON.call({ // generic                                                                    // 1071
                toISOString: function () { return true; }                                                              // 1072
            });                                                                                                        // 1073
    } catch (e) {                                                                                                      // 1074
        return false;                                                                                                  // 1075
    }                                                                                                                  // 1076
}());                                                                                                                  // 1077
if (!dateToJSONIsSupported) {                                                                                          // 1078
    Date.prototype.toJSON = function toJSON(key) {                                                                     // 1079
        // When the toJSON method is called with argument key, the following                                           // 1080
        // steps are taken:                                                                                            // 1081
                                                                                                                       // 1082
        // 1.  Let O be the result of calling ToObject, giving it the this                                             // 1083
        // value as its argument.                                                                                      // 1084
        // 2. Let tv be ES.ToPrimitive(O, hint Number).                                                                // 1085
        var O = $Object(this);                                                                                         // 1086
        var tv = ES.ToPrimitive(O);                                                                                    // 1087
        // 3. If tv is a Number and is not finite, return null.                                                        // 1088
        if (typeof tv === 'number' && !isFinite(tv)) {                                                                 // 1089
            return null;                                                                                               // 1090
        }                                                                                                              // 1091
        // 4. Let toISO be the result of calling the [[Get]] internal method of                                        // 1092
        // O with argument "toISOString".                                                                              // 1093
        var toISO = O.toISOString;                                                                                     // 1094
        // 5. If IsCallable(toISO) is false, throw a TypeError exception.                                              // 1095
        if (!isCallable(toISO)) {                                                                                      // 1096
            throw new TypeError('toISOString property is not callable');                                               // 1097
        }                                                                                                              // 1098
        // 6. Return the result of calling the [[Call]] internal method of                                             // 1099
        //  toISO with O as the this value and an empty argument list.                                                 // 1100
        return toISO.call(O);                                                                                          // 1101
                                                                                                                       // 1102
        // NOTE 1 The argument is ignored.                                                                             // 1103
                                                                                                                       // 1104
        // NOTE 2 The toJSON function is intentionally generic; it does not                                            // 1105
        // require that its this value be a Date object. Therefore, it can be                                          // 1106
        // transferred to other kinds of objects for use as a method. However,                                         // 1107
        // it does require that any such object have a toISOString method. An                                          // 1108
        // object is free to use the argument key to filter its                                                        // 1109
        // stringification.                                                                                            // 1110
    };                                                                                                                 // 1111
}                                                                                                                      // 1112
                                                                                                                       // 1113
// ES5 15.9.4.2                                                                                                        // 1114
// http://es5.github.com/#x15.9.4.2                                                                                    // 1115
// based on work shared by Daniel Friesen (dantman)                                                                    // 1116
// http://gist.github.com/303249                                                                                       // 1117
var supportsExtendedYears = Date.parse('+033658-09-27T01:46:40.000Z') === 1e15;                                        // 1118
var acceptsInvalidDates = !isNaN(Date.parse('2012-04-04T24:00:00.500Z')) || !isNaN(Date.parse('2012-11-31T23:59:59.000Z')) || !isNaN(Date.parse('2012-12-31T23:59:60.000Z'));
var doesNotParseY2KNewYear = isNaN(Date.parse('2000-01-01T00:00:00.000Z'));                                            // 1120
if (doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) {                                         // 1121
    // XXX global assignment won't work in embeddings that use                                                         // 1122
    // an alternate object for the context.                                                                            // 1123
    /* global Date: true */                                                                                            // 1124
    /* eslint-disable no-undef */                                                                                      // 1125
    var maxSafeUnsigned32Bit = Math.pow(2, 31) - 1;                                                                    // 1126
    var secondsWithinMaxSafeUnsigned32Bit = Math.floor(maxSafeUnsigned32Bit / 1e3);                                    // 1127
    var hasSafariSignedIntBug = isActualNaN(new Date(1970, 0, 1, 0, 0, 0, maxSafeUnsigned32Bit + 1).getTime());        // 1128
    Date = (function (NativeDate) {                                                                                    // 1129
    /* eslint-enable no-undef */                                                                                       // 1130
        // Date.length === 7                                                                                           // 1131
        var DateShim = function Date(Y, M, D, h, m, s, ms) {                                                           // 1132
            var length = arguments.length;                                                                             // 1133
            var date;                                                                                                  // 1134
            if (this instanceof NativeDate) {                                                                          // 1135
                var seconds = s;                                                                                       // 1136
                var millis = ms;                                                                                       // 1137
                if (hasSafariSignedIntBug && length >= 7 && ms > maxSafeUnsigned32Bit) {                               // 1138
                    // work around a Safari 8/9 bug where it treats the seconds as signed                              // 1139
                    var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;                      // 1140
                    var sToShift = Math.floor(msToShift / 1e3);                                                        // 1141
                    seconds += sToShift;                                                                               // 1142
                    millis -= sToShift * 1e3;                                                                          // 1143
                }                                                                                                      // 1144
                date = length === 1 && $String(Y) === Y ? // isString(Y)                                               // 1145
                    // We explicitly pass it through parse:                                                            // 1146
                    new NativeDate(DateShim.parse(Y)) :                                                                // 1147
                    // We have to manually make calls depending on argument                                            // 1148
                    // length here                                                                                     // 1149
                    length >= 7 ? new NativeDate(Y, M, D, h, m, seconds, millis) :                                     // 1150
                    length >= 6 ? new NativeDate(Y, M, D, h, m, seconds) :                                             // 1151
                    length >= 5 ? new NativeDate(Y, M, D, h, m) :                                                      // 1152
                    length >= 4 ? new NativeDate(Y, M, D, h) :                                                         // 1153
                    length >= 3 ? new NativeDate(Y, M, D) :                                                            // 1154
                    length >= 2 ? new NativeDate(Y, M) :                                                               // 1155
                    length >= 1 ? new NativeDate(Y) :                                                                  // 1156
                                  new NativeDate();                                                                    // 1157
            } else {                                                                                                   // 1158
                date = NativeDate.apply(this, arguments);                                                              // 1159
            }                                                                                                          // 1160
            if (!isPrimitive(date)) {                                                                                  // 1161
              // Prevent mixups with unfixed Date object                                                               // 1162
              defineProperties(date, { constructor: DateShim }, true);                                                 // 1163
            }                                                                                                          // 1164
            return date;                                                                                               // 1165
        };                                                                                                             // 1166
                                                                                                                       // 1167
        // 15.9.1.15 Date Time String Format.                                                                          // 1168
        var isoDateExpression = new RegExp('^' +                                                                       // 1169
            '(\\d{4}|[+-]\\d{6})' + // four-digit year capture or sign +                                               // 1170
                                      // 6-digit extended year                                                         // 1171
            '(?:-(\\d{2})' + // optional month capture                                                                 // 1172
            '(?:-(\\d{2})' + // optional day capture                                                                   // 1173
            '(?:' + // capture hours:minutes:seconds.milliseconds                                                      // 1174
                'T(\\d{2})' + // hours capture                                                                         // 1175
                ':(\\d{2})' + // minutes capture                                                                       // 1176
                '(?:' + // optional :seconds.milliseconds                                                              // 1177
                    ':(\\d{2})' + // seconds capture                                                                   // 1178
                    '(?:(\\.\\d{1,}))?' + // milliseconds capture                                                      // 1179
                ')?' +                                                                                                 // 1180
            '(' + // capture UTC offset component                                                                      // 1181
                'Z|' + // UTC capture                                                                                  // 1182
                '(?:' + // offset specifier +/-hours:minutes                                                           // 1183
                    '([-+])' + // sign capture                                                                         // 1184
                    '(\\d{2})' + // hours offset capture                                                               // 1185
                    ':(\\d{2})' + // minutes offset capture                                                            // 1186
                ')' +                                                                                                  // 1187
            ')?)?)?)?' +                                                                                               // 1188
        '$');                                                                                                          // 1189
                                                                                                                       // 1190
        var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];                                     // 1191
                                                                                                                       // 1192
        var dayFromMonth = function dayFromMonth(year, month) {                                                        // 1193
            var t = month > 1 ? 1 : 0;                                                                                 // 1194
            return (                                                                                                   // 1195
                months[month] +                                                                                        // 1196
                Math.floor((year - 1969 + t) / 4) -                                                                    // 1197
                Math.floor((year - 1901 + t) / 100) +                                                                  // 1198
                Math.floor((year - 1601 + t) / 400) +                                                                  // 1199
                365 * (year - 1970)                                                                                    // 1200
            );                                                                                                         // 1201
        };                                                                                                             // 1202
                                                                                                                       // 1203
        var toUTC = function toUTC(t) {                                                                                // 1204
            var s = 0;                                                                                                 // 1205
            var ms = t;                                                                                                // 1206
            if (hasSafariSignedIntBug && ms > maxSafeUnsigned32Bit) {                                                  // 1207
                // work around a Safari 8/9 bug where it treats the seconds as signed                                  // 1208
                var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;                          // 1209
                var sToShift = Math.floor(msToShift / 1e3);                                                            // 1210
                s += sToShift;                                                                                         // 1211
                ms -= sToShift * 1e3;                                                                                  // 1212
            }                                                                                                          // 1213
            return $Number(new NativeDate(1970, 0, 1, 0, 0, s, ms));                                                   // 1214
        };                                                                                                             // 1215
                                                                                                                       // 1216
        // Copy any custom methods a 3rd party library may have added                                                  // 1217
        for (var key in NativeDate) {                                                                                  // 1218
            if (owns(NativeDate, key)) {                                                                               // 1219
                DateShim[key] = NativeDate[key];                                                                       // 1220
            }                                                                                                          // 1221
        }                                                                                                              // 1222
                                                                                                                       // 1223
        // Copy "native" methods explicitly; they may be non-enumerable                                                // 1224
        defineProperties(DateShim, {                                                                                   // 1225
            now: NativeDate.now,                                                                                       // 1226
            UTC: NativeDate.UTC                                                                                        // 1227
        }, true);                                                                                                      // 1228
        DateShim.prototype = NativeDate.prototype;                                                                     // 1229
        defineProperties(DateShim.prototype, {                                                                         // 1230
            constructor: DateShim                                                                                      // 1231
        }, true);                                                                                                      // 1232
                                                                                                                       // 1233
        // Upgrade Date.parse to handle simplified ISO 8601 strings                                                    // 1234
        var parseShim = function parse(string) {                                                                       // 1235
            var match = isoDateExpression.exec(string);                                                                // 1236
            if (match) {                                                                                               // 1237
                // parse months, days, hours, minutes, seconds, and milliseconds                                       // 1238
                // provide default values if necessary                                                                 // 1239
                // parse the UTC offset component                                                                      // 1240
                var year = $Number(match[1]),                                                                          // 1241
                    month = $Number(match[2] || 1) - 1,                                                                // 1242
                    day = $Number(match[3] || 1) - 1,                                                                  // 1243
                    hour = $Number(match[4] || 0),                                                                     // 1244
                    minute = $Number(match[5] || 0),                                                                   // 1245
                    second = $Number(match[6] || 0),                                                                   // 1246
                    millisecond = Math.floor($Number(match[7] || 0) * 1000),                                           // 1247
                    // When time zone is missed, local offset should be used                                           // 1248
                    // (ES 5.1 bug)                                                                                    // 1249
                    // see https://bugs.ecmascript.org/show_bug.cgi?id=112                                             // 1250
                    isLocalTime = Boolean(match[4] && !match[8]),                                                      // 1251
                    signOffset = match[9] === '-' ? 1 : -1,                                                            // 1252
                    hourOffset = $Number(match[10] || 0),                                                              // 1253
                    minuteOffset = $Number(match[11] || 0),                                                            // 1254
                    result;                                                                                            // 1255
                var hasMinutesOrSecondsOrMilliseconds = minute > 0 || second > 0 || millisecond > 0;                   // 1256
                if (                                                                                                   // 1257
                    hour < (hasMinutesOrSecondsOrMilliseconds ? 24 : 25) &&                                            // 1258
                    minute < 60 && second < 60 && millisecond < 1000 &&                                                // 1259
                    month > -1 && month < 12 && hourOffset < 24 &&                                                     // 1260
                    minuteOffset < 60 && // detect invalid offsets                                                     // 1261
                    day > -1 &&                                                                                        // 1262
                    day < (dayFromMonth(year, month + 1) - dayFromMonth(year, month))                                  // 1263
                ) {                                                                                                    // 1264
                    result = (                                                                                         // 1265
                        (dayFromMonth(year, month) + day) * 24 +                                                       // 1266
                        hour +                                                                                         // 1267
                        hourOffset * signOffset                                                                        // 1268
                    ) * 60;                                                                                            // 1269
                    result = (                                                                                         // 1270
                        (result + minute + minuteOffset * signOffset) * 60 +                                           // 1271
                        second                                                                                         // 1272
                    ) * 1000 + millisecond;                                                                            // 1273
                    if (isLocalTime) {                                                                                 // 1274
                        result = toUTC(result);                                                                        // 1275
                    }                                                                                                  // 1276
                    if (-8.64e15 <= result && result <= 8.64e15) {                                                     // 1277
                        return result;                                                                                 // 1278
                    }                                                                                                  // 1279
                }                                                                                                      // 1280
                return NaN;                                                                                            // 1281
            }                                                                                                          // 1282
            return NativeDate.parse.apply(this, arguments);                                                            // 1283
        };                                                                                                             // 1284
        defineProperties(DateShim, { parse: parseShim });                                                              // 1285
                                                                                                                       // 1286
        return DateShim;                                                                                               // 1287
    }(Date));                                                                                                          // 1288
    /* global Date: false */                                                                                           // 1289
}                                                                                                                      // 1290
                                                                                                                       // 1291
// ES5 15.9.4.4                                                                                                        // 1292
// http://es5.github.com/#x15.9.4.4                                                                                    // 1293
if (!Date.now) {                                                                                                       // 1294
    Date.now = function now() {                                                                                        // 1295
        return new Date().getTime();                                                                                   // 1296
    };                                                                                                                 // 1297
}                                                                                                                      // 1298
                                                                                                                       // 1299
//                                                                                                                     // 1300
// Number                                                                                                              // 1301
// ======                                                                                                              // 1302
//                                                                                                                     // 1303
                                                                                                                       // 1304
// ES5.1 15.7.4.5                                                                                                      // 1305
// http://es5.github.com/#x15.7.4.5                                                                                    // 1306
var hasToFixedBugs = NumberPrototype.toFixed && (                                                                      // 1307
  (0.00008).toFixed(3) !== '0.000' ||                                                                                  // 1308
  (0.9).toFixed(0) !== '1' ||                                                                                          // 1309
  (1.255).toFixed(2) !== '1.25' ||                                                                                     // 1310
  (1000000000000000128).toFixed(0) !== '1000000000000000128'                                                           // 1311
);                                                                                                                     // 1312
                                                                                                                       // 1313
var toFixedHelpers = {                                                                                                 // 1314
  base: 1e7,                                                                                                           // 1315
  size: 6,                                                                                                             // 1316
  data: [0, 0, 0, 0, 0, 0],                                                                                            // 1317
  multiply: function multiply(n, c) {                                                                                  // 1318
      var i = -1;                                                                                                      // 1319
      var c2 = c;                                                                                                      // 1320
      while (++i < toFixedHelpers.size) {                                                                              // 1321
          c2 += n * toFixedHelpers.data[i];                                                                            // 1322
          toFixedHelpers.data[i] = c2 % toFixedHelpers.base;                                                           // 1323
          c2 = Math.floor(c2 / toFixedHelpers.base);                                                                   // 1324
      }                                                                                                                // 1325
  },                                                                                                                   // 1326
  divide: function divide(n) {                                                                                         // 1327
      var i = toFixedHelpers.size, c = 0;                                                                              // 1328
      while (--i >= 0) {                                                                                               // 1329
          c += toFixedHelpers.data[i];                                                                                 // 1330
          toFixedHelpers.data[i] = Math.floor(c / n);                                                                  // 1331
          c = (c % n) * toFixedHelpers.base;                                                                           // 1332
      }                                                                                                                // 1333
  },                                                                                                                   // 1334
  numToString: function numToString() {                                                                                // 1335
      var i = toFixedHelpers.size;                                                                                     // 1336
      var s = '';                                                                                                      // 1337
      while (--i >= 0) {                                                                                               // 1338
          if (s !== '' || i === 0 || toFixedHelpers.data[i] !== 0) {                                                   // 1339
              var t = $String(toFixedHelpers.data[i]);                                                                 // 1340
              if (s === '') {                                                                                          // 1341
                  s = t;                                                                                               // 1342
              } else {                                                                                                 // 1343
                  s += strSlice('0000000', 0, 7 - t.length) + t;                                                       // 1344
              }                                                                                                        // 1345
          }                                                                                                            // 1346
      }                                                                                                                // 1347
      return s;                                                                                                        // 1348
  },                                                                                                                   // 1349
  pow: function pow(x, n, acc) {                                                                                       // 1350
      return (n === 0 ? acc : (n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc)));                        // 1351
  },                                                                                                                   // 1352
  log: function log(x) {                                                                                               // 1353
      var n = 0;                                                                                                       // 1354
      var x2 = x;                                                                                                      // 1355
      while (x2 >= 4096) {                                                                                             // 1356
          n += 12;                                                                                                     // 1357
          x2 /= 4096;                                                                                                  // 1358
      }                                                                                                                // 1359
      while (x2 >= 2) {                                                                                                // 1360
          n += 1;                                                                                                      // 1361
          x2 /= 2;                                                                                                     // 1362
      }                                                                                                                // 1363
      return n;                                                                                                        // 1364
  }                                                                                                                    // 1365
};                                                                                                                     // 1366
                                                                                                                       // 1367
var toFixedShim = function toFixed(fractionDigits) {                                                                   // 1368
    var f, x, s, m, e, z, j, k;                                                                                        // 1369
                                                                                                                       // 1370
    // Test for NaN and round fractionDigits down                                                                      // 1371
    f = $Number(fractionDigits);                                                                                       // 1372
    f = isActualNaN(f) ? 0 : Math.floor(f);                                                                            // 1373
                                                                                                                       // 1374
    if (f < 0 || f > 20) {                                                                                             // 1375
        throw new RangeError('Number.toFixed called with invalid number of decimals');                                 // 1376
    }                                                                                                                  // 1377
                                                                                                                       // 1378
    x = $Number(this);                                                                                                 // 1379
                                                                                                                       // 1380
    if (isActualNaN(x)) {                                                                                              // 1381
        return 'NaN';                                                                                                  // 1382
    }                                                                                                                  // 1383
                                                                                                                       // 1384
    // If it is too big or small, return the string value of the number                                                // 1385
    if (x <= -1e21 || x >= 1e21) {                                                                                     // 1386
        return $String(x);                                                                                             // 1387
    }                                                                                                                  // 1388
                                                                                                                       // 1389
    s = '';                                                                                                            // 1390
                                                                                                                       // 1391
    if (x < 0) {                                                                                                       // 1392
        s = '-';                                                                                                       // 1393
        x = -x;                                                                                                        // 1394
    }                                                                                                                  // 1395
                                                                                                                       // 1396
    m = '0';                                                                                                           // 1397
                                                                                                                       // 1398
    if (x > 1e-21) {                                                                                                   // 1399
        // 1e-21 < x < 1e21                                                                                            // 1400
        // -70 < log2(x) < 70                                                                                          // 1401
        e = toFixedHelpers.log(x * toFixedHelpers.pow(2, 69, 1)) - 69;                                                 // 1402
        z = (e < 0 ? x * toFixedHelpers.pow(2, -e, 1) : x / toFixedHelpers.pow(2, e, 1));                              // 1403
        z *= 0x10000000000000; // Math.pow(2, 52);                                                                     // 1404
        e = 52 - e;                                                                                                    // 1405
                                                                                                                       // 1406
        // -18 < e < 122                                                                                               // 1407
        // x = z / 2 ^ e                                                                                               // 1408
        if (e > 0) {                                                                                                   // 1409
            toFixedHelpers.multiply(0, z);                                                                             // 1410
            j = f;                                                                                                     // 1411
                                                                                                                       // 1412
            while (j >= 7) {                                                                                           // 1413
                toFixedHelpers.multiply(1e7, 0);                                                                       // 1414
                j -= 7;                                                                                                // 1415
            }                                                                                                          // 1416
                                                                                                                       // 1417
            toFixedHelpers.multiply(toFixedHelpers.pow(10, j, 1), 0);                                                  // 1418
            j = e - 1;                                                                                                 // 1419
                                                                                                                       // 1420
            while (j >= 23) {                                                                                          // 1421
                toFixedHelpers.divide(1 << 23);                                                                        // 1422
                j -= 23;                                                                                               // 1423
            }                                                                                                          // 1424
                                                                                                                       // 1425
            toFixedHelpers.divide(1 << j);                                                                             // 1426
            toFixedHelpers.multiply(1, 1);                                                                             // 1427
            toFixedHelpers.divide(2);                                                                                  // 1428
            m = toFixedHelpers.numToString();                                                                          // 1429
        } else {                                                                                                       // 1430
            toFixedHelpers.multiply(0, z);                                                                             // 1431
            toFixedHelpers.multiply(1 << (-e), 0);                                                                     // 1432
            m = toFixedHelpers.numToString() + strSlice('0.00000000000000000000', 2, 2 + f);                           // 1433
        }                                                                                                              // 1434
    }                                                                                                                  // 1435
                                                                                                                       // 1436
    if (f > 0) {                                                                                                       // 1437
        k = m.length;                                                                                                  // 1438
                                                                                                                       // 1439
        if (k <= f) {                                                                                                  // 1440
            m = s + strSlice('0.0000000000000000000', 0, f - k + 2) + m;                                               // 1441
        } else {                                                                                                       // 1442
            m = s + strSlice(m, 0, k - f) + '.' + strSlice(m, k - f);                                                  // 1443
        }                                                                                                              // 1444
    } else {                                                                                                           // 1445
        m = s + m;                                                                                                     // 1446
    }                                                                                                                  // 1447
                                                                                                                       // 1448
    return m;                                                                                                          // 1449
};                                                                                                                     // 1450
defineProperties(NumberPrototype, { toFixed: toFixedShim }, hasToFixedBugs);                                           // 1451
                                                                                                                       // 1452
var hasToPrecisionUndefinedBug = (function () {                                                                        // 1453
    try {                                                                                                              // 1454
        return 1.0.toPrecision(undefined) === '1';                                                                     // 1455
    } catch (e) {                                                                                                      // 1456
        return true;                                                                                                   // 1457
    }                                                                                                                  // 1458
}());                                                                                                                  // 1459
var originalToPrecision = NumberPrototype.toPrecision;                                                                 // 1460
defineProperties(NumberPrototype, {                                                                                    // 1461
    toPrecision: function toPrecision(precision) {                                                                     // 1462
        return typeof precision === 'undefined' ? originalToPrecision.call(this) : originalToPrecision.call(this, precision);
    }                                                                                                                  // 1464
}, hasToPrecisionUndefinedBug);                                                                                        // 1465
                                                                                                                       // 1466
//                                                                                                                     // 1467
// String                                                                                                              // 1468
// ======                                                                                                              // 1469
//                                                                                                                     // 1470
                                                                                                                       // 1471
// ES5 15.5.4.14                                                                                                       // 1472
// http://es5.github.com/#x15.5.4.14                                                                                   // 1473
                                                                                                                       // 1474
// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]                                                    // 1475
// Many browsers do not split properly with regular expressions or they                                                // 1476
// do not perform the split correctly under obscure conditions.                                                        // 1477
// See http://blog.stevenlevithan.com/archives/cross-browser-split                                                     // 1478
// I've tested in many browsers and this seems to cover the deviant ones:                                              // 1479
//    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]                                                               // 1480
//    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]                                                  // 1481
//    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not                                             // 1482
//       [undefined, "t", undefined, "e", ...]                                                                         // 1483
//    ''.split(/.?/) should be [], not [""]                                                                            // 1484
//    '.'.split(/()()/) should be ["."], not ["", "", "."]                                                             // 1485
                                                                                                                       // 1486
if (                                                                                                                   // 1487
    'ab'.split(/(?:ab)*/).length !== 2 ||                                                                              // 1488
    '.'.split(/(.?)(.?)/).length !== 4 ||                                                                              // 1489
    'tesst'.split(/(s)*/)[1] === 't' ||                                                                                // 1490
    'test'.split(/(?:)/, -1).length !== 4 ||                                                                           // 1491
    ''.split(/.?/).length ||                                                                                           // 1492
    '.'.split(/()()/).length > 1                                                                                       // 1493
) {                                                                                                                    // 1494
    (function () {                                                                                                     // 1495
        var compliantExecNpcg = typeof (/()??/).exec('')[1] === 'undefined'; // NPCG: nonparticipating capturing group
        var maxSafe32BitInt = Math.pow(2, 32) - 1;                                                                     // 1497
                                                                                                                       // 1498
        StringPrototype.split = function (separator, limit) {                                                          // 1499
            var string = this;                                                                                         // 1500
            if (typeof separator === 'undefined' && limit === 0) {                                                     // 1501
                return [];                                                                                             // 1502
            }                                                                                                          // 1503
                                                                                                                       // 1504
            // If `separator` is not a regex, use native split                                                         // 1505
            if (!isRegex(separator)) {                                                                                 // 1506
                return strSplit(this, separator, limit);                                                               // 1507
            }                                                                                                          // 1508
                                                                                                                       // 1509
            var output = [];                                                                                           // 1510
            var flags = (separator.ignoreCase ? 'i' : '') +                                                            // 1511
                        (separator.multiline ? 'm' : '') +                                                             // 1512
                        (separator.unicode ? 'u' : '') + // in ES6                                                     // 1513
                        (separator.sticky ? 'y' : ''), // Firefox 3+ and ES6                                           // 1514
                lastLastIndex = 0,                                                                                     // 1515
                // Make `global` and avoid `lastIndex` issues by working with a copy                                   // 1516
                separator2, match, lastIndex, lastLength;                                                              // 1517
            var separatorCopy = new RegExp(separator.source, flags + 'g');                                             // 1518
            string += ''; // Type-convert                                                                              // 1519
            if (!compliantExecNpcg) {                                                                                  // 1520
                // Doesn't need flags gy, but they don't hurt                                                          // 1521
                separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);                               // 1522
            }                                                                                                          // 1523
            /* Values for `limit`, per the spec:                                                                       // 1524
             * If undefined: 4294967295 // maxSafe32BitInt                                                             // 1525
             * If 0, Infinity, or NaN: 0                                                                               // 1526
             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;             // 1527
             * If negative number: 4294967296 - Math.floor(Math.abs(limit))                                            // 1528
             * If other: Type-convert, then use the above rules                                                        // 1529
             */                                                                                                        // 1530
            var splitLimit = typeof limit === 'undefined' ? maxSafe32BitInt : ES.ToUint32(limit);                      // 1531
            match = separatorCopy.exec(string);                                                                        // 1532
            while (match) {                                                                                            // 1533
                // `separatorCopy.lastIndex` is not reliable cross-browser                                             // 1534
                lastIndex = match.index + match[0].length;                                                             // 1535
                if (lastIndex > lastLastIndex) {                                                                       // 1536
                    push(output, strSlice(string, lastLastIndex, match.index));                                        // 1537
                    // Fix browsers whose `exec` methods don't consistently return `undefined` for                     // 1538
                    // nonparticipating capturing groups                                                               // 1539
                    if (!compliantExecNpcg && match.length > 1) {                                                      // 1540
                        /* eslint-disable no-loop-func */                                                              // 1541
                        match[0].replace(separator2, function () {                                                     // 1542
                            for (var i = 1; i < arguments.length - 2; i++) {                                           // 1543
                                if (typeof arguments[i] === 'undefined') {                                             // 1544
                                    match[i] = void 0;                                                                 // 1545
                                }                                                                                      // 1546
                            }                                                                                          // 1547
                        });                                                                                            // 1548
                        /* eslint-enable no-loop-func */                                                               // 1549
                    }                                                                                                  // 1550
                    if (match.length > 1 && match.index < string.length) {                                             // 1551
                        array_push.apply(output, array_slice.call(match, 1));                                          // 1552
                    }                                                                                                  // 1553
                    lastLength = match[0].length;                                                                      // 1554
                    lastLastIndex = lastIndex;                                                                         // 1555
                    if (output.length >= splitLimit) {                                                                 // 1556
                        break;                                                                                         // 1557
                    }                                                                                                  // 1558
                }                                                                                                      // 1559
                if (separatorCopy.lastIndex === match.index) {                                                         // 1560
                    separatorCopy.lastIndex++; // Avoid an infinite loop                                               // 1561
                }                                                                                                      // 1562
                match = separatorCopy.exec(string);                                                                    // 1563
            }                                                                                                          // 1564
            if (lastLastIndex === string.length) {                                                                     // 1565
                if (lastLength || !separatorCopy.test('')) {                                                           // 1566
                    push(output, '');                                                                                  // 1567
                }                                                                                                      // 1568
            } else {                                                                                                   // 1569
                push(output, strSlice(string, lastLastIndex));                                                         // 1570
            }                                                                                                          // 1571
            return output.length > splitLimit ? strSlice(output, 0, splitLimit) : output;                              // 1572
        };                                                                                                             // 1573
    }());                                                                                                              // 1574
                                                                                                                       // 1575
// [bugfix, chrome]                                                                                                    // 1576
// If separator is undefined, then the result array contains just one String,                                          // 1577
// which is the this value (converted to a String). If limit is not undefined,                                         // 1578
// then the output array is truncated so that it contains no more than limit                                           // 1579
// elements.                                                                                                           // 1580
// "0".split(undefined, 0) -> []                                                                                       // 1581
} else if ('0'.split(void 0, 0).length) {                                                                              // 1582
    StringPrototype.split = function split(separator, limit) {                                                         // 1583
        if (typeof separator === 'undefined' && limit === 0) { return []; }                                            // 1584
        return strSplit(this, separator, limit);                                                                       // 1585
    };                                                                                                                 // 1586
}                                                                                                                      // 1587
                                                                                                                       // 1588
var str_replace = StringPrototype.replace;                                                                             // 1589
var replaceReportsGroupsCorrectly = (function () {                                                                     // 1590
    var groups = [];                                                                                                   // 1591
    'x'.replace(/x(.)?/g, function (match, group) {                                                                    // 1592
        push(groups, group);                                                                                           // 1593
    });                                                                                                                // 1594
    return groups.length === 1 && typeof groups[0] === 'undefined';                                                    // 1595
}());                                                                                                                  // 1596
                                                                                                                       // 1597
if (!replaceReportsGroupsCorrectly) {                                                                                  // 1598
    StringPrototype.replace = function replace(searchValue, replaceValue) {                                            // 1599
        var isFn = isCallable(replaceValue);                                                                           // 1600
        var hasCapturingGroups = isRegex(searchValue) && (/\)[*?]/).test(searchValue.source);                          // 1601
        if (!isFn || !hasCapturingGroups) {                                                                            // 1602
            return str_replace.call(this, searchValue, replaceValue);                                                  // 1603
        } else {                                                                                                       // 1604
            var wrappedReplaceValue = function (match) {                                                               // 1605
                var length = arguments.length;                                                                         // 1606
                var originalLastIndex = searchValue.lastIndex;                                                         // 1607
                searchValue.lastIndex = 0;                                                                             // 1608
                var args = searchValue.exec(match) || [];                                                              // 1609
                searchValue.lastIndex = originalLastIndex;                                                             // 1610
                push(args, arguments[length - 2], arguments[length - 1]);                                              // 1611
                return replaceValue.apply(this, args);                                                                 // 1612
            };                                                                                                         // 1613
            return str_replace.call(this, searchValue, wrappedReplaceValue);                                           // 1614
        }                                                                                                              // 1615
    };                                                                                                                 // 1616
}                                                                                                                      // 1617
                                                                                                                       // 1618
// ECMA-262, 3rd B.2.3                                                                                                 // 1619
// Not an ECMAScript standard, although ECMAScript 3rd Edition has a                                                   // 1620
// non-normative section suggesting uniform semantics and it should be                                                 // 1621
// normalized across all browsers                                                                                      // 1622
// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE                                             // 1623
var string_substr = StringPrototype.substr;                                                                            // 1624
var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';                                                       // 1625
defineProperties(StringPrototype, {                                                                                    // 1626
    substr: function substr(start, length) {                                                                           // 1627
        var normalizedStart = start;                                                                                   // 1628
        if (start < 0) {                                                                                               // 1629
            normalizedStart = max(this.length + start, 0);                                                             // 1630
        }                                                                                                              // 1631
        return string_substr.call(this, normalizedStart, length);                                                      // 1632
    }                                                                                                                  // 1633
}, hasNegativeSubstrBug);                                                                                              // 1634
                                                                                                                       // 1635
// ES5 15.5.4.20                                                                                                       // 1636
// whitespace from: http://es5.github.io/#x15.5.4.20                                                                   // 1637
var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +                                          // 1638
    '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +                                             // 1639
    '\u2029\uFEFF';                                                                                                    // 1640
var zeroWidth = '\u200b';                                                                                              // 1641
var wsRegexChars = '[' + ws + ']';                                                                                     // 1642
var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');                                             // 1643
var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');                                                    // 1644
var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());                                   // 1645
defineProperties(StringPrototype, {                                                                                    // 1646
    // http://blog.stevenlevithan.com/archives/faster-trim-javascript                                                  // 1647
    // http://perfectionkills.com/whitespace-deviations/                                                               // 1648
    trim: function trim() {                                                                                            // 1649
        if (typeof this === 'undefined' || this === null) {                                                            // 1650
            throw new TypeError("can't convert " + this + ' to object');                                               // 1651
        }                                                                                                              // 1652
        return $String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');                                  // 1653
    }                                                                                                                  // 1654
}, hasTrimWhitespaceBug);                                                                                              // 1655
                                                                                                                       // 1656
var hasLastIndexBug = StringPrototype.lastIndexOf && 'abcあい'.lastIndexOf('あい', 2) !== -1;                              // 1657
defineProperties(StringPrototype, {                                                                                    // 1658
    lastIndexOf: function lastIndexOf(searchString) {                                                                  // 1659
        if (typeof this === 'undefined' || this === null) {                                                            // 1660
            throw new TypeError("can't convert " + this + ' to object');                                               // 1661
        }                                                                                                              // 1662
        var S = $String(this);                                                                                         // 1663
        var searchStr = $String(searchString);                                                                         // 1664
        var numPos = arguments.length > 1 ? $Number(arguments[1]) : NaN;                                               // 1665
        var pos = isActualNaN(numPos) ? Infinity : ES.ToInteger(numPos);                                               // 1666
        var start = min(max(pos, 0), S.length);                                                                        // 1667
        var searchLen = searchStr.length;                                                                              // 1668
        var k = start + searchLen;                                                                                     // 1669
        while (k > 0) {                                                                                                // 1670
            k = max(0, k - searchLen);                                                                                 // 1671
            var index = strIndexOf(strSlice(S, k, start + searchLen), searchStr);                                      // 1672
            if (index !== -1) {                                                                                        // 1673
                return k + index;                                                                                      // 1674
            }                                                                                                          // 1675
        }                                                                                                              // 1676
        return -1;                                                                                                     // 1677
    }                                                                                                                  // 1678
}, hasLastIndexBug);                                                                                                   // 1679
                                                                                                                       // 1680
var originalLastIndexOf = StringPrototype.lastIndexOf;                                                                 // 1681
defineProperties(StringPrototype, {                                                                                    // 1682
    lastIndexOf: function lastIndexOf(searchString) {                                                                  // 1683
        return originalLastIndexOf.apply(this, arguments);                                                             // 1684
    }                                                                                                                  // 1685
}, StringPrototype.lastIndexOf.length !== 1);                                                                          // 1686
                                                                                                                       // 1687
// ES-5 15.1.2.2                                                                                                       // 1688
/* eslint-disable radix */                                                                                             // 1689
if (parseInt(ws + '08') !== 8 || parseInt(ws + '0x16') !== 22) {                                                       // 1690
/* eslint-enable radix */                                                                                              // 1691
    /* global parseInt: true */                                                                                        // 1692
    parseInt = (function (origParseInt) {                                                                              // 1693
        var hexRegex = /^[\-+]?0[xX]/;                                                                                 // 1694
        return function parseInt(str, radix) {                                                                         // 1695
            var string = $String(str).trim();                                                                          // 1696
            var defaultedRadix = $Number(radix) || (hexRegex.test(string) ? 16 : 10);                                  // 1697
            return origParseInt(string, defaultedRadix);                                                               // 1698
        };                                                                                                             // 1699
    }(parseInt));                                                                                                      // 1700
}                                                                                                                      // 1701
                                                                                                                       // 1702
if (String(new RangeError('test')) !== 'RangeError: test') {                                                           // 1703
    var originalErrorToString = Error.prototype.toString;                                                              // 1704
    var errorToStringShim = function toString() {                                                                      // 1705
        if (typeof this === 'undefined' || this === null) {                                                            // 1706
            throw new TypeError("can't convert " + this + ' to object');                                               // 1707
        }                                                                                                              // 1708
        var name = this.name;                                                                                          // 1709
        if (typeof name === 'undefined') {                                                                             // 1710
            name = 'Error';                                                                                            // 1711
        } else if (typeof name !== 'string') {                                                                         // 1712
            name = $String(name);                                                                                      // 1713
        }                                                                                                              // 1714
        var msg = this.message;                                                                                        // 1715
        if (typeof msg === 'undefined') {                                                                              // 1716
            msg = '';                                                                                                  // 1717
        } else if (typeof msg !== 'string') {                                                                          // 1718
            msg = $String(msg);                                                                                        // 1719
        }                                                                                                              // 1720
        if (!name) {                                                                                                   // 1721
            return msg;                                                                                                // 1722
        }                                                                                                              // 1723
        if (!msg) {                                                                                                    // 1724
            return name;                                                                                               // 1725
        }                                                                                                              // 1726
        return name + ': ' + msg;                                                                                      // 1727
    };                                                                                                                 // 1728
    // can't use defineProperties here because of toString enumeration issue in IE <= 8                                // 1729
    Error.prototype.toString = errorToStringShim;                                                                      // 1730
}                                                                                                                      // 1731
                                                                                                                       // 1732
}));                                                                                                                   // 1733
                                                                                                                       // 1734
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/es5-shim/export_globals.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var global = this;                                                                                                     // 1
                                                                                                                       // 2
if (global.Date !== Date) {                                                                                            // 3
  global.Date = Date;                                                                                                  // 4
}                                                                                                                      // 5
                                                                                                                       // 6
if (global.parseInt !== parseInt) {                                                                                    // 7
  global.parseInt = parseInt;                                                                                          // 8
}                                                                                                                      // 9
                                                                                                                       // 10
var Sp = String.prototype;                                                                                             // 11
if (Sp.replace !== originalStringReplace) {                                                                            // 12
  // Restore the original value of String#replace, because the es5-shim                                                // 13
  // reimplementation is buggy. See also import_globals.js.                                                            // 14
  Sp.replace = originalStringReplace;                                                                                  // 15
}                                                                                                                      // 16
                                                                                                                       // 17
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['es5-shim'] = {}, {
  Date: Date,
  parseInt: parseInt
});

})();

//# sourceMappingURL=es5-shim.js.map
