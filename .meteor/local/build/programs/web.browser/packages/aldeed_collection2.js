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
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var _ = Package.underscore._;
var check = Package.check.check;
var Match = Package.check.Match;
var Mongo = Package.mongo.Mongo;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var EJSON = Package.ejson.EJSON;
var EventEmitter = Package['raix:eventemitter'].EventEmitter;

/* Package-scope variables */
var Collection2, Mongo;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/aldeed_collection2/lib/collection2.js                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Exported only for listening to events                                                                             // 1
Collection2 = new EventEmitter();                                                                                    // 2
                                                                                                                     // 3
// backwards compatibility                                                                                           // 4
if (typeof Mongo === "undefined") {                                                                                  // 5
  Mongo = {};                                                                                                        // 6
  Mongo.Collection = Meteor.Collection;                                                                              // 7
}                                                                                                                    // 8
                                                                                                                     // 9
/**                                                                                                                  // 10
 * Mongo.Collection.prototype.attachSchema                                                                           // 11
 * @param {SimpleSchema|Object} ss - SimpleSchema instance or a schema definition object                             // 12
 *    from which to create a new SimpleSchema instance                                                               // 13
 * @param {Object} [options]                                                                                         // 14
 * @param {Boolean} [options.transform=false] Set to `true` if your document must be passed                          // 15
 *    through the collection's transform to properly validate.                                                       // 16
 * @param {Boolean} [options.replace=false] Set to `true` to replace any existing schema instead of combining        // 17
 * @return {undefined}                                                                                               // 18
 *                                                                                                                   // 19
 * Use this method to attach a schema to a collection created by another package,                                    // 20
 * such as Meteor.users. It is most likely unsafe to call this method more than                                      // 21
 * once for a single collection, or to call this for a collection that had a                                         // 22
 * schema object passed to its constructor.                                                                          // 23
 */                                                                                                                  // 24
Mongo.Collection.prototype.attachSchema = function c2AttachSchema(ss, options) {                                     // 25
  var self = this;                                                                                                   // 26
  options = options || {};                                                                                           // 27
                                                                                                                     // 28
  // Allow passing just the schema object                                                                            // 29
  if (!(ss instanceof SimpleSchema)) {                                                                               // 30
    ss = new SimpleSchema(ss);                                                                                       // 31
  }                                                                                                                  // 32
                                                                                                                     // 33
  self._c2 = self._c2 || {};                                                                                         // 34
                                                                                                                     // 35
  // If we've already attached one schema, we combine both into a new schema unless options.replace is `true`        // 36
  if (self._c2._simpleSchema && options.replace !== true) {                                                          // 37
    ss = new SimpleSchema([self._c2._simpleSchema, ss]);                                                             // 38
  }                                                                                                                  // 39
                                                                                                                     // 40
  // Track the schema in the collection                                                                              // 41
  self._c2._simpleSchema = ss;                                                                                       // 42
                                                                                                                     // 43
  // Attach the schema to the underlying LocalCollection, too                                                        // 44
  if (self._collection instanceof LocalCollection) {                                                                 // 45
    self._collection._c2 = self._collection._c2 || {};                                                               // 46
    self._collection._c2._simpleSchema = ss;                                                                         // 47
  }                                                                                                                  // 48
                                                                                                                     // 49
  defineDeny(self, options);                                                                                         // 50
  keepInsecure(self);                                                                                                // 51
                                                                                                                     // 52
  Collection2.emit('schema.attached', self, ss, options);                                                            // 53
};                                                                                                                   // 54
                                                                                                                     // 55
_.each([Mongo.Collection, LocalCollection], function (obj) {                                                         // 56
  obj.prototype.simpleSchema = function () {                                                                         // 57
    var self = this;                                                                                                 // 58
    return self._c2 ? self._c2._simpleSchema : null;                                                                 // 59
  };                                                                                                                 // 60
});                                                                                                                  // 61
                                                                                                                     // 62
