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
var AllowDeny = Package['allow-deny'].AllowDeny;
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var _ = Package.underscore._;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var DDP = Package['ddp-client'].DDP;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var DiffSequence = Package['diff-sequence'].DiffSequence;
var MongoID = Package['mongo-id'].MongoID;
var check = Package.check.check;
var Match = Package.check.Match;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var regeneratorRuntime = Package['ecmascript-runtime'].regeneratorRuntime;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var LocalCollectionDriver, Mongo, DocFetcher, MongoInternals, MongoTest, MongoConnection, CursorDescription, Cursor, listenAll, forEachTrigger, ObserveMultiplexer, ObserveHandle, OplogObserveDriver, OPLOG_COLLECTION, idForOp, OplogHandle, PollingObserveDriver;

var require = meteorInstall({"node_modules":{"meteor":{"mongo":{"local_collection_driver.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/mongo/local_collection_driver.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
LocalCollectionDriver = function () {                                                                                  // 1
  var self = this;                                                                                                     // 2
  self.noConnCollections = {};                                                                                         // 3
};                                                                                                                     //
                                                                                                                       //
var ensureCollection = function (name, collections) {                                                                  // 6
  if (!(name in collections)) collections[name] = new LocalCollection(name);                                           // 7
  return collections[name];                                                                                            // 9
};                                                                                                                     //
                                                                                                                       //
_.extend(LocalCollectionDriver.prototype, {                                                                            // 12
  open: function (name, conn) {                                                                                        // 13
    var self = this;                                                                                                   // 14
    if (!name) return new LocalCollection();                                                                           // 15
    if (!conn) {                                                                                                       // 17
      return ensureCollection(name, self.noConnCollections);                                                           // 18
    }                                                                                                                  //
    if (!conn._mongo_livedata_collections) conn._mongo_livedata_collections = {};                                      // 20
    // XXX is there a way to keep track of a connection's collections without                                          //
    // dangling it off the connection object?                                                                          //
    return ensureCollection(name, conn._mongo_livedata_collections);                                                   // 24
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
// singleton                                                                                                           //
LocalCollectionDriver = new LocalCollectionDriver();                                                                   // 29
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"collection.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/mongo/collection.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// options.connection, if given, is a LivedataClient or LivedataServer                                                 //
// XXX presently there is no way to destroy/clean up a Collection                                                      //
                                                                                                                       //
/**                                                                                                                    //
 * @summary Namespace for MongoDB-related items                                                                        //
 * @namespace                                                                                                          //
 */                                                                                                                    //
Mongo = {};                                                                                                            // 8
                                                                                                                       //
/**                                                                                                                    //
 * @summary Constructor for a Collection                                                                               //
 * @locus Anywhere                                                                                                     //
 * @instancename collection                                                                                            //
 * @class                                                                                                              //
 * @param {String} name The name of the collection.  If null, creates an unmanaged (unsynchronized) local collection.  //
 * @param {Object} [options]                                                                                           //
 * @param {Object} options.connection The server connection that will manage this collection. Uses the default connection if not specified.  Pass the return value of calling [`DDP.connect`](#ddp_connect) to specify a different server. Pass `null` to specify no connection. Unmanaged (`name` is null) collections cannot specify a connection.
 * @param {String} options.idGeneration The method of generating the `_id` fields of new documents in this collection.  Possible values:
                                                                                                                       //
 - **`'STRING'`**: random strings                                                                                      //
 - **`'MONGO'`**:  random [`Mongo.ObjectID`](#mongo_object_id) values                                                  //
                                                                                                                       //
The default id generation technique is `'STRING'`.                                                                     //
 * @param {Function} options.transform An optional transformation function. Documents will be passed through this function before being returned from `fetch` or `findOne`, and before being passed to callbacks of `observe`, `map`, `forEach`, `allow`, and `deny`. Transforms are *not* applied for the callbacks of `observeChanges` or to cursors returned from publish functions.
 */                                                                                                                    //
Mongo.Collection = function (name, options) {                                                                          // 26
  var self = this;                                                                                                     // 27
  if (!(self instanceof Mongo.Collection)) throw new Error('use "new" to construct a Mongo.Collection');               // 28
                                                                                                                       //
  if (!name && name !== null) {                                                                                        // 31
    Meteor._debug("Warning: creating anonymous collection. It will not be " + "saved or synchronized over the network. (Pass null for " + "the collection name to turn off this warning.)");
    name = null;                                                                                                       // 35
  }                                                                                                                    //
                                                                                                                       //
  if (name !== null && typeof name !== "string") {                                                                     // 38
    throw new Error("First argument to new Mongo.Collection must be a string or null");                                // 39
  }                                                                                                                    //
                                                                                                                       //
  if (options && options.methods) {                                                                                    // 43
    // Backwards compatibility hack with original signature (which passed                                              //
    // "connection" directly instead of in options. (Connections must have a "methods"                                 //
    // method.)                                                                                                        //
    // XXX remove before 1.0                                                                                           //
    options = { connection: options };                                                                                 // 48
  }                                                                                                                    //
  // Backwards compatibility: "connection" used to be called "manager".                                                //
  if (options && options.manager && !options.connection) {                                                             // 51
    options.connection = options.manager;                                                                              // 52
  }                                                                                                                    //
  options = _.extend({                                                                                                 // 54
    connection: undefined,                                                                                             // 55
    idGeneration: 'STRING',                                                                                            // 56
    transform: null,                                                                                                   // 57
    _driver: undefined,                                                                                                // 58
    _preventAutopublish: false                                                                                         // 59
  }, options);                                                                                                         //
                                                                                                                       //
  switch (options.idGeneration) {                                                                                      // 62
    case 'MONGO':                                                                                                      // 63
      self._makeNewID = function () {                                                                                  // 64
        var src = name ? DDP.randomStream('/collection/' + name) : Random.insecure;                                    // 65
        return new Mongo.ObjectID(src.hexString(24));                                                                  // 68
      };                                                                                                               //
      break;                                                                                                           // 70
    case 'STRING':                                                                                                     // 70
    default:                                                                                                           // 72
      self._makeNewID = function () {                                                                                  // 73
        var src = name ? DDP.randomStream('/collection/' + name) : Random.insecure;                                    // 74
        return src.id();                                                                                               // 77
      };                                                                                                               //
      break;                                                                                                           // 79
  }                                                                                                                    // 79
                                                                                                                       //
  self._transform = LocalCollection.wrapTransform(options.transform);                                                  // 82
                                                                                                                       //
  if (!name || options.connection === null)                                                                            // 84
    // note: nameless collections never have a connection                                                              //
    self._connection = null;else if (options.connection) self._connection = options.connection;else if (Meteor.isClient) self._connection = Meteor.connection;else self._connection = Meteor.server;
                                                                                                                       //
  if (!options._driver) {                                                                                              // 94
    // XXX This check assumes that webapp is loaded so that Meteor.server !==                                          //
    // null. We should fully support the case of "want to use a Mongo-backed                                           //
    // collection from Node code without webapp", but we don't yet.                                                    //
    // #MeteorServerNull                                                                                               //
    if (name && self._connection === Meteor.server && typeof MongoInternals !== "undefined" && MongoInternals.defaultRemoteCollectionDriver) {
      options._driver = MongoInternals.defaultRemoteCollectionDriver();                                                // 102
    } else {                                                                                                           //
      options._driver = LocalCollectionDriver;                                                                         // 104
    }                                                                                                                  //
  }                                                                                                                    //
                                                                                                                       //
  self._collection = options._driver.open(name, self._connection);                                                     // 108
  self._name = name;                                                                                                   // 109
  self._driver = options._driver;                                                                                      // 110
                                                                                                                       //
  if (self._connection && self._connection.registerStore) {                                                            // 112
    // OK, we're going to be a slave, replicating some remote                                                          //
    // database, except possibly with some temporary divergence while                                                  //
    // we have unacknowledged RPC's.                                                                                   //
    var ok = self._connection.registerStore(name, {                                                                    // 116
      // Called at the beginning of a batch of updates. batchSize is the number                                        //
      // of update calls to expect.                                                                                    //
      //                                                                                                               //
      // XXX This interface is pretty janky. reset probably ought to go back to                                        //
      // being its own function, and callers shouldn't have to calculate                                               //
      // batchSize. The optimization of not calling pause/remove should be                                             //
      // delayed until later: the first call to update() should buffer its                                             //
      // message, and then we can either directly apply it at endUpdate time if                                        //
      // it was the only update, or do pauseObservers/apply/apply at the next                                          //
      // update() if there's another one.                                                                              //
      beginUpdate: function (batchSize, reset) {                                                                       // 127
        // pause observers so users don't see flicker when updating several                                            //
        // objects at once (including the post-reconnect reset-and-reapply                                             //
        // stage), and so that a re-sorting of a query can take advantage of the                                       //
        // full _diffQuery moved calculation instead of applying change one at a                                       //
        // time.                                                                                                       //
        if (batchSize > 1 || reset) self._collection.pauseObservers();                                                 // 133
                                                                                                                       //
        if (reset) self._collection.remove({});                                                                        // 136
      },                                                                                                               //
                                                                                                                       //
      // Apply an update.                                                                                              //
      // XXX better specify this interface (not in terms of a wire message)?                                           //
      update: function (msg) {                                                                                         // 142
        var mongoId = MongoID.idParse(msg.id);                                                                         // 143
        var doc = self._collection.findOne(mongoId);                                                                   // 144
                                                                                                                       //
        // Is this a "replace the whole doc" message coming from the quiescence                                        //
        // of method writes to an object? (Note that 'undefined' is a valid                                            //
        // value meaning "remove it".)                                                                                 //
        if (msg.msg === 'replace') {                                                                                   // 149
          var replace = msg.replace;                                                                                   // 150
          if (!replace) {                                                                                              // 151
            if (doc) self._collection.remove(mongoId);                                                                 // 152
          } else if (!doc) {                                                                                           //
            self._collection.insert(replace);                                                                          // 155
          } else {                                                                                                     //
            // XXX check that replace has no $ ops                                                                     //
            self._collection.update(mongoId, replace);                                                                 // 158
          }                                                                                                            //
          return;                                                                                                      // 160
        } else if (msg.msg === 'added') {                                                                              //
          if (doc) {                                                                                                   // 162
            throw new Error("Expected not to find a document already present for an add");                             // 163
          }                                                                                                            //
          self._collection.insert(_.extend({ _id: mongoId }, msg.fields));                                             // 165
        } else if (msg.msg === 'removed') {                                                                            //
          if (!doc) throw new Error("Expected to find a document already present for removed");                        // 167
          self._collection.remove(mongoId);                                                                            // 169
        } else if (msg.msg === 'changed') {                                                                            //
          if (!doc) throw new Error("Expected to find a document to change");                                          // 171
          if (!_.isEmpty(msg.fields)) {                                                                                // 173
            var modifier = {};                                                                                         // 174
            _.each(msg.fields, function (value, key) {                                                                 // 175
              if (value === undefined) {                                                                               // 176
                if (!modifier.$unset) modifier.$unset = {};                                                            // 177
                modifier.$unset[key] = 1;                                                                              // 179
              } else {                                                                                                 //
                if (!modifier.$set) modifier.$set = {};                                                                // 181
                modifier.$set[key] = value;                                                                            // 183
              }                                                                                                        //
            });                                                                                                        //
            self._collection.update(mongoId, modifier);                                                                // 186
          }                                                                                                            //
        } else {                                                                                                       //
          throw new Error("I don't know how to deal with this message");                                               // 189
        }                                                                                                              //
      },                                                                                                               //
                                                                                                                       //
      // Called at the end of a batch of updates.                                                                      //
      endUpdate: function () {                                                                                         // 195
        self._collection.resumeObservers();                                                                            // 196
      },                                                                                                               //
                                                                                                                       //
      // Called around method stub invocations to capture the original versions                                        //
      // of modified documents.                                                                                        //
      saveOriginals: function () {                                                                                     // 201
        self._collection.saveOriginals();                                                                              // 202
      },                                                                                                               //
      retrieveOriginals: function () {                                                                                 // 204
        return self._collection.retrieveOriginals();                                                                   // 205
      },                                                                                                               //
                                                                                                                       //
      // Used to preserve current versions of documents across a store reset.                                          //
      getDoc: function (id) {                                                                                          // 209
        return self.findOne(id);                                                                                       // 210
      }                                                                                                                //
    });                                                                                                                //
                                                                                                                       //
    if (!ok) throw new Error("There is already a collection named '" + name + "'");                                    // 214
  }                                                                                                                    //
                                                                                                                       //
  // XXX don't define these until allow or deny is actually used for this                                              //
  // collection. Could be hard if the security rules are only defined on the                                           //
  // server.                                                                                                           //
  self._defineMutationMethods();                                                                                       // 221
                                                                                                                       //
  // autopublish                                                                                                       //
  if (Package.autopublish && !options._preventAutopublish && self._connection && self._connection.publish) {           // 224
    self._connection.publish(null, function () {                                                                       // 226
      return self.find();                                                                                              // 227
    }, { is_auto: true });                                                                                             //
  }                                                                                                                    //
};                                                                                                                     //
                                                                                                                       //
///                                                                                                                    //
/// Main collection API                                                                                                //
///                                                                                                                    //
                                                                                                                       //
_.extend(Mongo.Collection.prototype, {                                                                                 // 237
                                                                                                                       //
  _getFindSelector: function (args) {                                                                                  // 239
    if (args.length == 0) return {};else return args[0];                                                               // 240
  },                                                                                                                   //
                                                                                                                       //
  _getFindOptions: function (args) {                                                                                   // 246
    var self = this;                                                                                                   // 247
    if (args.length < 2) {                                                                                             // 248
      return { transform: self._transform };                                                                           // 249
    } else {                                                                                                           //
      check(args[1], Match.Optional(Match.ObjectIncluding({                                                            // 251
        fields: Match.Optional(Match.OneOf(Object, undefined)),                                                        // 252
        sort: Match.Optional(Match.OneOf(Object, Array, undefined)),                                                   // 253
        limit: Match.Optional(Match.OneOf(Number, undefined)),                                                         // 254
        skip: Match.Optional(Match.OneOf(Number, undefined))                                                           // 255
      })));                                                                                                            //
                                                                                                                       //
      return _.extend({                                                                                                // 258
        transform: self._transform                                                                                     // 259
      }, args[1]);                                                                                                     //
    }                                                                                                                  //
  },                                                                                                                   //
                                                                                                                       //
  /**                                                                                                                  //
   * @summary Find the documents in a collection that match the selector.                                              //
   * @locus Anywhere                                                                                                   //
   * @method find                                                                                                      //
   * @memberOf Mongo.Collection                                                                                        //
   * @instance                                                                                                         //
   * @param {MongoSelector} [selector] A query describing the documents to find                                        //
   * @param {Object} [options]                                                                                         //
   * @param {MongoSortSpecifier} options.sort Sort order (default: natural order)                                      //
   * @param {Number} options.skip Number of results to skip at the beginning                                           //
   * @param {Number} options.limit Maximum number of results to return                                                 //
   * @param {MongoFieldSpecifier} options.fields Dictionary of fields to return or exclude.                            //
   * @param {Boolean} options.reactive (Client only) Default `true`; pass `false` to disable reactivity                //
   * @param {Function} options.transform Overrides `transform` on the  [`Collection`](#collections) for this cursor.  Pass `null` to disable transformation.
   * @returns {Mongo.Cursor}                                                                                           //
   */                                                                                                                  //
  find: function () /* selector, options */{                                                                           // 280
    // Collection.find() (return all docs) behaves differently                                                         //
    // from Collection.find(undefined) (return 0 docs).  so be                                                         //
    // careful about the length of arguments.                                                                          //
    var self = this;                                                                                                   // 284
    var argArray = _.toArray(arguments);                                                                               // 285
    return self._collection.find(self._getFindSelector(argArray), self._getFindOptions(argArray));                     // 286
  },                                                                                                                   //
                                                                                                                       //
  /**                                                                                                                  //
   * @summary Finds the first document that matches the selector, as ordered by sort and skip options.                 //
   * @locus Anywhere                                                                                                   //
   * @method findOne                                                                                                   //
   * @memberOf Mongo.Collection                                                                                        //
   * @instance                                                                                                         //
   * @param {MongoSelector} [selector] A query describing the documents to find                                        //
   * @param {Object} [options]                                                                                         //
   * @param {MongoSortSpecifier} options.sort Sort order (default: natural order)                                      //
   * @param {Number} options.skip Number of results to skip at the beginning                                           //
   * @param {MongoFieldSpecifier} options.fields Dictionary of fields to return or exclude.                            //
   * @param {Boolean} options.reactive (Client only) Default true; pass false to disable reactivity                    //
   * @param {Function} options.transform Overrides `transform` on the [`Collection`](#collections) for this cursor.  Pass `null` to disable transformation.
   * @returns {Object}                                                                                                 //
   */                                                                                                                  //
  findOne: function () /* selector, options */{                                                                        // 305
    var self = this;                                                                                                   // 306
    var argArray = _.toArray(arguments);                                                                               // 307
    return self._collection.findOne(self._getFindSelector(argArray), self._getFindOptions(argArray));                  // 308
  }                                                                                                                    //
                                                                                                                       //
});                                                                                                                    //
                                                                                                                       //
Mongo.Collection._publishCursor = function (cursor, sub, collection) {                                                 // 314
  var observeHandle = cursor.observeChanges({                                                                          // 315
    added: function (id, fields) {                                                                                     // 316
      sub.added(collection, id, fields);                                                                               // 317
    },                                                                                                                 //
    changed: function (id, fields) {                                                                                   // 319
      sub.changed(collection, id, fields);                                                                             // 320
    },                                                                                                                 //
    removed: function (id) {                                                                                           // 322
      sub.removed(collection, id);                                                                                     // 323
    }                                                                                                                  //
  });                                                                                                                  //
                                                                                                                       //
  // We don't call sub.ready() here: it gets called in livedata_server, after                                          //
  // possibly calling _publishCursor on multiple returned cursors.                                                     //
                                                                                                                       //
  // register stop callback (expects lambda w/ no args).                                                               //
  sub.onStop(function () {                                                                                             // 331
    observeHandle.stop();                                                                                              // 331
  });                                                                                                                  //
                                                                                                                       //
  // return the observeHandle in case it needs to be stopped early                                                     //
  return observeHandle;                                                                                                // 334
};                                                                                                                     //
                                                                                                                       //
// protect against dangerous selectors.  falsey and {_id: falsey} are both                                             //
// likely programmer error, and not what you want, particularly for destructive                                        //
// operations.  JS regexps don't serialize over DDP but can be trivially                                               //
// replaced by $regex.                                                                                                 //
Mongo.Collection._rewriteSelector = function (selector) {                                                              // 341
  // shorthand -- scalars match _id                                                                                    //
  if (LocalCollection._selectorIsId(selector)) selector = { _id: selector };                                           // 343
                                                                                                                       //
  if (_.isArray(selector)) {                                                                                           // 346
    // This is consistent with the Mongo console itself; if we don't do this                                           //
    // check passing an empty array ends up selecting all items                                                        //
    throw new Error("Mongo selector can't be an array.");                                                              // 349
  }                                                                                                                    //
                                                                                                                       //
  if (!selector || '_id' in selector && !selector._id)                                                                 // 352
    // can't match anything                                                                                            //
    return { _id: Random.id() };                                                                                       // 354
                                                                                                                       //
  var ret = {};                                                                                                        // 356
  _.each(selector, function (value, key) {                                                                             // 357
    // Mongo supports both {field: /foo/} and {field: {$regex: /foo/}}                                                 //
    if (value instanceof RegExp) {                                                                                     // 359
      ret[key] = convertRegexpToMongoSelector(value);                                                                  // 360
    } else if (value && value.$regex instanceof RegExp) {                                                              //
      ret[key] = convertRegexpToMongoSelector(value.$regex);                                                           // 362
      // if value is {$regex: /foo/, $options: ...} then $options                                                      //
      // override the ones set on $regex.                                                                              //
      if (value.$options !== undefined) ret[key].$options = value.$options;                                            // 365
    } else if (_.contains(['$or', '$and', '$nor'], key)) {                                                             //
      // Translate lower levels of $and/$or/$nor                                                                       //
      ret[key] = _.map(value, function (v) {                                                                           // 370
        return Mongo.Collection._rewriteSelector(v);                                                                   // 371
      });                                                                                                              //
    } else {                                                                                                           //
      ret[key] = value;                                                                                                // 374
    }                                                                                                                  //
  });                                                                                                                  //
  return ret;                                                                                                          // 377
};                                                                                                                     //
                                                                                                                       //
// convert a JS RegExp object to a Mongo {$regex: ..., $options: ...}                                                  //
// selector                                                                                                            //
function convertRegexpToMongoSelector(regexp) {                                                                        // 382
  check(regexp, RegExp); // safety belt                                                                                // 383
                                                                                                                       //
  var selector = { $regex: regexp.source };                                                                            // 385
  var regexOptions = '';                                                                                               // 386
  // JS RegExp objects support 'i', 'm', and 'g'. Mongo regex $options                                                 //
  // support 'i', 'm', 'x', and 's'. So we support 'i' and 'm' here.                                                   //
  if (regexp.ignoreCase) regexOptions += 'i';                                                                          // 389
  if (regexp.multiline) regexOptions += 'm';                                                                           // 391
  if (regexOptions) selector.$options = regexOptions;                                                                  // 393
                                                                                                                       //
  return selector;                                                                                                     // 396
};                                                                                                                     //
                                                                                                                       //
// 'insert' immediately returns the inserted document's new _id.                                                       //
// The others return values immediately if you are in a stub, an in-memory                                             //
// unmanaged collection, or a mongo-backed collection and you don't pass a                                             //
// callback. 'update' and 'remove' return the number of affected                                                       //
// documents. 'upsert' returns an object with keys 'numberAffected' and, if an                                         //
// insert happened, 'insertedId'.                                                                                      //
//                                                                                                                     //
// Otherwise, the semantics are exactly like other methods: they take                                                  //
// a callback as an optional last argument; if no callback is                                                          //
// provided, they block until the operation is complete, and throw an                                                  //
// exception if it fails; if a callback is provided, then they don't                                                   //
// necessarily block, and they call the callback when they finish with error and                                       //
// result arguments.  (The insert method provides the document ID as its result;                                       //
// update and remove provide the number of affected docs as the result; upsert                                         //
// provides an object with numberAffected and maybe insertedId.)                                                       //
//                                                                                                                     //
// On the client, blocking is impossible, so if a callback                                                             //
// isn't provided, they just return immediately and any error                                                          //
// information is lost.                                                                                                //
//                                                                                                                     //
// There's one more tweak. On the client, if you don't provide a                                                       //
// callback, then if there is an error, a message will be logged with                                                  //
// Meteor._debug.                                                                                                      //
//                                                                                                                     //
// The intent (though this is actually determined by the underlying                                                    //
// drivers) is that the operations should be done synchronously, not                                                   //
// generating their result until the database has acknowledged                                                         //
// them. In the future maybe we should provide a flag to turn this                                                     //
// off.                                                                                                                //
                                                                                                                       //
/**                                                                                                                    //
 * @summary Insert a document in the collection.  Returns its unique _id.                                              //
 * @locus Anywhere                                                                                                     //
 * @method  insert                                                                                                     //
 * @memberOf Mongo.Collection                                                                                          //
 * @instance                                                                                                           //
 * @param {Object} doc The document to insert. May not yet have an _id attribute, in which case Meteor will generate one for you.
 * @param {Function} [callback] Optional.  If present, called with an error object as the first argument and, if no error, the _id as the second.
 */                                                                                                                    //
Mongo.Collection.prototype.insert = (function () {                                                                     // 438
  function insert(doc, callback) {                                                                                     // 438
    // Make sure we were passed a document to insert                                                                   //
    if (!doc) {                                                                                                        // 440
      throw new Error("insert requires an argument");                                                                  // 441
    }                                                                                                                  //
                                                                                                                       //
    // Shallow-copy the document and possibly generate an ID                                                           //
    doc = _.extend({}, doc);                                                                                           // 445
                                                                                                                       //
    if ('_id' in doc) {                                                                                                // 447
      if (!doc._id || !(typeof doc._id === 'string' || doc._id instanceof Mongo.ObjectID)) {                           // 448
        throw new Error("Meteor requires document _id fields to be non-empty strings or ObjectIDs");                   // 450
      }                                                                                                                //
    } else {                                                                                                           //
      var generateId = true;                                                                                           // 453
                                                                                                                       //
      // Don't generate the id if we're the client and the 'outermost' call                                            //
      // This optimization saves us passing both the randomSeed and the id                                             //
      // Passing both is redundant.                                                                                    //
      if (this._isRemoteCollection()) {                                                                                // 458
        var enclosing = DDP._CurrentInvocation.get();                                                                  // 459
        if (!enclosing) {                                                                                              // 460
          generateId = false;                                                                                          // 461
        }                                                                                                              //
      }                                                                                                                //
                                                                                                                       //
      if (generateId) {                                                                                                // 465
        doc._id = this._makeNewID();                                                                                   // 466
      }                                                                                                                //
    }                                                                                                                  //
                                                                                                                       //
    // On inserts, always return the id that we generated; on all other                                                //
    // operations, just return the result from the collection.                                                         //
    var chooseReturnValueFromCollectionResult = function (result) {                                                    // 472
      if (doc._id) {                                                                                                   // 473
        return doc._id;                                                                                                // 474
      }                                                                                                                //
                                                                                                                       //
      // XXX what is this for??                                                                                        //
      // It's some iteraction between the callback to _callMutatorMethod and                                           //
      // the return value conversion                                                                                   //
      doc._id = result;                                                                                                // 480
                                                                                                                       //
      return result;                                                                                                   // 482
    };                                                                                                                 //
                                                                                                                       //
    var wrappedCallback = wrapCallback(callback, chooseReturnValueFromCollectionResult);                               // 485
                                                                                                                       //
    if (this._isRemoteCollection()) {                                                                                  // 488
      var result = this._callMutatorMethod("insert", [doc], wrappedCallback);                                          // 489
      return chooseReturnValueFromCollectionResult(result);                                                            // 490
    }                                                                                                                  //
                                                                                                                       //
    // it's my collection.  descend into the collection object                                                         //
    // and propagate any exception.                                                                                    //
    try {                                                                                                              // 495
      // If the user provided a callback and the collection implements this                                            //
      // operation asynchronously, then queryRet will be undefined, and the                                            //
      // result will be returned through the callback instead.                                                         //
      var result = this._collection.insert(doc, wrappedCallback);                                                      // 499
      return chooseReturnValueFromCollectionResult(result);                                                            // 500
    } catch (e) {                                                                                                      //
      if (callback) {                                                                                                  // 502
        callback(e);                                                                                                   // 503
        return null;                                                                                                   // 504
      }                                                                                                                //
      throw e;                                                                                                         // 506
    }                                                                                                                  //
  }                                                                                                                    //
                                                                                                                       //
  return insert;                                                                                                       //
})();                                                                                                                  //
                                                                                                                       //
/**                                                                                                                    //
 * @summary Modify one or more documents in the collection. Returns the number of affected documents.                  //
 * @locus Anywhere                                                                                                     //
 * @method update                                                                                                      //
 * @memberOf Mongo.Collection                                                                                          //
 * @instance                                                                                                           //
 * @param {MongoSelector} selector Specifies which documents to modify                                                 //
 * @param {MongoModifier} modifier Specifies how to modify the documents                                               //
 * @param {Object} [options]                                                                                           //
 * @param {Boolean} options.multi True to modify all matching documents; false to only modify one of the matching documents (the default).
 * @param {Boolean} options.upsert True to insert a document if no matching documents are found.                       //
 * @param {Function} [callback] Optional.  If present, called with an error object as the first argument and, if no error, the number of affected documents as the second.
 */                                                                                                                    //
Mongo.Collection.prototype.update = (function () {                                                                     // 523
  function update(selector, modifier) {                                                                                // 523
    for (var _len = arguments.length, optionsAndCallback = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      optionsAndCallback[_key - 2] = arguments[_key];                                                                  // 523
    }                                                                                                                  //
                                                                                                                       //
    var callback = popCallbackFromArgs(optionsAndCallback);                                                            // 524
                                                                                                                       //
    selector = Mongo.Collection._rewriteSelector(selector);                                                            // 526
                                                                                                                       //
    // We've already popped off the callback, so we are left with an array                                             //
    // of one or zero items                                                                                            //
    var options = _.clone(optionsAndCallback[0]) || {};                                                                // 530
    if (options && options.upsert) {                                                                                   // 531
      // set `insertedId` if absent.  `insertedId` is a Meteor extension.                                              //
      if (options.insertedId) {                                                                                        // 533
        if (!(typeof options.insertedId === 'string' || options.insertedId instanceof Mongo.ObjectID)) throw new Error("insertedId must be string or ObjectID");
      } else if (!selector._id) {                                                                                      //
        options.insertedId = this._makeNewID();                                                                        // 538
      }                                                                                                                //
    }                                                                                                                  //
                                                                                                                       //
    var wrappedCallback = wrapCallback(callback);                                                                      // 542
                                                                                                                       //
    if (this._isRemoteCollection()) {                                                                                  // 544
      var args = [selector, modifier, options];                                                                        // 545
                                                                                                                       //
      return this._callMutatorMethod("update", args, wrappedCallback);                                                 // 551
    }                                                                                                                  //
                                                                                                                       //
    // it's my collection.  descend into the collection object                                                         //
    // and propagate any exception.                                                                                    //
    try {                                                                                                              // 556
      // If the user provided a callback and the collection implements this                                            //
      // operation asynchronously, then queryRet will be undefined, and the                                            //
      // result will be returned through the callback instead.                                                         //
      return this._collection.update(selector, modifier, options, wrappedCallback);                                    // 560
    } catch (e) {                                                                                                      //
      if (callback) {                                                                                                  // 563
        callback(e);                                                                                                   // 564
        return null;                                                                                                   // 565
      }                                                                                                                //
      throw e;                                                                                                         // 567
    }                                                                                                                  //
  }                                                                                                                    //
                                                                                                                       //
  return update;                                                                                                       //
})();                                                                                                                  //
                                                                                                                       //
/**                                                                                                                    //
 * @summary Remove documents from the collection                                                                       //
 * @locus Anywhere                                                                                                     //
 * @method remove                                                                                                      //
 * @memberOf Mongo.Collection                                                                                          //
 * @instance                                                                                                           //
 * @param {MongoSelector} selector Specifies which documents to remove                                                 //
 * @param {Function} [callback] Optional.  If present, called with an error object as its argument.                    //
 */                                                                                                                    //
Mongo.Collection.prototype.remove = (function () {                                                                     // 580
  function remove(selector, callback) {                                                                                // 580
    selector = Mongo.Collection._rewriteSelector(selector);                                                            // 581
                                                                                                                       //
    var wrappedCallback = wrapCallback(callback);                                                                      // 583
                                                                                                                       //
    if (this._isRemoteCollection()) {                                                                                  // 585
      return this._callMutatorMethod("remove", [selector], wrappedCallback);                                           // 586
    }                                                                                                                  //
                                                                                                                       //
    // it's my collection.  descend into the collection object                                                         //
    // and propagate any exception.                                                                                    //
    try {                                                                                                              // 591
      // If the user provided a callback and the collection implements this                                            //
      // operation asynchronously, then queryRet will be undefined, and the                                            //
      // result will be returned through the callback instead.                                                         //
      return this._collection.remove(selector, wrappedCallback);                                                       // 595
    } catch (e) {                                                                                                      //
      if (callback) {                                                                                                  // 597
        callback(e);                                                                                                   // 598
        return null;                                                                                                   // 599
      }                                                                                                                //
      throw e;                                                                                                         // 601
    }                                                                                                                  //
  }                                                                                                                    //
                                                                                                                       //
  return remove;                                                                                                       //
})();                                                                                                                  //
                                                                                                                       //
// Determine if this collection is simply a minimongo representation of a real                                         //
// database on another server                                                                                          //
Mongo.Collection.prototype._isRemoteCollection = (function () {                                                        // 607
  function _isRemoteCollection() {                                                                                     // 607
    // XXX see #MeteorServerNull                                                                                       //
    return this._connection && this._connection !== Meteor.server;                                                     // 609
  }                                                                                                                    //
                                                                                                                       //
  return _isRemoteCollection;                                                                                          //
})();                                                                                                                  //
                                                                                                                       //
// Convert the callback to not return a result if there is an error                                                    //
function wrapCallback(callback, convertResult) {                                                                       // 613
  if (!callback) {                                                                                                     // 614
    return;                                                                                                            // 615
  }                                                                                                                    //
                                                                                                                       //
  // If no convert function was passed in, just use a "blank function"                                                 //
  convertResult = convertResult || _.identity;                                                                         // 619
                                                                                                                       //
  return function (error, result) {                                                                                    // 621
    callback(error, !error && convertResult(result));                                                                  // 622
  };                                                                                                                   //
}                                                                                                                      //
                                                                                                                       //
/**                                                                                                                    //
 * @summary Modify one or more documents in the collection, or insert one if no matching documents were found. Returns an object with keys `numberAffected` (the number of documents modified)  and `insertedId` (the unique _id of the document that was inserted, if any).
 * @locus Anywhere                                                                                                     //
 * @param {MongoSelector} selector Specifies which documents to modify                                                 //
 * @param {MongoModifier} modifier Specifies how to modify the documents                                               //
 * @param {Object} [options]                                                                                           //
 * @param {Boolean} options.multi True to modify all matching documents; false to only modify one of the matching documents (the default).
 * @param {Function} [callback] Optional.  If present, called with an error object as the first argument and, if no error, the number of affected documents as the second.
 */                                                                                                                    //
Mongo.Collection.prototype.upsert = (function () {                                                                     // 635
  function upsert(selector, modifier, options, callback) {                                                             // 635
    if (!callback && typeof options === "function") {                                                                  // 637
      callback = options;                                                                                              // 638
      options = {};                                                                                                    // 639
    }                                                                                                                  //
                                                                                                                       //
    var updateOptions = _.extend({}, options, {                                                                        // 642
      _returnObject: true,                                                                                             // 643
      upsert: true                                                                                                     // 644
    });                                                                                                                //
                                                                                                                       //
    return this.update(selector, modifier, updateOptions, callback);                                                   // 647
  }                                                                                                                    //
                                                                                                                       //
  return upsert;                                                                                                       //
})();                                                                                                                  //
                                                                                                                       //
// We'll actually design an index API later. For now, we just pass through to                                          //
// Mongo's, but make it synchronous.                                                                                   //
Mongo.Collection.prototype._ensureIndex = function (index, options) {                                                  // 652
  var self = this;                                                                                                     // 653
  if (!self._collection._ensureIndex) throw new Error("Can only call _ensureIndex on server collections");             // 654
  self._collection._ensureIndex(index, options);                                                                       // 656
};                                                                                                                     //
Mongo.Collection.prototype._dropIndex = function (index) {                                                             // 658
  var self = this;                                                                                                     // 659
  if (!self._collection._dropIndex) throw new Error("Can only call _dropIndex on server collections");                 // 660
  self._collection._dropIndex(index);                                                                                  // 662
};                                                                                                                     //
Mongo.Collection.prototype._dropCollection = function () {                                                             // 664
  var self = this;                                                                                                     // 665
  if (!self._collection.dropCollection) throw new Error("Can only call _dropCollection on server collections");        // 666
  self._collection.dropCollection();                                                                                   // 668
};                                                                                                                     //
Mongo.Collection.prototype._createCappedCollection = function (byteSize, maxDocuments) {                               // 670
  var self = this;                                                                                                     // 671
  if (!self._collection._createCappedCollection) throw new Error("Can only call _createCappedCollection on server collections");
  self._collection._createCappedCollection(byteSize, maxDocuments);                                                    // 674
};                                                                                                                     //
                                                                                                                       //
/**                                                                                                                    //
 * @summary Returns the [`Collection`](http://mongodb.github.io/node-mongodb-native/1.4/api-generated/collection.html) object corresponding to this collection from the [npm `mongodb` driver module](https://www.npmjs.com/package/mongodb) which is wrapped by `Mongo.Collection`.
 * @locus Server                                                                                                       //
 */                                                                                                                    //
Mongo.Collection.prototype.rawCollection = function () {                                                               // 681
  var self = this;                                                                                                     // 682
  if (!self._collection.rawCollection) {                                                                               // 683
    throw new Error("Can only call rawCollection on server collections");                                              // 684
  }                                                                                                                    //
  return self._collection.rawCollection();                                                                             // 686
};                                                                                                                     //
                                                                                                                       //
/**                                                                                                                    //
 * @summary Returns the [`Db`](http://mongodb.github.io/node-mongodb-native/1.4/api-generated/db.html) object corresponding to this collection's database connection from the [npm `mongodb` driver module](https://www.npmjs.com/package/mongodb) which is wrapped by `Mongo.Collection`.
 * @locus Server                                                                                                       //
 */                                                                                                                    //
Mongo.Collection.prototype.rawDatabase = function () {                                                                 // 693
  var self = this;                                                                                                     // 694
  if (!(self._driver.mongo && self._driver.mongo.db)) {                                                                // 695
    throw new Error("Can only call rawDatabase on server collections");                                                // 696
  }                                                                                                                    //
  return self._driver.mongo.db;                                                                                        // 698
};                                                                                                                     //
                                                                                                                       //
/**                                                                                                                    //
 * @summary Create a Mongo-style `ObjectID`.  If you don't specify a `hexString`, the `ObjectID` will generated randomly (not using MongoDB's ID construction rules).
 * @locus Anywhere                                                                                                     //
 * @class                                                                                                              //
 * @param {String} [hexString] Optional.  The 24-character hexadecimal contents of the ObjectID to create              //
 */                                                                                                                    //
Mongo.ObjectID = MongoID.ObjectID;                                                                                     // 708
                                                                                                                       //
/**                                                                                                                    //
 * @summary To create a cursor, use find. To access the documents in a cursor, use forEach, map, or fetch.             //
 * @class                                                                                                              //
 * @instanceName cursor                                                                                                //
 */                                                                                                                    //
Mongo.Cursor = LocalCollection.Cursor;                                                                                 // 715
                                                                                                                       //
/**                                                                                                                    //
 * @deprecated in 0.9.1                                                                                                //
 */                                                                                                                    //
Mongo.Collection.Cursor = Mongo.Cursor;                                                                                // 720
                                                                                                                       //
/**                                                                                                                    //
 * @deprecated in 0.9.1                                                                                                //
 */                                                                                                                    //
Mongo.Collection.ObjectID = Mongo.ObjectID;                                                                            // 725
                                                                                                                       //
/**                                                                                                                    //
 * @deprecated in 0.9.1                                                                                                //
 */                                                                                                                    //
Meteor.Collection = Mongo.Collection;                                                                                  // 730
                                                                                                                       //
// Allow deny stuff is now in the allow-deny package                                                                   //
_.extend(Meteor.Collection.prototype, AllowDeny.CollectionPrototype);                                                  // 733
                                                                                                                       //
function popCallbackFromArgs(args) {                                                                                   // 735
  // Pull off any callback (or perhaps a 'callback' variable that was passed                                           //
  // in undefined, like how 'upsert' does it).                                                                         //
  if (args.length && (args[args.length - 1] === undefined || args[args.length - 1] instanceof Function)) {             // 738
    return args.pop();                                                                                                 // 741
  }                                                                                                                    //
}                                                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}});
require("./node_modules/meteor/mongo/local_collection_driver.js");
require("./node_modules/meteor/mongo/collection.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.mongo = {}, {
  Mongo: Mongo
});

})();
