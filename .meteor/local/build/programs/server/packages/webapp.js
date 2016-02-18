(function () {

/* Imports */
var process = Package.meteor.process;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var Log = Package.logging.Log;
var _ = Package.underscore._;
var RoutePolicy = Package.routepolicy.RoutePolicy;
var Boilerplate = Package['boilerplate-generator'].Boilerplate;
var WebAppHashing = Package['webapp-hashing'].WebAppHashing;

/* Package-scope variables */
var WebApp, WebAppInternals, main;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/webapp/webapp_server.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
////////// Requires //////////                                                                                       // 1
                                                                                                                     // 2
var fs = Npm.require("fs");                                                                                          // 3
var http = Npm.require("http");                                                                                      // 4
var os = Npm.require("os");                                                                                          // 5
var path = Npm.require("path");                                                                                      // 6
var url = Npm.require("url");                                                                                        // 7
var crypto = Npm.require("crypto");                                                                                  // 8
                                                                                                                     // 9
var connect = Npm.require('connect');                                                                                // 10
var useragent = Npm.require('useragent');                                                                            // 11
var send = Npm.require('send');                                                                                      // 12
                                                                                                                     // 13
var Future = Npm.require('fibers/future');                                                                           // 14
var Fiber = Npm.require('fibers');                                                                                   // 15
                                                                                                                     // 16
var SHORT_SOCKET_TIMEOUT = 5*1000;                                                                                   // 17
var LONG_SOCKET_TIMEOUT = 120*1000;                                                                                  // 18
                                                                                                                     // 19
WebApp = {};                                                                                                         // 20
WebAppInternals = {};                                                                                                // 21
                                                                                                                     // 22
WebAppInternals.NpmModules = {                                                                                       // 23
  connect: {                                                                                                         // 24
    version: Npm.require('connect/package.json').version,                                                            // 25
    module: connect                                                                                                  // 26
  }                                                                                                                  // 27
};                                                                                                                   // 28
                                                                                                                     // 29
WebApp.defaultArch = 'web.browser';                                                                                  // 30
                                                                                                                     // 31
// XXX maps archs to manifests                                                                                       // 32
WebApp.clientPrograms = {};                                                                                          // 33
                                                                                                                     // 34
// XXX maps archs to program path on filesystem                                                                      // 35
var archPath = {};                                                                                                   // 36
                                                                                                                     // 37
var bundledJsCssUrlRewriteHook;                                                                                      // 38
                                                                                                                     // 39
var sha1 = function (contents) {                                                                                     // 40
  var hash = crypto.createHash('sha1');                                                                              // 41
  hash.update(contents);                                                                                             // 42
  return hash.digest('hex');                                                                                         // 43
};                                                                                                                   // 44
                                                                                                                     // 45
var readUtf8FileSync = function (filename) {                                                                         // 46
  return Meteor.wrapAsync(fs.readFile)(filename, 'utf8');                                                            // 47
};                                                                                                                   // 48
                                                                                                                     // 49
// #BrowserIdentification                                                                                            // 50
//                                                                                                                   // 51
// We have multiple places that want to identify the browser: the                                                    // 52
// unsupported browser page, the appcache package, and, eventually                                                   // 53
// delivering browser polyfills only as needed.                                                                      // 54
//                                                                                                                   // 55
// To avoid detecting the browser in multiple places ad-hoc, we create a                                             // 56
// Meteor "browser" object. It uses but does not expose the npm                                                      // 57
// useragent module (we could choose a different mechanism to identify                                               // 58
// the browser in the future if we wanted to).  The browser object                                                   // 59
// contains                                                                                                          // 60
//                                                                                                                   // 61
// * `name`: the name of the browser in camel case                                                                   // 62
// * `major`, `minor`, `patch`: integers describing the browser version                                              // 63
//                                                                                                                   // 64
// Also here is an early version of a Meteor `request` object, intended                                              // 65
// to be a high-level description of the request without exposing                                                    // 66
// details of connect's low-level `req`.  Currently it contains:                                                     // 67
//                                                                                                                   // 68
// * `browser`: browser identification object described above                                                        // 69
// * `url`: parsed url, including parsed query params                                                                // 70
//                                                                                                                   // 71
// As a temporary hack there is a `categorizeRequest` function on WebApp which                                       // 72
// converts a connect `req` to a Meteor `request`. This can go away once smart                                       // 73
// packages such as appcache are being passed a `request` object directly when                                       // 74
// they serve content.                                                                                               // 75
//                                                                                                                   // 76
// This allows `request` to be used uniformly: it is passed to the html                                              // 77
// attributes hook, and the appcache package can use it when deciding                                                // 78
// whether to generate a 404 for the manifest.                                                                       // 79
//                                                                                                                   // 80
// Real routing / server side rendering will probably refactor this                                                  // 81
// heavily.                                                                                                          // 82
                                                                                                                     // 83
                                                                                                                     // 84
// e.g. "Mobile Safari" => "mobileSafari"                                                                            // 85
var camelCase = function (name) {                                                                                    // 86
  var parts = name.split(' ');                                                                                       // 87
  parts[0] = parts[0].toLowerCase();                                                                                 // 88
  for (var i = 1;  i < parts.length;  ++i) {                                                                         // 89
    parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].substr(1);                                                // 90
  }                                                                                                                  // 91
  return parts.join('');                                                                                             // 92
};                                                                                                                   // 93
                                                                                                                     // 94
var identifyBrowser = function (userAgentString) {                                                                   // 95
  var userAgent = useragent.lookup(userAgentString);                                                                 // 96
  return {                                                                                                           // 97
    name: camelCase(userAgent.family),                                                                               // 98
    major: +userAgent.major,                                                                                         // 99
    minor: +userAgent.minor,                                                                                         // 100
    patch: +userAgent.patch                                                                                          // 101
  };                                                                                                                 // 102
};                                                                                                                   // 103
                                                                                                                     // 104
// XXX Refactor as part of implementing real routing.                                                                // 105
WebAppInternals.identifyBrowser = identifyBrowser;                                                                   // 106
                                                                                                                     // 107
WebApp.categorizeRequest = function (req) {                                                                          // 108
  return {                                                                                                           // 109
    browser: identifyBrowser(req.headers['user-agent']),                                                             // 110
    url: url.parse(req.url, true)                                                                                    // 111
  };                                                                                                                 // 112
};                                                                                                                   // 113
                                                                                                                     // 114
// HTML attribute hooks: functions to be called to determine any attributes to                                       // 115
// be added to the '<html>' tag. Each function is passed a 'request' object (see                                     // 116
// #BrowserIdentification) and should return null or object.                                                         // 117
var htmlAttributeHooks = [];                                                                                         // 118
var getHtmlAttributes = function (request) {                                                                         // 119
  var combinedAttributes  = {};                                                                                      // 120
  _.each(htmlAttributeHooks || [], function (hook) {                                                                 // 121
    var attributes = hook(request);                                                                                  // 122
    if (attributes === null)                                                                                         // 123
      return;                                                                                                        // 124
    if (typeof attributes !== 'object')                                                                              // 125
      throw Error("HTML attribute hook must return null or object");                                                 // 126
    _.extend(combinedAttributes, attributes);                                                                        // 127
  });                                                                                                                // 128
  return combinedAttributes;                                                                                         // 129
};                                                                                                                   // 130
WebApp.addHtmlAttributeHook = function (hook) {                                                                      // 131
  htmlAttributeHooks.push(hook);                                                                                     // 132
};                                                                                                                   // 133
                                                                                                                     // 134
// Serve app HTML for this URL?                                                                                      // 135
var appUrl = function (url) {                                                                                        // 136
  if (url === '/favicon.ico' || url === '/robots.txt')                                                               // 137
    return false;                                                                                                    // 138
                                                                                                                     // 139
  // NOTE: app.manifest is not a web standard like favicon.ico and                                                   // 140
  // robots.txt. It is a file name we have chosen to use for HTML5                                                   // 141
  // appcache URLs. It is included here to prevent using an appcache                                                 // 142
  // then removing it from poisoning an app permanently. Eventually,                                                 // 143
  // once we have server side routing, this won't be needed as                                                       // 144
  // unknown URLs with return a 404 automatically.                                                                   // 145
  if (url === '/app.manifest')                                                                                       // 146
    return false;                                                                                                    // 147
                                                                                                                     // 148
  // Avoid serving app HTML for declared routes such as /sockjs/.                                                    // 149
  if (RoutePolicy.classify(url))                                                                                     // 150
    return false;                                                                                                    // 151
                                                                                                                     // 152
  // we currently return app HTML on all URLs by default                                                             // 153
  return true;                                                                                                       // 154
};                                                                                                                   // 155
                                                                                                                     // 156
                                                                                                                     // 157
// We need to calculate the client hash after all packages have loaded                                               // 158
// to give them a chance to populate __meteor_runtime_config__.                                                      // 159
//                                                                                                                   // 160
// Calculating the hash during startup means that packages can only                                                  // 161
// populate __meteor_runtime_config__ during load, not during startup.                                               // 162
//                                                                                                                   // 163
// Calculating instead it at the beginning of main after all startup                                                 // 164
// hooks had run would allow packages to also populate                                                               // 165
// __meteor_runtime_config__ during startup, but that's too late for                                                 // 166
// autoupdate because it needs to have the client hash at startup to                                                 // 167
// insert the auto update version itself into                                                                        // 168
// __meteor_runtime_config__ to get it to the client.                                                                // 169
//                                                                                                                   // 170
// An alternative would be to give autoupdate a "post-start,                                                         // 171
// pre-listen" hook to allow it to insert the auto update version at                                                 // 172
// the right moment.                                                                                                 // 173
                                                                                                                     // 174
Meteor.startup(function () {                                                                                         // 175
  var calculateClientHash = WebAppHashing.calculateClientHash;                                                       // 176
  WebApp.clientHash = function (archName) {                                                                          // 177
    archName = archName || WebApp.defaultArch;                                                                       // 178
    return calculateClientHash(WebApp.clientPrograms[archName].manifest);                                            // 179
  };                                                                                                                 // 180
                                                                                                                     // 181
  WebApp.calculateClientHashRefreshable = function (archName) {                                                      // 182
    archName = archName || WebApp.defaultArch;                                                                       // 183
    return calculateClientHash(WebApp.clientPrograms[archName].manifest,                                             // 184
      function (name) {                                                                                              // 185
        return name === "css";                                                                                       // 186
      });                                                                                                            // 187
  };                                                                                                                 // 188
  WebApp.calculateClientHashNonRefreshable = function (archName) {                                                   // 189
    archName = archName || WebApp.defaultArch;                                                                       // 190
    return calculateClientHash(WebApp.clientPrograms[archName].manifest,                                             // 191
      function (name) {                                                                                              // 192
        return name !== "css";                                                                                       // 193
      });                                                                                                            // 194
  };                                                                                                                 // 195
  WebApp.calculateClientHashCordova = function () {                                                                  // 196
    var archName = 'web.cordova';                                                                                    // 197
    if (! WebApp.clientPrograms[archName])                                                                           // 198
      return 'none';                                                                                                 // 199
                                                                                                                     // 200
    return calculateClientHash(                                                                                      // 201
      WebApp.clientPrograms[archName].manifest, null, _.pick(                                                        // 202
        __meteor_runtime_config__, 'PUBLIC_SETTINGS'));                                                              // 203
  };                                                                                                                 // 204
});                                                                                                                  // 205
                                                                                                                     // 206
                                                                                                                     // 207
                                                                                                                     // 208
// When we have a request pending, we want the socket timeout to be long, to                                         // 209
// give ourselves a while to serve it, and to allow sockjs long polls to                                             // 210
// complete.  On the other hand, we want to close idle sockets relatively                                            // 211
// quickly, so that we can shut down relatively promptly but cleanly, without                                        // 212
// cutting off anyone's response.                                                                                    // 213
WebApp._timeoutAdjustmentRequestCallback = function (req, res) {                                                     // 214
  // this is really just req.socket.setTimeout(LONG_SOCKET_TIMEOUT);                                                 // 215
  req.setTimeout(LONG_SOCKET_TIMEOUT);                                                                               // 216
  // Insert our new finish listener to run BEFORE the existing one which removes                                     // 217
  // the response from the socket.                                                                                   // 218
  var finishListeners = res.listeners('finish');                                                                     // 219
  // XXX Apparently in Node 0.12 this event is now called 'prefinish'.                                               // 220
  // https://github.com/joyent/node/commit/7c9b6070                                                                  // 221
  res.removeAllListeners('finish');                                                                                  // 222
  res.on('finish', function () {                                                                                     // 223
    res.setTimeout(SHORT_SOCKET_TIMEOUT);                                                                            // 224
  });                                                                                                                // 225
  _.each(finishListeners, function (l) { res.on('finish', l); });                                                    // 226
};                                                                                                                   // 227
                                                                                                                     // 228
                                                                                                                     // 229
// Will be updated by main before we listen.                                                                         // 230
// Map from client arch to boilerplate object.                                                                       // 231
// Boilerplate object has:                                                                                           // 232
//   - func: XXX                                                                                                     // 233
//   - baseData: XXX                                                                                                 // 234
var boilerplateByArch = {};                                                                                          // 235
                                                                                                                     // 236
// Given a request (as returned from `categorizeRequest`), return the                                                // 237
// boilerplate HTML to serve for that request. Memoizes on HTML                                                      // 238
// attributes (used by, eg, appcache) and whether inline scripts are                                                 // 239
// currently allowed.                                                                                                // 240
// XXX so far this function is always called with arch === 'web.browser'                                             // 241
var memoizedBoilerplate = {};                                                                                        // 242
var getBoilerplate = function (request, arch) {                                                                      // 243
                                                                                                                     // 244
  var htmlAttributes = getHtmlAttributes(request);                                                                   // 245
                                                                                                                     // 246
  // The only thing that changes from request to request (for now) are                                               // 247
  // the HTML attributes (used by, eg, appcache) and whether inline                                                  // 248
  // scripts are allowed, so we can memoize based on that.                                                           // 249
  var memHash = JSON.stringify({                                                                                     // 250
    inlineScriptsAllowed: inlineScriptsAllowed,                                                                      // 251
    htmlAttributes: htmlAttributes,                                                                                  // 252
    arch: arch                                                                                                       // 253
  });                                                                                                                // 254
                                                                                                                     // 255
  if (! memoizedBoilerplate[memHash]) {                                                                              // 256
    memoizedBoilerplate[memHash] = boilerplateByArch[arch].toHTML({                                                  // 257
      htmlAttributes: htmlAttributes                                                                                 // 258
    });                                                                                                              // 259
  }                                                                                                                  // 260
  return memoizedBoilerplate[memHash];                                                                               // 261
};                                                                                                                   // 262
                                                                                                                     // 263
WebAppInternals.generateBoilerplateInstance = function (arch,                                                        // 264
                                                        manifest,                                                    // 265
                                                        additionalOptions) {                                         // 266
  additionalOptions = additionalOptions || {};                                                                       // 267
                                                                                                                     // 268
  var runtimeConfig = _.extend(                                                                                      // 269
    _.clone(__meteor_runtime_config__),                                                                              // 270
    additionalOptions.runtimeConfigOverrides || {}                                                                   // 271
  );                                                                                                                 // 272
                                                                                                                     // 273
  var jsCssUrlRewriteHook = bundledJsCssUrlRewriteHook || function (url) {                                           // 274
    var bundledPrefix =                                                                                              // 275
       __meteor_runtime_config__.ROOT_URL_PATH_PREFIX || '';                                                         // 276
    return bundledPrefix + url;                                                                                      // 277
  };                                                                                                                 // 278
                                                                                                                     // 279
  return new Boilerplate(arch, manifest,                                                                             // 280
    _.extend({                                                                                                       // 281
      pathMapper: function (itemPath) {                                                                              // 282
        return path.join(archPath[arch], itemPath); },                                                               // 283
      baseDataExtension: {                                                                                           // 284
        additionalStaticJs: _.map(                                                                                   // 285
          additionalStaticJs || [],                                                                                  // 286
          function (contents, pathname) {                                                                            // 287
            return {                                                                                                 // 288
              pathname: pathname,                                                                                    // 289
              contents: contents                                                                                     // 290
            };                                                                                                       // 291
          }                                                                                                          // 292
        ),                                                                                                           // 293
        // Convert to a JSON string, then get rid of most weird characters, then                                     // 294
        // wrap in double quotes. (The outermost JSON.stringify really ought to                                      // 295
        // just be "wrap in double quotes" but we use it to be safe.) This might                                     // 296
        // end up inside a <script> tag so we need to be careful to not include                                      // 297
        // "</script>", but normal {{spacebars}} escaping escapes too much! See                                      // 298
        // https://github.com/meteor/meteor/issues/3730                                                              // 299
        meteorRuntimeConfig: JSON.stringify(                                                                         // 300
          encodeURIComponent(JSON.stringify(runtimeConfig))),                                                        // 301
        rootUrlPathPrefix: __meteor_runtime_config__.ROOT_URL_PATH_PREFIX || '',                                     // 302
        bundledJsCssUrlRewriteHook: jsCssUrlRewriteHook,                                                             // 303
        inlineScriptsAllowed: WebAppInternals.inlineScriptsAllowed(),                                                // 304
        inline: additionalOptions.inline                                                                             // 305
      }                                                                                                              // 306
    }, additionalOptions)                                                                                            // 307
  );                                                                                                                 // 308
};                                                                                                                   // 309
                                                                                                                     // 310
// A mapping from url path to "info". Where "info" has the following fields:                                         // 311
// - type: the type of file to be served                                                                             // 312
// - cacheable: optionally, whether the file should be cached or not                                                 // 313
// - sourceMapUrl: optionally, the url of the source map                                                             // 314
//                                                                                                                   // 315
// Info also contains one of the following:                                                                          // 316
// - content: the stringified content that should be served at this path                                             // 317
// - absolutePath: the absolute path on disk to the file                                                             // 318
                                                                                                                     // 319
var staticFiles;                                                                                                     // 320
                                                                                                                     // 321
// Serve static files from the manifest or added with                                                                // 322
// `addStaticJs`. Exported for tests.                                                                                // 323
WebAppInternals.staticFilesMiddleware = function (staticFiles, req, res, next) {                                     // 324
  if ('GET' != req.method && 'HEAD' != req.method) {                                                                 // 325
    next();                                                                                                          // 326
    return;                                                                                                          // 327
  }                                                                                                                  // 328
  var pathname = connect.utils.parseUrl(req).pathname;                                                               // 329
  try {                                                                                                              // 330
    pathname = decodeURIComponent(pathname);                                                                         // 331
  } catch (e) {                                                                                                      // 332
    next();                                                                                                          // 333
    return;                                                                                                          // 334
  }                                                                                                                  // 335
                                                                                                                     // 336
  var serveStaticJs = function (s) {                                                                                 // 337
    res.writeHead(200, {                                                                                             // 338
      'Content-type': 'application/javascript; charset=UTF-8'                                                        // 339
    });                                                                                                              // 340
    res.write(s);                                                                                                    // 341
    res.end();                                                                                                       // 342
  };                                                                                                                 // 343
                                                                                                                     // 344
  if (pathname === "/meteor_runtime_config.js" &&                                                                    // 345
      ! WebAppInternals.inlineScriptsAllowed()) {                                                                    // 346
    serveStaticJs("__meteor_runtime_config__ = " +                                                                   // 347
                  JSON.stringify(__meteor_runtime_config__) + ";");                                                  // 348
    return;                                                                                                          // 349
  } else if (_.has(additionalStaticJs, pathname) &&                                                                  // 350
              ! WebAppInternals.inlineScriptsAllowed()) {                                                            // 351
    serveStaticJs(additionalStaticJs[pathname]);                                                                     // 352
    return;                                                                                                          // 353
  }                                                                                                                  // 354
                                                                                                                     // 355
  if (!_.has(staticFiles, pathname)) {                                                                               // 356
    next();                                                                                                          // 357
    return;                                                                                                          // 358
  }                                                                                                                  // 359
                                                                                                                     // 360
  // We don't need to call pause because, unlike 'static', once we call into                                         // 361
  // 'send' and yield to the event loop, we never call another handler with                                          // 362
  // 'next'.                                                                                                         // 363
                                                                                                                     // 364
  var info = staticFiles[pathname];                                                                                  // 365
                                                                                                                     // 366
  // Cacheable files are files that should never change. Typically                                                   // 367
  // named by their hash (eg meteor bundled js and css files).                                                       // 368
  // We cache them ~forever (1yr).                                                                                   // 369
  //                                                                                                                 // 370
  // We cache non-cacheable files anyway. This isn't really correct, as users                                        // 371
  // can change the files and changes won't propagate immediately. However, if                                       // 372
  // we don't cache them, browsers will 'flicker' when rerendering                                                   // 373
  // images. Eventually we will probably want to rewrite URLs of static assets                                       // 374
  // to include a query parameter to bust caches. That way we can both get                                           // 375
  // good caching behavior and allow users to change assets without delay.                                           // 376
  // https://github.com/meteor/meteor/issues/773                                                                     // 377
  var maxAge = info.cacheable                                                                                        // 378
        ? 1000 * 60 * 60 * 24 * 365                                                                                  // 379
        : 1000 * 60 * 60 * 24;                                                                                       // 380
                                                                                                                     // 381
  // Set the X-SourceMap header, which current Chrome, FireFox, and Safari                                           // 382
  // understand.  (The SourceMap header is slightly more spec-correct but FF                                         // 383
  // doesn't understand it.)                                                                                         // 384
  //                                                                                                                 // 385
  // You may also need to enable source maps in Chrome: open dev tools, click                                        // 386
  // the gear in the bottom right corner, and select "enable source maps".                                           // 387
  if (info.sourceMapUrl) {                                                                                           // 388
    res.setHeader('X-SourceMap',                                                                                     // 389
                  __meteor_runtime_config__.ROOT_URL_PATH_PREFIX +                                                   // 390
                  info.sourceMapUrl);                                                                                // 391
  }                                                                                                                  // 392
                                                                                                                     // 393
  if (info.type === "js") {                                                                                          // 394
    res.setHeader("Content-Type", "application/javascript; charset=UTF-8");                                          // 395
  } else if (info.type === "css") {                                                                                  // 396
    res.setHeader("Content-Type", "text/css; charset=UTF-8");                                                        // 397
  } else if (info.type === "json") {                                                                                 // 398
    res.setHeader("Content-Type", "application/json; charset=UTF-8");                                                // 399
    // XXX if it is a manifest we are serving, set additional headers                                                // 400
    if (/\/manifest\.json$/.test(pathname)) {                                                                        // 401
      res.setHeader("Access-Control-Allow-Origin", "*");                                                             // 402
    }                                                                                                                // 403
  }                                                                                                                  // 404
                                                                                                                     // 405
  if (info.content) {                                                                                                // 406
    res.write(info.content);                                                                                         // 407
    res.end();                                                                                                       // 408
  } else {                                                                                                           // 409
    send(req, info.absolutePath)                                                                                     // 410
      .maxage(maxAge)                                                                                                // 411
      .hidden(true)  // if we specified a dotfile in the manifest, serve it                                          // 412
      .on('error', function (err) {                                                                                  // 413
        Log.error("Error serving static file " + err);                                                               // 414
        res.writeHead(500);                                                                                          // 415
        res.end();                                                                                                   // 416
      })                                                                                                             // 417
      .on('directory', function () {                                                                                 // 418
        Log.error("Unexpected directory " + info.absolutePath);                                                      // 419
        res.writeHead(500);                                                                                          // 420
        res.end();                                                                                                   // 421
      })                                                                                                             // 422
      .pipe(res);                                                                                                    // 423
  }                                                                                                                  // 424
};                                                                                                                   // 425
                                                                                                                     // 426
var getUrlPrefixForArch = function (arch) {                                                                          // 427
  // XXX we rely on the fact that arch names don't contain slashes                                                   // 428
  // in that case we would need to uri escape it                                                                     // 429
                                                                                                                     // 430
  // We add '__' to the beginning of non-standard archs to "scope" the url                                           // 431
  // to Meteor internals.                                                                                            // 432
  return arch === WebApp.defaultArch ?                                                                               // 433
    '' : '/' + '__' + arch.replace(/^web\./, '');                                                                    // 434
};                                                                                                                   // 435
                                                                                                                     // 436
// parse port to see if its a Windows Server style named pipe. If so, return as-is (String), otherwise return as Int
WebAppInternals.parsePort = function (port) {                                                                        // 438
  if( /\\\\?.+\\pipe\\?.+/.test(port) ) {                                                                            // 439
    return port;                                                                                                     // 440
  }                                                                                                                  // 441
                                                                                                                     // 442
  return parseInt(port);                                                                                             // 443
};                                                                                                                   // 444
                                                                                                                     // 445
var runWebAppServer = function () {                                                                                  // 446
  var shuttingDown = false;                                                                                          // 447
  var syncQueue = new Meteor._SynchronousQueue();                                                                    // 448
                                                                                                                     // 449
  var getItemPathname = function (itemUrl) {                                                                         // 450
    return decodeURIComponent(url.parse(itemUrl).pathname);                                                          // 451
  };                                                                                                                 // 452
                                                                                                                     // 453
  WebAppInternals.reloadClientPrograms = function () {                                                               // 454
    syncQueue.runTask(function() {                                                                                   // 455
      staticFiles = {};                                                                                              // 456
      var generateClientProgram = function (clientPath, arch) {                                                      // 457
        // read the control for the client we'll be serving up                                                       // 458
        var clientJsonPath = path.join(__meteor_bootstrap__.serverDir,                                               // 459
                                   clientPath);                                                                      // 460
        var clientDir = path.dirname(clientJsonPath);                                                                // 461
        var clientJson = JSON.parse(readUtf8FileSync(clientJsonPath));                                               // 462
        if (clientJson.format !== "web-program-pre1")                                                                // 463
          throw new Error("Unsupported format for client assets: " +                                                 // 464
                          JSON.stringify(clientJson.format));                                                        // 465
                                                                                                                     // 466
        if (! clientJsonPath || ! clientDir || ! clientJson)                                                         // 467
          throw new Error("Client config file not parsed.");                                                         // 468
                                                                                                                     // 469
        var urlPrefix = getUrlPrefixForArch(arch);                                                                   // 470
                                                                                                                     // 471
        var manifest = clientJson.manifest;                                                                          // 472
        _.each(manifest, function (item) {                                                                           // 473
          if (item.url && item.where === "client") {                                                                 // 474
            staticFiles[urlPrefix + getItemPathname(item.url)] = {                                                   // 475
              absolutePath: path.join(clientDir, item.path),                                                         // 476
              cacheable: item.cacheable,                                                                             // 477
              // Link from source to its map                                                                         // 478
              sourceMapUrl: item.sourceMapUrl,                                                                       // 479
              type: item.type                                                                                        // 480
            };                                                                                                       // 481
                                                                                                                     // 482
            if (item.sourceMap) {                                                                                    // 483
              // Serve the source map too, under the specified URL. We assume all                                    // 484
              // source maps are cacheable.                                                                          // 485
              staticFiles[urlPrefix + getItemPathname(item.sourceMapUrl)] = {                                        // 486
                absolutePath: path.join(clientDir, item.sourceMap),                                                  // 487
                cacheable: true                                                                                      // 488
              };                                                                                                     // 489
            }                                                                                                        // 490
          }                                                                                                          // 491
        });                                                                                                          // 492
                                                                                                                     // 493
        var program = {                                                                                              // 494
          manifest: manifest,                                                                                        // 495
          version: WebAppHashing.calculateClientHash(manifest, null, _.pick(                                         // 496
            __meteor_runtime_config__, 'PUBLIC_SETTINGS')),                                                          // 497
          PUBLIC_SETTINGS: __meteor_runtime_config__.PUBLIC_SETTINGS                                                 // 498
        };                                                                                                           // 499
                                                                                                                     // 500
        WebApp.clientPrograms[arch] = program;                                                                       // 501
                                                                                                                     // 502
        // Serve the program as a string at /foo/<arch>/manifest.json                                                // 503
        // XXX change manifest.json -> program.json                                                                  // 504
        staticFiles[path.join(urlPrefix, getItemPathname('/manifest.json'))] = {                                     // 505
          content: JSON.stringify(program),                                                                          // 506
          cacheable: true,                                                                                           // 507
          type: "json"                                                                                               // 508
        };                                                                                                           // 509
      };                                                                                                             // 510
                                                                                                                     // 511
      try {                                                                                                          // 512
        var clientPaths = __meteor_bootstrap__.configJson.clientPaths;                                               // 513
        _.each(clientPaths, function (clientPath, arch) {                                                            // 514
          archPath[arch] = path.dirname(clientPath);                                                                 // 515
          generateClientProgram(clientPath, arch);                                                                   // 516
        });                                                                                                          // 517
                                                                                                                     // 518
        // Exported for tests.                                                                                       // 519
        WebAppInternals.staticFiles = staticFiles;                                                                   // 520
      } catch (e) {                                                                                                  // 521
        Log.error("Error reloading the client program: " + e.stack);                                                 // 522
        process.exit(1);                                                                                             // 523
      }                                                                                                              // 524
    });                                                                                                              // 525
  };                                                                                                                 // 526
                                                                                                                     // 527
  WebAppInternals.generateBoilerplate = function () {                                                                // 528
    // This boilerplate will be served to the mobile devices when used with                                          // 529
    // Meteor/Cordova for the Hot-Code Push and since the file will be served by                                     // 530
    // the device's server, it is important to set the DDP url to the actual                                         // 531
    // Meteor server accepting DDP connections and not the device's file server.                                     // 532
    var defaultOptionsForArch = {                                                                                    // 533
      'web.cordova': {                                                                                               // 534
        runtimeConfigOverrides: {                                                                                    // 535
          // XXX We use absoluteUrl() here so that we serve https://                                                 // 536
          // URLs to cordova clients if force-ssl is in use. If we were                                              // 537
          // to use __meteor_runtime_config__.ROOT_URL instead of                                                    // 538
          // absoluteUrl(), then Cordova clients would immediately get a                                             // 539
          // HCP setting their DDP_DEFAULT_CONNECTION_URL to                                                         // 540
          // http://example.meteor.com. This breaks the app, because                                                 // 541
          // force-ssl doesn't serve CORS headers on 302                                                             // 542
          // redirects. (Plus it's undesirable to have clients                                                       // 543
          // connecting to http://example.meteor.com when force-ssl is                                               // 544
          // in use.)                                                                                                // 545
          DDP_DEFAULT_CONNECTION_URL: process.env.MOBILE_DDP_URL ||                                                  // 546
            Meteor.absoluteUrl(),                                                                                    // 547
          ROOT_URL: process.env.MOBILE_ROOT_URL ||                                                                   // 548
            Meteor.absoluteUrl()                                                                                     // 549
        }                                                                                                            // 550
      }                                                                                                              // 551
    };                                                                                                               // 552
                                                                                                                     // 553
    syncQueue.runTask(function() {                                                                                   // 554
      _.each(WebApp.clientPrograms, function (program, archName) {                                                   // 555
        boilerplateByArch[archName] =                                                                                // 556
          WebAppInternals.generateBoilerplateInstance(                                                               // 557
            archName, program.manifest,                                                                              // 558
            defaultOptionsForArch[archName]);                                                                        // 559
      });                                                                                                            // 560
                                                                                                                     // 561
      // Clear the memoized boilerplate cache.                                                                       // 562
      memoizedBoilerplate = {};                                                                                      // 563
                                                                                                                     // 564
      // Configure CSS injection for the default arch                                                                // 565
      // XXX implement the CSS injection for all archs?                                                              // 566
      WebAppInternals.refreshableAssets = {                                                                          // 567
        allCss: boilerplateByArch[WebApp.defaultArch].baseData.css                                                   // 568
      };                                                                                                             // 569
    });                                                                                                              // 570
  };                                                                                                                 // 571
                                                                                                                     // 572
  WebAppInternals.reloadClientPrograms();                                                                            // 573
                                                                                                                     // 574
  // webserver                                                                                                       // 575
  var app = connect();                                                                                               // 576
                                                                                                                     // 577
  // Auto-compress any json, javascript, or text.                                                                    // 578
  app.use(connect.compress());                                                                                       // 579
                                                                                                                     // 580
  // Packages and apps can add handlers that run before any other Meteor                                             // 581
  // handlers via WebApp.rawConnectHandlers.                                                                         // 582
  var rawConnectHandlers = connect();                                                                                // 583
  app.use(rawConnectHandlers);                                                                                       // 584
                                                                                                                     // 585
  // We're not a proxy; reject (without crashing) attempts to treat us like                                          // 586
  // one. (See #1212.)                                                                                               // 587
  app.use(function(req, res, next) {                                                                                 // 588
    if (RoutePolicy.isValidUrl(req.url)) {                                                                           // 589
      next();                                                                                                        // 590
      return;                                                                                                        // 591
    }                                                                                                                // 592
    res.writeHead(400);                                                                                              // 593
    res.write("Not a proxy");                                                                                        // 594
    res.end();                                                                                                       // 595
  });                                                                                                                // 596
                                                                                                                     // 597
  // Strip off the path prefix, if it exists.                                                                        // 598
  app.use(function (request, response, next) {                                                                       // 599
    var pathPrefix = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX;                                                 // 600
    var url = Npm.require('url').parse(request.url);                                                                 // 601
    var pathname = url.pathname;                                                                                     // 602
    // check if the path in the url starts with the path prefix (and the part                                        // 603
    // after the path prefix must start with a / if it exists.)                                                      // 604
    if (pathPrefix && pathname.substring(0, pathPrefix.length) === pathPrefix &&                                     // 605
       (pathname.length == pathPrefix.length                                                                         // 606
        || pathname.substring(pathPrefix.length, pathPrefix.length + 1) === "/")) {                                  // 607
      request.url = request.url.substring(pathPrefix.length);                                                        // 608
      next();                                                                                                        // 609
    } else if (pathname === "/favicon.ico" || pathname === "/robots.txt") {                                          // 610
      next();                                                                                                        // 611
    } else if (pathPrefix) {                                                                                         // 612
      response.writeHead(404);                                                                                       // 613
      response.write("Unknown path");                                                                                // 614
      response.end();                                                                                                // 615
    } else {                                                                                                         // 616
      next();                                                                                                        // 617
    }                                                                                                                // 618
  });                                                                                                                // 619
                                                                                                                     // 620
  // Parse the query string into res.query. Used by oauth_server, but it's                                           // 621
  // generally pretty handy..                                                                                        // 622
  app.use(connect.query());                                                                                          // 623
                                                                                                                     // 624
  // Serve static files from the manifest.                                                                           // 625
  // This is inspired by the 'static' middleware.                                                                    // 626
  app.use(function (req, res, next) {                                                                                // 627
    Fiber(function () {                                                                                              // 628
     WebAppInternals.staticFilesMiddleware(staticFiles, req, res, next);                                             // 629
    }).run();                                                                                                        // 630
  });                                                                                                                // 631
                                                                                                                     // 632
  // Packages and apps can add handlers to this via WebApp.connectHandlers.                                          // 633
  // They are inserted before our default handler.                                                                   // 634
  var packageAndAppHandlers = connect();                                                                             // 635
  app.use(packageAndAppHandlers);                                                                                    // 636
                                                                                                                     // 637
  var suppressConnectErrors = false;                                                                                 // 638
  // connect knows it is an error handler because it has 4 arguments instead of                                      // 639
  // 3. go figure.  (It is not smart enough to find such a thing if it's hidden                                      // 640
  // inside packageAndAppHandlers.)                                                                                  // 641
  app.use(function (err, req, res, next) {                                                                           // 642
    if (!err || !suppressConnectErrors || !req.headers['x-suppress-error']) {                                        // 643
      next(err);                                                                                                     // 644
      return;                                                                                                        // 645
    }                                                                                                                // 646
    res.writeHead(err.status, { 'Content-Type': 'text/plain' });                                                     // 647
    res.end("An error message");                                                                                     // 648
  });                                                                                                                // 649
                                                                                                                     // 650
  app.use(function (req, res, next) {                                                                                // 651
    if (! appUrl(req.url))                                                                                           // 652
      return next();                                                                                                 // 653
                                                                                                                     // 654
    var headers = {                                                                                                  // 655
      'Content-Type':  'text/html; charset=utf-8'                                                                    // 656
    };                                                                                                               // 657
    if (shuttingDown)                                                                                                // 658
      headers['Connection'] = 'Close';                                                                               // 659
                                                                                                                     // 660
    var request = WebApp.categorizeRequest(req);                                                                     // 661
                                                                                                                     // 662
    if (request.url.query && request.url.query['meteor_css_resource']) {                                             // 663
      // In this case, we're requesting a CSS resource in the meteor-specific                                        // 664
      // way, but we don't have it.  Serve a static css file that indicates that                                     // 665
      // we didn't have it, so we can detect that and refresh.  Make sure                                            // 666
      // that any proxies or CDNs don't cache this error!  (Normally proxies                                         // 667
      // or CDNs are smart enough not to cache error pages, but in order to                                          // 668
      // make this hack work, we need to return the CSS file as a 200, which                                         // 669
      // would otherwise be cached.)                                                                                 // 670
      headers['Content-Type'] = 'text/css; charset=utf-8';                                                           // 671
      headers['Cache-Control'] = 'no-cache';                                                                         // 672
      res.writeHead(200, headers);                                                                                   // 673
      res.write(".meteor-css-not-found-error { width: 0px;}");                                                       // 674
      res.end();                                                                                                     // 675
      return undefined;                                                                                              // 676
    }                                                                                                                // 677
                                                                                                                     // 678
    if (request.url.query && request.url.query['meteor_js_resource']) {                                              // 679
      // Similarly, we're requesting a JS resource that we don't have.                                               // 680
      // Serve an uncached 404. (We can't use the same hack we use for CSS,                                          // 681
      // because actually acting on that hack requires us to have the JS                                             // 682
      // already!)                                                                                                   // 683
      headers['Cache-Control'] = 'no-cache';                                                                         // 684
      res.writeHead(404, headers);                                                                                   // 685
      res.end("404 Not Found");                                                                                      // 686
      return undefined;                                                                                              // 687
    }                                                                                                                // 688
                                                                                                                     // 689
    // /packages/asdfsad ... /__cordova/dafsdf.js                                                                    // 690
    var pathname = connect.utils.parseUrl(req).pathname;                                                             // 691
    var archKey = pathname.split('/')[1];                                                                            // 692
    var archKeyCleaned = 'web.' + archKey.replace(/^__/, '');                                                        // 693
                                                                                                                     // 694
    if (! /^__/.test(archKey) || ! _.has(archPath, archKeyCleaned)) {                                                // 695
      archKey = WebApp.defaultArch;                                                                                  // 696
    } else {                                                                                                         // 697
      archKey = archKeyCleaned;                                                                                      // 698
    }                                                                                                                // 699
                                                                                                                     // 700
    var boilerplate;                                                                                                 // 701
    try {                                                                                                            // 702
      boilerplate = getBoilerplate(request, archKey);                                                                // 703
    } catch (e) {                                                                                                    // 704
      Log.error("Error running template: " + e);                                                                     // 705
      res.writeHead(500, headers);                                                                                   // 706
      res.end();                                                                                                     // 707
      return undefined;                                                                                              // 708
    }                                                                                                                // 709
                                                                                                                     // 710
    res.writeHead(200, headers);                                                                                     // 711
    res.write(boilerplate);                                                                                          // 712
    res.end();                                                                                                       // 713
    return undefined;                                                                                                // 714
  });                                                                                                                // 715
                                                                                                                     // 716
  // Return 404 by default, if no other handlers serve this URL.                                                     // 717
  app.use(function (req, res) {                                                                                      // 718
    res.writeHead(404);                                                                                              // 719
    res.end();                                                                                                       // 720
  });                                                                                                                // 721
                                                                                                                     // 722
                                                                                                                     // 723
  var httpServer = http.createServer(app);                                                                           // 724
  var onListeningCallbacks = [];                                                                                     // 725
                                                                                                                     // 726
  // After 5 seconds w/o data on a socket, kill it.  On the other hand, if                                           // 727
  // there's an outstanding request, give it a higher timeout instead (to avoid                                      // 728
  // killing long-polling requests)                                                                                  // 729
  httpServer.setTimeout(SHORT_SOCKET_TIMEOUT);                                                                       // 730
                                                                                                                     // 731
  // Do this here, and then also in livedata/stream_server.js, because                                               // 732
  // stream_server.js kills all the current request handlers when installing its                                     // 733
  // own.                                                                                                            // 734
  httpServer.on('request', WebApp._timeoutAdjustmentRequestCallback);                                                // 735
                                                                                                                     // 736
                                                                                                                     // 737
  // start up app                                                                                                    // 738
  _.extend(WebApp, {                                                                                                 // 739
    connectHandlers: packageAndAppHandlers,                                                                          // 740
    rawConnectHandlers: rawConnectHandlers,                                                                          // 741
    httpServer: httpServer,                                                                                          // 742
    // For testing.                                                                                                  // 743
    suppressConnectErrors: function () {                                                                             // 744
      suppressConnectErrors = true;                                                                                  // 745
    },                                                                                                               // 746
    onListening: function (f) {                                                                                      // 747
      if (onListeningCallbacks)                                                                                      // 748
        onListeningCallbacks.push(f);                                                                                // 749
      else                                                                                                           // 750
        f();                                                                                                         // 751
    }                                                                                                                // 752
  });                                                                                                                // 753
                                                                                                                     // 754
  // Let the rest of the packages (and Meteor.startup hooks) insert connect                                          // 755
  // middlewares and update __meteor_runtime_config__, then keep going to set up                                     // 756
  // actually serving HTML.                                                                                          // 757
  main = function (argv) {                                                                                           // 758
    WebAppInternals.generateBoilerplate();                                                                           // 759
                                                                                                                     // 760
    // only start listening after all the startup code has run.                                                      // 761
    var localPort = WebAppInternals.parsePort(process.env.PORT) || 0;                                                // 762
    var host = process.env.BIND_IP;                                                                                  // 763
    var localIp = host || '0.0.0.0';                                                                                 // 764
    httpServer.listen(localPort, localIp, Meteor.bindEnvironment(function() {                                        // 765
      if (process.env.METEOR_PRINT_ON_LISTEN)                                                                        // 766
        console.log("LISTENING"); // must match run-app.js                                                           // 767
                                                                                                                     // 768
      var callbacks = onListeningCallbacks;                                                                          // 769
      onListeningCallbacks = null;                                                                                   // 770
      _.each(callbacks, function (x) { x(); });                                                                      // 771
                                                                                                                     // 772
    }, function (e) {                                                                                                // 773
      console.error("Error listening:", e);                                                                          // 774
      console.error(e && e.stack);                                                                                   // 775
    }));                                                                                                             // 776
                                                                                                                     // 777
    return 'DAEMON';                                                                                                 // 778
  };                                                                                                                 // 779
};                                                                                                                   // 780
                                                                                                                     // 781
                                                                                                                     // 782
runWebAppServer();                                                                                                   // 783
                                                                                                                     // 784
                                                                                                                     // 785
var inlineScriptsAllowed = true;                                                                                     // 786
                                                                                                                     // 787
WebAppInternals.inlineScriptsAllowed = function () {                                                                 // 788
  return inlineScriptsAllowed;                                                                                       // 789
};                                                                                                                   // 790
                                                                                                                     // 791
WebAppInternals.setInlineScriptsAllowed = function (value) {                                                         // 792
  inlineScriptsAllowed = value;                                                                                      // 793
  WebAppInternals.generateBoilerplate();                                                                             // 794
};                                                                                                                   // 795
                                                                                                                     // 796
                                                                                                                     // 797
WebAppInternals.setBundledJsCssUrlRewriteHook = function (hookFn) {                                                  // 798
  bundledJsCssUrlRewriteHook = hookFn;                                                                               // 799
  WebAppInternals.generateBoilerplate();                                                                             // 800
};                                                                                                                   // 801
                                                                                                                     // 802
WebAppInternals.setBundledJsCssPrefix = function (prefix) {                                                          // 803
  var self = this;                                                                                                   // 804
  self.setBundledJsCssUrlRewriteHook(                                                                                // 805
    function (url) {                                                                                                 // 806
      return prefix + url;                                                                                           // 807
  });                                                                                                                // 808
};                                                                                                                   // 809
                                                                                                                     // 810
// Packages can call `WebAppInternals.addStaticJs` to specify static                                                 // 811
// JavaScript to be included in the app. This static JS will be inlined,                                             // 812
// unless inline scripts have been disabled, in which case it will be                                                // 813
// served under `/<sha1 of contents>`.                                                                               // 814
var additionalStaticJs = {};                                                                                         // 815
WebAppInternals.addStaticJs = function (contents) {                                                                  // 816
  additionalStaticJs["/" + sha1(contents) + ".js"] = contents;                                                       // 817
};                                                                                                                   // 818
                                                                                                                     // 819
// Exported for tests                                                                                                // 820
WebAppInternals.getBoilerplate = getBoilerplate;                                                                     // 821
WebAppInternals.additionalStaticJs = additionalStaticJs;                                                             // 822
                                                                                                                     // 823
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.webapp = {}, {
  WebApp: WebApp,
  main: main,
  WebAppInternals: WebAppInternals
});

})();

//# sourceMappingURL=webapp.js.map