// Wrap DB write operation methods                                                                                   // 63
_.each(['insert', 'update'], function(methodName) {                                                                  // 64
  var _super = Mongo.Collection.prototype[methodName];                                                               // 65
  Mongo.Collection.prototype[methodName] = function() {                                                              // 66
    var self = this, options,                                                                                        // 67
        args = _.toArray(arguments);                                                                                 // 68
                                                                                                                     // 69
    options = (methodName === "insert") ? args[1] : args[2];                                                         // 70
                                                                                                                     // 71
    // Support missing options arg                                                                                   // 72
    if (!options || typeof options === "function") {                                                                 // 73
      options = {};                                                                                                  // 74
    }                                                                                                                // 75
                                                                                                                     // 76
    if (self._c2 && options.bypassCollection2 !== true) {                                                            // 77
      var userId = null;                                                                                             // 78
      try { // https://github.com/aldeed/meteor-collection2/issues/175                                               // 79
        userId = Meteor.userId();                                                                                    // 80
      } catch (err) {}                                                                                               // 81
                                                                                                                     // 82
      args = doValidate.call(                                                                                        // 83
        self,                                                                                                        // 84
        methodName,                                                                                                  // 85
        args,                                                                                                        // 86
        true, // getAutoValues                                                                                       // 87
        userId,                                                                                                      // 88
        Meteor.isServer // isFromTrustedCode                                                                         // 89
      );                                                                                                             // 90
      if (!args) {                                                                                                   // 91
        // doValidate already called the callback or threw the error so we're done.                                  // 92
        // But insert should always return an ID to match core behavior.                                             // 93
        return methodName === "insert" ? self._makeNewID() : undefined;                                              // 94
      }                                                                                                              // 95
    } else {                                                                                                         // 96
      // We still need to adjust args because insert does not take options                                           // 97
      if (methodName === "insert" && typeof args[1] !== 'function') args.splice(1, 1);                               // 98
    }                                                                                                                // 99
                                                                                                                     // 100
    return _super.apply(self, args);                                                                                 // 101
  };                                                                                                                 // 102
});                                                                                                                  // 103
                                                                                                                     // 104
/*                                                                                                                   // 105
 * Private                                                                                                           // 106
 */                                                                                                                  // 107
                                                                                                                     // 108
