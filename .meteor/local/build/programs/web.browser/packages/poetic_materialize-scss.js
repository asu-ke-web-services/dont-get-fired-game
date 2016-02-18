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
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;

/* Package-scope variables */
var Materialize, validate_field, $select, selectedOption, activateOption, filterQuery, onKeyDown, letter, string, newOption, activeOption, $caption, $interval, $curr_slide, curr_index, $index, $this, namesCount, createDayLabel, createWeekdayLabel;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/poetic_materialize-scss/bower_components/materialize/dist/js/materialize.js                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/*!                                                                                                                   // 1
 * Materialize v0.97.0 (http://materializecss.com)                                                                    // 2
 * Copyright 2014-2015 Materialize                                                                                    // 3
 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)                                 // 4
 */                                                                                                                   // 5
/*                                                                                                                    // 6
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/                                                      // 7
 *                                                                                                                    // 8
 * Uses the built in easing capabilities added In jQuery 1.1                                                          // 9
 * to offer multiple easing options                                                                                   // 10
 *                                                                                                                    // 11
 * TERMS OF USE - jQuery Easing                                                                                       // 12
 *                                                                                                                    // 13
 * Open source under the BSD License.                                                                                 // 14
 *                                                                                                                    // 15
 * Copyright © 2008 George McGinley Smith                                                                             // 16
 * All rights reserved.                                                                                               // 17
 *                                                                                                                    // 18
 * Redistribution and use in source and binary forms, with or without modification,                                   // 19
 * are permitted provided that the following conditions are met:                                                      // 20
 *                                                                                                                    // 21
 * Redistributions of source code must retain the above copyright notice, this list of                                // 22
 * conditions and the following disclaimer.                                                                           // 23
 * Redistributions in binary form must reproduce the above copyright notice, this list                                // 24
 * of conditions and the following disclaimer in the documentation and/or other materials                             // 25
 * provided with the distribution.                                                                                    // 26
 *                                                                                                                    // 27
 * Neither the name of the author nor the names of contributors may be used to endorse                                // 28
 * or promote products derived from this software without specific prior written permission.                          // 29
 *                                                                                                                    // 30
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY                                // 31
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF                            // 32
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE                         // 33
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,                          // 34
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE                     // 35
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED                        // 36
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING                          // 37
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED                      // 38
 * OF THE POSSIBILITY OF SUCH DAMAGE.                                                                                 // 39
 *                                                                                                                    // 40
*/                                                                                                                    // 41
                                                                                                                      // 42
// t: current time, b: begInnIng value, c: change In value, d: duration                                               // 43
jQuery.easing['jswing'] = jQuery.easing['swing'];                                                                     // 44
                                                                                                                      // 45
jQuery.extend( jQuery.easing,                                                                                         // 46
{                                                                                                                     // 47
	def: 'easeOutQuad',                                                                                                  // 48
	swing: function (x, t, b, c, d) {                                                                                    // 49
		//alert(jQuery.easing.default);                                                                                     // 50
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);                                                             // 51
	},                                                                                                                   // 52
	easeInQuad: function (x, t, b, c, d) {                                                                               // 53
		return c*(t/=d)*t + b;                                                                                              // 54
	},                                                                                                                   // 55
	easeOutQuad: function (x, t, b, c, d) {                                                                              // 56
		return -c *(t/=d)*(t-2) + b;                                                                                        // 57
	},                                                                                                                   // 58
	easeInOutQuad: function (x, t, b, c, d) {                                                                            // 59
		if ((t/=d/2) < 1) return c/2*t*t + b;                                                                               // 60
		return -c/2 * ((--t)*(t-2) - 1) + b;                                                                                // 61
	},                                                                                                                   // 62
	easeInCubic: function (x, t, b, c, d) {                                                                              // 63
		return c*(t/=d)*t*t + b;                                                                                            // 64
	},                                                                                                                   // 65
	easeOutCubic: function (x, t, b, c, d) {                                                                             // 66
		return c*((t=t/d-1)*t*t + 1) + b;                                                                                   // 67
	},                                                                                                                   // 68
	easeInOutCubic: function (x, t, b, c, d) {                                                                           // 69
		if ((t/=d/2) < 1) return c/2*t*t*t + b;                                                                             // 70
		return c/2*((t-=2)*t*t + 2) + b;                                                                                    // 71
	},                                                                                                                   // 72
	easeInQuart: function (x, t, b, c, d) {                                                                              // 73
		return c*(t/=d)*t*t*t + b;                                                                                          // 74
	},                                                                                                                   // 75
	easeOutQuart: function (x, t, b, c, d) {                                                                             // 76
		return -c * ((t=t/d-1)*t*t*t - 1) + b;                                                                              // 77
	},                                                                                                                   // 78
	easeInOutQuart: function (x, t, b, c, d) {                                                                           // 79
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;                                                                           // 80
		return -c/2 * ((t-=2)*t*t*t - 2) + b;                                                                               // 81
	},                                                                                                                   // 82
	easeInQuint: function (x, t, b, c, d) {                                                                              // 83
		return c*(t/=d)*t*t*t*t + b;                                                                                        // 84
	},                                                                                                                   // 85
	easeOutQuint: function (x, t, b, c, d) {                                                                             // 86
		return c*((t=t/d-1)*t*t*t*t + 1) + b;                                                                               // 87
	},                                                                                                                   // 88
	easeInOutQuint: function (x, t, b, c, d) {                                                                           // 89
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;                                                                         // 90
		return c/2*((t-=2)*t*t*t*t + 2) + b;                                                                                // 91
	},                                                                                                                   // 92
	easeInSine: function (x, t, b, c, d) {                                                                               // 93
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;                                                                    // 94
	},                                                                                                                   // 95
	easeOutSine: function (x, t, b, c, d) {                                                                              // 96
		return c * Math.sin(t/d * (Math.PI/2)) + b;                                                                         // 97
	},                                                                                                                   // 98
	easeInOutSine: function (x, t, b, c, d) {                                                                            // 99
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;                                                                      // 100
	},                                                                                                                   // 101
	easeInExpo: function (x, t, b, c, d) {                                                                               // 102
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;                                                            // 103
	},                                                                                                                   // 104
	easeOutExpo: function (x, t, b, c, d) {                                                                              // 105
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;                                                        // 106
	},                                                                                                                   // 107
	easeInOutExpo: function (x, t, b, c, d) {                                                                            // 108
		if (t==0) return b;                                                                                                 // 109
		if (t==d) return b+c;                                                                                               // 110
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;                                                       // 111
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;                                                                     // 112
	},                                                                                                                   // 113
	easeInCirc: function (x, t, b, c, d) {                                                                               // 114
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;                                                                      // 115
	},                                                                                                                   // 116
	easeOutCirc: function (x, t, b, c, d) {                                                                              // 117
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;                                                                          // 118
	},                                                                                                                   // 119
	easeInOutCirc: function (x, t, b, c, d) {                                                                            // 120
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;                                                       // 121
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;                                                                     // 122
	},                                                                                                                   // 123
	easeInElastic: function (x, t, b, c, d) {                                                                            // 124
		var s=1.70158;var p=0;var a=c;                                                                                      // 125
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;                                                    // 126
		if (a < Math.abs(c)) { a=c; var s=p/4; }                                                                            // 127
		else var s = p/(2*Math.PI) * Math.asin (c/a);                                                                       // 128
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;                                          // 129
	},                                                                                                                   // 130
	easeOutElastic: function (x, t, b, c, d) {                                                                           // 131
		var s=1.70158;var p=0;var a=c;                                                                                      // 132
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;                                                    // 133
		if (a < Math.abs(c)) { a=c; var s=p/4; }                                                                            // 134
		else var s = p/(2*Math.PI) * Math.asin (c/a);                                                                       // 135
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;                                             // 136
	},                                                                                                                   // 137
	easeInOutElastic: function (x, t, b, c, d) {                                                                         // 138
		var s=1.70158;var p=0;var a=c;                                                                                      // 139
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);                                            // 140
		if (a < Math.abs(c)) { a=c; var s=p/4; }                                                                            // 141
		else var s = p/(2*Math.PI) * Math.asin (c/a);                                                                       // 142
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;                            // 143
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;                                     // 144
	},                                                                                                                   // 145
	easeInBack: function (x, t, b, c, d, s) {                                                                            // 146
		if (s == undefined) s = 1.70158;                                                                                    // 147
		return c*(t/=d)*t*((s+1)*t - s) + b;                                                                                // 148
	},                                                                                                                   // 149
	easeOutBack: function (x, t, b, c, d, s) {                                                                           // 150
		if (s == undefined) s = 1.70158;                                                                                    // 151
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;                                                                       // 152
	},                                                                                                                   // 153
	easeInOutBack: function (x, t, b, c, d, s) {                                                                         // 154
		if (s == undefined) s = 1.70158;                                                                                    // 155
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;                                                    // 156
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;                                                             // 157
	},                                                                                                                   // 158
	easeInBounce: function (x, t, b, c, d) {                                                                             // 159
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;                                                       // 160
	},                                                                                                                   // 161
	easeOutBounce: function (x, t, b, c, d) {                                                                            // 162
		if ((t/=d) < (1/2.75)) {                                                                                            // 163
			return c*(7.5625*t*t) + b;                                                                                         // 164
		} else if (t < (2/2.75)) {                                                                                          // 165
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;                                                                     // 166
		} else if (t < (2.5/2.75)) {                                                                                        // 167
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;                                                                  // 168
		} else {                                                                                                            // 169
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;                                                               // 170
		}                                                                                                                   // 171
	},                                                                                                                   // 172
	easeInOutBounce: function (x, t, b, c, d) {                                                                          // 173
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;                                          // 174
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;                                             // 175
	}                                                                                                                    // 176
});                                                                                                                   // 177
                                                                                                                      // 178
/*                                                                                                                    // 179
 *                                                                                                                    // 180
 * TERMS OF USE - EASING EQUATIONS                                                                                    // 181
 *                                                                                                                    // 182
 * Open source under the BSD License.                                                                                 // 183
 *                                                                                                                    // 184
 * Copyright © 2001 Robert Penner                                                                                     // 185
 * All rights reserved.                                                                                               // 186
 *                                                                                                                    // 187
 * Redistribution and use in source and binary forms, with or without modification,                                   // 188
 * are permitted provided that the following conditions are met:                                                      // 189
 *                                                                                                                    // 190
 * Redistributions of source code must retain the above copyright notice, this list of                                // 191
 * conditions and the following disclaimer.                                                                           // 192
 * Redistributions in binary form must reproduce the above copyright notice, this list                                // 193
 * of conditions and the following disclaimer in the documentation and/or other materials                             // 194
 * provided with the distribution.                                                                                    // 195
 *                                                                                                                    // 196
 * Neither the name of the author nor the names of contributors may be used to endorse                                // 197
 * or promote products derived from this software without specific prior written permission.                          // 198
 *                                                                                                                    // 199
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY                                // 200
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF                            // 201
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE                         // 202
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,                          // 203
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE                     // 204
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED                        // 205
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING                          // 206
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED                      // 207
 * OF THE POSSIBILITY OF SUCH DAMAGE.                                                                                 // 208
 *                                                                                                                    // 209
 */;    // Custom Easing                                                                                              // 210
    jQuery.extend( jQuery.easing,                                                                                     // 211
    {                                                                                                                 // 212
      easeInOutMaterial: function (x, t, b, c, d) {                                                                   // 213
        if ((t/=d/2) < 1) return c/2*t*t + b;                                                                         // 214
        return c/4*((t-=2)*t*t + 2) + b;                                                                              // 215
      }                                                                                                               // 216
    });                                                                                                               // 217
                                                                                                                      // 218
;/*! VelocityJS.org (1.2.2). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */              // 219
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
!function(e){function t(e){var t=e.length,r=$.type(e);return"function"===r||$.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===r||0===t||"number"==typeof t&&t>0&&t-1 in e}if(!e.jQuery){var $=function(e,t){return new $.fn.init(e,t)};$.isWindow=function(e){return null!=e&&e==e.window},$.type=function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?a[o.call(e)]||"object":typeof e},$.isArray=Array.isArray||function(e){return"array"===$.type(e)},$.isPlainObject=function(e){var t;if(!e||"object"!==$.type(e)||e.nodeType||$.isWindow(e))return!1;try{if(e.constructor&&!n.call(e,"constructor")&&!n.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}for(t in e);return void 0===t||n.call(e,t)},$.each=function(e,r,a){var n,o=0,i=e.length,s=t(e);if(a){if(s)for(;i>o&&(n=r.apply(e[o],a),n!==!1);o++);else for(o in e)if(n=r.apply(e[o],a),n===!1)break}else if(s)for(;i>o&&(n=r.call(e[o],o,e[o]),n!==!1);o++);else for(o in e)if(n=r.call(e[o],o,e[o]),n===!1)break;return e},$.data=function(e,t,a){if(void 0===a){var n=e[$.expando],o=n&&r[n];if(void 0===t)return o;if(o&&t in o)return o[t]}else if(void 0!==t){var n=e[$.expando]||(e[$.expando]=++$.uuid);return r[n]=r[n]||{},r[n][t]=a,a}},$.removeData=function(e,t){var a=e[$.expando],n=a&&r[a];n&&$.each(t,function(e,t){delete n[t]})},$.extend=function(){var e,t,r,a,n,o,i=arguments[0]||{},s=1,l=arguments.length,u=!1;for("boolean"==typeof i&&(u=i,i=arguments[s]||{},s++),"object"!=typeof i&&"function"!==$.type(i)&&(i={}),s===l&&(i=this,s--);l>s;s++)if(null!=(n=arguments[s]))for(a in n)e=i[a],r=n[a],i!==r&&(u&&r&&($.isPlainObject(r)||(t=$.isArray(r)))?(t?(t=!1,o=e&&$.isArray(e)?e:[]):o=e&&$.isPlainObject(e)?e:{},i[a]=$.extend(u,o,r)):void 0!==r&&(i[a]=r));return i},$.queue=function(e,r,a){function n(e,r){var a=r||[];return null!=e&&(t(Object(e))?!function(e,t){for(var r=+t.length,a=0,n=e.length;r>a;)e[n++]=t[a++];if(r!==r)for(;void 0!==t[a];)e[n++]=t[a++];return e.length=n,e}(a,"string"==typeof e?[e]:e):[].push.call(a,e)),a}if(e){r=(r||"fx")+"queue";var o=$.data(e,r);return a?(!o||$.isArray(a)?o=$.data(e,r,n(a)):o.push(a),o):o||[]}},$.dequeue=function(e,t){$.each(e.nodeType?[e]:e,function(e,r){t=t||"fx";var a=$.queue(r,t),n=a.shift();"inprogress"===n&&(n=a.shift()),n&&("fx"===t&&a.unshift("inprogress"),n.call(r,function(){$.dequeue(r,t)}))})},$.fn=$.prototype={init:function(e){if(e.nodeType)return this[0]=e,this;throw new Error("Not a DOM node.")},offset:function(){var t=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:t.top+(e.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:t.left+(e.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function e(){for(var e=this.offsetParent||document;e&&"html"===!e.nodeType.toLowerCase&&"static"===e.style.position;)e=e.offsetParent;return e||document}var t=this[0],e=e.apply(t),r=this.offset(),a=/^(?:body|html)$/i.test(e.nodeName)?{top:0,left:0}:$(e).offset();return r.top-=parseFloat(t.style.marginTop)||0,r.left-=parseFloat(t.style.marginLeft)||0,e.style&&(a.top+=parseFloat(e.style.borderTopWidth)||0,a.left+=parseFloat(e.style.borderLeftWidth)||0),{top:r.top-a.top,left:r.left-a.left}}};var r={};$.expando="velocity"+(new Date).getTime(),$.uuid=0;for(var a={},n=a.hasOwnProperty,o=a.toString,i="Boolean Number String Function Array Date RegExp Object Error".split(" "),s=0;s<i.length;s++)a["[object "+i[s]+"]"]=i[s].toLowerCase();$.fn.init.prototype=$.fn,e.Velocity={Utilities:$}}}(window),function(e){"object"==typeof module&&"object"==typeof module.exports?module.exports=e():"function"==typeof define&&define.amd?define(e):e()}(function(){return function(e,t,r,a){function n(e){for(var t=-1,r=e?e.length:0,a=[];++t<r;){var n=e[t];n&&a.push(n)}return a}function o(e){return g.isWrapped(e)?e=[].slice.call(e):g.isNode(e)&&(e=[e]),e}function i(e){var t=$.data(e,"velocity");return null===t?a:t}function s(e){return function(t){return Math.round(t*e)*(1/e)}}function l(e,r,a,n){function o(e,t){return 1-3*t+3*e}function i(e,t){return 3*t-6*e}function s(e){return 3*e}function l(e,t,r){return((o(t,r)*e+i(t,r))*e+s(t))*e}function u(e,t,r){return 3*o(t,r)*e*e+2*i(t,r)*e+s(t)}function c(t,r){for(var n=0;m>n;++n){var o=u(r,e,a);if(0===o)return r;var i=l(r,e,a)-t;r-=i/o}return r}function p(){for(var t=0;b>t;++t)w[t]=l(t*x,e,a)}function f(t,r,n){var o,i,s=0;do i=r+(n-r)/2,o=l(i,e,a)-t,o>0?n=i:r=i;while(Math.abs(o)>h&&++s<v);return i}function d(t){for(var r=0,n=1,o=b-1;n!=o&&w[n]<=t;++n)r+=x;--n;var i=(t-w[n])/(w[n+1]-w[n]),s=r+i*x,l=u(s,e,a);return l>=y?c(t,s):0==l?s:f(t,r,r+x)}function g(){V=!0,(e!=r||a!=n)&&p()}var m=4,y=.001,h=1e-7,v=10,b=11,x=1/(b-1),S="Float32Array"in t;if(4!==arguments.length)return!1;for(var P=0;4>P;++P)if("number"!=typeof arguments[P]||isNaN(arguments[P])||!isFinite(arguments[P]))return!1;e=Math.min(e,1),a=Math.min(a,1),e=Math.max(e,0),a=Math.max(a,0);var w=S?new Float32Array(b):new Array(b),V=!1,C=function(t){return V||g(),e===r&&a===n?t:0===t?0:1===t?1:l(d(t),r,n)};C.getControlPoints=function(){return[{x:e,y:r},{x:a,y:n}]};var T="generateBezier("+[e,r,a,n]+")";return C.toString=function(){return T},C}function u(e,t){var r=e;return g.isString(e)?v.Easings[e]||(r=!1):r=g.isArray(e)&&1===e.length?s.apply(null,e):g.isArray(e)&&2===e.length?b.apply(null,e.concat([t])):g.isArray(e)&&4===e.length?l.apply(null,e):!1,r===!1&&(r=v.Easings[v.defaults.easing]?v.defaults.easing:h),r}function c(e){if(e){var t=(new Date).getTime(),r=v.State.calls.length;r>1e4&&(v.State.calls=n(v.State.calls));for(var o=0;r>o;o++)if(v.State.calls[o]){var s=v.State.calls[o],l=s[0],u=s[2],f=s[3],d=!!f,m=null;f||(f=v.State.calls[o][3]=t-16);for(var y=Math.min((t-f)/u.duration,1),h=0,b=l.length;b>h;h++){var S=l[h],w=S.element;if(i(w)){var V=!1;if(u.display!==a&&null!==u.display&&"none"!==u.display){if("flex"===u.display){var C=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];$.each(C,function(e,t){x.setPropertyValue(w,"display",t)})}x.setPropertyValue(w,"display",u.display)}u.visibility!==a&&"hidden"!==u.visibility&&x.setPropertyValue(w,"visibility",u.visibility);for(var T in S)if("element"!==T){var k=S[T],A,F=g.isString(k.easing)?v.Easings[k.easing]:k.easing;if(1===y)A=k.endValue;else{var E=k.endValue-k.startValue;if(A=k.startValue+E*F(y,u,E),!d&&A===k.currentValue)continue}if(k.currentValue=A,"tween"===T)m=A;else{if(x.Hooks.registered[T]){var j=x.Hooks.getRoot(T),H=i(w).rootPropertyValueCache[j];H&&(k.rootPropertyValue=H)}var N=x.setPropertyValue(w,T,k.currentValue+(0===parseFloat(A)?"":k.unitType),k.rootPropertyValue,k.scrollData);x.Hooks.registered[T]&&(i(w).rootPropertyValueCache[j]=x.Normalizations.registered[j]?x.Normalizations.registered[j]("extract",null,N[1]):N[1]),"transform"===N[0]&&(V=!0)}}u.mobileHA&&i(w).transformCache.translate3d===a&&(i(w).transformCache.translate3d="(0px, 0px, 0px)",V=!0),V&&x.flushTransformCache(w)}}u.display!==a&&"none"!==u.display&&(v.State.calls[o][2].display=!1),u.visibility!==a&&"hidden"!==u.visibility&&(v.State.calls[o][2].visibility=!1),u.progress&&u.progress.call(s[1],s[1],y,Math.max(0,f+u.duration-t),f,m),1===y&&p(o)}}v.State.isTicking&&P(c)}function p(e,t){if(!v.State.calls[e])return!1;for(var r=v.State.calls[e][0],n=v.State.calls[e][1],o=v.State.calls[e][2],s=v.State.calls[e][4],l=!1,u=0,c=r.length;c>u;u++){var p=r[u].element;if(t||o.loop||("none"===o.display&&x.setPropertyValue(p,"display",o.display),"hidden"===o.visibility&&x.setPropertyValue(p,"visibility",o.visibility)),o.loop!==!0&&($.queue(p)[1]===a||!/\.velocityQueueEntryFlag/i.test($.queue(p)[1]))&&i(p)){i(p).isAnimating=!1,i(p).rootPropertyValueCache={};var f=!1;$.each(x.Lists.transforms3D,function(e,t){var r=/^scale/.test(t)?1:0,n=i(p).transformCache[t];i(p).transformCache[t]!==a&&new RegExp("^\\("+r+"[^.]").test(n)&&(f=!0,delete i(p).transformCache[t])}),o.mobileHA&&(f=!0,delete i(p).transformCache.translate3d),f&&x.flushTransformCache(p),x.Values.removeClass(p,"velocity-animating")}if(!t&&o.complete&&!o.loop&&u===c-1)try{o.complete.call(n,n)}catch(d){setTimeout(function(){throw d},1)}s&&o.loop!==!0&&s(n),i(p)&&o.loop===!0&&!t&&($.each(i(p).tweensContainer,function(e,t){/^rotate/.test(e)&&360===parseFloat(t.endValue)&&(t.endValue=0,t.startValue=360),/^backgroundPosition/.test(e)&&100===parseFloat(t.endValue)&&"%"===t.unitType&&(t.endValue=0,t.startValue=100)}),v(p,"reverse",{loop:!0,delay:o.delay})),o.queue!==!1&&$.dequeue(p,o.queue)}v.State.calls[e]=!1;for(var g=0,m=v.State.calls.length;m>g;g++)if(v.State.calls[g]!==!1){l=!0;break}l===!1&&(v.State.isTicking=!1,delete v.State.calls,v.State.calls=[])}var f=function(){if(r.documentMode)return r.documentMode;for(var e=7;e>4;e--){var t=r.createElement("div");if(t.innerHTML="<!--[if IE "+e+"]><span></span><![endif]-->",t.getElementsByTagName("span").length)return t=null,e}return a}(),d=function(){var e=0;return t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(t){var r=(new Date).getTime(),a;return a=Math.max(0,16-(r-e)),e=r+a,setTimeout(function(){t(r+a)},a)}}(),g={isString:function(e){return"string"==typeof e},isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)},isNode:function(e){return e&&e.nodeType},isNodeList:function(e){return"object"==typeof e&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e))&&e.length!==a&&(0===e.length||"object"==typeof e[0]&&e[0].nodeType>0)},isWrapped:function(e){return e&&(e.jquery||t.Zepto&&t.Zepto.zepto.isZ(e))},isSVG:function(e){return t.SVGElement&&e instanceof t.SVGElement},isEmptyObject:function(e){for(var t in e)return!1;return!0}},$,m=!1;if(e.fn&&e.fn.jquery?($=e,m=!0):$=t.Velocity.Utilities,8>=f&&!m)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=f)return void(jQuery.fn.velocity=jQuery.fn.animate);var y=400,h="swing",v={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:t.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:r.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:$,Redirects:{},Easings:{},Promise:t.Promise,defaults:{queue:"",duration:y,easing:h,begin:a,complete:a,progress:a,display:a,visibility:a,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(e){$.data(e,"velocity",{isSVG:g.isSVG(e),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:2,patch:2},debug:!1};t.pageYOffset!==a?(v.State.scrollAnchor=t,v.State.scrollPropertyLeft="pageXOffset",v.State.scrollPropertyTop="pageYOffset"):(v.State.scrollAnchor=r.documentElement||r.body.parentNode||r.body,v.State.scrollPropertyLeft="scrollLeft",v.State.scrollPropertyTop="scrollTop");var b=function(){function e(e){return-e.tension*e.x-e.friction*e.v}function t(t,r,a){var n={x:t.x+a.dx*r,v:t.v+a.dv*r,tension:t.tension,friction:t.friction};return{dx:n.v,dv:e(n)}}function r(r,a){var n={dx:r.v,dv:e(r)},o=t(r,.5*a,n),i=t(r,.5*a,o),s=t(r,a,i),l=1/6*(n.dx+2*(o.dx+i.dx)+s.dx),u=1/6*(n.dv+2*(o.dv+i.dv)+s.dv);return r.x=r.x+l*a,r.v=r.v+u*a,r}return function a(e,t,n){var o={x:-1,v:0,tension:null,friction:null},i=[0],s=0,l=1e-4,u=.016,c,p,f;for(e=parseFloat(e)||500,t=parseFloat(t)||20,n=n||null,o.tension=e,o.friction=t,c=null!==n,c?(s=a(e,t),p=s/n*u):p=u;;)if(f=r(f||o,p),i.push(1+f.x),s+=16,!(Math.abs(f.x)>l&&Math.abs(f.v)>l))break;return c?function(e){return i[e*(i.length-1)|0]}:s}}();v.Easings={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},spring:function(e){return 1-Math.cos(4.5*e*Math.PI)*Math.exp(6*-e)}},$.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(e,t){v.Easings[t[0]]=l.apply(null,t[1])});var x=v.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var e=0;e<x.Lists.colors.length;e++){var t="color"===x.Lists.colors[e]?"0 0 0 1":"255 255 255 1";x.Hooks.templates[x.Lists.colors[e]]=["Red Green Blue Alpha",t]}var r,a,n;if(f)for(r in x.Hooks.templates){a=x.Hooks.templates[r],n=a[0].split(" ");var o=a[1].match(x.RegEx.valueSplit);"Color"===n[0]&&(n.push(n.shift()),o.push(o.shift()),x.Hooks.templates[r]=[n.join(" "),o.join(" ")])}for(r in x.Hooks.templates){a=x.Hooks.templates[r],n=a[0].split(" ");for(var e in n){var i=r+n[e],s=e;x.Hooks.registered[i]=[r,s]}}},getRoot:function(e){var t=x.Hooks.registered[e];return t?t[0]:e},cleanRootPropertyValue:function(e,t){return x.RegEx.valueUnwrap.test(t)&&(t=t.match(x.RegEx.valueUnwrap)[1]),x.Values.isCSSNullValue(t)&&(t=x.Hooks.templates[e][1]),t},extractValue:function(e,t){var r=x.Hooks.registered[e];if(r){var a=r[0],n=r[1];return t=x.Hooks.cleanRootPropertyValue(a,t),t.toString().match(x.RegEx.valueSplit)[n]}return t},injectValue:function(e,t,r){var a=x.Hooks.registered[e];if(a){var n=a[0],o=a[1],i,s;return r=x.Hooks.cleanRootPropertyValue(n,r),i=r.toString().match(x.RegEx.valueSplit),i[o]=t,s=i.join(" ")}return r}},Normalizations:{registered:{clip:function(e,t,r){switch(e){case"name":return"clip";case"extract":var a;return x.RegEx.wrappedValueAlreadyExtracted.test(r)?a=r:(a=r.toString().match(x.RegEx.valueUnwrap),a=a?a[1].replace(/,(\s+)?/g," "):r),a;case"inject":return"rect("+r+")"}},blur:function(e,t,r){switch(e){case"name":return v.State.isFirefox?"filter":"-webkit-filter";case"extract":var a=parseFloat(r);if(!a&&0!==a){var n=r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);a=n?n[1]:0}return a;case"inject":return parseFloat(r)?"blur("+r+")":"none"}},opacity:function(e,t,r){if(8>=f)switch(e){case"name":return"filter";case"extract":var a=r.toString().match(/alpha\(opacity=(.*)\)/i);return r=a?a[1]/100:1;case"inject":return t.style.zoom=1,parseFloat(r)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(r),10)+")"}else switch(e){case"name":return"opacity";case"extract":return r;case"inject":return r}}},register:function(){9>=f||v.State.isGingerbread||(x.Lists.transformsBase=x.Lists.transformsBase.concat(x.Lists.transforms3D));for(var e=0;e<x.Lists.transformsBase.length;e++)!function(){var t=x.Lists.transformsBase[e];x.Normalizations.registered[t]=function(e,r,n){switch(e){case"name":return"transform";case"extract":return i(r)===a||i(r).transformCache[t]===a?/^scale/i.test(t)?1:0:i(r).transformCache[t].replace(/[()]/g,"");case"inject":var o=!1;switch(t.substr(0,t.length-1)){case"translate":o=!/(%|px|em|rem|vw|vh|\d)$/i.test(n);break;case"scal":case"scale":v.State.isAndroid&&i(r).transformCache[t]===a&&1>n&&(n=1),o=!/(\d)$/i.test(n);break;case"skew":o=!/(deg|\d)$/i.test(n);break;case"rotate":o=!/(deg|\d)$/i.test(n)}return o||(i(r).transformCache[t]="("+n+")"),i(r).transformCache[t]}}}();for(var e=0;e<x.Lists.colors.length;e++)!function(){var t=x.Lists.colors[e];x.Normalizations.registered[t]=function(e,r,n){switch(e){case"name":return t;case"extract":var o;if(x.RegEx.wrappedValueAlreadyExtracted.test(n))o=n;else{var i,s={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(n)?i=s[n]!==a?s[n]:s.black:x.RegEx.isHex.test(n)?i="rgb("+x.Values.hexToRgb(n).join(" ")+")":/^rgba?\(/i.test(n)||(i=s.black),o=(i||n).toString().match(x.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=f||3!==o.split(" ").length||(o+=" 1"),o;case"inject":return 8>=f?4===n.split(" ").length&&(n=n.split(/\s+/).slice(0,3).join(" ")):3===n.split(" ").length&&(n+=" 1"),(8>=f?"rgb":"rgba")+"("+n.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})},SVGAttribute:function(e){var t="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(f||v.State.isAndroid&&!v.State.isChrome)&&(t+="|transform"),new RegExp("^("+t+")$","i").test(e)},prefixCheck:function(e){if(v.State.prefixMatches[e])return[v.State.prefixMatches[e],!0];for(var t=["","Webkit","Moz","ms","O"],r=0,a=t.length;a>r;r++){var n;if(n=0===r?e:t[r]+e.replace(/^\w/,function(e){return e.toUpperCase()}),g.isString(v.State.prefixElement.style[n]))return v.State.prefixMatches[e]=n,[n,!0]}return[e,!1]}},Values:{hexToRgb:function(e){var t=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,a;return e=e.replace(t,function(e,t,r,a){return t+t+r+r+a+a}),a=r.exec(e),a?[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]:[0,0,0]},isCSSNullValue:function(e){return 0==e||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)},getUnitType:function(e){return/^(rotate|skew)/i.test(e)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e)?"":"px"},getDisplayType:function(e){var t=e&&e.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t)?"inline":/^(li)$/i.test(t)?"list-item":/^(tr)$/i.test(t)?"table-row":/^(table)$/i.test(t)?"table":/^(tbody)$/i.test(t)?"table-row-group":"block"},addClass:function(e,t){e.classList?e.classList.add(t):e.className+=(e.className.length?" ":"")+t},removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.toString().replace(new RegExp("(^|\\s)"+t.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(e,r,n,o){function s(e,r){function n(){u&&x.setPropertyValue(e,"display","none")}var l=0;if(8>=f)l=$.css(e,r);else{var u=!1;if(/^(width|height)$/.test(r)&&0===x.getPropertyValue(e,"display")&&(u=!0,x.setPropertyValue(e,"display",x.Values.getDisplayType(e))),!o){if("height"===r&&"border-box"!==x.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var c=e.offsetHeight-(parseFloat(x.getPropertyValue(e,"borderTopWidth"))||0)-(parseFloat(x.getPropertyValue(e,"borderBottomWidth"))||0)-(parseFloat(x.getPropertyValue(e,"paddingTop"))||0)-(parseFloat(x.getPropertyValue(e,"paddingBottom"))||0);return n(),c}if("width"===r&&"border-box"!==x.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var p=e.offsetWidth-(parseFloat(x.getPropertyValue(e,"borderLeftWidth"))||0)-(parseFloat(x.getPropertyValue(e,"borderRightWidth"))||0)-(parseFloat(x.getPropertyValue(e,"paddingLeft"))||0)-(parseFloat(x.getPropertyValue(e,"paddingRight"))||0);return n(),p}}var d;d=i(e)===a?t.getComputedStyle(e,null):i(e).computedStyle?i(e).computedStyle:i(e).computedStyle=t.getComputedStyle(e,null),"borderColor"===r&&(r="borderTopColor"),l=9===f&&"filter"===r?d.getPropertyValue(r):d[r],(""===l||null===l)&&(l=e.style[r]),n()}if("auto"===l&&/^(top|right|bottom|left)$/i.test(r)){var g=s(e,"position");("fixed"===g||"absolute"===g&&/top|left/i.test(r))&&(l=$(e).position()[r]+"px")}return l}var l;if(x.Hooks.registered[r]){var u=r,c=x.Hooks.getRoot(u);n===a&&(n=x.getPropertyValue(e,x.Names.prefixCheck(c)[0])),x.Normalizations.registered[c]&&(n=x.Normalizations.registered[c]("extract",e,n)),l=x.Hooks.extractValue(u,n)}else if(x.Normalizations.registered[r]){var p,d;p=x.Normalizations.registered[r]("name",e),"transform"!==p&&(d=s(e,x.Names.prefixCheck(p)[0]),x.Values.isCSSNullValue(d)&&x.Hooks.templates[r]&&(d=x.Hooks.templates[r][1])),l=x.Normalizations.registered[r]("extract",e,d)}if(!/^[\d-]/.test(l))if(i(e)&&i(e).isSVG&&x.Names.SVGAttribute(r))if(/^(height|width)$/i.test(r))try{l=e.getBBox()[r]}catch(g){l=0}else l=e.getAttribute(r);else l=s(e,x.Names.prefixCheck(r)[0]);return x.Values.isCSSNullValue(l)&&(l=0),v.debug>=2&&console.log("Get "+r+": "+l),l},setPropertyValue:function(e,r,a,n,o){var s=r;if("scroll"===r)o.container?o.container["scroll"+o.direction]=a:"Left"===o.direction?t.scrollTo(a,o.alternateValue):t.scrollTo(o.alternateValue,a);else if(x.Normalizations.registered[r]&&"transform"===x.Normalizations.registered[r]("name",e))x.Normalizations.registered[r]("inject",e,a),s="transform",a=i(e).transformCache[r];else{if(x.Hooks.registered[r]){var l=r,u=x.Hooks.getRoot(r);n=n||x.getPropertyValue(e,u),a=x.Hooks.injectValue(l,a,n),r=u}if(x.Normalizations.registered[r]&&(a=x.Normalizations.registered[r]("inject",e,a),r=x.Normalizations.registered[r]("name",e)),s=x.Names.prefixCheck(r)[0],8>=f)try{e.style[s]=a}catch(c){v.debug&&console.log("Browser does not support ["+a+"] for ["+s+"]")}else i(e)&&i(e).isSVG&&x.Names.SVGAttribute(r)?e.setAttribute(r,a):e.style[s]=a;v.debug>=2&&console.log("Set "+r+" ("+s+"): "+a)}return[s,a]},flushTransformCache:function(e){function t(t){return parseFloat(x.getPropertyValue(e,t))}var r="";if((f||v.State.isAndroid&&!v.State.isChrome)&&i(e).isSVG){var a={translate:[t("translateX"),t("translateY")],skewX:[t("skewX")],skewY:[t("skewY")],scale:1!==t("scale")?[t("scale"),t("scale")]:[t("scaleX"),t("scaleY")],rotate:[t("rotateZ"),0,0]};$.each(i(e).transformCache,function(e){/^translate/i.test(e)?e="translate":/^scale/i.test(e)?e="scale":/^rotate/i.test(e)&&(e="rotate"),a[e]&&(r+=e+"("+a[e].join(" ")+") ",delete a[e])})}else{var n,o;$.each(i(e).transformCache,function(t){return n=i(e).transformCache[t],"transformPerspective"===t?(o=n,!0):(9===f&&"rotateZ"===t&&(t="rotate"),void(r+=t+n+" "))}),o&&(r="perspective"+o+" "+r)}x.setPropertyValue(e,"transform",r)}};x.Hooks.register(),x.Normalizations.register(),v.hook=function(e,t,r){var n=a;return e=o(e),$.each(e,function(e,o){if(i(o)===a&&v.init(o),r===a)n===a&&(n=v.CSS.getPropertyValue(o,t));else{var s=v.CSS.setPropertyValue(o,t,r);"transform"===s[0]&&v.CSS.flushTransformCache(o),n=s}}),n};var S=function(){function e(){return l?T.promise||null:f}function n(){function e(e){function p(e,t){var r=a,i=a,s=a;return g.isArray(e)?(r=e[0],!g.isArray(e[1])&&/^[\d-]/.test(e[1])||g.isFunction(e[1])||x.RegEx.isHex.test(e[1])?s=e[1]:(g.isString(e[1])&&!x.RegEx.isHex.test(e[1])||g.isArray(e[1]))&&(i=t?e[1]:u(e[1],o.duration),e[2]!==a&&(s=e[2]))):r=e,t||(i=i||o.easing),g.isFunction(r)&&(r=r.call(n,w,P)),g.isFunction(s)&&(s=s.call(n,w,P)),[r||0,i,s]}function f(e,t){var r,a;return a=(t||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(e){return r=e,""}),r||(r=x.Values.getUnitType(e)),[a,r]}function d(){var e={myParent:n.parentNode||r.body,position:x.getPropertyValue(n,"position"),fontSize:x.getPropertyValue(n,"fontSize")},a=e.position===N.lastPosition&&e.myParent===N.lastParent,o=e.fontSize===N.lastFontSize;N.lastParent=e.myParent,N.lastPosition=e.position,N.lastFontSize=e.fontSize;var s=100,l={};if(o&&a)l.emToPx=N.lastEmToPx,l.percentToPxWidth=N.lastPercentToPxWidth,l.percentToPxHeight=N.lastPercentToPxHeight;else{var u=i(n).isSVG?r.createElementNS("http://www.w3.org/2000/svg","rect"):r.createElement("div");v.init(u),e.myParent.appendChild(u),$.each(["overflow","overflowX","overflowY"],function(e,t){v.CSS.setPropertyValue(u,t,"hidden")}),v.CSS.setPropertyValue(u,"position",e.position),v.CSS.setPropertyValue(u,"fontSize",e.fontSize),v.CSS.setPropertyValue(u,"boxSizing","content-box"),$.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(e,t){v.CSS.setPropertyValue(u,t,s+"%")}),v.CSS.setPropertyValue(u,"paddingLeft",s+"em"),l.percentToPxWidth=N.lastPercentToPxWidth=(parseFloat(x.getPropertyValue(u,"width",null,!0))||1)/s,l.percentToPxHeight=N.lastPercentToPxHeight=(parseFloat(x.getPropertyValue(u,"height",null,!0))||1)/s,l.emToPx=N.lastEmToPx=(parseFloat(x.getPropertyValue(u,"paddingLeft"))||1)/s,e.myParent.removeChild(u)}return null===N.remToPx&&(N.remToPx=parseFloat(x.getPropertyValue(r.body,"fontSize"))||16),null===N.vwToPx&&(N.vwToPx=parseFloat(t.innerWidth)/100,N.vhToPx=parseFloat(t.innerHeight)/100),l.remToPx=N.remToPx,l.vwToPx=N.vwToPx,l.vhToPx=N.vhToPx,v.debug>=1&&console.log("Unit ratios: "+JSON.stringify(l),n),l}if(o.begin&&0===w)try{o.begin.call(m,m)}catch(y){setTimeout(function(){throw y},1)}if("scroll"===k){var S=/^x$/i.test(o.axis)?"Left":"Top",V=parseFloat(o.offset)||0,C,A,F;o.container?g.isWrapped(o.container)||g.isNode(o.container)?(o.container=o.container[0]||o.container,C=o.container["scroll"+S],F=C+$(n).position()[S.toLowerCase()]+V):o.container=null:(C=v.State.scrollAnchor[v.State["scrollProperty"+S]],A=v.State.scrollAnchor[v.State["scrollProperty"+("Left"===S?"Top":"Left")]],F=$(n).offset()[S.toLowerCase()]+V),s={scroll:{rootPropertyValue:!1,startValue:C,currentValue:C,endValue:F,unitType:"",easing:o.easing,scrollData:{container:o.container,direction:S,alternateValue:A}},element:n},v.debug&&console.log("tweensContainer (scroll): ",s.scroll,n)}else if("reverse"===k){if(!i(n).tweensContainer)return void $.dequeue(n,o.queue);"none"===i(n).opts.display&&(i(n).opts.display="auto"),"hidden"===i(n).opts.visibility&&(i(n).opts.visibility="visible"),i(n).opts.loop=!1,i(n).opts.begin=null,i(n).opts.complete=null,b.easing||delete o.easing,b.duration||delete o.duration,o=$.extend({},i(n).opts,o);var E=$.extend(!0,{},i(n).tweensContainer);for(var j in E)if("element"!==j){var H=E[j].startValue;E[j].startValue=E[j].currentValue=E[j].endValue,E[j].endValue=H,g.isEmptyObject(b)||(E[j].easing=o.easing),v.debug&&console.log("reverse tweensContainer ("+j+"): "+JSON.stringify(E[j]),n)}s=E}else if("start"===k){var E;i(n).tweensContainer&&i(n).isAnimating===!0&&(E=i(n).tweensContainer),$.each(h,function(e,t){if(RegExp("^"+x.Lists.colors.join("$|^")+"$").test(e)){var r=p(t,!0),n=r[0],o=r[1],i=r[2];if(x.RegEx.isHex.test(n)){for(var s=["Red","Green","Blue"],l=x.Values.hexToRgb(n),u=i?x.Values.hexToRgb(i):a,c=0;c<s.length;c++){var f=[l[c]];o&&f.push(o),u!==a&&f.push(u[c]),h[e+s[c]]=f}delete h[e]}}});for(var R in h){var O=p(h[R]),z=O[0],q=O[1],M=O[2];R=x.Names.camelCase(R);var I=x.Hooks.getRoot(R),B=!1;if(i(n).isSVG||"tween"===I||x.Names.prefixCheck(I)[1]!==!1||x.Normalizations.registered[I]!==a){(o.display!==a&&null!==o.display&&"none"!==o.display||o.visibility!==a&&"hidden"!==o.visibility)&&/opacity|filter/.test(R)&&!M&&0!==z&&(M=0),o._cacheValues&&E&&E[R]?(M===a&&(M=E[R].endValue+E[R].unitType),B=i(n).rootPropertyValueCache[I]):x.Hooks.registered[R]?M===a?(B=x.getPropertyValue(n,I),M=x.getPropertyValue(n,R,B)):B=x.Hooks.templates[I][1]:M===a&&(M=x.getPropertyValue(n,R));var W,G,D,X=!1;if(W=f(R,M),M=W[0],D=W[1],W=f(R,z),z=W[0].replace(/^([+-\/*])=/,function(e,t){return X=t,""}),G=W[1],M=parseFloat(M)||0,z=parseFloat(z)||0,"%"===G&&(/^(fontSize|lineHeight)$/.test(R)?(z/=100,G="em"):/^scale/.test(R)?(z/=100,G=""):/(Red|Green|Blue)$/i.test(R)&&(z=z/100*255,G="")),/[\/*]/.test(X))G=D;else if(D!==G&&0!==M)if(0===z)G=D;else{l=l||d();var Y=/margin|padding|left|right|width|text|word|letter/i.test(R)||/X$/.test(R)||"x"===R?"x":"y";switch(D){case"%":M*="x"===Y?l.percentToPxWidth:l.percentToPxHeight;break;case"px":break;default:M*=l[D+"ToPx"]}switch(G){case"%":M*=1/("x"===Y?l.percentToPxWidth:l.percentToPxHeight);break;case"px":break;default:M*=1/l[G+"ToPx"]}}switch(X){case"+":z=M+z;break;case"-":z=M-z;break;case"*":z=M*z;break;case"/":z=M/z}s[R]={rootPropertyValue:B,startValue:M,currentValue:M,endValue:z,unitType:G,easing:q},v.debug&&console.log("tweensContainer ("+R+"): "+JSON.stringify(s[R]),n)}else v.debug&&console.log("Skipping ["+I+"] due to a lack of browser support.")}s.element=n}s.element&&(x.Values.addClass(n,"velocity-animating"),L.push(s),""===o.queue&&(i(n).tweensContainer=s,i(n).opts=o),i(n).isAnimating=!0,w===P-1?(v.State.calls.push([L,m,o,null,T.resolver]),v.State.isTicking===!1&&(v.State.isTicking=!0,c())):w++)}var n=this,o=$.extend({},v.defaults,b),s={},l;switch(i(n)===a&&v.init(n),parseFloat(o.delay)&&o.queue!==!1&&$.queue(n,o.queue,function(e){v.velocityQueueEntryFlag=!0,i(n).delayTimer={setTimeout:setTimeout(e,parseFloat(o.delay)),next:e}}),o.duration.toString().toLowerCase()){case"fast":o.duration=200;break;case"normal":o.duration=y;break;case"slow":o.duration=600;break;default:o.duration=parseFloat(o.duration)||1}v.mock!==!1&&(v.mock===!0?o.duration=o.delay=1:(o.duration*=parseFloat(v.mock)||1,o.delay*=parseFloat(v.mock)||1)),o.easing=u(o.easing,o.duration),o.begin&&!g.isFunction(o.begin)&&(o.begin=null),o.progress&&!g.isFunction(o.progress)&&(o.progress=null),o.complete&&!g.isFunction(o.complete)&&(o.complete=null),o.display!==a&&null!==o.display&&(o.display=o.display.toString().toLowerCase(),"auto"===o.display&&(o.display=v.CSS.Values.getDisplayType(n))),o.visibility!==a&&null!==o.visibility&&(o.visibility=o.visibility.toString().toLowerCase()),o.mobileHA=o.mobileHA&&v.State.isMobile&&!v.State.isGingerbread,o.queue===!1?o.delay?setTimeout(e,o.delay):e():$.queue(n,o.queue,function(t,r){return r===!0?(T.promise&&T.resolver(m),!0):(v.velocityQueueEntryFlag=!0,void e(t))}),""!==o.queue&&"fx"!==o.queue||"inprogress"===$.queue(n)[0]||$.dequeue(n)}var s=arguments[0]&&(arguments[0].p||$.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||g.isString(arguments[0].properties)),l,f,d,m,h,b;if(g.isWrapped(this)?(l=!1,d=0,m=this,f=this):(l=!0,d=1,m=s?arguments[0].elements||arguments[0].e:arguments[0]),m=o(m)){s?(h=arguments[0].properties||arguments[0].p,b=arguments[0].options||arguments[0].o):(h=arguments[d],b=arguments[d+1]);var P=m.length,w=0;if(!/^(stop|finish)$/i.test(h)&&!$.isPlainObject(b)){var V=d+1;b={};for(var C=V;C<arguments.length;C++)g.isArray(arguments[C])||!/^(fast|normal|slow)$/i.test(arguments[C])&&!/^\d/.test(arguments[C])?g.isString(arguments[C])||g.isArray(arguments[C])?b.easing=arguments[C]:g.isFunction(arguments[C])&&(b.complete=arguments[C]):b.duration=arguments[C]}var T={promise:null,resolver:null,rejecter:null};l&&v.Promise&&(T.promise=new v.Promise(function(e,t){T.resolver=e,T.rejecter=t}));var k;switch(h){case"scroll":k="scroll";break;case"reverse":k="reverse";break;case"finish":case"stop":$.each(m,function(e,t){i(t)&&i(t).delayTimer&&(clearTimeout(i(t).delayTimer.setTimeout),i(t).delayTimer.next&&i(t).delayTimer.next(),delete i(t).delayTimer)});var A=[];return $.each(v.State.calls,function(e,t){t&&$.each(t[1],function(r,n){var o=b===a?"":b;return o===!0||t[2].queue===o||b===a&&t[2].queue===!1?void $.each(m,function(r,a){a===n&&((b===!0||g.isString(b))&&($.each($.queue(a,g.isString(b)?b:""),function(e,t){g.isFunction(t)&&t(null,!0)}),$.queue(a,g.isString(b)?b:"",[])),"stop"===h?(i(a)&&i(a).tweensContainer&&o!==!1&&$.each(i(a).tweensContainer,function(e,t){t.endValue=t.currentValue
}),A.push(e)):"finish"===h&&(t[2].duration=1))}):!0})}),"stop"===h&&($.each(A,function(e,t){p(t,!0)}),T.promise&&T.resolver(m)),e();default:if(!$.isPlainObject(h)||g.isEmptyObject(h)){if(g.isString(h)&&v.Redirects[h]){var F=$.extend({},b),E=F.duration,j=F.delay||0;return F.backwards===!0&&(m=$.extend(!0,[],m).reverse()),$.each(m,function(e,t){parseFloat(F.stagger)?F.delay=j+parseFloat(F.stagger)*e:g.isFunction(F.stagger)&&(F.delay=j+F.stagger.call(t,e,P)),F.drag&&(F.duration=parseFloat(E)||(/^(callout|transition)/.test(h)?1e3:y),F.duration=Math.max(F.duration*(F.backwards?1-e/P:(e+1)/P),.75*F.duration,200)),v.Redirects[h].call(t,t,F||{},e,P,m,T.promise?T:a)}),e()}var H="Velocity: First argument ("+h+") was not a property map, a known action, or a registered redirect. Aborting.";return T.promise?T.rejecter(new Error(H)):console.log(H),e()}k="start"}var N={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},L=[];$.each(m,function(e,t){g.isNode(t)&&n.call(t)});var F=$.extend({},v.defaults,b),R;if(F.loop=parseInt(F.loop),R=2*F.loop-1,F.loop)for(var O=0;R>O;O++){var z={delay:F.delay,progress:F.progress};O===R-1&&(z.display=F.display,z.visibility=F.visibility,z.complete=F.complete),S(m,"reverse",z)}return e()}};v=$.extend(S,v),v.animate=S;var P=t.requestAnimationFrame||d;return v.State.isMobile||r.hidden===a||r.addEventListener("visibilitychange",function(){r.hidden?(P=function(e){return setTimeout(function(){e(!0)},16)},c()):P=t.requestAnimationFrame||d}),e.Velocity=v,e!==t&&(e.fn.velocity=S,e.fn.velocity.defaults=v.defaults),$.each(["Down","Up"],function(e,t){v.Redirects["slide"+t]=function(e,r,n,o,i,s){var l=$.extend({},r),u=l.begin,c=l.complete,p={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},f={};l.display===a&&(l.display="Down"===t?"inline"===v.CSS.Values.getDisplayType(e)?"inline-block":"block":"none"),l.begin=function(){u&&u.call(i,i);for(var r in p){f[r]=e.style[r];var a=v.CSS.getPropertyValue(e,r);p[r]="Down"===t?[a,0]:[0,a]}f.overflow=e.style.overflow,e.style.overflow="hidden"},l.complete=function(){for(var t in f)e.style[t]=f[t];c&&c.call(i,i),s&&s.resolver(i)},v(e,p,l)}}),$.each(["In","Out"],function(e,t){v.Redirects["fade"+t]=function(e,r,n,o,i,s){var l=$.extend({},r),u={opacity:"In"===t?1:0},c=l.complete;l.complete=n!==o-1?l.begin=null:function(){c&&c.call(i,i),s&&s.resolver(i)},l.display===a&&(l.display="In"===t?"auto":"none"),v(this,u,l)}}),v}(window.jQuery||window.Zepto||window,window,document)});;!function(a,b,c,d){"use strict";function k(a,b,c){return setTimeout(q(a,c),b)}function l(a,b,c){return Array.isArray(a)?(m(a,c[b],c),!0):!1}function m(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function n(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function o(a,b){return n(a,b,!0)}function p(a,b,c){var e,d=b.prototype;e=a.prototype=Object.create(d),e.constructor=a,e._super=d,c&&n(e,c)}function q(a,b){return function(){return a.apply(b,arguments)}}function r(a,b){return typeof a==g?a.apply(b?b[0]||d:d,b):a}function s(a,b){return a===d?b:a}function t(a,b,c){m(x(b),function(b){a.addEventListener(b,c,!1)})}function u(a,b,c){m(x(b),function(b){a.removeEventListener(b,c,!1)})}function v(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function w(a,b){return a.indexOf(b)>-1}function x(a){return a.trim().split(/\s+/g)}function y(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function z(a){return Array.prototype.slice.call(a,0)}function A(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];y(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function B(a,b){for(var c,f,g=b[0].toUpperCase()+b.slice(1),h=0;h<e.length;){if(c=e[h],f=c?c+g:b,f in a)return f;h++}return d}function D(){return C++}function E(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function ab(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){r(a.options.enable,[a])&&c.handler(b)},this.init()}function bb(a){var b,c=a.options.inputClass;return b=c?c:H?wb:I?Eb:G?Gb:rb,new b(a,cb)}function cb(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&O&&0===d-e,g=b&(Q|R)&&0===d-e;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,db(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function db(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=gb(b)),e>1&&!c.firstMultiple?c.firstMultiple=gb(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=hb(d);b.timeStamp=j(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=lb(h,i),b.distance=kb(h,i),eb(c,b),b.offsetDirection=jb(b.deltaX,b.deltaY),b.scale=g?nb(g.pointers,d):1,b.rotation=g?mb(g.pointers,d):0,fb(c,b);var k=a.element;v(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function eb(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===O||f.eventType===Q)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function fb(a,b){var f,g,h,j,c=a.lastInterval||b,e=b.timeStamp-c.timeStamp;if(b.eventType!=R&&(e>N||c.velocity===d)){var k=c.deltaX-b.deltaX,l=c.deltaY-b.deltaY,m=ib(e,k,l);g=m.x,h=m.y,f=i(m.x)>i(m.y)?m.x:m.y,j=jb(k,l),a.lastInterval=b}else f=c.velocity,g=c.velocityX,h=c.velocityY,j=c.direction;b.velocity=f,b.velocityX=g,b.velocityY=h,b.direction=j}function gb(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:h(a.pointers[c].clientX),clientY:h(a.pointers[c].clientY)},c++;return{timeStamp:j(),pointers:b,center:hb(b),deltaX:a.deltaX,deltaY:a.deltaY}}function hb(a){var b=a.length;if(1===b)return{x:h(a[0].clientX),y:h(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:h(c/b),y:h(d/b)}}function ib(a,b,c){return{x:b/a||0,y:c/a||0}}function jb(a,b){return a===b?S:i(a)>=i(b)?a>0?T:U:b>0?V:W}function kb(a,b,c){c||(c=$);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function lb(a,b,c){c||(c=$);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function mb(a,b){return lb(b[1],b[0],_)-lb(a[1],a[0],_)}function nb(a,b){return kb(b[0],b[1],_)/kb(a[0],a[1],_)}function rb(){this.evEl=pb,this.evWin=qb,this.allow=!0,this.pressed=!1,ab.apply(this,arguments)}function wb(){this.evEl=ub,this.evWin=vb,ab.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function Ab(){this.evTarget=yb,this.evWin=zb,this.started=!1,ab.apply(this,arguments)}function Bb(a,b){var c=z(a.touches),d=z(a.changedTouches);return b&(Q|R)&&(c=A(c.concat(d),"identifier",!0)),[c,d]}function Eb(){this.evTarget=Db,this.targetIds={},ab.apply(this,arguments)}function Fb(a,b){var c=z(a.touches),d=this.targetIds;if(b&(O|P)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=z(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return v(a.target,i)}),b===O)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Q|R)&&delete d[g[e].identifier],e++;return h.length?[A(f.concat(h),"identifier",!0),h]:void 0}function Gb(){ab.apply(this,arguments);var a=q(this.handler,this);this.touch=new Eb(this.manager,a),this.mouse=new rb(this.manager,a)}function Pb(a,b){this.manager=a,this.set(b)}function Qb(a){if(w(a,Mb))return Mb;var b=w(a,Nb),c=w(a,Ob);return b&&c?Nb+" "+Ob:b||c?b?Nb:Ob:w(a,Lb)?Lb:Kb}function Yb(a){this.id=D(),this.manager=null,this.options=o(a||{},this.defaults),this.options.enable=s(this.options.enable,!0),this.state=Rb,this.simultaneous={},this.requireFail=[]}function Zb(a){return a&Wb?"cancel":a&Ub?"end":a&Tb?"move":a&Sb?"start":""}function $b(a){return a==W?"down":a==V?"up":a==T?"left":a==U?"right":""}function _b(a,b){var c=b.manager;return c?c.get(a):a}function ac(){Yb.apply(this,arguments)}function bc(){ac.apply(this,arguments),this.pX=null,this.pY=null}function cc(){ac.apply(this,arguments)}function dc(){Yb.apply(this,arguments),this._timer=null,this._input=null}function ec(){ac.apply(this,arguments)}function fc(){ac.apply(this,arguments)}function gc(){Yb.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function hc(a,b){return b=b||{},b.recognizers=s(b.recognizers,hc.defaults.preset),new kc(a,b)}function kc(a,b){b=b||{},this.options=o(b,hc.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=bb(this),this.touchAction=new Pb(this,this.options.touchAction),lc(this,!0),m(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function lc(a,b){var c=a.element;m(a.options.cssProps,function(a,d){c.style[B(c.style,d)]=b?a:""})}function mc(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var e=["","webkit","moz","MS","ms","o"],f=b.createElement("div"),g="function",h=Math.round,i=Math.abs,j=Date.now,C=1,F=/mobile|tablet|ip(ad|hone|od)|android/i,G="ontouchstart"in a,H=B(a,"PointerEvent")!==d,I=G&&F.test(navigator.userAgent),J="touch",K="pen",L="mouse",M="kinect",N=25,O=1,P=2,Q=4,R=8,S=1,T=2,U=4,V=8,W=16,X=T|U,Y=V|W,Z=X|Y,$=["x","y"],_=["clientX","clientY"];ab.prototype={handler:function(){},init:function(){this.evEl&&t(this.element,this.evEl,this.domHandler),this.evTarget&&t(this.target,this.evTarget,this.domHandler),this.evWin&&t(E(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&u(this.element,this.evEl,this.domHandler),this.evTarget&&u(this.target,this.evTarget,this.domHandler),this.evWin&&u(E(this.element),this.evWin,this.domHandler)}};var ob={mousedown:O,mousemove:P,mouseup:Q},pb="mousedown",qb="mousemove mouseup";p(rb,ab,{handler:function(a){var b=ob[a.type];b&O&&0===a.button&&(this.pressed=!0),b&P&&1!==a.which&&(b=Q),this.pressed&&this.allow&&(b&Q&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:L,srcEvent:a}))}});var sb={pointerdown:O,pointermove:P,pointerup:Q,pointercancel:R,pointerout:R},tb={2:J,3:K,4:L,5:M},ub="pointerdown",vb="pointermove pointerup pointercancel";a.MSPointerEvent&&(ub="MSPointerDown",vb="MSPointerMove MSPointerUp MSPointerCancel"),p(wb,ab,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=sb[d],f=tb[a.pointerType]||a.pointerType,g=f==J,h=y(b,a.pointerId,"pointerId");e&O&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Q|R)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var xb={touchstart:O,touchmove:P,touchend:Q,touchcancel:R},yb="touchstart",zb="touchstart touchmove touchend touchcancel";p(Ab,ab,{handler:function(a){var b=xb[a.type];if(b===O&&(this.started=!0),this.started){var c=Bb.call(this,a,b);b&(Q|R)&&0===c[0].length-c[1].length&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:J,srcEvent:a})}}});var Cb={touchstart:O,touchmove:P,touchend:Q,touchcancel:R},Db="touchstart touchmove touchend touchcancel";p(Eb,ab,{handler:function(a){var b=Cb[a.type],c=Fb.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:J,srcEvent:a})}}),p(Gb,ab,{handler:function(a,b,c){var d=c.pointerType==J,e=c.pointerType==L;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Q|R)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Hb=B(f.style,"touchAction"),Ib=Hb!==d,Jb="compute",Kb="auto",Lb="manipulation",Mb="none",Nb="pan-x",Ob="pan-y";Pb.prototype={set:function(a){a==Jb&&(a=this.compute()),Ib&&(this.manager.element.style[Hb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return m(this.manager.recognizers,function(b){r(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),Qb(a.join(" "))},preventDefaults:function(a){if(!Ib){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return b.preventDefault(),void 0;var d=this.actions,e=w(d,Mb),f=w(d,Ob),g=w(d,Nb);return e||f&&c&X||g&&c&Y?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var Rb=1,Sb=2,Tb=4,Ub=8,Vb=Ub,Wb=16,Xb=32;Yb.prototype={defaults:{},set:function(a){return n(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(l(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_b(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return l(a,"dropRecognizeWith",this)?this:(a=_b(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(l(a,"requireFailure",this))return this;var b=this.requireFail;return a=_b(a,this),-1===y(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(l(a,"dropRequireFailure",this))return this;a=_b(a,this);var b=y(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function d(d){b.manager.emit(b.options.event+(d?Zb(c):""),a)}var b=this,c=this.state;Ub>c&&d(!0),d(),c>=Ub&&d(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):(this.state=Xb,void 0)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(Xb|Rb)))return!1;a++}return!0},recognize:function(a){var b=n({},a);return r(this.options.enable,[this,b])?(this.state&(Vb|Wb|Xb)&&(this.state=Rb),this.state=this.process(b),this.state&(Sb|Tb|Ub|Wb)&&this.tryEmit(b),void 0):(this.reset(),this.state=Xb,void 0)},process:function(){},getTouchAction:function(){},reset:function(){}},p(ac,Yb,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(Sb|Tb),e=this.attrTest(a);return d&&(c&R||!e)?b|Wb:d||e?c&Q?b|Ub:b&Sb?b|Tb:Sb:Xb}}),p(bc,ac,{defaults:{event:"pan",threshold:10,pointers:1,direction:Z},getTouchAction:function(){var a=this.options.direction,b=[];return a&X&&b.push(Ob),a&Y&&b.push(Nb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&X?(e=0===f?S:0>f?T:U,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?S:0>g?V:W,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return ac.prototype.attrTest.call(this,a)&&(this.state&Sb||!(this.state&Sb)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$b(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),p(cc,ac,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[Mb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&Sb)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),p(dc,Yb,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[Kb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,e=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Q|R)&&!e)this.reset();else if(a.eventType&O)this.reset(),this._timer=k(function(){this.state=Vb,this.tryEmit()},b.time,this);else if(a.eventType&Q)return Vb;return Xb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===Vb&&(a&&a.eventType&Q?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=j(),this.manager.emit(this.options.event,this._input)))}}),p(ec,ac,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[Mb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&Sb)}}),p(fc,ac,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:X|Y,pointers:1},getTouchAction:function(){return bc.prototype.getTouchAction.call(this)},attrTest:function(a){var c,b=this.options.direction;return b&(X|Y)?c=a.velocity:b&X?c=a.velocityX:b&Y&&(c=a.velocityY),this._super.attrTest.call(this,a)&&b&a.direction&&a.distance>this.options.threshold&&i(c)>this.options.velocity&&a.eventType&Q},emit:function(a){var b=$b(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),p(gc,Yb,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[Lb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,e=a.deltaTime<b.time;if(this.reset(),a.eventType&O&&0===this.count)return this.failTimeout();if(d&&e&&c){if(a.eventType!=Q)return this.failTimeout();var f=this.pTime?a.timeStamp-this.pTime<b.interval:!0,g=!this.pCenter||kb(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,g&&f?this.count+=1:this.count=1,this._input=a;var h=this.count%b.taps;if(0===h)return this.hasRequireFailures()?(this._timer=k(function(){this.state=Vb,this.tryEmit()},b.interval,this),Sb):Vb}return Xb},failTimeout:function(){return this._timer=k(function(){this.state=Xb},this.options.interval,this),Xb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==Vb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),hc.VERSION="2.0.4",hc.defaults={domEvents:!1,touchAction:Jb,enable:!0,inputTarget:null,inputClass:null,preset:[[ec,{enable:!1}],[cc,{enable:!1},["rotate"]],[fc,{direction:X}],[bc,{direction:X},["swipe"]],[gc],[gc,{event:"doubletap",taps:2},["tap"]],[dc]],cssProps:{userSelect:"default",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ic=1,jc=2;kc.prototype={set:function(a){return n(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?jc:ic},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&Vb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===jc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(Sb|Tb|Ub)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Yb)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(l(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(l(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(y(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return m(x(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return m(x(a),function(a){b?c[a].splice(y(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&mc(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&lc(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},n(hc,{INPUT_START:O,INPUT_MOVE:P,INPUT_END:Q,INPUT_CANCEL:R,STATE_POSSIBLE:Rb,STATE_BEGAN:Sb,STATE_CHANGED:Tb,STATE_ENDED:Ub,STATE_RECOGNIZED:Vb,STATE_CANCELLED:Wb,STATE_FAILED:Xb,DIRECTION_NONE:S,DIRECTION_LEFT:T,DIRECTION_RIGHT:U,DIRECTION_UP:V,DIRECTION_DOWN:W,DIRECTION_HORIZONTAL:X,DIRECTION_VERTICAL:Y,DIRECTION_ALL:Z,Manager:kc,Input:ab,TouchAction:Pb,TouchInput:Eb,MouseInput:rb,PointerEventInput:wb,TouchMouseInput:Gb,SingleTouchInput:Ab,Recognizer:Yb,AttrRecognizer:ac,Tap:gc,Pan:bc,Swipe:fc,Pinch:cc,Rotate:ec,Press:dc,on:t,off:u,each:m,merge:o,extend:n,inherit:p,bindFn:q,prefixed:B}),typeof define==g&&define.amd?define(function(){return hc}):"undefined"!=typeof module&&module.exports?module.exports=hc:a[c]=hc}(window,document,"Hammer");;(function(factory) {
    if (typeof define === 'function' && define.amd) {                                                                 // 223
        define(['jquery', 'hammerjs'], factory);                                                                      // 224
    } else if (typeof exports === 'object') {                                                                         // 225
        factory(require('jquery'), require('hammerjs'));                                                              // 226
    } else {                                                                                                          // 227
        factory(jQuery, Hammer);                                                                                      // 228
    }                                                                                                                 // 229
}(function($, Hammer) {                                                                                               // 230
    function hammerify(el, options) {                                                                                 // 231
        var $el = $(el);                                                                                              // 232
        if(!$el.data("hammer")) {                                                                                     // 233
            $el.data("hammer", new Hammer($el[0], options));                                                          // 234
        }                                                                                                             // 235
    }                                                                                                                 // 236
                                                                                                                      // 237
    $.fn.hammer = function(options) {                                                                                 // 238
        return this.each(function() {                                                                                 // 239
            hammerify(this, options);                                                                                 // 240
        });                                                                                                           // 241
    };                                                                                                                // 242
                                                                                                                      // 243
    // extend the emit method to also trigger jQuery events                                                           // 244
    Hammer.Manager.prototype.emit = (function(originalEmit) {                                                         // 245
        return function(type, data) {                                                                                 // 246
            originalEmit.call(this, type, data);                                                                      // 247
            $(this.element).trigger({                                                                                 // 248
                type: type,                                                                                           // 249
                gesture: data                                                                                         // 250
            });                                                                                                       // 251
        };                                                                                                            // 252
    })(Hammer.Manager.prototype.emit);                                                                                // 253
}));                                                                                                                  // 254
;Materialize = {};                                                                                                    // 255
                                                                                                                      // 256
// Unique ID                                                                                                          // 257
Materialize.guid = (function() {                                                                                      // 258
  function s4() {                                                                                                     // 259
    return Math.floor((1 + Math.random()) * 0x10000)                                                                  // 260
      .toString(16)                                                                                                   // 261
      .substring(1);                                                                                                  // 262
  }                                                                                                                   // 263
  return function() {                                                                                                 // 264
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +                                                              // 265
           s4() + '-' + s4() + s4() + s4();                                                                           // 266
  };                                                                                                                  // 267
})();                                                                                                                 // 268
                                                                                                                      // 269
Materialize.elementOrParentIsFixed = function(element) {                                                              // 270
    var $element = $(element);                                                                                        // 271
    var $checkElements = $element.add($element.parents());                                                            // 272
    var isFixed = false;                                                                                              // 273
    $checkElements.each(function(){                                                                                   // 274
        if ($(this).css("position") === "fixed") {                                                                    // 275
            isFixed = true;                                                                                           // 276
            return false;                                                                                             // 277
        }                                                                                                             // 278
    });                                                                                                               // 279
    return isFixed;                                                                                                   // 280
};                                                                                                                    // 281
                                                                                                                      // 282
// Velocity has conflicts when loaded with jQuery, this will check for it                                             // 283
var Vel;                                                                                                              // 284
if ($) {                                                                                                              // 285
  Vel = $.Velocity;                                                                                                   // 286
}                                                                                                                     // 287
else {                                                                                                                // 288
  Vel = Velocity;                                                                                                     // 289
}                                                                                                                     // 290
;(function ($) {                                                                                                      // 291
  $.fn.collapsible = function(options) {                                                                              // 292
    var defaults = {                                                                                                  // 293
        accordion: undefined                                                                                          // 294
    };                                                                                                                // 295
                                                                                                                      // 296
    options = $.extend(defaults, options);                                                                            // 297
                                                                                                                      // 298
                                                                                                                      // 299
    return this.each(function() {                                                                                     // 300
                                                                                                                      // 301
      var $this = $(this);                                                                                            // 302
                                                                                                                      // 303
      var $panel_headers = $(this).find('> li > .collapsible-header');                                                // 304
                                                                                                                      // 305
      var collapsible_type = $this.data("collapsible");                                                               // 306
                                                                                                                      // 307
      // Turn off any existing event handlers                                                                         // 308
       $this.off('click.collapse', '.collapsible-header');                                                            // 309
       $panel_headers.off('click.collapse');                                                                          // 310
                                                                                                                      // 311
                                                                                                                      // 312
       /****************                                                                                              // 313
       Helper Functions                                                                                               // 314
       ****************/                                                                                              // 315
                                                                                                                      // 316
      // Accordion Open                                                                                               // 317
      function accordionOpen(object) {                                                                                // 318
        $panel_headers = $this.find('> li > .collapsible-header');                                                    // 319
        if (object.hasClass('active')) {                                                                              // 320
            object.parent().addClass('active');                                                                       // 321
        }                                                                                                             // 322
        else {                                                                                                        // 323
            object.parent().removeClass('active');                                                                    // 324
        }                                                                                                             // 325
        if (object.parent().hasClass('active')){                                                                      // 326
          object.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
        }                                                                                                             // 328
        else{                                                                                                         // 329
          object.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
        }                                                                                                             // 331
                                                                                                                      // 332
        $panel_headers.not(object).removeClass('active').parent().removeClass('active');                              // 333
        $panel_headers.not(object).parent().children('.collapsible-body').stop(true,false).slideUp(                   // 334
          {                                                                                                           // 335
            duration: 350,                                                                                            // 336
            easing: "easeOutQuart",                                                                                   // 337
            queue: false,                                                                                             // 338
            complete:                                                                                                 // 339
              function() {                                                                                            // 340
                $(this).css('height', '');                                                                            // 341
              }                                                                                                       // 342
          });                                                                                                         // 343
      }                                                                                                               // 344
                                                                                                                      // 345
      // Expandable Open                                                                                              // 346
      function expandableOpen(object) {                                                                               // 347
        if (object.hasClass('active')) {                                                                              // 348
            object.parent().addClass('active');                                                                       // 349
        }                                                                                                             // 350
        else {                                                                                                        // 351
            object.parent().removeClass('active');                                                                    // 352
        }                                                                                                             // 353
        if (object.parent().hasClass('active')){                                                                      // 354
          object.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
        }                                                                                                             // 356
        else{                                                                                                         // 357
          object.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
        }                                                                                                             // 359
      }                                                                                                               // 360
                                                                                                                      // 361
      /**                                                                                                             // 362
       * Check if object is children of panel header                                                                  // 363
       * @param  {Object}  object Jquery object                                                                       // 364
       * @return {Boolean} true if it is children                                                                     // 365
       */                                                                                                             // 366
      function isChildrenOfPanelHeader(object) {                                                                      // 367
                                                                                                                      // 368
        var panelHeader = getPanelHeader(object);                                                                     // 369
                                                                                                                      // 370
        return panelHeader.length > 0;                                                                                // 371
      }                                                                                                               // 372
                                                                                                                      // 373
      /**                                                                                                             // 374
       * Get panel header from a children element                                                                     // 375
       * @param  {Object} object Jquery object                                                                        // 376
       * @return {Object} panel header object                                                                         // 377
       */                                                                                                             // 378
      function getPanelHeader(object) {                                                                               // 379
                                                                                                                      // 380
        return object.closest('li > .collapsible-header');                                                            // 381
      }                                                                                                               // 382
                                                                                                                      // 383
      /*****  End Helper Functions  *****/                                                                            // 384
                                                                                                                      // 385
                                                                                                                      // 386
                                                                                                                      // 387
      if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) { // Handle Accordion
        // Add click handler to only direct collapsible header children                                               // 389
        $panel_headers = $this.find('> li > .collapsible-header');                                                    // 390
        $panel_headers.on('click.collapse', function (e) {                                                            // 391
          var element = $(e.target);                                                                                  // 392
                                                                                                                      // 393
          if (isChildrenOfPanelHeader(element)) {                                                                     // 394
            element = getPanelHeader(element);                                                                        // 395
          }                                                                                                           // 396
                                                                                                                      // 397
          element.toggleClass('active');                                                                              // 398
          accordionOpen(element);                                                                                     // 399
        });                                                                                                           // 400
        // Open first active                                                                                          // 401
        accordionOpen($panel_headers.filter('.active').first());                                                      // 402
      }                                                                                                               // 403
      else { // Handle Expandables                                                                                    // 404
        $panel_headers.each(function () {                                                                             // 405
          // Add click handler to only direct collapsible header children                                             // 406
          $(this).on('click.collapse', function (e) {                                                                 // 407
            var element = $(e.target);                                                                                // 408
            if (isChildrenOfPanelHeader(element)) {                                                                   // 409
              element = getPanelHeader(element);                                                                      // 410
            }                                                                                                         // 411
            element.toggleClass('active');                                                                            // 412
            expandableOpen(element);                                                                                  // 413
          });                                                                                                         // 414
          // Open any bodies that have the active class                                                               // 415
          if ($(this).hasClass('active')) {                                                                           // 416
            expandableOpen($(this));                                                                                  // 417
          }                                                                                                           // 418
                                                                                                                      // 419
        });                                                                                                           // 420
      }                                                                                                               // 421
                                                                                                                      // 422
    });                                                                                                               // 423
  };                                                                                                                  // 424
                                                                                                                      // 425
  $(document).ready(function(){                                                                                       // 426
    $('.collapsible').collapsible();                                                                                  // 427
  });                                                                                                                 // 428
}( jQuery ));;(function ($) {                                                                                         // 429
                                                                                                                      // 430
  // Add posibility to scroll to selected option                                                                      // 431
  // usefull for select for example                                                                                   // 432
  $.fn.scrollTo = function(elem) {                                                                                    // 433
    $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top);                             // 434
    return this;                                                                                                      // 435
  };                                                                                                                  // 436
                                                                                                                      // 437
  $.fn.dropdown = function (option) {                                                                                 // 438
    var defaults = {                                                                                                  // 439
      inDuration: 300,                                                                                                // 440
      outDuration: 225,                                                                                               // 441
      constrain_width: true, // Constrains width of dropdown to the activator                                         // 442
      hover: false,                                                                                                   // 443
      gutter: 0, // Spacing from edge                                                                                 // 444
      belowOrigin: false                                                                                              // 445
    };                                                                                                                // 446
                                                                                                                      // 447
    this.each(function(){                                                                                             // 448
    var origin = $(this);                                                                                             // 449
    var options = $.extend({}, defaults, option);                                                                     // 450
                                                                                                                      // 451
    // Dropdown menu                                                                                                  // 452
    var activates = $("#"+ origin.attr('data-activates'));                                                            // 453
                                                                                                                      // 454
    function updateOptions() {                                                                                        // 455
      if (origin.data('induration') !== undefined)                                                                    // 456
        options.inDuration = origin.data('inDuration');                                                               // 457
      if (origin.data('outduration') !== undefined)                                                                   // 458
        options.outDuration = origin.data('outDuration');                                                             // 459
      if (origin.data('constrainwidth') !== undefined)                                                                // 460
        options.constrain_width = origin.data('constrainwidth');                                                      // 461
      if (origin.data('hover') !== undefined)                                                                         // 462
        options.hover = origin.data('hover');                                                                         // 463
      if (origin.data('gutter') !== undefined)                                                                        // 464
        options.gutter = origin.data('gutter');                                                                       // 465
      if (origin.data('beloworigin') !== undefined)                                                                   // 466
        options.belowOrigin = origin.data('beloworigin');                                                             // 467
    }                                                                                                                 // 468
                                                                                                                      // 469
    updateOptions();                                                                                                  // 470
                                                                                                                      // 471
    // Attach dropdown to its activator                                                                               // 472
    origin.after(activates);                                                                                          // 473
                                                                                                                      // 474
    /*                                                                                                                // 475
      Helper function to position and resize dropdown.                                                                // 476
      Used in hover and click handler.                                                                                // 477
    */                                                                                                                // 478
    function placeDropdown() {                                                                                        // 479
      // Check html data attributes                                                                                   // 480
      updateOptions();                                                                                                // 481
                                                                                                                      // 482
      // Set Dropdown state                                                                                           // 483
      activates.addClass('active');                                                                                   // 484
                                                                                                                      // 485
      // Constrain width                                                                                              // 486
      if (options.constrain_width === true) {                                                                         // 487
        activates.css('width', origin.outerWidth());                                                                  // 488
      }                                                                                                               // 489
      var offset = 0;                                                                                                 // 490
      if (options.belowOrigin === true) {                                                                             // 491
        offset = origin.height();                                                                                     // 492
      }                                                                                                               // 493
                                                                                                                      // 494
      // Handle edge alignment                                                                                        // 495
      var offsetLeft = origin.offset().left;                                                                          // 496
      var width_difference = 0;                                                                                       // 497
      var gutter_spacing = options.gutter;                                                                            // 498
                                                                                                                      // 499
                                                                                                                      // 500
      if (offsetLeft + activates.innerWidth() > $(window).width()) {                                                  // 501
        width_difference = origin.innerWidth() - activates.innerWidth();                                              // 502
        gutter_spacing = gutter_spacing * -1;                                                                         // 503
      }                                                                                                               // 504
                                                                                                                      // 505
      // Position dropdown                                                                                            // 506
      activates.css({                                                                                                 // 507
        position: 'absolute',                                                                                         // 508
        top: origin.position().top + offset,                                                                          // 509
        left: origin.position().left + width_difference + gutter_spacing                                              // 510
      });                                                                                                             // 511
                                                                                                                      // 512
                                                                                                                      // 513
                                                                                                                      // 514
      // Show dropdown                                                                                                // 515
      activates.stop(true, true).css('opacity', 0)                                                                    // 516
        .slideDown({                                                                                                  // 517
        queue: false,                                                                                                 // 518
        duration: options.inDuration,                                                                                 // 519
        easing: 'easeOutCubic',                                                                                       // 520
        complete: function() {                                                                                        // 521
          $(this).css('height', '');                                                                                  // 522
        }                                                                                                             // 523
      })                                                                                                              // 524
        .animate( {opacity: 1}, {queue: false, duration: options.inDuration, easing: 'easeOutSine'});                 // 525
    }                                                                                                                 // 526
                                                                                                                      // 527
    function hideDropdown() {                                                                                         // 528
      activates.fadeOut(options.outDuration);                                                                         // 529
      activates.removeClass('active');                                                                                // 530
    }                                                                                                                 // 531
                                                                                                                      // 532
    // Hover                                                                                                          // 533
    if (options.hover) {                                                                                              // 534
      var open = false;                                                                                               // 535
      origin.unbind('click.' + origin.attr('id'));                                                                    // 536
      // Hover handler to show dropdown                                                                               // 537
      origin.on('mouseenter', function(e){ // Mouse over                                                              // 538
        if (open === false) {                                                                                         // 539
          placeDropdown();                                                                                            // 540
          open = true;                                                                                                // 541
        }                                                                                                             // 542
      });                                                                                                             // 543
      origin.on('mouseleave', function(e){                                                                            // 544
        // If hover on origin then to something other than dropdown content, then close                               // 545
        var toEl = e.toElement || e.relatedTarget; // added browser compatibility for target element                  // 546
        if(!$(toEl).closest('.dropdown-content').is(activates)) {                                                     // 547
          activates.stop(true, true);                                                                                 // 548
          hideDropdown();                                                                                             // 549
          open = false;                                                                                               // 550
        }                                                                                                             // 551
      });                                                                                                             // 552
                                                                                                                      // 553
      activates.on('mouseleave', function(e){ // Mouse out                                                            // 554
        var toEl = e.toElement || e.relatedTarget;                                                                    // 555
        if(!$(toEl).closest('.dropdown-button').is(origin)) {                                                         // 556
          activates.stop(true, true);                                                                                 // 557
          hideDropdown();                                                                                             // 558
          open = false;                                                                                               // 559
        }                                                                                                             // 560
      });                                                                                                             // 561
                                                                                                                      // 562
    // Click                                                                                                          // 563
    } else {                                                                                                          // 564
                                                                                                                      // 565
      // Click handler to show dropdown                                                                               // 566
      origin.unbind('click.' + origin.attr('id'));                                                                    // 567
      origin.bind('click.'+origin.attr('id'), function(e){                                                            // 568
                                                                                                                      // 569
        if ( origin[0] == e.currentTarget && ($(e.target).closest('.dropdown-content').length === 0) ) {              // 570
          e.preventDefault(); // Prevents button click from moving window                                             // 571
          placeDropdown();                                                                                            // 572
                                                                                                                      // 573
        }                                                                                                             // 574
        // If origin is clicked and menu is open, close menu                                                          // 575
        else {                                                                                                        // 576
          if (origin.hasClass('active')) {                                                                            // 577
            hideDropdown();                                                                                           // 578
            $(document).unbind('click.' + activates.attr('id'));                                                      // 579
          }                                                                                                           // 580
        }                                                                                                             // 581
        // If menu open, add click close handler to document                                                          // 582
        if (activates.hasClass('active')) {                                                                           // 583
          $(document).bind('click.'+ activates.attr('id'), function (e) {                                             // 584
            if (!activates.is(e.target) && !origin.is(e.target) && (!origin.find(e.target).length > 0) ) {            // 585
              hideDropdown();                                                                                         // 586
              $(document).unbind('click.' + activates.attr('id'));                                                    // 587
            }                                                                                                         // 588
          });                                                                                                         // 589
        }                                                                                                             // 590
      });                                                                                                             // 591
                                                                                                                      // 592
    } // End else                                                                                                     // 593
                                                                                                                      // 594
    // Listen to open and close event - useful for select component                                                   // 595
    origin.on('open', placeDropdown);                                                                                 // 596
    origin.on('close', hideDropdown);                                                                                 // 597
                                                                                                                      // 598
                                                                                                                      // 599
   });                                                                                                                // 600
  }; // End dropdown plugin                                                                                           // 601
                                                                                                                      // 602
  $(document).ready(function(){                                                                                       // 603
    $('.dropdown-button').dropdown();                                                                                 // 604
  });                                                                                                                 // 605
}( jQuery ));                                                                                                         // 606
;(function($) {                                                                                                       // 607
    var _stack = 0,                                                                                                   // 608
    _lastID = 0,                                                                                                      // 609
    _generateID = function() {                                                                                        // 610
      _lastID++;                                                                                                      // 611
      return 'materialize-lean-overlay-' + _lastID;                                                                   // 612
    };                                                                                                                // 613
                                                                                                                      // 614
  $.fn.extend({                                                                                                       // 615
    openModal: function(options) {                                                                                    // 616
                                                                                                                      // 617
      $('body').css('overflow', 'hidden');                                                                            // 618
                                                                                                                      // 619
      var defaults = {                                                                                                // 620
        opacity: 0.5,                                                                                                 // 621
        in_duration: 350,                                                                                             // 622
        out_duration: 250,                                                                                            // 623
        ready: undefined,                                                                                             // 624
        complete: undefined,                                                                                          // 625
        dismissible: true,                                                                                            // 626
        starting_top: '4%'                                                                                            // 627
      },                                                                                                              // 628
      overlayID = _generateID(),                                                                                      // 629
      $modal = $(this),                                                                                               // 630
      $overlay = $('<div class="lean-overlay"></div>'),                                                               // 631
      lStack = (++_stack);                                                                                            // 632
                                                                                                                      // 633
      // Store a reference of the overlay                                                                             // 634
      $overlay.attr('id', overlayID).css('z-index', 1000 + lStack * 2);                                               // 635
      $modal.data('overlay-id', overlayID).css('z-index', 1000 + lStack * 2 + 1);                                     // 636
                                                                                                                      // 637
      $("body").append($overlay);                                                                                     // 638
                                                                                                                      // 639
      // Override defaults                                                                                            // 640
      options = $.extend(defaults, options);                                                                          // 641
                                                                                                                      // 642
      if (options.dismissible) {                                                                                      // 643
        $overlay.click(function() {                                                                                   // 644
          $modal.closeModal(options);                                                                                 // 645
        });                                                                                                           // 646
        // Return on ESC                                                                                              // 647
        $(document).on('keyup.leanModal' + overlayID, function(e) {                                                   // 648
          if (e.keyCode === 27) {   // ESC key                                                                        // 649
            $modal.closeModal(options);                                                                               // 650
          }                                                                                                           // 651
        });                                                                                                           // 652
      }                                                                                                               // 653
                                                                                                                      // 654
      $modal.find(".modal-close").on('click.close', function(e) {                                                     // 655
        $modal.closeModal(options);                                                                                   // 656
      });                                                                                                             // 657
                                                                                                                      // 658
      $overlay.css({ display : "block", opacity : 0 });                                                               // 659
                                                                                                                      // 660
      $modal.css({                                                                                                    // 661
        display : "block",                                                                                            // 662
        opacity: 0                                                                                                    // 663
      });                                                                                                             // 664
                                                                                                                      // 665
      $overlay.velocity({opacity: options.opacity}, {duration: options.in_duration, queue: false, ease: "easeOutCubic"});
      $modal.data('associated-overlay', $overlay[0]);                                                                 // 667
                                                                                                                      // 668
      // Define Bottom Sheet animation                                                                                // 669
      if ($modal.hasClass('bottom-sheet')) {                                                                          // 670
        $modal.velocity({bottom: "0", opacity: 1}, {                                                                  // 671
          duration: options.in_duration,                                                                              // 672
          queue: false,                                                                                               // 673
          ease: "easeOutCubic",                                                                                       // 674
          // Handle modal ready callback                                                                              // 675
          complete: function() {                                                                                      // 676
            if (typeof(options.ready) === "function") {                                                               // 677
              options.ready();                                                                                        // 678
            }                                                                                                         // 679
          }                                                                                                           // 680
        });                                                                                                           // 681
      }                                                                                                               // 682
      else {                                                                                                          // 683
        $.Velocity.hook($modal, "scaleX", 0.7);                                                                       // 684
        $modal.css({ top: options.starting_top });                                                                    // 685
        $modal.velocity({top: "10%", opacity: 1, scaleX: '1'}, {                                                      // 686
          duration: options.in_duration,                                                                              // 687
          queue: false,                                                                                               // 688
          ease: "easeOutCubic",                                                                                       // 689
          // Handle modal ready callback                                                                              // 690
          complete: function() {                                                                                      // 691
            if (typeof(options.ready) === "function") {                                                               // 692
              options.ready();                                                                                        // 693
            }                                                                                                         // 694
          }                                                                                                           // 695
        });                                                                                                           // 696
      }                                                                                                               // 697
                                                                                                                      // 698
                                                                                                                      // 699
    }                                                                                                                 // 700
  });                                                                                                                 // 701
                                                                                                                      // 702
  $.fn.extend({                                                                                                       // 703
    closeModal: function(options) {                                                                                   // 704
      var defaults = {                                                                                                // 705
        out_duration: 250,                                                                                            // 706
        complete: undefined                                                                                           // 707
      },                                                                                                              // 708
      $modal = $(this),                                                                                               // 709
      overlayID = $modal.data('overlay-id'),                                                                          // 710
      $overlay = $('#' + overlayID);                                                                                  // 711
                                                                                                                      // 712
      options = $.extend(defaults, options);                                                                          // 713
                                                                                                                      // 714
      // Disable scrolling                                                                                            // 715
      $('body').css('overflow', '');                                                                                  // 716
                                                                                                                      // 717
      $modal.find('.modal-close').off('click.close');                                                                 // 718
      $(document).off('keyup.leanModal' + overlayID);                                                                 // 719
                                                                                                                      // 720
      $overlay.velocity( { opacity: 0}, {duration: options.out_duration, queue: false, ease: "easeOutQuart"});        // 721
                                                                                                                      // 722
                                                                                                                      // 723
      // Define Bottom Sheet animation                                                                                // 724
      if ($modal.hasClass('bottom-sheet')) {                                                                          // 725
        $modal.velocity({bottom: "-100%", opacity: 0}, {                                                              // 726
          duration: options.out_duration,                                                                             // 727
          queue: false,                                                                                               // 728
          ease: "easeOutCubic",                                                                                       // 729
          // Handle modal ready callback                                                                              // 730
          complete: function() {                                                                                      // 731
            $overlay.css({display:"none"});                                                                           // 732
                                                                                                                      // 733
            // Call complete callback                                                                                 // 734
            if (typeof(options.complete) === "function") {                                                            // 735
              options.complete();                                                                                     // 736
            }                                                                                                         // 737
            $overlay.remove();                                                                                        // 738
            _stack--;                                                                                                 // 739
          }                                                                                                           // 740
        });                                                                                                           // 741
      }                                                                                                               // 742
      else {                                                                                                          // 743
        $modal.velocity(                                                                                              // 744
          { top: options.starting_top, opacity: 0, scaleX: 0.7}, {                                                    // 745
          duration: options.out_duration,                                                                             // 746
          complete:                                                                                                   // 747
            function() {                                                                                              // 748
                                                                                                                      // 749
              $(this).css('display', 'none');                                                                         // 750
              // Call complete callback                                                                               // 751
              if (typeof(options.complete) === "function") {                                                          // 752
                options.complete();                                                                                   // 753
              }                                                                                                       // 754
              $overlay.remove();                                                                                      // 755
              _stack--;                                                                                               // 756
            }                                                                                                         // 757
          }                                                                                                           // 758
        );                                                                                                            // 759
      }                                                                                                               // 760
    }                                                                                                                 // 761
  });                                                                                                                 // 762
                                                                                                                      // 763
  $.fn.extend({                                                                                                       // 764
    leanModal: function(option) {                                                                                     // 765
      return this.each(function() {                                                                                   // 766
                                                                                                                      // 767
        var defaults = {                                                                                              // 768
          starting_top: '4%'                                                                                          // 769
        },                                                                                                            // 770
        // Override defaults                                                                                          // 771
        options = $.extend(defaults, option);                                                                         // 772
                                                                                                                      // 773
        // Close Handlers                                                                                             // 774
        $(this).click(function(e) {                                                                                   // 775
          options.starting_top = ($(this).offset().top - $(window).scrollTop()) /1.15;                                // 776
          var modal_id = $(this).attr("href") || '#' + $(this).data('target');                                        // 777
          $(modal_id).openModal(options);                                                                             // 778
          e.preventDefault();                                                                                         // 779
        }); // done set on click                                                                                      // 780
      }); // done return                                                                                              // 781
    }                                                                                                                 // 782
  });                                                                                                                 // 783
})(jQuery);                                                                                                           // 784
;(function ($) {                                                                                                      // 785
                                                                                                                      // 786
  $.fn.materialbox = function () {                                                                                    // 787
                                                                                                                      // 788
    return this.each(function() {                                                                                     // 789
                                                                                                                      // 790
      if ($(this).hasClass('initialized')) {                                                                          // 791
        return;                                                                                                       // 792
      }                                                                                                               // 793
                                                                                                                      // 794
      $(this).addClass('initialized');                                                                                // 795
                                                                                                                      // 796
      var overlayActive = false;                                                                                      // 797
      var doneAnimating = true;                                                                                       // 798
      var inDuration = 275;                                                                                           // 799
      var outDuration = 200;                                                                                          // 800
      var origin = $(this);                                                                                           // 801
      var placeholder = $('<div></div>').addClass('material-placeholder');                                            // 802
      var originalWidth = 0;                                                                                          // 803
      var originalHeight = 0;                                                                                         // 804
      origin.wrap(placeholder);                                                                                       // 805
                                                                                                                      // 806
                                                                                                                      // 807
      origin.on('click', function(){                                                                                  // 808
        var placeholder = origin.parent('.material-placeholder');                                                     // 809
        var windowWidth = window.innerWidth;                                                                          // 810
        var windowHeight = window.innerHeight;                                                                        // 811
        var originalWidth = origin.width();                                                                           // 812
        var originalHeight = origin.height();                                                                         // 813
                                                                                                                      // 814
                                                                                                                      // 815
        // If already modal, return to original                                                                       // 816
        if (doneAnimating === false) {                                                                                // 817
          returnToOriginal();                                                                                         // 818
          return false;                                                                                               // 819
        }                                                                                                             // 820
        else if (overlayActive && doneAnimating===true) {                                                             // 821
          returnToOriginal();                                                                                         // 822
          return false;                                                                                               // 823
        }                                                                                                             // 824
                                                                                                                      // 825
                                                                                                                      // 826
        // Set states                                                                                                 // 827
        doneAnimating = false;                                                                                        // 828
        origin.addClass('active');                                                                                    // 829
        overlayActive = true;                                                                                         // 830
                                                                                                                      // 831
        // Set positioning for placeholder                                                                            // 832
                                                                                                                      // 833
        placeholder.css({                                                                                             // 834
          width: placeholder[0].getBoundingClientRect().width,                                                        // 835
          height: placeholder[0].getBoundingClientRect().height,                                                      // 836
          position: 'relative',                                                                                       // 837
          top: 0,                                                                                                     // 838
          left: 0                                                                                                     // 839
        });                                                                                                           // 840
                                                                                                                      // 841
                                                                                                                      // 842
                                                                                                                      // 843
        // Set css on origin                                                                                          // 844
        origin.css({position: 'absolute', 'z-index': 1000})                                                           // 845
        .data('width', originalWidth)                                                                                 // 846
        .data('height', originalHeight);                                                                              // 847
                                                                                                                      // 848
        // Add overlay                                                                                                // 849
        var overlay = $('<div id="materialbox-overlay"></div>')                                                       // 850
          .css({                                                                                                      // 851
            opacity: 0                                                                                                // 852
          })                                                                                                          // 853
          .click(function(){                                                                                          // 854
            if (doneAnimating === true)                                                                               // 855
            returnToOriginal();                                                                                       // 856
          });                                                                                                         // 857
          // Animate Overlay                                                                                          // 858
          $('body').append(overlay);                                                                                  // 859
          overlay.velocity({opacity: 1}, {duration: inDuration, queue: false, easing: 'easeOutQuad'}                  // 860
            );                                                                                                        // 861
                                                                                                                      // 862
                                                                                                                      // 863
        // Add and animate caption if it exists                                                                       // 864
        if (origin.data('caption') !== "") {                                                                          // 865
          var $photo_caption = $('<div class="materialbox-caption"></div>');                                          // 866
          $photo_caption.text(origin.data('caption'));                                                                // 867
          $('body').append($photo_caption);                                                                           // 868
          $photo_caption.css({ "display": "inline" });                                                                // 869
          $photo_caption.velocity({opacity: 1}, {duration: inDuration, queue: false, easing: 'easeOutQuad'});         // 870
        }                                                                                                             // 871
                                                                                                                      // 872
                                                                                                                      // 873
                                                                                                                      // 874
        // Resize Image                                                                                               // 875
        var ratio = 0;                                                                                                // 876
        var widthPercent = originalWidth / windowWidth;                                                               // 877
        var heightPercent = originalHeight / windowHeight;                                                            // 878
        var newWidth = 0;                                                                                             // 879
        var newHeight = 0;                                                                                            // 880
                                                                                                                      // 881
        if (widthPercent > heightPercent) {                                                                           // 882
          ratio = originalHeight / originalWidth;                                                                     // 883
          newWidth = windowWidth * 0.9;                                                                               // 884
          newHeight = windowWidth * 0.9 * ratio;                                                                      // 885
        }                                                                                                             // 886
        else {                                                                                                        // 887
          ratio = originalWidth / originalHeight;                                                                     // 888
          newWidth = (windowHeight * 0.9) * ratio;                                                                    // 889
          newHeight = windowHeight * 0.9;                                                                             // 890
        }                                                                                                             // 891
                                                                                                                      // 892
        // Animate image + set z-index                                                                                // 893
        if(origin.hasClass('responsive-img')) {                                                                       // 894
          origin.velocity({'max-width': newWidth, 'width': originalWidth}, {duration: 0, queue: false,                // 895
            complete: function(){                                                                                     // 896
              origin.css({left: 0, top: 0})                                                                           // 897
              .velocity(                                                                                              // 898
                {                                                                                                     // 899
                  height: newHeight,                                                                                  // 900
                  width: newWidth,                                                                                    // 901
                  left: $(document).scrollLeft() + windowWidth/2 - origin.parent('.material-placeholder').offset().left - newWidth/2,
                  top: $(document).scrollTop() + windowHeight/2 - origin.parent('.material-placeholder').offset().top - newHeight/ 2
                },                                                                                                    // 904
                {                                                                                                     // 905
                  duration: inDuration,                                                                               // 906
                  queue: false,                                                                                       // 907
                  easing: 'easeOutQuad',                                                                              // 908
                  complete: function(){doneAnimating = true;}                                                         // 909
                }                                                                                                     // 910
              );                                                                                                      // 911
            } // End Complete                                                                                         // 912
          }); // End Velocity                                                                                         // 913
        }                                                                                                             // 914
        else {                                                                                                        // 915
          origin.css('left', 0)                                                                                       // 916
          .css('top', 0)                                                                                              // 917
          .velocity(                                                                                                  // 918
            {                                                                                                         // 919
              height: newHeight,                                                                                      // 920
              width: newWidth,                                                                                        // 921
              left: $(document).scrollLeft() + windowWidth/2 - origin.parent('.material-placeholder').offset().left - newWidth/2,
              top: $(document).scrollTop() + windowHeight/2 - origin.parent('.material-placeholder').offset().top - newHeight/ 2
            },                                                                                                        // 924
            {                                                                                                         // 925
              duration: inDuration,                                                                                   // 926
              queue: false,                                                                                           // 927
              easing: 'easeOutQuad',                                                                                  // 928
              complete: function(){doneAnimating = true;}                                                             // 929
            }                                                                                                         // 930
            ); // End Velocity                                                                                        // 931
        }                                                                                                             // 932
                                                                                                                      // 933
    }); // End origin on click                                                                                        // 934
                                                                                                                      // 935
                                                                                                                      // 936
      // Return on scroll                                                                                             // 937
      $(window).scroll(function() {                                                                                   // 938
        if (overlayActive ) {                                                                                         // 939
          returnToOriginal();                                                                                         // 940
        }                                                                                                             // 941
      });                                                                                                             // 942
                                                                                                                      // 943
      // Return on ESC                                                                                                // 944
      $(document).keyup(function(e) {                                                                                 // 945
                                                                                                                      // 946
        if (e.keyCode === 27 && doneAnimating === true) {   // ESC key                                                // 947
          if (overlayActive) {                                                                                        // 948
            returnToOriginal();                                                                                       // 949
          }                                                                                                           // 950
        }                                                                                                             // 951
      });                                                                                                             // 952
                                                                                                                      // 953
                                                                                                                      // 954
      // This function returns the modaled image to the original spot                                                 // 955
      function returnToOriginal() {                                                                                   // 956
                                                                                                                      // 957
          doneAnimating = false;                                                                                      // 958
                                                                                                                      // 959
          var placeholder = origin.parent('.material-placeholder');                                                   // 960
          var windowWidth = window.innerWidth;                                                                        // 961
          var windowHeight = window.innerHeight;                                                                      // 962
          var originalWidth = origin.data('width');                                                                   // 963
          var originalHeight = origin.data('height');                                                                 // 964
                                                                                                                      // 965
          origin.velocity("stop", true);                                                                              // 966
          $('#materialbox-overlay').velocity("stop", true);                                                           // 967
          $('.materialbox-caption').velocity("stop", true);                                                           // 968
                                                                                                                      // 969
                                                                                                                      // 970
          $('#materialbox-overlay').velocity({opacity: 0}, {                                                          // 971
            duration: outDuration, // Delay prevents animation overlapping                                            // 972
            queue: false, easing: 'easeOutQuad',                                                                      // 973
            complete: function(){                                                                                     // 974
              // Remove Overlay                                                                                       // 975
              overlayActive = false;                                                                                  // 976
              $(this).remove();                                                                                       // 977
            }                                                                                                         // 978
          });                                                                                                         // 979
                                                                                                                      // 980
          // Resize Image                                                                                             // 981
          origin.velocity(                                                                                            // 982
            {                                                                                                         // 983
              width: originalWidth,                                                                                   // 984
              height: originalHeight,                                                                                 // 985
              left: 0,                                                                                                // 986
              top: 0                                                                                                  // 987
            },                                                                                                        // 988
            {                                                                                                         // 989
              duration: outDuration,                                                                                  // 990
              queue: false, easing: 'easeOutQuad'                                                                     // 991
            }                                                                                                         // 992
          );                                                                                                          // 993
                                                                                                                      // 994
          // Remove Caption + reset css settings on image                                                             // 995
          $('.materialbox-caption').velocity({opacity: 0}, {                                                          // 996
            duration: outDuration, // Delay prevents animation overlapping                                            // 997
            queue: false, easing: 'easeOutQuad',                                                                      // 998
            complete: function(){                                                                                     // 999
              placeholder.css({                                                                                       // 1000
                height: '',                                                                                           // 1001
                width: '',                                                                                            // 1002
                position: '',                                                                                         // 1003
                top: '',                                                                                              // 1004
                left: ''                                                                                              // 1005
              });                                                                                                     // 1006
                                                                                                                      // 1007
              origin.css({                                                                                            // 1008
                height: '',                                                                                           // 1009
                top: '',                                                                                              // 1010
                left: '',                                                                                             // 1011
                width: '',                                                                                            // 1012
                'max-width': '',                                                                                      // 1013
                position: '',                                                                                         // 1014
                'z-index': ''                                                                                         // 1015
              });                                                                                                     // 1016
                                                                                                                      // 1017
              // Remove class                                                                                         // 1018
              origin.removeClass('active');                                                                           // 1019
              doneAnimating = true;                                                                                   // 1020
              $(this).remove();                                                                                       // 1021
            }                                                                                                         // 1022
          });                                                                                                         // 1023
                                                                                                                      // 1024
        }                                                                                                             // 1025
        });                                                                                                           // 1026
};                                                                                                                    // 1027
                                                                                                                      // 1028
$(document).ready(function(){                                                                                         // 1029
  $('.materialboxed').materialbox();                                                                                  // 1030
});                                                                                                                   // 1031
                                                                                                                      // 1032
}( jQuery ));                                                                                                         // 1033
;(function ($) {                                                                                                      // 1034
                                                                                                                      // 1035
    $.fn.parallax = function () {                                                                                     // 1036
      var window_width = $(window).width();                                                                           // 1037
      // Parallax Scripts                                                                                             // 1038
      return this.each(function(i) {                                                                                  // 1039
        var $this = $(this);                                                                                          // 1040
        $this.addClass('parallax');                                                                                   // 1041
                                                                                                                      // 1042
        function updateParallax(initial) {                                                                            // 1043
          var container_height;                                                                                       // 1044
          if (window_width < 601) {                                                                                   // 1045
            container_height = ($this.height() > 0) ? $this.height() : $this.children("img").height();                // 1046
          }                                                                                                           // 1047
          else {                                                                                                      // 1048
            container_height = ($this.height() > 0) ? $this.height() : 500;                                           // 1049
          }                                                                                                           // 1050
          var $img = $this.children("img").first();                                                                   // 1051
          var img_height = $img.height();                                                                             // 1052
          var parallax_dist = img_height - container_height;                                                          // 1053
          var bottom = $this.offset().top + container_height;                                                         // 1054
          var top = $this.offset().top;                                                                               // 1055
          var scrollTop = $(window).scrollTop();                                                                      // 1056
          var windowHeight = window.innerHeight;                                                                      // 1057
          var windowBottom = scrollTop + windowHeight;                                                                // 1058
          var percentScrolled = (windowBottom - top) / (container_height + windowHeight);                             // 1059
          var parallax = Math.round((parallax_dist * percentScrolled));                                               // 1060
                                                                                                                      // 1061
          if (initial) {                                                                                              // 1062
            $img.css('display', 'block');                                                                             // 1063
          }                                                                                                           // 1064
          if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {                                           // 1065
            $img.css('transform', "translate3D(-50%," + parallax + "px, 0)");                                         // 1066
          }                                                                                                           // 1067
                                                                                                                      // 1068
        }                                                                                                             // 1069
                                                                                                                      // 1070
        // Wait for image load                                                                                        // 1071
        $this.children("img").one("load", function() {                                                                // 1072
          updateParallax(true);                                                                                       // 1073
        }).each(function() {                                                                                          // 1074
          if(this.complete) $(this).load();                                                                           // 1075
        });                                                                                                           // 1076
                                                                                                                      // 1077
        $(window).scroll(function() {                                                                                 // 1078
          window_width = $(window).width();                                                                           // 1079
          updateParallax(false);                                                                                      // 1080
        });                                                                                                           // 1081
                                                                                                                      // 1082
        $(window).resize(function() {                                                                                 // 1083
          window_width = $(window).width();                                                                           // 1084
          updateParallax(false);                                                                                      // 1085
        });                                                                                                           // 1086
                                                                                                                      // 1087
      });                                                                                                             // 1088
                                                                                                                      // 1089
    };                                                                                                                // 1090
}( jQuery ));;(function ($) {                                                                                         // 1091
                                                                                                                      // 1092
  var methods = {                                                                                                     // 1093
    init : function() {                                                                                               // 1094
      return this.each(function() {                                                                                   // 1095
                                                                                                                      // 1096
      // For each set of tabs, we want to keep track of                                                               // 1097
      // which tab is active and its associated content                                                               // 1098
      var $this = $(this),                                                                                            // 1099
          window_width = $(window).width();                                                                           // 1100
                                                                                                                      // 1101
      $this.width('100%');                                                                                            // 1102
      // Set Tab Width for each tab                                                                                   // 1103
      var $num_tabs = $(this).children('li').length;                                                                  // 1104
      $this.children('li').each(function() {                                                                          // 1105
        $(this).width((100/$num_tabs)+'%');                                                                           // 1106
      });                                                                                                             // 1107
      var $active, $content, $links = $this.find('li.tab a'),                                                         // 1108
          $tabs_width = $this.width(),                                                                                // 1109
          $tab_width = $this.find('li').first().outerWidth(),                                                         // 1110
          $index = 0;                                                                                                 // 1111
                                                                                                                      // 1112
      // If the location.hash matches one of the links, use that as the active tab.                                   // 1113
      $active = $($links.filter('[href="'+location.hash+'"]'));                                                       // 1114
                                                                                                                      // 1115
      // If no match is found, use the first link or any with class 'active' as the initial active tab.               // 1116
      if ($active.length === 0) {                                                                                     // 1117
          $active = $(this).find('li.tab a.active').first();                                                          // 1118
      }                                                                                                               // 1119
      if ($active.length === 0) {                                                                                     // 1120
        $active = $(this).find('li.tab a').first();                                                                   // 1121
      }                                                                                                               // 1122
                                                                                                                      // 1123
      $active.addClass('active');                                                                                     // 1124
      $index = $links.index($active);                                                                                 // 1125
      if ($index < 0) {                                                                                               // 1126
        $index = 0;                                                                                                   // 1127
      }                                                                                                               // 1128
                                                                                                                      // 1129
      $content = $($active[0].hash);                                                                                  // 1130
                                                                                                                      // 1131
      // append indicator then set indicator width to tab width                                                       // 1132
      $this.append('<div class="indicator"></div>');                                                                  // 1133
      var $indicator = $this.find('.indicator');                                                                      // 1134
      if ($this.is(":visible")) {                                                                                     // 1135
        $indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});                                         // 1136
        $indicator.css({"left": $index * $tab_width});                                                                // 1137
      }                                                                                                               // 1138
      $(window).resize(function () {                                                                                  // 1139
        $tabs_width = $this.width();                                                                                  // 1140
        $tab_width = $this.find('li').first().outerWidth();                                                           // 1141
        if ($index < 0) {                                                                                             // 1142
          $index = 0;                                                                                                 // 1143
        }                                                                                                             // 1144
        if ($tab_width !== 0 && $tabs_width !== 0) {                                                                  // 1145
          $indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});                                       // 1146
          $indicator.css({"left": $index * $tab_width});                                                              // 1147
        }                                                                                                             // 1148
      });                                                                                                             // 1149
                                                                                                                      // 1150
      // Hide the remaining content                                                                                   // 1151
      $links.not($active).each(function () {                                                                          // 1152
        $(this.hash).hide();                                                                                          // 1153
      });                                                                                                             // 1154
                                                                                                                      // 1155
                                                                                                                      // 1156
      // Bind the click event handler                                                                                 // 1157
      $this.on('click', 'a', function(e){                                                                             // 1158
        if ($(this).parent().hasClass('disabled')) {                                                                  // 1159
          e.preventDefault();                                                                                         // 1160
          return;                                                                                                     // 1161
        }                                                                                                             // 1162
                                                                                                                      // 1163
        $tabs_width = $this.width();                                                                                  // 1164
        $tab_width = $this.find('li').first().outerWidth();                                                           // 1165
                                                                                                                      // 1166
        // Make the old tab inactive.                                                                                 // 1167
        $active.removeClass('active');                                                                                // 1168
        $content.hide();                                                                                              // 1169
                                                                                                                      // 1170
        // Update the variables with the new link and content                                                         // 1171
        $active = $(this);                                                                                            // 1172
        $content = $(this.hash);                                                                                      // 1173
        $links = $this.find('li.tab a');                                                                              // 1174
                                                                                                                      // 1175
        // Make the tab active.                                                                                       // 1176
        $active.addClass('active');                                                                                   // 1177
        var $prev_index = $index;                                                                                     // 1178
        $index = $links.index($(this));                                                                               // 1179
        if ($index < 0) {                                                                                             // 1180
          $index = 0;                                                                                                 // 1181
        }                                                                                                             // 1182
        // Change url to current tab                                                                                  // 1183
        // window.location.hash = $active.attr('href');                                                               // 1184
                                                                                                                      // 1185
        $content.show();                                                                                              // 1186
                                                                                                                      // 1187
        // Update indicator                                                                                           // 1188
        if (($index - $prev_index) >= 0) {                                                                            // 1189
          $indicator.velocity({"right": $tabs_width - (($index + 1) * $tab_width)}, { duration: 300, queue: false, easing: 'easeOutQuad'});
          $indicator.velocity({"left": $index * $tab_width}, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});
                                                                                                                      // 1192
        }                                                                                                             // 1193
        else {                                                                                                        // 1194
          $indicator.velocity({"left": $index * $tab_width}, { duration: 300, queue: false, easing: 'easeOutQuad'});  // 1195
          $indicator.velocity({"right": $tabs_width - (($index + 1) * $tab_width)}, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});
        }                                                                                                             // 1197
                                                                                                                      // 1198
        // Prevent the anchor's default click action                                                                  // 1199
        e.preventDefault();                                                                                           // 1200
      });                                                                                                             // 1201
    });                                                                                                               // 1202
                                                                                                                      // 1203
    },                                                                                                                // 1204
    select_tab : function( id ) {                                                                                     // 1205
      this.find('a[href="#' + id + '"]').trigger('click');                                                            // 1206
    }                                                                                                                 // 1207
  };                                                                                                                  // 1208
                                                                                                                      // 1209
  $.fn.tabs = function(methodOrOptions) {                                                                             // 1210
    if ( methods[methodOrOptions] ) {                                                                                 // 1211
      return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));                     // 1212
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {                                          // 1213
      // Default to "init"                                                                                            // 1214
      return methods.init.apply( this, arguments );                                                                   // 1215
    } else {                                                                                                          // 1216
      $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );                                  // 1217
    }                                                                                                                 // 1218
  };                                                                                                                  // 1219
                                                                                                                      // 1220
  $(document).ready(function(){                                                                                       // 1221
    $('ul.tabs').tabs();                                                                                              // 1222
  });                                                                                                                 // 1223
}( jQuery ));                                                                                                         // 1224
;(function ($) {                                                                                                      // 1225
    $.fn.tooltip = function (options) {                                                                               // 1226
        var timeout = null,                                                                                           // 1227
        counter = null,                                                                                               // 1228
        started = false,                                                                                              // 1229
        counterInterval = null,                                                                                       // 1230
        margin = 5;                                                                                                   // 1231
                                                                                                                      // 1232
      // Defaults                                                                                                     // 1233
      var defaults = {                                                                                                // 1234
        delay: 350                                                                                                    // 1235
      };                                                                                                              // 1236
      options = $.extend(defaults, options);                                                                          // 1237
                                                                                                                      // 1238
      //Remove previously created html                                                                                // 1239
      $('.material-tooltip').remove();                                                                                // 1240
                                                                                                                      // 1241
      return this.each(function(){                                                                                    // 1242
        var origin = $(this);                                                                                         // 1243
                                                                                                                      // 1244
      // Create Text span                                                                                             // 1245
      var tooltip_text = $('<span></span>').text(origin.attr('data-tooltip'));                                        // 1246
                                                                                                                      // 1247
      // Create tooltip                                                                                               // 1248
      var newTooltip = $('<div></div>');                                                                              // 1249
      newTooltip.addClass('material-tooltip').append(tooltip_text);                                                   // 1250
      newTooltip.appendTo($('body'));                                                                                 // 1251
                                                                                                                      // 1252
      var backdrop = $('<div></div>').addClass('backdrop');                                                           // 1253
      backdrop.appendTo(newTooltip);                                                                                  // 1254
      backdrop.css({ top: 0, left:0 });                                                                               // 1255
                                                                                                                      // 1256
                                                                                                                      // 1257
     //Destroy previously binded events                                                                               // 1258
    $(this).off('mouseenter mouseleave');                                                                             // 1259
      // Mouse In                                                                                                     // 1260
    $(this).on({                                                                                                      // 1261
      mouseenter: function(e) {                                                                                       // 1262
        var tooltip_delay = origin.data("delay");                                                                     // 1263
        tooltip_delay = (tooltip_delay === undefined || tooltip_delay === '') ? options.delay : tooltip_delay;        // 1264
        counter = 0;                                                                                                  // 1265
        counterInterval = setInterval(function(){                                                                     // 1266
          counter += 10;                                                                                              // 1267
          if (counter >= tooltip_delay && started === false) {                                                        // 1268
            started = true;                                                                                           // 1269
            newTooltip.css({ display: 'block', left: '0px', top: '0px' });                                            // 1270
                                                                                                                      // 1271
            // Set Tooltip text                                                                                       // 1272
            newTooltip.children('span').text(origin.attr('data-tooltip'));                                            // 1273
                                                                                                                      // 1274
            // Tooltip positioning                                                                                    // 1275
            var originWidth = origin.outerWidth();                                                                    // 1276
            var originHeight = origin.outerHeight();                                                                  // 1277
            var tooltipPosition =  origin.attr('data-position');                                                      // 1278
            var tooltipHeight = newTooltip.outerHeight();                                                             // 1279
            var tooltipWidth = newTooltip.outerWidth();                                                               // 1280
            var tooltipVerticalMovement = '0px';                                                                      // 1281
            var tooltipHorizontalMovement = '0px';                                                                    // 1282
            var scale_factor = 8;                                                                                     // 1283
                                                                                                                      // 1284
            if (tooltipPosition === "top") {                                                                          // 1285
            // Top Position                                                                                           // 1286
            newTooltip.css({                                                                                          // 1287
              top: origin.offset().top - tooltipHeight - margin,                                                      // 1288
              left: origin.offset().left + originWidth/2 - tooltipWidth/2                                             // 1289
            });                                                                                                       // 1290
            tooltipVerticalMovement = '-10px';                                                                        // 1291
            backdrop.css({                                                                                            // 1292
              borderRadius: '14px 14px 0 0',                                                                          // 1293
              transformOrigin: '50% 90%',                                                                             // 1294
              marginTop: tooltipHeight,                                                                               // 1295
              marginLeft: (tooltipWidth/2) - (backdrop.width()/2)                                                     // 1296
                                                                                                                      // 1297
            });                                                                                                       // 1298
            }                                                                                                         // 1299
            // Left Position                                                                                          // 1300
            else if (tooltipPosition === "left") {                                                                    // 1301
              newTooltip.css({                                                                                        // 1302
                top: origin.offset().top + originHeight/2 - tooltipHeight/2,                                          // 1303
                left: origin.offset().left - tooltipWidth - margin                                                    // 1304
              });                                                                                                     // 1305
              tooltipHorizontalMovement = '-10px';                                                                    // 1306
              backdrop.css({                                                                                          // 1307
                width: '14px',                                                                                        // 1308
                height: '14px',                                                                                       // 1309
                borderRadius: '14px 0 0 14px',                                                                        // 1310
                transformOrigin: '95% 50%',                                                                           // 1311
                marginTop: tooltipHeight/2,                                                                           // 1312
                marginLeft: tooltipWidth                                                                              // 1313
              });                                                                                                     // 1314
            }                                                                                                         // 1315
            // Right Position                                                                                         // 1316
            else if (tooltipPosition === "right") {                                                                   // 1317
              newTooltip.css({                                                                                        // 1318
                top: origin.offset().top + originHeight/2 - tooltipHeight/2,                                          // 1319
                left: origin.offset().left + originWidth + margin                                                     // 1320
              });                                                                                                     // 1321
              tooltipHorizontalMovement = '+10px';                                                                    // 1322
              backdrop.css({                                                                                          // 1323
                width: '14px',                                                                                        // 1324
                height: '14px',                                                                                       // 1325
                borderRadius: '0 14px 14px 0',                                                                        // 1326
                transformOrigin: '5% 50%',                                                                            // 1327
                marginTop: tooltipHeight/2,                                                                           // 1328
                marginLeft: '0px'                                                                                     // 1329
              });                                                                                                     // 1330
            }                                                                                                         // 1331
            else {                                                                                                    // 1332
              // Bottom Position                                                                                      // 1333
              newTooltip.css({                                                                                        // 1334
                top: origin.offset().top + origin.outerHeight() + margin,                                             // 1335
                left: origin.offset().left + originWidth/2 - tooltipWidth/2                                           // 1336
              });                                                                                                     // 1337
              tooltipVerticalMovement = '+10px';                                                                      // 1338
              backdrop.css({                                                                                          // 1339
                marginLeft: (tooltipWidth/2) - (backdrop.width()/2)                                                   // 1340
              });                                                                                                     // 1341
            }                                                                                                         // 1342
                                                                                                                      // 1343
            // Calculate Scale to fill                                                                                // 1344
            scale_factor = tooltipWidth / 8;                                                                          // 1345
            if (scale_factor < 8) {                                                                                   // 1346
              scale_factor = 8;                                                                                       // 1347
            }                                                                                                         // 1348
            if (tooltipPosition === "right" || tooltipPosition === "left") {                                          // 1349
              scale_factor = tooltipWidth / 10;                                                                       // 1350
              if (scale_factor < 6)                                                                                   // 1351
                scale_factor = 6;                                                                                     // 1352
            }                                                                                                         // 1353
                                                                                                                      // 1354
            newTooltip.velocity({ opacity: 1, marginTop: tooltipVerticalMovement, marginLeft: tooltipHorizontalMovement}, { duration: 350, queue: false });
            backdrop.css({ display: 'block' })                                                                        // 1356
            .velocity({opacity:1},{duration: 55, delay: 0, queue: false})                                             // 1357
            .velocity({scale: scale_factor}, {duration: 300, delay: 0, queue: false, easing: 'easeInOutQuad'});       // 1358
                                                                                                                      // 1359
          }                                                                                                           // 1360
        }, 10); // End Interval                                                                                       // 1361
                                                                                                                      // 1362
      // Mouse Out                                                                                                    // 1363
      },                                                                                                              // 1364
      mouseleave: function(){                                                                                         // 1365
        // Reset State                                                                                                // 1366
        clearInterval(counterInterval);                                                                               // 1367
        counter = 0;                                                                                                  // 1368
                                                                                                                      // 1369
        // Animate back                                                                                               // 1370
        newTooltip.velocity({                                                                                         // 1371
          opacity: 0, marginTop: 0, marginLeft: 0}, { duration: 225, queue: false, delay: 275 }                       // 1372
        );                                                                                                            // 1373
        backdrop.velocity({opacity: 0, scale: 1}, {                                                                   // 1374
          duration:225,                                                                                               // 1375
          delay: 275, queue: false,                                                                                   // 1376
          complete: function(){                                                                                       // 1377
            backdrop.css('display', 'none');                                                                          // 1378
            newTooltip.css('display', 'none');                                                                        // 1379
            started = false;}                                                                                         // 1380
        });                                                                                                           // 1381
      }                                                                                                               // 1382
      });                                                                                                             // 1383
    });                                                                                                               // 1384
  };                                                                                                                  // 1385
                                                                                                                      // 1386
  $(document).ready(function(){                                                                                       // 1387
     $('.tooltipped').tooltip();                                                                                      // 1388
   });                                                                                                                // 1389
}( jQuery ));                                                                                                         // 1390
;/*!                                                                                                                  // 1391
 * Waves v0.6.4                                                                                                       // 1392
 * http://fian.my.id/Waves                                                                                            // 1393
 *                                                                                                                    // 1394
 * Copyright 2014 Alfiana E. Sibuea and other contributors                                                            // 1395
 * Released under the MIT license                                                                                     // 1396
 * https://github.com/fians/Waves/blob/master/LICENSE                                                                 // 1397
 */                                                                                                                   // 1398
                                                                                                                      // 1399
;(function(window) {                                                                                                  // 1400
    'use strict';                                                                                                     // 1401
                                                                                                                      // 1402
    var Waves = Waves || {};                                                                                          // 1403
    var $$ = document.querySelectorAll.bind(document);                                                                // 1404
                                                                                                                      // 1405
    // Find exact position of element                                                                                 // 1406
    function isWindow(obj) {                                                                                          // 1407
        return obj !== null && obj === obj.window;                                                                    // 1408
    }                                                                                                                 // 1409
                                                                                                                      // 1410
    function getWindow(elem) {                                                                                        // 1411
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;                                       // 1412
    }                                                                                                                 // 1413
                                                                                                                      // 1414
    function offset(elem) {                                                                                           // 1415
        var docElem, win,                                                                                             // 1416
            box = {top: 0, left: 0},                                                                                  // 1417
            doc = elem && elem.ownerDocument;                                                                         // 1418
                                                                                                                      // 1419
        docElem = doc.documentElement;                                                                                // 1420
                                                                                                                      // 1421
        if (typeof elem.getBoundingClientRect !== typeof undefined) {                                                 // 1422
            box = elem.getBoundingClientRect();                                                                       // 1423
        }                                                                                                             // 1424
        win = getWindow(doc);                                                                                         // 1425
        return {                                                                                                      // 1426
            top: box.top + win.pageYOffset - docElem.clientTop,                                                       // 1427
            left: box.left + win.pageXOffset - docElem.clientLeft                                                     // 1428
        };                                                                                                            // 1429
    }                                                                                                                 // 1430
                                                                                                                      // 1431
    function convertStyle(obj) {                                                                                      // 1432
        var style = '';                                                                                               // 1433
                                                                                                                      // 1434
        for (var a in obj) {                                                                                          // 1435
            if (obj.hasOwnProperty(a)) {                                                                              // 1436
                style += (a + ':' + obj[a] + ';');                                                                    // 1437
            }                                                                                                         // 1438
        }                                                                                                             // 1439
                                                                                                                      // 1440
        return style;                                                                                                 // 1441
    }                                                                                                                 // 1442
                                                                                                                      // 1443
    var Effect = {                                                                                                    // 1444
                                                                                                                      // 1445
        // Effect delay                                                                                               // 1446
        duration: 750,                                                                                                // 1447
                                                                                                                      // 1448
        show: function(e, element) {                                                                                  // 1449
                                                                                                                      // 1450
            // Disable right click                                                                                    // 1451
            if (e.button === 2) {                                                                                     // 1452
                return false;                                                                                         // 1453
            }                                                                                                         // 1454
                                                                                                                      // 1455
            var el = element || this;                                                                                 // 1456
                                                                                                                      // 1457
            // Create ripple                                                                                          // 1458
            var ripple = document.createElement('div');                                                               // 1459
            ripple.className = 'waves-ripple';                                                                        // 1460
            el.appendChild(ripple);                                                                                   // 1461
                                                                                                                      // 1462
            // Get click coordinate and element witdh                                                                 // 1463
            var pos         = offset(el);                                                                             // 1464
            var relativeY   = (e.pageY - pos.top);                                                                    // 1465
            var relativeX   = (e.pageX - pos.left);                                                                   // 1466
            var scale       = 'scale('+((el.clientWidth / 100) * 10)+')';                                             // 1467
                                                                                                                      // 1468
            // Support for touch devices                                                                              // 1469
            if ('touches' in e) {                                                                                     // 1470
              relativeY   = (e.touches[0].pageY - pos.top);                                                           // 1471
              relativeX   = (e.touches[0].pageX - pos.left);                                                          // 1472
            }                                                                                                         // 1473
                                                                                                                      // 1474
            // Attach data to element                                                                                 // 1475
            ripple.setAttribute('data-hold', Date.now());                                                             // 1476
            ripple.setAttribute('data-scale', scale);                                                                 // 1477
            ripple.setAttribute('data-x', relativeX);                                                                 // 1478
            ripple.setAttribute('data-y', relativeY);                                                                 // 1479
                                                                                                                      // 1480
            // Set ripple position                                                                                    // 1481
            var rippleStyle = {                                                                                       // 1482
                'top': relativeY+'px',                                                                                // 1483
                'left': relativeX+'px'                                                                                // 1484
            };                                                                                                        // 1485
                                                                                                                      // 1486
            ripple.className = ripple.className + ' waves-notransition';                                              // 1487
            ripple.setAttribute('style', convertStyle(rippleStyle));                                                  // 1488
            ripple.className = ripple.className.replace('waves-notransition', '');                                    // 1489
                                                                                                                      // 1490
            // Scale the ripple                                                                                       // 1491
            rippleStyle['-webkit-transform'] = scale;                                                                 // 1492
            rippleStyle['-moz-transform'] = scale;                                                                    // 1493
            rippleStyle['-ms-transform'] = scale;                                                                     // 1494
            rippleStyle['-o-transform'] = scale;                                                                      // 1495
            rippleStyle.transform = scale;                                                                            // 1496
            rippleStyle.opacity   = '1';                                                                              // 1497
                                                                                                                      // 1498
            rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';                                      // 1499
            rippleStyle['-moz-transition-duration']    = Effect.duration + 'ms';                                      // 1500
            rippleStyle['-o-transition-duration']      = Effect.duration + 'ms';                                      // 1501
            rippleStyle['transition-duration']         = Effect.duration + 'ms';                                      // 1502
                                                                                                                      // 1503
            rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';           // 1504
            rippleStyle['-moz-transition-timing-function']    = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';           // 1505
            rippleStyle['-o-transition-timing-function']      = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';           // 1506
            rippleStyle['transition-timing-function']         = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';           // 1507
                                                                                                                      // 1508
            ripple.setAttribute('style', convertStyle(rippleStyle));                                                  // 1509
        },                                                                                                            // 1510
                                                                                                                      // 1511
        hide: function(e) {                                                                                           // 1512
            TouchHandler.touchup(e);                                                                                  // 1513
                                                                                                                      // 1514
            var el = this;                                                                                            // 1515
            var width = el.clientWidth * 1.4;                                                                         // 1516
                                                                                                                      // 1517
            // Get first ripple                                                                                       // 1518
            var ripple = null;                                                                                        // 1519
            var ripples = el.getElementsByClassName('waves-ripple');                                                  // 1520
            if (ripples.length > 0) {                                                                                 // 1521
                ripple = ripples[ripples.length - 1];                                                                 // 1522
            } else {                                                                                                  // 1523
                return false;                                                                                         // 1524
            }                                                                                                         // 1525
                                                                                                                      // 1526
            var relativeX   = ripple.getAttribute('data-x');                                                          // 1527
            var relativeY   = ripple.getAttribute('data-y');                                                          // 1528
            var scale       = ripple.getAttribute('data-scale');                                                      // 1529
                                                                                                                      // 1530
            // Get delay beetween mousedown and mouse leave                                                           // 1531
            var diff = Date.now() - Number(ripple.getAttribute('data-hold'));                                         // 1532
            var delay = 350 - diff;                                                                                   // 1533
                                                                                                                      // 1534
            if (delay < 0) {                                                                                          // 1535
                delay = 0;                                                                                            // 1536
            }                                                                                                         // 1537
                                                                                                                      // 1538
            // Fade out ripple after delay                                                                            // 1539
            setTimeout(function() {                                                                                   // 1540
                var style = {                                                                                         // 1541
                    'top': relativeY+'px',                                                                            // 1542
                    'left': relativeX+'px',                                                                           // 1543
                    'opacity': '0',                                                                                   // 1544
                                                                                                                      // 1545
                    // Duration                                                                                       // 1546
                    '-webkit-transition-duration': Effect.duration + 'ms',                                            // 1547
                    '-moz-transition-duration': Effect.duration + 'ms',                                               // 1548
                    '-o-transition-duration': Effect.duration + 'ms',                                                 // 1549
                    'transition-duration': Effect.duration + 'ms',                                                    // 1550
                    '-webkit-transform': scale,                                                                       // 1551
                    '-moz-transform': scale,                                                                          // 1552
                    '-ms-transform': scale,                                                                           // 1553
                    '-o-transform': scale,                                                                            // 1554
                    'transform': scale,                                                                               // 1555
                };                                                                                                    // 1556
                                                                                                                      // 1557
                ripple.setAttribute('style', convertStyle(style));                                                    // 1558
                                                                                                                      // 1559
                setTimeout(function() {                                                                               // 1560
                    try {                                                                                             // 1561
                        el.removeChild(ripple);                                                                       // 1562
                    } catch(e) {                                                                                      // 1563
                        return false;                                                                                 // 1564
                    }                                                                                                 // 1565
                }, Effect.duration);                                                                                  // 1566
            }, delay);                                                                                                // 1567
        },                                                                                                            // 1568
                                                                                                                      // 1569
        // Little hack to make <input> can perform waves effect                                                       // 1570
        wrapInput: function(elements) {                                                                               // 1571
            for (var a = 0; a < elements.length; a++) {                                                               // 1572
                var el = elements[a];                                                                                 // 1573
                                                                                                                      // 1574
                if (el.tagName.toLowerCase() === 'input') {                                                           // 1575
                    var parent = el.parentNode;                                                                       // 1576
                                                                                                                      // 1577
                    // If input already have parent just pass through                                                 // 1578
                    if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {    // 1579
                        continue;                                                                                     // 1580
                    }                                                                                                 // 1581
                                                                                                                      // 1582
                    // Put element class and style to the specified parent                                            // 1583
                    var wrapper = document.createElement('i');                                                        // 1584
                    wrapper.className = el.className + ' waves-input-wrapper';                                        // 1585
                                                                                                                      // 1586
                    var elementStyle = el.getAttribute('style');                                                      // 1587
                                                                                                                      // 1588
                    if (!elementStyle) {                                                                              // 1589
                        elementStyle = '';                                                                            // 1590
                    }                                                                                                 // 1591
                                                                                                                      // 1592
                    wrapper.setAttribute('style', elementStyle);                                                      // 1593
                                                                                                                      // 1594
                    el.className = 'waves-button-input';                                                              // 1595
                    el.removeAttribute('style');                                                                      // 1596
                                                                                                                      // 1597
                    // Put element as child                                                                           // 1598
                    parent.replaceChild(wrapper, el);                                                                 // 1599
                    wrapper.appendChild(el);                                                                          // 1600
                }                                                                                                     // 1601
            }                                                                                                         // 1602
        }                                                                                                             // 1603
    };                                                                                                                // 1604
                                                                                                                      // 1605
                                                                                                                      // 1606
    /**                                                                                                               // 1607
     * Disable mousedown event for 500ms during and after touch                                                       // 1608
     */                                                                                                               // 1609
    var TouchHandler = {                                                                                              // 1610
        /* uses an integer rather than bool so there's no issues with                                                 // 1611
         * needing to clear timeouts if another touch event occurred                                                  // 1612
         * within the 500ms. Cannot mouseup between touchstart and                                                    // 1613
         * touchend, nor in the 500ms after touchend. */                                                              // 1614
        touches: 0,                                                                                                   // 1615
        allowEvent: function(e) {                                                                                     // 1616
            var allow = true;                                                                                         // 1617
                                                                                                                      // 1618
            if (e.type === 'touchstart') {                                                                            // 1619
                TouchHandler.touches += 1; //push                                                                     // 1620
            } else if (e.type === 'touchend' || e.type === 'touchcancel') {                                           // 1621
                setTimeout(function() {                                                                               // 1622
                    if (TouchHandler.touches > 0) {                                                                   // 1623
                        TouchHandler.touches -= 1; //pop after 500ms                                                  // 1624
                    }                                                                                                 // 1625
                }, 500);                                                                                              // 1626
            } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {                                          // 1627
                allow = false;                                                                                        // 1628
            }                                                                                                         // 1629
                                                                                                                      // 1630
            return allow;                                                                                             // 1631
        },                                                                                                            // 1632
        touchup: function(e) {                                                                                        // 1633
            TouchHandler.allowEvent(e);                                                                               // 1634
        }                                                                                                             // 1635
    };                                                                                                                // 1636
                                                                                                                      // 1637
                                                                                                                      // 1638
    /**                                                                                                               // 1639
     * Delegated click handler for .waves-effect element.                                                             // 1640
     * returns null when .waves-effect element not in "click tree"                                                    // 1641
     */                                                                                                               // 1642
    function getWavesEffectElement(e) {                                                                               // 1643
        if (TouchHandler.allowEvent(e) === false) {                                                                   // 1644
            return null;                                                                                              // 1645
        }                                                                                                             // 1646
                                                                                                                      // 1647
        var element = null;                                                                                           // 1648
        var target = e.target || e.srcElement;                                                                        // 1649
                                                                                                                      // 1650
        while (target.parentElement !== null) {                                                                       // 1651
            if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {                 // 1652
                element = target;                                                                                     // 1653
                break;                                                                                                // 1654
            } else if (target.classList.contains('waves-effect')) {                                                   // 1655
                element = target;                                                                                     // 1656
                break;                                                                                                // 1657
            }                                                                                                         // 1658
            target = target.parentElement;                                                                            // 1659
        }                                                                                                             // 1660
                                                                                                                      // 1661
        return element;                                                                                               // 1662
    }                                                                                                                 // 1663
                                                                                                                      // 1664
    /**                                                                                                               // 1665
     * Bubble the click and show effect if .waves-effect elem was found                                               // 1666
     */                                                                                                               // 1667
    function showEffect(e) {                                                                                          // 1668
        var element = getWavesEffectElement(e);                                                                       // 1669
                                                                                                                      // 1670
        if (element !== null) {                                                                                       // 1671
            Effect.show(e, element);                                                                                  // 1672
                                                                                                                      // 1673
            if ('ontouchstart' in window) {                                                                           // 1674
                element.addEventListener('touchend', Effect.hide, false);                                             // 1675
                element.addEventListener('touchcancel', Effect.hide, false);                                          // 1676
            }                                                                                                         // 1677
                                                                                                                      // 1678
            element.addEventListener('mouseup', Effect.hide, false);                                                  // 1679
            element.addEventListener('mouseleave', Effect.hide, false);                                               // 1680
        }                                                                                                             // 1681
    }                                                                                                                 // 1682
                                                                                                                      // 1683
    Waves.displayEffect = function(options) {                                                                         // 1684
        options = options || {};                                                                                      // 1685
                                                                                                                      // 1686
        if ('duration' in options) {                                                                                  // 1687
            Effect.duration = options.duration;                                                                       // 1688
        }                                                                                                             // 1689
                                                                                                                      // 1690
        //Wrap input inside <i> tag                                                                                   // 1691
        Effect.wrapInput($$('.waves-effect'));                                                                        // 1692
                                                                                                                      // 1693
        if ('ontouchstart' in window) {                                                                               // 1694
            document.body.addEventListener('touchstart', showEffect, false);                                          // 1695
        }                                                                                                             // 1696
                                                                                                                      // 1697
        document.body.addEventListener('mousedown', showEffect, false);                                               // 1698
    };                                                                                                                // 1699
                                                                                                                      // 1700
    /**                                                                                                               // 1701
     * Attach Waves to an input element (or any element which doesn't                                                 // 1702
     * bubble mouseup/mousedown events).                                                                              // 1703
     *   Intended to be used with dynamically loaded forms/inputs, or                                                 // 1704
     * where the user doesn't want a delegated click handler.                                                         // 1705
     */                                                                                                               // 1706
    Waves.attach = function(element) {                                                                                // 1707
        //FUTURE: automatically add waves classes and allow users                                                     // 1708
        // to specify them with an options param? Eg. light/classic/button                                            // 1709
        if (element.tagName.toLowerCase() === 'input') {                                                              // 1710
            Effect.wrapInput([element]);                                                                              // 1711
            element = element.parentElement;                                                                          // 1712
        }                                                                                                             // 1713
                                                                                                                      // 1714
        if ('ontouchstart' in window) {                                                                               // 1715
            element.addEventListener('touchstart', showEffect, false);                                                // 1716
        }                                                                                                             // 1717
                                                                                                                      // 1718
        element.addEventListener('mousedown', showEffect, false);                                                     // 1719
    };                                                                                                                // 1720
                                                                                                                      // 1721
    window.Waves = Waves;                                                                                             // 1722
                                                                                                                      // 1723
    document.addEventListener('DOMContentLoaded', function() {                                                        // 1724
        Waves.displayEffect();                                                                                        // 1725
    }, false);                                                                                                        // 1726
                                                                                                                      // 1727
})(window);                                                                                                           // 1728
;Materialize.toast = function (message, displayLength, className, completeCallback) {                                 // 1729
    className = className || "";                                                                                      // 1730
                                                                                                                      // 1731
    var container = document.getElementById('toast-container');                                                       // 1732
                                                                                                                      // 1733
    // Create toast container if it does not exist                                                                    // 1734
    if (container === null) {                                                                                         // 1735
        // create notification container                                                                              // 1736
        container = document.createElement('div');                                                                    // 1737
        container.id = 'toast-container';                                                                             // 1738
        document.body.appendChild(container);                                                                         // 1739
    }                                                                                                                 // 1740
                                                                                                                      // 1741
    // Select and append toast                                                                                        // 1742
    var newToast = createToast(message);                                                                              // 1743
                                                                                                                      // 1744
    // only append toast if message is not undefined                                                                  // 1745
    if(message){                                                                                                      // 1746
        container.appendChild(newToast);                                                                              // 1747
    }                                                                                                                 // 1748
                                                                                                                      // 1749
    newToast.style.top = '35px';                                                                                      // 1750
    newToast.style.opacity = 0;                                                                                       // 1751
                                                                                                                      // 1752
    // Animate toast in                                                                                               // 1753
    Vel(newToast, { "top" : "0px", opacity: 1 }, {duration: 300,                                                      // 1754
      easing: 'easeOutCubic',                                                                                         // 1755
      queue: false});                                                                                                 // 1756
                                                                                                                      // 1757
    // Allows timer to be pause while being panned                                                                    // 1758
    var timeLeft = displayLength;                                                                                     // 1759
    var counterInterval = setInterval (function(){                                                                    // 1760
                                                                                                                      // 1761
                                                                                                                      // 1762
      if (newToast.parentNode === null)                                                                               // 1763
        window.clearInterval(counterInterval);                                                                        // 1764
                                                                                                                      // 1765
      // If toast is not being dragged, decrease its time remaining                                                   // 1766
      if (!newToast.classList.contains('panning')) {                                                                  // 1767
        timeLeft -= 20;                                                                                               // 1768
      }                                                                                                               // 1769
                                                                                                                      // 1770
      if (timeLeft <= 0) {                                                                                            // 1771
        // Animate toast out                                                                                          // 1772
        Vel(newToast, {"opacity": 0, marginTop: '-40px'}, { duration: 375,                                            // 1773
            easing: 'easeOutExpo',                                                                                    // 1774
            queue: false,                                                                                             // 1775
            complete: function(){                                                                                     // 1776
              // Call the optional callback                                                                           // 1777
              if(typeof(completeCallback) === "function")                                                             // 1778
                completeCallback();                                                                                   // 1779
              // Remove toast after it times out                                                                      // 1780
              this[0].parentNode.removeChild(this[0]);                                                                // 1781
            }                                                                                                         // 1782
          });                                                                                                         // 1783
        window.clearInterval(counterInterval);                                                                        // 1784
      }                                                                                                               // 1785
    }, 20);                                                                                                           // 1786
                                                                                                                      // 1787
                                                                                                                      // 1788
                                                                                                                      // 1789
    function createToast(html) {                                                                                      // 1790
                                                                                                                      // 1791
        // Create toast                                                                                               // 1792
        var toast = document.createElement('div');                                                                    // 1793
        toast.classList.add('toast');                                                                                 // 1794
        if (className) {                                                                                              // 1795
            var classes = className.split(' ');                                                                       // 1796
                                                                                                                      // 1797
            for (var i = 0, count = classes.length; i < count; i++) {                                                 // 1798
                toast.classList.add(classes[i]);                                                                      // 1799
            }                                                                                                         // 1800
        }                                                                                                             // 1801
        toast.innerHTML = html;                                                                                       // 1802
                                                                                                                      // 1803
        // Bind hammer                                                                                                // 1804
        var hammerHandler = new Hammer(toast, {prevent_default: false});                                              // 1805
        hammerHandler.on('pan', function(e) {                                                                         // 1806
          var deltaX = e.deltaX;                                                                                      // 1807
          var activationDistance = 80;                                                                                // 1808
                                                                                                                      // 1809
          // Change toast state                                                                                       // 1810
          if (!toast.classList.contains('panning')){                                                                  // 1811
            toast.classList.add('panning');                                                                           // 1812
          }                                                                                                           // 1813
                                                                                                                      // 1814
          var opacityPercent = 1-Math.abs(deltaX / activationDistance);                                               // 1815
          if (opacityPercent < 0)                                                                                     // 1816
            opacityPercent = 0;                                                                                       // 1817
                                                                                                                      // 1818
          Vel(toast, {left: deltaX, opacity: opacityPercent }, {duration: 50, queue: false, easing: 'easeOutQuad'});  // 1819
                                                                                                                      // 1820
        });                                                                                                           // 1821
                                                                                                                      // 1822
        hammerHandler.on('panend', function(e) {                                                                      // 1823
          var deltaX = e.deltaX;                                                                                      // 1824
          var activationDistance = 80;                                                                                // 1825
                                                                                                                      // 1826
          // If toast dragged past activation point                                                                   // 1827
          if (Math.abs(deltaX) > activationDistance) {                                                                // 1828
            Vel(toast, {marginTop: '-40px'}, { duration: 375,                                                         // 1829
                easing: 'easeOutExpo',                                                                                // 1830
                queue: false,                                                                                         // 1831
                complete: function(){                                                                                 // 1832
                  if(typeof(completeCallback) === "function") {                                                       // 1833
                    completeCallback();                                                                               // 1834
                  }                                                                                                   // 1835
                  toast.parentNode.removeChild(toast);                                                                // 1836
                }                                                                                                     // 1837
            });                                                                                                       // 1838
                                                                                                                      // 1839
          } else {                                                                                                    // 1840
            toast.classList.remove('panning');                                                                        // 1841
            // Put toast back into original position                                                                  // 1842
            Vel(toast, { left: 0, opacity: 1 }, { duration: 300,                                                      // 1843
              easing: 'easeOutExpo',                                                                                  // 1844
              queue: false                                                                                            // 1845
            });                                                                                                       // 1846
                                                                                                                      // 1847
          }                                                                                                           // 1848
        });                                                                                                           // 1849
                                                                                                                      // 1850
        return toast;                                                                                                 // 1851
    }                                                                                                                 // 1852
};                                                                                                                    // 1853
;(function ($) {                                                                                                      // 1854
                                                                                                                      // 1855
  var methods = {                                                                                                     // 1856
    init : function(options) {                                                                                        // 1857
      var defaults = {                                                                                                // 1858
        menuWidth: 240,                                                                                               // 1859
        edge: 'left',                                                                                                 // 1860
        closeOnClick: false                                                                                           // 1861
      };                                                                                                              // 1862
      options = $.extend(defaults, options);                                                                          // 1863
                                                                                                                      // 1864
      $(this).each(function(){                                                                                        // 1865
        var $this = $(this);                                                                                          // 1866
        var menu_id = $("#"+ $this.attr('data-activates'));                                                           // 1867
                                                                                                                      // 1868
        // Set to width                                                                                               // 1869
        if (options.menuWidth != 240) {                                                                               // 1870
          menu_id.css('width', options.menuWidth);                                                                    // 1871
        }                                                                                                             // 1872
                                                                                                                      // 1873
        // Add Touch Area                                                                                             // 1874
        $('body').append($('<div class="drag-target"></div>'));                                                       // 1875
                                                                                                                      // 1876
        if (options.edge == 'left') {                                                                                 // 1877
          menu_id.css('left', -1 * (options.menuWidth + 10));                                                         // 1878
          $('.drag-target').css({'left': 0}); // Add Touch Area                                                       // 1879
        }                                                                                                             // 1880
        else {                                                                                                        // 1881
          menu_id.addClass('right-aligned') // Change text-alignment to right                                         // 1882
            .css('right', -1 * (options.menuWidth + 10))                                                              // 1883
            .css('left', '');                                                                                         // 1884
          $('.drag-target').css({'right': 0}); // Add Touch Area                                                      // 1885
        }                                                                                                             // 1886
                                                                                                                      // 1887
        // If fixed sidenav, bring menu out                                                                           // 1888
        if (menu_id.hasClass('fixed')) {                                                                              // 1889
            if (window.innerWidth > 992) {                                                                            // 1890
              menu_id.css('left', 0);                                                                                 // 1891
            }                                                                                                         // 1892
          }                                                                                                           // 1893
                                                                                                                      // 1894
        // Window resize to reset on large screens fixed                                                              // 1895
        if (menu_id.hasClass('fixed')) {                                                                              // 1896
          $(window).resize( function() {                                                                              // 1897
            if (window.innerWidth > 992) {                                                                            // 1898
              // Close menu if window is resized bigger than 992 and user has fixed sidenav                           // 1899
              if ($('#sidenav-overlay').css('opacity') !== 0 && menuOut) {                                            // 1900
                removeMenu(true);                                                                                     // 1901
              }                                                                                                       // 1902
              else {                                                                                                  // 1903
                menu_id.removeAttr('style');                                                                          // 1904
                menu_id.css('width', options.menuWidth);                                                              // 1905
              }                                                                                                       // 1906
            }                                                                                                         // 1907
            else if (menuOut === false){                                                                              // 1908
              if (options.edge === 'left')                                                                            // 1909
                menu_id.css('left', -1 * (options.menuWidth + 10));                                                   // 1910
              else                                                                                                    // 1911
                menu_id.css('right', -1 * (options.menuWidth + 10));                                                  // 1912
            }                                                                                                         // 1913
                                                                                                                      // 1914
          });                                                                                                         // 1915
        }                                                                                                             // 1916
                                                                                                                      // 1917
        // if closeOnClick, then add close event for all a tags in side sideNav                                       // 1918
        if (options.closeOnClick === true) {                                                                          // 1919
          menu_id.on("click.itemclick", "a:not(.collapsible-header)", function(){                                     // 1920
            removeMenu();                                                                                             // 1921
          });                                                                                                         // 1922
        }                                                                                                             // 1923
                                                                                                                      // 1924
        function removeMenu(restoreNav) {                                                                             // 1925
          panning = false;                                                                                            // 1926
          menuOut = false;                                                                                            // 1927
                                                                                                                      // 1928
          // Reenable scrolling                                                                                       // 1929
          $('body').css('overflow', '');                                                                              // 1930
                                                                                                                      // 1931
          $('#sidenav-overlay').velocity({opacity: 0}, {duration: 200, queue: false, easing: 'easeOutQuad',           // 1932
            complete: function() {                                                                                    // 1933
              $(this).remove();                                                                                       // 1934
            } });                                                                                                     // 1935
          if (options.edge === 'left') {                                                                              // 1936
            // Reset phantom div                                                                                      // 1937
            $('.drag-target').css({width: '', right: '', left: '0'});                                                 // 1938
            menu_id.velocity(                                                                                         // 1939
              {left: -1 * (options.menuWidth + 10)},                                                                  // 1940
              { duration: 200,                                                                                        // 1941
                queue: false,                                                                                         // 1942
                easing: 'easeOutCubic',                                                                               // 1943
                complete: function() {                                                                                // 1944
                  if (restoreNav === true) {                                                                          // 1945
                    // Restore Fixed sidenav                                                                          // 1946
                    menu_id.removeAttr('style');                                                                      // 1947
                    menu_id.css('width', options.menuWidth);                                                          // 1948
                  }                                                                                                   // 1949
                }                                                                                                     // 1950
                                                                                                                      // 1951
            });                                                                                                       // 1952
          }                                                                                                           // 1953
          else {                                                                                                      // 1954
            // Reset phantom div                                                                                      // 1955
            $('.drag-target').css({width: '', right: '0', left: ''});                                                 // 1956
            menu_id.velocity(                                                                                         // 1957
              {right: -1 * (options.menuWidth + 10)},                                                                 // 1958
              { duration: 200,                                                                                        // 1959
                queue: false,                                                                                         // 1960
                easing: 'easeOutCubic',                                                                               // 1961
                complete: function() {                                                                                // 1962
                  if (restoreNav === true) {                                                                          // 1963
                    // Restore Fixed sidenav                                                                          // 1964
                    menu_id.removeAttr('style');                                                                      // 1965
                    menu_id.css('width', options.menuWidth);                                                          // 1966
                  }                                                                                                   // 1967
                }                                                                                                     // 1968
              });                                                                                                     // 1969
          }                                                                                                           // 1970
        }                                                                                                             // 1971
                                                                                                                      // 1972
                                                                                                                      // 1973
                                                                                                                      // 1974
        // Touch Event                                                                                                // 1975
        var panning = false;                                                                                          // 1976
        var menuOut = false;                                                                                          // 1977
                                                                                                                      // 1978
        $('.drag-target').on('click', function(){                                                                     // 1979
          removeMenu();                                                                                               // 1980
        });                                                                                                           // 1981
                                                                                                                      // 1982
        $('.drag-target').hammer({                                                                                    // 1983
          prevent_default: false                                                                                      // 1984
        }).bind('pan', function(e) {                                                                                  // 1985
                                                                                                                      // 1986
          if (e.gesture.pointerType == "touch") {                                                                     // 1987
                                                                                                                      // 1988
            var direction = e.gesture.direction;                                                                      // 1989
            var x = e.gesture.center.x;                                                                               // 1990
            var y = e.gesture.center.y;                                                                               // 1991
            var velocityX = e.gesture.velocityX;                                                                      // 1992
                                                                                                                      // 1993
            // Disable Scrolling                                                                                      // 1994
            $('body').css('overflow', 'hidden');                                                                      // 1995
                                                                                                                      // 1996
            // If overlay does not exist, create one and if it is clicked, close menu                                 // 1997
            if ($('#sidenav-overlay').length === 0) {                                                                 // 1998
              var overlay = $('<div id="sidenav-overlay"></div>');                                                    // 1999
              overlay.css('opacity', 0).click( function(){                                                            // 2000
                removeMenu();                                                                                         // 2001
              });                                                                                                     // 2002
              $('body').append(overlay);                                                                              // 2003
            }                                                                                                         // 2004
                                                                                                                      // 2005
            // Keep within boundaries                                                                                 // 2006
            if (options.edge === 'left') {                                                                            // 2007
              if (x > options.menuWidth) { x = options.menuWidth; }                                                   // 2008
              else if (x < 0) { x = 0; }                                                                              // 2009
            }                                                                                                         // 2010
                                                                                                                      // 2011
            if (options.edge === 'left') {                                                                            // 2012
              // Left Direction                                                                                       // 2013
              if (x < (options.menuWidth / 2)) { menuOut = false; }                                                   // 2014
              // Right Direction                                                                                      // 2015
              else if (x >= (options.menuWidth / 2)) { menuOut = true; }                                              // 2016
                                                                                                                      // 2017
              menu_id.css('left', (x - options.menuWidth));                                                           // 2018
            }                                                                                                         // 2019
            else {                                                                                                    // 2020
              // Left Direction                                                                                       // 2021
              if (x < (window.innerWidth - options.menuWidth / 2)) {                                                  // 2022
                menuOut = true;                                                                                       // 2023
              }                                                                                                       // 2024
              // Right Direction                                                                                      // 2025
              else if (x >= (window.innerWidth - options.menuWidth / 2)) {                                            // 2026
               menuOut = false;                                                                                       // 2027
             }                                                                                                        // 2028
              var rightPos = -1 *(x - options.menuWidth / 2);                                                         // 2029
              if (rightPos > 0) {                                                                                     // 2030
                rightPos = 0;                                                                                         // 2031
              }                                                                                                       // 2032
                                                                                                                      // 2033
              menu_id.css('right', rightPos);                                                                         // 2034
            }                                                                                                         // 2035
                                                                                                                      // 2036
                                                                                                                      // 2037
                                                                                                                      // 2038
                                                                                                                      // 2039
            // Percentage overlay                                                                                     // 2040
            var overlayPerc;                                                                                          // 2041
            if (options.edge === 'left') {                                                                            // 2042
              overlayPerc = x / options.menuWidth;                                                                    // 2043
              $('#sidenav-overlay').velocity({opacity: overlayPerc }, {duration: 50, queue: false, easing: 'easeOutQuad'});
            }                                                                                                         // 2045
            else {                                                                                                    // 2046
              overlayPerc = Math.abs((x - window.innerWidth) / options.menuWidth);                                    // 2047
              $('#sidenav-overlay').velocity({opacity: overlayPerc }, {duration: 50, queue: false, easing: 'easeOutQuad'});
            }                                                                                                         // 2049
          }                                                                                                           // 2050
                                                                                                                      // 2051
        }).bind('panend', function(e) {                                                                               // 2052
                                                                                                                      // 2053
          if (e.gesture.pointerType == "touch") {                                                                     // 2054
            var velocityX = e.gesture.velocityX;                                                                      // 2055
            panning = false;                                                                                          // 2056
            if (options.edge === 'left') {                                                                            // 2057
              // If velocityX <= 0.3 then the user is flinging the menu closed so ignore menuOut                      // 2058
              if ((menuOut && velocityX <= 0.3) || velocityX < -0.5) {                                                // 2059
                menu_id.velocity({left: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});                    // 2060
                $('#sidenav-overlay').velocity({opacity: 1 }, {duration: 50, queue: false, easing: 'easeOutQuad'});   // 2061
                $('.drag-target').css({width: '50%', right: 0, left: ''});                                            // 2062
              }                                                                                                       // 2063
              else if (!menuOut || velocityX > 0.3) {                                                                 // 2064
                // Enable Scrolling                                                                                   // 2065
                $('body').css('overflow', '');                                                                        // 2066
                // Slide menu closed                                                                                  // 2067
                menu_id.velocity({left: -1 * (options.menuWidth + 10)}, {duration: 200, queue: false, easing: 'easeOutQuad'});
                $('#sidenav-overlay').velocity({opacity: 0 }, {duration: 200, queue: false, easing: 'easeOutQuad',    // 2069
                  complete: function () {                                                                             // 2070
                    $(this).remove();                                                                                 // 2071
                  }});                                                                                                // 2072
                $('.drag-target').css({width: '10px', right: '', left: 0});                                           // 2073
              }                                                                                                       // 2074
            }                                                                                                         // 2075
            else {                                                                                                    // 2076
              if ((menuOut && velocityX >= -0.3) || velocityX > 0.5) {                                                // 2077
                menu_id.velocity({right: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});                   // 2078
                $('#sidenav-overlay').velocity({opacity: 1 }, {duration: 50, queue: false, easing: 'easeOutQuad'});   // 2079
                $('.drag-target').css({width: '50%', right: '', left: 0});                                            // 2080
              }                                                                                                       // 2081
              else if (!menuOut || velocityX < -0.3) {                                                                // 2082
                // Enable Scrolling                                                                                   // 2083
                $('body').css('overflow', '');                                                                        // 2084
                // Slide menu closed                                                                                  // 2085
                menu_id.velocity({right: -1 * (options.menuWidth + 10)}, {duration: 200, queue: false, easing: 'easeOutQuad'});
                $('#sidenav-overlay').velocity({opacity: 0 }, {duration: 200, queue: false, easing: 'easeOutQuad',    // 2087
                  complete: function () {                                                                             // 2088
                    $(this).remove();                                                                                 // 2089
                  }});                                                                                                // 2090
                $('.drag-target').css({width: '10px', right: 0, left: ''});                                           // 2091
              }                                                                                                       // 2092
            }                                                                                                         // 2093
                                                                                                                      // 2094
          }                                                                                                           // 2095
        });                                                                                                           // 2096
                                                                                                                      // 2097
          $this.click(function() {                                                                                    // 2098
            if (menuOut === true) {                                                                                   // 2099
              menuOut = false;                                                                                        // 2100
              panning = false;                                                                                        // 2101
              removeMenu();                                                                                           // 2102
            }                                                                                                         // 2103
            else {                                                                                                    // 2104
                                                                                                                      // 2105
              // Disable Scrolling                                                                                    // 2106
              $('body').css('overflow', 'hidden');                                                                    // 2107
                                                                                                                      // 2108
              if (options.edge === 'left') {                                                                          // 2109
                $('.drag-target').css({width: '50%', right: 0, left: ''});                                            // 2110
                menu_id.velocity({left: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});                    // 2111
              }                                                                                                       // 2112
              else {                                                                                                  // 2113
                $('.drag-target').css({width: '50%', right: '', left: 0});                                            // 2114
                menu_id.velocity({right: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});                   // 2115
                menu_id.css('left','');                                                                               // 2116
              }                                                                                                       // 2117
                                                                                                                      // 2118
              var overlay = $('<div id="sidenav-overlay"></div>');                                                    // 2119
              overlay.css('opacity', 0)                                                                               // 2120
              .click(function(){                                                                                      // 2121
                menuOut = false;                                                                                      // 2122
                panning = false;                                                                                      // 2123
                removeMenu();                                                                                         // 2124
                overlay.velocity({opacity: 0}, {duration: 300, queue: false, easing: 'easeOutQuad',                   // 2125
                  complete: function() {                                                                              // 2126
                    $(this).remove();                                                                                 // 2127
                  } });                                                                                               // 2128
                                                                                                                      // 2129
              });                                                                                                     // 2130
              $('body').append(overlay);                                                                              // 2131
              overlay.velocity({opacity: 1}, {duration: 300, queue: false, easing: 'easeOutQuad',                     // 2132
                complete: function () {                                                                               // 2133
                  menuOut = true;                                                                                     // 2134
                  panning = false;                                                                                    // 2135
                }                                                                                                     // 2136
              });                                                                                                     // 2137
            }                                                                                                         // 2138
                                                                                                                      // 2139
            return false;                                                                                             // 2140
          });                                                                                                         // 2141
      });                                                                                                             // 2142
                                                                                                                      // 2143
                                                                                                                      // 2144
    },                                                                                                                // 2145
    show : function() {                                                                                               // 2146
      this.trigger('click');                                                                                          // 2147
    },                                                                                                                // 2148
    hide : function() {                                                                                               // 2149
      $('#sidenav-overlay').trigger('click');                                                                         // 2150
    }                                                                                                                 // 2151
  };                                                                                                                  // 2152
                                                                                                                      // 2153
                                                                                                                      // 2154
    $.fn.sideNav = function(methodOrOptions) {                                                                        // 2155
      if ( methods[methodOrOptions] ) {                                                                               // 2156
        return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));                   // 2157
      } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {                                        // 2158
        // Default to "init"                                                                                          // 2159
        return methods.init.apply( this, arguments );                                                                 // 2160
      } else {                                                                                                        // 2161
        $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.sideNav' );                                // 2162
      }                                                                                                               // 2163
    }; // Plugin end                                                                                                  // 2164
}( jQuery ));                                                                                                         // 2165
;/**                                                                                                                  // 2166
 * Extend jquery with a scrollspy plugin.                                                                             // 2167
 * This watches the window scroll and fires events when elements are scrolled into viewport.                          // 2168
 *                                                                                                                    // 2169
 * throttle() and getTime() taken from Underscore.js                                                                  // 2170
 * https://github.com/jashkenas/underscore                                                                            // 2171
 *                                                                                                                    // 2172
 * @author Copyright 2013 John Smart                                                                                  // 2173
 * @license https://raw.github.com/thesmart/jquery-scrollspy/master/LICENSE                                           // 2174
 * @see https://github.com/thesmart                                                                                   // 2175
 * @version 0.1.2                                                                                                     // 2176
 */                                                                                                                   // 2177
(function($) {                                                                                                        // 2178
                                                                                                                      // 2179
	var jWindow = $(window);                                                                                             // 2180
	var elements = [];                                                                                                   // 2181
	var elementsInView = [];                                                                                             // 2182
	var isSpying = false;                                                                                                // 2183
	var ticks = 0;                                                                                                       // 2184
	var unique_id = 1;                                                                                                   // 2185
	var offset = {                                                                                                       // 2186
		top : 0,                                                                                                            // 2187
		right : 0,                                                                                                          // 2188
		bottom : 0,                                                                                                         // 2189
		left : 0,                                                                                                           // 2190
	}                                                                                                                    // 2191
                                                                                                                      // 2192
	/**                                                                                                                  // 2193
	 * Find elements that are within the boundary                                                                        // 2194
	 * @param {number} top                                                                                               // 2195
	 * @param {number} right                                                                                             // 2196
	 * @param {number} bottom                                                                                            // 2197
	 * @param {number} left                                                                                              // 2198
	 * @return {jQuery}		A collection of elements                                                                        // 2199
	 */                                                                                                                  // 2200
	function findElements(top, right, bottom, left) {                                                                    // 2201
		var hits = $();                                                                                                     // 2202
		$.each(elements, function(i, element) {                                                                             // 2203
			if (element.height() > 0) {                                                                                        // 2204
				var elTop = element.offset().top,                                                                                 // 2205
					elLeft = element.offset().left,                                                                                  // 2206
					elRight = elLeft + element.width(),                                                                              // 2207
					elBottom = elTop + element.height();                                                                             // 2208
                                                                                                                      // 2209
				var isIntersect = !(elLeft > right ||                                                                             // 2210
					elRight < left ||                                                                                                // 2211
					elTop > bottom ||                                                                                                // 2212
					elBottom < top);                                                                                                 // 2213
                                                                                                                      // 2214
				if (isIntersect) {                                                                                                // 2215
					hits.push(element);                                                                                              // 2216
				}                                                                                                                 // 2217
			}                                                                                                                  // 2218
		});                                                                                                                 // 2219
                                                                                                                      // 2220
		return hits;                                                                                                        // 2221
	}                                                                                                                    // 2222
                                                                                                                      // 2223
                                                                                                                      // 2224
	/**                                                                                                                  // 2225
	 * Called when the user scrolls the window                                                                           // 2226
	 */                                                                                                                  // 2227
	function onScroll() {                                                                                                // 2228
		// unique tick id                                                                                                   // 2229
		++ticks;                                                                                                            // 2230
                                                                                                                      // 2231
		// viewport rectangle                                                                                               // 2232
		var top = jWindow.scrollTop(),                                                                                      // 2233
			left = jWindow.scrollLeft(),                                                                                       // 2234
			right = left + jWindow.width(),                                                                                    // 2235
			bottom = top + jWindow.height();                                                                                   // 2236
                                                                                                                      // 2237
		// determine which elements are in view                                                                             // 2238
//        + 60 accounts for fixed nav                                                                                 // 2239
		var intersections = findElements(top+offset.top + 200, right+offset.right, bottom+offset.bottom, left+offset.left);
		$.each(intersections, function(i, element) {                                                                        // 2241
                                                                                                                      // 2242
			var lastTick = element.data('scrollSpy:ticks');                                                                    // 2243
			if (typeof lastTick != 'number') {                                                                                 // 2244
				// entered into view                                                                                              // 2245
				element.triggerHandler('scrollSpy:enter');                                                                        // 2246
			}                                                                                                                  // 2247
                                                                                                                      // 2248
			// update tick id                                                                                                  // 2249
			element.data('scrollSpy:ticks', ticks);                                                                            // 2250
		});                                                                                                                 // 2251
                                                                                                                      // 2252
		// determine which elements are no longer in view                                                                   // 2253
		$.each(elementsInView, function(i, element) {                                                                       // 2254
			var lastTick = element.data('scrollSpy:ticks');                                                                    // 2255
			if (typeof lastTick == 'number' && lastTick !== ticks) {                                                           // 2256
				// exited from view                                                                                               // 2257
				element.triggerHandler('scrollSpy:exit');                                                                         // 2258
				element.data('scrollSpy:ticks', null);                                                                            // 2259
			}                                                                                                                  // 2260
		});                                                                                                                 // 2261
                                                                                                                      // 2262
		// remember elements in view for next tick                                                                          // 2263
		elementsInView = intersections;                                                                                     // 2264
	}                                                                                                                    // 2265
                                                                                                                      // 2266
	/**                                                                                                                  // 2267
	 * Called when window is resized                                                                                     // 2268
	*/                                                                                                                   // 2269
	function onWinSize() {                                                                                               // 2270
		jWindow.trigger('scrollSpy:winSize');                                                                               // 2271
	}                                                                                                                    // 2272
                                                                                                                      // 2273
	/**                                                                                                                  // 2274
	 * Get time in ms                                                                                                    // 2275
   * @license https://raw.github.com/jashkenas/underscore/master/LICENSE                                              // 2276
	 * @type {function}                                                                                                  // 2277
	 * @return {number}                                                                                                  // 2278
	 */                                                                                                                  // 2279
	var getTime = (Date.now || function () {                                                                             // 2280
		return new Date().getTime();                                                                                        // 2281
	});                                                                                                                  // 2282
                                                                                                                      // 2283
	/**                                                                                                                  // 2284
	 * Returns a function, that, when invoked, will only be triggered at most once                                       // 2285
	 * during a given window of time. Normally, the throttled function will run                                          // 2286
	 * as much as it can, without ever going more than once per `wait` duration;                                         // 2287
	 * but if you'd like to disable the execution on the leading edge, pass                                              // 2288
	 * `{leading: false}`. To disable execution on the trailing edge, ditto.                                             // 2289
	 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE                                               // 2290
	 * @param {function} func                                                                                            // 2291
	 * @param {number} wait                                                                                              // 2292
	 * @param {Object=} options                                                                                          // 2293
	 * @returns {Function}                                                                                               // 2294
	 */                                                                                                                  // 2295
	function throttle(func, wait, options) {                                                                             // 2296
		var context, args, result;                                                                                          // 2297
		var timeout = null;                                                                                                 // 2298
		var previous = 0;                                                                                                   // 2299
		options || (options = {});                                                                                          // 2300
		var later = function () {                                                                                           // 2301
			previous = options.leading === false ? 0 : getTime();                                                              // 2302
			timeout = null;                                                                                                    // 2303
			result = func.apply(context, args);                                                                                // 2304
			context = args = null;                                                                                             // 2305
		};                                                                                                                  // 2306
		return function () {                                                                                                // 2307
			var now = getTime();                                                                                               // 2308
			if (!previous && options.leading === false) previous = now;                                                        // 2309
			var remaining = wait - (now - previous);                                                                           // 2310
			context = this;                                                                                                    // 2311
			args = arguments;                                                                                                  // 2312
			if (remaining <= 0) {                                                                                              // 2313
				clearTimeout(timeout);                                                                                            // 2314
				timeout = null;                                                                                                   // 2315
				previous = now;                                                                                                   // 2316
				result = func.apply(context, args);                                                                               // 2317
				context = args = null;                                                                                            // 2318
			} else if (!timeout && options.trailing !== false) {                                                               // 2319
				timeout = setTimeout(later, remaining);                                                                           // 2320
			}                                                                                                                  // 2321
			return result;                                                                                                     // 2322
		};                                                                                                                  // 2323
	};                                                                                                                   // 2324
                                                                                                                      // 2325
	/**                                                                                                                  // 2326
	 * Enables ScrollSpy using a selector                                                                                // 2327
	 * @param {jQuery|string} selector  The elements collection, or a selector                                           // 2328
	 * @param {Object=} options	Optional.                                                                                // 2329
        throttle : number -> scrollspy throttling. Default: 100 ms                                                    // 2330
        offsetTop : number -> offset from top. Default: 0                                                             // 2331
        offsetRight : number -> offset from right. Default: 0                                                         // 2332
        offsetBottom : number -> offset from bottom. Default: 0                                                       // 2333
        offsetLeft : number -> offset from left. Default: 0                                                           // 2334
	 * @returns {jQuery}                                                                                                 // 2335
	 */                                                                                                                  // 2336
	$.scrollSpy = function(selector, options) {                                                                          // 2337
		var visible = [];                                                                                                   // 2338
		selector = $(selector);                                                                                             // 2339
		selector.each(function(i, element) {                                                                                // 2340
			elements.push($(element));                                                                                         // 2341
			$(element).data("scrollSpy:id", i);                                                                                // 2342
			// Smooth scroll to section                                                                                        // 2343
		  $('a[href=#' + $(element).attr('id') + ']').click(function(e) {                                                   // 2344
		    e.preventDefault();                                                                                             // 2345
		    var offset = $(this.hash).offset().top + 1;                                                                     // 2346
                                                                                                                      // 2347
//          offset - 200 allows elements near bottom of page to scroll                                                // 2348
                                                                                                                      // 2349
	    	$('html, body').animate({ scrollTop: offset - 200 }, {duration: 400, queue: false, easing: 'easeOutCubic'});    // 2350
                                                                                                                      // 2351
		  });                                                                                                               // 2352
		});                                                                                                                 // 2353
		options = options || {                                                                                              // 2354
			throttle: 100                                                                                                      // 2355
		};                                                                                                                  // 2356
                                                                                                                      // 2357
		offset.top = options.offsetTop || 0;                                                                                // 2358
		offset.right = options.offsetRight || 0;                                                                            // 2359
		offset.bottom = options.offsetBottom || 0;                                                                          // 2360
		offset.left = options.offsetLeft || 0;                                                                              // 2361
                                                                                                                      // 2362
		var throttledScroll = throttle(onScroll, options.throttle || 100);                                                  // 2363
		var readyScroll = function(){                                                                                       // 2364
			$(document).ready(throttledScroll);                                                                                // 2365
		};                                                                                                                  // 2366
                                                                                                                      // 2367
		if (!isSpying) {                                                                                                    // 2368
			jWindow.on('scroll', readyScroll);                                                                                 // 2369
			jWindow.on('resize', readyScroll);                                                                                 // 2370
			isSpying = true;                                                                                                   // 2371
		}                                                                                                                   // 2372
                                                                                                                      // 2373
		// perform a scan once, after current execution context, and after dom is ready                                     // 2374
		setTimeout(readyScroll, 0);                                                                                         // 2375
                                                                                                                      // 2376
                                                                                                                      // 2377
		selector.on('scrollSpy:enter', function() {                                                                         // 2378
			visible = $.grep(visible, function(value) {                                                                        // 2379
	      return value.height() != 0;                                                                                    // 2380
	    });                                                                                                              // 2381
                                                                                                                      // 2382
			var $this = $(this);                                                                                               // 2383
                                                                                                                      // 2384
			if (visible[0]) {                                                                                                  // 2385
				$('a[href=#' + visible[0].attr('id') + ']').removeClass('active');                                                // 2386
				if ($this.data('scrollSpy:id') < visible[0].data('scrollSpy:id')) {                                               // 2387
					visible.unshift($(this));                                                                                        // 2388
				}                                                                                                                 // 2389
				else {                                                                                                            // 2390
					visible.push($(this));                                                                                           // 2391
				}                                                                                                                 // 2392
			}                                                                                                                  // 2393
			else {                                                                                                             // 2394
				visible.push($(this));                                                                                            // 2395
			}                                                                                                                  // 2396
                                                                                                                      // 2397
                                                                                                                      // 2398
			$('a[href=#' + visible[0].attr('id') + ']').addClass('active');                                                    // 2399
		});                                                                                                                 // 2400
		selector.on('scrollSpy:exit', function() {                                                                          // 2401
			visible = $.grep(visible, function(value) {                                                                        // 2402
	      return value.height() != 0;                                                                                    // 2403
	    });                                                                                                              // 2404
                                                                                                                      // 2405
			if (visible[0]) {                                                                                                  // 2406
				$('a[href=#' + visible[0].attr('id') + ']').removeClass('active');                                                // 2407
				var $this = $(this);                                                                                              // 2408
				visible = $.grep(visible, function(value) {                                                                       // 2409
	        return value.attr('id') != $this.attr('id');                                                                 // 2410
	      });                                                                                                            // 2411
	      if (visible[0]) { // Check if empty                                                                            // 2412
					$('a[href=#' + visible[0].attr('id') + ']').addClass('active');                                                  // 2413
	      }                                                                                                              // 2414
			}                                                                                                                  // 2415
		});                                                                                                                 // 2416
                                                                                                                      // 2417
		return selector;                                                                                                    // 2418
	};                                                                                                                   // 2419
                                                                                                                      // 2420
	/**                                                                                                                  // 2421
	 * Listen for window resize events                                                                                   // 2422
	 * @param {Object=} options						Optional. Set { throttle: number } to change throttling. Default: 100 ms            // 2423
	 * @returns {jQuery}		$(window)                                                                                      // 2424
	 */                                                                                                                  // 2425
	$.winSizeSpy = function(options) {                                                                                   // 2426
		$.winSizeSpy = function() { return jWindow; }; // lock from multiple calls                                          // 2427
		options = options || {                                                                                              // 2428
			throttle: 100                                                                                                      // 2429
		};                                                                                                                  // 2430
		return jWindow.on('resize', throttle(onWinSize, options.throttle || 100));                                          // 2431
	};                                                                                                                   // 2432
                                                                                                                      // 2433
	/**                                                                                                                  // 2434
	 * Enables ScrollSpy on a collection of elements                                                                     // 2435
	 * e.g. $('.scrollSpy').scrollSpy()                                                                                  // 2436
	 * @param {Object=} options	Optional.                                                                                // 2437
											throttle : number -> scrollspy throttling. Default: 100 ms                                                 // 2438
											offsetTop : number -> offset from top. Default: 0                                                          // 2439
											offsetRight : number -> offset from right. Default: 0                                                      // 2440
											offsetBottom : number -> offset from bottom. Default: 0                                                    // 2441
											offsetLeft : number -> offset from left. Default: 0                                                        // 2442
	 * @returns {jQuery}                                                                                                 // 2443
	 */                                                                                                                  // 2444
	$.fn.scrollSpy = function(options) {                                                                                 // 2445
		return $.scrollSpy($(this), options);                                                                               // 2446
	};                                                                                                                   // 2447
                                                                                                                      // 2448
})(jQuery);;(function ($) {                                                                                           // 2449
  $(document).ready(function() {                                                                                      // 2450
                                                                                                                      // 2451
    // Function to update labels of text fields                                                                       // 2452
    Materialize.updateTextFields = function() {                                                                       // 2453
      var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
      $(input_selector).each(function(index, element) {                                                               // 2455
        if ($(element).val().length > 0 || $(this).attr('placeholder') !== undefined || $(element)[0].validity.badInput === true) {
          $(this).siblings('label, i').addClass('active');                                                            // 2457
        }                                                                                                             // 2458
        else {                                                                                                        // 2459
          $(this).siblings('label, i').removeClass('active');                                                         // 2460
        }                                                                                                             // 2461
      });                                                                                                             // 2462
    };                                                                                                                // 2463
                                                                                                                      // 2464
    // Text based inputs                                                                                              // 2465
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
                                                                                                                      // 2467
    // Handle HTML5 autofocus                                                                                         // 2468
    $('input[autofocus]').siblings('label, i').addClass('active');                                                    // 2469
                                                                                                                      // 2470
    // Add active if form auto complete                                                                               // 2471
    $(document).on('change', input_selector, function () {                                                            // 2472
      if($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined) {                                   // 2473
        $(this).siblings('label, i').addClass('active');                                                              // 2474
      }                                                                                                               // 2475
      validate_field($(this));                                                                                        // 2476
    });                                                                                                               // 2477
                                                                                                                      // 2478
    // Add active if input element has been pre-populated on document ready                                           // 2479
    $(document).ready(function() {                                                                                    // 2480
      Materialize.updateTextFields();                                                                                 // 2481
    });                                                                                                               // 2482
                                                                                                                      // 2483
    // HTML DOM FORM RESET handling                                                                                   // 2484
    $(document).on('reset', function(e) {                                                                             // 2485
      var formReset = $(e.target);                                                                                    // 2486
      if (formReset.is('form')) {                                                                                     // 2487
        formReset.find(input_selector).removeClass('valid').removeClass('invalid');                                   // 2488
        formReset.find(input_selector).each(function () {                                                             // 2489
          if ($(this).attr('value') === '') {                                                                         // 2490
            $(this).siblings('label, i').removeClass('active');                                                       // 2491
          }                                                                                                           // 2492
        });                                                                                                           // 2493
                                                                                                                      // 2494
        // Reset select                                                                                               // 2495
        formReset.find('select.initialized').each(function () {                                                       // 2496
          var reset_text = formReset.find('option[selected]').text();                                                 // 2497
          formReset.siblings('input.select-dropdown').val(reset_text);                                                // 2498
        });                                                                                                           // 2499
      }                                                                                                               // 2500
    });                                                                                                               // 2501
                                                                                                                      // 2502
    // Add active when element has focus                                                                              // 2503
    $(document).on('focus', input_selector, function () {                                                             // 2504
      $(this).siblings('label, i').addClass('active');                                                                // 2505
    });                                                                                                               // 2506
                                                                                                                      // 2507
    $(document).on('blur', input_selector, function () {                                                              // 2508
      var $inputElement = $(this);                                                                                    // 2509
      if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
        $inputElement.siblings('label, i').removeClass('active');                                                     // 2511
      }                                                                                                               // 2512
      validate_field($inputElement);                                                                                  // 2513
    });                                                                                                               // 2514
                                                                                                                      // 2515
    validate_field = function(object) {                                                                               // 2516
      var hasLength = object.attr('length') !== undefined;                                                            // 2517
      var lenAttr = parseInt(object.attr('length'));                                                                  // 2518
      var len = object.val().length;                                                                                  // 2519
                                                                                                                      // 2520
      if (object.val().length === 0 && object[0].validity.badInput === false) {                                       // 2521
        if (object.hasClass('validate')) {                                                                            // 2522
          object.removeClass('valid');                                                                                // 2523
          object.removeClass('invalid');                                                                              // 2524
        }                                                                                                             // 2525
      }                                                                                                               // 2526
      else {                                                                                                          // 2527
        if (object.hasClass('validate')) {                                                                            // 2528
          // Check for character counter attributes                                                                   // 2529
          if ((object.is(':valid') && hasLength && (len < lenAttr)) || (object.is(':valid') && !hasLength)) {         // 2530
            object.removeClass('invalid');                                                                            // 2531
            object.addClass('valid');                                                                                 // 2532
          }                                                                                                           // 2533
          else {                                                                                                      // 2534
            object.removeClass('valid');                                                                              // 2535
            object.addClass('invalid');                                                                               // 2536
          }                                                                                                           // 2537
        }                                                                                                             // 2538
      }                                                                                                               // 2539
    };                                                                                                                // 2540
                                                                                                                      // 2541
                                                                                                                      // 2542
    // Textarea Auto Resize                                                                                           // 2543
    var hiddenDiv = $('.hiddendiv').first();                                                                          // 2544
    if (!hiddenDiv.length) {                                                                                          // 2545
      hiddenDiv = $('<div class="hiddendiv common"></div>');                                                          // 2546
      $('body').append(hiddenDiv);                                                                                    // 2547
    }                                                                                                                 // 2548
    var text_area_selector = '.materialize-textarea';                                                                 // 2549
                                                                                                                      // 2550
    function textareaAutoResize($textarea) {                                                                          // 2551
      // Set font properties of hiddenDiv                                                                             // 2552
                                                                                                                      // 2553
      var fontFamily = $textarea.css('font-family');                                                                  // 2554
      var fontSize = $textarea.css('font-size');                                                                      // 2555
                                                                                                                      // 2556
      if (fontSize) { hiddenDiv.css('font-size', fontSize); }                                                         // 2557
      if (fontFamily) { hiddenDiv.css('font-family', fontFamily); }                                                   // 2558
                                                                                                                      // 2559
      if ($textarea.attr('wrap') === "off") {                                                                         // 2560
        hiddenDiv.css('overflow-wrap', "normal")                                                                      // 2561
                 .css('white-space', "pre");                                                                          // 2562
      }                                                                                                               // 2563
                                                                                                                      // 2564
                                                                                                                      // 2565
                                                                                                                      // 2566
                                                                                                                      // 2567
      hiddenDiv.text($textarea.val() + '\n');                                                                         // 2568
      var content = hiddenDiv.html().replace(/\n/g, '<br>');                                                          // 2569
      hiddenDiv.html(content);                                                                                        // 2570
                                                                                                                      // 2571
                                                                                                                      // 2572
      // When textarea is hidden, width goes crazy.                                                                   // 2573
      // Approximate with half of window size                                                                         // 2574
                                                                                                                      // 2575
      if ($textarea.is(':visible')) {                                                                                 // 2576
        hiddenDiv.css('width', $textarea.width());                                                                    // 2577
      }                                                                                                               // 2578
      else {                                                                                                          // 2579
        hiddenDiv.css('width', $(window).width()/2);                                                                  // 2580
      }                                                                                                               // 2581
                                                                                                                      // 2582
      $textarea.css('height', hiddenDiv.height());                                                                    // 2583
    }                                                                                                                 // 2584
                                                                                                                      // 2585
    $(text_area_selector).each(function () {                                                                          // 2586
      var $textarea = $(this);                                                                                        // 2587
      if ($textarea.val().length) {                                                                                   // 2588
        textareaAutoResize($textarea);                                                                                // 2589
      }                                                                                                               // 2590
    });                                                                                                               // 2591
                                                                                                                      // 2592
    $('body').on('keyup keydown', text_area_selector, function () {                                                   // 2593
      textareaAutoResize($(this));                                                                                    // 2594
    });                                                                                                               // 2595
                                                                                                                      // 2596
                                                                                                                      // 2597
    // File Input Path                                                                                                // 2598
    $('.file-field').each(function() {                                                                                // 2599
      var path_input = $(this).find('input.file-path');                                                               // 2600
      $(this).find('input[type="file"]').change(function () {                                                         // 2601
        path_input.val($(this)[0].files[0].name);                                                                     // 2602
        path_input.trigger('change');                                                                                 // 2603
      });                                                                                                             // 2604
    });                                                                                                               // 2605
                                                                                                                      // 2606
                                                                                                                      // 2607
                                                                                                                      // 2608
    /****************                                                                                                 // 2609
    *  Range Input  *                                                                                                 // 2610
    ****************/                                                                                                 // 2611
                                                                                                                      // 2612
    var range_type = 'input[type=range]';                                                                             // 2613
    var range_mousedown = false;                                                                                      // 2614
    var left;                                                                                                         // 2615
                                                                                                                      // 2616
    $(range_type).each(function () {                                                                                  // 2617
      var thumb = $('<span class="thumb"><span class="value"></span></span>');                                        // 2618
      $(this).after(thumb);                                                                                           // 2619
    });                                                                                                               // 2620
                                                                                                                      // 2621
    var range_wrapper = '.range-field';                                                                               // 2622
    $(document).on('change', range_type, function(e) {                                                                // 2623
      var thumb = $(this).siblings('.thumb');                                                                         // 2624
      thumb.find('.value').html($(this).val());                                                                       // 2625
    });                                                                                                               // 2626
                                                                                                                      // 2627
    $(document).on('input mousedown touchstart', range_type, function(e) {                                            // 2628
      var thumb = $(this).siblings('.thumb');                                                                         // 2629
                                                                                                                      // 2630
      // If thumb indicator does not exist yet, create it                                                             // 2631
      if (thumb.length <= 0) {                                                                                        // 2632
        thumb = $('<span class="thumb"><span class="value"></span></span>');                                          // 2633
        $(this).after(thumb);                                                                                         // 2634
      }                                                                                                               // 2635
                                                                                                                      // 2636
      // Set indicator value                                                                                          // 2637
      thumb.find('.value').html($(this).val());                                                                       // 2638
                                                                                                                      // 2639
      range_mousedown = true;                                                                                         // 2640
      $(this).addClass('active');                                                                                     // 2641
                                                                                                                      // 2642
      if (!thumb.hasClass('active')) {                                                                                // 2643
        thumb.velocity({ height: "30px", width: "30px", top: "-20px", marginLeft: "-15px"}, { duration: 300, easing: 'easeOutExpo' });
      }                                                                                                               // 2645
                                                                                                                      // 2646
      if((e.pageX === undefined || e.pageX === null) && e.originalEvent.touches){//mobile                             // 2647
         left = e.originalEvent.touches[0].pageX - $(this).offset().left;                                             // 2648
      }                                                                                                               // 2649
      else{ // desktop                                                                                                // 2650
         left = e.pageX - $(this).offset().left;                                                                      // 2651
      }                                                                                                               // 2652
      var width = $(this).outerWidth();                                                                               // 2653
                                                                                                                      // 2654
      if (left < 0) {                                                                                                 // 2655
        left = 0;                                                                                                     // 2656
      }                                                                                                               // 2657
      else if (left > width) {                                                                                        // 2658
        left = width;                                                                                                 // 2659
      }                                                                                                               // 2660
      thumb.addClass('active').css('left', left);                                                                     // 2661
      thumb.find('.value').html($(this).val());                                                                       // 2662
                                                                                                                      // 2663
                                                                                                                      // 2664
    });                                                                                                               // 2665
                                                                                                                      // 2666
    $(document).on('mouseup touchend', range_wrapper, function() {                                                    // 2667
      range_mousedown = false;                                                                                        // 2668
      $(this).removeClass('active');                                                                                  // 2669
    });                                                                                                               // 2670
                                                                                                                      // 2671
    $(document).on('mousemove touchmove', range_wrapper, function(e) {                                                // 2672
      var thumb = $(this).children('.thumb');                                                                         // 2673
      var left;                                                                                                       // 2674
      if (range_mousedown) {                                                                                          // 2675
        if (!thumb.hasClass('active')) {                                                                              // 2676
          thumb.velocity({ height: '30px', width: '30px', top: '-20px', marginLeft: '-15px'}, { duration: 300, easing: 'easeOutExpo' });
        }                                                                                                             // 2678
        if (e.pageX === undefined || e.pageX === null) { //mobile                                                     // 2679
          left = e.originalEvent.touches[0].pageX - $(this).offset().left;                                            // 2680
        }                                                                                                             // 2681
        else{ // desktop                                                                                              // 2682
          left = e.pageX - $(this).offset().left;                                                                     // 2683
        }                                                                                                             // 2684
        var width = $(this).outerWidth();                                                                             // 2685
                                                                                                                      // 2686
        if (left < 0) {                                                                                               // 2687
          left = 0;                                                                                                   // 2688
        }                                                                                                             // 2689
        else if (left > width) {                                                                                      // 2690
          left = width;                                                                                               // 2691
        }                                                                                                             // 2692
        thumb.addClass('active').css('left', left);                                                                   // 2693
                                                                                                                      // 2694
      }                                                                                                               // 2695
                                                                                                                      // 2696
    });                                                                                                               // 2697
                                                                                                                      // 2698
    $(document).on('mouseout touchleave', range_wrapper, function() {                                                 // 2699
      if (!range_mousedown) {                                                                                         // 2700
                                                                                                                      // 2701
        var thumb = $(this).children('.thumb');                                                                       // 2702
                                                                                                                      // 2703
        if (thumb.hasClass('active')) {                                                                               // 2704
          thumb.velocity({ height: '0', width: '0', top: '10px', marginLeft: '-6px'}, { duration: 100 });             // 2705
        }                                                                                                             // 2706
        thumb.removeClass('active');                                                                                  // 2707
      }                                                                                                               // 2708
    });                                                                                                               // 2709
                                                                                                                      // 2710
  }); // End of $(document).ready                                                                                     // 2711
                                                                                                                      // 2712
                                                                                                                      // 2713
                                                                                                                      // 2714
                                                                                                                      // 2715
  // Select Plugin                                                                                                    // 2716
  $.fn.material_select = function (callback) {                                                                        // 2717
    $(this).each(function(){                                                                                          // 2718
      $select = $(this);                                                                                              // 2719
                                                                                                                      // 2720
      if ( $select.hasClass('browser-default')) {                                                                     // 2721
        return; // Continue to next (return false breaks out of entire loop)                                          // 2722
      }                                                                                                               // 2723
                                                                                                                      // 2724
      // Tear down structure if Select needs to be rebuilt                                                            // 2725
      var lastID = $select.data('select-id');                                                                         // 2726
      if (lastID) {                                                                                                   // 2727
        $select.parent().find('span.caret').remove();                                                                 // 2728
        $select.parent().find('input').remove();                                                                      // 2729
                                                                                                                      // 2730
        $select.unwrap();                                                                                             // 2731
        $('ul#select-options-'+lastID).remove();                                                                      // 2732
      }                                                                                                               // 2733
                                                                                                                      // 2734
      // If destroying the select, remove the selelct-id and reset it to it's uninitialized state.                    // 2735
      if(callback === 'destroy') {                                                                                    // 2736
          $select.data('select-id', null).removeClass('initialized');                                                 // 2737
          return;                                                                                                     // 2738
      }                                                                                                               // 2739
                                                                                                                      // 2740
      var uniqueID = Materialize.guid();                                                                              // 2741
      $select.data('select-id', uniqueID);                                                                            // 2742
      var wrapper = $('<div class="select-wrapper"></div>');                                                          // 2743
      wrapper.addClass($select.attr('class'));                                                                        // 2744
      var options = $('<ul id="select-options-' + uniqueID+'" class="dropdown-content select-dropdown"></ul>');       // 2745
      var selectOptions = $select.children('option');                                                                 // 2746
                                                                                                                      // 2747
      var label;                                                                                                      // 2748
      if ($select.find('option:selected') !== undefined) {                                                            // 2749
        label = $select.find('option:selected');                                                                      // 2750
      }                                                                                                               // 2751
      else {                                                                                                          // 2752
        label = options.first();                                                                                      // 2753
      }                                                                                                               // 2754
                                                                                                                      // 2755
                                                                                                                      // 2756
      // Create Dropdown structure                                                                                    // 2757
      selectOptions.each(function () {                                                                                // 2758
        // Add disabled attr if disabled                                                                              // 2759
        options.append($('<li class="' + (($(this).is(':disabled')) ? 'disabled' : '') + '"><span>' + $(this).html() + '</span></li>'));
      });                                                                                                             // 2761
                                                                                                                      // 2762
                                                                                                                      // 2763
      options.find('li').each(function (i) {                                                                          // 2764
        var $curr_select = $select;                                                                                   // 2765
        $(this).click(function () {                                                                                   // 2766
          // Check if option element is disabled                                                                      // 2767
          if (!$(this).hasClass('disabled')) {                                                                        // 2768
            $curr_select.find('option').eq(i).prop('selected', true);                                                 // 2769
            // Trigger onchange() event                                                                               // 2770
            $curr_select.trigger('change');                                                                           // 2771
            $curr_select.siblings('input.select-dropdown').val($(this).text());                                       // 2772
            if (typeof callback !== 'undefined') callback();                                                          // 2773
          }                                                                                                           // 2774
        });                                                                                                           // 2775
                                                                                                                      // 2776
      });                                                                                                             // 2777
                                                                                                                      // 2778
      // Wrap Elements                                                                                                // 2779
      $select.wrap(wrapper);                                                                                          // 2780
      // Add Select Display Element                                                                                   // 2781
      var dropdownIcon = $('<span class="caret">&#9660;</span>');                                                     // 2782
      if ( $select.is(':disabled') )                                                                                  // 2783
        dropdownIcon.addClass('disabled');                                                                            // 2784
                                                                                                                      // 2785
      var $newSelect = $('<input type="text" class="select-dropdown" readonly="true" ' + (($select.is(':disabled')) ? 'disabled' : '') + ' data-activates="select-options-' + uniqueID +'" value="'+ label.html() +'"/>');
      $select.before($newSelect);                                                                                     // 2787
      $newSelect.before(dropdownIcon);                                                                                // 2788
                                                                                                                      // 2789
      $('body').append(options);                                                                                      // 2790
      // Check if section element is disabled                                                                         // 2791
      if (!$select.is(':disabled')) {                                                                                 // 2792
        $newSelect.dropdown({"hover": false});                                                                        // 2793
      }                                                                                                               // 2794
                                                                                                                      // 2795
      // Copy tabindex                                                                                                // 2796
      if ($select.attr('tabindex')) {                                                                                 // 2797
        $($newSelect[0]).attr('tabindex', $select.attr('tabindex'));                                                  // 2798
      }                                                                                                               // 2799
                                                                                                                      // 2800
      $select.addClass('initialized');                                                                                // 2801
                                                                                                                      // 2802
      $newSelect.on('focus', function(){                                                                              // 2803
        $(this).trigger('open');                                                                                      // 2804
        label = $(this).val();                                                                                        // 2805
        selectedOption = options.find('li').filter(function() {                                                       // 2806
          return $(this).text().toLowerCase() === label.toLowerCase();                                                // 2807
        })[0];                                                                                                        // 2808
        activateOption(options, selectedOption);                                                                      // 2809
      });                                                                                                             // 2810
                                                                                                                      // 2811
      $newSelect.on('blur', function(){                                                                               // 2812
        $(this).trigger('close');                                                                                     // 2813
      });                                                                                                             // 2814
                                                                                                                      // 2815
      // Make option as selected and scroll to selected position                                                      // 2816
      activateOption = function(collection, newOption) {                                                              // 2817
        collection.find('li.active').removeClass('active');                                                           // 2818
        $(newOption).addClass('active');                                                                              // 2819
        collection.scrollTo(newOption);                                                                               // 2820
      };                                                                                                              // 2821
                                                                                                                      // 2822
      // Allow user to search by typing                                                                               // 2823
      // this array is cleared after 1 second                                                                         // 2824
      filterQuery = [];                                                                                               // 2825
                                                                                                                      // 2826
      onKeyDown = function(event){                                                                                    // 2827
        // TAB - switch to another input                                                                              // 2828
        if(event.which == 9){                                                                                         // 2829
          $newSelect.trigger('close');                                                                                // 2830
          return;                                                                                                     // 2831
        }                                                                                                             // 2832
                                                                                                                      // 2833
        // ARROW DOWN WHEN SELECT IS CLOSED - open select options                                                     // 2834
        if(event.which == 40 && !options.is(":visible")){                                                             // 2835
          $newSelect.trigger('open');                                                                                 // 2836
          return;                                                                                                     // 2837
        }                                                                                                             // 2838
                                                                                                                      // 2839
        // ENTER WHEN SELECT IS CLOSED - submit form                                                                  // 2840
        if(event.which == 13 && !options.is(":visible")){                                                             // 2841
          return;                                                                                                     // 2842
        }                                                                                                             // 2843
                                                                                                                      // 2844
        event.preventDefault();                                                                                       // 2845
                                                                                                                      // 2846
        // CASE WHEN USER TYPE LETTERS                                                                                // 2847
        letter = String.fromCharCode(event.which).toLowerCase();                                                      // 2848
        var nonLetters = [9,13,27,38,40];                                                                             // 2849
        if (letter && (nonLetters.indexOf(event.which) === -1)){                                                      // 2850
          filterQuery.push(letter);                                                                                   // 2851
                                                                                                                      // 2852
          string = filterQuery.join("");                                                                              // 2853
                                                                                                                      // 2854
          newOption = options.find('li').filter(function() {                                                          // 2855
            return $(this).text().toLowerCase().indexOf(string) === 0;                                                // 2856
          })[0];                                                                                                      // 2857
                                                                                                                      // 2858
          if(newOption){                                                                                              // 2859
            activateOption(options, newOption);                                                                       // 2860
          }                                                                                                           // 2861
        }                                                                                                             // 2862
                                                                                                                      // 2863
        // ENTER - select option and close when select options are opened                                             // 2864
        if(event.which == 13){                                                                                        // 2865
          activeOption = options.find('li.active:not(.disabled)')[0];                                                 // 2866
          if(activeOption){                                                                                           // 2867
            $(activeOption).trigger('click');                                                                         // 2868
            $newSelect.trigger('close');                                                                              // 2869
          }                                                                                                           // 2870
        }                                                                                                             // 2871
                                                                                                                      // 2872
        // ARROW DOWN - move to next not disabled option                                                              // 2873
        if(event.which == 40){                                                                                        // 2874
          newOption = options.find('li.active').next('li:not(.disabled)')[0];                                         // 2875
          if(newOption){                                                                                              // 2876
            activateOption(options, newOption);                                                                       // 2877
          }                                                                                                           // 2878
        }                                                                                                             // 2879
                                                                                                                      // 2880
        // ESC - close options                                                                                        // 2881
        if(event.which == 27){                                                                                        // 2882
          $newSelect.trigger('close');                                                                                // 2883
        }                                                                                                             // 2884
                                                                                                                      // 2885
        // ARROW UP - move to previous not disabled option                                                            // 2886
        if(event.which == 38){                                                                                        // 2887
          newOption = options.find('li.active').prev('li:not(.disabled)')[0];                                         // 2888
          if(newOption){                                                                                              // 2889
            activateOption(options, newOption);                                                                       // 2890
          }                                                                                                           // 2891
        }                                                                                                             // 2892
                                                                                                                      // 2893
        // Automaticaly clean filter query so user can search again by starting letters                               // 2894
        setTimeout(function(){ filterQuery = []; }, 1000);                                                            // 2895
      };                                                                                                              // 2896
                                                                                                                      // 2897
      $newSelect.on('keydown', onKeyDown);                                                                            // 2898
    });                                                                                                               // 2899
  };                                                                                                                  // 2900
                                                                                                                      // 2901
}( jQuery ));                                                                                                         // 2902
;(function ($) {                                                                                                      // 2903
                                                                                                                      // 2904
  var methods = {                                                                                                     // 2905
                                                                                                                      // 2906
    init : function(options) {                                                                                        // 2907
      var defaults = {                                                                                                // 2908
        indicators: true,                                                                                             // 2909
        height: 400,                                                                                                  // 2910
        transition: 500,                                                                                              // 2911
        interval: 6000                                                                                                // 2912
      };                                                                                                              // 2913
      options = $.extend(defaults, options);                                                                          // 2914
                                                                                                                      // 2915
      return this.each(function() {                                                                                   // 2916
                                                                                                                      // 2917
        // For each slider, we want to keep track of                                                                  // 2918
        // which slide is active and its associated content                                                           // 2919
        var $this = $(this);                                                                                          // 2920
        var $slider = $this.find('ul.slides').first();                                                                // 2921
        var $slides = $slider.find('li');                                                                             // 2922
        var $active_index = $slider.find('.active').index();                                                          // 2923
        var $active;                                                                                                  // 2924
        if ($active_index != -1) { $active = $slides.eq($active_index); }                                             // 2925
                                                                                                                      // 2926
        // Transitions the caption depending on alignment                                                             // 2927
        function captionTransition(caption, duration) {                                                               // 2928
          if (caption.hasClass("center-align")) {                                                                     // 2929
            caption.velocity({opacity: 0, translateY: -100}, {duration: duration, queue: false});                     // 2930
          }                                                                                                           // 2931
          else if (caption.hasClass("right-align")) {                                                                 // 2932
            caption.velocity({opacity: 0, translateX: 100}, {duration: duration, queue: false});                      // 2933
          }                                                                                                           // 2934
          else if (caption.hasClass("left-align")) {                                                                  // 2935
            caption.velocity({opacity: 0, translateX: -100}, {duration: duration, queue: false});                     // 2936
          }                                                                                                           // 2937
        }                                                                                                             // 2938
                                                                                                                      // 2939
        // This function will transition the slide to any index of the next slide                                     // 2940
        function moveToSlide(index) {                                                                                 // 2941
          if (index >= $slides.length) index = 0;                                                                     // 2942
          else if (index < 0) index = $slides.length -1;                                                              // 2943
                                                                                                                      // 2944
          $active_index = $slider.find('.active').index();                                                            // 2945
                                                                                                                      // 2946
          // Only do if index changes                                                                                 // 2947
          if ($active_index != index) {                                                                               // 2948
            $active = $slides.eq($active_index);                                                                      // 2949
            $caption = $active.find('.caption');                                                                      // 2950
                                                                                                                      // 2951
            $active.removeClass('active');                                                                            // 2952
            $active.velocity({opacity: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad',        // 2953
                              complete: function() {                                                                  // 2954
                                $slides.not('.active').velocity({opacity: 0, translateX: 0, translateY: 0}, {duration: 0, queue: false});
                              } });                                                                                   // 2956
            captionTransition($caption, options.transition);                                                          // 2957
                                                                                                                      // 2958
                                                                                                                      // 2959
            // Update indicators                                                                                      // 2960
            if (options.indicators) {                                                                                 // 2961
              $indicators.eq($active_index).removeClass('active');                                                    // 2962
            }                                                                                                         // 2963
                                                                                                                      // 2964
            $slides.eq(index).velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
            $slides.eq(index).find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, delay: options.transition, queue: false, easing: 'easeOutQuad'});
            $slides.eq(index).addClass('active');                                                                     // 2967
                                                                                                                      // 2968
                                                                                                                      // 2969
            // Update indicators                                                                                      // 2970
            if (options.indicators) {                                                                                 // 2971
              $indicators.eq(index).addClass('active');                                                               // 2972
            }                                                                                                         // 2973
          }                                                                                                           // 2974
        }                                                                                                             // 2975
                                                                                                                      // 2976
        // Set height of slider                                                                                       // 2977
        // If fullscreen, do nothing                                                                                  // 2978
        if (!$this.hasClass('fullscreen')) {                                                                          // 2979
          if (options.indicators) {                                                                                   // 2980
            // Add height if indicators are present                                                                   // 2981
            $this.height(options.height + 40);                                                                        // 2982
          }                                                                                                           // 2983
          else {                                                                                                      // 2984
            $this.height(options.height);                                                                             // 2985
          }                                                                                                           // 2986
          $slider.height(options.height);                                                                             // 2987
        }                                                                                                             // 2988
                                                                                                                      // 2989
                                                                                                                      // 2990
        // Set initial positions of captions                                                                          // 2991
        $slides.find('.caption').each(function () {                                                                   // 2992
          captionTransition($(this), 0);                                                                              // 2993
        });                                                                                                           // 2994
                                                                                                                      // 2995
        // Move img src into background-image                                                                         // 2996
        $slides.find('img').each(function () {                                                                        // 2997
          $(this).css('background-image', 'url(' + $(this).attr('src') + ')' );                                       // 2998
          $(this).attr('src', 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');  // 2999
        });                                                                                                           // 3000
                                                                                                                      // 3001
        // dynamically add indicators                                                                                 // 3002
        if (options.indicators) {                                                                                     // 3003
          var $indicators = $('<ul class="indicators"></ul>');                                                        // 3004
          $slides.each(function( index ) {                                                                            // 3005
            var $indicator = $('<li class="indicator-item"></li>');                                                   // 3006
                                                                                                                      // 3007
            // Handle clicks on indicators                                                                            // 3008
            $indicator.click(function () {                                                                            // 3009
              var $parent = $slider.parent();                                                                         // 3010
              var curr_index = $parent.find($(this)).index();                                                         // 3011
              moveToSlide(curr_index);                                                                                // 3012
                                                                                                                      // 3013
              // reset interval                                                                                       // 3014
              clearInterval($interval);                                                                               // 3015
              $interval = setInterval(                                                                                // 3016
                function(){                                                                                           // 3017
                  $active_index = $slider.find('.active').index();                                                    // 3018
                  if ($slides.length == $active_index + 1) $active_index = 0; // loop to start                        // 3019
                  else $active_index += 1;                                                                            // 3020
                                                                                                                      // 3021
                  moveToSlide($active_index);                                                                         // 3022
                                                                                                                      // 3023
                }, options.transition + options.interval                                                              // 3024
              );                                                                                                      // 3025
            });                                                                                                       // 3026
            $indicators.append($indicator);                                                                           // 3027
          });                                                                                                         // 3028
          $this.append($indicators);                                                                                  // 3029
          $indicators = $this.find('ul.indicators').find('li.indicator-item');                                        // 3030
        }                                                                                                             // 3031
                                                                                                                      // 3032
        if ($active) {                                                                                                // 3033
          $active.show();                                                                                             // 3034
        }                                                                                                             // 3035
        else {                                                                                                        // 3036
          $slides.first().addClass('active').velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
                                                                                                                      // 3038
          $active_index = 0;                                                                                          // 3039
          $active = $slides.eq($active_index);                                                                        // 3040
                                                                                                                      // 3041
          // Update indicators                                                                                        // 3042
          if (options.indicators) {                                                                                   // 3043
            $indicators.eq($active_index).addClass('active');                                                         // 3044
          }                                                                                                           // 3045
        }                                                                                                             // 3046
                                                                                                                      // 3047
        // Adjust height to current slide                                                                             // 3048
        $active.find('img').each(function() {                                                                         // 3049
          $active.find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
        });                                                                                                           // 3051
                                                                                                                      // 3052
        // auto scroll                                                                                                // 3053
        $interval = setInterval(                                                                                      // 3054
          function(){                                                                                                 // 3055
            $active_index = $slider.find('.active').index();                                                          // 3056
            moveToSlide($active_index + 1);                                                                           // 3057
                                                                                                                      // 3058
          }, options.transition + options.interval                                                                    // 3059
        );                                                                                                            // 3060
                                                                                                                      // 3061
                                                                                                                      // 3062
        // HammerJS, Swipe navigation                                                                                 // 3063
                                                                                                                      // 3064
        // Touch Event                                                                                                // 3065
        var panning = false;                                                                                          // 3066
        var swipeLeft = false;                                                                                        // 3067
        var swipeRight = false;                                                                                       // 3068
                                                                                                                      // 3069
        $this.hammer({                                                                                                // 3070
            prevent_default: false                                                                                    // 3071
        }).bind('pan', function(e) {                                                                                  // 3072
          if (e.gesture.pointerType === "touch") {                                                                    // 3073
                                                                                                                      // 3074
            // reset interval                                                                                         // 3075
            clearInterval($interval);                                                                                 // 3076
                                                                                                                      // 3077
            var direction = e.gesture.direction;                                                                      // 3078
            var x = e.gesture.deltaX;                                                                                 // 3079
            var velocityX = e.gesture.velocityX;                                                                      // 3080
                                                                                                                      // 3081
            $curr_slide = $slider.find('.active');                                                                    // 3082
            $curr_slide.velocity({ translateX: x                                                                      // 3083
                }, {duration: 50, queue: false, easing: 'easeOutQuad'});                                              // 3084
                                                                                                                      // 3085
            // Swipe Left                                                                                             // 3086
            if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.65)) {                             // 3087
              swipeRight = true;                                                                                      // 3088
            }                                                                                                         // 3089
            // Swipe Right                                                                                            // 3090
            else if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.65)) {                    // 3091
              swipeLeft = true;                                                                                       // 3092
            }                                                                                                         // 3093
                                                                                                                      // 3094
            // Make Slide Behind active slide visible                                                                 // 3095
            var next_slide;                                                                                           // 3096
            if (swipeLeft) {                                                                                          // 3097
              next_slide = $curr_slide.next();                                                                        // 3098
              if (next_slide.length === 0) {                                                                          // 3099
                next_slide = $slides.first();                                                                         // 3100
              }                                                                                                       // 3101
              next_slide.velocity({ opacity: 1                                                                        // 3102
                  }, {duration: 300, queue: false, easing: 'easeOutQuad'});                                           // 3103
            }                                                                                                         // 3104
            if (swipeRight) {                                                                                         // 3105
              next_slide = $curr_slide.prev();                                                                        // 3106
              if (next_slide.length === 0) {                                                                          // 3107
                next_slide = $slides.last();                                                                          // 3108
              }                                                                                                       // 3109
              next_slide.velocity({ opacity: 1                                                                        // 3110
                  }, {duration: 300, queue: false, easing: 'easeOutQuad'});                                           // 3111
            }                                                                                                         // 3112
                                                                                                                      // 3113
                                                                                                                      // 3114
          }                                                                                                           // 3115
                                                                                                                      // 3116
        }).bind('panend', function(e) {                                                                               // 3117
          if (e.gesture.pointerType === "touch") {                                                                    // 3118
                                                                                                                      // 3119
            $curr_slide = $slider.find('.active');                                                                    // 3120
            panning = false;                                                                                          // 3121
            curr_index = $slider.find('.active').index();                                                             // 3122
                                                                                                                      // 3123
            if (!swipeRight && !swipeLeft) {                                                                          // 3124
              // Return to original spot                                                                              // 3125
              $curr_slide.velocity({ translateX: 0                                                                    // 3126
                  }, {duration: 300, queue: false, easing: 'easeOutQuad'});                                           // 3127
            }                                                                                                         // 3128
            else if (swipeLeft) {                                                                                     // 3129
              moveToSlide(curr_index + 1);                                                                            // 3130
              $curr_slide.velocity({translateX: -1 * $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
                                    complete: function() {                                                            // 3132
                                      $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
                                    } });                                                                             // 3134
            }                                                                                                         // 3135
            else if (swipeRight) {                                                                                    // 3136
              moveToSlide(curr_index - 1);                                                                            // 3137
              $curr_slide.velocity({translateX: $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
                                    complete: function() {                                                            // 3139
                                      $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
                                    } });                                                                             // 3141
            }                                                                                                         // 3142
            swipeLeft = false;                                                                                        // 3143
            swipeRight = false;                                                                                       // 3144
                                                                                                                      // 3145
            // Restart interval                                                                                       // 3146
            clearInterval($interval);                                                                                 // 3147
            $interval = setInterval(                                                                                  // 3148
              function(){                                                                                             // 3149
                $active_index = $slider.find('.active').index();                                                      // 3150
                if ($slides.length == $active_index + 1) $active_index = 0; // loop to start                          // 3151
                else $active_index += 1;                                                                              // 3152
                                                                                                                      // 3153
                moveToSlide($active_index);                                                                           // 3154
                                                                                                                      // 3155
              }, options.transition + options.interval                                                                // 3156
            );                                                                                                        // 3157
          }                                                                                                           // 3158
        });                                                                                                           // 3159
                                                                                                                      // 3160
        $this.on('sliderPause', function() {                                                                          // 3161
          clearInterval($interval);                                                                                   // 3162
        });                                                                                                           // 3163
                                                                                                                      // 3164
        $this.on('sliderStart', function() {                                                                          // 3165
          clearInterval($interval);                                                                                   // 3166
          $interval = setInterval(                                                                                    // 3167
            function(){                                                                                               // 3168
              $active_index = $slider.find('.active').index();                                                        // 3169
              if ($slides.length == $active_index + 1) $active_index = 0; // loop to start                            // 3170
              else $active_index += 1;                                                                                // 3171
                                                                                                                      // 3172
              moveToSlide($active_index);                                                                             // 3173
                                                                                                                      // 3174
            }, options.transition + options.interval                                                                  // 3175
          );                                                                                                          // 3176
        });                                                                                                           // 3177
                                                                                                                      // 3178
      });                                                                                                             // 3179
                                                                                                                      // 3180
                                                                                                                      // 3181
                                                                                                                      // 3182
    },                                                                                                                // 3183
    pause : function() {                                                                                              // 3184
      $(this).trigger('sliderPause');                                                                                 // 3185
    },                                                                                                                // 3186
    start : function() {                                                                                              // 3187
      $(this).trigger('sliderStart');                                                                                 // 3188
    }                                                                                                                 // 3189
  };                                                                                                                  // 3190
                                                                                                                      // 3191
                                                                                                                      // 3192
    $.fn.slider = function(methodOrOptions) {                                                                         // 3193
      if ( methods[methodOrOptions] ) {                                                                               // 3194
        return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));                   // 3195
      } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {                                        // 3196
        // Default to "init"                                                                                          // 3197
        return methods.init.apply( this, arguments );                                                                 // 3198
      } else {                                                                                                        // 3199
        $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );                                // 3200
      }                                                                                                               // 3201
    }; // Plugin end                                                                                                  // 3202
}( jQuery ));;(function ($) {                                                                                         // 3203
  $(document).ready(function() {                                                                                      // 3204
                                                                                                                      // 3205
    $(document).on('click.card', '.card', function (e) {                                                              // 3206
      if ($(this).find('.card-reveal').length) {                                                                      // 3207
        if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {       // 3208
          // Make Reveal animate down and display none                                                                // 3209
          $(this).find('.card-reveal').velocity(                                                                      // 3210
            {translateY: 0}, {                                                                                        // 3211
              duration: 225,                                                                                          // 3212
              queue: false,                                                                                           // 3213
              easing: 'easeInOutQuad',                                                                                // 3214
              complete: function() { $(this).css({ display: 'none'}); }                                               // 3215
            }                                                                                                         // 3216
          );                                                                                                          // 3217
        }                                                                                                             // 3218
        else if ($(e.target).is($('.card .activator')) ||                                                             // 3219
                 $(e.target).is($('.card .activator i')) ) {                                                          // 3220
          $(this).find('.card-reveal').css({ display: 'block'}).velocity("stop", false).velocity({translateY: '-100%'}, {duration: 300, queue: false, easing: 'easeInOutQuad'});
        }                                                                                                             // 3222
      }                                                                                                               // 3223
                                                                                                                      // 3224
                                                                                                                      // 3225
    });                                                                                                               // 3226
                                                                                                                      // 3227
  });                                                                                                                 // 3228
}( jQuery ));;(function ($) {                                                                                         // 3229
  $(document).ready(function() {                                                                                      // 3230
                                                                                                                      // 3231
    $.fn.pushpin = function (options) {                                                                               // 3232
                                                                                                                      // 3233
      var defaults = {                                                                                                // 3234
        top: 0,                                                                                                       // 3235
        bottom: Infinity,                                                                                             // 3236
        offset: 0                                                                                                     // 3237
      }                                                                                                               // 3238
      options = $.extend(defaults, options);                                                                          // 3239
                                                                                                                      // 3240
      $index = 0;                                                                                                     // 3241
      return this.each(function() {                                                                                   // 3242
        var $uniqueId = Materialize.guid(),                                                                           // 3243
            $this = $(this),                                                                                          // 3244
            $original_offset = $(this).offset().top;                                                                  // 3245
                                                                                                                      // 3246
        function removePinClasses(object) {                                                                           // 3247
          object.removeClass('pin-top');                                                                              // 3248
          object.removeClass('pinned');                                                                               // 3249
          object.removeClass('pin-bottom');                                                                           // 3250
        }                                                                                                             // 3251
                                                                                                                      // 3252
        function updateElements(objects, scrolled) {                                                                  // 3253
          objects.each(function () {                                                                                  // 3254
            // Add position fixed (because its between top and bottom)                                                // 3255
            if (options.top <= scrolled && options.bottom >= scrolled && !$(this).hasClass('pinned')) {               // 3256
              removePinClasses($(this));                                                                              // 3257
              $(this).css('top', options.offset);                                                                     // 3258
              $(this).addClass('pinned');                                                                             // 3259
            }                                                                                                         // 3260
                                                                                                                      // 3261
            // Add pin-top (when scrolled position is above top)                                                      // 3262
            if (scrolled < options.top && !$(this).hasClass('pin-top')) {                                             // 3263
              removePinClasses($(this));                                                                              // 3264
              $(this).css('top', 0);                                                                                  // 3265
              $(this).addClass('pin-top');                                                                            // 3266
            }                                                                                                         // 3267
                                                                                                                      // 3268
            // Add pin-bottom (when scrolled position is below bottom)                                                // 3269
            if (scrolled > options.bottom && !$(this).hasClass('pin-bottom')) {                                       // 3270
              removePinClasses($(this));                                                                              // 3271
              $(this).addClass('pin-bottom');                                                                         // 3272
              $(this).css('top', options.bottom - $original_offset);                                                  // 3273
            }                                                                                                         // 3274
          });                                                                                                         // 3275
        }                                                                                                             // 3276
                                                                                                                      // 3277
        updateElements($this, $(window).scrollTop());                                                                 // 3278
        $(window).on('scroll.' + $uniqueId, function () {                                                             // 3279
          var $scrolled = $(window).scrollTop() + options.offset;                                                     // 3280
          updateElements($this, $scrolled);                                                                           // 3281
        });                                                                                                           // 3282
                                                                                                                      // 3283
      });                                                                                                             // 3284
                                                                                                                      // 3285
    };                                                                                                                // 3286
                                                                                                                      // 3287
                                                                                                                      // 3288
  });                                                                                                                 // 3289
}( jQuery ));;(function ($) {                                                                                         // 3290
  $(document).ready(function() {                                                                                      // 3291
                                                                                                                      // 3292
    // jQuery reverse                                                                                                 // 3293
    $.fn.reverse = [].reverse;                                                                                        // 3294
                                                                                                                      // 3295
    $(document).on('mouseenter.fixedActionBtn', '.fixed-action-btn', function(e) {                                    // 3296
      var $this = $(this);                                                                                            // 3297
      openFABMenu($this);                                                                                             // 3298
                                                                                                                      // 3299
    });                                                                                                               // 3300
                                                                                                                      // 3301
    $(document).on('mouseleave.fixedActionBtn', '.fixed-action-btn', function(e) {                                    // 3302
      var $this = $(this);                                                                                            // 3303
      closeFABMenu($this);                                                                                            // 3304
    });                                                                                                               // 3305
                                                                                                                      // 3306
  });                                                                                                                 // 3307
                                                                                                                      // 3308
  $.fn.extend({                                                                                                       // 3309
    openFAB: function() {                                                                                             // 3310
      var $this = $(this);                                                                                            // 3311
      openFABMenu($this);                                                                                             // 3312
    },                                                                                                                // 3313
    closeFAB: function() {                                                                                            // 3314
      closeFABMenu($this);                                                                                            // 3315
    }                                                                                                                 // 3316
  });                                                                                                                 // 3317
                                                                                                                      // 3318
                                                                                                                      // 3319
  var openFABMenu = function (btn) {                                                                                  // 3320
    $this = btn;                                                                                                      // 3321
    if ($this.hasClass('active') === false) {                                                                         // 3322
      $this.addClass('active');                                                                                       // 3323
      $this.find('ul .btn-floating').velocity(                                                                        // 3324
        { scaleY: ".4", scaleX: ".4", translateY: "40px"},                                                            // 3325
        { duration: 0 });                                                                                             // 3326
                                                                                                                      // 3327
      var time = 0;                                                                                                   // 3328
      $this.find('ul .btn-floating').reverse().each(function () {                                                     // 3329
        $(this).velocity(                                                                                             // 3330
          { opacity: "1", scaleX: "1", scaleY: "1", translateY: "0"},                                                 // 3331
          { duration: 80, delay: time });                                                                             // 3332
        time += 40;                                                                                                   // 3333
      });                                                                                                             // 3334
    }                                                                                                                 // 3335
  };                                                                                                                  // 3336
                                                                                                                      // 3337
  var closeFABMenu = function (btn) {                                                                                 // 3338
    $this = btn;                                                                                                      // 3339
    $this.removeClass('active');                                                                                      // 3340
    var time = 0;                                                                                                     // 3341
    $this.find('ul .btn-floating').velocity("stop", true);                                                            // 3342
    $this.find('ul .btn-floating').velocity(                                                                          // 3343
      { opacity: "0", scaleX: ".4", scaleY: ".4", translateY: "40px"},                                                // 3344
      { duration: 80 }                                                                                                // 3345
    );                                                                                                                // 3346
  };                                                                                                                  // 3347
                                                                                                                      // 3348
                                                                                                                      // 3349
}( jQuery ));                                                                                                         // 3350
;(function ($) {                                                                                                      // 3351
  // Image transition function                                                                                        // 3352
  Materialize.fadeInImage =  function(selector){                                                                      // 3353
    var element = $(selector);                                                                                        // 3354
    element.css({opacity: 0});                                                                                        // 3355
    $(element).velocity({opacity: 1}, {                                                                               // 3356
        duration: 650,                                                                                                // 3357
        queue: false,                                                                                                 // 3358
        easing: 'easeOutSine'                                                                                         // 3359
      });                                                                                                             // 3360
    $(element).velocity({opacity: 1}, {                                                                               // 3361
          duration: 1300,                                                                                             // 3362
          queue: false,                                                                                               // 3363
          easing: 'swing',                                                                                            // 3364
          step: function(now, fx) {                                                                                   // 3365
              fx.start = 100;                                                                                         // 3366
              var grayscale_setting = now/100;                                                                        // 3367
              var brightness_setting = 150 - (100 - now)/1.75;                                                        // 3368
                                                                                                                      // 3369
              if (brightness_setting < 100) {                                                                         // 3370
                brightness_setting = 100;                                                                             // 3371
              }                                                                                                       // 3372
              if (now >= 0) {                                                                                         // 3373
                $(this).css({                                                                                         // 3374
                    "-webkit-filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)",     // 3375
                    "filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)"              // 3376
                });                                                                                                   // 3377
              }                                                                                                       // 3378
          }                                                                                                           // 3379
      });                                                                                                             // 3380
  };                                                                                                                  // 3381
                                                                                                                      // 3382
  // Horizontal staggered list                                                                                        // 3383
  Materialize.showStaggeredList = function(selector) {                                                                // 3384
    var time = 0;                                                                                                     // 3385
    $(selector).find('li').velocity(                                                                                  // 3386
        { translateX: "-100px"},                                                                                      // 3387
        { duration: 0 });                                                                                             // 3388
                                                                                                                      // 3389
    $(selector).find('li').each(function() {                                                                          // 3390
      $(this).velocity(                                                                                               // 3391
        { opacity: "1", translateX: "0"},                                                                             // 3392
        { duration: 800, delay: time, easing: [60, 10] });                                                            // 3393
      time += 120;                                                                                                    // 3394
    });                                                                                                               // 3395
  };                                                                                                                  // 3396
                                                                                                                      // 3397
                                                                                                                      // 3398
  $(document).ready(function() {                                                                                      // 3399
    // Hardcoded .staggered-list scrollFire                                                                           // 3400
    // var staggeredListOptions = [];                                                                                 // 3401
    // $('ul.staggered-list').each(function (i) {                                                                     // 3402
                                                                                                                      // 3403
    //   var label = 'scrollFire-' + i;                                                                               // 3404
    //   $(this).addClass(label);                                                                                     // 3405
    //   staggeredListOptions.push(                                                                                   // 3406
    //     {selector: 'ul.staggered-list.' + label,                                                                   // 3407
    //      offset: 200,                                                                                              // 3408
    //      callback: 'showStaggeredList("ul.staggered-list.' + label + '")'});                                       // 3409
    // });                                                                                                            // 3410
    // scrollFire(staggeredListOptions);                                                                              // 3411
                                                                                                                      // 3412
    // HammerJS, Swipe navigation                                                                                     // 3413
                                                                                                                      // 3414
    // Touch Event                                                                                                    // 3415
    var swipeLeft = false;                                                                                            // 3416
    var swipeRight = false;                                                                                           // 3417
                                                                                                                      // 3418
                                                                                                                      // 3419
    // Dismissible Collections                                                                                        // 3420
    $('.dismissable').each(function() {                                                                               // 3421
      $(this).hammer({                                                                                                // 3422
        prevent_default: false                                                                                        // 3423
      }).bind('pan', function(e) {                                                                                    // 3424
        if (e.gesture.pointerType === "touch") {                                                                      // 3425
          var $this = $(this);                                                                                        // 3426
          var direction = e.gesture.direction;                                                                        // 3427
          var x = e.gesture.deltaX;                                                                                   // 3428
          var velocityX = e.gesture.velocityX;                                                                        // 3429
                                                                                                                      // 3430
          $this.velocity({ translateX: x                                                                              // 3431
              }, {duration: 50, queue: false, easing: 'easeOutQuad'});                                                // 3432
                                                                                                                      // 3433
          // Swipe Left                                                                                               // 3434
          if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.75)) {                               // 3435
            swipeLeft = true;                                                                                         // 3436
          }                                                                                                           // 3437
                                                                                                                      // 3438
          // Swipe Right                                                                                              // 3439
          if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.75)) {                           // 3440
            swipeRight = true;                                                                                        // 3441
          }                                                                                                           // 3442
        }                                                                                                             // 3443
      }).bind('panend', function(e) {                                                                                 // 3444
        // Reset if collection is moved back into original position                                                   // 3445
        if (Math.abs(e.gesture.deltaX) < ($(this).innerWidth() / 2)) {                                                // 3446
          swipeRight = false;                                                                                         // 3447
          swipeLeft = false;                                                                                          // 3448
        }                                                                                                             // 3449
                                                                                                                      // 3450
        if (e.gesture.pointerType === "touch") {                                                                      // 3451
          var $this = $(this);                                                                                        // 3452
          if (swipeLeft || swipeRight) {                                                                              // 3453
            var fullWidth;                                                                                            // 3454
            if (swipeLeft) { fullWidth = $this.innerWidth(); }                                                        // 3455
            else { fullWidth = -1 * $this.innerWidth(); }                                                             // 3456
                                                                                                                      // 3457
            $this.velocity({ translateX: fullWidth,                                                                   // 3458
              }, {duration: 100, queue: false, easing: 'easeOutQuad', complete:                                       // 3459
              function() {                                                                                            // 3460
                $this.css('border', 'none');                                                                          // 3461
                $this.velocity({ height: 0, padding: 0,                                                               // 3462
                  }, {duration: 200, queue: false, easing: 'easeOutQuad', complete:                                   // 3463
                    function() { $this.remove(); }                                                                    // 3464
                  });                                                                                                 // 3465
              }                                                                                                       // 3466
            });                                                                                                       // 3467
          }                                                                                                           // 3468
          else {                                                                                                      // 3469
            $this.velocity({ translateX: 0,                                                                           // 3470
              }, {duration: 100, queue: false, easing: 'easeOutQuad'});                                               // 3471
          }                                                                                                           // 3472
          swipeLeft = false;                                                                                          // 3473
          swipeRight = false;                                                                                         // 3474
        }                                                                                                             // 3475
      });                                                                                                             // 3476
                                                                                                                      // 3477
    });                                                                                                               // 3478
                                                                                                                      // 3479
                                                                                                                      // 3480
    // time = 0                                                                                                       // 3481
    // // Vertical Staggered list                                                                                     // 3482
    // $('ul.staggered-list.vertical li').velocity(                                                                   // 3483
    //     { translateY: "100px"},                                                                                    // 3484
    //     { duration: 0 });                                                                                          // 3485
                                                                                                                      // 3486
    // $('ul.staggered-list.vertical li').each(function() {                                                           // 3487
    //   $(this).velocity(                                                                                            // 3488
    //     { opacity: "1", translateY: "0"},                                                                          // 3489
    //     { duration: 800, delay: time, easing: [60, 25] });                                                         // 3490
    //   time += 120;                                                                                                 // 3491
    // });                                                                                                            // 3492
                                                                                                                      // 3493
    // // Fade in and Scale                                                                                           // 3494
    // $('.fade-in.scale').velocity(                                                                                  // 3495
    //     { scaleX: .4, scaleY: .4, translateX: -600},                                                               // 3496
    //     { duration: 0});                                                                                           // 3497
    // $('.fade-in').each(function() {                                                                                // 3498
    //   $(this).velocity(                                                                                            // 3499
    //     { opacity: "1", scaleX: 1, scaleY: 1, translateX: 0},                                                      // 3500
    //     { duration: 800, easing: [60, 10] });                                                                      // 3501
    // });                                                                                                            // 3502
  });                                                                                                                 // 3503
}( jQuery ));                                                                                                         // 3504
;(function($) {                                                                                                       // 3505
                                                                                                                      // 3506
  // Input: Array of JSON objects {selector, offset, callback}                                                        // 3507
                                                                                                                      // 3508
  Materialize.scrollFire = function(options) {                                                                        // 3509
                                                                                                                      // 3510
    var didScroll = false;                                                                                            // 3511
                                                                                                                      // 3512
    window.addEventListener("scroll", function() {                                                                    // 3513
      didScroll = true;                                                                                               // 3514
    });                                                                                                               // 3515
                                                                                                                      // 3516
    // Rate limit to 100ms                                                                                            // 3517
    setInterval(function() {                                                                                          // 3518
      if(didScroll) {                                                                                                 // 3519
          didScroll = false;                                                                                          // 3520
                                                                                                                      // 3521
          var windowScroll = window.pageYOffset + window.innerHeight;                                                 // 3522
                                                                                                                      // 3523
          for (var i = 0 ; i < options.length; i++) {                                                                 // 3524
            // Get options from each line                                                                             // 3525
            var value = options[i];                                                                                   // 3526
            var selector = value.selector,                                                                            // 3527
                offset = value.offset,                                                                                // 3528
                callback = value.callback;                                                                            // 3529
                                                                                                                      // 3530
            var currentElement = document.querySelector(selector);                                                    // 3531
            if ( currentElement !== null) {                                                                           // 3532
              var elementOffset = currentElement.getBoundingClientRect().top + document.body.scrollTop;               // 3533
                                                                                                                      // 3534
              if (windowScroll > (elementOffset + offset)) {                                                          // 3535
                if (value.done !== true) {                                                                            // 3536
                  var callbackFunc = new Function(callback);                                                          // 3537
                  callbackFunc();                                                                                     // 3538
                  value.done = true;                                                                                  // 3539
                }                                                                                                     // 3540
              }                                                                                                       // 3541
            }                                                                                                         // 3542
          }                                                                                                           // 3543
      }                                                                                                               // 3544
    }, 100);                                                                                                          // 3545
  };                                                                                                                  // 3546
                                                                                                                      // 3547
})(jQuery);;/*!                                                                                                       // 3548
 * pickadate.js v3.5.0, 2014/04/13                                                                                    // 3549
 * By Amsul, http://amsul.ca                                                                                          // 3550
 * Hosted on http://amsul.github.io/pickadate.js                                                                      // 3551
 * Licensed under MIT                                                                                                 // 3552
 */                                                                                                                   // 3553
                                                                                                                      // 3554
(function ( factory ) {                                                                                               // 3555
                                                                                                                      // 3556
    // AMD.                                                                                                           // 3557
    if ( typeof define == 'function' && define.amd )                                                                  // 3558
        define( 'picker', ['jquery'], factory )                                                                       // 3559
                                                                                                                      // 3560
    // Node.js/browserify.                                                                                            // 3561
    else if ( typeof exports == 'object' )                                                                            // 3562
        module.exports = factory( require('jquery') )                                                                 // 3563
                                                                                                                      // 3564
    // Browser globals.                                                                                               // 3565
    else this.Picker = factory( jQuery )                                                                              // 3566
                                                                                                                      // 3567
}(function( $ ) {                                                                                                     // 3568
                                                                                                                      // 3569
var $window = $( window )                                                                                             // 3570
var $document = $( document )                                                                                         // 3571
var $html = $( document.documentElement )                                                                             // 3572
                                                                                                                      // 3573
                                                                                                                      // 3574
/**                                                                                                                   // 3575
 * The picker constructor that creates a blank picker.                                                                // 3576
 */                                                                                                                   // 3577
function PickerConstructor( ELEMENT, NAME, COMPONENT, OPTIONS ) {                                                     // 3578
                                                                                                                      // 3579
    // If there’s no element, return the picker constructor.                                                          // 3580
    if ( !ELEMENT ) return PickerConstructor                                                                          // 3581
                                                                                                                      // 3582
                                                                                                                      // 3583
    var                                                                                                               // 3584
        IS_DEFAULT_THEME = false,                                                                                     // 3585
                                                                                                                      // 3586
                                                                                                                      // 3587
        // The state of the picker.                                                                                   // 3588
        STATE = {                                                                                                     // 3589
            id: ELEMENT.id || 'P' + Math.abs( ~~(Math.random() * new Date()) )                                        // 3590
        },                                                                                                            // 3591
                                                                                                                      // 3592
                                                                                                                      // 3593
        // Merge the defaults and options passed.                                                                     // 3594
        SETTINGS = COMPONENT ? $.extend( true, {}, COMPONENT.defaults, OPTIONS ) : OPTIONS || {},                     // 3595
                                                                                                                      // 3596
                                                                                                                      // 3597
        // Merge the default classes with the settings classes.                                                       // 3598
        CLASSES = $.extend( {}, PickerConstructor.klasses(), SETTINGS.klass ),                                        // 3599
                                                                                                                      // 3600
                                                                                                                      // 3601
        // The element node wrapper into a jQuery object.                                                             // 3602
        $ELEMENT = $( ELEMENT ),                                                                                      // 3603
                                                                                                                      // 3604
                                                                                                                      // 3605
        // Pseudo picker constructor.                                                                                 // 3606
        PickerInstance = function() {                                                                                 // 3607
            return this.start()                                                                                       // 3608
        },                                                                                                            // 3609
                                                                                                                      // 3610
                                                                                                                      // 3611
        // The picker prototype.                                                                                      // 3612
        P = PickerInstance.prototype = {                                                                              // 3613
                                                                                                                      // 3614
            constructor: PickerInstance,                                                                              // 3615
                                                                                                                      // 3616
            $node: $ELEMENT,                                                                                          // 3617
                                                                                                                      // 3618
                                                                                                                      // 3619
            /**                                                                                                       // 3620
             * Initialize everything                                                                                  // 3621
             */                                                                                                       // 3622
            start: function() {                                                                                       // 3623
                                                                                                                      // 3624
                // If it’s already started, do nothing.                                                               // 3625
                if ( STATE && STATE.start ) return P                                                                  // 3626
                                                                                                                      // 3627
                                                                                                                      // 3628
                // Update the picker states.                                                                          // 3629
                STATE.methods = {}                                                                                    // 3630
                STATE.start = true                                                                                    // 3631
                STATE.open = false                                                                                    // 3632
                STATE.type = ELEMENT.type                                                                             // 3633
                                                                                                                      // 3634
                                                                                                                      // 3635
                // Confirm focus state, convert into text input to remove UA stylings,                                // 3636
                // and set as readonly to prevent keyboard popup.                                                     // 3637
                ELEMENT.autofocus = ELEMENT == getActiveElement()                                                     // 3638
                ELEMENT.readOnly = !SETTINGS.editable                                                                 // 3639
                ELEMENT.id = ELEMENT.id || STATE.id                                                                   // 3640
                if ( ELEMENT.type != 'text' ) {                                                                       // 3641
                    ELEMENT.type = 'text'                                                                             // 3642
                }                                                                                                     // 3643
                                                                                                                      // 3644
                                                                                                                      // 3645
                // Create a new picker component with the settings.                                                   // 3646
                P.component = new COMPONENT(P, SETTINGS)                                                              // 3647
                                                                                                                      // 3648
                                                                                                                      // 3649
                // Create the picker root with a holder and then prepare it.                                          // 3650
                P.$root = $( PickerConstructor._.node('div', createWrappedComponent(), CLASSES.picker, 'id="' + ELEMENT.id + '_root" tabindex="0"') )
                prepareElementRoot()                                                                                  // 3652
                                                                                                                      // 3653
                                                                                                                      // 3654
                // If there’s a format for the hidden input element, create the element.                              // 3655
                if ( SETTINGS.formatSubmit ) {                                                                        // 3656
                    prepareElementHidden()                                                                            // 3657
                }                                                                                                     // 3658
                                                                                                                      // 3659
                                                                                                                      // 3660
                // Prepare the input element.                                                                         // 3661
                prepareElement()                                                                                      // 3662
                                                                                                                      // 3663
                                                                                                                      // 3664
                // Insert the root as specified in the settings.                                                      // 3665
                if ( SETTINGS.container ) $( SETTINGS.container ).append( P.$root )                                   // 3666
                else $ELEMENT.after( P.$root )                                                                        // 3667
                                                                                                                      // 3668
                                                                                                                      // 3669
                // Bind the default component and settings events.                                                    // 3670
                P.on({                                                                                                // 3671
                    start: P.component.onStart,                                                                       // 3672
                    render: P.component.onRender,                                                                     // 3673
                    stop: P.component.onStop,                                                                         // 3674
                    open: P.component.onOpen,                                                                         // 3675
                    close: P.component.onClose,                                                                       // 3676
                    set: P.component.onSet                                                                            // 3677
                }).on({                                                                                               // 3678
                    start: SETTINGS.onStart,                                                                          // 3679
                    render: SETTINGS.onRender,                                                                        // 3680
                    stop: SETTINGS.onStop,                                                                            // 3681
                    open: SETTINGS.onOpen,                                                                            // 3682
                    close: SETTINGS.onClose,                                                                          // 3683
                    set: SETTINGS.onSet                                                                               // 3684
                })                                                                                                    // 3685
                                                                                                                      // 3686
                                                                                                                      // 3687
                // Once we’re all set, check the theme in use.                                                        // 3688
                IS_DEFAULT_THEME = isUsingDefaultTheme( P.$root.children()[ 0 ] )                                     // 3689
                                                                                                                      // 3690
                                                                                                                      // 3691
                // If the element has autofocus, open the picker.                                                     // 3692
                if ( ELEMENT.autofocus ) {                                                                            // 3693
                    P.open()                                                                                          // 3694
                }                                                                                                     // 3695
                                                                                                                      // 3696
                                                                                                                      // 3697
                // Trigger queued the “start” and “render” events.                                                    // 3698
                return P.trigger( 'start' ).trigger( 'render' )                                                       // 3699
            }, //start                                                                                                // 3700
                                                                                                                      // 3701
                                                                                                                      // 3702
            /**                                                                                                       // 3703
             * Render a new picker                                                                                    // 3704
             */                                                                                                       // 3705
            render: function( entireComponent ) {                                                                     // 3706
                                                                                                                      // 3707
                // Insert a new component holder in the root or box.                                                  // 3708
                if ( entireComponent ) P.$root.html( createWrappedComponent() )                                       // 3709
                else P.$root.find( '.' + CLASSES.box ).html( P.component.nodes( STATE.open ) )                        // 3710
                                                                                                                      // 3711
                // Trigger the queued “render” events.                                                                // 3712
                return P.trigger( 'render' )                                                                          // 3713
            }, //render                                                                                               // 3714
                                                                                                                      // 3715
                                                                                                                      // 3716
            /**                                                                                                       // 3717
             * Destroy everything                                                                                     // 3718
             */                                                                                                       // 3719
            stop: function() {                                                                                        // 3720
                                                                                                                      // 3721
                // If it’s already stopped, do nothing.                                                               // 3722
                if ( !STATE.start ) return P                                                                          // 3723
                                                                                                                      // 3724
                // Then close the picker.                                                                             // 3725
                P.close()                                                                                             // 3726
                                                                                                                      // 3727
                // Remove the hidden field.                                                                           // 3728
                if ( P._hidden ) {                                                                                    // 3729
                    P._hidden.parentNode.removeChild( P._hidden )                                                     // 3730
                }                                                                                                     // 3731
                                                                                                                      // 3732
                // Remove the root.                                                                                   // 3733
                P.$root.remove()                                                                                      // 3734
                                                                                                                      // 3735
                // Remove the input class, remove the stored data, and unbind                                         // 3736
                // the events (after a tick for IE - see `P.close`).                                                  // 3737
                $ELEMENT.removeClass( CLASSES.input ).removeData( NAME )                                              // 3738
                setTimeout( function() {                                                                              // 3739
                    $ELEMENT.off( '.' + STATE.id )                                                                    // 3740
                }, 0)                                                                                                 // 3741
                                                                                                                      // 3742
                // Restore the element state                                                                          // 3743
                ELEMENT.type = STATE.type                                                                             // 3744
                ELEMENT.readOnly = false                                                                              // 3745
                                                                                                                      // 3746
                // Trigger the queued “stop” events.                                                                  // 3747
                P.trigger( 'stop' )                                                                                   // 3748
                                                                                                                      // 3749
                // Reset the picker states.                                                                           // 3750
                STATE.methods = {}                                                                                    // 3751
                STATE.start = false                                                                                   // 3752
                                                                                                                      // 3753
                return P                                                                                              // 3754
            }, //stop                                                                                                 // 3755
                                                                                                                      // 3756
                                                                                                                      // 3757
            /**                                                                                                       // 3758
             * Open up the picker                                                                                     // 3759
             */                                                                                                       // 3760
            open: function( dontGiveFocus ) {                                                                         // 3761
                                                                                                                      // 3762
                // If it’s already open, do nothing.                                                                  // 3763
                if ( STATE.open ) return P                                                                            // 3764
                                                                                                                      // 3765
                // Add the “active” class.                                                                            // 3766
                $ELEMENT.addClass( CLASSES.active )                                                                   // 3767
                aria( ELEMENT, 'expanded', true )                                                                     // 3768
                                                                                                                      // 3769
                // * A Firefox bug, when `html` has `overflow:hidden`, results in                                     // 3770
                //   killing transitions :(. So add the “opened” state on the next tick.                              // 3771
                //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289                                         // 3772
                setTimeout( function() {                                                                              // 3773
                                                                                                                      // 3774
                    // Add the “opened” class to the picker root.                                                     // 3775
                    P.$root.addClass( CLASSES.opened )                                                                // 3776
                    aria( P.$root[0], 'hidden', false )                                                               // 3777
                                                                                                                      // 3778
                }, 0 )                                                                                                // 3779
                                                                                                                      // 3780
                // If we have to give focus, bind the element and doc events.                                         // 3781
                if ( dontGiveFocus !== false ) {                                                                      // 3782
                                                                                                                      // 3783
                    // Set it as open.                                                                                // 3784
                    STATE.open = true                                                                                 // 3785
                                                                                                                      // 3786
                    // Prevent the page from scrolling.                                                               // 3787
                    if ( IS_DEFAULT_THEME ) {                                                                         // 3788
                        $html.                                                                                        // 3789
                            css( 'overflow', 'hidden' ).                                                              // 3790
                            css( 'padding-right', '+=' + getScrollbarWidth() )                                        // 3791
                    }                                                                                                 // 3792
                                                                                                                      // 3793
                    // Pass focus to the root element’s jQuery object.                                                // 3794
                    // * Workaround for iOS8 to bring the picker’s root into view.                                    // 3795
                    P.$root[0].focus()                                                                                // 3796
                                                                                                                      // 3797
                    // Bind the document events.                                                                      // 3798
                    $document.on( 'click.' + STATE.id + ' focusin.' + STATE.id, function( event ) {                   // 3799
                                                                                                                      // 3800
                        var target = event.target                                                                     // 3801
                                                                                                                      // 3802
                        // If the target of the event is not the element, close the picker picker.                    // 3803
                        // * Don’t worry about clicks or focusins on the root because those don’t bubble up.          // 3804
                        //   Also, for Firefox, a click on an `option` element bubbles up directly                    // 3805
                        //   to the doc. So make sure the target wasn't the doc.                                      // 3806
                        // * In Firefox stopPropagation() doesn’t prevent right-click events from bubbling,           // 3807
                        //   which causes the picker to unexpectedly close when right-clicking it. So make            // 3808
                        //   sure the event wasn’t a right-click.                                                     // 3809
                        if ( target != ELEMENT && target != document && event.which != 3 ) {                          // 3810
                                                                                                                      // 3811
                            // If the target was the holder that covers the screen,                                   // 3812
                            // keep the element focused to maintain tabindex.                                         // 3813
                            P.close( target === P.$root.children()[0] )                                               // 3814
                        }                                                                                             // 3815
                                                                                                                      // 3816
                    }).on( 'keydown.' + STATE.id, function( event ) {                                                 // 3817
                                                                                                                      // 3818
                        var                                                                                           // 3819
                            // Get the keycode.                                                                       // 3820
                            keycode = event.keyCode,                                                                  // 3821
                                                                                                                      // 3822
                            // Translate that to a selection change.                                                  // 3823
                            keycodeToMove = P.component.key[ keycode ],                                               // 3824
                                                                                                                      // 3825
                            // Grab the target.                                                                       // 3826
                            target = event.target                                                                     // 3827
                                                                                                                      // 3828
                                                                                                                      // 3829
                        // On escape, close the picker and give focus.                                                // 3830
                        if ( keycode == 27 ) {                                                                        // 3831
                            P.close( true )                                                                           // 3832
                        }                                                                                             // 3833
                                                                                                                      // 3834
                                                                                                                      // 3835
                        // Check if there is a key movement or “enter” keypress on the element.                       // 3836
                        else if ( target == P.$root[0] && ( keycodeToMove || keycode == 13 ) ) {                      // 3837
                                                                                                                      // 3838
                            // Prevent the default action to stop page movement.                                      // 3839
                            event.preventDefault()                                                                    // 3840
                                                                                                                      // 3841
                            // Trigger the key movement action.                                                       // 3842
                            if ( keycodeToMove ) {                                                                    // 3843
                                PickerConstructor._.trigger( P.component.key.go, P, [ PickerConstructor._.trigger( keycodeToMove ) ] )
                            }                                                                                         // 3845
                                                                                                                      // 3846
                            // On “enter”, if the highlighted item isn’t disabled, set the value and close.           // 3847
                            else if ( !P.$root.find( '.' + CLASSES.highlighted ).hasClass( CLASSES.disabled ) ) {     // 3848
                                P.set( 'select', P.component.item.highlight ).close()                                 // 3849
                            }                                                                                         // 3850
                        }                                                                                             // 3851
                                                                                                                      // 3852
                                                                                                                      // 3853
                        // If the target is within the root and “enter” is pressed,                                   // 3854
                        // prevent the default action and trigger a click on the target instead.                      // 3855
                        else if ( $.contains( P.$root[0], target ) && keycode == 13 ) {                               // 3856
                            event.preventDefault()                                                                    // 3857
                            target.click()                                                                            // 3858
                        }                                                                                             // 3859
                    })                                                                                                // 3860
                }                                                                                                     // 3861
                                                                                                                      // 3862
                // Trigger the queued “open” events.                                                                  // 3863
                return P.trigger( 'open' )                                                                            // 3864
            }, //open                                                                                                 // 3865
                                                                                                                      // 3866
                                                                                                                      // 3867
            /**                                                                                                       // 3868
             * Close the picker                                                                                       // 3869
             */                                                                                                       // 3870
            close: function( giveFocus ) {                                                                            // 3871
                                                                                                                      // 3872
                // If we need to give focus, do it before changing states.                                            // 3873
                if ( giveFocus ) {                                                                                    // 3874
                    // ....ah yes! It would’ve been incomplete without a crazy workaround for IE :|                   // 3875
                    // The focus is triggered *after* the close has completed - causing it                            // 3876
                    // to open again. So unbind and rebind the event at the next tick.                                // 3877
                    P.$root.off( 'focus.toOpen' )[0].focus()                                                          // 3878
                    setTimeout( function() {                                                                          // 3879
                        P.$root.on( 'focus.toOpen', handleFocusToOpenEvent )                                          // 3880
                    }, 0 )                                                                                            // 3881
                }                                                                                                     // 3882
                                                                                                                      // 3883
                // Remove the “active” class.                                                                         // 3884
                $ELEMENT.removeClass( CLASSES.active )                                                                // 3885
                aria( ELEMENT, 'expanded', false )                                                                    // 3886
                                                                                                                      // 3887
                // * A Firefox bug, when `html` has `overflow:hidden`, results in                                     // 3888
                //   killing transitions :(. So remove the “opened” state on the next tick.                           // 3889
                //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289                                         // 3890
                setTimeout( function() {                                                                              // 3891
                                                                                                                      // 3892
                    // Remove the “opened” and “focused” class from the picker root.                                  // 3893
                    P.$root.removeClass( CLASSES.opened + ' ' + CLASSES.focused )                                     // 3894
                    aria( P.$root[0], 'hidden', true )                                                                // 3895
                                                                                                                      // 3896
                }, 0 )                                                                                                // 3897
                                                                                                                      // 3898
                // If it’s already closed, do nothing more.                                                           // 3899
                if ( !STATE.open ) return P                                                                           // 3900
                                                                                                                      // 3901
                // Set it as closed.                                                                                  // 3902
                STATE.open = false                                                                                    // 3903
                                                                                                                      // 3904
                // Allow the page to scroll.                                                                          // 3905
                if ( IS_DEFAULT_THEME ) {                                                                             // 3906
                    $html.                                                                                            // 3907
                        css( 'overflow', '' ).                                                                        // 3908
                        css( 'padding-right', '-=' + getScrollbarWidth() )                                            // 3909
                }                                                                                                     // 3910
                                                                                                                      // 3911
                // Unbind the document events.                                                                        // 3912
                $document.off( '.' + STATE.id )                                                                       // 3913
                                                                                                                      // 3914
                // Trigger the queued “close” events.                                                                 // 3915
                return P.trigger( 'close' )                                                                           // 3916
            }, //close                                                                                                // 3917
                                                                                                                      // 3918
                                                                                                                      // 3919
            /**                                                                                                       // 3920
             * Clear the values                                                                                       // 3921
             */                                                                                                       // 3922
            clear: function( options ) {                                                                              // 3923
                return P.set( 'clear', null, options )                                                                // 3924
            }, //clear                                                                                                // 3925
                                                                                                                      // 3926
                                                                                                                      // 3927
            /**                                                                                                       // 3928
             * Set something                                                                                          // 3929
             */                                                                                                       // 3930
            set: function( thing, value, options ) {                                                                  // 3931
                                                                                                                      // 3932
                var thingItem, thingValue,                                                                            // 3933
                    thingIsObject = $.isPlainObject( thing ),                                                         // 3934
                    thingObject = thingIsObject ? thing : {}                                                          // 3935
                                                                                                                      // 3936
                // Make sure we have usable options.                                                                  // 3937
                options = thingIsObject && $.isPlainObject( value ) ? value : options || {}                           // 3938
                                                                                                                      // 3939
                if ( thing ) {                                                                                        // 3940
                                                                                                                      // 3941
                    // If the thing isn’t an object, make it one.                                                     // 3942
                    if ( !thingIsObject ) {                                                                           // 3943
                        thingObject[ thing ] = value                                                                  // 3944
                    }                                                                                                 // 3945
                                                                                                                      // 3946
                    // Go through the things of items to set.                                                         // 3947
                    for ( thingItem in thingObject ) {                                                                // 3948
                                                                                                                      // 3949
                        // Grab the value of the thing.                                                               // 3950
                        thingValue = thingObject[ thingItem ]                                                         // 3951
                                                                                                                      // 3952
                        // First, if the item exists and there’s a value, set it.                                     // 3953
                        if ( thingItem in P.component.item ) {                                                        // 3954
                            if ( thingValue === undefined ) thingValue = null                                         // 3955
                            P.component.set( thingItem, thingValue, options )                                         // 3956
                        }                                                                                             // 3957
                                                                                                                      // 3958
                        // Then, check to update the element value and broadcast a change.                            // 3959
                        if ( thingItem == 'select' || thingItem == 'clear' ) {                                        // 3960
                            $ELEMENT.                                                                                 // 3961
                                val( thingItem == 'clear' ? '' : P.get( thingItem, SETTINGS.format ) ).               // 3962
                                trigger( 'change' )                                                                   // 3963
                        }                                                                                             // 3964
                    }                                                                                                 // 3965
                                                                                                                      // 3966
                    // Render a new picker.                                                                           // 3967
                    P.render()                                                                                        // 3968
                }                                                                                                     // 3969
                                                                                                                      // 3970
                // When the method isn’t muted, trigger queued “set” events and pass the `thingObject`.               // 3971
                return options.muted ? P : P.trigger( 'set', thingObject )                                            // 3972
            }, //set                                                                                                  // 3973
                                                                                                                      // 3974
                                                                                                                      // 3975
            /**                                                                                                       // 3976
             * Get something                                                                                          // 3977
             */                                                                                                       // 3978
            get: function( thing, format ) {                                                                          // 3979
                                                                                                                      // 3980
                // Make sure there’s something to get.                                                                // 3981
                thing = thing || 'value'                                                                              // 3982
                                                                                                                      // 3983
                // If a picker state exists, return that.                                                             // 3984
                if ( STATE[ thing ] != null ) {                                                                       // 3985
                    return STATE[ thing ]                                                                             // 3986
                }                                                                                                     // 3987
                                                                                                                      // 3988
                // Return the submission value, if that.                                                              // 3989
                if ( thing == 'valueSubmit' ) {                                                                       // 3990
                    if ( P._hidden ) {                                                                                // 3991
                        return P._hidden.value                                                                        // 3992
                    }                                                                                                 // 3993
                    thing = 'value'                                                                                   // 3994
                }                                                                                                     // 3995
                                                                                                                      // 3996
                // Return the value, if that.                                                                         // 3997
                if ( thing == 'value' ) {                                                                             // 3998
                    return ELEMENT.value                                                                              // 3999
                }                                                                                                     // 4000
                                                                                                                      // 4001
                // Check if a component item exists, return that.                                                     // 4002
                if ( thing in P.component.item ) {                                                                    // 4003
                    if ( typeof format == 'string' ) {                                                                // 4004
                        var thingValue = P.component.get( thing )                                                     // 4005
                        return thingValue ?                                                                           // 4006
                            PickerConstructor._.trigger(                                                              // 4007
                                P.component.formats.toString,                                                         // 4008
                                P.component,                                                                          // 4009
                                [ format, thingValue ]                                                                // 4010
                            ) : ''                                                                                    // 4011
                    }                                                                                                 // 4012
                    return P.component.get( thing )                                                                   // 4013
                }                                                                                                     // 4014
            }, //get                                                                                                  // 4015
                                                                                                                      // 4016
                                                                                                                      // 4017
                                                                                                                      // 4018
            /**                                                                                                       // 4019
             * Bind events on the things.                                                                             // 4020
             */                                                                                                       // 4021
            on: function( thing, method, internal ) {                                                                 // 4022
                                                                                                                      // 4023
                var thingName, thingMethod,                                                                           // 4024
                    thingIsObject = $.isPlainObject( thing ),                                                         // 4025
                    thingObject = thingIsObject ? thing : {}                                                          // 4026
                                                                                                                      // 4027
                if ( thing ) {                                                                                        // 4028
                                                                                                                      // 4029
                    // If the thing isn’t an object, make it one.                                                     // 4030
                    if ( !thingIsObject ) {                                                                           // 4031
                        thingObject[ thing ] = method                                                                 // 4032
                    }                                                                                                 // 4033
                                                                                                                      // 4034
                    // Go through the things to bind to.                                                              // 4035
                    for ( thingName in thingObject ) {                                                                // 4036
                                                                                                                      // 4037
                        // Grab the method of the thing.                                                              // 4038
                        thingMethod = thingObject[ thingName ]                                                        // 4039
                                                                                                                      // 4040
                        // If it was an internal binding, prefix it.                                                  // 4041
                        if ( internal ) {                                                                             // 4042
                            thingName = '_' + thingName                                                               // 4043
                        }                                                                                             // 4044
                                                                                                                      // 4045
                        // Make sure the thing methods collection exists.                                             // 4046
                        STATE.methods[ thingName ] = STATE.methods[ thingName ] || []                                 // 4047
                                                                                                                      // 4048
                        // Add the method to the relative method collection.                                          // 4049
                        STATE.methods[ thingName ].push( thingMethod )                                                // 4050
                    }                                                                                                 // 4051
                }                                                                                                     // 4052
                                                                                                                      // 4053
                return P                                                                                              // 4054
            }, //on                                                                                                   // 4055
                                                                                                                      // 4056
                                                                                                                      // 4057
                                                                                                                      // 4058
            /**                                                                                                       // 4059
             * Unbind events on the things.                                                                           // 4060
             */                                                                                                       // 4061
            off: function() {                                                                                         // 4062
                var i, thingName,                                                                                     // 4063
                    names = arguments;                                                                                // 4064
                for ( i = 0, namesCount = names.length; i < namesCount; i += 1 ) {                                    // 4065
                    thingName = names[i]                                                                              // 4066
                    if ( thingName in STATE.methods ) {                                                               // 4067
                        delete STATE.methods[thingName]                                                               // 4068
                    }                                                                                                 // 4069
                }                                                                                                     // 4070
                return P                                                                                              // 4071
            },                                                                                                        // 4072
                                                                                                                      // 4073
                                                                                                                      // 4074
            /**                                                                                                       // 4075
             * Fire off method events.                                                                                // 4076
             */                                                                                                       // 4077
            trigger: function( name, data ) {                                                                         // 4078
                var _trigger = function( name ) {                                                                     // 4079
                    var methodList = STATE.methods[ name ]                                                            // 4080
                    if ( methodList ) {                                                                               // 4081
                        methodList.map( function( method ) {                                                          // 4082
                            PickerConstructor._.trigger( method, P, [ data ] )                                        // 4083
                        })                                                                                            // 4084
                    }                                                                                                 // 4085
                }                                                                                                     // 4086
                _trigger( '_' + name )                                                                                // 4087
                _trigger( name )                                                                                      // 4088
                return P                                                                                              // 4089
            } //trigger                                                                                               // 4090
        } //PickerInstance.prototype                                                                                  // 4091
                                                                                                                      // 4092
                                                                                                                      // 4093
    /**                                                                                                               // 4094
     * Wrap the picker holder components together.                                                                    // 4095
     */                                                                                                               // 4096
    function createWrappedComponent() {                                                                               // 4097
                                                                                                                      // 4098
        // Create a picker wrapper holder                                                                             // 4099
        return PickerConstructor._.node( 'div',                                                                       // 4100
                                                                                                                      // 4101
            // Create a picker wrapper node                                                                           // 4102
            PickerConstructor._.node( 'div',                                                                          // 4103
                                                                                                                      // 4104
                // Create a picker frame                                                                              // 4105
                PickerConstructor._.node( 'div',                                                                      // 4106
                                                                                                                      // 4107
                    // Create a picker box node                                                                       // 4108
                    PickerConstructor._.node( 'div',                                                                  // 4109
                                                                                                                      // 4110
                        // Create the components nodes.                                                               // 4111
                        P.component.nodes( STATE.open ),                                                              // 4112
                                                                                                                      // 4113
                        // The picker box class                                                                       // 4114
                        CLASSES.box                                                                                   // 4115
                    ),                                                                                                // 4116
                                                                                                                      // 4117
                    // Picker wrap class                                                                              // 4118
                    CLASSES.wrap                                                                                      // 4119
                ),                                                                                                    // 4120
                                                                                                                      // 4121
                // Picker frame class                                                                                 // 4122
                CLASSES.frame                                                                                         // 4123
            ),                                                                                                        // 4124
                                                                                                                      // 4125
            // Picker holder class                                                                                    // 4126
            CLASSES.holder                                                                                            // 4127
        ) //endreturn                                                                                                 // 4128
    } //createWrappedComponent                                                                                        // 4129
                                                                                                                      // 4130
                                                                                                                      // 4131
                                                                                                                      // 4132
    /**                                                                                                               // 4133
     * Prepare the input element with all bindings.                                                                   // 4134
     */                                                                                                               // 4135
    function prepareElement() {                                                                                       // 4136
                                                                                                                      // 4137
        $ELEMENT.                                                                                                     // 4138
                                                                                                                      // 4139
            // Store the picker data by component name.                                                               // 4140
            data(NAME, P).                                                                                            // 4141
                                                                                                                      // 4142
            // Add the “input” class name.                                                                            // 4143
            addClass(CLASSES.input).                                                                                  // 4144
                                                                                                                      // 4145
            // Remove the tabindex.                                                                                   // 4146
            attr('tabindex', -1).                                                                                     // 4147
                                                                                                                      // 4148
            // If there’s a `data-value`, update the value of the element.                                            // 4149
            val( $ELEMENT.data('value') ?                                                                             // 4150
                P.get('select', SETTINGS.format) :                                                                    // 4151
                ELEMENT.value                                                                                         // 4152
            )                                                                                                         // 4153
                                                                                                                      // 4154
                                                                                                                      // 4155
        // Only bind keydown events if the element isn’t editable.                                                    // 4156
        if ( !SETTINGS.editable ) {                                                                                   // 4157
                                                                                                                      // 4158
            $ELEMENT.                                                                                                 // 4159
                                                                                                                      // 4160
                // On focus/click, focus onto the root to open it up.                                                 // 4161
                on( 'focus.' + STATE.id + ' click.' + STATE.id, function( event ) {                                   // 4162
                    event.preventDefault()                                                                            // 4163
                    P.$root[0].focus()                                                                                // 4164
                }).                                                                                                   // 4165
                                                                                                                      // 4166
                // Handle keyboard event based on the picker being opened or not.                                     // 4167
                on( 'keydown.' + STATE.id, handleKeydownEvent )                                                       // 4168
        }                                                                                                             // 4169
                                                                                                                      // 4170
                                                                                                                      // 4171
        // Update the aria attributes.                                                                                // 4172
        aria(ELEMENT, {                                                                                               // 4173
            haspopup: true,                                                                                           // 4174
            expanded: false,                                                                                          // 4175
            readonly: false,                                                                                          // 4176
            owns: ELEMENT.id + '_root'                                                                                // 4177
        })                                                                                                            // 4178
    }                                                                                                                 // 4179
                                                                                                                      // 4180
                                                                                                                      // 4181
    /**                                                                                                               // 4182
     * Prepare the root picker element with all bindings.                                                             // 4183
     */                                                                                                               // 4184
    function prepareElementRoot() {                                                                                   // 4185
                                                                                                                      // 4186
        P.$root.                                                                                                      // 4187
                                                                                                                      // 4188
            on({                                                                                                      // 4189
                                                                                                                      // 4190
                // For iOS8.                                                                                          // 4191
                keydown: handleKeydownEvent,                                                                          // 4192
                                                                                                                      // 4193
                // When something within the root is focused, stop from bubbling                                      // 4194
                // to the doc and remove the “focused” state from the root.                                           // 4195
                focusin: function( event ) {                                                                          // 4196
                    P.$root.removeClass( CLASSES.focused )                                                            // 4197
                    event.stopPropagation()                                                                           // 4198
                },                                                                                                    // 4199
                                                                                                                      // 4200
                // When something within the root holder is clicked, stop it                                          // 4201
                // from bubbling to the doc.                                                                          // 4202
                'mousedown click': function( event ) {                                                                // 4203
                                                                                                                      // 4204
                    var target = event.target                                                                         // 4205
                                                                                                                      // 4206
                    // Make sure the target isn’t the root holder so it can bubble up.                                // 4207
                    if ( target != P.$root.children()[ 0 ] ) {                                                        // 4208
                                                                                                                      // 4209
                        event.stopPropagation()                                                                       // 4210
                                                                                                                      // 4211
                        // * For mousedown events, cancel the default action in order to                              // 4212
                        //   prevent cases where focus is shifted onto external elements                              // 4213
                        //   when using things like jQuery mobile or MagnificPopup (ref: #249 & #120).                // 4214
                        //   Also, for Firefox, don’t prevent action on the `option` element.                         // 4215
                        if ( event.type == 'mousedown' && !$( target ).is( 'input, select, textarea, button, option' )) {
                                                                                                                      // 4217
                            event.preventDefault()                                                                    // 4218
                                                                                                                      // 4219
                            // Re-focus onto the root so that users can click away                                    // 4220
                            // from elements focused within the picker.                                               // 4221
                            P.$root[0].focus()                                                                        // 4222
                        }                                                                                             // 4223
                    }                                                                                                 // 4224
                }                                                                                                     // 4225
            }).                                                                                                       // 4226
                                                                                                                      // 4227
            // Add/remove the “target” class on focus and blur.                                                       // 4228
            on({                                                                                                      // 4229
                focus: function() {                                                                                   // 4230
                    $ELEMENT.addClass( CLASSES.target )                                                               // 4231
                },                                                                                                    // 4232
                blur: function() {                                                                                    // 4233
                    $ELEMENT.removeClass( CLASSES.target )                                                            // 4234
                }                                                                                                     // 4235
            }).                                                                                                       // 4236
                                                                                                                      // 4237
            // Open the picker and adjust the root “focused” state                                                    // 4238
            on( 'focus.toOpen', handleFocusToOpenEvent ).                                                             // 4239
                                                                                                                      // 4240
            // If there’s a click on an actionable element, carry out the actions.                                    // 4241
            on( 'click', '[data-pick], [data-nav], [data-clear], [data-close]', function() {                          // 4242
                                                                                                                      // 4243
                var $target = $( this ),                                                                              // 4244
                    targetData = $target.data(),                                                                      // 4245
                    targetDisabled = $target.hasClass( CLASSES.navDisabled ) || $target.hasClass( CLASSES.disabled ),
                                                                                                                      // 4247
                    // * For IE, non-focusable elements can be active elements as well                                // 4248
                    //   (http://stackoverflow.com/a/2684561).                                                        // 4249
                    activeElement = getActiveElement()                                                                // 4250
                    activeElement = activeElement && ( activeElement.type || activeElement.href )                     // 4251
                                                                                                                      // 4252
                // If it’s disabled or nothing inside is actively focused, re-focus the element.                      // 4253
                if ( targetDisabled || activeElement && !$.contains( P.$root[0], activeElement ) ) {                  // 4254
                    P.$root[0].focus()                                                                                // 4255
                }                                                                                                     // 4256
                                                                                                                      // 4257
                // If something is superficially changed, update the `highlight` based on the `nav`.                  // 4258
                if ( !targetDisabled && targetData.nav ) {                                                            // 4259
                    P.set( 'highlight', P.component.item.highlight, { nav: targetData.nav } )                         // 4260
                }                                                                                                     // 4261
                                                                                                                      // 4262
                // If something is picked, set `select` then close with focus.                                        // 4263
                else if ( !targetDisabled && 'pick' in targetData ) {                                                 // 4264
                    P.set( 'select', targetData.pick )                                                                // 4265
                }                                                                                                     // 4266
                                                                                                                      // 4267
                // If a “clear” button is pressed, empty the values and close with focus.                             // 4268
                else if ( targetData.clear ) {                                                                        // 4269
                    P.clear().close( true )                                                                           // 4270
                }                                                                                                     // 4271
                                                                                                                      // 4272
                else if ( targetData.close ) {                                                                        // 4273
                    P.close( true )                                                                                   // 4274
                }                                                                                                     // 4275
                                                                                                                      // 4276
            }) //P.$root                                                                                              // 4277
                                                                                                                      // 4278
        aria( P.$root[0], 'hidden', true )                                                                            // 4279
    }                                                                                                                 // 4280
                                                                                                                      // 4281
                                                                                                                      // 4282
     /**                                                                                                              // 4283
      * Prepare the hidden input element along with all bindings.                                                     // 4284
      */                                                                                                              // 4285
    function prepareElementHidden() {                                                                                 // 4286
                                                                                                                      // 4287
        var name                                                                                                      // 4288
                                                                                                                      // 4289
        if ( SETTINGS.hiddenName === true ) {                                                                         // 4290
            name = ELEMENT.name                                                                                       // 4291
            ELEMENT.name = ''                                                                                         // 4292
        }                                                                                                             // 4293
        else {                                                                                                        // 4294
            name = [                                                                                                  // 4295
                typeof SETTINGS.hiddenPrefix == 'string' ? SETTINGS.hiddenPrefix : '',                                // 4296
                typeof SETTINGS.hiddenSuffix == 'string' ? SETTINGS.hiddenSuffix : '_submit'                          // 4297
            ]                                                                                                         // 4298
            name = name[0] + ELEMENT.name + name[1]                                                                   // 4299
        }                                                                                                             // 4300
                                                                                                                      // 4301
        P._hidden = $(                                                                                                // 4302
            '<input ' +                                                                                               // 4303
            'type=hidden ' +                                                                                          // 4304
                                                                                                                      // 4305
            // Create the name using the original input’s with a prefix and suffix.                                   // 4306
            'name="' + name + '"' +                                                                                   // 4307
                                                                                                                      // 4308
            // If the element has a value, set the hidden value as well.                                              // 4309
            (                                                                                                         // 4310
                $ELEMENT.data('value') || ELEMENT.value ?                                                             // 4311
                    ' value="' + P.get('select', SETTINGS.formatSubmit) + '"' :                                       // 4312
                    ''                                                                                                // 4313
            ) +                                                                                                       // 4314
            '>'                                                                                                       // 4315
        )[0]                                                                                                          // 4316
                                                                                                                      // 4317
        $ELEMENT.                                                                                                     // 4318
                                                                                                                      // 4319
            // If the value changes, update the hidden input with the correct format.                                 // 4320
            on('change.' + STATE.id, function() {                                                                     // 4321
                P._hidden.value = ELEMENT.value ?                                                                     // 4322
                    P.get('select', SETTINGS.formatSubmit) :                                                          // 4323
                    ''                                                                                                // 4324
            })                                                                                                        // 4325
                                                                                                                      // 4326
                                                                                                                      // 4327
        // Insert the hidden input as specified in the settings.                                                      // 4328
        if ( SETTINGS.container ) $( SETTINGS.container ).append( P._hidden )                                         // 4329
        else $ELEMENT.after( P._hidden )                                                                              // 4330
    }                                                                                                                 // 4331
                                                                                                                      // 4332
                                                                                                                      // 4333
    // For iOS8.                                                                                                      // 4334
    function handleKeydownEvent( event ) {                                                                            // 4335
                                                                                                                      // 4336
        var keycode = event.keyCode,                                                                                  // 4337
                                                                                                                      // 4338
            // Check if one of the delete keys was pressed.                                                           // 4339
            isKeycodeDelete = /^(8|46)$/.test(keycode)                                                                // 4340
                                                                                                                      // 4341
        // For some reason IE clears the input value on “escape”.                                                     // 4342
        if ( keycode == 27 ) {                                                                                        // 4343
            P.close()                                                                                                 // 4344
            return false                                                                                              // 4345
        }                                                                                                             // 4346
                                                                                                                      // 4347
        // Check if `space` or `delete` was pressed or the picker is closed with a key movement.                      // 4348
        if ( keycode == 32 || isKeycodeDelete || !STATE.open && P.component.key[keycode] ) {                          // 4349
                                                                                                                      // 4350
            // Prevent it from moving the page and bubbling to doc.                                                   // 4351
            event.preventDefault()                                                                                    // 4352
            event.stopPropagation()                                                                                   // 4353
                                                                                                                      // 4354
            // If `delete` was pressed, clear the values and close the picker.                                        // 4355
            // Otherwise open the picker.                                                                             // 4356
            if ( isKeycodeDelete ) { P.clear().close() }                                                              // 4357
            else { P.open() }                                                                                         // 4358
        }                                                                                                             // 4359
    }                                                                                                                 // 4360
                                                                                                                      // 4361
                                                                                                                      // 4362
    // Separated for IE                                                                                               // 4363
    function handleFocusToOpenEvent( event ) {                                                                        // 4364
                                                                                                                      // 4365
        // Stop the event from propagating to the doc.                                                                // 4366
        event.stopPropagation()                                                                                       // 4367
                                                                                                                      // 4368
        // If it’s a focus event, add the “focused” class to the root.                                                // 4369
        if ( event.type == 'focus' ) {                                                                                // 4370
            P.$root.addClass( CLASSES.focused )                                                                       // 4371
        }                                                                                                             // 4372
                                                                                                                      // 4373
        // And then finally open the picker.                                                                          // 4374
        P.open()                                                                                                      // 4375
    }                                                                                                                 // 4376
                                                                                                                      // 4377
                                                                                                                      // 4378
    // Return a new picker instance.                                                                                  // 4379
    return new PickerInstance()                                                                                       // 4380
} //PickerConstructor                                                                                                 // 4381
                                                                                                                      // 4382
                                                                                                                      // 4383
                                                                                                                      // 4384
/**                                                                                                                   // 4385
 * The default classes and prefix to use for the HTML classes.                                                        // 4386
 */                                                                                                                   // 4387
PickerConstructor.klasses = function( prefix ) {                                                                      // 4388
    prefix = prefix || 'picker'                                                                                       // 4389
    return {                                                                                                          // 4390
                                                                                                                      // 4391
        picker: prefix,                                                                                               // 4392
        opened: prefix + '--opened',                                                                                  // 4393
        focused: prefix + '--focused',                                                                                // 4394
                                                                                                                      // 4395
        input: prefix + '__input',                                                                                    // 4396
        active: prefix + '__input--active',                                                                           // 4397
        target: prefix + '__input--target',                                                                           // 4398
                                                                                                                      // 4399
        holder: prefix + '__holder',                                                                                  // 4400
                                                                                                                      // 4401
        frame: prefix + '__frame',                                                                                    // 4402
        wrap: prefix + '__wrap',                                                                                      // 4403
                                                                                                                      // 4404
        box: prefix + '__box'                                                                                         // 4405
    }                                                                                                                 // 4406
} //PickerConstructor.klasses                                                                                         // 4407
                                                                                                                      // 4408
                                                                                                                      // 4409
                                                                                                                      // 4410
/**                                                                                                                   // 4411
 * Check if the default theme is being used.                                                                          // 4412
 */                                                                                                                   // 4413
function isUsingDefaultTheme( element ) {                                                                             // 4414
                                                                                                                      // 4415
    var theme,                                                                                                        // 4416
        prop = 'position'                                                                                             // 4417
                                                                                                                      // 4418
    // For IE.                                                                                                        // 4419
    if ( element.currentStyle ) {                                                                                     // 4420
        theme = element.currentStyle[prop]                                                                            // 4421
    }                                                                                                                 // 4422
                                                                                                                      // 4423
    // For normal browsers.                                                                                           // 4424
    else if ( window.getComputedStyle ) {                                                                             // 4425
        theme = getComputedStyle( element )[prop]                                                                     // 4426
    }                                                                                                                 // 4427
                                                                                                                      // 4428
    return theme == 'fixed'                                                                                           // 4429
}                                                                                                                     // 4430
                                                                                                                      // 4431
                                                                                                                      // 4432
                                                                                                                      // 4433
/**                                                                                                                   // 4434
 * Get the width of the browser’s scrollbar.                                                                          // 4435
 * Taken from: https://github.com/VodkaBears/Remodal/blob/master/src/jquery.remodal.js                                // 4436
 */                                                                                                                   // 4437
function getScrollbarWidth() {                                                                                        // 4438
                                                                                                                      // 4439
    if ( $html.height() <= $window.height() ) {                                                                       // 4440
        return 0                                                                                                      // 4441
    }                                                                                                                 // 4442
                                                                                                                      // 4443
    var $outer = $( '<div style="visibility:hidden;width:100px" />' ).                                                // 4444
        appendTo( 'body' )                                                                                            // 4445
                                                                                                                      // 4446
    // Get the width without scrollbars.                                                                              // 4447
    var widthWithoutScroll = $outer[0].offsetWidth                                                                    // 4448
                                                                                                                      // 4449
    // Force adding scrollbars.                                                                                       // 4450
    $outer.css( 'overflow', 'scroll' )                                                                                // 4451
                                                                                                                      // 4452
    // Add the inner div.                                                                                             // 4453
    var $inner = $( '<div style="width:100%" />' ).appendTo( $outer )                                                 // 4454
                                                                                                                      // 4455
    // Get the width with scrollbars.                                                                                 // 4456
    var widthWithScroll = $inner[0].offsetWidth                                                                       // 4457
                                                                                                                      // 4458
    // Remove the divs.                                                                                               // 4459
    $outer.remove()                                                                                                   // 4460
                                                                                                                      // 4461
    // Return the difference between the widths.                                                                      // 4462
    return widthWithoutScroll - widthWithScroll                                                                       // 4463
}                                                                                                                     // 4464
                                                                                                                      // 4465
                                                                                                                      // 4466
                                                                                                                      // 4467
/**                                                                                                                   // 4468
 * PickerConstructor helper methods.                                                                                  // 4469
 */                                                                                                                   // 4470
PickerConstructor._ = {                                                                                               // 4471
                                                                                                                      // 4472
    /**                                                                                                               // 4473
     * Create a group of nodes. Expects:                                                                              // 4474
     * `                                                                                                              // 4475
        {                                                                                                             // 4476
            min:    {Integer},                                                                                        // 4477
            max:    {Integer},                                                                                        // 4478
            i:      {Integer},                                                                                        // 4479
            node:   {String},                                                                                         // 4480
            item:   {Function}                                                                                        // 4481
        }                                                                                                             // 4482
     * `                                                                                                              // 4483
     */                                                                                                               // 4484
    group: function( groupObject ) {                                                                                  // 4485
                                                                                                                      // 4486
        var                                                                                                           // 4487
            // Scope for the looped object                                                                            // 4488
            loopObjectScope,                                                                                          // 4489
                                                                                                                      // 4490
            // Create the nodes list                                                                                  // 4491
            nodesList = '',                                                                                           // 4492
                                                                                                                      // 4493
            // The counter starts from the `min`                                                                      // 4494
            counter = PickerConstructor._.trigger( groupObject.min, groupObject )                                     // 4495
                                                                                                                      // 4496
                                                                                                                      // 4497
        // Loop from the `min` to `max`, incrementing by `i`                                                          // 4498
        for ( ; counter <= PickerConstructor._.trigger( groupObject.max, groupObject, [ counter ] ); counter += groupObject.i ) {
                                                                                                                      // 4500
            // Trigger the `item` function within scope of the object                                                 // 4501
            loopObjectScope = PickerConstructor._.trigger( groupObject.item, groupObject, [ counter ] )               // 4502
                                                                                                                      // 4503
            // Splice the subgroup and create nodes out of the sub nodes                                              // 4504
            nodesList += PickerConstructor._.node(                                                                    // 4505
                groupObject.node,                                                                                     // 4506
                loopObjectScope[ 0 ],   // the node                                                                   // 4507
                loopObjectScope[ 1 ],   // the classes                                                                // 4508
                loopObjectScope[ 2 ]    // the attributes                                                             // 4509
            )                                                                                                         // 4510
        }                                                                                                             // 4511
                                                                                                                      // 4512
        // Return the list of nodes                                                                                   // 4513
        return nodesList                                                                                              // 4514
    }, //group                                                                                                        // 4515
                                                                                                                      // 4516
                                                                                                                      // 4517
    /**                                                                                                               // 4518
     * Create a dom node string                                                                                       // 4519
     */                                                                                                               // 4520
    node: function( wrapper, item, klass, attribute ) {                                                               // 4521
                                                                                                                      // 4522
        // If the item is false-y, just return an empty string                                                        // 4523
        if ( !item ) return ''                                                                                        // 4524
                                                                                                                      // 4525
        // If the item is an array, do a join                                                                         // 4526
        item = $.isArray( item ) ? item.join( '' ) : item                                                             // 4527
                                                                                                                      // 4528
        // Check for the class                                                                                        // 4529
        klass = klass ? ' class="' + klass + '"' : ''                                                                 // 4530
                                                                                                                      // 4531
        // Check for any attributes                                                                                   // 4532
        attribute = attribute ? ' ' + attribute : ''                                                                  // 4533
                                                                                                                      // 4534
        // Return the wrapped item                                                                                    // 4535
        return '<' + wrapper + klass + attribute + '>' + item + '</' + wrapper + '>'                                  // 4536
    }, //node                                                                                                         // 4537
                                                                                                                      // 4538
                                                                                                                      // 4539
    /**                                                                                                               // 4540
     * Lead numbers below 10 with a zero.                                                                             // 4541
     */                                                                                                               // 4542
    lead: function( number ) {                                                                                        // 4543
        return ( number < 10 ? '0': '' ) + number                                                                     // 4544
    },                                                                                                                // 4545
                                                                                                                      // 4546
                                                                                                                      // 4547
    /**                                                                                                               // 4548
     * Trigger a function otherwise return the value.                                                                 // 4549
     */                                                                                                               // 4550
    trigger: function( callback, scope, args ) {                                                                      // 4551
        return typeof callback == 'function' ? callback.apply( scope, args || [] ) : callback                         // 4552
    },                                                                                                                // 4553
                                                                                                                      // 4554
                                                                                                                      // 4555
    /**                                                                                                               // 4556
     * If the second character is a digit, length is 2 otherwise 1.                                                   // 4557
     */                                                                                                               // 4558
    digits: function( string ) {                                                                                      // 4559
        return ( /\d/ ).test( string[ 1 ] ) ? 2 : 1                                                                   // 4560
    },                                                                                                                // 4561
                                                                                                                      // 4562
                                                                                                                      // 4563
    /**                                                                                                               // 4564
     * Tell if something is a date object.                                                                            // 4565
     */                                                                                                               // 4566
    isDate: function( value ) {                                                                                       // 4567
        return {}.toString.call( value ).indexOf( 'Date' ) > -1 && this.isInteger( value.getDate() )                  // 4568
    },                                                                                                                // 4569
                                                                                                                      // 4570
                                                                                                                      // 4571
    /**                                                                                                               // 4572
     * Tell if something is an integer.                                                                               // 4573
     */                                                                                                               // 4574
    isInteger: function( value ) {                                                                                    // 4575
        return {}.toString.call( value ).indexOf( 'Number' ) > -1 && value % 1 === 0                                  // 4576
    },                                                                                                                // 4577
                                                                                                                      // 4578
                                                                                                                      // 4579
    /**                                                                                                               // 4580
     * Create ARIA attribute strings.                                                                                 // 4581
     */                                                                                                               // 4582
    ariaAttr: ariaAttr                                                                                                // 4583
} //PickerConstructor._                                                                                               // 4584
                                                                                                                      // 4585
                                                                                                                      // 4586
                                                                                                                      // 4587
/**                                                                                                                   // 4588
 * Extend the picker with a component and defaults.                                                                   // 4589
 */                                                                                                                   // 4590
PickerConstructor.extend = function( name, Component ) {                                                              // 4591
                                                                                                                      // 4592
    // Extend jQuery.                                                                                                 // 4593
    $.fn[ name ] = function( options, action ) {                                                                      // 4594
                                                                                                                      // 4595
        // Grab the component data.                                                                                   // 4596
        var componentData = this.data( name )                                                                         // 4597
                                                                                                                      // 4598
        // If the picker is requested, return the data object.                                                        // 4599
        if ( options == 'picker' ) {                                                                                  // 4600
            return componentData                                                                                      // 4601
        }                                                                                                             // 4602
                                                                                                                      // 4603
        // If the component data exists and `options` is a string, carry out the action.                              // 4604
        if ( componentData && typeof options == 'string' ) {                                                          // 4605
            return PickerConstructor._.trigger( componentData[ options ], componentData, [ action ] )                 // 4606
        }                                                                                                             // 4607
                                                                                                                      // 4608
        // Otherwise go through each matched element and if the component                                             // 4609
        // doesn’t exist, create a new picker using `this` element                                                    // 4610
        // and merging the defaults and options with a deep copy.                                                     // 4611
        return this.each( function() {                                                                                // 4612
            var $this = $( this )                                                                                     // 4613
            if ( !$this.data( name ) ) {                                                                              // 4614
                new PickerConstructor( this, name, Component, options )                                               // 4615
            }                                                                                                         // 4616
        })                                                                                                            // 4617
    }                                                                                                                 // 4618
                                                                                                                      // 4619
    // Set the defaults.                                                                                              // 4620
    $.fn[ name ].defaults = Component.defaults                                                                        // 4621
} //PickerConstructor.extend                                                                                          // 4622
                                                                                                                      // 4623
                                                                                                                      // 4624
                                                                                                                      // 4625
function aria(element, attribute, value) {                                                                            // 4626
    if ( $.isPlainObject(attribute) ) {                                                                               // 4627
        for ( var key in attribute ) {                                                                                // 4628
            ariaSet(element, key, attribute[key])                                                                     // 4629
        }                                                                                                             // 4630
    }                                                                                                                 // 4631
    else {                                                                                                            // 4632
        ariaSet(element, attribute, value)                                                                            // 4633
    }                                                                                                                 // 4634
}                                                                                                                     // 4635
function ariaSet(element, attribute, value) {                                                                         // 4636
    element.setAttribute(                                                                                             // 4637
        (attribute == 'role' ? '' : 'aria-') + attribute,                                                             // 4638
        value                                                                                                         // 4639
    )                                                                                                                 // 4640
}                                                                                                                     // 4641
function ariaAttr(attribute, data) {                                                                                  // 4642
    if ( !$.isPlainObject(attribute) ) {                                                                              // 4643
        attribute = { attribute: data }                                                                               // 4644
    }                                                                                                                 // 4645
    data = ''                                                                                                         // 4646
    for ( var key in attribute ) {                                                                                    // 4647
        var attr = (key == 'role' ? '' : 'aria-') + key,                                                              // 4648
            attrVal = attribute[key]                                                                                  // 4649
        data += attrVal == null ? '' : attr + '="' + attribute[key] + '"'                                             // 4650
    }                                                                                                                 // 4651
    return data                                                                                                       // 4652
}                                                                                                                     // 4653
                                                                                                                      // 4654
// IE8 bug throws an error for activeElements within iframes.                                                         // 4655
function getActiveElement() {                                                                                         // 4656
    try {                                                                                                             // 4657
        return document.activeElement                                                                                 // 4658
    } catch ( err ) { }                                                                                               // 4659
}                                                                                                                     // 4660
                                                                                                                      // 4661
                                                                                                                      // 4662
                                                                                                                      // 4663
// Expose the picker constructor.                                                                                     // 4664
return PickerConstructor                                                                                              // 4665
                                                                                                                      // 4666
                                                                                                                      // 4667
}));                                                                                                                  // 4668
                                                                                                                      // 4669
                                                                                                                      // 4670
;/*!                                                                                                                  // 4671
 * Date picker for pickadate.js v3.5.0                                                                                // 4672
 * http://amsul.github.io/pickadate.js/date.htm                                                                       // 4673
 */                                                                                                                   // 4674
                                                                                                                      // 4675
(function ( factory ) {                                                                                               // 4676
                                                                                                                      // 4677
    // AMD.                                                                                                           // 4678
    if ( typeof define == 'function' && define.amd )                                                                  // 4679
        define( ['picker', 'jquery'], factory )                                                                       // 4680
                                                                                                                      // 4681
    // Node.js/browserify.                                                                                            // 4682
    else if ( typeof exports == 'object' )                                                                            // 4683
        module.exports = factory( require('./picker.js'), require('jquery') )                                         // 4684
                                                                                                                      // 4685
    // Browser globals.                                                                                               // 4686
    else factory( Picker, jQuery )                                                                                    // 4687
                                                                                                                      // 4688
}(function( Picker, $ ) {                                                                                             // 4689
                                                                                                                      // 4690
                                                                                                                      // 4691
/**                                                                                                                   // 4692
 * Globals and constants                                                                                              // 4693
 */                                                                                                                   // 4694
var DAYS_IN_WEEK = 7,                                                                                                 // 4695
    WEEKS_IN_CALENDAR = 6,                                                                                            // 4696
    _ = Picker._                                                                                                      // 4697
                                                                                                                      // 4698
                                                                                                                      // 4699
                                                                                                                      // 4700
/**                                                                                                                   // 4701
 * The date picker constructor                                                                                        // 4702
 */                                                                                                                   // 4703
function DatePicker( picker, settings ) {                                                                             // 4704
                                                                                                                      // 4705
    var calendar = this,                                                                                              // 4706
        element = picker.$node[ 0 ],                                                                                  // 4707
        elementValue = element.value,                                                                                 // 4708
        elementDataValue = picker.$node.data( 'value' ),                                                              // 4709
        valueString = elementDataValue || elementValue,                                                               // 4710
        formatString = elementDataValue ? settings.formatSubmit : settings.format,                                    // 4711
        isRTL = function() {                                                                                          // 4712
                                                                                                                      // 4713
            return element.currentStyle ?                                                                             // 4714
                                                                                                                      // 4715
                // For IE.                                                                                            // 4716
                element.currentStyle.direction == 'rtl' :                                                             // 4717
                                                                                                                      // 4718
                // For normal browsers.                                                                               // 4719
                getComputedStyle( picker.$root[0] ).direction == 'rtl'                                                // 4720
        }                                                                                                             // 4721
                                                                                                                      // 4722
    calendar.settings = settings                                                                                      // 4723
    calendar.$node = picker.$node                                                                                     // 4724
                                                                                                                      // 4725
    // The queue of methods that will be used to build item objects.                                                  // 4726
    calendar.queue = {                                                                                                // 4727
        min: 'measure create',                                                                                        // 4728
        max: 'measure create',                                                                                        // 4729
        now: 'now create',                                                                                            // 4730
        select: 'parse create validate',                                                                              // 4731
        highlight: 'parse navigate create validate',                                                                  // 4732
        view: 'parse create validate viewset',                                                                        // 4733
        disable: 'deactivate',                                                                                        // 4734
        enable: 'activate'                                                                                            // 4735
    }                                                                                                                 // 4736
                                                                                                                      // 4737
    // The component's item object.                                                                                   // 4738
    calendar.item = {}                                                                                                // 4739
                                                                                                                      // 4740
    calendar.item.clear = null                                                                                        // 4741
    calendar.item.disable = ( settings.disable || [] ).slice( 0 )                                                     // 4742
    calendar.item.enable = -(function( collectionDisabled ) {                                                         // 4743
        return collectionDisabled[ 0 ] === true ? collectionDisabled.shift() : -1                                     // 4744
    })( calendar.item.disable )                                                                                       // 4745
                                                                                                                      // 4746
    calendar.                                                                                                         // 4747
        set( 'min', settings.min ).                                                                                   // 4748
        set( 'max', settings.max ).                                                                                   // 4749
        set( 'now' )                                                                                                  // 4750
                                                                                                                      // 4751
    // When there’s a value, set the `select`, which in turn                                                          // 4752
    // also sets the `highlight` and `view`.                                                                          // 4753
    if ( valueString ) {                                                                                              // 4754
        calendar.set( 'select', valueString, { format: formatString })                                                // 4755
    }                                                                                                                 // 4756
                                                                                                                      // 4757
    // If there’s no value, default to highlighting “today”.                                                          // 4758
    else {                                                                                                            // 4759
        calendar.                                                                                                     // 4760
            set( 'select', null ).                                                                                    // 4761
            set( 'highlight', calendar.item.now )                                                                     // 4762
    }                                                                                                                 // 4763
                                                                                                                      // 4764
                                                                                                                      // 4765
    // The keycode to movement mapping.                                                                               // 4766
    calendar.key = {                                                                                                  // 4767
        40: 7, // Down                                                                                                // 4768
        38: -7, // Up                                                                                                 // 4769
        39: function() { return isRTL() ? -1 : 1 }, // Right                                                          // 4770
        37: function() { return isRTL() ? 1 : -1 }, // Left                                                           // 4771
        go: function( timeChange ) {                                                                                  // 4772
            var highlightedObject = calendar.item.highlight,                                                          // 4773
                targetDate = new Date( highlightedObject.year, highlightedObject.month, highlightedObject.date + timeChange )
            calendar.set(                                                                                             // 4775
                'highlight',                                                                                          // 4776
                targetDate,                                                                                           // 4777
                { interval: timeChange }                                                                              // 4778
            )                                                                                                         // 4779
            this.render()                                                                                             // 4780
        }                                                                                                             // 4781
    }                                                                                                                 // 4782
                                                                                                                      // 4783
                                                                                                                      // 4784
    // Bind some picker events.                                                                                       // 4785
    picker.                                                                                                           // 4786
        on( 'render', function() {                                                                                    // 4787
            picker.$root.find( '.' + settings.klass.selectMonth ).on( 'change', function() {                          // 4788
                var value = this.value                                                                                // 4789
                if ( value ) {                                                                                        // 4790
                    picker.set( 'highlight', [ picker.get( 'view' ).year, value, picker.get( 'highlight' ).date ] )   // 4791
                    picker.$root.find( '.' + settings.klass.selectMonth ).trigger( 'focus' )                          // 4792
                }                                                                                                     // 4793
            })                                                                                                        // 4794
            picker.$root.find( '.' + settings.klass.selectYear ).on( 'change', function() {                           // 4795
                var value = this.value                                                                                // 4796
                if ( value ) {                                                                                        // 4797
                    picker.set( 'highlight', [ value, picker.get( 'view' ).month, picker.get( 'highlight' ).date ] )  // 4798
                    picker.$root.find( '.' + settings.klass.selectYear ).trigger( 'focus' )                           // 4799
                }                                                                                                     // 4800
            })                                                                                                        // 4801
        }, 1 ).                                                                                                       // 4802
        on( 'open', function() {                                                                                      // 4803
            var includeToday = ''                                                                                     // 4804
            if ( calendar.disabled( calendar.get('now') ) ) {                                                         // 4805
                includeToday = ':not(.' + settings.klass.buttonToday + ')'                                            // 4806
            }                                                                                                         // 4807
            picker.$root.find( 'button' + includeToday + ', select' ).attr( 'disabled', false )                       // 4808
        }, 1 ).                                                                                                       // 4809
        on( 'close', function() {                                                                                     // 4810
            picker.$root.find( 'button, select' ).attr( 'disabled', true )                                            // 4811
        }, 1 )                                                                                                        // 4812
                                                                                                                      // 4813
} //DatePicker                                                                                                        // 4814
                                                                                                                      // 4815
                                                                                                                      // 4816
/**                                                                                                                   // 4817
 * Set a datepicker item object.                                                                                      // 4818
 */                                                                                                                   // 4819
DatePicker.prototype.set = function( type, value, options ) {                                                         // 4820
                                                                                                                      // 4821
    var calendar = this,                                                                                              // 4822
        calendarItem = calendar.item                                                                                  // 4823
                                                                                                                      // 4824
    // If the value is `null` just set it immediately.                                                                // 4825
    if ( value === null ) {                                                                                           // 4826
        if ( type == 'clear' ) type = 'select'                                                                        // 4827
        calendarItem[ type ] = value                                                                                  // 4828
        return calendar                                                                                               // 4829
    }                                                                                                                 // 4830
                                                                                                                      // 4831
    // Otherwise go through the queue of methods, and invoke the functions.                                           // 4832
    // Update this as the time unit, and set the final value as this item.                                            // 4833
    // * In the case of `enable`, keep the queue but set `disable` instead.                                           // 4834
    //   And in the case of `flip`, keep the queue but set `enable` instead.                                          // 4835
    calendarItem[ ( type == 'enable' ? 'disable' : type == 'flip' ? 'enable' : type ) ] = calendar.queue[ type ].split( ' ' ).map( function( method ) {
        value = calendar[ method ]( type, value, options )                                                            // 4837
        return value                                                                                                  // 4838
    }).pop()                                                                                                          // 4839
                                                                                                                      // 4840
    // Check if we need to cascade through more updates.                                                              // 4841
    if ( type == 'select' ) {                                                                                         // 4842
        calendar.set( 'highlight', calendarItem.select, options )                                                     // 4843
    }                                                                                                                 // 4844
    else if ( type == 'highlight' ) {                                                                                 // 4845
        calendar.set( 'view', calendarItem.highlight, options )                                                       // 4846
    }                                                                                                                 // 4847
    else if ( type.match( /^(flip|min|max|disable|enable)$/ ) ) {                                                     // 4848
        if ( calendarItem.select && calendar.disabled( calendarItem.select ) ) {                                      // 4849
            calendar.set( 'select', calendarItem.select, options )                                                    // 4850
        }                                                                                                             // 4851
        if ( calendarItem.highlight && calendar.disabled( calendarItem.highlight ) ) {                                // 4852
            calendar.set( 'highlight', calendarItem.highlight, options )                                              // 4853
        }                                                                                                             // 4854
    }                                                                                                                 // 4855
                                                                                                                      // 4856
    return calendar                                                                                                   // 4857
} //DatePicker.prototype.set                                                                                          // 4858
                                                                                                                      // 4859
                                                                                                                      // 4860
/**                                                                                                                   // 4861
 * Get a datepicker item object.                                                                                      // 4862
 */                                                                                                                   // 4863
DatePicker.prototype.get = function( type ) {                                                                         // 4864
    return this.item[ type ]                                                                                          // 4865
} //DatePicker.prototype.get                                                                                          // 4866
                                                                                                                      // 4867
                                                                                                                      // 4868
/**                                                                                                                   // 4869
 * Create a picker date object.                                                                                       // 4870
 */                                                                                                                   // 4871
DatePicker.prototype.create = function( type, value, options ) {                                                      // 4872
                                                                                                                      // 4873
    var isInfiniteValue,                                                                                              // 4874
        calendar = this                                                                                               // 4875
                                                                                                                      // 4876
    // If there’s no value, use the type as the value.                                                                // 4877
    value = value === undefined ? type : value                                                                        // 4878
                                                                                                                      // 4879
                                                                                                                      // 4880
    // If it’s infinity, update the value.                                                                            // 4881
    if ( value == -Infinity || value == Infinity ) {                                                                  // 4882
        isInfiniteValue = value                                                                                       // 4883
    }                                                                                                                 // 4884
                                                                                                                      // 4885
    // If it’s an object, use the native date object.                                                                 // 4886
    else if ( $.isPlainObject( value ) && _.isInteger( value.pick ) ) {                                               // 4887
        value = value.obj                                                                                             // 4888
    }                                                                                                                 // 4889
                                                                                                                      // 4890
    // If it’s an array, convert it into a date and make sure                                                         // 4891
    // that it’s a valid date – otherwise default to today.                                                           // 4892
    else if ( $.isArray( value ) ) {                                                                                  // 4893
        value = new Date( value[ 0 ], value[ 1 ], value[ 2 ] )                                                        // 4894
        value = _.isDate( value ) ? value : calendar.create().obj                                                     // 4895
    }                                                                                                                 // 4896
                                                                                                                      // 4897
    // If it’s a number or date object, make a normalized date.                                                       // 4898
    else if ( _.isInteger( value ) || _.isDate( value ) ) {                                                           // 4899
        value = calendar.normalize( new Date( value ), options )                                                      // 4900
    }                                                                                                                 // 4901
                                                                                                                      // 4902
    // If it’s a literal true or any other case, set it to now.                                                       // 4903
    else /*if ( value === true )*/ {                                                                                  // 4904
        value = calendar.now( type, value, options )                                                                  // 4905
    }                                                                                                                 // 4906
                                                                                                                      // 4907
    // Return the compiled object.                                                                                    // 4908
    return {                                                                                                          // 4909
        year: isInfiniteValue || value.getFullYear(),                                                                 // 4910
        month: isInfiniteValue || value.getMonth(),                                                                   // 4911
        date: isInfiniteValue || value.getDate(),                                                                     // 4912
        day: isInfiniteValue || value.getDay(),                                                                       // 4913
        obj: isInfiniteValue || value,                                                                                // 4914
        pick: isInfiniteValue || value.getTime()                                                                      // 4915
    }                                                                                                                 // 4916
} //DatePicker.prototype.create                                                                                       // 4917
                                                                                                                      // 4918
                                                                                                                      // 4919
/**                                                                                                                   // 4920
 * Create a range limit object using an array, date object,                                                           // 4921
 * literal “true”, or integer relative to another time.                                                               // 4922
 */                                                                                                                   // 4923
DatePicker.prototype.createRange = function( from, to ) {                                                             // 4924
                                                                                                                      // 4925
    var calendar = this,                                                                                              // 4926
        createDate = function( date ) {                                                                               // 4927
            if ( date === true || $.isArray( date ) || _.isDate( date ) ) {                                           // 4928
                return calendar.create( date )                                                                        // 4929
            }                                                                                                         // 4930
            return date                                                                                               // 4931
        }                                                                                                             // 4932
                                                                                                                      // 4933
    // Create objects if possible.                                                                                    // 4934
    if ( !_.isInteger( from ) ) {                                                                                     // 4935
        from = createDate( from )                                                                                     // 4936
    }                                                                                                                 // 4937
    if ( !_.isInteger( to ) ) {                                                                                       // 4938
        to = createDate( to )                                                                                         // 4939
    }                                                                                                                 // 4940
                                                                                                                      // 4941
    // Create relative dates.                                                                                         // 4942
    if ( _.isInteger( from ) && $.isPlainObject( to ) ) {                                                             // 4943
        from = [ to.year, to.month, to.date + from ];                                                                 // 4944
    }                                                                                                                 // 4945
    else if ( _.isInteger( to ) && $.isPlainObject( from ) ) {                                                        // 4946
        to = [ from.year, from.month, from.date + to ];                                                               // 4947
    }                                                                                                                 // 4948
                                                                                                                      // 4949
    return {                                                                                                          // 4950
        from: createDate( from ),                                                                                     // 4951
        to: createDate( to )                                                                                          // 4952
    }                                                                                                                 // 4953
} //DatePicker.prototype.createRange                                                                                  // 4954
                                                                                                                      // 4955
                                                                                                                      // 4956
/**                                                                                                                   // 4957
 * Check if a date unit falls within a date range object.                                                             // 4958
 */                                                                                                                   // 4959
DatePicker.prototype.withinRange = function( range, dateUnit ) {                                                      // 4960
    range = this.createRange(range.from, range.to)                                                                    // 4961
    return dateUnit.pick >= range.from.pick && dateUnit.pick <= range.to.pick                                         // 4962
}                                                                                                                     // 4963
                                                                                                                      // 4964
                                                                                                                      // 4965
/**                                                                                                                   // 4966
 * Check if two date range objects overlap.                                                                           // 4967
 */                                                                                                                   // 4968
DatePicker.prototype.overlapRanges = function( one, two ) {                                                           // 4969
                                                                                                                      // 4970
    var calendar = this                                                                                               // 4971
                                                                                                                      // 4972
    // Convert the ranges into comparable dates.                                                                      // 4973
    one = calendar.createRange( one.from, one.to )                                                                    // 4974
    two = calendar.createRange( two.from, two.to )                                                                    // 4975
                                                                                                                      // 4976
    return calendar.withinRange( one, two.from ) || calendar.withinRange( one, two.to ) ||                            // 4977
        calendar.withinRange( two, one.from ) || calendar.withinRange( two, one.to )                                  // 4978
}                                                                                                                     // 4979
                                                                                                                      // 4980
                                                                                                                      // 4981
/**                                                                                                                   // 4982
 * Get the date today.                                                                                                // 4983
 */                                                                                                                   // 4984
DatePicker.prototype.now = function( type, value, options ) {                                                         // 4985
    value = new Date()                                                                                                // 4986
    if ( options && options.rel ) {                                                                                   // 4987
        value.setDate( value.getDate() + options.rel )                                                                // 4988
    }                                                                                                                 // 4989
    return this.normalize( value, options )                                                                           // 4990
}                                                                                                                     // 4991
                                                                                                                      // 4992
                                                                                                                      // 4993
/**                                                                                                                   // 4994
 * Navigate to next/prev month.                                                                                       // 4995
 */                                                                                                                   // 4996
DatePicker.prototype.navigate = function( type, value, options ) {                                                    // 4997
                                                                                                                      // 4998
    var targetDateObject,                                                                                             // 4999
        targetYear,                                                                                                   // 5000
        targetMonth,                                                                                                  // 5001
        targetDate,                                                                                                   // 5002
        isTargetArray = $.isArray( value ),                                                                           // 5003
        isTargetObject = $.isPlainObject( value ),                                                                    // 5004
        viewsetObject = this.item.view/*,                                                                             // 5005
        safety = 100*/                                                                                                // 5006
                                                                                                                      // 5007
                                                                                                                      // 5008
    if ( isTargetArray || isTargetObject ) {                                                                          // 5009
                                                                                                                      // 5010
        if ( isTargetObject ) {                                                                                       // 5011
            targetYear = value.year                                                                                   // 5012
            targetMonth = value.month                                                                                 // 5013
            targetDate = value.date                                                                                   // 5014
        }                                                                                                             // 5015
        else {                                                                                                        // 5016
            targetYear = +value[0]                                                                                    // 5017
            targetMonth = +value[1]                                                                                   // 5018
            targetDate = +value[2]                                                                                    // 5019
        }                                                                                                             // 5020
                                                                                                                      // 5021
        // If we’re navigating months but the view is in a different                                                  // 5022
        // month, navigate to the view’s year and month.                                                              // 5023
        if ( options && options.nav && viewsetObject && viewsetObject.month !== targetMonth ) {                       // 5024
            targetYear = viewsetObject.year                                                                           // 5025
            targetMonth = viewsetObject.month                                                                         // 5026
        }                                                                                                             // 5027
                                                                                                                      // 5028
        // Figure out the expected target year and month.                                                             // 5029
        targetDateObject = new Date( targetYear, targetMonth + ( options && options.nav ? options.nav : 0 ), 1 )      // 5030
        targetYear = targetDateObject.getFullYear()                                                                   // 5031
        targetMonth = targetDateObject.getMonth()                                                                     // 5032
                                                                                                                      // 5033
        // If the month we’re going to doesn’t have enough days,                                                      // 5034
        // keep decreasing the date until we reach the month’s last date.                                             // 5035
        while ( /*safety &&*/ new Date( targetYear, targetMonth, targetDate ).getMonth() !== targetMonth ) {          // 5036
            targetDate -= 1                                                                                           // 5037
            /*safety -= 1                                                                                             // 5038
            if ( !safety ) {                                                                                          // 5039
                throw 'Fell into an infinite loop while navigating to ' + new Date( targetYear, targetMonth, targetDate ) + '.'
            }*/                                                                                                       // 5041
        }                                                                                                             // 5042
                                                                                                                      // 5043
        value = [ targetYear, targetMonth, targetDate ]                                                               // 5044
    }                                                                                                                 // 5045
                                                                                                                      // 5046
    return value                                                                                                      // 5047
} //DatePicker.prototype.navigate                                                                                     // 5048
                                                                                                                      // 5049
                                                                                                                      // 5050
/**                                                                                                                   // 5051
 * Normalize a date by setting the hours to midnight.                                                                 // 5052
 */                                                                                                                   // 5053
DatePicker.prototype.normalize = function( value/*, options*/ ) {                                                     // 5054
    value.setHours( 0, 0, 0, 0 )                                                                                      // 5055
    return value                                                                                                      // 5056
}                                                                                                                     // 5057
                                                                                                                      // 5058
                                                                                                                      // 5059
/**                                                                                                                   // 5060
 * Measure the range of dates.                                                                                        // 5061
 */                                                                                                                   // 5062
DatePicker.prototype.measure = function( type, value/*, options*/ ) {                                                 // 5063
                                                                                                                      // 5064
    var calendar = this                                                                                               // 5065
                                                                                                                      // 5066
    // If it’s anything false-y, remove the limits.                                                                   // 5067
    if ( !value ) {                                                                                                   // 5068
        value = type == 'min' ? -Infinity : Infinity                                                                  // 5069
    }                                                                                                                 // 5070
                                                                                                                      // 5071
    // If it’s a string, parse it.                                                                                    // 5072
    else if ( typeof value == 'string' ) {                                                                            // 5073
        value = calendar.parse( type, value )                                                                         // 5074
    }                                                                                                                 // 5075
                                                                                                                      // 5076
    // If it's an integer, get a date relative to today.                                                              // 5077
    else if ( _.isInteger( value ) ) {                                                                                // 5078
        value = calendar.now( type, value, { rel: value } )                                                           // 5079
    }                                                                                                                 // 5080
                                                                                                                      // 5081
    return value                                                                                                      // 5082
} ///DatePicker.prototype.measure                                                                                     // 5083
                                                                                                                      // 5084
                                                                                                                      // 5085
/**                                                                                                                   // 5086
 * Create a viewset object based on navigation.                                                                       // 5087
 */                                                                                                                   // 5088
DatePicker.prototype.viewset = function( type, dateObject/*, options*/ ) {                                            // 5089
    return this.create([ dateObject.year, dateObject.month, 1 ])                                                      // 5090
}                                                                                                                     // 5091
                                                                                                                      // 5092
                                                                                                                      // 5093
/**                                                                                                                   // 5094
 * Validate a date as enabled and shift if needed.                                                                    // 5095
 */                                                                                                                   // 5096
DatePicker.prototype.validate = function( type, dateObject, options ) {                                               // 5097
                                                                                                                      // 5098
    var calendar = this,                                                                                              // 5099
                                                                                                                      // 5100
        // Keep a reference to the original date.                                                                     // 5101
        originalDateObject = dateObject,                                                                              // 5102
                                                                                                                      // 5103
        // Make sure we have an interval.                                                                             // 5104
        interval = options && options.interval ? options.interval : 1,                                                // 5105
                                                                                                                      // 5106
        // Check if the calendar enabled dates are inverted.                                                          // 5107
        isFlippedBase = calendar.item.enable === -1,                                                                  // 5108
                                                                                                                      // 5109
        // Check if we have any enabled dates after/before now.                                                       // 5110
        hasEnabledBeforeTarget, hasEnabledAfterTarget,                                                                // 5111
                                                                                                                      // 5112
        // The min & max limits.                                                                                      // 5113
        minLimitObject = calendar.item.min,                                                                           // 5114
        maxLimitObject = calendar.item.max,                                                                           // 5115
                                                                                                                      // 5116
        // Check if we’ve reached the limit during shifting.                                                          // 5117
        reachedMin, reachedMax,                                                                                       // 5118
                                                                                                                      // 5119
        // Check if the calendar is inverted and at least one weekday is enabled.                                     // 5120
        hasEnabledWeekdays = isFlippedBase && calendar.item.disable.filter( function( value ) {                       // 5121
                                                                                                                      // 5122
            // If there’s a date, check where it is relative to the target.                                           // 5123
            if ( $.isArray( value ) ) {                                                                               // 5124
                var dateTime = calendar.create( value ).pick                                                          // 5125
                if ( dateTime < dateObject.pick ) hasEnabledBeforeTarget = true                                       // 5126
                else if ( dateTime > dateObject.pick ) hasEnabledAfterTarget = true                                   // 5127
            }                                                                                                         // 5128
                                                                                                                      // 5129
            // Return only integers for enabled weekdays.                                                             // 5130
            return _.isInteger( value )                                                                               // 5131
        }).length/*,                                                                                                  // 5132
                                                                                                                      // 5133
        safety = 100*/                                                                                                // 5134
                                                                                                                      // 5135
                                                                                                                      // 5136
                                                                                                                      // 5137
    // Cases to validate for:                                                                                         // 5138
    // [1] Not inverted and date disabled.                                                                            // 5139
    // [2] Inverted and some dates enabled.                                                                           // 5140
    // [3] Not inverted and out of range.                                                                             // 5141
    //                                                                                                                // 5142
    // Cases to **not** validate for:                                                                                 // 5143
    // • Navigating months.                                                                                           // 5144
    // • Not inverted and date enabled.                                                                               // 5145
    // • Inverted and all dates disabled.                                                                             // 5146
    // • ..and anything else.                                                                                         // 5147
    if ( !options || !options.nav ) if (                                                                              // 5148
        /* 1 */ ( !isFlippedBase && calendar.disabled( dateObject ) ) ||                                              // 5149
        /* 2 */ ( isFlippedBase && calendar.disabled( dateObject ) && ( hasEnabledWeekdays || hasEnabledBeforeTarget || hasEnabledAfterTarget ) ) ||
        /* 3 */ ( !isFlippedBase && (dateObject.pick <= minLimitObject.pick || dateObject.pick >= maxLimitObject.pick) )
    ) {                                                                                                               // 5152
                                                                                                                      // 5153
                                                                                                                      // 5154
        // When inverted, flip the direction if there aren’t any enabled weekdays                                     // 5155
        // and there are no enabled dates in the direction of the interval.                                           // 5156
        if ( isFlippedBase && !hasEnabledWeekdays && ( ( !hasEnabledAfterTarget && interval > 0 ) || ( !hasEnabledBeforeTarget && interval < 0 ) ) ) {
            interval *= -1                                                                                            // 5158
        }                                                                                                             // 5159
                                                                                                                      // 5160
                                                                                                                      // 5161
        // Keep looping until we reach an enabled date.                                                               // 5162
        while ( /*safety &&*/ calendar.disabled( dateObject ) ) {                                                     // 5163
                                                                                                                      // 5164
            /*safety -= 1                                                                                             // 5165
            if ( !safety ) {                                                                                          // 5166
                throw 'Fell into an infinite loop while validating ' + dateObject.obj + '.'                           // 5167
            }*/                                                                                                       // 5168
                                                                                                                      // 5169
                                                                                                                      // 5170
            // If we’ve looped into the next/prev month with a large interval, return to the original date and flatten the interval.
            if ( Math.abs( interval ) > 1 && ( dateObject.month < originalDateObject.month || dateObject.month > originalDateObject.month ) ) {
                dateObject = originalDateObject                                                                       // 5173
                interval = interval > 0 ? 1 : -1                                                                      // 5174
            }                                                                                                         // 5175
                                                                                                                      // 5176
                                                                                                                      // 5177
            // If we’ve reached the min/max limit, reverse the direction, flatten the interval and set it to the limit.
            if ( dateObject.pick <= minLimitObject.pick ) {                                                           // 5179
                reachedMin = true                                                                                     // 5180
                interval = 1                                                                                          // 5181
                dateObject = calendar.create([                                                                        // 5182
                    minLimitObject.year,                                                                              // 5183
                    minLimitObject.month,                                                                             // 5184
                    minLimitObject.date + (dateObject.pick === minLimitObject.pick ? 0 : -1)                          // 5185
                ])                                                                                                    // 5186
            }                                                                                                         // 5187
            else if ( dateObject.pick >= maxLimitObject.pick ) {                                                      // 5188
                reachedMax = true                                                                                     // 5189
                interval = -1                                                                                         // 5190
                dateObject = calendar.create([                                                                        // 5191
                    maxLimitObject.year,                                                                              // 5192
                    maxLimitObject.month,                                                                             // 5193
                    maxLimitObject.date + (dateObject.pick === maxLimitObject.pick ? 0 : 1)                           // 5194
                ])                                                                                                    // 5195
            }                                                                                                         // 5196
                                                                                                                      // 5197
                                                                                                                      // 5198
            // If we’ve reached both limits, just break out of the loop.                                              // 5199
            if ( reachedMin && reachedMax ) {                                                                         // 5200
                break                                                                                                 // 5201
            }                                                                                                         // 5202
                                                                                                                      // 5203
                                                                                                                      // 5204
            // Finally, create the shifted date using the interval and keep looping.                                  // 5205
            dateObject = calendar.create([ dateObject.year, dateObject.month, dateObject.date + interval ])           // 5206
        }                                                                                                             // 5207
                                                                                                                      // 5208
    } //endif                                                                                                         // 5209
                                                                                                                      // 5210
                                                                                                                      // 5211
    // Return the date object settled on.                                                                             // 5212
    return dateObject                                                                                                 // 5213
} //DatePicker.prototype.validate                                                                                     // 5214
                                                                                                                      // 5215
                                                                                                                      // 5216
/**                                                                                                                   // 5217
 * Check if a date is disabled.                                                                                       // 5218
 */                                                                                                                   // 5219
DatePicker.prototype.disabled = function( dateToVerify ) {                                                            // 5220
                                                                                                                      // 5221
    var                                                                                                               // 5222
        calendar = this,                                                                                              // 5223
                                                                                                                      // 5224
        // Filter through the disabled dates to check if this is one.                                                 // 5225
        isDisabledMatch = calendar.item.disable.filter( function( dateToDisable ) {                                   // 5226
                                                                                                                      // 5227
            // If the date is a number, match the weekday with 0index and `firstDay` check.                           // 5228
            if ( _.isInteger( dateToDisable ) ) {                                                                     // 5229
                return dateToVerify.day === ( calendar.settings.firstDay ? dateToDisable : dateToDisable - 1 ) % 7    // 5230
            }                                                                                                         // 5231
                                                                                                                      // 5232
            // If it’s an array or a native JS date, create and match the exact date.                                 // 5233
            if ( $.isArray( dateToDisable ) || _.isDate( dateToDisable ) ) {                                          // 5234
                return dateToVerify.pick === calendar.create( dateToDisable ).pick                                    // 5235
            }                                                                                                         // 5236
                                                                                                                      // 5237
            // If it’s an object, match a date within the “from” and “to” range.                                      // 5238
            if ( $.isPlainObject( dateToDisable ) ) {                                                                 // 5239
                return calendar.withinRange( dateToDisable, dateToVerify )                                            // 5240
            }                                                                                                         // 5241
        })                                                                                                            // 5242
                                                                                                                      // 5243
    // If this date matches a disabled date, confirm it’s not inverted.                                               // 5244
    isDisabledMatch = isDisabledMatch.length && !isDisabledMatch.filter(function( dateToDisable ) {                   // 5245
        return $.isArray( dateToDisable ) && dateToDisable[3] == 'inverted' ||                                        // 5246
            $.isPlainObject( dateToDisable ) && dateToDisable.inverted                                                // 5247
    }).length                                                                                                         // 5248
                                                                                                                      // 5249
    // Check the calendar “enabled” flag and respectively flip the                                                    // 5250
    // disabled state. Then also check if it’s beyond the min/max limits.                                             // 5251
    return calendar.item.enable === -1 ? !isDisabledMatch : isDisabledMatch ||                                        // 5252
        dateToVerify.pick < calendar.item.min.pick ||                                                                 // 5253
        dateToVerify.pick > calendar.item.max.pick                                                                    // 5254
                                                                                                                      // 5255
} //DatePicker.prototype.disabled                                                                                     // 5256
                                                                                                                      // 5257
                                                                                                                      // 5258
/**                                                                                                                   // 5259
 * Parse a string into a usable type.                                                                                 // 5260
 */                                                                                                                   // 5261
DatePicker.prototype.parse = function( type, value, options ) {                                                       // 5262
                                                                                                                      // 5263
    var calendar = this,                                                                                              // 5264
        parsingObject = {}                                                                                            // 5265
                                                                                                                      // 5266
    // If it’s already parsed, we’re good.                                                                            // 5267
    if ( !value || typeof value != 'string' ) {                                                                       // 5268
        return value                                                                                                  // 5269
    }                                                                                                                 // 5270
                                                                                                                      // 5271
    // We need a `.format` to parse the value with.                                                                   // 5272
    if ( !( options && options.format ) ) {                                                                           // 5273
        options = options || {}                                                                                       // 5274
        options.format = calendar.settings.format                                                                     // 5275
    }                                                                                                                 // 5276
                                                                                                                      // 5277
    // Convert the format into an array and then map through it.                                                      // 5278
    calendar.formats.toArray( options.format ).map( function( label ) {                                               // 5279
                                                                                                                      // 5280
        var                                                                                                           // 5281
            // Grab the formatting label.                                                                             // 5282
            formattingLabel = calendar.formats[ label ],                                                              // 5283
                                                                                                                      // 5284
            // The format length is from the formatting label function or the                                         // 5285
            // label length without the escaping exclamation (!) mark.                                                // 5286
            formatLength = formattingLabel ? _.trigger( formattingLabel, calendar, [ value, parsingObject ] ) : label.replace( /^!/, '' ).length
                                                                                                                      // 5288
        // If there's a format label, split the value up to the format length.                                        // 5289
        // Then add it to the parsing object with appropriate label.                                                  // 5290
        if ( formattingLabel ) {                                                                                      // 5291
            parsingObject[ label ] = value.substr( 0, formatLength )                                                  // 5292
        }                                                                                                             // 5293
                                                                                                                      // 5294
        // Update the value as the substring from format length to end.                                               // 5295
        value = value.substr( formatLength )                                                                          // 5296
    })                                                                                                                // 5297
                                                                                                                      // 5298
    // Compensate for month 0index.                                                                                   // 5299
    return [                                                                                                          // 5300
        parsingObject.yyyy || parsingObject.yy,                                                                       // 5301
        +( parsingObject.mm || parsingObject.m ) - 1,                                                                 // 5302
        parsingObject.dd || parsingObject.d                                                                           // 5303
    ]                                                                                                                 // 5304
} //DatePicker.prototype.parse                                                                                        // 5305
                                                                                                                      // 5306
                                                                                                                      // 5307
/**                                                                                                                   // 5308
 * Various formats to display the object in.                                                                          // 5309
 */                                                                                                                   // 5310
DatePicker.prototype.formats = (function() {                                                                          // 5311
                                                                                                                      // 5312
    // Return the length of the first word in a collection.                                                           // 5313
    function getWordLengthFromCollection( string, collection, dateObject ) {                                          // 5314
                                                                                                                      // 5315
        // Grab the first word from the string.                                                                       // 5316
        var word = string.match( /\w+/ )[ 0 ]                                                                         // 5317
                                                                                                                      // 5318
        // If there's no month index, add it to the date object                                                       // 5319
        if ( !dateObject.mm && !dateObject.m ) {                                                                      // 5320
            dateObject.m = collection.indexOf( word ) + 1                                                             // 5321
        }                                                                                                             // 5322
                                                                                                                      // 5323
        // Return the length of the word.                                                                             // 5324
        return word.length                                                                                            // 5325
    }                                                                                                                 // 5326
                                                                                                                      // 5327
    // Get the length of the first word in a string.                                                                  // 5328
    function getFirstWordLength( string ) {                                                                           // 5329
        return string.match( /\w+/ )[ 0 ].length                                                                      // 5330
    }                                                                                                                 // 5331
                                                                                                                      // 5332
    return {                                                                                                          // 5333
                                                                                                                      // 5334
        d: function( string, dateObject ) {                                                                           // 5335
                                                                                                                      // 5336
            // If there's string, then get the digits length.                                                         // 5337
            // Otherwise return the selected date.                                                                    // 5338
            return string ? _.digits( string ) : dateObject.date                                                      // 5339
        },                                                                                                            // 5340
        dd: function( string, dateObject ) {                                                                          // 5341
                                                                                                                      // 5342
            // If there's a string, then the length is always 2.                                                      // 5343
            // Otherwise return the selected date with a leading zero.                                                // 5344
            return string ? 2 : _.lead( dateObject.date )                                                             // 5345
        },                                                                                                            // 5346
        ddd: function( string, dateObject ) {                                                                         // 5347
                                                                                                                      // 5348
            // If there's a string, then get the length of the first word.                                            // 5349
            // Otherwise return the short selected weekday.                                                           // 5350
            return string ? getFirstWordLength( string ) : this.settings.weekdaysShort[ dateObject.day ]              // 5351
        },                                                                                                            // 5352
        dddd: function( string, dateObject ) {                                                                        // 5353
                                                                                                                      // 5354
            // If there's a string, then get the length of the first word.                                            // 5355
            // Otherwise return the full selected weekday.                                                            // 5356
            return string ? getFirstWordLength( string ) : this.settings.weekdaysFull[ dateObject.day ]               // 5357
        },                                                                                                            // 5358
        m: function( string, dateObject ) {                                                                           // 5359
                                                                                                                      // 5360
            // If there's a string, then get the length of the digits                                                 // 5361
            // Otherwise return the selected month with 0index compensation.                                          // 5362
            return string ? _.digits( string ) : dateObject.month + 1                                                 // 5363
        },                                                                                                            // 5364
        mm: function( string, dateObject ) {                                                                          // 5365
                                                                                                                      // 5366
            // If there's a string, then the length is always 2.                                                      // 5367
            // Otherwise return the selected month with 0index and leading zero.                                      // 5368
            return string ? 2 : _.lead( dateObject.month + 1 )                                                        // 5369
        },                                                                                                            // 5370
        mmm: function( string, dateObject ) {                                                                         // 5371
                                                                                                                      // 5372
            var collection = this.settings.monthsShort                                                                // 5373
                                                                                                                      // 5374
            // If there's a string, get length of the relevant month from the short                                   // 5375
            // months collection. Otherwise return the selected month from that collection.                           // 5376
            return string ? getWordLengthFromCollection( string, collection, dateObject ) : collection[ dateObject.month ]
        },                                                                                                            // 5378
        mmmm: function( string, dateObject ) {                                                                        // 5379
                                                                                                                      // 5380
            var collection = this.settings.monthsFull                                                                 // 5381
                                                                                                                      // 5382
            // If there's a string, get length of the relevant month from the full                                    // 5383
            // months collection. Otherwise return the selected month from that collection.                           // 5384
            return string ? getWordLengthFromCollection( string, collection, dateObject ) : collection[ dateObject.month ]
        },                                                                                                            // 5386
        yy: function( string, dateObject ) {                                                                          // 5387
                                                                                                                      // 5388
            // If there's a string, then the length is always 2.                                                      // 5389
            // Otherwise return the selected year by slicing out the first 2 digits.                                  // 5390
            return string ? 2 : ( '' + dateObject.year ).slice( 2 )                                                   // 5391
        },                                                                                                            // 5392
        yyyy: function( string, dateObject ) {                                                                        // 5393
                                                                                                                      // 5394
            // If there's a string, then the length is always 4.                                                      // 5395
            // Otherwise return the selected year.                                                                    // 5396
            return string ? 4 : dateObject.year                                                                       // 5397
        },                                                                                                            // 5398
                                                                                                                      // 5399
        // Create an array by splitting the formatting string passed.                                                 // 5400
        toArray: function( formatString ) { return formatString.split( /(d{1,4}|m{1,4}|y{4}|yy|!.)/g ) },             // 5401
                                                                                                                      // 5402
        // Format an object into a string using the formatting options.                                               // 5403
        toString: function ( formatString, itemObject ) {                                                             // 5404
            var calendar = this                                                                                       // 5405
            return calendar.formats.toArray( formatString ).map( function( label ) {                                  // 5406
                return _.trigger( calendar.formats[ label ], calendar, [ 0, itemObject ] ) || label.replace( /^!/, '' )
            }).join( '' )                                                                                             // 5408
        }                                                                                                             // 5409
    }                                                                                                                 // 5410
})() //DatePicker.prototype.formats                                                                                   // 5411
                                                                                                                      // 5412
                                                                                                                      // 5413
                                                                                                                      // 5414
                                                                                                                      // 5415
/**                                                                                                                   // 5416
 * Check if two date units are the exact.                                                                             // 5417
 */                                                                                                                   // 5418
DatePicker.prototype.isDateExact = function( one, two ) {                                                             // 5419
                                                                                                                      // 5420
    var calendar = this                                                                                               // 5421
                                                                                                                      // 5422
    // When we’re working with weekdays, do a direct comparison.                                                      // 5423
    if (                                                                                                              // 5424
        ( _.isInteger( one ) && _.isInteger( two ) ) ||                                                               // 5425
        ( typeof one == 'boolean' && typeof two == 'boolean' )                                                        // 5426
     ) {                                                                                                              // 5427
        return one === two                                                                                            // 5428
    }                                                                                                                 // 5429
                                                                                                                      // 5430
    // When we’re working with date representations, compare the “pick” value.                                        // 5431
    if (                                                                                                              // 5432
        ( _.isDate( one ) || $.isArray( one ) ) &&                                                                    // 5433
        ( _.isDate( two ) || $.isArray( two ) )                                                                       // 5434
    ) {                                                                                                               // 5435
        return calendar.create( one ).pick === calendar.create( two ).pick                                            // 5436
    }                                                                                                                 // 5437
                                                                                                                      // 5438
    // When we’re working with range objects, compare the “from” and “to”.                                            // 5439
    if ( $.isPlainObject( one ) && $.isPlainObject( two ) ) {                                                         // 5440
        return calendar.isDateExact( one.from, two.from ) && calendar.isDateExact( one.to, two.to )                   // 5441
    }                                                                                                                 // 5442
                                                                                                                      // 5443
    return false                                                                                                      // 5444
}                                                                                                                     // 5445
                                                                                                                      // 5446
                                                                                                                      // 5447
/**                                                                                                                   // 5448
 * Check if two date units overlap.                                                                                   // 5449
 */                                                                                                                   // 5450
DatePicker.prototype.isDateOverlap = function( one, two ) {                                                           // 5451
                                                                                                                      // 5452
    var calendar = this,                                                                                              // 5453
        firstDay = calendar.settings.firstDay ? 1 : 0                                                                 // 5454
                                                                                                                      // 5455
    // When we’re working with a weekday index, compare the days.                                                     // 5456
    if ( _.isInteger( one ) && ( _.isDate( two ) || $.isArray( two ) ) ) {                                            // 5457
        one = one % 7 + firstDay                                                                                      // 5458
        return one === calendar.create( two ).day + 1                                                                 // 5459
    }                                                                                                                 // 5460
    if ( _.isInteger( two ) && ( _.isDate( one ) || $.isArray( one ) ) ) {                                            // 5461
        two = two % 7 + firstDay                                                                                      // 5462
        return two === calendar.create( one ).day + 1                                                                 // 5463
    }                                                                                                                 // 5464
                                                                                                                      // 5465
    // When we’re working with range objects, check if the ranges overlap.                                            // 5466
    if ( $.isPlainObject( one ) && $.isPlainObject( two ) ) {                                                         // 5467
        return calendar.overlapRanges( one, two )                                                                     // 5468
    }                                                                                                                 // 5469
                                                                                                                      // 5470
    return false                                                                                                      // 5471
}                                                                                                                     // 5472
                                                                                                                      // 5473
                                                                                                                      // 5474
/**                                                                                                                   // 5475
 * Flip the “enabled” state.                                                                                          // 5476
 */                                                                                                                   // 5477
DatePicker.prototype.flipEnable = function(val) {                                                                     // 5478
    var itemObject = this.item                                                                                        // 5479
    itemObject.enable = val || (itemObject.enable == -1 ? 1 : -1)                                                     // 5480
}                                                                                                                     // 5481
                                                                                                                      // 5482
                                                                                                                      // 5483
/**                                                                                                                   // 5484
 * Mark a collection of dates as “disabled”.                                                                          // 5485
 */                                                                                                                   // 5486
DatePicker.prototype.deactivate = function( type, datesToDisable ) {                                                  // 5487
                                                                                                                      // 5488
    var calendar = this,                                                                                              // 5489
        disabledItems = calendar.item.disable.slice(0)                                                                // 5490
                                                                                                                      // 5491
                                                                                                                      // 5492
    // If we’re flipping, that’s all we need to do.                                                                   // 5493
    if ( datesToDisable == 'flip' ) {                                                                                 // 5494
        calendar.flipEnable()                                                                                         // 5495
    }                                                                                                                 // 5496
                                                                                                                      // 5497
    else if ( datesToDisable === false ) {                                                                            // 5498
        calendar.flipEnable(1)                                                                                        // 5499
        disabledItems = []                                                                                            // 5500
    }                                                                                                                 // 5501
                                                                                                                      // 5502
    else if ( datesToDisable === true ) {                                                                             // 5503
        calendar.flipEnable(-1)                                                                                       // 5504
        disabledItems = []                                                                                            // 5505
    }                                                                                                                 // 5506
                                                                                                                      // 5507
    // Otherwise go through the dates to disable.                                                                     // 5508
    else {                                                                                                            // 5509
                                                                                                                      // 5510
        datesToDisable.map(function( unitToDisable ) {                                                                // 5511
                                                                                                                      // 5512
            var matchFound                                                                                            // 5513
                                                                                                                      // 5514
            // When we have disabled items, check for matches.                                                        // 5515
            // If something is matched, immediately break out.                                                        // 5516
            for ( var index = 0; index < disabledItems.length; index += 1 ) {                                         // 5517
                if ( calendar.isDateExact( unitToDisable, disabledItems[index] ) ) {                                  // 5518
                    matchFound = true                                                                                 // 5519
                    break                                                                                             // 5520
                }                                                                                                     // 5521
            }                                                                                                         // 5522
                                                                                                                      // 5523
            // If nothing was found, add the validated unit to the collection.                                        // 5524
            if ( !matchFound ) {                                                                                      // 5525
                if (                                                                                                  // 5526
                    _.isInteger( unitToDisable ) ||                                                                   // 5527
                    _.isDate( unitToDisable ) ||                                                                      // 5528
                    $.isArray( unitToDisable ) ||                                                                     // 5529
                    ( $.isPlainObject( unitToDisable ) && unitToDisable.from && unitToDisable.to )                    // 5530
                ) {                                                                                                   // 5531
                    disabledItems.push( unitToDisable )                                                               // 5532
                }                                                                                                     // 5533
            }                                                                                                         // 5534
        })                                                                                                            // 5535
    }                                                                                                                 // 5536
                                                                                                                      // 5537
    // Return the updated collection.                                                                                 // 5538
    return disabledItems                                                                                              // 5539
} //DatePicker.prototype.deactivate                                                                                   // 5540
                                                                                                                      // 5541
                                                                                                                      // 5542
/**                                                                                                                   // 5543
 * Mark a collection of dates as “enabled”.                                                                           // 5544
 */                                                                                                                   // 5545
DatePicker.prototype.activate = function( type, datesToEnable ) {                                                     // 5546
                                                                                                                      // 5547
    var calendar = this,                                                                                              // 5548
        disabledItems = calendar.item.disable,                                                                        // 5549
        disabledItemsCount = disabledItems.length                                                                     // 5550
                                                                                                                      // 5551
    // If we’re flipping, that’s all we need to do.                                                                   // 5552
    if ( datesToEnable == 'flip' ) {                                                                                  // 5553
        calendar.flipEnable()                                                                                         // 5554
    }                                                                                                                 // 5555
                                                                                                                      // 5556
    else if ( datesToEnable === true ) {                                                                              // 5557
        calendar.flipEnable(1)                                                                                        // 5558
        disabledItems = []                                                                                            // 5559
    }                                                                                                                 // 5560
                                                                                                                      // 5561
    else if ( datesToEnable === false ) {                                                                             // 5562
        calendar.flipEnable(-1)                                                                                       // 5563
        disabledItems = []                                                                                            // 5564
    }                                                                                                                 // 5565
                                                                                                                      // 5566
    // Otherwise go through the disabled dates.                                                                       // 5567
    else {                                                                                                            // 5568
                                                                                                                      // 5569
        datesToEnable.map(function( unitToEnable ) {                                                                  // 5570
                                                                                                                      // 5571
            var matchFound,                                                                                           // 5572
                disabledUnit,                                                                                         // 5573
                index,                                                                                                // 5574
                isExactRange                                                                                          // 5575
                                                                                                                      // 5576
            // Go through the disabled items and try to find a match.                                                 // 5577
            for ( index = 0; index < disabledItemsCount; index += 1 ) {                                               // 5578
                                                                                                                      // 5579
                disabledUnit = disabledItems[index]                                                                   // 5580
                                                                                                                      // 5581
                // When an exact match is found, remove it from the collection.                                       // 5582
                if ( calendar.isDateExact( disabledUnit, unitToEnable ) ) {                                           // 5583
                    matchFound = disabledItems[index] = null                                                          // 5584
                    isExactRange = true                                                                               // 5585
                    break                                                                                             // 5586
                }                                                                                                     // 5587
                                                                                                                      // 5588
                // When an overlapped match is found, add the “inverted” state to it.                                 // 5589
                else if ( calendar.isDateOverlap( disabledUnit, unitToEnable ) ) {                                    // 5590
                    if ( $.isPlainObject( unitToEnable ) ) {                                                          // 5591
                        unitToEnable.inverted = true                                                                  // 5592
                        matchFound = unitToEnable                                                                     // 5593
                    }                                                                                                 // 5594
                    else if ( $.isArray( unitToEnable ) ) {                                                           // 5595
                        matchFound = unitToEnable                                                                     // 5596
                        if ( !matchFound[3] ) matchFound.push( 'inverted' )                                           // 5597
                    }                                                                                                 // 5598
                    else if ( _.isDate( unitToEnable ) ) {                                                            // 5599
                        matchFound = [ unitToEnable.getFullYear(), unitToEnable.getMonth(), unitToEnable.getDate(), 'inverted' ]
                    }                                                                                                 // 5601
                    break                                                                                             // 5602
                }                                                                                                     // 5603
            }                                                                                                         // 5604
                                                                                                                      // 5605
            // If a match was found, remove a previous duplicate entry.                                               // 5606
            if ( matchFound ) for ( index = 0; index < disabledItemsCount; index += 1 ) {                             // 5607
                if ( calendar.isDateExact( disabledItems[index], unitToEnable ) ) {                                   // 5608
                    disabledItems[index] = null                                                                       // 5609
                    break                                                                                             // 5610
                }                                                                                                     // 5611
            }                                                                                                         // 5612
                                                                                                                      // 5613
            // In the event that we’re dealing with an exact range of dates,                                          // 5614
            // make sure there are no “inverted” dates because of it.                                                 // 5615
            if ( isExactRange ) for ( index = 0; index < disabledItemsCount; index += 1 ) {                           // 5616
                if ( calendar.isDateOverlap( disabledItems[index], unitToEnable ) ) {                                 // 5617
                    disabledItems[index] = null                                                                       // 5618
                    break                                                                                             // 5619
                }                                                                                                     // 5620
            }                                                                                                         // 5621
                                                                                                                      // 5622
            // If something is still matched, add it into the collection.                                             // 5623
            if ( matchFound ) {                                                                                       // 5624
                disabledItems.push( matchFound )                                                                      // 5625
            }                                                                                                         // 5626
        })                                                                                                            // 5627
    }                                                                                                                 // 5628
                                                                                                                      // 5629
    // Return the updated collection.                                                                                 // 5630
    return disabledItems.filter(function( val ) { return val != null })                                               // 5631
} //DatePicker.prototype.activate                                                                                     // 5632
                                                                                                                      // 5633
                                                                                                                      // 5634
/**                                                                                                                   // 5635
 * Create a string for the nodes in the picker.                                                                       // 5636
 */                                                                                                                   // 5637
DatePicker.prototype.nodes = function( isOpen ) {                                                                     // 5638
                                                                                                                      // 5639
    var                                                                                                               // 5640
        calendar = this,                                                                                              // 5641
        settings = calendar.settings,                                                                                 // 5642
        calendarItem = calendar.item,                                                                                 // 5643
        nowObject = calendarItem.now,                                                                                 // 5644
        selectedObject = calendarItem.select,                                                                         // 5645
        highlightedObject = calendarItem.highlight,                                                                   // 5646
        viewsetObject = calendarItem.view,                                                                            // 5647
        disabledCollection = calendarItem.disable,                                                                    // 5648
        minLimitObject = calendarItem.min,                                                                            // 5649
        maxLimitObject = calendarItem.max,                                                                            // 5650
                                                                                                                      // 5651
                                                                                                                      // 5652
        // Create the calendar table head using a copy of weekday labels collection.                                  // 5653
        // * We do a copy so we don't mutate the original array.                                                      // 5654
        tableHead = (function( collection, fullCollection ) {                                                         // 5655
                                                                                                                      // 5656
            // If the first day should be Monday, move Sunday to the end.                                             // 5657
            if ( settings.firstDay ) {                                                                                // 5658
                collection.push( collection.shift() )                                                                 // 5659
                fullCollection.push( fullCollection.shift() )                                                         // 5660
            }                                                                                                         // 5661
                                                                                                                      // 5662
            // Create and return the table head group.                                                                // 5663
            return _.node(                                                                                            // 5664
                'thead',                                                                                              // 5665
                _.node(                                                                                               // 5666
                    'tr',                                                                                             // 5667
                    _.group({                                                                                         // 5668
                        min: 0,                                                                                       // 5669
                        max: DAYS_IN_WEEK - 1,                                                                        // 5670
                        i: 1,                                                                                         // 5671
                        node: 'th',                                                                                   // 5672
                        item: function( counter ) {                                                                   // 5673
                            return [                                                                                  // 5674
                                collection[ counter ],                                                                // 5675
                                settings.klass.weekdays,                                                              // 5676
                                'scope=col title="' + fullCollection[ counter ] + '"'                                 // 5677
                            ]                                                                                         // 5678
                        }                                                                                             // 5679
                    })                                                                                                // 5680
                )                                                                                                     // 5681
            ) //endreturn                                                                                             // 5682
                                                                                                                      // 5683
        // Materialize modified                                                                                       // 5684
        })( ( settings.showWeekdaysFull ? settings.weekdaysFull : settings.weekdaysLetter ).slice( 0 ), settings.weekdaysFull.slice( 0 ) ), //tableHead
                                                                                                                      // 5686
                                                                                                                      // 5687
        // Create the nav for next/prev month.                                                                        // 5688
        createMonthNav = function( next ) {                                                                           // 5689
                                                                                                                      // 5690
            // Otherwise, return the created month tag.                                                               // 5691
            return _.node(                                                                                            // 5692
                'div',                                                                                                // 5693
                ' ',                                                                                                  // 5694
                settings.klass[ 'nav' + ( next ? 'Next' : 'Prev' ) ] + (                                              // 5695
                                                                                                                      // 5696
                    // If the focused month is outside the range, disabled the button.                                // 5697
                    ( next && viewsetObject.year >= maxLimitObject.year && viewsetObject.month >= maxLimitObject.month ) ||
                    ( !next && viewsetObject.year <= minLimitObject.year && viewsetObject.month <= minLimitObject.month ) ?
                    ' ' + settings.klass.navDisabled : ''                                                             // 5700
                ),                                                                                                    // 5701
                'data-nav=' + ( next || -1 ) + ' ' +                                                                  // 5702
                _.ariaAttr({                                                                                          // 5703
                    role: 'button',                                                                                   // 5704
                    controls: calendar.$node[0].id + '_table'                                                         // 5705
                }) + ' ' +                                                                                            // 5706
                'title="' + (next ? settings.labelMonthNext : settings.labelMonthPrev ) + '"'                         // 5707
            ) //endreturn                                                                                             // 5708
        }, //createMonthNav                                                                                           // 5709
                                                                                                                      // 5710
                                                                                                                      // 5711
        // Create the month label.                                                                                    // 5712
        //Materialize modified                                                                                        // 5713
        createMonthLabel = function(override) {                                                                       // 5714
                                                                                                                      // 5715
            var monthsCollection = settings.showMonthsShort ? settings.monthsShort : settings.monthsFull              // 5716
                                                                                                                      // 5717
             // Materialize modified                                                                                  // 5718
            if (override == "short_months") {                                                                         // 5719
              monthsCollection = settings.monthsShort;                                                                // 5720
            }                                                                                                         // 5721
                                                                                                                      // 5722
            // If there are months to select, add a dropdown menu.                                                    // 5723
            if ( settings.selectMonths  && override == undefined) {                                                   // 5724
                                                                                                                      // 5725
                return _.node( 'select',                                                                              // 5726
                    _.group({                                                                                         // 5727
                        min: 0,                                                                                       // 5728
                        max: 11,                                                                                      // 5729
                        i: 1,                                                                                         // 5730
                        node: 'option',                                                                               // 5731
                        item: function( loopedMonth ) {                                                               // 5732
                                                                                                                      // 5733
                            return [                                                                                  // 5734
                                                                                                                      // 5735
                                // The looped month and no classes.                                                   // 5736
                                monthsCollection[ loopedMonth ], 0,                                                   // 5737
                                                                                                                      // 5738
                                // Set the value and selected index.                                                  // 5739
                                'value=' + loopedMonth +                                                              // 5740
                                ( viewsetObject.month == loopedMonth ? ' selected' : '' ) +                           // 5741
                                (                                                                                     // 5742
                                    (                                                                                 // 5743
                                        ( viewsetObject.year == minLimitObject.year && loopedMonth < minLimitObject.month ) ||
                                        ( viewsetObject.year == maxLimitObject.year && loopedMonth > maxLimitObject.month )
                                    ) ?                                                                               // 5746
                                    ' disabled' : ''                                                                  // 5747
                                )                                                                                     // 5748
                            ]                                                                                         // 5749
                        }                                                                                             // 5750
                    }),                                                                                               // 5751
                    settings.klass.selectMonth + ' browser-default',                                                  // 5752
                    ( isOpen ? '' : 'disabled' ) + ' ' +                                                              // 5753
                    _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' +                                 // 5754
                    'title="' + settings.labelMonthSelect + '"'                                                       // 5755
                )                                                                                                     // 5756
            }                                                                                                         // 5757
                                                                                                                      // 5758
            // Materialize modified                                                                                   // 5759
            if (override == "short_months")                                                                           // 5760
                if (selectedObject != null)                                                                           // 5761
                return _.node( 'div', monthsCollection[ selectedObject.month ] );                                     // 5762
                else return _.node( 'div', monthsCollection[ viewsetObject.month ] );                                 // 5763
                                                                                                                      // 5764
            // If there's a need for a month selector                                                                 // 5765
            return _.node( 'div', monthsCollection[ viewsetObject.month ], settings.klass.month )                     // 5766
        }, //createMonthLabel                                                                                         // 5767
                                                                                                                      // 5768
                                                                                                                      // 5769
        // Create the year label.                                                                                     // 5770
        // Materialize modified                                                                                       // 5771
        createYearLabel = function(override) {                                                                        // 5772
                                                                                                                      // 5773
            var focusedYear = viewsetObject.year,                                                                     // 5774
                                                                                                                      // 5775
            // If years selector is set to a literal "true", set it to 5. Otherwise                                   // 5776
            // divide in half to get half before and half after focused year.                                         // 5777
            numberYears = settings.selectYears === true ? 5 : ~~( settings.selectYears / 2 )                          // 5778
                                                                                                                      // 5779
            // If there are years to select, add a dropdown menu.                                                     // 5780
            if ( numberYears ) {                                                                                      // 5781
                                                                                                                      // 5782
                var                                                                                                   // 5783
                    minYear = minLimitObject.year,                                                                    // 5784
                    maxYear = maxLimitObject.year,                                                                    // 5785
                    lowestYear = focusedYear - numberYears,                                                           // 5786
                    highestYear = focusedYear + numberYears                                                           // 5787
                                                                                                                      // 5788
                // If the min year is greater than the lowest year, increase the highest year                         // 5789
                // by the difference and set the lowest year to the min year.                                         // 5790
                if ( minYear > lowestYear ) {                                                                         // 5791
                    highestYear += minYear - lowestYear                                                               // 5792
                    lowestYear = minYear                                                                              // 5793
                }                                                                                                     // 5794
                                                                                                                      // 5795
                // If the max year is less than the highest year, decrease the lowest year                            // 5796
                // by the lower of the two: available and needed years. Then set the                                  // 5797
                // highest year to the max year.                                                                      // 5798
                if ( maxYear < highestYear ) {                                                                        // 5799
                                                                                                                      // 5800
                    var availableYears = lowestYear - minYear,                                                        // 5801
                        neededYears = highestYear - maxYear                                                           // 5802
                                                                                                                      // 5803
                    lowestYear -= availableYears > neededYears ? neededYears : availableYears                         // 5804
                    highestYear = maxYear                                                                             // 5805
                }                                                                                                     // 5806
                                                                                                                      // 5807
                if ( settings.selectYears  && override == undefined ) {                                               // 5808
                    return _.node( 'select',                                                                          // 5809
                        _.group({                                                                                     // 5810
                            min: lowestYear,                                                                          // 5811
                            max: highestYear,                                                                         // 5812
                            i: 1,                                                                                     // 5813
                            node: 'option',                                                                           // 5814
                            item: function( loopedYear ) {                                                            // 5815
                                return [                                                                              // 5816
                                                                                                                      // 5817
                                    // The looped year and no classes.                                                // 5818
                                    loopedYear, 0,                                                                    // 5819
                                                                                                                      // 5820
                                    // Set the value and selected index.                                              // 5821
                                    'value=' + loopedYear + ( focusedYear == loopedYear ? ' selected' : '' )          // 5822
                                ]                                                                                     // 5823
                            }                                                                                         // 5824
                        }),                                                                                           // 5825
                        settings.klass.selectYear + ' browser-default',                                               // 5826
                        ( isOpen ? '' : 'disabled' ) + ' ' + _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' +
                        'title="' + settings.labelYearSelect + '"'                                                    // 5828
                    )                                                                                                 // 5829
                }                                                                                                     // 5830
            }                                                                                                         // 5831
                                                                                                                      // 5832
            // Materialize modified                                                                                   // 5833
            if (override == "raw")                                                                                    // 5834
                return _.node( 'div', focusedYear )                                                                   // 5835
                                                                                                                      // 5836
            // Otherwise just return the year focused                                                                 // 5837
            return _.node( 'div', focusedYear, settings.klass.year )                                                  // 5838
        } //createYearLabel                                                                                           // 5839
                                                                                                                      // 5840
                                                                                                                      // 5841
        // Materialize modified                                                                                       // 5842
        createDayLabel = function() {                                                                                 // 5843
                if (selectedObject != null)                                                                           // 5844
                    return _.node( 'div', selectedObject.date)                                                        // 5845
                else return _.node( 'div', nowObject.date)                                                            // 5846
            }                                                                                                         // 5847
        createWeekdayLabel = function() {                                                                             // 5848
            var display_day;                                                                                          // 5849
                                                                                                                      // 5850
            if (selectedObject != null)                                                                               // 5851
                display_day = selectedObject.day;                                                                     // 5852
            else                                                                                                      // 5853
                display_day = nowObject.day;                                                                          // 5854
            var weekday = settings.weekdaysFull[ display_day ]                                                        // 5855
            return weekday                                                                                            // 5856
        }                                                                                                             // 5857
                                                                                                                      // 5858
                                                                                                                      // 5859
    // Create and return the entire calendar.                                                                         // 5860
return _.node(                                                                                                        // 5861
        // Date presentation View                                                                                     // 5862
        'div',                                                                                                        // 5863
            _.node(                                                                                                   // 5864
                'div',                                                                                                // 5865
                createWeekdayLabel(),                                                                                 // 5866
                "picker__weekday-display"                                                                             // 5867
            )+                                                                                                        // 5868
            _.node(                                                                                                   // 5869
                // Div for short Month                                                                                // 5870
                'div',                                                                                                // 5871
                createMonthLabel("short_months"),                                                                     // 5872
                settings.klass.month_display                                                                          // 5873
            )+                                                                                                        // 5874
            _.node(                                                                                                   // 5875
                // Div for Day                                                                                        // 5876
                'div',                                                                                                // 5877
                createDayLabel() ,                                                                                    // 5878
                settings.klass.day_display                                                                            // 5879
            )+                                                                                                        // 5880
            _.node(                                                                                                   // 5881
                // Div for Year                                                                                       // 5882
                'div',                                                                                                // 5883
                createYearLabel("raw") ,                                                                              // 5884
                settings.klass.year_display                                                                           // 5885
            ),                                                                                                        // 5886
        settings.klass.date_display                                                                                   // 5887
    )+                                                                                                                // 5888
    // Calendar container                                                                                             // 5889
    _.node('div',                                                                                                     // 5890
        _.node('div',                                                                                                 // 5891
        ( settings.selectYears ?  createMonthLabel() + createYearLabel() : createMonthLabel() + createYearLabel() ) +
        createMonthNav() + createMonthNav( 1 ),                                                                       // 5893
        settings.klass.header                                                                                         // 5894
    ) + _.node(                                                                                                       // 5895
        'table',                                                                                                      // 5896
        tableHead +                                                                                                   // 5897
        _.node(                                                                                                       // 5898
            'tbody',                                                                                                  // 5899
            _.group({                                                                                                 // 5900
                min: 0,                                                                                               // 5901
                max: WEEKS_IN_CALENDAR - 1,                                                                           // 5902
                i: 1,                                                                                                 // 5903
                node: 'tr',                                                                                           // 5904
                item: function( rowCounter ) {                                                                        // 5905
                                                                                                                      // 5906
                    // If Monday is the first day and the month starts on Sunday, shift the date back a week.         // 5907
                    var shiftDateBy = settings.firstDay && calendar.create([ viewsetObject.year, viewsetObject.month, 1 ]).day === 0 ? -7 : 0
                                                                                                                      // 5909
                    return [                                                                                          // 5910
                        _.group({                                                                                     // 5911
                            min: DAYS_IN_WEEK * rowCounter - viewsetObject.day + shiftDateBy + 1, // Add 1 for weekday 0index
                            max: function() {                                                                         // 5913
                                return this.min + DAYS_IN_WEEK - 1                                                    // 5914
                            },                                                                                        // 5915
                            i: 1,                                                                                     // 5916
                            node: 'td',                                                                               // 5917
                            item: function( targetDate ) {                                                            // 5918
                                                                                                                      // 5919
                                // Convert the time date from a relative date to a target date.                       // 5920
                                targetDate = calendar.create([ viewsetObject.year, viewsetObject.month, targetDate + ( settings.firstDay ? 1 : 0 ) ])
                                                                                                                      // 5922
                                var isSelected = selectedObject && selectedObject.pick == targetDate.pick,            // 5923
                                    isHighlighted = highlightedObject && highlightedObject.pick == targetDate.pick,   // 5924
                                    isDisabled = disabledCollection && calendar.disabled( targetDate ) || targetDate.pick < minLimitObject.pick || targetDate.pick > maxLimitObject.pick,
                                    formattedDate = _.trigger( calendar.formats.toString, calendar, [ settings.format, targetDate ] )
                                                                                                                      // 5927
                                return [                                                                              // 5928
                                    _.node(                                                                           // 5929
                                        'div',                                                                        // 5930
                                        targetDate.date,                                                              // 5931
                                        (function( klasses ) {                                                        // 5932
                                                                                                                      // 5933
                                            // Add the `infocus` or `outfocus` classes based on month in view.        // 5934
                                            klasses.push( viewsetObject.month == targetDate.month ? settings.klass.infocus : settings.klass.outfocus )
                                                                                                                      // 5936
                                            // Add the `today` class if needed.                                       // 5937
                                            if ( nowObject.pick == targetDate.pick ) {                                // 5938
                                                klasses.push( settings.klass.now )                                    // 5939
                                            }                                                                         // 5940
                                                                                                                      // 5941
                                            // Add the `selected` class if something's selected and the time matches.
                                            if ( isSelected ) {                                                       // 5943
                                                klasses.push( settings.klass.selected )                               // 5944
                                            }                                                                         // 5945
                                                                                                                      // 5946
                                            // Add the `highlighted` class if something's highlighted and the time matches.
                                            if ( isHighlighted ) {                                                    // 5948
                                                klasses.push( settings.klass.highlighted )                            // 5949
                                            }                                                                         // 5950
                                                                                                                      // 5951
                                            // Add the `disabled` class if something's disabled and the object matches.
                                            if ( isDisabled ) {                                                       // 5953
                                                klasses.push( settings.klass.disabled )                               // 5954
                                            }                                                                         // 5955
                                                                                                                      // 5956
                                            return klasses.join( ' ' )                                                // 5957
                                        })([ settings.klass.day ]),                                                   // 5958
                                        'data-pick=' + targetDate.pick + ' ' + _.ariaAttr({                           // 5959
                                            role: 'gridcell',                                                         // 5960
                                            label: formattedDate,                                                     // 5961
                                            selected: isSelected && calendar.$node.val() === formattedDate ? true : null,
                                            activedescendant: isHighlighted ? true : null,                            // 5963
                                            disabled: isDisabled ? true : null                                        // 5964
                                        })                                                                            // 5965
                                    ),                                                                                // 5966
                                    '',                                                                               // 5967
                                    _.ariaAttr({ role: 'presentation' })                                              // 5968
                                ] //endreturn                                                                         // 5969
                            }                                                                                         // 5970
                        })                                                                                            // 5971
                    ] //endreturn                                                                                     // 5972
                }                                                                                                     // 5973
            })                                                                                                        // 5974
        ),                                                                                                            // 5975
        settings.klass.table,                                                                                         // 5976
        'id="' + calendar.$node[0].id + '_table' + '" ' + _.ariaAttr({                                                // 5977
            role: 'grid',                                                                                             // 5978
            controls: calendar.$node[0].id,                                                                           // 5979
            readonly: true                                                                                            // 5980
        })                                                                                                            // 5981
    )                                                                                                                 // 5982
    , settings.klass.calendar_container) // end calendar                                                              // 5983
                                                                                                                      // 5984
     +                                                                                                                // 5985
                                                                                                                      // 5986
    // * For Firefox forms to submit, make sure to set the buttons’ `type` attributes as “button”.                    // 5987
    _.node(                                                                                                           // 5988
        'div',                                                                                                        // 5989
        _.node( 'button', settings.today, "btn-flat picker__today",                                                   // 5990
            'type=button data-pick=' + nowObject.pick +                                                               // 5991
            ( isOpen && !calendar.disabled(nowObject) ? '' : ' disabled' ) + ' ' +                                    // 5992
            _.ariaAttr({ controls: calendar.$node[0].id }) ) +                                                        // 5993
        _.node( 'button', settings.clear, "btn-flat picker__clear",                                                   // 5994
            'type=button data-clear=1' +                                                                              // 5995
            ( isOpen ? '' : ' disabled' ) + ' ' +                                                                     // 5996
            _.ariaAttr({ controls: calendar.$node[0].id }) ) +                                                        // 5997
        _.node('button', settings.close, "btn-flat picker__close",                                                    // 5998
            'type=button data-close=true ' +                                                                          // 5999
            ( isOpen ? '' : ' disabled' ) + ' ' +                                                                     // 6000
            _.ariaAttr({ controls: calendar.$node[0].id }) ),                                                         // 6001
        settings.klass.footer                                                                                         // 6002
    ) //endreturn                                                                                                     // 6003
} //DatePicker.prototype.nodes                                                                                        // 6004
                                                                                                                      // 6005
                                                                                                                      // 6006
                                                                                                                      // 6007
                                                                                                                      // 6008
/**                                                                                                                   // 6009
 * The date picker defaults.                                                                                          // 6010
 */                                                                                                                   // 6011
DatePicker.defaults = (function( prefix ) {                                                                           // 6012
                                                                                                                      // 6013
    return {                                                                                                          // 6014
                                                                                                                      // 6015
        // The title label to use for the month nav buttons                                                           // 6016
        labelMonthNext: 'Next month',                                                                                 // 6017
        labelMonthPrev: 'Previous month',                                                                             // 6018
                                                                                                                      // 6019
        // The title label to use for the dropdown selectors                                                          // 6020
        labelMonthSelect: 'Select a month',                                                                           // 6021
        labelYearSelect: 'Select a year',                                                                             // 6022
                                                                                                                      // 6023
        // Months and weekdays                                                                                        // 6024
        monthsFull: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
        monthsShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],          // 6026
        weekdaysFull: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],               // 6027
        weekdaysShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],                                           // 6028
                                                                                                                      // 6029
        // Materialize modified                                                                                       // 6030
        weekdaysLetter: [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],                                                        // 6031
                                                                                                                      // 6032
        // Today and clear                                                                                            // 6033
        today: 'Today',                                                                                               // 6034
        clear: 'Clear',                                                                                               // 6035
        close: 'Close',                                                                                               // 6036
                                                                                                                      // 6037
        // The format to show on the `input` element                                                                  // 6038
        format: 'd mmmm, yyyy',                                                                                       // 6039
                                                                                                                      // 6040
        // Classes                                                                                                    // 6041
        klass: {                                                                                                      // 6042
                                                                                                                      // 6043
            table: prefix + 'table',                                                                                  // 6044
                                                                                                                      // 6045
            header: prefix + 'header',                                                                                // 6046
                                                                                                                      // 6047
                                                                                                                      // 6048
            // Materialize Added klasses                                                                              // 6049
            date_display: prefix + 'date-display',                                                                    // 6050
            day_display: prefix + 'day-display',                                                                      // 6051
            month_display: prefix + 'month-display',                                                                  // 6052
            year_display: prefix + 'year-display',                                                                    // 6053
            calendar_container: prefix + 'calendar-container',                                                        // 6054
            // end                                                                                                    // 6055
                                                                                                                      // 6056
                                                                                                                      // 6057
                                                                                                                      // 6058
            navPrev: prefix + 'nav--prev',                                                                            // 6059
            navNext: prefix + 'nav--next',                                                                            // 6060
            navDisabled: prefix + 'nav--disabled',                                                                    // 6061
                                                                                                                      // 6062
            month: prefix + 'month',                                                                                  // 6063
            year: prefix + 'year',                                                                                    // 6064
                                                                                                                      // 6065
            selectMonth: prefix + 'select--month',                                                                    // 6066
            selectYear: prefix + 'select--year',                                                                      // 6067
                                                                                                                      // 6068
            weekdays: prefix + 'weekday',                                                                             // 6069
                                                                                                                      // 6070
            day: prefix + 'day',                                                                                      // 6071
            disabled: prefix + 'day--disabled',                                                                       // 6072
            selected: prefix + 'day--selected',                                                                       // 6073
            highlighted: prefix + 'day--highlighted',                                                                 // 6074
            now: prefix + 'day--today',                                                                               // 6075
            infocus: prefix + 'day--infocus',                                                                         // 6076
            outfocus: prefix + 'day--outfocus',                                                                       // 6077
                                                                                                                      // 6078
            footer: prefix + 'footer',                                                                                // 6079
                                                                                                                      // 6080
            buttonClear: prefix + 'button--clear',                                                                    // 6081
            buttonToday: prefix + 'button--today',                                                                    // 6082
            buttonClose: prefix + 'button--close'                                                                     // 6083
        }                                                                                                             // 6084
    }                                                                                                                 // 6085
})( Picker.klasses().picker + '__' )                                                                                  // 6086
                                                                                                                      // 6087
                                                                                                                      // 6088
                                                                                                                      // 6089
                                                                                                                      // 6090
                                                                                                                      // 6091
/**                                                                                                                   // 6092
 * Extend the picker to add the date picker.                                                                          // 6093
 */                                                                                                                   // 6094
Picker.extend( 'pickadate', DatePicker )                                                                              // 6095
                                                                                                                      // 6096
                                                                                                                      // 6097
}));                                                                                                                  // 6098
                                                                                                                      // 6099
                                                                                                                      // 6100
;(function ($) {                                                                                                      // 6101
                                                                                                                      // 6102
  $.fn.characterCounter = function(){                                                                                 // 6103
    return this.each(function(){                                                                                      // 6104
                                                                                                                      // 6105
      var itHasLengthAttribute = $(this).attr('length') !== undefined;                                                // 6106
                                                                                                                      // 6107
      if(itHasLengthAttribute){                                                                                       // 6108
        $(this).on('input', updateCounter);                                                                           // 6109
        $(this).on('focus', updateCounter);                                                                           // 6110
        $(this).on('blur', removeCounterElement);                                                                     // 6111
                                                                                                                      // 6112
        addCounterElement($(this));                                                                                   // 6113
      }                                                                                                               // 6114
                                                                                                                      // 6115
    });                                                                                                               // 6116
  };                                                                                                                  // 6117
                                                                                                                      // 6118
  function updateCounter(){                                                                                           // 6119
    var maxLength     = +$(this).attr('length'),                                                                      // 6120
    actualLength      = +$(this).val().length,                                                                        // 6121
    isValidLength     = actualLength <= maxLength;                                                                    // 6122
                                                                                                                      // 6123
    $(this).parent().find('span[class="character-counter"]')                                                          // 6124
                    .html( actualLength + '/' + maxLength);                                                           // 6125
                                                                                                                      // 6126
    addInputStyle(isValidLength, $(this));                                                                            // 6127
  }                                                                                                                   // 6128
                                                                                                                      // 6129
  function addCounterElement($input){                                                                                 // 6130
    var $counterElement = $('<span/>')                                                                                // 6131
                        .addClass('character-counter')                                                                // 6132
                        .css('float','right')                                                                         // 6133
                        .css('font-size','12px')                                                                      // 6134
                        .css('height', 1);                                                                            // 6135
                                                                                                                      // 6136
    $input.parent().append($counterElement);                                                                          // 6137
  }                                                                                                                   // 6138
                                                                                                                      // 6139
  function removeCounterElement(){                                                                                    // 6140
    $(this).parent().find('span[class="character-counter"]').html('');                                                // 6141
  }                                                                                                                   // 6142
                                                                                                                      // 6143
  function addInputStyle(isValidLength, $input){                                                                      // 6144
    var inputHasInvalidClass = $input.hasClass('invalid');                                                            // 6145
    if (isValidLength && inputHasInvalidClass) {                                                                      // 6146
      $input.removeClass('invalid');                                                                                  // 6147
    }                                                                                                                 // 6148
    else if(!isValidLength && !inputHasInvalidClass){                                                                 // 6149
      $input.removeClass('valid');                                                                                    // 6150
      $input.addClass('invalid');                                                                                     // 6151
    }                                                                                                                 // 6152
  }                                                                                                                   // 6153
                                                                                                                      // 6154
  $(document).ready(function(){                                                                                       // 6155
    $('input, textarea').characterCounter();                                                                          // 6156
  });                                                                                                                 // 6157
                                                                                                                      // 6158
}( jQuery ));                                                                                                         // 6159
                                                                                                                      // 6160
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['poetic:materialize-scss'] = {}, {
  Materialize: Materialize
});

})();
