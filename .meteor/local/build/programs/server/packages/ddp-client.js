(function () {

/* Imports */
var process = Package.meteor.process;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var check = Package.check.check;
var Match = Package.check.Match;
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Retry = Package.retry.Retry;
var IdMap = Package['id-map'].IdMap;
var DDPCommon = Package['ddp-common'].DDPCommon;
var DiffSequence = Package['diff-sequence'].DiffSequence;
var MongoID = Package['mongo-id'].MongoID;

/* Package-scope variables */
var DDP, LivedataTest, MongoIDMap, toSockjsUrl, toWebsocketUrl, allConnections, Ledger, objectsWithUsers, errorThrownWhenCallingSetUserIdDirectlyOnServer, One, Two, SockJS, StubStream;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/ddp-client/namespace.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/**                                                                                                                  // 1
 * @namespace DDP                                                                                                    // 2
 * @summary Namespace for DDP-related methods/classes.                                                               // 3
 */                                                                                                                  // 4
DDP          = {};                                                                                                   // 5
LivedataTest = {};                                                                                                   // 6
                                                                                                                     // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/ddp-client/id_map.js                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
MongoIDMap = function () {                                                                                           // 1
  var self = this;                                                                                                   // 2
  IdMap.call(self, MongoID.idStringify, MongoID.idParse);                                                            // 3
};                                                                                                                   // 4
                                                                                                                     // 5
Meteor._inherits(MongoIDMap, IdMap);                                                                                 // 6
                                                                                                                     // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/ddp-client/stream_client_nodejs.js                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// @param endpoint {String} URL to Meteor app                                                                        // 1
//   "http://subdomain.meteor.com/" or "/" or                                                                        // 2
//   "ddp+sockjs://foo-**.meteor.com/sockjs"                                                                         // 3
//                                                                                                                   // 4
// We do some rewriting of the URL to eventually make it "ws://" or "wss://",                                        // 5
// whatever was passed in.  At the very least, what Meteor.absoluteUrl() returns                                     // 6
// us should work.                                                                                                   // 7
//                                                                                                                   // 8
// We don't do any heartbeating. (The logic that did this in sockjs was removed,                                     // 9
// because it used a built-in sockjs mechanism. We could do it with WebSocket                                        // 10
// ping frames or with DDP-level messages.)                                                                          // 11
LivedataTest.ClientStream = function (endpoint, options) {                                                           // 12
  var self = this;                                                                                                   // 13
  options = options || {};                                                                                           // 14
                                                                                                                     // 15
  self.options = _.extend({                                                                                          // 16
    retry: true                                                                                                      // 17
  }, options);                                                                                                       // 18
                                                                                                                     // 19
  self.client = null;  // created in _launchConnection                                                               // 20
  self.endpoint = endpoint;                                                                                          // 21
                                                                                                                     // 22
  self.headers = self.options.headers || {};                                                                         // 23
  self.npmFayeOptions = self.options.npmFayeOptions || {};                                                           // 24
                                                                                                                     // 25
  self._initCommon(self.options);                                                                                    // 26
                                                                                                                     // 27
  //// Kickoff!                                                                                                      // 28
  self._launchConnection();                                                                                          // 29
};                                                                                                                   // 30
                                                                                                                     // 31
_.extend(LivedataTest.ClientStream.prototype, {                                                                      // 32
                                                                                                                     // 33
  // data is a utf8 string. Data sent while not connected is dropped on                                              // 34
  // the floor, and it is up the user of this API to retransmit lost                                                 // 35
  // messages on 'reset'                                                                                             // 36
  send: function (data) {                                                                                            // 37
    var self = this;                                                                                                 // 38
    if (self.currentStatus.connected) {                                                                              // 39
      self.client.send(data);                                                                                        // 40
    }                                                                                                                // 41
  },                                                                                                                 // 42
                                                                                                                     // 43
  // Changes where this connection points                                                                            // 44
  _changeUrl: function (url) {                                                                                       // 45
    var self = this;                                                                                                 // 46
    self.endpoint = url;                                                                                             // 47
  },                                                                                                                 // 48
                                                                                                                     // 49
  _onConnect: function (client) {                                                                                    // 50
    var self = this;                                                                                                 // 51
                                                                                                                     // 52
    if (client !== self.client) {                                                                                    // 53
      // This connection is not from the last call to _launchConnection.                                             // 54
      // But _launchConnection calls _cleanup which closes previous connections.                                     // 55
      // It's our belief that this stifles future 'open' events, but maybe                                           // 56
      // we are wrong?                                                                                               // 57
      throw new Error("Got open from inactive client " + !!self.client);                                             // 58
    }                                                                                                                // 59
                                                                                                                     // 60
    if (self._forcedToDisconnect) {                                                                                  // 61
      // We were asked to disconnect between trying to open the connection and                                       // 62
      // actually opening it. Let's just pretend this never happened.                                                // 63
      self.client.close();                                                                                           // 64
      self.client = null;                                                                                            // 65
      return;                                                                                                        // 66
    }                                                                                                                // 67
                                                                                                                     // 68
    if (self.currentStatus.connected) {                                                                              // 69
      // We already have a connection. It must have been the case that we                                            // 70
      // started two parallel connection attempts (because we wanted to                                              // 71
      // 'reconnect now' on a hanging connection and we had no way to cancel the                                     // 72
      // connection attempt.) But this shouldn't happen (similarly to the client                                     // 73
      // !== self.client check above).                                                                               // 74
      throw new Error("Two parallel connections?");                                                                  // 75
    }                                                                                                                // 76
                                                                                                                     // 77
    self._clearConnectionTimer();                                                                                    // 78
                                                                                                                     // 79
    // update status                                                                                                 // 80
    self.currentStatus.status = "connected";                                                                         // 81
    self.currentStatus.connected = true;                                                                             // 82
    self.currentStatus.retryCount = 0;                                                                               // 83
    self.statusChanged();                                                                                            // 84
                                                                                                                     // 85
    // fire resets. This must come after status change so that clients                                               // 86
    // can call send from within a reset callback.                                                                   // 87
    _.each(self.eventCallbacks.reset, function (callback) { callback(); });                                          // 88
  },                                                                                                                 // 89
                                                                                                                     // 90
  _cleanup: function (maybeError) {                                                                                  // 91
    var self = this;                                                                                                 // 92
                                                                                                                     // 93
    self._clearConnectionTimer();                                                                                    // 94
    if (self.client) {                                                                                               // 95
      var client = self.client;                                                                                      // 96
      self.client = null;                                                                                            // 97
      client.close();                                                                                                // 98
                                                                                                                     // 99
      _.each(self.eventCallbacks.disconnect, function (callback) {                                                   // 100
        callback(maybeError);                                                                                        // 101
      });                                                                                                            // 102
    }                                                                                                                // 103
  },                                                                                                                 // 104
                                                                                                                     // 105
  _clearConnectionTimer: function () {                                                                               // 106
    var self = this;                                                                                                 // 107
                                                                                                                     // 108
    if (self.connectionTimer) {                                                                                      // 109
      clearTimeout(self.connectionTimer);                                                                            // 110
      self.connectionTimer = null;                                                                                   // 111
    }                                                                                                                // 112
  },                                                                                                                 // 113
                                                                                                                     // 114
  _getProxyUrl: function (targetUrl) {                                                                               // 115
    var self = this;                                                                                                 // 116
    // Similar to code in tools/http-helpers.js.                                                                     // 117
    var proxy = process.env.HTTP_PROXY || process.env.http_proxy || null;                                            // 118
    // if we're going to a secure url, try the https_proxy env variable first.                                       // 119
    if (targetUrl.match(/^wss:/)) {                                                                                  // 120
      proxy = process.env.HTTPS_PROXY || process.env.https_proxy || proxy;                                           // 121
    }                                                                                                                // 122
    return proxy;                                                                                                    // 123
  },                                                                                                                 // 124
                                                                                                                     // 125
  _launchConnection: function () {                                                                                   // 126
    var self = this;                                                                                                 // 127
    self._cleanup(); // cleanup the old socket, if there was one.                                                    // 128
                                                                                                                     // 129
    // Since server-to-server DDP is still an experimental feature, we only                                          // 130
    // require the module if we actually create a server-to-server                                                   // 131
    // connection.                                                                                                   // 132
    var FayeWebSocket = Npm.require('faye-websocket');                                                               // 133
    var deflate = Npm.require('permessage-deflate');                                                                 // 134
                                                                                                                     // 135
    var targetUrl = toWebsocketUrl(self.endpoint);                                                                   // 136
    var fayeOptions = {                                                                                              // 137
      headers: self.headers,                                                                                         // 138
      extensions: [deflate]                                                                                          // 139
    };                                                                                                               // 140
    fayeOptions = _.extend(fayeOptions, self.npmFayeOptions);                                                        // 141
    var proxyUrl = self._getProxyUrl(targetUrl);                                                                     // 142
    if (proxyUrl) {                                                                                                  // 143
      fayeOptions.proxy = { origin: proxyUrl };                                                                      // 144
    };                                                                                                               // 145
                                                                                                                     // 146
    // We would like to specify 'ddp' as the subprotocol here. The npm module we                                     // 147
    // used to use as a client would fail the handshake if we ask for a                                              // 148
    // subprotocol and the server doesn't send one back (and sockjs doesn't).                                        // 149
    // Faye doesn't have that behavior; it's unclear from reading RFC 6455 if                                        // 150
    // Faye is erroneous or not.  So for now, we don't specify protocols.                                            // 151
    var subprotocols = [];                                                                                           // 152
                                                                                                                     // 153
    var client = self.client = new FayeWebSocket.Client(                                                             // 154
      targetUrl, subprotocols, fayeOptions);                                                                         // 155
                                                                                                                     // 156
    self._clearConnectionTimer();                                                                                    // 157
    self.connectionTimer = Meteor.setTimeout(                                                                        // 158
      function () {                                                                                                  // 159
        self._lostConnection(                                                                                        // 160
          new DDP.ConnectionError("DDP connection timed out"));                                                      // 161
      },                                                                                                             // 162
      self.CONNECT_TIMEOUT);                                                                                         // 163
                                                                                                                     // 164
    self.client.on('open', Meteor.bindEnvironment(function () {                                                      // 165
      return self._onConnect(client);                                                                                // 166
    }, "stream connect callback"));                                                                                  // 167
                                                                                                                     // 168
    var clientOnIfCurrent = function (event, description, f) {                                                       // 169
      self.client.on(event, Meteor.bindEnvironment(function () {                                                     // 170
        // Ignore events from any connection we've already cleaned up.                                               // 171
        if (client !== self.client)                                                                                  // 172
          return;                                                                                                    // 173
        f.apply(this, arguments);                                                                                    // 174
      }, description));                                                                                              // 175
    };                                                                                                               // 176
                                                                                                                     // 177
    clientOnIfCurrent('error', 'stream error callback', function (error) {                                           // 178
      if (!self.options._dontPrintErrors)                                                                            // 179
        Meteor._debug("stream error", error.message);                                                                // 180
                                                                                                                     // 181
      // Faye's 'error' object is not a JS error (and among other things,                                            // 182
      // doesn't stringify well). Convert it to one.                                                                 // 183
      self._lostConnection(new DDP.ConnectionError(error.message));                                                  // 184
    });                                                                                                              // 185
                                                                                                                     // 186
                                                                                                                     // 187
    clientOnIfCurrent('close', 'stream close callback', function () {                                                // 188
      self._lostConnection();                                                                                        // 189
    });                                                                                                              // 190
                                                                                                                     // 191
                                                                                                                     // 192
    clientOnIfCurrent('message', 'stream message callback', function (message) {                                     // 193
      // Ignore binary frames, where message.data is a Buffer                                                        // 194
      if (typeof message.data !== "string")                                                                          // 195
        return;                                                                                                      // 196
                                                                                                                     // 197
      _.each(self.eventCallbacks.message, function (callback) {                                                      // 198
        callback(message.data);                                                                                      // 199
      });                                                                                                            // 200
    });                                                                                                              // 201
  }                                                                                                                  // 202
});                                                                                                                  // 203
                                                                                                                     // 204
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/ddp-client/stream_client_common.js                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// XXX from Underscore.String (http://epeli.github.com/underscore.string/)                                           // 1
var startsWith = function(str, starts) {                                                                             // 2
  return str.length >= starts.length &&                                                                              // 3
    str.substring(0, starts.length) === starts;                                                                      // 4
};                                                                                                                   // 5
var endsWith = function(str, ends) {                                                                                 // 6
  return str.length >= ends.length &&                                                                                // 7
    str.substring(str.length - ends.length) === ends;                                                                // 8
};                                                                                                                   // 9
                                                                                                                     // 10
// @param url {String} URL to Meteor app, eg:                                                                        // 11
//   "/" or "madewith.meteor.com" or "https://foo.meteor.com"                                                        // 12
//   or "ddp+sockjs://ddp--****-foo.meteor.com/sockjs"                                                               // 13
// @returns {String} URL to the endpoint with the specific scheme and subPath, e.g.                                  // 14
// for scheme "http" and subPath "sockjs"                                                                            // 15
//   "http://subdomain.meteor.com/sockjs" or "/sockjs"                                                               // 16
//   or "https://ddp--1234-foo.meteor.com/sockjs"                                                                    // 17
var translateUrl =  function(url, newSchemeBase, subPath) {                                                          // 18
  if (! newSchemeBase) {                                                                                             // 19
    newSchemeBase = "http";                                                                                          // 20
  }                                                                                                                  // 21
                                                                                                                     // 22
  var ddpUrlMatch = url.match(/^ddp(i?)\+sockjs:\/\//);                                                              // 23
  var httpUrlMatch = url.match(/^http(s?):\/\//);                                                                    // 24
  var newScheme;                                                                                                     // 25
  if (ddpUrlMatch) {                                                                                                 // 26
    // Remove scheme and split off the host.                                                                         // 27
    var urlAfterDDP = url.substr(ddpUrlMatch[0].length);                                                             // 28
    newScheme = ddpUrlMatch[1] === "i" ? newSchemeBase : newSchemeBase + "s";                                        // 29
    var slashPos = urlAfterDDP.indexOf('/');                                                                         // 30
    var host =                                                                                                       // 31
          slashPos === -1 ? urlAfterDDP : urlAfterDDP.substr(0, slashPos);                                           // 32
    var rest = slashPos === -1 ? '' : urlAfterDDP.substr(slashPos);                                                  // 33
                                                                                                                     // 34
    // In the host (ONLY!), change '*' characters into random digits. This                                           // 35
    // allows different stream connections to connect to different hostnames                                         // 36
    // and avoid browser per-hostname connection limits.                                                             // 37
    host = host.replace(/\*/g, function () {                                                                         // 38
      return Math.floor(Random.fraction()*10);                                                                       // 39
    });                                                                                                              // 40
                                                                                                                     // 41
    return newScheme + '://' + host + rest;                                                                          // 42
  } else if (httpUrlMatch) {                                                                                         // 43
    newScheme = !httpUrlMatch[1] ? newSchemeBase : newSchemeBase + "s";                                              // 44
    var urlAfterHttp = url.substr(httpUrlMatch[0].length);                                                           // 45
    url = newScheme + "://" + urlAfterHttp;                                                                          // 46
  }                                                                                                                  // 47
                                                                                                                     // 48
  // Prefix FQDNs but not relative URLs                                                                              // 49
  if (url.indexOf("://") === -1 && !startsWith(url, "/")) {                                                          // 50
    url = newSchemeBase + "://" + url;                                                                               // 51
  }                                                                                                                  // 52
                                                                                                                     // 53
  // XXX This is not what we should be doing: if I have a site                                                       // 54
  // deployed at "/foo", then DDP.connect("/") should actually connect                                               // 55
  // to "/", not to "/foo". "/" is an absolute path. (Contrast: if                                                   // 56
  // deployed at "/foo", it would be reasonable for DDP.connect("bar")                                               // 57
  // to connect to "/foo/bar").                                                                                      // 58
  //                                                                                                                 // 59
  // We should make this properly honor absolute paths rather than                                                   // 60
  // forcing the path to be relative to the site root. Simultaneously,                                               // 61
  // we should set DDP_DEFAULT_CONNECTION_URL to include the site                                                    // 62
  // root. See also client_convenience.js #RationalizingRelativeDDPURLs                                              // 63
  url = Meteor._relativeToSiteRootUrl(url);                                                                          // 64
                                                                                                                     // 65
  if (endsWith(url, "/"))                                                                                            // 66
    return url + subPath;                                                                                            // 67
  else                                                                                                               // 68
    return url + "/" + subPath;                                                                                      // 69
};                                                                                                                   // 70
                                                                                                                     // 71
toSockjsUrl = function (url) {                                                                                       // 72
  return translateUrl(url, "http", "sockjs");                                                                        // 73
};                                                                                                                   // 74
                                                                                                                     // 75
toWebsocketUrl = function (url) {                                                                                    // 76
  var ret = translateUrl(url, "ws", "websocket");                                                                    // 77
  return ret;                                                                                                        // 78
};                                                                                                                   // 79
                                                                                                                     // 80
LivedataTest.toSockjsUrl = toSockjsUrl;                                                                              // 81
                                                                                                                     // 82
                                                                                                                     // 83
_.extend(LivedataTest.ClientStream.prototype, {                                                                      // 84
                                                                                                                     // 85
  // Register for callbacks.                                                                                         // 86
  on: function (name, callback) {                                                                                    // 87
    var self = this;                                                                                                 // 88
                                                                                                                     // 89
    if (name !== 'message' && name !== 'reset' && name !== 'disconnect')                                             // 90
      throw new Error("unknown event type: " + name);                                                                // 91
                                                                                                                     // 92
    if (!self.eventCallbacks[name])                                                                                  // 93
      self.eventCallbacks[name] = [];                                                                                // 94
    self.eventCallbacks[name].push(callback);                                                                        // 95
  },                                                                                                                 // 96
                                                                                                                     // 97
                                                                                                                     // 98
  _initCommon: function (options) {                                                                                  // 99
    var self = this;                                                                                                 // 100
    options = options || {};                                                                                         // 101
                                                                                                                     // 102
    //// Constants                                                                                                   // 103
                                                                                                                     // 104
    // how long to wait until we declare the connection attempt                                                      // 105
    // failed.                                                                                                       // 106
    self.CONNECT_TIMEOUT = options.connectTimeoutMs || 10000;                                                        // 107
                                                                                                                     // 108
    self.eventCallbacks = {}; // name -> [callback]                                                                  // 109
                                                                                                                     // 110
    self._forcedToDisconnect = false;                                                                                // 111
                                                                                                                     // 112
    //// Reactive status                                                                                             // 113
    self.currentStatus = {                                                                                           // 114
      status: "connecting",                                                                                          // 115
      connected: false,                                                                                              // 116
      retryCount: 0                                                                                                  // 117
    };                                                                                                               // 118
                                                                                                                     // 119
                                                                                                                     // 120
    self.statusListeners = typeof Tracker !== 'undefined' && new Tracker.Dependency;                                 // 121
    self.statusChanged = function () {                                                                               // 122
      if (self.statusListeners)                                                                                      // 123
        self.statusListeners.changed();                                                                              // 124
    };                                                                                                               // 125
                                                                                                                     // 126
    //// Retry logic                                                                                                 // 127
    self._retry = new Retry;                                                                                         // 128
    self.connectionTimer = null;                                                                                     // 129
                                                                                                                     // 130
  },                                                                                                                 // 131
                                                                                                                     // 132
  // Trigger a reconnect.                                                                                            // 133
  reconnect: function (options) {                                                                                    // 134
    var self = this;                                                                                                 // 135
    options = options || {};                                                                                         // 136
                                                                                                                     // 137
    if (options.url) {                                                                                               // 138
      self._changeUrl(options.url);                                                                                  // 139
    }                                                                                                                // 140
                                                                                                                     // 141
    if (options._sockjsOptions) {                                                                                    // 142
      self.options._sockjsOptions = options._sockjsOptions;                                                          // 143
    }                                                                                                                // 144
                                                                                                                     // 145
    if (self.currentStatus.connected) {                                                                              // 146
      if (options._force || options.url) {                                                                           // 147
        // force reconnect.                                                                                          // 148
        self._lostConnection(new DDP.ForcedReconnectError);                                                          // 149
      } // else, noop.                                                                                               // 150
      return;                                                                                                        // 151
    }                                                                                                                // 152
                                                                                                                     // 153
    // if we're mid-connection, stop it.                                                                             // 154
    if (self.currentStatus.status === "connecting") {                                                                // 155
      // Pretend it's a clean close.                                                                                 // 156
      self._lostConnection();                                                                                        // 157
    }                                                                                                                // 158
                                                                                                                     // 159
    self._retry.clear();                                                                                             // 160
    self.currentStatus.retryCount -= 1; // don't count manual retries                                                // 161
    self._retryNow();                                                                                                // 162
  },                                                                                                                 // 163
                                                                                                                     // 164
  disconnect: function (options) {                                                                                   // 165
    var self = this;                                                                                                 // 166
    options = options || {};                                                                                         // 167
                                                                                                                     // 168
    // Failed is permanent. If we're failed, don't let people go back                                                // 169
    // online by calling 'disconnect' then 'reconnect'.                                                              // 170
    if (self._forcedToDisconnect)                                                                                    // 171
      return;                                                                                                        // 172
                                                                                                                     // 173
    // If _permanent is set, permanently disconnect a stream. Once a stream                                          // 174
    // is forced to disconnect, it can never reconnect. This is for                                                  // 175
    // error cases such as ddp version mismatch, where trying again                                                  // 176
    // won't fix the problem.                                                                                        // 177
    if (options._permanent) {                                                                                        // 178
      self._forcedToDisconnect = true;                                                                               // 179
    }                                                                                                                // 180
                                                                                                                     // 181
    self._cleanup();                                                                                                 // 182
    self._retry.clear();                                                                                             // 183
                                                                                                                     // 184
    self.currentStatus = {                                                                                           // 185
      status: (options._permanent ? "failed" : "offline"),                                                           // 186
      connected: false,                                                                                              // 187
      retryCount: 0                                                                                                  // 188
    };                                                                                                               // 189
                                                                                                                     // 190
    if (options._permanent && options._error)                                                                        // 191
      self.currentStatus.reason = options._error;                                                                    // 192
                                                                                                                     // 193
    self.statusChanged();                                                                                            // 194
  },                                                                                                                 // 195
                                                                                                                     // 196
  // maybeError is set unless it's a clean protocol-level close.                                                     // 197
  _lostConnection: function (maybeError) {                                                                           // 198
    var self = this;                                                                                                 // 199
                                                                                                                     // 200
    self._cleanup(maybeError);                                                                                       // 201
    self._retryLater(maybeError); // sets status. no need to do it here.                                             // 202
  },                                                                                                                 // 203
                                                                                                                     // 204
  // fired when we detect that we've gone online. try to reconnect                                                   // 205
  // immediately.                                                                                                    // 206
  _online: function () {                                                                                             // 207
    // if we've requested to be offline by disconnecting, don't reconnect.                                           // 208
    if (this.currentStatus.status != "offline")                                                                      // 209
      this.reconnect();                                                                                              // 210
  },                                                                                                                 // 211
                                                                                                                     // 212
  _retryLater: function (maybeError) {                                                                               // 213
    var self = this;                                                                                                 // 214
                                                                                                                     // 215
    var timeout = 0;                                                                                                 // 216
    if (self.options.retry ||                                                                                        // 217
        (maybeError && maybeError.errorType === "DDP.ForcedReconnectError")) {                                       // 218
      timeout = self._retry.retryLater(                                                                              // 219
        self.currentStatus.retryCount,                                                                               // 220
        _.bind(self._retryNow, self)                                                                                 // 221
      );                                                                                                             // 222
      self.currentStatus.status = "waiting";                                                                         // 223
      self.currentStatus.retryTime = (new Date()).getTime() + timeout;                                               // 224
    } else {                                                                                                         // 225
      self.currentStatus.status = "failed";                                                                          // 226
      delete self.currentStatus.retryTime;                                                                           // 227
    }                                                                                                                // 228
                                                                                                                     // 229
    self.currentStatus.connected = false;                                                                            // 230
    self.statusChanged();                                                                                            // 231
  },                                                                                                                 // 232
                                                                                                                     // 233
  _retryNow: function () {                                                                                           // 234
    var self = this;                                                                                                 // 235
                                                                                                                     // 236
    if (self._forcedToDisconnect)                                                                                    // 237
      return;                                                                                                        // 238
                                                                                                                     // 239
    self.currentStatus.retryCount += 1;                                                                              // 240
    self.currentStatus.status = "connecting";                                                                        // 241
    self.currentStatus.connected = false;                                                                            // 242
    delete self.currentStatus.retryTime;                                                                             // 243
    self.statusChanged();                                                                                            // 244
                                                                                                                     // 245
    self._launchConnection();                                                                                        // 246
  },                                                                                                                 // 247
                                                                                                                     // 248
                                                                                                                     // 249
  // Get current status. Reactive.                                                                                   // 250
  status: function () {                                                                                              // 251
    var self = this;                                                                                                 // 252
    if (self.statusListeners)                                                                                        // 253
      self.statusListeners.depend();                                                                                 // 254
    return self.currentStatus;                                                                                       // 255
  }                                                                                                                  // 256
});                                                                                                                  // 257
                                                                                                                     // 258
DDP.ConnectionError = Meteor.makeErrorType(                                                                          // 259
  "DDP.ConnectionError", function (message) {                                                                        // 260
    var self = this;                                                                                                 // 261
    self.message = message;                                                                                          // 262
});                                                                                                                  // 263
                                                                                                                     // 264
DDP.ForcedReconnectError = Meteor.makeErrorType(                                                                     // 265
  "DDP.ForcedReconnectError", function () {});                                                                       // 266
                                                                                                                     // 267
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/ddp-client/livedata_common.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
LivedataTest.SUPPORTED_DDP_VERSIONS = DDPCommon.SUPPORTED_DDP_VERSIONS;                                              // 1
                                                                                                                     // 2
// This is private but it's used in a few places. accounts-base uses                                                 // 3
// it to get the current user. Meteor.setTimeout and friends clear                                                   // 4
// it. We can probably find a better way to factor this.                                                             // 5
DDP._CurrentInvocation = new Meteor.EnvironmentVariable;                                                             // 6
                                                                                                                     // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/ddp-client/random_stream.js                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Returns the named sequence of pseudo-random values.                                                               // 1
// The scope will be DDP._CurrentInvocation.get(), so the stream will produce                                        // 2
// consistent values for method calls on the client and server.                                                      // 3
DDP.randomStream = function (name) {                                                                                 // 4
  var scope = DDP._CurrentInvocation.get();                                                                          // 5
  return DDPCommon.RandomStream.get(scope, name);                                                                    // 6
};                                                                                                                   // 7
                                                                                                                     // 8
                                                                                                                     // 9
                                                                                                                     // 10
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/ddp-client/livedata_connection.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
if (Meteor.isServer) {                                                                                               // 1
  var path = Npm.require('path');                                                                                    // 2
  var Fiber = Npm.require('fibers');                                                                                 // 3
  var Future = Npm.require(path.join('fibers', 'future'));                                                           // 4
}                                                                                                                    // 5
                                                                                                                     // 6
// @param url {String|Object} URL to Meteor app,                                                                     // 7
//   or an object as a test hook (see code)                                                                          // 8
// Options:                                                                                                          // 9
//   reloadWithOutstanding: is it OK to reload if there are outstanding methods?                                     // 10
//   headers: extra headers to send on the websockets connection, for                                                // 11
//     server-to-server DDP only                                                                                     // 12
//   _sockjsOptions: Specifies options to pass through to the sockjs client                                          // 13
//   onDDPNegotiationVersionFailure: callback when version negotiation fails.                                        // 14
//                                                                                                                   // 15
// XXX There should be a way to destroy a DDP connection, causing all                                                // 16
// outstanding method calls to fail.                                                                                 // 17
//                                                                                                                   // 18
// XXX Our current way of handling failure and reconnection is great                                                 // 19
// for an app (where we want to tolerate being disconnected as an                                                    // 20
// expect state, and keep trying forever to reconnect) but cumbersome                                                // 21
// for something like a command line tool that wants to make a                                                       // 22
// connection, call a method, and print an error if connection                                                       // 23
// fails. We should have better usability in the latter case (while                                                  // 24
// still transparently reconnecting if it's just a transient failure                                                 // 25
// or the server migrating us).                                                                                      // 26
var Connection = function (url, options) {                                                                           // 27
  var self = this;                                                                                                   // 28
  options = _.extend({                                                                                               // 29
    onConnected: function () {},                                                                                     // 30
    onDDPVersionNegotiationFailure: function (description) {                                                         // 31
      Meteor._debug(description);                                                                                    // 32
    },                                                                                                               // 33
    heartbeatInterval: 17500,                                                                                        // 34
    heartbeatTimeout: 15000,                                                                                         // 35
    npmFayeOptions: {},                                                                                              // 36
    // These options are only for testing.                                                                           // 37
    reloadWithOutstanding: false,                                                                                    // 38
    supportedDDPVersions: DDPCommon.SUPPORTED_DDP_VERSIONS,                                                          // 39
    retry: true,                                                                                                     // 40
    respondToPings: true                                                                                             // 41
  }, options);                                                                                                       // 42
                                                                                                                     // 43
  // If set, called when we reconnect, queuing method calls _before_ the                                             // 44
  // existing outstanding ones. This is the only data member that is part of the                                     // 45
  // public API!                                                                                                     // 46
  self.onReconnect = null;                                                                                           // 47
                                                                                                                     // 48
  // as a test hook, allow passing a stream instead of a url.                                                        // 49
  if (typeof url === "object") {                                                                                     // 50
    self._stream = url;                                                                                              // 51
  } else {                                                                                                           // 52
    self._stream = new LivedataTest.ClientStream(url, {                                                              // 53
      retry: options.retry,                                                                                          // 54
      headers: options.headers,                                                                                      // 55
      _sockjsOptions: options._sockjsOptions,                                                                        // 56
      // Used to keep some tests quiet, or for other cases in which                                                  // 57
      // the right thing to do with connection errors is to silently                                                 // 58
      // fail (e.g. sending package usage stats). At some point we                                                   // 59
      // should have a real API for handling client-stream-level                                                     // 60
      // errors.                                                                                                     // 61
      _dontPrintErrors: options._dontPrintErrors,                                                                    // 62
      connectTimeoutMs: options.connectTimeoutMs,                                                                    // 63
      npmFayeOptions: options.npmFayeOptions                                                                         // 64
    });                                                                                                              // 65
  }                                                                                                                  // 66
                                                                                                                     // 67
  self._lastSessionId = null;                                                                                        // 68
  self._versionSuggestion = null;  // The last proposed DDP version.                                                 // 69
  self._version = null;   // The DDP version agreed on by client and server.                                         // 70
  self._stores = {}; // name -> object with methods                                                                  // 71
  self._methodHandlers = {}; // name -> func                                                                         // 72
  self._nextMethodId = 1;                                                                                            // 73
  self._supportedDDPVersions = options.supportedDDPVersions;                                                         // 74
                                                                                                                     // 75
  self._heartbeatInterval = options.heartbeatInterval;                                                               // 76
  self._heartbeatTimeout = options.heartbeatTimeout;                                                                 // 77
                                                                                                                     // 78
  // Tracks methods which the user has tried to call but which have not yet                                          // 79
  // called their user callback (ie, they are waiting on their result or for all                                     // 80
  // of their writes to be written to the local cache). Map from method ID to                                        // 81
  // MethodInvoker object.                                                                                           // 82
  self._methodInvokers = {};                                                                                         // 83
                                                                                                                     // 84
  // Tracks methods which the user has called but whose result messages have not                                     // 85
  // arrived yet.                                                                                                    // 86
  //                                                                                                                 // 87
  // _outstandingMethodBlocks is an array of blocks of methods. Each block                                           // 88
  // represents a set of methods that can run at the same time. The first block                                      // 89
  // represents the methods which are currently in flight; subsequent blocks                                         // 90
  // must wait for previous blocks to be fully finished before they can be sent                                      // 91
  // to the server.                                                                                                  // 92
  //                                                                                                                 // 93
  // Each block is an object with the following fields:                                                              // 94
  // - methods: a list of MethodInvoker objects                                                                      // 95
  // - wait: a boolean; if true, this block had a single method invoked with                                         // 96
  //         the "wait" option                                                                                       // 97
  //                                                                                                                 // 98
  // There will never be adjacent blocks with wait=false, because the only thing                                     // 99
  // that makes methods need to be serialized is a wait method.                                                      // 100
  //                                                                                                                 // 101
  // Methods are removed from the first block when their "result" is                                                 // 102
  // received. The entire first block is only removed when all of the in-flight                                      // 103
  // methods have received their results (so the "methods" list is empty) *AND*                                      // 104
  // all of the data written by those methods are visible in the local cache. So                                     // 105
  // it is possible for the first block's methods list to be empty, if we are                                        // 106
  // still waiting for some objects to quiesce.                                                                      // 107
  //                                                                                                                 // 108
  // Example:                                                                                                        // 109
  //  _outstandingMethodBlocks = [                                                                                   // 110
  //    {wait: false, methods: []},                                                                                  // 111
  //    {wait: true, methods: [<MethodInvoker for 'login'>]},                                                        // 112
  //    {wait: false, methods: [<MethodInvoker for 'foo'>,                                                           // 113
  //                            <MethodInvoker for 'bar'>]}]                                                         // 114
  // This means that there were some methods which were sent to the server and                                       // 115
  // which have returned their results, but some of the data written by                                              // 116
  // the methods may not be visible in the local cache. Once all that data is                                        // 117
  // visible, we will send a 'login' method. Once the login method has returned                                      // 118
  // and all the data is visible (including re-running subs if userId changes),                                      // 119
  // we will send the 'foo' and 'bar' methods in parallel.                                                           // 120
  self._outstandingMethodBlocks = [];                                                                                // 121
                                                                                                                     // 122
  // method ID -> array of objects with keys 'collection' and 'id', listing                                          // 123
  // documents written by a given method's stub. keys are associated with                                            // 124
  // methods whose stub wrote at least one document, and whose data-done message                                     // 125
  // has not yet been received.                                                                                      // 126
  self._documentsWrittenByStub = {};                                                                                 // 127
  // collection -> IdMap of "server document" object. A "server document" has:                                       // 128
  // - "document": the version of the document according the                                                         // 129
  //   server (ie, the snapshot before a stub wrote it, amended by any changes                                       // 130
  //   received from the server)                                                                                     // 131
  //   It is undefined if we think the document does not exist                                                       // 132
  // - "writtenByStubs": a set of method IDs whose stubs wrote to the document                                       // 133
  //   whose "data done" messages have not yet been processed                                                        // 134
  self._serverDocuments = {};                                                                                        // 135
                                                                                                                     // 136
  // Array of callbacks to be called after the next update of the local                                              // 137
  // cache. Used for:                                                                                                // 138
  //  - Calling methodInvoker.dataVisible and sub ready callbacks after                                              // 139
  //    the relevant data is flushed.                                                                                // 140
  //  - Invoking the callbacks of "half-finished" methods after reconnect                                            // 141
  //    quiescence. Specifically, methods whose result was received over the old                                     // 142
  //    connection (so we don't re-send it) but whose data had not been made                                         // 143
  //    visible.                                                                                                     // 144
  self._afterUpdateCallbacks = [];                                                                                   // 145
                                                                                                                     // 146
  // In two contexts, we buffer all incoming data messages and then process them                                     // 147
  // all at once in a single update:                                                                                 // 148
  //   - During reconnect, we buffer all data messages until all subs that had                                       // 149
  //     been ready before reconnect are ready again, and all methods that are                                       // 150
  //     active have returned their "data done message"; then                                                        // 151
  //   - During the execution of a "wait" method, we buffer all data messages                                        // 152
  //     until the wait method gets its "data done" message. (If the wait method                                     // 153
  //     occurs during reconnect, it doesn't get any special handling.)                                              // 154
  // all data messages are processed in one update.                                                                  // 155
  //                                                                                                                 // 156
  // The following fields are used for this "quiescence" process.                                                    // 157
                                                                                                                     // 158
  // This buffers the messages that aren't being processed yet.                                                      // 159
  self._messagesBufferedUntilQuiescence = [];                                                                        // 160
  // Map from method ID -> true. Methods are removed from this when their                                            // 161
  // "data done" message is received, and we will not quiesce until it is                                            // 162
  // empty.                                                                                                          // 163
  self._methodsBlockingQuiescence = {};                                                                              // 164
  // map from sub ID -> true for subs that were ready (ie, called the sub                                            // 165
  // ready callback) before reconnect but haven't become ready again yet                                             // 166
  self._subsBeingRevived = {}; // map from sub._id -> true                                                           // 167
  // if true, the next data update should reset all stores. (set during                                              // 168
  // reconnect.)                                                                                                     // 169
  self._resetStores = false;                                                                                         // 170
                                                                                                                     // 171
  // name -> array of updates for (yet to be created) collections                                                    // 172
  self._updatesForUnknownStores = {};                                                                                // 173
  // if we're blocking a migration, the retry func                                                                   // 174
  self._retryMigrate = null;                                                                                         // 175
                                                                                                                     // 176
  // metadata for subscriptions.  Map from sub ID to object with keys:                                               // 177
  //   - id                                                                                                          // 178
  //   - name                                                                                                        // 179
  //   - params                                                                                                      // 180
  //   - inactive (if true, will be cleaned up if not reused in re-run)                                              // 181
  //   - ready (has the 'ready' message been received?)                                                              // 182
  //   - readyCallback (an optional callback to call when ready)                                                     // 183
  //   - errorCallback (an optional callback to call if the sub terminates with                                      // 184
  //                    an error, XXX COMPAT WITH 1.0.3.1)                                                           // 185
  //   - stopCallback (an optional callback to call when the sub terminates                                          // 186
  //     for any reason, with an error argument if an error triggered the stop)                                      // 187
  self._subscriptions = {};                                                                                          // 188
                                                                                                                     // 189
  // Reactive userId.                                                                                                // 190
  self._userId = null;                                                                                               // 191
  self._userIdDeps = new Tracker.Dependency;                                                                         // 192
                                                                                                                     // 193
  // Block auto-reload while we're waiting for method responses.                                                     // 194
  if (Meteor.isClient && Package.reload && !options.reloadWithOutstanding) {                                         // 195
    Package.reload.Reload._onMigrate(function (retry) {                                                              // 196
      if (!self._readyToMigrate()) {                                                                                 // 197
        if (self._retryMigrate)                                                                                      // 198
          throw new Error("Two migrations in progress?");                                                            // 199
        self._retryMigrate = retry;                                                                                  // 200
        return false;                                                                                                // 201
      } else {                                                                                                       // 202
        return [true];                                                                                               // 203
      }                                                                                                              // 204
    });                                                                                                              // 205
  }                                                                                                                  // 206
                                                                                                                     // 207
  var onMessage = function (raw_msg) {                                                                               // 208
    try {                                                                                                            // 209
      var msg = DDPCommon.parseDDP(raw_msg);                                                                         // 210
    } catch (e) {                                                                                                    // 211
      Meteor._debug("Exception while parsing DDP", e);                                                               // 212
      return;                                                                                                        // 213
    }                                                                                                                // 214
                                                                                                                     // 215
    // Any message counts as receiving a pong, as it demonstrates that                                               // 216
    // the server is still alive.                                                                                    // 217
    if (self._heartbeat) {                                                                                           // 218
      self._heartbeat.messageReceived();                                                                             // 219
    }                                                                                                                // 220
                                                                                                                     // 221
    if (msg === null || !msg.msg) {                                                                                  // 222
      // XXX COMPAT WITH 0.6.6. ignore the old welcome message for back                                              // 223
      // compat.  Remove this 'if' once the server stops sending welcome                                             // 224
      // messages (stream_server.js).                                                                                // 225
      if (! (msg && msg.server_id))                                                                                  // 226
        Meteor._debug("discarding invalid livedata message", msg);                                                   // 227
      return;                                                                                                        // 228
    }                                                                                                                // 229
                                                                                                                     // 230
    if (msg.msg === 'connected') {                                                                                   // 231
      self._version = self._versionSuggestion;                                                                       // 232
      self._livedata_connected(msg);                                                                                 // 233
      options.onConnected();                                                                                         // 234
    }                                                                                                                // 235
    else if (msg.msg === 'failed') {                                                                                 // 236
      if (_.contains(self._supportedDDPVersions, msg.version)) {                                                     // 237
        self._versionSuggestion = msg.version;                                                                       // 238
        self._stream.reconnect({_force: true});                                                                      // 239
      } else {                                                                                                       // 240
        var description =                                                                                            // 241
              "DDP version negotiation failed; server requested version " + msg.version;                             // 242
        self._stream.disconnect({_permanent: true, _error: description});                                            // 243
        options.onDDPVersionNegotiationFailure(description);                                                         // 244
      }                                                                                                              // 245
    }                                                                                                                // 246
    else if (msg.msg === 'ping' && options.respondToPings) {                                                         // 247
      self._send({msg: "pong", id: msg.id});                                                                         // 248
    }                                                                                                                // 249
    else if (msg.msg === 'pong') {                                                                                   // 250
      // noop, as we assume everything's a pong                                                                      // 251
    }                                                                                                                // 252
    else if (_.include(['added', 'changed', 'removed', 'ready', 'updated'], msg.msg))                                // 253
      self._livedata_data(msg);                                                                                      // 254
    else if (msg.msg === 'nosub')                                                                                    // 255
      self._livedata_nosub(msg);                                                                                     // 256
    else if (msg.msg === 'result')                                                                                   // 257
      self._livedata_result(msg);                                                                                    // 258
    else if (msg.msg === 'error')                                                                                    // 259
      self._livedata_error(msg);                                                                                     // 260
    else                                                                                                             // 261
      Meteor._debug("discarding unknown livedata message type", msg);                                                // 262
  };                                                                                                                 // 263
                                                                                                                     // 264
  var onReset = function () {                                                                                        // 265
    // Send a connect message at the beginning of the stream.                                                        // 266
    // NOTE: reset is called even on the first connection, so this is                                                // 267
    // the only place we send this message.                                                                          // 268
    var msg = {msg: 'connect'};                                                                                      // 269
    if (self._lastSessionId)                                                                                         // 270
      msg.session = self._lastSessionId;                                                                             // 271
    msg.version = self._versionSuggestion || self._supportedDDPVersions[0];                                          // 272
    self._versionSuggestion = msg.version;                                                                           // 273
    msg.support = self._supportedDDPVersions;                                                                        // 274
    self._send(msg);                                                                                                 // 275
                                                                                                                     // 276
    // Now, to minimize setup latency, go ahead and blast out all of                                                 // 277
    // our pending methods ands subscriptions before we've even taken                                                // 278
    // the necessary RTT to know if we successfully reconnected. (1)                                                 // 279
    // They're supposed to be idempotent; (2) even if we did                                                         // 280
    // reconnect, we're not sure what messages might have gotten lost                                                // 281
    // (in either direction) since we were disconnected (TCP being                                                   // 282
    // sloppy about that.)                                                                                           // 283
                                                                                                                     // 284
    // If the current block of methods all got their results (but didn't all get                                     // 285
    // their data visible), discard the empty block now.                                                             // 286
    if (! _.isEmpty(self._outstandingMethodBlocks) &&                                                                // 287
        _.isEmpty(self._outstandingMethodBlocks[0].methods)) {                                                       // 288
      self._outstandingMethodBlocks.shift();                                                                         // 289
    }                                                                                                                // 290
                                                                                                                     // 291
    // Mark all messages as unsent, they have not yet been sent on this                                              // 292
    // connection.                                                                                                   // 293
    _.each(self._methodInvokers, function (m) {                                                                      // 294
      m.sentMessage = false;                                                                                         // 295
    });                                                                                                              // 296
                                                                                                                     // 297
    // If an `onReconnect` handler is set, call it first. Go through                                                 // 298
    // some hoops to ensure that methods that are called from within                                                 // 299
    // `onReconnect` get executed _before_ ones that were originally                                                 // 300
    // outstanding (since `onReconnect` is used to re-establish auth                                                 // 301
    // certificates)                                                                                                 // 302
    if (self.onReconnect)                                                                                            // 303
      self._callOnReconnectAndSendAppropriateOutstandingMethods();                                                   // 304
    else                                                                                                             // 305
      self._sendOutstandingMethods();                                                                                // 306
                                                                                                                     // 307
    // add new subscriptions at the end. this way they take effect after                                             // 308
    // the handlers and we don't see flicker.                                                                        // 309
    _.each(self._subscriptions, function (sub, id) {                                                                 // 310
      self._send({                                                                                                   // 311
        msg: 'sub',                                                                                                  // 312
        id: id,                                                                                                      // 313
        name: sub.name,                                                                                              // 314
        params: sub.params                                                                                           // 315
      });                                                                                                            // 316
    });                                                                                                              // 317
  };                                                                                                                 // 318
                                                                                                                     // 319
  var onDisconnect = function () {                                                                                   // 320
    if (self._heartbeat) {                                                                                           // 321
      self._heartbeat.stop();                                                                                        // 322
      self._heartbeat = null;                                                                                        // 323
    }                                                                                                                // 324
  };                                                                                                                 // 325
                                                                                                                     // 326
  if (Meteor.isServer) {                                                                                             // 327
    self._stream.on('message', Meteor.bindEnvironment(onMessage, "handling DDP message"));                           // 328
    self._stream.on('reset', Meteor.bindEnvironment(onReset, "handling DDP reset"));                                 // 329
    self._stream.on('disconnect', Meteor.bindEnvironment(onDisconnect, "handling DDP disconnect"));                  // 330
  } else {                                                                                                           // 331
    self._stream.on('message', onMessage);                                                                           // 332
    self._stream.on('reset', onReset);                                                                               // 333
    self._stream.on('disconnect', onDisconnect);                                                                     // 334
  }                                                                                                                  // 335
};                                                                                                                   // 336
                                                                                                                     // 337
// A MethodInvoker manages sending a method to the server and calling the user's                                     // 338
// callbacks. On construction, it registers itself in the connection's                                               // 339
// _methodInvokers map; it removes itself once the method is fully finished and                                      // 340
// the callback is invoked. This occurs when it has both received a result,                                          // 341
// and the data written by it is fully visible.                                                                      // 342
var MethodInvoker = function (options) {                                                                             // 343
  var self = this;                                                                                                   // 344
                                                                                                                     // 345
  // Public (within this file) fields.                                                                               // 346
  self.methodId = options.methodId;                                                                                  // 347
  self.sentMessage = false;                                                                                          // 348
                                                                                                                     // 349
  self._callback = options.callback;                                                                                 // 350
  self._connection = options.connection;                                                                             // 351
  self._message = options.message;                                                                                   // 352
  self._onResultReceived = options.onResultReceived || function () {};                                               // 353
  self._wait = options.wait;                                                                                         // 354
  self._methodResult = null;                                                                                         // 355
  self._dataVisible = false;                                                                                         // 356
                                                                                                                     // 357
  // Register with the connection.                                                                                   // 358
  self._connection._methodInvokers[self.methodId] = self;                                                            // 359
};                                                                                                                   // 360
_.extend(MethodInvoker.prototype, {                                                                                  // 361
  // Sends the method message to the server. May be called additional times if                                       // 362
  // we lose the connection and reconnect before receiving a result.                                                 // 363
  sendMessage: function () {                                                                                         // 364
    var self = this;                                                                                                 // 365
    // This function is called before sending a method (including resending on                                       // 366
    // reconnect). We should only (re)send methods where we don't already have a                                     // 367
    // result!                                                                                                       // 368
    if (self.gotResult())                                                                                            // 369
      throw new Error("sendingMethod is called on method with result");                                              // 370
                                                                                                                     // 371
    // If we're re-sending it, it doesn't matter if data was written the first                                       // 372
    // time.                                                                                                         // 373
    self._dataVisible = false;                                                                                       // 374
                                                                                                                     // 375
    self.sentMessage = true;                                                                                         // 376
                                                                                                                     // 377
    // If this is a wait method, make all data messages be buffered until it is                                      // 378
    // done.                                                                                                         // 379
    if (self._wait)                                                                                                  // 380
      self._connection._methodsBlockingQuiescence[self.methodId] = true;                                             // 381
                                                                                                                     // 382
    // Actually send the message.                                                                                    // 383
    self._connection._send(self._message);                                                                           // 384
  },                                                                                                                 // 385
  // Invoke the callback, if we have both a result and know that all data has                                        // 386
  // been written to the local cache.                                                                                // 387
  _maybeInvokeCallback: function () {                                                                                // 388
    var self = this;                                                                                                 // 389
    if (self._methodResult && self._dataVisible) {                                                                   // 390
      // Call the callback. (This won't throw: the callback was wrapped with                                         // 391
      // bindEnvironment.)                                                                                           // 392
      self._callback(self._methodResult[0], self._methodResult[1]);                                                  // 393
                                                                                                                     // 394
      // Forget about this method.                                                                                   // 395
      delete self._connection._methodInvokers[self.methodId];                                                        // 396
                                                                                                                     // 397
      // Let the connection know that this method is finished, so it can try to                                      // 398
      // move on to the next block of methods.                                                                       // 399
      self._connection._outstandingMethodFinished();                                                                 // 400
    }                                                                                                                // 401
  },                                                                                                                 // 402
  // Call with the result of the method from the server. Only may be called                                          // 403
  // once; once it is called, you should not call sendMessage again.                                                 // 404
  // If the user provided an onResultReceived callback, call it immediately.                                         // 405
  // Then invoke the main callback if data is also visible.                                                          // 406
  receiveResult: function (err, result) {                                                                            // 407
    var self = this;                                                                                                 // 408
    if (self.gotResult())                                                                                            // 409
      throw new Error("Methods should only receive results once");                                                   // 410
    self._methodResult = [err, result];                                                                              // 411
    self._onResultReceived(err, result);                                                                             // 412
    self._maybeInvokeCallback();                                                                                     // 413
  },                                                                                                                 // 414
  // Call this when all data written by the method is visible. This means that                                       // 415
  // the method has returns its "data is done" message *AND* all server                                              // 416
  // documents that are buffered at that time have been written to the local                                         // 417
  // cache. Invokes the main callback if the result has been received.                                               // 418
  dataVisible: function () {                                                                                         // 419
    var self = this;                                                                                                 // 420
    self._dataVisible = true;                                                                                        // 421
    self._maybeInvokeCallback();                                                                                     // 422
  },                                                                                                                 // 423
  // True if receiveResult has been called.                                                                          // 424
  gotResult: function () {                                                                                           // 425
    var self = this;                                                                                                 // 426
    return !!self._methodResult;                                                                                     // 427
  }                                                                                                                  // 428
});                                                                                                                  // 429
                                                                                                                     // 430
_.extend(Connection.prototype, {                                                                                     // 431
  // 'name' is the name of the data on the wire that should go in the                                                // 432
  // store. 'wrappedStore' should be an object with methods beginUpdate, update,                                     // 433
  // endUpdate, saveOriginals, retrieveOriginals. see Collection for an example.                                     // 434
  registerStore: function (name, wrappedStore) {                                                                     // 435
    var self = this;                                                                                                 // 436
                                                                                                                     // 437
    if (name in self._stores)                                                                                        // 438
      return false;                                                                                                  // 439
                                                                                                                     // 440
    // Wrap the input object in an object which makes any store method not                                           // 441
    // implemented by 'store' into a no-op.                                                                          // 442
    var store = {};                                                                                                  // 443
    _.each(['update', 'beginUpdate', 'endUpdate', 'saveOriginals',                                                   // 444
            'retrieveOriginals', 'getDoc'], function (method) {                                                      // 445
              store[method] = function () {                                                                          // 446
                return (wrappedStore[method]                                                                         // 447
                        ? wrappedStore[method].apply(wrappedStore, arguments)                                        // 448
                        : undefined);                                                                                // 449
              };                                                                                                     // 450
            });                                                                                                      // 451
                                                                                                                     // 452
    self._stores[name] = store;                                                                                      // 453
                                                                                                                     // 454
    var queued = self._updatesForUnknownStores[name];                                                                // 455
    if (queued) {                                                                                                    // 456
      store.beginUpdate(queued.length, false);                                                                       // 457
      _.each(queued, function (msg) {                                                                                // 458
        store.update(msg);                                                                                           // 459
      });                                                                                                            // 460
      store.endUpdate();                                                                                             // 461
      delete self._updatesForUnknownStores[name];                                                                    // 462
    }                                                                                                                // 463
                                                                                                                     // 464
    return true;                                                                                                     // 465
  },                                                                                                                 // 466
                                                                                                                     // 467
  /**                                                                                                                // 468
   * @memberOf Meteor                                                                                                // 469
   * @summary Subscribe to a record set.  Returns a handle that provides                                             // 470
   * `stop()` and `ready()` methods.                                                                                 // 471
   * @locus Client                                                                                                   // 472
   * @param {String} name Name of the subscription.  Matches the name of the                                         // 473
   * server's `publish()` call.                                                                                      // 474
   * @param {EJSONable} [arg1,arg2...] Optional arguments passed to publisher                                        // 475
   * function on server.                                                                                             // 476
   * @param {Function|Object} [callbacks] Optional. May include `onStop`                                             // 477
   * and `onReady` callbacks. If there is an error, it is passed as an                                               // 478
   * argument to `onStop`. If a function is passed instead of an object, it                                          // 479
   * is interpreted as an `onReady` callback.                                                                        // 480
   */                                                                                                                // 481
  subscribe: function (name /* .. [arguments] .. (callback|callbacks) */) {                                          // 482
    var self = this;                                                                                                 // 483
                                                                                                                     // 484
    var params = Array.prototype.slice.call(arguments, 1);                                                           // 485
    var callbacks = {};                                                                                              // 486
    if (params.length) {                                                                                             // 487
      var lastParam = params[params.length - 1];                                                                     // 488
      if (_.isFunction(lastParam)) {                                                                                 // 489
        callbacks.onReady = params.pop();                                                                            // 490
      } else if (lastParam &&                                                                                        // 491
        // XXX COMPAT WITH 1.0.3.1 onError used to exist, but now we use                                             // 492
        // onStop with an error callback instead.                                                                    // 493
        _.any([lastParam.onReady, lastParam.onError, lastParam.onStop],                                              // 494
          _.isFunction)) {                                                                                           // 495
        callbacks = params.pop();                                                                                    // 496
      }                                                                                                              // 497
    }                                                                                                                // 498
                                                                                                                     // 499
    // Is there an existing sub with the same name and param, run in an                                              // 500
    // invalidated Computation? This will happen if we are rerunning an                                              // 501
    // existing computation.                                                                                         // 502
    //                                                                                                               // 503
    // For example, consider a rerun of:                                                                             // 504
    //                                                                                                               // 505
    //     Tracker.autorun(function () {                                                                             // 506
    //       Meteor.subscribe("foo", Session.get("foo"));                                                            // 507
    //       Meteor.subscribe("bar", Session.get("bar"));                                                            // 508
    //     });                                                                                                       // 509
    //                                                                                                               // 510
    // If "foo" has changed but "bar" has not, we will match the "bar"                                               // 511
    // subcribe to an existing inactive subscription in order to not                                                 // 512
    // unsub and resub the subscription unnecessarily.                                                               // 513
    //                                                                                                               // 514
    // We only look for one such sub; if there are N apparently-identical subs                                       // 515
    // being invalidated, we will require N matching subscribe calls to keep                                         // 516
    // them all active.                                                                                              // 517
    var existing = _.find(self._subscriptions, function (sub) {                                                      // 518
      return sub.inactive && sub.name === name &&                                                                    // 519
        EJSON.equals(sub.params, params);                                                                            // 520
    });                                                                                                              // 521
                                                                                                                     // 522
    var id;                                                                                                          // 523
    if (existing) {                                                                                                  // 524
      id = existing.id;                                                                                              // 525
      existing.inactive = false; // reactivate                                                                       // 526
                                                                                                                     // 527
      if (callbacks.onReady) {                                                                                       // 528
        // If the sub is not already ready, replace any ready callback with the                                      // 529
        // one provided now. (It's not really clear what users would expect for                                      // 530
        // an onReady callback inside an autorun; the semantics we provide is                                        // 531
        // that at the time the sub first becomes ready, we call the last                                            // 532
        // onReady callback provided, if any.)                                                                       // 533
        if (!existing.ready)                                                                                         // 534
          existing.readyCallback = callbacks.onReady;                                                                // 535
      }                                                                                                              // 536
                                                                                                                     // 537
      // XXX COMPAT WITH 1.0.3.1 we used to have onError but now we call                                             // 538
      // onStop with an optional error argument                                                                      // 539
      if (callbacks.onError) {                                                                                       // 540
        // Replace existing callback if any, so that errors aren't                                                   // 541
        // double-reported.                                                                                          // 542
        existing.errorCallback = callbacks.onError;                                                                  // 543
      }                                                                                                              // 544
                                                                                                                     // 545
      if (callbacks.onStop) {                                                                                        // 546
        existing.stopCallback = callbacks.onStop;                                                                    // 547
      }                                                                                                              // 548
    } else {                                                                                                         // 549
      // New sub! Generate an id, save it locally, and send message.                                                 // 550
      id = Random.id();                                                                                              // 551
      self._subscriptions[id] = {                                                                                    // 552
        id: id,                                                                                                      // 553
        name: name,                                                                                                  // 554
        params: EJSON.clone(params),                                                                                 // 555
        inactive: false,                                                                                             // 556
        ready: false,                                                                                                // 557
        readyDeps: new Tracker.Dependency,                                                                           // 558
        readyCallback: callbacks.onReady,                                                                            // 559
        // XXX COMPAT WITH 1.0.3.1 #errorCallback                                                                    // 560
        errorCallback: callbacks.onError,                                                                            // 561
        stopCallback: callbacks.onStop,                                                                              // 562
        connection: self,                                                                                            // 563
        remove: function() {                                                                                         // 564
          delete this.connection._subscriptions[this.id];                                                            // 565
          this.ready && this.readyDeps.changed();                                                                    // 566
        },                                                                                                           // 567
        stop: function() {                                                                                           // 568
          this.connection._send({msg: 'unsub', id: id});                                                             // 569
          this.remove();                                                                                             // 570
                                                                                                                     // 571
          if (callbacks.onStop) {                                                                                    // 572
            callbacks.onStop();                                                                                      // 573
          }                                                                                                          // 574
        }                                                                                                            // 575
      };                                                                                                             // 576
      self._send({msg: 'sub', id: id, name: name, params: params});                                                  // 577
    }                                                                                                                // 578
                                                                                                                     // 579
    // return a handle to the application.                                                                           // 580
    var handle = {                                                                                                   // 581
      stop: function () {                                                                                            // 582
        if (!_.has(self._subscriptions, id))                                                                         // 583
          return;                                                                                                    // 584
                                                                                                                     // 585
        self._subscriptions[id].stop();                                                                              // 586
      },                                                                                                             // 587
      ready: function () {                                                                                           // 588
        // return false if we've unsubscribed.                                                                       // 589
        if (!_.has(self._subscriptions, id))                                                                         // 590
          return false;                                                                                              // 591
        var record = self._subscriptions[id];                                                                        // 592
        record.readyDeps.depend();                                                                                   // 593
        return record.ready;                                                                                         // 594
      },                                                                                                             // 595
      subscriptionId: id                                                                                             // 596
    };                                                                                                               // 597
                                                                                                                     // 598
    if (Tracker.active) {                                                                                            // 599
      // We're in a reactive computation, so we'd like to unsubscribe when the                                       // 600
      // computation is invalidated... but not if the rerun just re-subscribes                                       // 601
      // to the same subscription!  When a rerun happens, we use onInvalidate                                        // 602
      // as a change to mark the subscription "inactive" so that it can                                              // 603
      // be reused from the rerun.  If it isn't reused, it's killed from                                             // 604
      // an afterFlush.                                                                                              // 605
      Tracker.onInvalidate(function (c) {                                                                            // 606
        if (_.has(self._subscriptions, id))                                                                          // 607
          self._subscriptions[id].inactive = true;                                                                   // 608
                                                                                                                     // 609
        Tracker.afterFlush(function () {                                                                             // 610
          if (_.has(self._subscriptions, id) &&                                                                      // 611
              self._subscriptions[id].inactive)                                                                      // 612
            handle.stop();                                                                                           // 613
        });                                                                                                          // 614
      });                                                                                                            // 615
    }                                                                                                                // 616
                                                                                                                     // 617
    return handle;                                                                                                   // 618
  },                                                                                                                 // 619
                                                                                                                     // 620
  // options:                                                                                                        // 621
  // - onLateError {Function(error)} called if an error was received after the ready event.                          // 622
  //     (errors received before ready cause an error to be thrown)                                                  // 623
  _subscribeAndWait: function (name, args, options) {                                                                // 624
    var self = this;                                                                                                 // 625
    var f = new Future();                                                                                            // 626
    var ready = false;                                                                                               // 627
    var handle;                                                                                                      // 628
    args = args || [];                                                                                               // 629
    args.push({                                                                                                      // 630
      onReady: function () {                                                                                         // 631
        ready = true;                                                                                                // 632
        f['return']();                                                                                               // 633
      },                                                                                                             // 634
      onError: function (e) {                                                                                        // 635
        if (!ready)                                                                                                  // 636
          f['throw'](e);                                                                                             // 637
        else                                                                                                         // 638
          options && options.onLateError && options.onLateError(e);                                                  // 639
      }                                                                                                              // 640
    });                                                                                                              // 641
                                                                                                                     // 642
    handle = self.subscribe.apply(self, [name].concat(args));                                                        // 643
    f.wait();                                                                                                        // 644
    return handle;                                                                                                   // 645
  },                                                                                                                 // 646
                                                                                                                     // 647
  methods: function (methods) {                                                                                      // 648
    var self = this;                                                                                                 // 649
    _.each(methods, function (func, name) {                                                                          // 650
      if (typeof func !== 'function')                                                                                // 651
        throw new Error("Method '" + name + "' must be a function");                                                 // 652
      if (self._methodHandlers[name])                                                                                // 653
        throw new Error("A method named '" + name + "' is already defined");                                         // 654
      self._methodHandlers[name] = func;                                                                             // 655
    });                                                                                                              // 656
  },                                                                                                                 // 657
                                                                                                                     // 658
  /**                                                                                                                // 659
   * @memberOf Meteor                                                                                                // 660
   * @summary Invokes a method passing any number of arguments.                                                      // 661
   * @locus Anywhere                                                                                                 // 662
   * @param {String} name Name of method to invoke                                                                   // 663
   * @param {EJSONable} [arg1,arg2...] Optional method arguments                                                     // 664
   * @param {Function} [asyncCallback] Optional callback, which is called asynchronously with the error or result after the method is complete. If not provided, the method runs synchronously if possible (see below).
   */                                                                                                                // 666
  call: function (name /* .. [arguments] .. callback */) {                                                           // 667
    // if it's a function, the last argument is the result callback,                                                 // 668
    // not a parameter to the remote method.                                                                         // 669
    var args = Array.prototype.slice.call(arguments, 1);                                                             // 670
    if (args.length && typeof args[args.length - 1] === "function")                                                  // 671
      var callback = args.pop();                                                                                     // 672
    return this.apply(name, args, callback);                                                                         // 673
  },                                                                                                                 // 674
                                                                                                                     // 675
  // @param options {Optional Object}                                                                                // 676
  //   wait: Boolean - Should we wait to call this until all current methods                                         // 677
  //                   are fully finished, and block subsequent method calls                                         // 678
  //                   until this method is fully finished?                                                          // 679
  //                   (does not affect methods called from within this method)                                      // 680
  //   onResultReceived: Function - a callback to call as soon as the method                                         // 681
  //                                result is received. the data written by                                          // 682
  //                                the method may not yet be in the cache!                                          // 683
  //   returnStubValue: Boolean - If true then in cases where we would have                                          // 684
  //                              otherwise discarded the stub's return value                                        // 685
  //                              and returned undefined, instead we go ahead                                        // 686
  //                              and return it.  Specifically, this is any                                          // 687
  //                              time other than when (a) we are already                                            // 688
  //                              inside a stub or (b) we are in Node and no                                         // 689
  //                              callback was provided.  Currently we require                                       // 690
  //                              this flag to be explicitly passed to reduce                                        // 691
  //                              the likelihood that stub return values will                                        // 692
  //                              be confused with server return values; we                                          // 693
  //                              may improve this in future.                                                        // 694
  // @param callback {Optional Function}                                                                             // 695
                                                                                                                     // 696
  /**                                                                                                                // 697
   * @memberOf Meteor                                                                                                // 698
   * @summary Invoke a method passing an array of arguments.                                                         // 699
   * @locus Anywhere                                                                                                 // 700
   * @param {String} name Name of method to invoke                                                                   // 701
   * @param {EJSONable[]} args Method arguments                                                                      // 702
   * @param {Object} [options]                                                                                       // 703
   * @param {Boolean} options.wait (Client only) If true, don't send this method until all previous method calls have completed, and don't send any subsequent method calls until this one is completed.
   * @param {Function} options.onResultReceived (Client only) This callback is invoked with the error or result of the method (just like `asyncCallback`) as soon as the error or result is available. The local cache may not yet reflect the writes performed by the method.
   * @param {Function} [asyncCallback] Optional callback; same semantics as in [`Meteor.call`](#meteor_call).        // 706
   */                                                                                                                // 707
  apply: function (name, args, options, callback) {                                                                  // 708
    var self = this;                                                                                                 // 709
                                                                                                                     // 710
    // We were passed 3 arguments. They may be either (name, args, options)                                          // 711
    // or (name, args, callback)                                                                                     // 712
    if (!callback && typeof options === 'function') {                                                                // 713
      callback = options;                                                                                            // 714
      options = {};                                                                                                  // 715
    }                                                                                                                // 716
    options = options || {};                                                                                         // 717
                                                                                                                     // 718
    if (callback) {                                                                                                  // 719
      // XXX would it be better form to do the binding in stream.on,                                                 // 720
      // or caller, instead of here?                                                                                 // 721
      // XXX improve error message (and how we report it)                                                            // 722
      callback = Meteor.bindEnvironment(                                                                             // 723
        callback,                                                                                                    // 724
        "delivering result of invoking '" + name + "'"                                                               // 725
      );                                                                                                             // 726
    }                                                                                                                // 727
                                                                                                                     // 728
    // Keep our args safe from mutation (eg if we don't send the message for a                                       // 729
    // while because of a wait method).                                                                              // 730
    args = EJSON.clone(args);                                                                                        // 731
                                                                                                                     // 732
    // Lazily allocate method ID once we know that it'll be needed.                                                  // 733
    var methodId = (function () {                                                                                    // 734
      var id;                                                                                                        // 735
      return function () {                                                                                           // 736
        if (id === undefined)                                                                                        // 737
          id = '' + (self._nextMethodId++);                                                                          // 738
        return id;                                                                                                   // 739
      };                                                                                                             // 740
    })();                                                                                                            // 741
                                                                                                                     // 742
    var enclosing = DDP._CurrentInvocation.get();                                                                    // 743
    var alreadyInSimulation = enclosing && enclosing.isSimulation;                                                   // 744
                                                                                                                     // 745
    // Lazily generate a randomSeed, only if it is requested by the stub.                                            // 746
    // The random streams only have utility if they're used on both the client                                       // 747
    // and the server; if the client doesn't generate any 'random' values                                            // 748
    // then we don't expect the server to generate any either.                                                       // 749
    // Less commonly, the server may perform different actions from the client,                                      // 750
    // and may in fact generate values where the client did not, but we don't                                        // 751
    // have any client-side values to match, so even here we may as well just                                        // 752
    // use a random seed on the server.  In that case, we don't pass the                                             // 753
    // randomSeed to save bandwidth, and we don't even generate it to save a                                         // 754
    // bit of CPU and to avoid consuming entropy.                                                                    // 755
    var randomSeed = null;                                                                                           // 756
    var randomSeedGenerator = function () {                                                                          // 757
      if (randomSeed === null) {                                                                                     // 758
        randomSeed = DDPCommon.makeRpcSeed(enclosing, name);                                                         // 759
      }                                                                                                              // 760
      return randomSeed;                                                                                             // 761
    };                                                                                                               // 762
                                                                                                                     // 763
    // Run the stub, if we have one. The stub is supposed to make some                                               // 764
    // temporary writes to the database to give the user a smooth experience                                         // 765
    // until the actual result of executing the method comes back from the                                           // 766
    // server (whereupon the temporary writes to the database will be reversed                                       // 767
    // during the beginUpdate/endUpdate process.)                                                                    // 768
    //                                                                                                               // 769
    // Normally, we ignore the return value of the stub (even if it is an                                            // 770
    // exception), in favor of the real return value from the server. The                                            // 771
    // exception is if the *caller* is a stub. In that case, we're not going                                         // 772
    // to do a RPC, so we use the return value of the stub as our return                                             // 773
    // value.                                                                                                        // 774
                                                                                                                     // 775
    var stub = self._methodHandlers[name];                                                                           // 776
    if (stub) {                                                                                                      // 777
      var setUserId = function(userId) {                                                                             // 778
        self.setUserId(userId);                                                                                      // 779
      };                                                                                                             // 780
                                                                                                                     // 781
      var invocation = new DDPCommon.MethodInvocation({                                                              // 782
        isSimulation: true,                                                                                          // 783
        userId: self.userId(),                                                                                       // 784
        setUserId: setUserId,                                                                                        // 785
        randomSeed: function () { return randomSeedGenerator(); }                                                    // 786
      });                                                                                                            // 787
                                                                                                                     // 788
      if (!alreadyInSimulation)                                                                                      // 789
        self._saveOriginals();                                                                                       // 790
                                                                                                                     // 791
      try {                                                                                                          // 792
        // Note that unlike in the corresponding server code, we never audit                                         // 793
        // that stubs check() their arguments.                                                                       // 794
        var stubReturnValue = DDP._CurrentInvocation.withValue(invocation, function () {                             // 795
          if (Meteor.isServer) {                                                                                     // 796
            // Because saveOriginals and retrieveOriginals aren't reentrant,                                         // 797
            // don't allow stubs to yield.                                                                           // 798
            return Meteor._noYieldsAllowed(function () {                                                             // 799
              // re-clone, so that the stub can't affect our caller's values                                         // 800
              return stub.apply(invocation, EJSON.clone(args));                                                      // 801
            });                                                                                                      // 802
          } else {                                                                                                   // 803
            return stub.apply(invocation, EJSON.clone(args));                                                        // 804
          }                                                                                                          // 805
        });                                                                                                          // 806
      }                                                                                                              // 807
      catch (e) {                                                                                                    // 808
        var exception = e;                                                                                           // 809
      }                                                                                                              // 810
                                                                                                                     // 811
      if (!alreadyInSimulation)                                                                                      // 812
        self._retrieveAndStoreOriginals(methodId());                                                                 // 813
    }                                                                                                                // 814
                                                                                                                     // 815
    // If we're in a simulation, stop and return the result we have,                                                 // 816
    // rather than going on to do an RPC. If there was no stub,                                                      // 817
    // we'll end up returning undefined.                                                                             // 818
    if (alreadyInSimulation) {                                                                                       // 819
      if (callback) {                                                                                                // 820
        callback(exception, stubReturnValue);                                                                        // 821
        return undefined;                                                                                            // 822
      }                                                                                                              // 823
      if (exception)                                                                                                 // 824
        throw exception;                                                                                             // 825
      return stubReturnValue;                                                                                        // 826
    }                                                                                                                // 827
                                                                                                                     // 828
    // If an exception occurred in a stub, and we're ignoring it                                                     // 829
    // because we're doing an RPC and want to use what the server                                                    // 830
    // returns instead, log it so the developer knows                                                                // 831
    // (unless they explicitly ask to see the error).                                                                // 832
    //                                                                                                               // 833
    // Tests can set the 'expected' flag on an exception so it won't                                                 // 834
    // go to log.                                                                                                    // 835
    if (exception) {                                                                                                 // 836
      if (options.throwStubExceptions) {                                                                             // 837
        throw exception;                                                                                             // 838
      } else if (!exception.expected) {                                                                              // 839
        Meteor._debug("Exception while simulating the effect of invoking '" +                                        // 840
          name + "'", exception, exception.stack);                                                                   // 841
      }                                                                                                              // 842
    }                                                                                                                // 843
                                                                                                                     // 844
                                                                                                                     // 845
    // At this point we're definitely doing an RPC, and we're going to                                               // 846
    // return the value of the RPC to the caller.                                                                    // 847
                                                                                                                     // 848
    // If the caller didn't give a callback, decide what to do.                                                      // 849
    if (!callback) {                                                                                                 // 850
      if (Meteor.isClient) {                                                                                         // 851
        // On the client, we don't have fibers, so we can't block. The                                               // 852
        // only thing we can do is to return undefined and discard the                                               // 853
        // result of the RPC. If an error occurred then print the error                                              // 854
        // to the console.                                                                                           // 855
        callback = function (err) {                                                                                  // 856
          err && Meteor._debug("Error invoking Method '" + name + "':",                                              // 857
                               err.message);                                                                         // 858
        };                                                                                                           // 859
      } else {                                                                                                       // 860
        // On the server, make the function synchronous. Throw on                                                    // 861
        // errors, return on success.                                                                                // 862
        var future = new Future;                                                                                     // 863
        callback = future.resolver();                                                                                // 864
      }                                                                                                              // 865
    }                                                                                                                // 866
    // Send the RPC. Note that on the client, it is important that the                                               // 867
    // stub have finished before we send the RPC, so that we know we have                                            // 868
    // a complete list of which local documents the stub wrote.                                                      // 869
    var message = {                                                                                                  // 870
      msg: 'method',                                                                                                 // 871
      method: name,                                                                                                  // 872
      params: args,                                                                                                  // 873
      id: methodId()                                                                                                 // 874
    };                                                                                                               // 875
                                                                                                                     // 876
    // Send the randomSeed only if we used it                                                                        // 877
    if (randomSeed !== null) {                                                                                       // 878
      message.randomSeed = randomSeed;                                                                               // 879
    }                                                                                                                // 880
                                                                                                                     // 881
    var methodInvoker = new MethodInvoker({                                                                          // 882
      methodId: methodId(),                                                                                          // 883
      callback: callback,                                                                                            // 884
      connection: self,                                                                                              // 885
      onResultReceived: options.onResultReceived,                                                                    // 886
      wait: !!options.wait,                                                                                          // 887
      message: message                                                                                               // 888
    });                                                                                                              // 889
                                                                                                                     // 890
    if (options.wait) {                                                                                              // 891
      // It's a wait method! Wait methods go in their own block.                                                     // 892
      self._outstandingMethodBlocks.push(                                                                            // 893
        {wait: true, methods: [methodInvoker]});                                                                     // 894
    } else {                                                                                                         // 895
      // Not a wait method. Start a new block if the previous block was a wait                                       // 896
      // block, and add it to the last block of methods.                                                             // 897
      if (_.isEmpty(self._outstandingMethodBlocks) ||                                                                // 898
          _.last(self._outstandingMethodBlocks).wait)                                                                // 899
        self._outstandingMethodBlocks.push({wait: false, methods: []});                                              // 900
      _.last(self._outstandingMethodBlocks).methods.push(methodInvoker);                                             // 901
    }                                                                                                                // 902
                                                                                                                     // 903
    // If we added it to the first block, send it out now.                                                           // 904
    if (self._outstandingMethodBlocks.length === 1)                                                                  // 905
      methodInvoker.sendMessage();                                                                                   // 906
                                                                                                                     // 907
    // If we're using the default callback on the server,                                                            // 908
    // block waiting for the result.                                                                                 // 909
    if (future) {                                                                                                    // 910
      return future.wait();                                                                                          // 911
    }                                                                                                                // 912
    return options.returnStubValue ? stubReturnValue : undefined;                                                    // 913
  },                                                                                                                 // 914
                                                                                                                     // 915
  // Before calling a method stub, prepare all stores to track changes and allow                                     // 916
  // _retrieveAndStoreOriginals to get the original versions of changed                                              // 917
  // documents.                                                                                                      // 918
  _saveOriginals: function () {                                                                                      // 919
    var self = this;                                                                                                 // 920
    _.each(self._stores, function (s) {                                                                              // 921
      s.saveOriginals();                                                                                             // 922
    });                                                                                                              // 923
  },                                                                                                                 // 924
  // Retrieves the original versions of all documents modified by the stub for                                       // 925
  // method 'methodId' from all stores and saves them to _serverDocuments (keyed                                     // 926
  // by document) and _documentsWrittenByStub (keyed by method ID).                                                  // 927
  _retrieveAndStoreOriginals: function (methodId) {                                                                  // 928
    var self = this;                                                                                                 // 929
    if (self._documentsWrittenByStub[methodId])                                                                      // 930
      throw new Error("Duplicate methodId in _retrieveAndStoreOriginals");                                           // 931
                                                                                                                     // 932
    var docsWritten = [];                                                                                            // 933
    _.each(self._stores, function (s, collection) {                                                                  // 934
      var originals = s.retrieveOriginals();                                                                         // 935
      // not all stores define retrieveOriginals                                                                     // 936
      if (!originals)                                                                                                // 937
        return;                                                                                                      // 938
      originals.forEach(function (doc, id) {                                                                         // 939
        docsWritten.push({collection: collection, id: id});                                                          // 940
        if (!_.has(self._serverDocuments, collection))                                                               // 941
          self._serverDocuments[collection] = new MongoIDMap;                                                        // 942
        var serverDoc = self._serverDocuments[collection].setDefault(id, {});                                        // 943
        if (serverDoc.writtenByStubs) {                                                                              // 944
          // We're not the first stub to write this doc. Just add our method ID                                      // 945
          // to the record.                                                                                          // 946
          serverDoc.writtenByStubs[methodId] = true;                                                                 // 947
        } else {                                                                                                     // 948
          // First stub! Save the original value and our method ID.                                                  // 949
          serverDoc.document = doc;                                                                                  // 950
          serverDoc.flushCallbacks = [];                                                                             // 951
          serverDoc.writtenByStubs = {};                                                                             // 952
          serverDoc.writtenByStubs[methodId] = true;                                                                 // 953
        }                                                                                                            // 954
      });                                                                                                            // 955
    });                                                                                                              // 956
    if (!_.isEmpty(docsWritten)) {                                                                                   // 957
      self._documentsWrittenByStub[methodId] = docsWritten;                                                          // 958
    }                                                                                                                // 959
  },                                                                                                                 // 960
                                                                                                                     // 961
  // This is very much a private function we use to make the tests                                                   // 962
  // take up fewer server resources after they complete.                                                             // 963
  _unsubscribeAll: function () {                                                                                     // 964
    var self = this;                                                                                                 // 965
    _.each(_.clone(self._subscriptions), function (sub, id) {                                                        // 966
      // Avoid killing the autoupdate subscription so that developers                                                // 967
      // still get hot code pushes when writing tests.                                                               // 968
      //                                                                                                             // 969
      // XXX it's a hack to encode knowledge about autoupdate here,                                                  // 970
      // but it doesn't seem worth it yet to have a special API for                                                  // 971
      // subscriptions to preserve after unit tests.                                                                 // 972
      if (sub.name !== 'meteor_autoupdate_clientVersions') {                                                         // 973
        self._subscriptions[id].stop();                                                                              // 974
      }                                                                                                              // 975
    });                                                                                                              // 976
  },                                                                                                                 // 977
                                                                                                                     // 978
  // Sends the DDP stringification of the given message object                                                       // 979
  _send: function (obj) {                                                                                            // 980
    var self = this;                                                                                                 // 981
    self._stream.send(DDPCommon.stringifyDDP(obj));                                                                  // 982
  },                                                                                                                 // 983
                                                                                                                     // 984
  // We detected via DDP-level heartbeats that we've lost the                                                        // 985
  // connection.  Unlike `disconnect` or `close`, a lost connection                                                  // 986
  // will be automatically retried.                                                                                  // 987
  _lostConnection: function (error) {                                                                                // 988
    var self = this;                                                                                                 // 989
    self._stream._lostConnection(error);                                                                             // 990
  },                                                                                                                 // 991
                                                                                                                     // 992
  /**                                                                                                                // 993
   * @summary Get the current connection status. A reactive data source.                                             // 994
   * @locus Client                                                                                                   // 995
   * @memberOf Meteor                                                                                                // 996
   */                                                                                                                // 997
  status: function (/*passthrough args*/) {                                                                          // 998
    var self = this;                                                                                                 // 999
    return self._stream.status.apply(self._stream, arguments);                                                       // 1000
  },                                                                                                                 // 1001
                                                                                                                     // 1002
  /**                                                                                                                // 1003
   * @summary Force an immediate reconnection attempt if the client is not connected to the server.                  // 1004
                                                                                                                     // 1005
  This method does nothing if the client is already connected.                                                       // 1006
   * @locus Client                                                                                                   // 1007
   * @memberOf Meteor                                                                                                // 1008
   */                                                                                                                // 1009
  reconnect: function (/*passthrough args*/) {                                                                       // 1010
    var self = this;                                                                                                 // 1011
    return self._stream.reconnect.apply(self._stream, arguments);                                                    // 1012
  },                                                                                                                 // 1013
                                                                                                                     // 1014
  /**                                                                                                                // 1015
   * @summary Disconnect the client from the server.                                                                 // 1016
   * @locus Client                                                                                                   // 1017
   * @memberOf Meteor                                                                                                // 1018
   */                                                                                                                // 1019
  disconnect: function (/*passthrough args*/) {                                                                      // 1020
    var self = this;                                                                                                 // 1021
    return self._stream.disconnect.apply(self._stream, arguments);                                                   // 1022
  },                                                                                                                 // 1023
                                                                                                                     // 1024
  close: function () {                                                                                               // 1025
    var self = this;                                                                                                 // 1026
    return self._stream.disconnect({_permanent: true});                                                              // 1027
  },                                                                                                                 // 1028
                                                                                                                     // 1029
  ///                                                                                                                // 1030
  /// Reactive user system                                                                                           // 1031
  ///                                                                                                                // 1032
  userId: function () {                                                                                              // 1033
    var self = this;                                                                                                 // 1034
    if (self._userIdDeps)                                                                                            // 1035
      self._userIdDeps.depend();                                                                                     // 1036
    return self._userId;                                                                                             // 1037
  },                                                                                                                 // 1038
                                                                                                                     // 1039
  setUserId: function (userId) {                                                                                     // 1040
    var self = this;                                                                                                 // 1041
    // Avoid invalidating dependents if setUserId is called with current value.                                      // 1042
    if (self._userId === userId)                                                                                     // 1043
      return;                                                                                                        // 1044
    self._userId = userId;                                                                                           // 1045
    if (self._userIdDeps)                                                                                            // 1046
      self._userIdDeps.changed();                                                                                    // 1047
  },                                                                                                                 // 1048
                                                                                                                     // 1049
  // Returns true if we are in a state after reconnect of waiting for subs to be                                     // 1050
  // revived or early methods to finish their data, or we are waiting for a                                          // 1051
  // "wait" method to finish.                                                                                        // 1052
  _waitingForQuiescence: function () {                                                                               // 1053
    var self = this;                                                                                                 // 1054
    return (! _.isEmpty(self._subsBeingRevived) ||                                                                   // 1055
            ! _.isEmpty(self._methodsBlockingQuiescence));                                                           // 1056
  },                                                                                                                 // 1057
                                                                                                                     // 1058
  // Returns true if any method whose message has been sent to the server has                                        // 1059
  // not yet invoked its user callback.                                                                              // 1060
  _anyMethodsAreOutstanding: function () {                                                                           // 1061
    var self = this;                                                                                                 // 1062
    return _.any(_.pluck(self._methodInvokers, 'sentMessage'));                                                      // 1063
  },                                                                                                                 // 1064
                                                                                                                     // 1065
  _livedata_connected: function (msg) {                                                                              // 1066
    var self = this;                                                                                                 // 1067
                                                                                                                     // 1068
    if (self._version !== 'pre1' && self._heartbeatInterval !== 0) {                                                 // 1069
      self._heartbeat = new DDPCommon.Heartbeat({                                                                    // 1070
        heartbeatInterval: self._heartbeatInterval,                                                                  // 1071
        heartbeatTimeout: self._heartbeatTimeout,                                                                    // 1072
        onTimeout: function () {                                                                                     // 1073
          self._lostConnection(                                                                                      // 1074
            new DDP.ConnectionError("DDP heartbeat timed out"));                                                     // 1075
        },                                                                                                           // 1076
        sendPing: function () {                                                                                      // 1077
          self._send({msg: 'ping'});                                                                                 // 1078
        }                                                                                                            // 1079
      });                                                                                                            // 1080
      self._heartbeat.start();                                                                                       // 1081
    }                                                                                                                // 1082
                                                                                                                     // 1083
    // If this is a reconnect, we'll have to reset all stores.                                                       // 1084
    if (self._lastSessionId)                                                                                         // 1085
      self._resetStores = true;                                                                                      // 1086
                                                                                                                     // 1087
    if (typeof (msg.session) === "string") {                                                                         // 1088
      var reconnectedToPreviousSession = (self._lastSessionId === msg.session);                                      // 1089
      self._lastSessionId = msg.session;                                                                             // 1090
    }                                                                                                                // 1091
                                                                                                                     // 1092
    if (reconnectedToPreviousSession) {                                                                              // 1093
      // Successful reconnection -- pick up where we left off.  Note that right                                      // 1094
      // now, this never happens: the server never connects us to a previous                                         // 1095
      // session, because DDP doesn't provide enough data for the server to know                                     // 1096
      // what messages the client has processed. We need to improve DDP to make                                      // 1097
      // this possible, at which point we'll probably need more code here.                                           // 1098
      return;                                                                                                        // 1099
    }                                                                                                                // 1100
                                                                                                                     // 1101
    // Server doesn't have our data any more. Re-sync a new session.                                                 // 1102
                                                                                                                     // 1103
    // Forget about messages we were buffering for unknown collections. They'll                                      // 1104
    // be resent if still relevant.                                                                                  // 1105
    self._updatesForUnknownStores = {};                                                                              // 1106
                                                                                                                     // 1107
    if (self._resetStores) {                                                                                         // 1108
      // Forget about the effects of stubs. We'll be resetting all collections                                       // 1109
      // anyway.                                                                                                     // 1110
      self._documentsWrittenByStub = {};                                                                             // 1111
      self._serverDocuments = {};                                                                                    // 1112
    }                                                                                                                // 1113
                                                                                                                     // 1114
    // Clear _afterUpdateCallbacks.                                                                                  // 1115
    self._afterUpdateCallbacks = [];                                                                                 // 1116
                                                                                                                     // 1117
    // Mark all named subscriptions which are ready (ie, we already called the                                       // 1118
    // ready callback) as needing to be revived.                                                                     // 1119
    // XXX We should also block reconnect quiescence until unnamed subscriptions                                     // 1120
    //     (eg, autopublish) are done re-publishing to avoid flicker!                                                // 1121
    self._subsBeingRevived = {};                                                                                     // 1122
    _.each(self._subscriptions, function (sub, id) {                                                                 // 1123
      if (sub.ready)                                                                                                 // 1124
        self._subsBeingRevived[id] = true;                                                                           // 1125
    });                                                                                                              // 1126
                                                                                                                     // 1127
    // Arrange for "half-finished" methods to have their callbacks run, and                                          // 1128
    // track methods that were sent on this connection so that we don't                                              // 1129
    // quiesce until they are all done.                                                                              // 1130
    //                                                                                                               // 1131
    // Start by clearing _methodsBlockingQuiescence: methods sent before                                             // 1132
    // reconnect don't matter, and any "wait" methods sent on the new connection                                     // 1133
    // that we drop here will be restored by the loop below.                                                         // 1134
    self._methodsBlockingQuiescence = {};                                                                            // 1135
    if (self._resetStores) {                                                                                         // 1136
      _.each(self._methodInvokers, function (invoker) {                                                              // 1137
        if (invoker.gotResult()) {                                                                                   // 1138
          // This method already got its result, but it didn't call its callback                                     // 1139
          // because its data didn't become visible. We did not resend the                                           // 1140
          // method RPC. We'll call its callback when we get a full quiesce,                                         // 1141
          // since that's as close as we'll get to "data must be visible".                                           // 1142
          self._afterUpdateCallbacks.push(_.bind(invoker.dataVisible, invoker));                                     // 1143
        } else if (invoker.sentMessage) {                                                                            // 1144
          // This method has been sent on this connection (maybe as a resend                                         // 1145
          // from the last connection, maybe from onReconnect, maybe just very                                       // 1146
          // quickly before processing the connected message).                                                       // 1147
          //                                                                                                         // 1148
          // We don't need to do anything special to ensure its callbacks get                                        // 1149
          // called, but we'll count it as a method which is preventing                                              // 1150
          // reconnect quiescence. (eg, it might be a login method that was run                                      // 1151
          // from onReconnect, and we don't want to see flicker by seeing a                                          // 1152
          // logged-out state.)                                                                                      // 1153
          self._methodsBlockingQuiescence[invoker.methodId] = true;                                                  // 1154
        }                                                                                                            // 1155
      });                                                                                                            // 1156
    }                                                                                                                // 1157
                                                                                                                     // 1158
    self._messagesBufferedUntilQuiescence = [];                                                                      // 1159
                                                                                                                     // 1160
    // If we're not waiting on any methods or subs, we can reset the stores and                                      // 1161
    // call the callbacks immediately.                                                                               // 1162
    if (!self._waitingForQuiescence()) {                                                                             // 1163
      if (self._resetStores) {                                                                                       // 1164
        _.each(self._stores, function (s) {                                                                          // 1165
          s.beginUpdate(0, true);                                                                                    // 1166
          s.endUpdate();                                                                                             // 1167
        });                                                                                                          // 1168
        self._resetStores = false;                                                                                   // 1169
      }                                                                                                              // 1170
      self._runAfterUpdateCallbacks();                                                                               // 1171
    }                                                                                                                // 1172
  },                                                                                                                 // 1173
                                                                                                                     // 1174
                                                                                                                     // 1175
  _processOneDataMessage: function (msg, updates) {                                                                  // 1176
    var self = this;                                                                                                 // 1177
    // Using underscore here so as not to need to capitalize.                                                        // 1178
    self['_process_' + msg.msg](msg, updates);                                                                       // 1179
  },                                                                                                                 // 1180
                                                                                                                     // 1181
                                                                                                                     // 1182
  _livedata_data: function (msg) {                                                                                   // 1183
    var self = this;                                                                                                 // 1184
                                                                                                                     // 1185
    // collection name -> array of messages                                                                          // 1186
    var updates = {};                                                                                                // 1187
                                                                                                                     // 1188
    if (self._waitingForQuiescence()) {                                                                              // 1189
      self._messagesBufferedUntilQuiescence.push(msg);                                                               // 1190
                                                                                                                     // 1191
      if (msg.msg === "nosub")                                                                                       // 1192
        delete self._subsBeingRevived[msg.id];                                                                       // 1193
                                                                                                                     // 1194
      _.each(msg.subs || [], function (subId) {                                                                      // 1195
        delete self._subsBeingRevived[subId];                                                                        // 1196
      });                                                                                                            // 1197
      _.each(msg.methods || [], function (methodId) {                                                                // 1198
        delete self._methodsBlockingQuiescence[methodId];                                                            // 1199
      });                                                                                                            // 1200
                                                                                                                     // 1201
      if (self._waitingForQuiescence())                                                                              // 1202
        return;                                                                                                      // 1203
                                                                                                                     // 1204
      // No methods or subs are blocking quiescence!                                                                 // 1205
      // We'll now process and all of our buffered messages, reset all stores,                                       // 1206
      // and apply them all at once.                                                                                 // 1207
      _.each(self._messagesBufferedUntilQuiescence, function (bufferedMsg) {                                         // 1208
        self._processOneDataMessage(bufferedMsg, updates);                                                           // 1209
      });                                                                                                            // 1210
      self._messagesBufferedUntilQuiescence = [];                                                                    // 1211
    } else {                                                                                                         // 1212
      self._processOneDataMessage(msg, updates);                                                                     // 1213
    }                                                                                                                // 1214
                                                                                                                     // 1215
    if (self._resetStores || !_.isEmpty(updates)) {                                                                  // 1216
      // Begin a transactional update of each store.                                                                 // 1217
      _.each(self._stores, function (s, storeName) {                                                                 // 1218
        s.beginUpdate(_.has(updates, storeName) ? updates[storeName].length : 0,                                     // 1219
                      self._resetStores);                                                                            // 1220
      });                                                                                                            // 1221
      self._resetStores = false;                                                                                     // 1222
                                                                                                                     // 1223
      _.each(updates, function (updateMessages, storeName) {                                                         // 1224
        var store = self._stores[storeName];                                                                         // 1225
        if (store) {                                                                                                 // 1226
          _.each(updateMessages, function (updateMessage) {                                                          // 1227
            store.update(updateMessage);                                                                             // 1228
          });                                                                                                        // 1229
        } else {                                                                                                     // 1230
          // Nobody's listening for this data. Queue it up until                                                     // 1231
          // someone wants it.                                                                                       // 1232
          // XXX memory use will grow without bound if you forget to                                                 // 1233
          // create a collection or just don't care about it... going                                                // 1234
          // to have to do something about that.                                                                     // 1235
          if (!_.has(self._updatesForUnknownStores, storeName))                                                      // 1236
            self._updatesForUnknownStores[storeName] = [];                                                           // 1237
          Array.prototype.push.apply(self._updatesForUnknownStores[storeName],                                       // 1238
                                     updateMessages);                                                                // 1239
        }                                                                                                            // 1240
      });                                                                                                            // 1241
                                                                                                                     // 1242
      // End update transaction.                                                                                     // 1243
      _.each(self._stores, function (s) { s.endUpdate(); });                                                         // 1244
    }                                                                                                                // 1245
                                                                                                                     // 1246
    self._runAfterUpdateCallbacks();                                                                                 // 1247
  },                                                                                                                 // 1248
                                                                                                                     // 1249
  // Call any callbacks deferred with _runWhenAllServerDocsAreFlushed whose                                          // 1250
  // relevant docs have been flushed, as well as dataVisible callbacks at                                            // 1251
  // reconnect-quiescence time.                                                                                      // 1252
  _runAfterUpdateCallbacks: function () {                                                                            // 1253
    var self = this;                                                                                                 // 1254
    var callbacks = self._afterUpdateCallbacks;                                                                      // 1255
    self._afterUpdateCallbacks = [];                                                                                 // 1256
    _.each(callbacks, function (c) {                                                                                 // 1257
      c();                                                                                                           // 1258
    });                                                                                                              // 1259
  },                                                                                                                 // 1260
                                                                                                                     // 1261
  _pushUpdate: function (updates, collection, msg) {                                                                 // 1262
    var self = this;                                                                                                 // 1263
    if (!_.has(updates, collection)) {                                                                               // 1264
      updates[collection] = [];                                                                                      // 1265
    }                                                                                                                // 1266
    updates[collection].push(msg);                                                                                   // 1267
  },                                                                                                                 // 1268
                                                                                                                     // 1269
  _getServerDoc: function (collection, id) {                                                                         // 1270
    var self = this;                                                                                                 // 1271
    if (!_.has(self._serverDocuments, collection))                                                                   // 1272
      return null;                                                                                                   // 1273
    var serverDocsForCollection = self._serverDocuments[collection];                                                 // 1274
    return serverDocsForCollection.get(id) || null;                                                                  // 1275
  },                                                                                                                 // 1276
                                                                                                                     // 1277
  _process_added: function (msg, updates) {                                                                          // 1278
    var self = this;                                                                                                 // 1279
    var id = MongoID.idParse(msg.id);                                                                                // 1280
    var serverDoc = self._getServerDoc(msg.collection, id);                                                          // 1281
    if (serverDoc) {                                                                                                 // 1282
      // Some outstanding stub wrote here.                                                                           // 1283
      var isExisting = (serverDoc.document !== undefined);                                                           // 1284
                                                                                                                     // 1285
      serverDoc.document = msg.fields || {};                                                                         // 1286
      serverDoc.document._id = id;                                                                                   // 1287
                                                                                                                     // 1288
      if (self._resetStores) {                                                                                       // 1289
        // During reconnect the server is sending adds for existing ids.                                             // 1290
        // Always push an update so that document stays in the store after                                           // 1291
        // reset. Use current version of the document for this update, so                                            // 1292
        // that stub-written values are preserved.                                                                   // 1293
        var currentDoc = self._stores[msg.collection].getDoc(msg.id);                                                // 1294
        if (currentDoc !== undefined)                                                                                // 1295
          msg.fields = currentDoc;                                                                                   // 1296
                                                                                                                     // 1297
        self._pushUpdate(updates, msg.collection, msg);                                                              // 1298
      } else if (isExisting) {                                                                                       // 1299
        throw new Error("Server sent add for existing id: " + msg.id);                                               // 1300
      }                                                                                                              // 1301
    } else {                                                                                                         // 1302
      self._pushUpdate(updates, msg.collection, msg);                                                                // 1303
    }                                                                                                                // 1304
  },                                                                                                                 // 1305
                                                                                                                     // 1306
  _process_changed: function (msg, updates) {                                                                        // 1307
    var self = this;                                                                                                 // 1308
    var serverDoc = self._getServerDoc(                                                                              // 1309
      msg.collection, MongoID.idParse(msg.id));                                                                      // 1310
    if (serverDoc) {                                                                                                 // 1311
      if (serverDoc.document === undefined)                                                                          // 1312
        throw new Error("Server sent changed for nonexisting id: " + msg.id);                                        // 1313
      DiffSequence.applyChanges(serverDoc.document, msg.fields);                                                     // 1314
    } else {                                                                                                         // 1315
      self._pushUpdate(updates, msg.collection, msg);                                                                // 1316
    }                                                                                                                // 1317
  },                                                                                                                 // 1318
                                                                                                                     // 1319
  _process_removed: function (msg, updates) {                                                                        // 1320
    var self = this;                                                                                                 // 1321
    var serverDoc = self._getServerDoc(                                                                              // 1322
      msg.collection, MongoID.idParse(msg.id));                                                                      // 1323
    if (serverDoc) {                                                                                                 // 1324
      // Some outstanding stub wrote here.                                                                           // 1325
      if (serverDoc.document === undefined)                                                                          // 1326
        throw new Error("Server sent removed for nonexisting id:" + msg.id);                                         // 1327
      serverDoc.document = undefined;                                                                                // 1328
    } else {                                                                                                         // 1329
      self._pushUpdate(updates, msg.collection, {                                                                    // 1330
        msg: 'removed',                                                                                              // 1331
        collection: msg.collection,                                                                                  // 1332
        id: msg.id                                                                                                   // 1333
      });                                                                                                            // 1334
    }                                                                                                                // 1335
  },                                                                                                                 // 1336
                                                                                                                     // 1337
  _process_updated: function (msg, updates) {                                                                        // 1338
    var self = this;                                                                                                 // 1339
    // Process "method done" messages.                                                                               // 1340
    _.each(msg.methods, function (methodId) {                                                                        // 1341
      _.each(self._documentsWrittenByStub[methodId], function (written) {                                            // 1342
        var serverDoc = self._getServerDoc(written.collection, written.id);                                          // 1343
        if (!serverDoc)                                                                                              // 1344
          throw new Error("Lost serverDoc for " + JSON.stringify(written));                                          // 1345
        if (!serverDoc.writtenByStubs[methodId])                                                                     // 1346
          throw new Error("Doc " + JSON.stringify(written) +                                                         // 1347
                          " not written by  method " + methodId);                                                    // 1348
        delete serverDoc.writtenByStubs[methodId];                                                                   // 1349
        if (_.isEmpty(serverDoc.writtenByStubs)) {                                                                   // 1350
          // All methods whose stubs wrote this method have completed! We can                                        // 1351
          // now copy the saved document to the database (reverting the stub's                                       // 1352
          // change if the server did not write to this object, or applying the                                      // 1353
          // server's writes if it did).                                                                             // 1354
                                                                                                                     // 1355
          // This is a fake ddp 'replace' message.  It's just for talking                                            // 1356
          // between livedata connections and minimongo.  (We have to stringify                                      // 1357
          // the ID because it's supposed to look like a wire message.)                                              // 1358
          self._pushUpdate(updates, written.collection, {                                                            // 1359
            msg: 'replace',                                                                                          // 1360
            id: MongoID.idStringify(written.id),                                                                     // 1361
            replace: serverDoc.document                                                                              // 1362
          });                                                                                                        // 1363
          // Call all flush callbacks.                                                                               // 1364
          _.each(serverDoc.flushCallbacks, function (c) {                                                            // 1365
            c();                                                                                                     // 1366
          });                                                                                                        // 1367
                                                                                                                     // 1368
          // Delete this completed serverDocument. Don't bother to GC empty                                          // 1369
          // IdMaps inside self._serverDocuments, since there probably aren't                                        // 1370
          // many collections and they'll be written repeatedly.                                                     // 1371
          self._serverDocuments[written.collection].remove(written.id);                                              // 1372
        }                                                                                                            // 1373
      });                                                                                                            // 1374
      delete self._documentsWrittenByStub[methodId];                                                                 // 1375
                                                                                                                     // 1376
      // We want to call the data-written callback, but we can't do so until all                                     // 1377
      // currently buffered messages are flushed.                                                                    // 1378
      var callbackInvoker = self._methodInvokers[methodId];                                                          // 1379
      if (!callbackInvoker)                                                                                          // 1380
        throw new Error("No callback invoker for method " + methodId);                                               // 1381
      self._runWhenAllServerDocsAreFlushed(                                                                          // 1382
        _.bind(callbackInvoker.dataVisible, callbackInvoker));                                                       // 1383
    });                                                                                                              // 1384
  },                                                                                                                 // 1385
                                                                                                                     // 1386
  _process_ready: function (msg, updates) {                                                                          // 1387
    var self = this;                                                                                                 // 1388
    // Process "sub ready" messages. "sub ready" messages don't take effect                                          // 1389
    // until all current server documents have been flushed to the local                                             // 1390
    // database. We can use a write fence to implement this.                                                         // 1391
    _.each(msg.subs, function (subId) {                                                                              // 1392
      self._runWhenAllServerDocsAreFlushed(function () {                                                             // 1393
        var subRecord = self._subscriptions[subId];                                                                  // 1394
        // Did we already unsubscribe?                                                                               // 1395
        if (!subRecord)                                                                                              // 1396
          return;                                                                                                    // 1397
        // Did we already receive a ready message? (Oops!)                                                           // 1398
        if (subRecord.ready)                                                                                         // 1399
          return;                                                                                                    // 1400
        subRecord.ready = true;                                                                                      // 1401
        subRecord.readyCallback && subRecord.readyCallback();                                                        // 1402
        subRecord.readyDeps.changed();                                                                               // 1403
      });                                                                                                            // 1404
    });                                                                                                              // 1405
  },                                                                                                                 // 1406
                                                                                                                     // 1407
  // Ensures that "f" will be called after all documents currently in                                                // 1408
  // _serverDocuments have been written to the local cache. f will not be called                                     // 1409
  // if the connection is lost before then!                                                                          // 1410
  _runWhenAllServerDocsAreFlushed: function (f) {                                                                    // 1411
    var self = this;                                                                                                 // 1412
    var runFAfterUpdates = function () {                                                                             // 1413
      self._afterUpdateCallbacks.push(f);                                                                            // 1414
    };                                                                                                               // 1415
    var unflushedServerDocCount = 0;                                                                                 // 1416
    var onServerDocFlush = function () {                                                                             // 1417
      --unflushedServerDocCount;                                                                                     // 1418
      if (unflushedServerDocCount === 0) {                                                                           // 1419
        // This was the last doc to flush! Arrange to run f after the updates                                        // 1420
        // have been applied.                                                                                        // 1421
        runFAfterUpdates();                                                                                          // 1422
      }                                                                                                              // 1423
    };                                                                                                               // 1424
    _.each(self._serverDocuments, function (collectionDocs) {                                                        // 1425
      collectionDocs.forEach(function (serverDoc) {                                                                  // 1426
        var writtenByStubForAMethodWithSentMessage = _.any(                                                          // 1427
          serverDoc.writtenByStubs, function (dummy, methodId) {                                                     // 1428
            var invoker = self._methodInvokers[methodId];                                                            // 1429
            return invoker && invoker.sentMessage;                                                                   // 1430
          });                                                                                                        // 1431
        if (writtenByStubForAMethodWithSentMessage) {                                                                // 1432
          ++unflushedServerDocCount;                                                                                 // 1433
          serverDoc.flushCallbacks.push(onServerDocFlush);                                                           // 1434
        }                                                                                                            // 1435
      });                                                                                                            // 1436
    });                                                                                                              // 1437
    if (unflushedServerDocCount === 0) {                                                                             // 1438
      // There aren't any buffered docs --- we can call f as soon as the current                                     // 1439
      // round of updates is applied!                                                                                // 1440
      runFAfterUpdates();                                                                                            // 1441
    }                                                                                                                // 1442
  },                                                                                                                 // 1443
                                                                                                                     // 1444
  _livedata_nosub: function (msg) {                                                                                  // 1445
    var self = this;                                                                                                 // 1446
                                                                                                                     // 1447
    // First pass it through _livedata_data, which only uses it to help get                                          // 1448
    // towards quiescence.                                                                                           // 1449
    self._livedata_data(msg);                                                                                        // 1450
                                                                                                                     // 1451
    // Do the rest of our processing immediately, with no                                                            // 1452
    // buffering-until-quiescence.                                                                                   // 1453
                                                                                                                     // 1454
    // we weren't subbed anyway, or we initiated the unsub.                                                          // 1455
    if (!_.has(self._subscriptions, msg.id))                                                                         // 1456
      return;                                                                                                        // 1457
                                                                                                                     // 1458
    // XXX COMPAT WITH 1.0.3.1 #errorCallback                                                                        // 1459
    var errorCallback = self._subscriptions[msg.id].errorCallback;                                                   // 1460
    var stopCallback = self._subscriptions[msg.id].stopCallback;                                                     // 1461
                                                                                                                     // 1462
    self._subscriptions[msg.id].remove();                                                                            // 1463
                                                                                                                     // 1464
    var meteorErrorFromMsg = function (msgArg) {                                                                     // 1465
      return msgArg && msgArg.error && new Meteor.Error(                                                             // 1466
        msgArg.error.error, msgArg.error.reason, msgArg.error.details);                                              // 1467
    }                                                                                                                // 1468
                                                                                                                     // 1469
    // XXX COMPAT WITH 1.0.3.1 #errorCallback                                                                        // 1470
    if (errorCallback && msg.error) {                                                                                // 1471
      errorCallback(meteorErrorFromMsg(msg));                                                                        // 1472
    }                                                                                                                // 1473
                                                                                                                     // 1474
    if (stopCallback) {                                                                                              // 1475
      stopCallback(meteorErrorFromMsg(msg));                                                                         // 1476
    }                                                                                                                // 1477
  },                                                                                                                 // 1478
                                                                                                                     // 1479
  _process_nosub: function () {                                                                                      // 1480
    // This is called as part of the "buffer until quiescence" process, but                                          // 1481
    // nosub's effect is always immediate. It only goes in the buffer at all                                         // 1482
    // because it's possible for a nosub to be the thing that triggers                                               // 1483
    // quiescence, if we were waiting for a sub to be revived and it dies                                            // 1484
    // instead.                                                                                                      // 1485
  },                                                                                                                 // 1486
                                                                                                                     // 1487
  _livedata_result: function (msg) {                                                                                 // 1488
    // id, result or error. error has error (code), reason, details                                                  // 1489
                                                                                                                     // 1490
    var self = this;                                                                                                 // 1491
                                                                                                                     // 1492
    // find the outstanding request                                                                                  // 1493
    // should be O(1) in nearly all realistic use cases                                                              // 1494
    if (_.isEmpty(self._outstandingMethodBlocks)) {                                                                  // 1495
      Meteor._debug("Received method result but no methods outstanding");                                            // 1496
      return;                                                                                                        // 1497
    }                                                                                                                // 1498
    var currentMethodBlock = self._outstandingMethodBlocks[0].methods;                                               // 1499
    var m;                                                                                                           // 1500
    for (var i = 0; i < currentMethodBlock.length; i++) {                                                            // 1501
      m = currentMethodBlock[i];                                                                                     // 1502
      if (m.methodId === msg.id)                                                                                     // 1503
        break;                                                                                                       // 1504
    }                                                                                                                // 1505
                                                                                                                     // 1506
    if (!m) {                                                                                                        // 1507
      Meteor._debug("Can't match method response to original method call", msg);                                     // 1508
      return;                                                                                                        // 1509
    }                                                                                                                // 1510
                                                                                                                     // 1511
    // Remove from current method block. This may leave the block empty, but we                                      // 1512
    // don't move on to the next block until the callback has been delivered, in                                     // 1513
    // _outstandingMethodFinished.                                                                                   // 1514
    currentMethodBlock.splice(i, 1);                                                                                 // 1515
                                                                                                                     // 1516
    if (_.has(msg, 'error')) {                                                                                       // 1517
      m.receiveResult(new Meteor.Error(                                                                              // 1518
        msg.error.error, msg.error.reason,                                                                           // 1519
        msg.error.details));                                                                                         // 1520
    } else {                                                                                                         // 1521
      // msg.result may be undefined if the method didn't return a                                                   // 1522
      // value                                                                                                       // 1523
      m.receiveResult(undefined, msg.result);                                                                        // 1524
    }                                                                                                                // 1525
  },                                                                                                                 // 1526
                                                                                                                     // 1527
  // Called by MethodInvoker after a method's callback is invoked.  If this was                                      // 1528
  // the last outstanding method in the current block, runs the next block. If                                       // 1529
  // there are no more methods, consider accepting a hot code push.                                                  // 1530
  _outstandingMethodFinished: function () {                                                                          // 1531
    var self = this;                                                                                                 // 1532
    if (self._anyMethodsAreOutstanding())                                                                            // 1533
      return;                                                                                                        // 1534
                                                                                                                     // 1535
    // No methods are outstanding. This should mean that the first block of                                          // 1536
    // methods is empty. (Or it might not exist, if this was a method that                                           // 1537
    // half-finished before disconnect/reconnect.)                                                                   // 1538
    if (! _.isEmpty(self._outstandingMethodBlocks)) {                                                                // 1539
      var firstBlock = self._outstandingMethodBlocks.shift();                                                        // 1540
      if (! _.isEmpty(firstBlock.methods))                                                                           // 1541
        throw new Error("No methods outstanding but nonempty block: " +                                              // 1542
                        JSON.stringify(firstBlock));                                                                 // 1543
                                                                                                                     // 1544
      // Send the outstanding methods now in the first block.                                                        // 1545
      if (!_.isEmpty(self._outstandingMethodBlocks))                                                                 // 1546
        self._sendOutstandingMethods();                                                                              // 1547
    }                                                                                                                // 1548
                                                                                                                     // 1549
    // Maybe accept a hot code push.                                                                                 // 1550
    self._maybeMigrate();                                                                                            // 1551
  },                                                                                                                 // 1552
                                                                                                                     // 1553
  // Sends messages for all the methods in the first block in                                                        // 1554
  // _outstandingMethodBlocks.                                                                                       // 1555
  _sendOutstandingMethods: function() {                                                                              // 1556
    var self = this;                                                                                                 // 1557
    if (_.isEmpty(self._outstandingMethodBlocks))                                                                    // 1558
      return;                                                                                                        // 1559
    _.each(self._outstandingMethodBlocks[0].methods, function (m) {                                                  // 1560
      m.sendMessage();                                                                                               // 1561
    });                                                                                                              // 1562
  },                                                                                                                 // 1563
                                                                                                                     // 1564
  _livedata_error: function (msg) {                                                                                  // 1565
    Meteor._debug("Received error from server: ", msg.reason);                                                       // 1566
    if (msg.offendingMessage)                                                                                        // 1567
      Meteor._debug("For: ", msg.offendingMessage);                                                                  // 1568
  },                                                                                                                 // 1569
                                                                                                                     // 1570
  _callOnReconnectAndSendAppropriateOutstandingMethods: function() {                                                 // 1571
    var self = this;                                                                                                 // 1572
    var oldOutstandingMethodBlocks = self._outstandingMethodBlocks;                                                  // 1573
    self._outstandingMethodBlocks = [];                                                                              // 1574
                                                                                                                     // 1575
    self.onReconnect();                                                                                              // 1576
                                                                                                                     // 1577
    if (_.isEmpty(oldOutstandingMethodBlocks))                                                                       // 1578
      return;                                                                                                        // 1579
                                                                                                                     // 1580
    // We have at least one block worth of old outstanding methods to try                                            // 1581
    // again. First: did onReconnect actually send anything? If not, we just                                         // 1582
    // restore all outstanding methods and run the first block.                                                      // 1583
    if (_.isEmpty(self._outstandingMethodBlocks)) {                                                                  // 1584
      self._outstandingMethodBlocks = oldOutstandingMethodBlocks;                                                    // 1585
      self._sendOutstandingMethods();                                                                                // 1586
      return;                                                                                                        // 1587
    }                                                                                                                // 1588
                                                                                                                     // 1589
    // OK, there are blocks on both sides. Special case: merge the last block of                                     // 1590
    // the reconnect methods with the first block of the original methods, if                                        // 1591
    // neither of them are "wait" blocks.                                                                            // 1592
    if (!_.last(self._outstandingMethodBlocks).wait &&                                                               // 1593
        !oldOutstandingMethodBlocks[0].wait) {                                                                       // 1594
      _.each(oldOutstandingMethodBlocks[0].methods, function (m) {                                                   // 1595
        _.last(self._outstandingMethodBlocks).methods.push(m);                                                       // 1596
                                                                                                                     // 1597
        // If this "last block" is also the first block, send the message.                                           // 1598
        if (self._outstandingMethodBlocks.length === 1)                                                              // 1599
          m.sendMessage();                                                                                           // 1600
      });                                                                                                            // 1601
                                                                                                                     // 1602
      oldOutstandingMethodBlocks.shift();                                                                            // 1603
    }                                                                                                                // 1604
                                                                                                                     // 1605
    // Now add the rest of the original blocks on.                                                                   // 1606
    _.each(oldOutstandingMethodBlocks, function (block) {                                                            // 1607
      self._outstandingMethodBlocks.push(block);                                                                     // 1608
    });                                                                                                              // 1609
  },                                                                                                                 // 1610
                                                                                                                     // 1611
  // We can accept a hot code push if there are no methods in flight.                                                // 1612
  _readyToMigrate: function() {                                                                                      // 1613
    var self = this;                                                                                                 // 1614
    return _.isEmpty(self._methodInvokers);                                                                          // 1615
  },                                                                                                                 // 1616
                                                                                                                     // 1617
  // If we were blocking a migration, see if it's now possible to continue.                                          // 1618
  // Call whenever the set of outstanding/blocked methods shrinks.                                                   // 1619
  _maybeMigrate: function () {                                                                                       // 1620
    var self = this;                                                                                                 // 1621
    if (self._retryMigrate && self._readyToMigrate()) {                                                              // 1622
      self._retryMigrate();                                                                                          // 1623
      self._retryMigrate = null;                                                                                     // 1624
    }                                                                                                                // 1625
  }                                                                                                                  // 1626
});                                                                                                                  // 1627
                                                                                                                     // 1628
LivedataTest.Connection = Connection;                                                                                // 1629
                                                                                                                     // 1630
// @param url {String} URL to Meteor app,                                                                            // 1631
//     e.g.:                                                                                                         // 1632
//     "subdomain.meteor.com",                                                                                       // 1633
//     "http://subdomain.meteor.com",                                                                                // 1634
//     "/",                                                                                                          // 1635
//     "ddp+sockjs://ddp--****-foo.meteor.com/sockjs"                                                                // 1636
                                                                                                                     // 1637
/**                                                                                                                  // 1638
 * @summary Connect to the server of a different Meteor application to subscribe to its document sets and invoke its remote methods.
 * @locus Anywhere                                                                                                   // 1640
 * @param {String} url The URL of another Meteor application.                                                        // 1641
 */                                                                                                                  // 1642
DDP.connect = function (url, options) {                                                                              // 1643
  var ret = new Connection(url, options);                                                                            // 1644
  allConnections.push(ret); // hack. see below.                                                                      // 1645
  return ret;                                                                                                        // 1646
};                                                                                                                   // 1647
                                                                                                                     // 1648
// Hack for `spiderable` package: a way to see if the page is done                                                   // 1649
// loading all the data it needs.                                                                                    // 1650
//                                                                                                                   // 1651
allConnections = [];                                                                                                 // 1652
DDP._allSubscriptionsReady = function () {                                                                           // 1653
  return _.all(allConnections, function (conn) {                                                                     // 1654
    return _.all(conn._subscriptions, function (sub) {                                                               // 1655
      return sub.ready;                                                                                              // 1656
    });                                                                                                              // 1657
  });                                                                                                                // 1658
};                                                                                                                   // 1659
                                                                                                                     // 1660
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['ddp-client'] = {}, {
  DDP: DDP,
  LivedataTest: LivedataTest
});

})();

//# sourceMappingURL=ddp-client.js.map