function doValidate(type, args, getAutoValues, userId, isFromTrustedCode) {                                          // 109
  var self = this, doc, callback, error, options, isUpsert, selector, last, hasCallback;                             // 110
                                                                                                                     // 111
  var schema = self.simpleSchema();                                                                                  // 112
  var isLocalCollection = (self._connection === null);                                                               // 113
                                                                                                                     // 114
  if (!args.length) {                                                                                                // 115
    throw new Error(type + " requires an argument");                                                                 // 116
  }                                                                                                                  // 117
                                                                                                                     // 118
  // Gather arguments and cache the selector                                                                         // 119
  if (type === "insert") {                                                                                           // 120
    doc = args[0];                                                                                                   // 121
    options = args[1];                                                                                               // 122
    callback = args[2];                                                                                              // 123
                                                                                                                     // 124
    // The real insert doesn't take options                                                                          // 125
    if (typeof options === "function") {                                                                             // 126
      args = [doc, options];                                                                                         // 127
    } else if (typeof callback === "function") {                                                                     // 128
      args = [doc, callback];                                                                                        // 129
    } else {                                                                                                         // 130
      args = [doc];                                                                                                  // 131
    }                                                                                                                // 132
                                                                                                                     // 133
  } else if (type === "update") {                                                                                    // 134
    selector = args[0];                                                                                              // 135
    doc = args[1];                                                                                                   // 136
    options = args[2];                                                                                               // 137
    callback = args[3];                                                                                              // 138
  } else {                                                                                                           // 139
    throw new Error("invalid type argument");                                                                        // 140
  }                                                                                                                  // 141
                                                                                                                     // 142
  // Support missing options arg                                                                                     // 143
  if (!callback && typeof options === "function") {                                                                  // 144
    callback = options;                                                                                              // 145
    options = {};                                                                                                    // 146
  }                                                                                                                  // 147
  options = options || {};                                                                                           // 148
                                                                                                                     // 149
  last = args.length - 1;                                                                                            // 150
                                                                                                                     // 151
  hasCallback = (typeof args[last] === 'function');                                                                  // 152
                                                                                                                     // 153
  // If update was called with upsert:true, flag as an upsert                                                        // 154
  isUpsert = (type === "update" && options.upsert === true);                                                         // 155
                                                                                                                     // 156
  // On the server and for local collections, we allow passing `getAutoValues: false` to disable autoValue functions
  if ((Meteor.isServer || isLocalCollection) && options.getAutoValues === false) {                                   // 158
    getAutoValues = false;                                                                                           // 159
  }                                                                                                                  // 160
                                                                                                                     // 161
  // Determine validation context                                                                                    // 162
  var validationContext = options.validationContext;                                                                 // 163
  if (validationContext) {                                                                                           // 164
    if (typeof validationContext === 'string') {                                                                     // 165
      validationContext = schema.namedContext(validationContext);                                                    // 166
    }                                                                                                                // 167
  } else {                                                                                                           // 168
    validationContext = schema.namedContext();                                                                       // 169
  }                                                                                                                  // 170
                                                                                                                     // 171
  // Add a default callback function if we're on the client and no callback was given                                // 172
  if (Meteor.isClient && !callback) {                                                                                // 173
    // Client can't block, so it can't report errors by exception,                                                   // 174
    // only by callback. If they forget the callback, give them a                                                    // 175
    // default one that logs the error, so they aren't totally                                                       // 176
    // baffled if their writes don't work because their database is                                                  // 177
    // down.                                                                                                         // 178
    callback = function(err) {                                                                                       // 179
      if (err) {                                                                                                     // 180
        Meteor._debug(type + " failed: " + (err.reason || err.stack));                                               // 181
      }                                                                                                              // 182
    };                                                                                                               // 183
  }                                                                                                                  // 184
                                                                                                                     // 185
  // If client validation is fine or is skipped but then something                                                   // 186
  // is found to be invalid on the server, we get that error back                                                    // 187
  // as a special Meteor.Error that we need to parse.                                                                // 188
  if (Meteor.isClient && hasCallback) {                                                                              // 189
    callback = args[last] = wrapCallbackForParsingServerErrors(validationContext, callback);                         // 190
  }                                                                                                                  // 191
                                                                                                                     // 192
  // Get the docId for passing in the autoValue/custom context                                                       // 193
  var docId;                                                                                                         // 194
  if (type === 'insert') {                                                                                           // 195
    docId = doc._id; // might be undefined                                                                           // 196
  } else if (type === "update" && selector) {                                                                        // 197
    docId = typeof selector === 'string' || selector instanceof Mongo.ObjectID ? selector : selector._id;            // 198
  }                                                                                                                  // 199
                                                                                                                     // 200
  // If _id has already been added, remove it temporarily if it's                                                    // 201
  // not explicitly defined in the schema.                                                                           // 202
  var cachedId;                                                                                                      // 203
  if (doc._id && !schema.allowsKey("_id")) {                                                                         // 204
    cachedId = doc._id;                                                                                              // 205
    delete doc._id;                                                                                                  // 206
  }                                                                                                                  // 207
                                                                                                                     // 208
  function doClean(docToClean, getAutoValues, filter, autoConvert, removeEmptyStrings, trimStrings) {                // 209
    // Clean the doc/modifier in place                                                                               // 210
    schema.clean(docToClean, {                                                                                       // 211
      filter: filter,                                                                                                // 212
      autoConvert: autoConvert,                                                                                      // 213
      getAutoValues: getAutoValues,                                                                                  // 214
      isModifier: (type !== "insert"),                                                                               // 215
      removeEmptyStrings: removeEmptyStrings,                                                                        // 216
      trimStrings: trimStrings,                                                                                      // 217
      extendAutoValueContext: _.extend({                                                                             // 218
        isInsert: (type === "insert"),                                                                               // 219
        isUpdate: (type === "update" && options.upsert !== true),                                                    // 220
        isUpsert: isUpsert,                                                                                          // 221
        userId: userId,                                                                                              // 222
        isFromTrustedCode: isFromTrustedCode,                                                                        // 223
        docId: docId,                                                                                                // 224
        isLocalCollection: isLocalCollection                                                                         // 225
      }, options.extendAutoValueContext || {})                                                                       // 226
    });                                                                                                              // 227
  }                                                                                                                  // 228
                                                                                                                     // 229
  // Preliminary cleaning on both client and server. On the server and for local                                     // 230
  // collections, automatic values will also be set at this point.                                                   // 231
  doClean(                                                                                                           // 232
    doc,                                                                                                             // 233
    getAutoValues,                                                                                                   // 234
    options.filter !== false,                                                                                        // 235
    options.autoConvert !== false,                                                                                   // 236
    options.removeEmptyStrings !== false,                                                                            // 237
    options.trimStrings !== false                                                                                    // 238
  );                                                                                                                 // 239
                                                                                                                     // 240
  // We clone before validating because in some cases we need to adjust the                                          // 241
  // object a bit before validating it. If we adjusted `doc` itself, our                                             // 242
  // changes would persist into the database.                                                                        // 243
  var docToValidate = {};                                                                                            // 244
  for (var prop in doc) {                                                                                            // 245
    // We omit prototype properties when cloning because they will not be valid                                      // 246
    // and mongo omits them when saving to the database anyway.                                                      // 247
    if (doc.hasOwnProperty(prop)) {                                                                                  // 248
      docToValidate[prop] = doc[prop];                                                                               // 249
    }                                                                                                                // 250
  }                                                                                                                  // 251
                                                                                                                     // 252
  // On the server, upserts are possible; SimpleSchema handles upserts pretty                                        // 253
  // well by default, but it will not know about the fields in the selector,                                         // 254
  // which are also stored in the database if an insert is performed. So we                                          // 255
  // will allow these fields to be considered for validation by adding them                                          // 256
  // to the $set in the modifier. This is no doubt prone to errors, but there                                        // 257
  // probably isn't any better way right now.                                                                        // 258
  if (Meteor.isServer && isUpsert && _.isObject(selector)) {                                                         // 259
    var set = docToValidate.$set || {};                                                                              // 260
    docToValidate.$set = _.omit(_.clone(selector), '_id');                                                           // 261
    _.extend(docToValidate.$set, set);                                                                               // 262
  }                                                                                                                  // 263
                                                                                                                     // 264
  // Set automatic values for validation on the client.                                                              // 265
  // On the server, we already updated doc with auto values, but on the client,                                      // 266
  // we will add them to docToValidate for validation purposes only.                                                 // 267
  // This is because we want all actual values generated on the server.                                              // 268
  if (Meteor.isClient && !isLocalCollection) {                                                                       // 269
    doClean(docToValidate, true, false, false, false, false);                                                        // 270
  }                                                                                                                  // 271
                                                                                                                     // 272
  // Validate doc                                                                                                    // 273
  var isValid;                                                                                                       // 274
  if (options.validate === false) {                                                                                  // 275
    isValid = true;                                                                                                  // 276
  } else {                                                                                                           // 277
    isValid = validationContext.validate(docToValidate, {                                                            // 278
      modifier: (type === "update" || type === "upsert"),                                                            // 279
      upsert: isUpsert,                                                                                              // 280
      extendedCustomContext: _.extend({                                                                              // 281
        isInsert: (type === "insert"),                                                                               // 282
        isUpdate: (type === "update" && options.upsert !== true),                                                    // 283
        isUpsert: isUpsert,                                                                                          // 284
        userId: userId,                                                                                              // 285
        isFromTrustedCode: isFromTrustedCode,                                                                        // 286
        docId: docId,                                                                                                // 287
        isLocalCollection: isLocalCollection                                                                         // 288
      }, options.extendedCustomContext || {})                                                                        // 289
    });                                                                                                              // 290
  }                                                                                                                  // 291
                                                                                                                     // 292
  if (isValid) {                                                                                                     // 293
    // Add the ID back                                                                                               // 294
    if (cachedId) {                                                                                                  // 295
      doc._id = cachedId;                                                                                            // 296
    }                                                                                                                // 297
                                                                                                                     // 298
    // Update the args to reflect the cleaned doc                                                                    // 299
    // XXX not sure this is necessary since we mutate                                                                // 300
    if (type === "insert") {                                                                                         // 301
      args[0] = doc;                                                                                                 // 302
    } else {                                                                                                         // 303
      args[1] = doc;                                                                                                 // 304
    }                                                                                                                // 305
                                                                                                                     // 306
    // If callback, set invalidKey when we get a mongo unique error                                                  // 307
    if (Meteor.isServer && hasCallback) {                                                                            // 308
      args[last] = wrapCallbackForParsingMongoValidationErrors(validationContext, args[last]);                       // 309
    }                                                                                                                // 310
                                                                                                                     // 311
    return args;                                                                                                     // 312
  } else {                                                                                                           // 313
    error = getErrorObject(validationContext);                                                                       // 314
    if (callback) {                                                                                                  // 315
      // insert/update/upsert pass `false` when there's an error, so we do that                                      // 316
      callback(error, false);                                                                                        // 317
    } else {                                                                                                         // 318
      throw error;                                                                                                   // 319
    }                                                                                                                // 320
  }                                                                                                                  // 321
}                                                                                                                    // 322
                                                                                                                     // 323
function getErrorObject(context) {                                                                                   // 324
  var message, invalidKeys = context.invalidKeys();                                                                  // 325
  if (invalidKeys.length) {                                                                                          // 326
    message = context.keyErrorMessage(invalidKeys[0].name);                                                          // 327
  } else {                                                                                                           // 328
    message = "Failed validation";                                                                                   // 329
  }                                                                                                                  // 330
  var error = new Error(message);                                                                                    // 331
  error.invalidKeys = invalidKeys;                                                                                   // 332
  error.validationContext = context;                                                                                 // 333
  // If on the server, we add a sanitized error, too, in case we're                                                  // 334
  // called from a method.                                                                                           // 335
  if (Meteor.isServer) {                                                                                             // 336
    error.sanitizedError = new Meteor.Error(400, message, EJSON.stringify(error.invalidKeys));                       // 337
  }                                                                                                                  // 338
  return error;                                                                                                      // 339
}                                                                                                                    // 340
                                                                                                                     // 341
function addUniqueError(context, errorMessage) {                                                                     // 342
  var name = errorMessage.split('c2_')[1].split(' ')[0];                                                             // 343
  var val = errorMessage.split('dup key:')[1].split('"')[1];                                                         // 344
  context.addInvalidKeys([{                                                                                          // 345
    name: name,                                                                                                      // 346
    type: 'notUnique',                                                                                               // 347
    value: val                                                                                                       // 348
  }]);                                                                                                               // 349
}                                                                                                                    // 350
                                                                                                                     // 351
function wrapCallbackForParsingMongoValidationErrors(validationContext, cb) {                                        // 352
  return function wrappedCallbackForParsingMongoValidationErrors(error) {                                            // 353
    var args = _.toArray(arguments);                                                                                 // 354
    if (error &&                                                                                                     // 355
        ((error.name === "MongoError" && error.code === 11001) || error.message.indexOf('MongoError: E11000' !== -1)) &&
        error.message.indexOf('c2_') !== -1) {                                                                       // 357
      addUniqueError(validationContext, error.message);                                                              // 358
      args[0] = getErrorObject(validationContext);                                                                   // 359
    }                                                                                                                // 360
    return cb.apply(this, args);                                                                                     // 361
  };                                                                                                                 // 362
}                                                                                                                    // 363
                                                                                                                     // 364
function wrapCallbackForParsingServerErrors(validationContext, cb) {                                                 // 365
  return function wrappedCallbackForParsingServerErrors(error) {                                                     // 366
    var args = _.toArray(arguments);                                                                                 // 367
    // Handle our own validation errors                                                                              // 368
    if (error instanceof Meteor.Error &&                                                                             // 369
        error.error === 400 &&                                                                                       // 370
        error.reason === "INVALID" &&                                                                                // 371
        typeof error.details === "string") {                                                                         // 372
      var invalidKeysFromServer = EJSON.parse(error.details);                                                        // 373
      validationContext.addInvalidKeys(invalidKeysFromServer);                                                       // 374
      args[0] = getErrorObject(validationContext);                                                                   // 375
    }                                                                                                                // 376
    // Handle Mongo unique index errors, which are forwarded to the client as 409 errors                             // 377
    else if (error instanceof Meteor.Error &&                                                                        // 378
             error.error === 409 &&                                                                                  // 379
             error.reason &&                                                                                         // 380
             error.reason.indexOf('E11000') !== -1 &&                                                                // 381
             error.reason.indexOf('c2_') !== -1) {                                                                   // 382
      addUniqueError(validationContext, error.reason);                                                               // 383
      args[0] = getErrorObject(validationContext);                                                                   // 384
    }                                                                                                                // 385
    return cb.apply(this, args);                                                                                     // 386
  };                                                                                                                 // 387
}                                                                                                                    // 388
                                                                                                                     // 389
var alreadyInsecured = {};                                                                                           // 390
function keepInsecure(c) {                                                                                           // 391
  // If insecure package is in use, we need to add allow rules that return                                           // 392
  // true. Otherwise, it would seemingly turn off insecure mode.                                                     // 393
  if (Package && Package.insecure && !alreadyInsecured[c._name]) {                                                   // 394
    c.allow({                                                                                                        // 395
      insert: function() {                                                                                           // 396
        return true;                                                                                                 // 397
      },                                                                                                             // 398
      update: function() {                                                                                           // 399
        return true;                                                                                                 // 400
      },                                                                                                             // 401
      remove: function () {                                                                                          // 402
        return true;                                                                                                 // 403
      },                                                                                                             // 404
      fetch: [],                                                                                                     // 405
      transform: null                                                                                                // 406
    });                                                                                                              // 407
    alreadyInsecured[c._name] = true;                                                                                // 408
  }                                                                                                                  // 409
  // If insecure package is NOT in use, then adding the two deny functions                                           // 410
  // does not have any effect on the main app's security paradigm. The                                               // 411
  // user will still be required to add at least one allow function of her                                           // 412
  // own for each operation for this collection. And the user may still add                                          // 413
  // additional deny functions, but does not have to.                                                                // 414
}                                                                                                                    // 415
                                                                                                                     // 416
var alreadyDefined = {};                                                                                             // 417
function defineDeny(c, options) {                                                                                    // 418
  if (!alreadyDefined[c._name]) {                                                                                    // 419
                                                                                                                     // 420
    var isLocalCollection = (c._connection === null);                                                                // 421
                                                                                                                     // 422
    // First define deny functions to extend doc with the results of clean                                           // 423
    // and autovalues. This must be done with "transform: null" or we would be                                       // 424
    // extending a clone of doc and therefore have no effect.                                                        // 425
    c.deny({                                                                                                         // 426
      insert: function(userId, doc) {                                                                                // 427
        var ss = c.simpleSchema();                                                                                   // 428
        // If _id has already been added, remove it temporarily if it's                                              // 429
        // not explicitly defined in the schema.                                                                     // 430
        var id;                                                                                                      // 431
        if (Meteor.isServer && doc._id && !ss.allowsKey("_id")) {                                                    // 432
          id = doc._id;                                                                                              // 433
          delete doc._id;                                                                                            // 434
        }                                                                                                            // 435
                                                                                                                     // 436
        // Referenced doc is cleaned in place                                                                        // 437
        ss.clean(doc, {                                                                                              // 438
          isModifier: false,                                                                                         // 439
          // We don't do these here because they are done on the client if desired                                   // 440
          filter: false,                                                                                             // 441
          autoConvert: false,                                                                                        // 442
          removeEmptyStrings: false,                                                                                 // 443
          trimStrings: false,                                                                                        // 444
          extendAutoValueContext: {                                                                                  // 445
            isInsert: true,                                                                                          // 446
            isUpdate: false,                                                                                         // 447
            isUpsert: false,                                                                                         // 448
            userId: userId,                                                                                          // 449
            isFromTrustedCode: false,                                                                                // 450
            docId: id,                                                                                               // 451
            isLocalCollection: isLocalCollection                                                                     // 452
          }                                                                                                          // 453
        });                                                                                                          // 454
                                                                                                                     // 455
        // Add the ID back                                                                                           // 456
        if (id) {                                                                                                    // 457
          doc._id = id;                                                                                              // 458
        }                                                                                                            // 459
                                                                                                                     // 460
        return false;                                                                                                // 461
      },                                                                                                             // 462
      update: function(userId, doc, fields, modifier) {                                                              // 463
        var ss = c.simpleSchema();                                                                                   // 464
        // Referenced modifier is cleaned in place                                                                   // 465
        ss.clean(modifier, {                                                                                         // 466
          isModifier: true,                                                                                          // 467
          // We don't do these here because they are done on the client if desired                                   // 468
          filter: false,                                                                                             // 469
          autoConvert: false,                                                                                        // 470
          removeEmptyStrings: false,                                                                                 // 471
          trimStrings: false,                                                                                        // 472
          extendAutoValueContext: {                                                                                  // 473
            isInsert: false,                                                                                         // 474
            isUpdate: true,                                                                                          // 475
            isUpsert: false,                                                                                         // 476
            userId: userId,                                                                                          // 477
            isFromTrustedCode: false,                                                                                // 478
            docId: doc && doc._id,                                                                                   // 479
            isLocalCollection: isLocalCollection                                                                     // 480
          }                                                                                                          // 481
        });                                                                                                          // 482
                                                                                                                     // 483
        return false;                                                                                                // 484
      },                                                                                                             // 485
      fetch: ['_id'],                                                                                                // 486
      transform: null                                                                                                // 487
    });                                                                                                              // 488
                                                                                                                     // 489
    // Second define deny functions to validate again on the server                                                  // 490
    // for client-initiated inserts and updates. These should be                                                     // 491
    // called after the clean/autovalue functions since we're adding                                                 // 492
    // them after. These must *not* have "transform: null" if options.transform is true because                      // 493
    // we need to pass the doc through any transforms to be sure                                                     // 494
    // that custom types are properly recognized for type validation.                                                // 495
    c.deny(_.extend({                                                                                                // 496
      insert: function(userId, doc) {                                                                                // 497
        // We pass the false options because we will have done them on client if desired                             // 498
        doValidate.call(                                                                                             // 499
          c,                                                                                                         // 500
          "insert",                                                                                                  // 501
          [                                                                                                          // 502
            doc,                                                                                                     // 503
            {                                                                                                        // 504
              trimStrings: false,                                                                                    // 505
              removeEmptyStrings: false,                                                                             // 506
              filter: false,                                                                                         // 507
              autoConvert: false                                                                                     // 508
            },                                                                                                       // 509
            function(error) {                                                                                        // 510
              if (error) {                                                                                           // 511
                throw new Meteor.Error(400, 'INVALID', EJSON.stringify(error.invalidKeys));                          // 512
              }                                                                                                      // 513
            }                                                                                                        // 514
          ],                                                                                                         // 515
          false, // getAutoValues                                                                                    // 516
          userId,                                                                                                    // 517
          false // isFromTrustedCode                                                                                 // 518
        );                                                                                                           // 519
                                                                                                                     // 520
        return false;                                                                                                // 521
      },                                                                                                             // 522
      update: function(userId, doc, fields, modifier) {                                                              // 523
        // NOTE: This will never be an upsert because client-side upserts                                            // 524
        // are not allowed once you define allow/deny functions.                                                     // 525
        // We pass the false options because we will have done them on client if desired                             // 526
        doValidate.call(                                                                                             // 527
          c,                                                                                                         // 528
          "update",                                                                                                  // 529
          [                                                                                                          // 530
            {_id: doc && doc._id},                                                                                   // 531
            modifier,                                                                                                // 532
            {                                                                                                        // 533
              trimStrings: false,                                                                                    // 534
              removeEmptyStrings: false,                                                                             // 535
              filter: false,                                                                                         // 536
              autoConvert: false                                                                                     // 537
            },                                                                                                       // 538
            function(error) {                                                                                        // 539
              if (error) {                                                                                           // 540
                throw new Meteor.Error(400, 'INVALID', EJSON.stringify(error.invalidKeys));                          // 541
              }                                                                                                      // 542
            }                                                                                                        // 543
          ],                                                                                                         // 544
          false, // getAutoValues                                                                                    // 545
          userId,                                                                                                    // 546
          false // isFromTrustedCode                                                                                 // 547
        );                                                                                                           // 548
                                                                                                                     // 549
        return false;                                                                                                // 550
      },                                                                                                             // 551
      fetch: ['_id']                                                                                                 // 552
    }, options.transform === true ? {} : {transform: null}));                                                        // 553
                                                                                                                     // 554
    // note that we've already done this collection so that we don't do it again                                     // 555
    // if attachSchema is called again                                                                               // 556
    alreadyDefined[c._name] = true;                                                                                  // 557
  }                                                                                                                  // 558
}                                                                                                                    // 559
                                                                                                                     // 560
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/aldeed_collection2/lib/deny.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Extend the schema options allowed by SimpleSchema                                                                 // 1
SimpleSchema.extendOptions({                                                                                         // 2
  denyInsert: Match.Optional(Boolean),                                                                               // 3
  denyUpdate: Match.Optional(Boolean),                                                                               // 4
});                                                                                                                  // 5
                                                                                                                     // 6
// Define validation error messages                                                                                  // 7
SimpleSchema.messages({                                                                                              // 8
  insertNotAllowed: "[label] cannot be set during an insert",                                                        // 9
  updateNotAllowed: "[label] cannot be set during an update"                                                         // 10
});                                                                                                                  // 11
                                                                                                                     // 12
Collection2.on('schema.attached', function (collection, ss) {                                                        // 13
  ss.validator(function() {                                                                                          // 14
    var def = this.definition;                                                                                       // 15
    var val = this.value;                                                                                            // 16
    var op = this.operator;                                                                                          // 17
                                                                                                                     // 18
    if (def.denyInsert && val !== void 0 && !op) {                                                                   // 19
      // This is an insert of a defined value into a field where denyInsert=true                                     // 20
      return "insertNotAllowed";                                                                                     // 21
    }                                                                                                                // 22
                                                                                                                     // 23
    if (def.denyUpdate && op) {                                                                                      // 24
      // This is an insert of a defined value into a field where denyUpdate=true                                     // 25
      if (op !== "$set" || (op === "$set" && val !== void 0)) {                                                      // 26
        return "updateNotAllowed";                                                                                   // 27
      }                                                                                                              // 28
    }                                                                                                                // 29
                                                                                                                     // 30
    return true;                                                                                                     // 31
  });                                                                                                                // 32
});                                                                                                                  // 33
                                                                                                                     // 34
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/aldeed_collection2/lib/indexing.js                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Extend the schema options allowed by SimpleSchema                                                                 // 1
SimpleSchema.extendOptions({                                                                                         // 2
  index: Match.Optional(Match.OneOf(Number, String, Boolean)),                                                       // 3
  unique: Match.Optional(Boolean),                                                                                   // 4
  sparse: Match.Optional(Boolean),                                                                                   // 5
});                                                                                                                  // 6
                                                                                                                     // 7
// Define validation error messages                                                                                  // 8
SimpleSchema.messages({                                                                                              // 9
  notUnique: "[label] must be unique",                                                                               // 10
});                                                                                                                  // 11
                                                                                                                     // 12
if (Meteor.isServer) {                                                                                               // 13
  Collection2.on('schema.attached', function (collection, ss) {                                                      // 14
    function ensureIndex(index, indexName, unique, sparse) {                                                         // 15
      Meteor.startup(function () {                                                                                   // 16
        collection._collection._ensureIndex(index, {                                                                 // 17
          background: true,                                                                                          // 18
          name: indexName,                                                                                           // 19
          unique: unique,                                                                                            // 20
          sparse: sparse                                                                                             // 21
        });                                                                                                          // 22
      });                                                                                                            // 23
    }                                                                                                                // 24
                                                                                                                     // 25
    function dropIndex(indexName) {                                                                                  // 26
      Meteor.startup(function () {                                                                                   // 27
        try {                                                                                                        // 28
          collection._collection._dropIndex(indexName);                                                              // 29
        } catch (err) {                                                                                              // 30
          // no index with that name, which is what we want                                                          // 31
        }                                                                                                            // 32
      });                                                                                                            // 33
    }                                                                                                                // 34
                                                                                                                     // 35
    // Loop over fields definitions and ensure collection indexes (server side only)                                 // 36
    _.each(ss.schema(), function(definition, fieldName) {                                                            // 37
      if ('index' in definition || definition.unique === true) {                                                     // 38
        var index = {}, indexValue;                                                                                  // 39
        // If they specified `unique: true` but not `index`,                                                         // 40
        // we assume `index: 1` to set up the unique index in mongo                                                  // 41
        if ('index' in definition) {                                                                                 // 42
          indexValue = definition.index;                                                                             // 43
          if (indexValue === true) indexValue = 1;                                                                   // 44
        } else {                                                                                                     // 45
          indexValue = 1;                                                                                            // 46
        }                                                                                                            // 47
        var indexName = 'c2_' + fieldName;                                                                           // 48
        // In the index object, we want object array keys without the ".$" piece                                     // 49
        var idxFieldName = fieldName.replace(/\.\$\./g, ".");                                                        // 50
        index[idxFieldName] = indexValue;                                                                            // 51
        var unique = !!definition.unique && (indexValue === 1 || indexValue === -1);                                 // 52
        var sparse = definition.sparse || false;                                                                     // 53
                                                                                                                     // 54
        // If unique and optional, force sparse to prevent errors                                                    // 55
        if (!sparse && unique && definition.optional) sparse = true;                                                 // 56
                                                                                                                     // 57
        if (indexValue === false) {                                                                                  // 58
          dropIndex(indexName);                                                                                      // 59
        } else {                                                                                                     // 60
          ensureIndex(index, indexName, unique, sparse);                                                             // 61
        }                                                                                                            // 62
      }                                                                                                              // 63
    });                                                                                                              // 64
  });                                                                                                                // 65
}                                                                                                                    // 66
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['aldeed:collection2'] = {}, {
  Collection2: Collection2
});

})();
