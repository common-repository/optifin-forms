"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;
/* hex output format. 0 - lowercase; 1 - uppercase*/

var b64pad = "";
/* base-64 pad character. "=" for strict RFC compliance */

var chrsz = 8;
/* bits per input character. 8 - ASCII; 16 - Unicode*/

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */

function hex_md5(s) {
  return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}

function b64_md5(s) {
  return binl2b64(core_md5(str2binl(s), s.length * chrsz));
}

function str_md5(s) {
  return binl2str(core_md5(str2binl(s), s.length * chrsz));
}

function hex_hmac_md5(key, data) {
  return binl2hex(core_hmac_md5(key, data));
}

function b64_hmac_md5(key, data) {
  return binl2b64(core_hmac_md5(key, data));
}

function str_hmac_md5(key, data) {
  return binl2str(core_hmac_md5(key, data));
}
/*
 * Perform a simple self-test to see if the VM is working
 */


function md5_vm_test() {
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */


function core_md5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }

  return Array(a, b, c, d);
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5_cmn(q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}

function md5_ff(a, b, c, d, x, s, t) {
  return md5_cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5_gg(a, b, c, d, x, s, t) {
  return md5_cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5_hh(a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5_ii(a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
}
/*
 * Calculate the HMAC-MD5, of a key and some data
 */


function core_hmac_md5(key, data) {
  var bkey = str2binl(key);
  if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
  var ipad = Array(16),
    opad = Array(16);

  for (var i = 0; i < 16; i++) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xFFFF;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bit_rol(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */


function str2binl(str) {
  var bin = Array();
  var mask = (1 << chrsz) - 1;

  for (var i = 0; i < str.length * chrsz; i += chrsz) {
    bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
  }

  return bin;
}
/*
 * Convert an array of little-endian words to a string
 */


function binl2str(bin) {
  var str = "";
  var mask = (1 << chrsz) - 1;

  for (var i = 0; i < bin.length * 32; i += chrsz) {
    str += String.fromCharCode(bin[i >> 5] >>> i % 32 & mask);
  }

  return str;
}
/*
 * Convert an array of little-endian words to a hex string.
 */


function binl2hex(binarray) {
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";

  for (var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
  }

  return str;
}
/*
 * Convert an array of little-endian words to a base-64 string
 */


function binl2b64(binarray) {
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";

  for (var i = 0; i < binarray.length * 4; i += 3) {
    var triplet = (binarray[i >> 2] >> 8 * (i % 4) & 0xFF) << 16 | (binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4) & 0xFF) << 8 | binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4) & 0xFF;

    for (var j = 0; j < 4; j++) {
      if (i * 8 + j * 6 > binarray.length * 32) str += b64pad; else str += tab.charAt(triplet >> 6 * (3 - j) & 0x3F);
    }
  }

  return str;
}

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    module.exports = factory();
  } else {
    root.VMasker = factory();
  }
})(window, function () {
  var DIGIT = "9",
    ALPHA = "A",
    ALPHANUM = "S",
    BY_PASS_KEYS = [9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93],
    isAllowedKeyCode = function isAllowedKeyCode(keyCode) {
      for (var i = 0, len = BY_PASS_KEYS.length; i < len; i++) {
        if (keyCode == BY_PASS_KEYS[i]) {
          return false;
        }
      }

      return true;
    },
    mergeMoneyOptions = function mergeMoneyOptions(opts) {
      opts = opts || {};
      opts = {
        precision: opts.hasOwnProperty("precision") ? opts.precision : 0,
        separator: opts.separator || ",-",
        delimiter: opts.delimiter || ".",
        unit: opts.unit && opts.unit.replace(/[\s]/g, '') + " " || "",
        suffixUnit: opts.suffixUnit && " " + opts.suffixUnit.replace(/[\s]/g, '') || "",
        zeroCents: opts.zeroCents,
        lastOutput: opts.lastOutput
      };
      opts.moneyPrecision = opts.zeroCents ? 0 : opts.precision;
      return opts;
    },
    // Fill wildcards past index in output with placeholder
    addPlaceholdersToOutput = function addPlaceholdersToOutput(output, index, placeholder) {
      for (; index < output.length; index++) {
        if (output[index] === DIGIT || output[index] === ALPHA || output[index] === ALPHANUM) {
          output[index] = placeholder;
        }
      }

      return output;
    };

  var VanillaMasker = function VanillaMasker(elements) {
    this.elements = elements;
  };

  VanillaMasker.prototype.unbindElementToMask = function () {
    for (var i = 0, len = this.elements.length; i < len; i++) {
      this.elements[i].lastOutput = "";
      this.elements[i].onkeyup = false;
      this.elements[i].onkeydown = false;

      if (this.elements[i].value.length) {
        this.elements[i].value = this.elements[i].value.replace(/\D/g, '');
      }
    }
  };

  VanillaMasker.prototype.bindElementToMask = function (maskFunction) {
    var that = this,
      onType = function onType(e) {
        e = e || window.event;
        var source = e.target || e.srcElement;

        if (isAllowedKeyCode(e.keyCode)) {
          setTimeout(function () {
            that.opts.lastOutput = source.lastOutput;
            source.value = VMasker[maskFunction](source.value, that.opts);
            source.lastOutput = source.value;

            if (source.setSelectionRange && that.opts.suffixUnit) {
              source.setSelectionRange(source.value.length, source.value.length - that.opts.suffixUnit.length);
            }
          }, 0);
        }
      };

    for (var i = 0, len = this.elements.length; i < len; i++) {
      this.elements[i].lastOutput = "";
      this.elements[i].onkeyup = onType;

      if (this.elements[i].value.length) {
        this.elements[i].value = VMasker[maskFunction](this.elements[i].value, this.opts);
      }
    }
  };

  VanillaMasker.prototype.maskMoney = function (opts) {
    this.opts = mergeMoneyOptions(opts);
    this.bindElementToMask("toMoney");
  };

  VanillaMasker.prototype.maskNumber = function () {
    this.opts = {};
    this.bindElementToMask("toNumber");
  };

  VanillaMasker.prototype.maskAlphaNum = function () {
    this.opts = {};
    this.bindElementToMask("toAlphaNumeric");
  };

  VanillaMasker.prototype.maskPattern = function (pattern) {
    this.opts = {
      pattern: pattern
    };
    this.bindElementToMask("toPattern");
  };

  VanillaMasker.prototype.unMask = function () {
    this.unbindElementToMask();
  };

  var VMasker = function VMasker(el) {
    if (!el) {
      throw new Error("VanillaMasker: There is no element to bind.");
    }

    var elements = "length" in el ? el.length ? el : [] : [el];
    return new VanillaMasker(elements);
  };

  VMasker.toMoney = function (value, opts) {
    opts = mergeMoneyOptions(opts);

    if (opts.zeroCents) {
      opts.lastOutput = opts.lastOutput || "";
      var zeroMatcher = "(" + opts.separator + "[0]{0," + opts.precision + "})",
        zeroRegExp = new RegExp(zeroMatcher, "g"),
        digitsLength = value.toString().replace(/[\D]/g, "").length || 0,
        lastDigitLength = opts.lastOutput.toString().replace(/[\D]/g, "").length || 0;
      value = value.toString().replace(zeroRegExp, "");

      if (digitsLength < lastDigitLength) {
        if (opts.suffixUnit) {
          value = value.slice(0, value.length - (1 + opts.suffixUnit.length));
        } else {
          value = value.slice(0, value.length - 1);
        }
      }
    }

    var number = value.toString().replace(/[\D]/g, ""),
      clearDelimiter = new RegExp("^(0|\\" + opts.delimiter + ")"),
      clearSeparator = new RegExp("(\\" + opts.separator + ")$"),
      money = number.substr(0, number.length - opts.moneyPrecision),
      masked = money.substr(0, money.length % 3),
      cents = new Array(opts.precision + 1).join("0");
    money = money.substr(money.length % 3, money.length);

    for (var i = 0, len = money.length; i < len; i++) {
      if (i % 3 === 0) {
        masked += opts.delimiter;
      }

      masked += money[i];
    }

    masked = masked.replace(clearDelimiter, "");
    masked = masked.length ? masked : "0";

    if (!opts.zeroCents) {
      var beginCents = number.length - opts.precision,
        centsValue = number.substr(beginCents, opts.precision),
        centsLength = centsValue.length,
        centsSliced = opts.precision > centsLength ? opts.precision : centsLength;
      cents = (cents + centsValue).slice(-centsSliced);
    }

    var output = opts.unit + masked + opts.separator + cents + opts.suffixUnit;
    return output.replace(clearSeparator, "");
  };

  VMasker.toPattern = function (value, opts) {
    var pattern = _typeof(opts) === 'object' ? opts.pattern : opts,
      patternChars = pattern.replace(/\W/g, ''),
      output = pattern.split(""),
      values = value.toString().replace(/\W/g, ""),
      charsValues = values.replace(/\W/g, ''),
      index = 0,
      i,
      outputLength = output.length,
      placeholder = _typeof(opts) === 'object' ? opts.placeholder : undefined;

    for (i = 0; i < outputLength; i++) {
      // Reached the end of input
      if (index >= values.length) {
        if (patternChars.length == charsValues.length) {
          return output.join("");
        } else if (placeholder !== undefined && patternChars.length > charsValues.length) {
          return addPlaceholdersToOutput(output, i, placeholder).join("");
        } else {
          break;
        }
      } // Remaining chars in input
      else {
        if (output[i] === DIGIT && values[index].match(/[0-9]/) || output[i] === ALPHA && values[index].match(/[a-zA-Z]/) || output[i] === ALPHANUM && values[index].match(/[0-9a-zA-Z]/)) {
          output[i] = values[index++];
        } else if (output[i] === DIGIT || output[i] === ALPHA || output[i] === ALPHANUM) {
          if (placeholder !== undefined) {
            return addPlaceholdersToOutput(output, i, placeholder).join("");
          } else {
            return output.slice(0, i).join("");
          }
        }
      }
    }

    return output.join("").substr(0, i);
  };

  VMasker.toNumber = function (value) {
    return value.toString().replace(/(?!^-)[^0-9]/g, "");
  };

  VMasker.toAlphaNumeric = function (value) {
    return value.toString().replace(/[^a-z0-9 ]+/i, "");
  };

  return VMasker;
});

var clientOptifin = {};
var httpHandler = {
  _doPostRequest: function _doPostRequest(url, data, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', url, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xmlHttp.onload = function () {
      if (xmlHttp.status === 200) {
        callback(xmlHttp.responseText);
      }
    };

    xmlHttp.send(data);
  },
  _doGetRequest: function _doGetRequest(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url, true);

    xmlHttp.onload = function () {
      if (xmlHttp.status === 200) {
        callback(xmlHttp.responseText);
      }
    };

    xmlHttp.onerror = function (error) {
      console.error('Error: ', error);
      callback({});
    };

    xmlHttp.send(null);
  }
};

var vtigerOptifinClient = function vtigerOptifinClient(url) {
  this._servicebase = 'webservice.php';
  url = url + '/';
  this._serviceurl = url + this._servicebase;
  this._linkGetPicklist = url + 'apis/getPicklist.php';
  this._token = "";
  /**
   * Perform the challenge
   * @access private
   */

  this.__doChallenge = function (username, callback) {
    var queryUrl = '?operation=getchallenge&username=' + username;

    httpHandler._doGetRequest(this._serviceurl + queryUrl, callback);
  };

  this.doLogin = function (username, accesskey, callback) {
    var that = this;

    this.__doChallenge(username, function (res) {
      var response = JSON.parse(res);

      if (response.success === true) {
        var body = 'operation=login&username=' + encodeURIComponent(username) + '&accessKey=' + hex_md5(response.result.token + accesskey);

        httpHandler._doPostRequest(that._serviceurl, body, function (data) {
          var r = JSON.parse(data);
          clientOptifin._sessionid = r.result.sessionName;
          clientOptifin._userid = r.result.userId;

          if (typeof callback === "function") {
            callback();
          }
        });
      }
    });
  };

  this.getPickListOptions = function (module, field, username, accessKey, callback) {
    var body = 'operation=describe&sessionName=' + encodeURIComponent(clientOptifin._sessionid) + '&elementType=' + module;
    httpHandler._doPostRequest(this._serviceurl, body, function (response) {
      if (typeof callback === "function") {
        var result = {};

        try {
          result = JSON.parse(response);
          console.log(result);
        } catch (e) {
          console.error(e);
        }

        jQuery.each(result.result.fields, function(k, v) {
          if(v.name == field) {
            result = [];
            jQuery.each(v.type.picklistValues, function(k, v) {
              result.push(v.value);
              //result.push('<option value="'+v.value+'">'+v.label+'</option>');
            });
          }
        });
        callback(result);
      }
    });

  };

  this.doCreate = function (module, data, callback) {
    var body = 'operation=create&sessionName=' + encodeURIComponent(clientOptifin._sessionid) + '&elementType=' + module + '&element=' + JSON.stringify(data);

    if (data.assigned_user_id) {
      body += "&overwriteAssignee=true";
    } else {
      data['assigned_user_id'] = clientOptifin._userid;
      body = 'operation=create&sessionName=' + encodeURIComponent(clientOptifin._sessionid) + '&elementType=' + module + '&element=' + JSON.stringify(data) + "&overwriteAssignee=false";
    }

    httpHandler._doPostRequest(this._serviceurl, body, function (response) {
      callback(response);
    });
  };
};

'use strict';

var texts = {
  headText: {
    title: "JETZT UNVERBINDLICH ANFRAGEN",
    subtitle: "Kostenlos und unabhängig - wir vergleichen Sie entscheiden"
  },
  formText: {
    topText: "Nachdem unser Finanzierungsspezialist alle Unterlagen erhalten hat, kümmert er sich um den Rest und sucht das beste Finanzierungsangebot für Sie. Erst wenn Sie sich für ein Angebot entschieden haben, kommt ein Geschäft zwischen Ihnen und der Bank zustande.",
    form: {
      h3_one: "ANGABEN ZUR FINANZIERUNG",
      field_1: {
        placeholder: "Finanzierungssumme",
        error_message: "Bitte geben Sie die Finanzierungssumme an.",
        name: "cf_financing_demand",
        popup_content: "Bitte geben Sie hier die gesamte Finanzierungssumme an, also den gesamten Projektpreis ohne Eigenmittel."
      },
      field_2: {
        placeholder: "Eigenmittel",
        error_message: "Bitte geben Sie Ihr Eigenkapital an.",
        name: "cf_own_funds",
        popup_content: "Bitte geben Sie hier die Summe an Eigenmitteln an, die Sie in die Finanzierung einbringen können."
      },
      h3_two: "IHRE KONTAKTDATEN",
      field_3: {
        placeholder: "Anrede",
        error_message: "Bitte wählen Sie eine Anrede.",
        name: "cf_title",
        values: ["Herr", "Frau"]
      },
      field_4: {
        placeholder: "Vorname",
        error_message: "Bitte tragen Sie Ihren Vornamen ein.",
        name: "firstname"
      },
      field_5: {
        placeholder: "Nachname",
        error_message: "Bitte tragen Sie Ihren Nachnamen ein.",
        name: "lastname"
      },
      field_6: {
        placeholder: "E-Mail",
        error_message: "Bitte geben Sie eine korrekte Mail Adresse an.",
        name: "email"
      },
      field_7: {
        placeholder: "Bundesland",
        error_message: "Bitte wählen Sie ein Bundesland, indem die Beratung stattfinden soll.",
        name: "cf_state",
        popup_content: "Bitte wählen Sie hier das Bundesland, in dem die Beratung stattfinden soll. Digitale Beratung ist auch möglich und wird einem Kollegen vor Ort zugeteilt.",
        values: ["Burgenland", "Kärnten", "Niederösterreich", "Oberösterreich", "Salzburg", "Steiermark", "Tirol", "Vorarlberg", "Wien", "Sonstiges"]
      },
      h3_third: "Ihre Wünsche zur Beratung",
      field_8: {
        placeholder: "gewünschte Kontaktaufnahme",
        error_message: "Bitte geben Sie an, wie Sie kontaktiert werden möchten.",
        name: "cf_contacting_type",
        values: ["Telefonische Beratung", "Persönlichen Beratungstermin vereinbaren", "Beratung per E-Mail", "Beratung per WhatsApp"]
      },
      field_8_1: {
        placeholder: "Vorhaben",
        error_message: "Bitte geben Sie ihr Vorhaben an.",
        name: "cf_intent",
        popup_content: "Wofür wird die Finanzierung benötigt?",
        values: ["Kauf einer Immobilie", "Bau einer Immobilie", "Umbau / Modernisierung", "Umschuldung", "Vorsorge", "Sonstiges"]
      },
      field_8_2: {
        placeholder: "Immobilienart",
        error_message: "Bitte geben Sie ihre Immobilienart an.",
        name: "cf_property_type",
        values: ["Eigentumswohnung", "Haus", "Nur Grundstück", "Vorsorgewohnung", "Zinshaus", "Ferienhaus", "Sonstiges"]
      },
      field_8_3: {
        placeholder: "Status der Immobilie",
        error_message: "Bitte geben Sie den Status ihrer Immobilie an.",
        name: "cf_769",
        popup_content: "Suchen Sie noch oder haben Sie bereits eine Immobilie gefunden?",
        values: ["Immobiliensuche", "Immobilie gefunden", "Bestandsimmobilie", "Allgemeine Anfrage"]
      },
      field_9: {
        values: ["Telefonische Beratung", "Beratung vor Ort", "Per E-Mail"],
        error_message: "Bitte geben Sie an, wie Sie kontaktiert werden möchten.",
        name: "cf_contacting_type"
      },
      field_10: {
        placeholder: "Wann sind Sie telefonisch am besten erreichbar?",
        values: ["Vormittag", "Nachmittag", "Abend", "Ganztags"],
        name: "cf_phone_availability",
        error_message: "Bitte geben Sie an, wann Sie kontaktiert werden möchten. Konkrete Uhrzeiten bitte im Nachrichtenfeld unten angeben."
      },
      field_11: {
        placeholder: "Ihre Telefonnummer",
        error_message: "Bitte geben Sie eine korrekte Telefonnummer an.",
        name: "phone"
      },
      field_12: {
        placeholder: "Ihr Terminvorschlag oder Wünsche für die Beratung?",
        error_message: "",
        description_start: "Noch Platz für",
        max_counts: 4000,
        description_end: "Zeichen",
        name: "description"
      },
      field_13: {
        placeholder: "Ich bin mit dem Empfang von Informationen zur Finanzierung einverstanden",
        name: "cf_1028",
      },
      btn_text: "JETZT ABSENDEN"
    }
  },
  results: {
    top_text: "Vielen Dank für Ihre Anfrage!",
    top_header: "Was geschieht als Nächstes?",
    middle_text: "Anhand Ihrer Eingaben wird Ihre Anfrage an einen unserer Mitarbeiter weitergeleitet.",
    middle_second_text: "Dieser wird sich so schnell wie möglich mit Ihnen in Verbindung setzen, um ein persönliches Gespräch zu vereinbaren.",
    middle_third_text: "Sollten Sie inzwischen bereits Fragen dazu haben, können Sie uns gerne telefonisch oder per Mail kontaktieren.",
    telephone_text: "Telefon:",
    telephone: "0800 999 195",
    telephone_href: "0800999195",
    mail_text: "Mail:",
    mail: "info@optifin.at",
    bottom_text: "Wir freuen uns auf unser Gespräch!",
    bottom_text_second: "Ihr optifin.at Team"
  }
};
var textsShort = {
  headText: {
    title: "JETZT UNVERBINDLICH ANFRAGEN",
    subtitle: "Kostenlos und unabhängig - wir vergleichen Sie entscheiden"
  },
  formText: {
    topText: "Nachdem unser Finanzierungsspezialist alle Unterlagen erhalten hat, kümmert er sich um den Rest und sucht das beste Finanzierungsangebot für Sie. Erst wenn Sie sich für ein Angebot entschieden haben, kommt ein Geschäft zwischen Ihnen und der Bank zustande.",
    form: {
      h3_one: "ANGABEN ZUR FINANZIERUNG",
      field_1: {
        placeholder: "Finanzierungssumme",
        error_message: "Bitte geben Sie die Finanzierungssumme an.",
        name: "cf_financing_demand",
        popup_content: "Bitte geben Sie hier die gesamte Finanzierungssumme an, also den gesamten Projektpreis ohne Eigenmittel."
      },
      field_2: {
        placeholder: "Eigenmittel",
        error_message: "Bitte geben Sie Ihr Eigenkapital an.",
        name: "cf_own_funds",
        popup_content: "Bitte geben Sie hier die Summe an Eigenmitteln an, die Sie in die Finanzierung einbringen können."
      },
      h3_two: "ANREDE",
      field_3: {
        placeholder: "Anrede",
        error_message: "Bitte wählen Sie eine Anrede",
        name: "cf_title",
        values: ["Herr", "Frau"]
      },
      field_4: {
        placeholder: "Name",
        error_message: "Bitte tragen Sie Ihren Vornamen ein.",
        name: "firstname"
      },
      field_5: {
        placeholder: "Nachname",
        error_message: "Bitte tragen Sie Ihren Nachnamen ein.",
        name: "lastname"
      },
      field_6: {
        placeholder: "E-Mail",
        error_message: "Bitte geben Sie eine korrekte Mail Adresse an.",
        name: "email"
      },
      field_7: {
        placeholder: "Bundesland",
        error_message: "Bitte wählen Sie ein Bundesland, indem die Beratung stattfinden soll.",
        name: "cf_state",
        popup_content: "Bitte wählen Sie hier das Bundesland, in dem die Beratung stattfinden soll. Digitale Beratung ist auch möglich und wird einem Kollegen vor Ort zugeteilt.",
        values: ["Burgenland", "Kärnten", "Niederösterreich", "Oberösterreich", "Salzburg", "Steiermark", "Tirol", "Vorarlberg", "Wien", "Sonstiges"]
      },
      field_8: {
        placeholder: "Art der Kontaktaufnahme",
        error_message: "gewünschte Kontaktaufnahme",
        name: "cf_contacting_type",
        values: ["Telefonische Beratung", "Persönlichen Beratungstermin vereinbaren", "Beratung per E-Mail", "Beratung per WhatsApp"]
      },
      h3_third: "Ihre Wünsche zur Beratung",
      field_9: {
        values: ["Telefonische Beratung", "Beratung vor Ort", "Per E-Mail"],
        error_message: "Bitte geben Sie an, wie Sie kontaktiert werden möchten.",
        name: "cf_contacting_type"
      },
      field_10: {
        placeholder: "Wann sind Sie telefonisch am besten erreichbar?",
        values: ["Vormittag", "Nachmittag", "Abend", "Ganztags"],
        name: "cf_phone_availability",
        error_message: "Bitte geben Sie an, wann Sie kontaktiert werden möchten. Konkrete Uhrzeiten bitte im Nachrichtenfeld unten angeben."
      },
      field_11: {
        placeholder: "Telefon",
        error_message: "Bitte geben Sie eine korrekte Telefonnummer an.",
        name: "phone"
      },
      field_12: {
        placeholder: "Ihre Nachricht",
        error_message: "",
        description_start: "Noch Platz für",
        max_counts: 4000,
        description_end: "Zeichen",
        name: "description"
      },
      field_13: {
        placeholder: "Ich bin mit dem Empfang von Informationen zur Finanzierung einverstanden",
        name: "test"
      },
      btn_text: "JETZT ABSENDEN"
    }
  },
  results: {
    top_text: "Vielen Dank für Ihre Anfrage!",
    top_header: "Was geschieht als Nächstes?",
    middle_text: "Anhand Ihrer Eingaben wird Ihre Anfrage an einen unserer Mitarbeiter weitergeleitet.",
    middle_second_text: "Dieser wird sich so schnell wie möglich mit Ihnen in Verbindung setzen, um ein persönliches Gespräch zu vereinbaren.",
    middle_third_text: "Sollten Sie inzwischen bereits Fragen dazu haben, können Sie uns gerne telefonisch oder per Mail kontaktieren.",
    telephone_text: "Telefon:",
    telephone: "0800 999 195",
    telephone_href: "0800999195",
    mail_text: "Mail:",
    mail: "info@optifin.at",
    bottom_text: "Wir freuen uns auf unser Gespräch!",
    bottom_text_second: "Ihr optifin.at Team"
  }
};
var vtigerClient;
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var proneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
var regularSymbol = /\,|\.|\-|\–|\\|\+|\/|\(|\)|\=|\[|\]/g;
var emailRegExpr = /\S+@\S+\.\S+/;
var pluginDir = document.currentScript.src.split('js/inquiry.js')[0];
var imgDir = pluginDir + 'img/';
var fontUrl = pluginDir+'css/proximanova.css';
var formTemplate = '<div class="g-form-container">' + '<form class="g-form">' + '<div id="optifin-main-title" class="g-form__head">' + '<h3 class="form-headline">Jetzt unverbindlich anfragen &amp; Top-Konditionen sichern</h3> <p>Wofür benötigen Sie einen Kredit?</p>' + '</div> <span id="form_inner"></span>' + '</form></div>';
var step1 = "<div data-step=\"0\" class=\"g-form__step\">\n<h3>Finanzierungsobjekt *</h3>\n\n<ul class=\"financing-object\">\n<li class=\"financing-object__item\">\n<div class=\"financing-object__inner\">\n<input type=\"radio\" value=\"Haus\" name=\"cf_property_type\" class=\"financing-object__radio\">\n<div class=\"financing-object__cont\">\n<div>\n<img src=\""+ imgDir + "haus.png\">\n<h3>Haus</h3>\n</div>\n</div>\n</div>\n</li>\n\n<li class=\"financing-object__item\">\n<div class=\"financing-object__inner\">\n<input type=\"radio\" value=\"Wohnung\" name=\"cf_property_type\" class=\"financing-object__radio\">\n<div class=\"financing-object__cont\">\n<div>\n<img src=\"" + imgDir + "wohnung.png\">\n<h3>Wohnung</h3>\n</div>\n</div>\n</div>\n</li>\n\n<li class=\"financing-object__item\">\n<div class=\"financing-object__inner\">\n<input type=\"radio\" value=\"Nur Grundstück\" name=\"cf_property_type\" class=\"financing-object__radio\">\n<div class=\"financing-object__cont\">\n<div>\n<img src=\"" + imgDir + "nurgrundstück.png\">\n<h3>Nur Grundstück</h3>\n</div>\n</div>\n</div>\n</li>\n\n<li class=\"financing-object__item\">\n<div class=\"financing-object__inner\">\n<input type=\"radio\" name=\"cf_property_type\"value=\"Ferienhaus\" class=\"financing-object__radio\">\n<div class=\"financing-object__cont\">\n<div>\n<img src=\"" + imgDir + "ferienhaus.png\">\n<h3>Ferienhaus</h3>\n</div>\n</div>\n</div>\n</li>\n\n<li class=\"financing-object__item\">\n<div class=\"financing-object__inner\">\n<input type=\"radio\"value=\"Zinshaus\"name=\"cf_property_type\" class=\"financing-object__radio\">\n<div class=\"financing-object__cont\">\n<div>\n<img src=\"" + imgDir + "zinshaus.png\">\n<h3>Zinshaus</h3>\n</div>\n</div>\n</div>\n</li>\n\n<li class=\"financing-object__item\">\n<div class=\"financing-object__inner\">\n<input type=\"radio\" value=\"Sonstiges\" name=\"cf_property_type\" class=\"financing-object__radio\">\n<div class=\"financing-object__cont\">\n<div>\n<img src=\"" + imgDir + "sonstiges.png\">\n<h3>Sonstiges</h3>\n</div>\n</div>\n</div>\n</li>\n</ul>\n\n<div class=\"g-form__footer\">\n<a href=\"\" class=\"col-auto ml-auto g-form-next\">Weiter</a>\n</div>\n</div>";
var step2 = "<div data-step=\"1\" class=\"g-form__step\">\n<div class=\"g-grid\">\n<div class=\"g-grid__item\">\n<div class=\"g-form-row\">\n<div class=\"g-form-row__head\">\n<label for=\"g-form-1\" class=\"g-form-row__label\">Finanzierungssumme *</label>\n<div class=\"g-form-row__error-text\">Dieses Feld ist erforderlich.</div>\n</div>\n\n<div class=\"g-form-row__input-w\">\n<input type=\"text\" name=\"cf_financing_demand\" class=\"g-form-row__input\" id=\"g-form-1\" placeholder=\"z.B.: 200.000,- €\">\n</div>\n\n<div class=\"g-form-row__hint\">Geben Sie hier die gewünschte Finanzierungssumme ein.</div>\n\n</div>\n</div>\n\n<div class=\"g-grid__item\">\n<div class=\"g-form-row\">\n<div class=\"g-form-row__head\">\n<label for=\"g-form-2\" class=\"g-form-row__label\">Eigenmittel *</label>\n<div class=\"g-form-row__error-text\">Dieses Feld ist erforderlich.</div>\n</div>\n\n<div class=\"g-form-row__input-w\">\n<input type=\"text\" name=\"cf_own_funds\" class=\"g-form-row__input\" id=\"g-form-2\" placeholder=\"z.B.: 50.000,- €\">\n</div>\n\n<div class=\"g-form-row__hint\">Wie hoch ist die Summe der Eigenmittel, die Sie in die Finanzierung einbringen\nmöchten?\n</div>\n\n</div>\n</div>\n\n<div class=\"g-grid__item\">\n<div class=\"g-form-row\">\n<div class=\"g-form-row__head\">\n<label for=\"g-form-3\" class=\"g-form-row__label\">Vorhaben *</label>\n<div class=\"g-form-row__error-text\">Dieses Feld ist erforderlich.</div>\n</div>\n\n<div class=\"g-form-row__select-w\">\n<select name=\"cf_intent\" id=\"g-form-3\" class=\"g-form-row__select\">\n<option value=\"Kauf einer Immobilie\" selected=\"selected\">Kauf einer Immobilie</option>\n<option value=\"Bau einer Immobilie\">Bau einer Immobilie</option>\n<option value=\"Umbau / Modernisierung\">Umbau / Modernisierung</option>\n<option value=\"Umschuldung\">Umschuldung</option>\n<option value=\"Vorsorge\">Vorsorge</option>\n<option value=\"Sonstiges\">Sonstiges</option>\n</select>\n</div>\n</div>\n</div>\n\n<div class=\"g-grid__item\">\n<div class=\"g-form-row\">\n<div class=\"g-form-row__head\">\n<label for=\"g-form-4\" class=\"g-form-row__label\">Immobilienstandort *</label>\n<div class=\"g-form-row__error-text\">Dieses Feld ist erforderlich.</div>\n</div>\n\n<div class=\"g-form-row__select-w\">\n<select name=\"cf_state\" id=\"g-form-4\" class=\"g-form-row__select\">\n<option value=\"Burgenland\" selected=\"selected\">Burgenland</option><option value=\"Kärnten\">Kärnten</option><option value=\"Niederösterreich\">Niederösterreich</option><option value=\"Oberösterreich\">Oberösterreich</option><option value=\"Salzburg\">Salzburg</option><option value=\"Steiermark\">Steiermark</option><option value=\"Tirol\">Tirol</option><option value=\"Vorarlberg\">Vorarlberg</option><option value=\"Wien\">Wien</option><option value=\"Sonstiges\">Sonstiges</option></select>\n</div>\n\n<div class=\"g-form-row__hint\">(Bundesland der Immobilie)</div>\n</div>\n</div>\n</div>\n\n<div class=\"g-form__footer\">\n<a href=\"\" class=\"col-auto g-form-back\">Zurück</a>\n<a href=\"\" class=\"col-auto ml-auto g-form-next\">Weiter</a>\n</div>\n</div>";
var step3 = "<div data-step=\"2\" class=\"g-form__step\">\n<div class=\"g-grid\">\n<div class=\"g-grid__item\">\n<div class=\"g-form-row\">\n<div class=\"g-form-row__head\">\n<label for=\"g-form-5\" class=\"g-form-row__label\">Anrede *</label>\n<div class=\"g-form-row__error-text\">Dieses Feld ist erforderlich.</div>\n</div>\n\n<div class=\"g-form-row__select-w\">\n<select name=\"cf_title\" id=\"g-form-5\" class=\"g-form-row__select\">\n<option value=\"Herr\" selected=\"selected\">Herr</option>\n<option value=\"Frau\">Frau</option>\n</select>\n</div>\n</div>\n</div>\n\n<div class=\"g-grid__item\">\n\n</div>\n\n<div class=\"g-grid__item\">\n<div class=\"g-form-row\">\n<div class=\"g-form-row__head\">\n<label for=\"g-form-6\" class=\"g-form-row__label\">Vorname *</label>\n<div class=\"g-form-row__error-text\">Dieses Feld ist erforderlich.</div>\n</div>\n\n<div class=\"g-form-row__input-w\">\n<input type=\"text\" class=\"g-form-row__input\" name=\"firstname\" id=\"g-form-6\" placeholder=\"\">\n</div>\n</div>\n</div>\n\n<div class=\"g-grid__item\">\n<div class=\"g-form-row\">\n<div class=\"g-form-row__head\">\n<label for=\"g-form-7\" class=\"g-form-row__label\">Nachname *</label>\n<div class=\"g-form-row__error-text\">Dieses Feld ist erforderlich.</div>\n</div>\n\n<div class=\"g-form-row__input-w\">\n<input name=\"lastname\" type=\"text\" class=\"g-form-row__input\" id=\"g-form-7\" placeholder=\"\">\n</div>\n</div>\n</div>\n\n<div class=\"g-grid__item\">\n<div class=\"g-form-row\">\n<div class=\"g-form-row__head\">\n<label for=\"g-form-8\" class=\"g-form-row__label\">E-Mail *</label>\n<div class=\"g-form-row__error-text\">Dieses Feld ist erforderlich.</div>\n</div>\n\n<div class=\"g-form-row__input-w\">\n<input name=\"email\" type=\"text\" class=\"g-form-row__input is-email\" id=\"g-form-8\" placeholder=\"\">\n</div>\n</div>\n</div>\n\n\n<div class=\"g-grid__item\">\n<div class=\"g-form-row\">\n<div class=\"g-form-row__head\">\n<label for=\"g-form-9\" class=\"g-form-row__label\">Telefon *</label>\n<div class=\"g-form-row__error-text\">Dieses Feld ist erforderlich.</div>\n</div>\n\n<div class=\"g-form-row__input-w\">\n<input type=\"text\" name=\"phone\" class=\"g-form-row__input\" id=\"g-form-9\" placeholder=\"\">\n</div>\n</div>\n</div>\n</div>\n\n<div class=\"g-form__footer\">\n<a href=\"\" class=\"col-auto g-form-back\">Zurück</a>\n <input type=\"hidden\" name=\"leadstatus\" value=\"unbearbeitet\" /><button type=\"submit\" class=\"col-auto ml-auto g-form-next\">Finanzierungsanfrage absenden</buttton>\n</div>\n</div>";
var finalResult = "<div data-step=\"3\" class=\"g-form__step g-form__last-step\">\n <p>Vielen Dank für Ihre Anfrage!</p> <h2>Was geschieht als Nächstes?</h2><br>\nAnhand Ihrer Eingaben wird Ihre Anfrage an einen unserer Mitarbeiter weitergeleitet.<br>\nDieser wird sich so schnell wie möglich mit Ihnen in Verbindung setzen, um ein persönliches Gespräch zu vereinbaren.<br>\n<br>\nSollten Sie inzwischen bereits Fragen dazu haben, können Sie uns gerne telefonisch oder per Mail kontaktieren.<br>\n<br>\nTelefon:&nbsp;<a href=\"tel:+43800999195\">0800 999 195</a><br>\nMail:&nbsp;<a href=\"mailto:info@optifin.at\">info@optifin.at</a><br>\n<br>\nWir freuen uns auf unser Gespräch!<br>\nIhr optifin.at Team\n</div>";
var header = '<div class="g-form-header">' + '<div class="offert-logo">' + '<img src="' + imgDir + 'logo-klein.png" alt="optifin-logo-klein" class="offert-logo-img">' + '</div></div>';
var steps = '<div class="g-form-steps">' + '<div id="gf_step_4_1" class="g-form-step g-form-step-active gf_step_first"><span class="gf_step_number">1</span>&nbsp;<span class="gf_step_label">Immobilie</span></div>' + '<div id="gf_step_4_2" class="g-form-step gf_step_next gf_step_pending"><span class="gf_step_number">2</span>&nbsp;<span class="gf_step_label">Finanzierung</span></div>' + ' <div id="gf_step_4_3" class="g-form-step gf_step_last gf_step_pending"><span class="gf_step_number">3</span>&nbsp;<span class="gf_step_label">Kontakt</span></div>' + '<div class="gf_step_clear"></div></div>';
var footer = '<div class="g-form-footer">' + '<div class="g-form-footer-item-wrapper wider">' + '<div class="g-form-footer-item">' + '<h4 class="g-form-footer-title">Persönlich &amp; Regional</h4>' + '<p>Über 30 Finanzierungsspezialisten in ganz Österreich.</p>' + '</div>' + '</div>' + '<div class="g-form-footer-item-wrapper">' + '<div class="g-form-footer-item">' + '<h4 class="g-form-footer-title">Ungebunden &amp; Transparent</h4>' + '<p>Über 80 Banken im direkten Vergleich.</p>' + '</div>' + '</div>' + '<div class="g-form-footer-item-wrapper">' + '<div class="g-form-footer-item">' + '<h4 class="g-form-footer-title">Professionell &amp; Kompetent</h4>' + '<p>Über 30 Jahre Erfahrung.</p>' + '</div>' + '</div>' + '</div>';
var defaultOptions = {
  selector: '#optifin-form',
  showHeader: true,
  showNavHeader: true,
  showFooter: true,
  partnerId: 'optifin',
  partnerUrl: 'optifin',
  typeForm: "long_form_2",
  legaltext: true,
  styleDropdown: true
};
var firstForm = true;
var firstLongForm1 = true;
var firstOurForm = true;
var maskers = [];
var flagGetOptions = false;
var selectOptions = {
  cf_state: [],
  cf_phone_availability: []
};
vtigerClient = new vtigerOptifinClient('https://optifin.crm-server.net/');
vtigerClient.doLogin('optifin_webservice', 'hfuGpTMAp1JLAFAK', function () {
  var promises = [];
  promises.push(new Promise(function (resolve, reject) {
    vtigerClient.getPickListOptions("Leads", "cf_state", 'optifin_webservice', 'hfuGpTMAp1JLAFAK', function (response) {
      if (Object.keys(response).length) {
        selectOptions["cf_state"] = Object.values(response);
      }

      resolve('done');
    });
  }));
  promises.push(new Promise(function (resolve, reject) {
    vtigerClient.getPickListOptions("Leads", "cf_phone_availability", 'optifin_webservice', 'hfuGpTMAp1JLAFAK', function (response) {
      if (Object.keys(response).length) {
        selectOptions["cf_phone_availability"] = Object.values(response);
      }

      resolve('done');
    });
  }));
  Promise.all(promises).then(function () {
    flagGetOptions = true;
  });
});
var timeout;

function buildOptifinForm(options) {
  var url_string = window.location.href
  var url = new URL(url_string);
  var finsum = url.searchParams.get("finsum") || window.finsum;
  var eigenm = url.searchParams.get("eigenm");
  var vorname = url.searchParams.get("vorname");
  var nachname = url.searchParams.get("nachname");
  var anrede = url.searchParams.get("anrede");
  var email = url.searchParams.get("email");
  var bundesland = url.searchParams.get("bundesland");
  var telefon = url.searchParams.get("telefon");
  if (finsum) {
    options["finsum"] = finsum;
  }
  if (eigenm) {
    options["eigenm"] = eigenm;
  }
  if (vorname) {
    options["vorname"] = vorname;
  }
  if (nachname) {
    options["nachname"] = nachname;
  }
  if (anrede) {
    options["anrede"] = anrede;
  }
  if (email) {
    options["email"] = email;
  }
  if (bundesland) {
    options["bundesland"] = bundesland;
  }
  if (telefon) {
    options["telefon"] = telefon;
  }

  for (var option in defaultOptions) {
    options[option] = typeof options[option] !== "undefined" ? options[option] : defaultOptions[option];
  }

  var self = this;
  this.options = options;
  this.id = generateId();
  this.wrapperFrom = document.querySelector(this.options.selector);
  this.form = document.createElement('div');
  this.form.setAttribute('id', 'data-form-id-' + this.id);
  this.wrapperFrom.appendChild(this.form);

  this.initForm = function () {
    if (firstForm) {
      var font = document.createElement('link');
      font.setAttribute('rel', 'stylesheet');
      font.setAttribute('href', fontUrl);
      document.head.appendChild(font);
    }

    if (this.options.typeForm === "long_form_1") {

      var style = document.createElement('style');
      style.innerHTML = generateCSSLongForm11(self.id);
      document.body.appendChild(style);
      generateHTMLLongForm1(self.options);

      var inputFinsum = self.form.querySelector("input[name=\"cf_financing_demand\"]");
      if (options["finsum"]) {
        inputFinsum.value = parseToCurrencyString(options["finsum"]);
      }
      var inputEigenm = self.form.querySelector("input[name=\"cf_own_funds\"]");
      if (options["eigenm"]) {
        inputEigenm.value = parseToCurrencyString(options["eigenm"]);
      }
      inputFinsum.addEventListener('blur', formatCurrency, false);
      inputEigenm.addEventListener('blur', formatCurrency, false);
      inputFinsum.addEventListener('focus', clearFormatCurrency, false);
      inputEigenm.addEventListener('focus', clearFormatCurrency, false);

      var selectBundesland = self.form.querySelector("select[name=\"cf_state\"]");
      if (options["bundesland"]) {
        selectBundesland.value = options["bundesland"];
      }
      var selectAnrede = self.form.querySelector("select[name=\"cf_title\"]");
      if (options["anrede"]) {
        selectAnrede.value = options["anrede"];
      }
      var inputVorname = self.form.querySelector("input[name=\"firstname\"]");
      if (options["vorname"]) {
        inputVorname.value = options["vorname"];
      }
      var inputNachname = self.form.querySelector("input[name=\"lastname\"]");
      if (options["nachname"]) {
        inputNachname.value = options["nachname"];
      }
      var inputEmail = self.form.querySelector("input[name=\"email\"]");
      if (options["email"]) {
        inputEmail.value = options["email"];
      }
      var inputTelefon = self.form.querySelector("input[name=\"phone\"]");
      if (options["telefon"]) {
        inputTelefon.value = options["telefon"];
      }

      enableMasker(self.id);
      firstLongForm1 = false;
      firstForm = false;
      var phones = self.form.querySelectorAll('[name="phone"]');

      for (var i = 0; i < phones.length; i++) {
        phones[i].addEventListener('change', phoneNumber);
        phones[i].addEventListener('keypress', phoneNumber);
        phones[i].addEventListener('keyup', phoneNumber);
        phones[i].addEventListener('keydown', phoneNumber);
      }
    } else {

      var style = document.createElement('style');
      style.innerHTML = generateCSS(self.id);
      document.body.appendChild(style);
      self.form.innerHTML = generateTemplate(self.options);

      if (options.showHeader) {
        var container = self.form.querySelector('.g-form-container');
        var headerContainer = document.createElement('div');
        headerContainer.innerHTML = generateHeaderFormContent();
        container.insertBefore(headerContainer, container.firstChild);
      }

      var inputFinsum = self.form.querySelector("input[name=\"cf_financing_demand\"]");
      if (inputFinsum && options["finsum"]) {
        inputFinsum.value = parseToCurrencyString(options["finsum"]);

        inputFinsum.addEventListener('blur', formatCurrency, false);
        inputFinsum.addEventListener('focus', clearFormatCurrency, false);
      }
      var inputEigenm = self.form.querySelector("input[name=\"cf_own_funds\"]");
      if (inputEigenm && options["eigenm"]) {
        inputEigenm.value = parseToCurrencyString(options["eigenm"]);
        inputEigenm.addEventListener('blur', formatCurrency, false);
        inputEigenm.addEventListener('focus', clearFormatCurrency, false);
      }

      var inputBundesland = self.form.querySelector("input[name=\"cf_state\"]");
      if (inputBundesland && options["bundesland"]) {
        inputBundesland.value = options["bundesland"];
      }
      var inputsAnrede = self.form.querySelectorAll("input[name=\"cf_title\"][type=\"radio\"]");
      if (inputsAnrede && options["anrede"]) {
        inputsAnrede.forEach(function (input) {
          if(input.value===options["anrede"]){
            input.checked=true;
          }
        });
      }
      var inputVorname = self.form.querySelector("input[name=\"firstname\"]");
      if (inputVorname && options["vorname"]) {
        inputVorname.value = options["vorname"];
      }
      var inputNachname = self.form.querySelector("input[name=\"lastname\"]");
      if (inputNachname && options["nachname"]) {
        inputNachname.value = options["nachname"];
      }
      var inputEmail = self.form.querySelector("input[name=\"email\"]");
      if (inputEmail && options["email"]) {
        inputEmail.value = options["email"];
      }
      var inputTelefon = self.form.querySelector("input[name=\"phone\"]");
      if (inputTelefon && options["telefon"]) {
        inputTelefon.value = options["telefon"];
      }


      enableMasker(self.id);

      firstForm = false;
      firstOurForm = false;

      var forms = self.form.querySelectorAll('.g-form-wrapper');

      for (var i = 0; i < forms.length; i++) {
        var form = forms[i];
        form = form.querySelector('form');
        form.addEventListener('submit', function (e) {
          e.preventDefault();

          if (validateForm(e.target)) {
            var obj = {};
            var formData = new FormData(e.target);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = formData.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var pair = _step.value;

                if (pair[1]) {
                  obj[pair[0]] = pair[1];
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            if (obj['cf_financing_demand']) {
              // obj['cf_financing_demand'] = parseInt(obj['cf_financing_demand'].replace(/[,.' '€]/g, '')) / 100;
              obj['cf_financing_demand'] = parseInt(obj['cf_financing_demand'].replace(/[,.' '€]/g, ''));
            }

            if (obj['cf_own_funds']) {
              // obj['cf_own_funds'] = parseInt(obj['cf_own_funds'].replace(/[,.' '€]/g, '')) / 100;
              obj['cf_own_funds'] = parseInt(obj['cf_own_funds'].replace(/[,.' '€]/g, ''));
            }

            if (self.options.assigned_user_id) {
              obj['assigned_user_id'] = self.options.assigned_user_id;
            }

            obj['cf_1006'] = self.options.typeForm;
            obj['leadstatus'] = "unbearbeitet";
            obj['partnerid'] = 1;
            obj['source'] = 'WEBSERVICE';
            obj['cf_opti_pid'] = self.options.partnerId;
            obj['cf_partner_ref'] = self.options.partnerUrl;
            obj['cf_partner_url'] = self.options.partnerUrl;
            if(obj['cf_1028']) {
              obj['cf_1028'] = 'Yes';
            }
            vtigerClient.doCreate('Leads', obj, showResults.bind(this, e.target));
          } else {
            return false;
          }
        });
        checkTabRowHeight(form);
        window.addEventListener('resize', function () {
          checkTabRowHeight(form);
        });
        var inputs = form.elements;

        for (var j = 0; j < inputs.length; j++) {
          var input = inputs[j];
          checkInput(input, true);
          setTimeout(function (input) {
            checkInput(input, true);
          }, 100, input);
          input.addEventListener("focusin", checkFocusScroll);
          input.addEventListener('change', checkInput);
          input.addEventListener('keypress', checkInputSymbol);
          input.addEventListener('keyup', checkInputSymbol);
          input.addEventListener('keydown', checkInputSymbol);
        }

        var allSelectWithSearch = form.querySelectorAll('.with-variants input');

        for (var j = 0; j < allSelectWithSearch.length; j++) {
          allSelectWithSearch[j].addEventListener("focusin", function () {
            this.closest('.with-variants').classList.add('focused');
          });
          allSelectWithSearch[j].addEventListener("focusout", function () {
            this.closest('.with-variants').classList.remove('focused');
          });
        }

        var variants = form.querySelectorAll('.variants li');

        for (var o = 0; o < variants.length; o++) {
          var variant = variants[o];
          variant.addEventListener('click', function (e) {
            var input = e.target.closest('.with-variants').querySelector('input');
            input.value = e.currentTarget.getAttribute('data-value');
            var event = new CustomEvent('change', {});
            input.dispatchEvent(event);
            setTimeout(function (input) {
              checkInput(input);
            }, 100, input);
            checkInput(input);
            input.blur();
            checkInputSymbol({
              target: input
            });
          });
        }
      }

      var fieldTypePhone = form.querySelector('[name="cf_contacting_type"]');

      if (fieldTypePhone) {
        fieldTypePhone.addEventListener('change', function (e) {
          var phone = form.querySelector('[name="phone"]');
          var selectTab = form.querySelector('.select-tab');
          var propertyType = form.querySelector('[name="cf_property_type"]');
          var stateOfProperty = form.querySelector('[name="cf_769"]');
          var purpose = form.querySelector('[name="cf_intent"]');

          if (phone) {
            if (e.target.value === "Beratung per E-Mail") {
              // || e.target.value === "Beratung per WhatsApp"
              phone.closest('.g-form-field').classList.add('hidden');
            } else {
              phone.closest('.g-form-field').classList.remove('hidden');
            }
          }

          if (selectTab) {
            if (e.target.value === "Beratung per E-Mail" || e.target.value === "Beratung per WhatsApp") {
              selectTab.classList.add('hidden');
            } else {
              selectTab.classList.remove('hidden');
            }
          }

          if (e.target.value === "Beratung per E-Mail" || e.target.value === "Beratung per WhatsApp") {
            purpose.closest('.g-form-field').classList.remove('hidden');
            propertyType.closest('.g-form-field').classList.remove('hidden');
            stateOfProperty.closest('.g-form-field').classList.remove('hidden');
          } else {
            purpose.classList.contains('has-value') ? null : purpose.closest('.g-form-field').classList.add('hidden');
            propertyType.classList.contains('has-value') ? null : propertyType.closest('.g-form-field').classList.add('hidden');
            stateOfProperty.classList.contains('has-value') ? null : stateOfProperty.closest('.g-form-field').classList.add('hidden');
          }

        });
      }

      var errorMessages = form.querySelectorAll('.error-message');

      for (var m = 0; m < errorMessages.length; m++) {
        var errorMessage = errorMessages[m];
        var errorMessageClose = errorMessage.querySelector('.close');
        errorMessageClose.addEventListener('click', function (e) {
          e.target.closest('.g-form-field').classList.remove('error');
        });
      }

      var popups = form.querySelectorAll('.details-popup');

      for (var n = 0; n < popups.length; n++) {
        var popup = popups[n];
        var popupToggle = popup.querySelector('.details-toggle');
        popupToggle.addEventListener('click', function (e) {
          var hasOpen = e.target.closest('.details-popup').classList.contains('open');
          var popups = document.querySelectorAll('.details-popup');

          for (var _i = 0; _i < popups.length; _i++) {
            popups[_i].classList.remove('open');
          }

          if (!hasOpen) {
            e.target.closest('.details-popup').classList.add('open');
          }
        });
        var popupClose = popup.querySelector('.close');
        popupClose.addEventListener('click', function (e) {
          e.target.closest('.details-popup').classList.remove('open');
        });
        document.addEventListener('click', function (e) {
          var target = e.target;

          if (!target.closest('.details-popup')) {
            var _popups = document.querySelectorAll('.details-popup');

            for (var _i2 = 0; _i2 < _popups.length; _i2++) {
              _popups[_i2].classList.remove('open');
            }
          }
        });
      }

    }
  };

  function parseToCurrencyString(s) {
    let n = parseInt(s, 10);
    if (isNaN(n)) {
      n = 0;
    }
    return n.toLocaleString("de-DE") + ",- €";
  }

  function formatCurrency(evt) {
    /* // keyup
    const position = evt.target.selectionStart;
    console.log("position " + position);
    let cleanedString = this.value.replace(/\D/g, '');
    let n = parseInt(cleanedString, 10);
    let s = parseToCurrencyString(cleanedString);
    let diff = s.substring(0, position + 1).length - n.toString().substring(0, position + 1).length;
    this.value = s;
    console.log("diff " + diff);

    if (evt.keyCode === 0 || evt.keyCode === 8 || evt.keyCode === 46
      || (evt.keyCode >= 48 && evt.keyCode <= 57)
      || (evt.keyCode >= 96 && evt.keyCode <= 105)) {
      if (evt.keyCode !== 8 && diff !== 0) {
        evt.target.selectionStart = position + diff;
        evt.target.selectionEnd = position + diff;
      } else {
        evt.target.selectionStart = position;
        evt.target.selectionEnd = position;
      }
    } // keyup */

    let cleanedString = this.value.replace(/\D/g, '');
    let n = parseInt(cleanedString, 10);
    if(n > 0) this.value = parseToCurrencyString(cleanedString);
  }

  function clearFormatCurrency(evt) {
    let cleanedString = this.value.replace(/\D/g, '');
    let n = parseInt(cleanedString, 10);
    if(n > 0) this.value = n;
  }

  var intervalForInitForm;

  function checkCanInit() {
    if (flagGetOptions) {
      self.initForm();
      clearInterval(intervalForInitForm);
    }
  }

  intervalForInitForm = setInterval(function () {
    checkCanInit();
  }, 100);
  checkCanInit();

  function phoneNumber(e) {
    var value = e.target.value;

    if (value[0] === "+") {
      e.target.value = "+" + value.replace(/\D/g, '');
    } else {
      e.target.value = value.replace(/\D/g, '');
    }
  }

  function generateCSS(id) {
    // ".input-money{\ntext-align: right;\npadding-right: 70px !important;\n}\n".concat("\n.input-money:after{\ncontent: ',-€';\n}\n").concat(
    return " \nbody {\nmargin: 0;\n}\n\n#data-form-id-".concat(id, " .g-form-wrapper {\npadding-top: 48px !important;\npadding-bottom: 180px !important;\nposition: relative !important;\n}\n#data-form-id-").concat(id, " .g-form-wrapper:after {\ncontent: \"\" !important;\nposition: absolute !important;\nheight: 250px !important;\nborder-top: 2px solid #23689a !important;\nwidth: 100% !important;\nbottom: 0 !important;\nleft: 0 !important;\nright: 0 !important;\nbackground: #fff !important;\n}\n#data-form-id-").concat(id, " .g-form-wrapper * {\nfont-family: \"ProximaNova\", sans-serif !important;\n}\n@media screen and (max-width: 991px) {\n#data-form-id-").concat(id, " .g-form-wrapper {\npadding-top: 0 !important;\npadding-bottom: 0 !important;\n}\n}\n#data-form-id-").concat(id, " .g-form-container {\nline-height: 1.625 !important;\nfont-size: 16px !important;\nfont-family: \"ProximaNova\", sans-serif !important;\nmargin-left: auto !important;\nmargin-right: auto !important;\nmax-width: 1200px !important;\nposition: relative !important;\nz-index: 2 !important;\nbox-shadow: 0 0 20px 30px rgba(0, 0, 0, 0.05) !important;\n}\n#data-form-id-").concat(id, " .g-form-container h1, #data-form-id-").concat(id, " .g-form-container h2, #data-form-id-").concat(id, " .g-form-container h3, #data-form-id-").concat(id, " .g-form-container h4, #data-form-id-").concat(id, " .g-form-container h5, #data-form-id-").concat(id, " .g-form-container h6 {\nfont-family: \"ProximaNova\", sans-serif !important;\nfont-weight: 600 !important;\nline-height: 1.2 !important;\nmargin: 0 0 10px !important;\n}\n#data-form-id-").concat(id, " .g-form-container, #data-form-id-").concat(id, " .g-form-container * {\nbox-sizing: border-box !important;\n}\n#data-form-id-").concat(id, " .g-form {\nbackground: #fff !important;\npadding-bottom: 100px !important;\n}\n#data-form-id-").concat(id, " .g-form-header {\nheight: 125px !important;\nbackground: url(\"" + imgDir + "leadformular-header.jpg\") no-repeat 50% 33% !important;\nbackground-size: cover !important;\ntext-align: center !important;\nfloat: left !important;\nwidth: 100% !important;\n}\n#data-form-id-").concat(id, " .g-form-header .offert-logo {\nposition: relative !important;\nbackground-color: #fff !important;\ntext-align: center !important;\ndisplay: inline-block !important;\nborder-radius: 100px !important;\n}\n@media screen and (min-width: 992px) {\n#data-form-id-").concat(id, " .g-form-header .offert-logo {\ntop: -48px !important;\nwidth: 145px !important;\nheight: 145px !important;\nline-height: 140px !important;\n}\n#data-form-id-").concat(id, " .g-form-header .offert-logo .offert-logo-img {\nvertical-align: middle !important;\n}\n}\n#data-form-id-").concat(id, " .g-form__head {\nbackground-color: #fbfbfb !important;\npadding: 15px !important;\ntext-align: center !important;\ndisplay: flex !important;\nflex-wrap: wrap !important;\nalign-items: center !important;\njustify-content: center !important;\nline-height: 26px !important;\n}\n#data-form-id-").concat(id, " .g-form__head h3 {\ncolor: #f5821f !important;\nfont-size: 32px !important;\nfont-weight: 700 !important;\nmargin: 34px 0 0 !important;\ntext-align: center !important;\n}\n@media screen and (max-width: 600px) {\n#data-form-id-").concat(id, " .g-form__head h3 {\nfont-size: 22px !important;\n}\n}\n#data-form-id-").concat(id, " .g-form__head p {\nmargin: 0 !important;\nfont-size: 24px !important;\ncolor: #9b9b9b !important;\nletter-spacing: 0.2px !important;\n}\n#data-form-id-").concat(id, " .g-form__head p.text {\nfont-size: 18px !important;\nline-height: 29px !important;\nletter-spacing: 0 !important;\ncolor: #9b9b9b !important;\nmax-width: 760px !important;\nwidth: 100% !important;\nmargin: 0 auto 15px !important;\n}\n@media screen and (max-width: 600px) {\n#data-form-id-").concat(id, " .g-form__head p.text {\nfont-size: 15px !important;\nline-height: 20px !important;\n}\n}\n@media screen and (max-width: 600px) {\n#data-form-id-").concat(id, " .g-form__head p {\nfont-size: 16px !important;\nline-height: 26px !important;\n}\n}\n#data-form-id-").concat(id, " .g-form__head hr {\nwidth: calc(100% + 30px) !important;\nheight: 1px !important;\nbackground: #e8e8e8 !important;\nmargin: 30px -15px !important;\ndisplay: block !important;\nborder: none!important;\npadding: 0!important;\n}\n#data-form-id-").concat(id, " .g-form-inner {\nmax-width: 545px !important;\nmargin: 0 auto !important;\npadding: 50px 10px 0 !important;\n}\n#data-form-id-").concat(id, " .g-form-inner h3 {\ncolor: #23689b !important;\nfont-size: 20px !important;\nmargin: 0 0 25px !important;\ntext-transform: uppercase !important;\n}\n#data-form-id-").concat(id, " .g-form-field {\nposition: relative !important;\nmargin-bottom: 28px !important;\n}\n#data-form-id-").concat(id, " .g-form-field.hidden {\ndisplay: none !important;\n}\n#data-form-id-").concat(id, " .g-form-field.valid .wrap-input {\nposition: relative !important;\n}\n#data-form-id-").concat(id, " .g-form-field.valid .wrap-input:after {\ncontent: \"\" !important;\nwidth: 20px !important;\nheight: 9px !important;\nborder: 2px solid #249f30 !important;\nborder-width: 0 0 3px 3px !important;\nposition: absolute !important;\ntop: 50% !important;\nright: 21px !important;\ntransform: translateY(-50%) rotate(-45deg) !important;\ntransition: 0.3s !important;\nz-index: 2 !important;\npointer-events: none !important;\n}\n#data-form-id-").concat(id, " .g-form-field .wrap-input {\ndisplay: inline-block !important;\nwidth: 100% !important;\nposition: relative !important;\n}\n#data-form-id-").concat(id, " .g-form-field .wrap-input .details-popup,\n#data-form-id-").concat(id, " .g-form-field .wrap-select .details-popup{\nposition: absolute !important;\nleft: 100% !important;\nmargin-left: 18px !important;\ntop: 50% !important;\ntransform: translateY(-50%) !important;\nz-index: 3 !important;\n}\n#data-form-id-").concat(id, " .g-form-field .wrap-input .details-popup.open .details-content,\n #data-form-id-").concat(id, " .g-form-field .wrap-select .details-popup.open .details-content{\nopacity: 1 !important;\ntransform: translateX(0) !important;\ntransition: opacity 0.3s, transform 0s 0s !important;\n}\n#data-form-id-").concat(id, " .g-form-field .wrap-input .details-popup .details-toggle,\n#data-form-id-").concat(id, " .g-form-field .wrap-select .details-popup .details-toggle{\ndisplay: block !important;\nbackground: url(\"data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABWUlEQVQ4jbWV627CMAyFv4VeKLuAtL3/++3HpI3LgAJlcjlBJk0lJm1Hikhj++Q4dsIDedh6A0yBEpjI6wQcgB2wBc5pdI7QiOZAGFhu0QFfIh4lXAAzzU3JN7CXMqS0lk+pNfP5zBFGMktjCWwGmm7xCLyI40oaz6aR0cg+dEbR/gw8aVRS2ymDVrG2frQx0Q6v+l06MkvpTSkWIi+l7Khxkoip/DZBOwTt6NNcuMLsNXK2jWJ7rpiSKVjLEHHSrqukmrWyaaUy1sJU9kSlU+Fh3+/uu4hBQpf49sdUJE07Bl9RpK5NsumLWIwQeFRq9Ii1jiGLkDRtDqVbW6kT0it3zbJQIeINOGYItyNzj1rzQ3B9Nxu4XVAr5bkLTBFjd0EKOte0KRr33Qysl5hSHNvg7i6qZPWLlCvFEM/23sch11rZx+Ffn68Ic7ad73lgLRMjvOJv/wKAH7CZZnyLwZkdAAAAAElFTkSuQmCC\") no-repeat !important;\nwidth: 20px !important;\nheight: 20px !important;\ncursor: pointer !important;\n}\n#data-form-id-").concat(id, " .g-form-field .wrap-input .details-popup .details-content,\n#data-form-id-").concat(id, " .g-form-field .wrap-select .details-popup .details-content{\nposition: absolute !important;\ntop: -20px !important;\nright: 40px !important;\nborder-radius: 4px !important;\nbox-shadow: 0 6px 27px rgba(0, 0, 0, 0.17) !important;\nbackground: #fff !important;\npadding: 35px 10px 35px 28px !important;\nwidth: 255px !important;\nopacity: 0 !important;\ntransform: translateX(-100vw) !important;\ntransition: opacity 0.3s, transform 0s 0.3s !important;\n}\n#data-form-id-").concat(id, " .g-form-field .wrap-input .details-popup .details-content:before,\n#data-form-id-").concat(id, " .g-form-field .wrap-select .details-popup .details-content:before{\ncontent: \"\" !important;\nposition: absolute !important;\nleft: 100% !important;\ntop: 24px !important;\nborder-color: transparent transparent transparent #fff !important;\nborder-style: solid !important;\nborder-width: 5.5px 7px !important;\n}\n#data-form-id-").concat(id, " .g-form-field .wrap-input .details-popup .details-content .content,\n#data-form-id-").concat(id, " .g-form-field .wrap-select .details-popup .details-content .content{\nfont-size: 12px !important;\nline-height: 16px !important;\ncolor: #7a7a7a !important;\n}\n#data-form-id-").concat(id, " .g-form-field .wrap-input .details-popup .details-content .close,\n#data-form-id-").concat(id, " .g-form-field .wrap-select .details-popup .details-content .close{\nwidth: 6px !important;\nheight: 6px !important;\nborder-radius: 50% !important;\ncursor: pointer !important;\nposition: absolute !important;\ntop: 20px !important;\nright: 20px !important;\nflex-shrink: 0 !important;\n}\n#data-form-id-").concat(id, " .g-form-field .wrap-input .details-popup .details-content .close:before, \n#data-form-id-").concat(id, " .g-form-field .wrap-input .details-popup .details-content .close:after,\n#data-form-id-").concat(id, " .g-form-field .wrap-select .details-popup .details-content .close:before,\n#data-form-id-").concat(id, " .g-form-field .wrap-select .details-popup .details-content .close:after{\ncontent: \"\" !important;\nwidth: 8px !important;\nheight: 1px !important;\nbackground: #3b3939 !important;\ntransform: translate(-50%, -50%) rotate(-45deg) !important;\nposition: absolute !important;\ntop: 50% !important;\nleft: 50% !important;\n}\n#data-form-id-").concat(id, " .g-form-field .wrap-input .details-popup .details-content .close:after,\n#data-form-id-").concat(id, " .g-form-field .wrap-select .details-popup .details-content .close:after{\ntransform: translate(-50%, -50%) rotate(45deg) !important;\n}\n#data-form-id-").concat(id, " .g-form-field label {\nposition: relative !important;\ndisplay: block !important;\nz-index: 1 !important;\n}\n#data-form-id-").concat(id, " .g-form-field .checkbox-block {\nposition: relative !important;\ncursor: pointer !important;\nmargin-bottom: 12px !important;\n}\n#data-form-id-").concat(id, " .g-form-field .checkbox-block input {\nwidth: 0 !important;\nheight: 0 !important;\nopacity: 0 !important;\nposition: absolute !important;\ntop: 0 !important;\nleft: 0 !important;\nvisibility: hidden !important;\n}\n#data-form-id-").concat(id, " .g-form-field .checkbox-block input:checked + span:after {\nopacity: 1 !important;\n}\n#data-form-id-").concat(id, " .g-form-field .checkbox-block span {\npadding-left: 32px !important;\n}\n#data-form-id-").concat(id, " .g-form-field .checkbox-block span:before {\ncontent: \"\" !important;\nwidth: 20px !important;\nheight: 20px !important;\nborder: 1px solid #efefef !important;\nborder-radius: 50% !important;\nposition: absolute !important;\ntop: 50% !important;\nleft: 0 !important;\ntransform: translateY(-50%) !important;\n}\n#data-form-id-").concat(id, " .g-form-field .checkbox-block span:after {\ncontent: \"\" !important;\nwidth: 8px !important;\nheight: 8px !important;\nbackground: #f5821f !important;\nborder-radius: 50% !important;\nposition: absolute !important;\ntop: 50% !important;\nleft: 7px !important;\nopacity: 0 !important;\ntransform: translateY(-50%) !important;\ntransition: 0.3s !important;\n}\n#data-form-id-").concat(id, " .g-form-field.with-symbol input, #data-form-id-").concat(id, " .g-form-field.with-symbol select, #data-form-id-").concat(id, " .g-form-field.with-symbol textarea {\npadding-left: 45px !important;\n}\n#data-form-id-").concat(id, " .g-form-field textarea ~ .placeholder {\ntop: 22px !important;\n}\n#data-form-id-").concat(id, " .g-form-field input, #data-form-id-").concat(id, " .g-form-field select, #data-form-id-").concat(id, " .g-form-field textarea {\nborder: 1px solid #efefef !important;\nborder-radius: 4px !important;\ndisplay: block !important;\nwidth: 100% !important;\npadding-left: 15px !important;\npadding-top: 30px !important;\npadding-bottom: 12px !important;\nfont-size: 22px !important;\nline-height: 22px !important;\ntransition: 0.3s all ease!important;\nbackground: #fff!important;\n}\n#data-form-id-").concat(id, " .g-form-field input:focus, #data-form-id-").concat(id, " .g-form-field select:focus, #data-form-id-").concat(id, " .g-form-field textarea:focus {\nborder-color: #23689b!important;\ncolor: #23689b!important;\nbox-shadow: 0 10px 15px rgba(0, 0, 0, .05)!important;\n}\n#data-form-id-").concat(id, " .g-form-field input.has-value ~ .with-value, #data-form-id-").concat(id, " .g-form-field select.has-value ~ .with-value, #data-form-id-").concat(id, " .g-form-field textarea.has-value ~ .with-value {\nopacity: 1 !important;\n}\n#data-form-id-").concat(id, " .g-form-field input.has-value ~ .placeholder, #data-form-id-").concat(id, " .g-form-field select.has-value ~ .placeholder, #data-form-id-").concat(id, " .g-form-field textarea.has-value ~ .placeholder {\ntransform: scale(0.7) !important;\nmargin-top: -15px !important;\nmargin-left: -15px !important;\ncolor: #23689b !important;\nwidth: 135% !important;\nmax-width: 135% !important;\ntext-overflow: ellipsis !important;\nwhite-space: nowrap !important;\noverflow: hidden !important;\n}\n#data-form-id-").concat(id, " .g-form-field input:focus ~ .with-value, #data-form-id-").concat(id, " .g-form-field select:focus ~ .with-value, #data-form-id-").concat(id, " .g-form-field textarea:focus ~ .with-value {\nopacity: 1 !important;\n}\n#data-form-id-").concat(id, " .g-form-field input:focus ~ .placeholder, #data-form-id-").concat(id, " .g-form-field select:focus ~ .placeholder, #data-form-id-").concat(id, " .g-form-field textarea:focus ~ .placeholder {\ntransform: scale(0.7) !important;\nmargin-top: -15px !important;\nmargin-left: -15px !important;\ncolor: #23689b !important;\nwidth: 135% !important;\nmax-width: 135% !important;\ntext-overflow: ellipsis !important;\nwhite-space: nowrap !important;\noverflow: hidden !important;\n}\n#data-form-id-").concat(id, " .g-form-field textarea {\nmin-height: 180px !important;\nresize: vertical !important;\n}\n#data-form-id-").concat(id, " .g-form-field .with-value {\nposition: absolute !important;\nleft: 20px !important;\ntop: 33px !important;\nfont-size: 22px !important;\nline-height: 22px !important;\nfont-weight: 600 !important;\nopacity: 0 !important;\ntransition: 0.3s !important;\npointer-events: none !important;\n}\n#data-form-id-").concat(id, " .g-form-field .placeholder {\nposition: absolute !important;\ntop: 22px !important;\nleft: 30px !important;\nfont-size: 16px !important;\ncolor: #797979 !important;\npointer-events: none !important;\ntransition: 0.3s !important;\ntransform-origin: top left !important;\n}\n#data-form-id-").concat(id, " .g-form-field .placeholder .red {\ncolor: #f00 !important;\n}\n#data-form-id-").concat(id, " .g-form-field.error .error-message {\ndisplay: flex !important;\nborder-radius: 0 0 4px 4px !important;\n}\n#data-form-id-").concat(id, " .g-form-field.error .checkbox-field .error-message {\ndisplay: inline-block !important;\nborder-radius: 4px !important;\n}\n#data-form-id-").concat(id, " .g-form-field.error input:not(:focus) {\nborder-color: #ce141b !important;\n}\n#data-form-id-").concat(id, " .g-form-field.error .placeholder {\ncolor: #ce141b !important;\n}\n#data-form-id-").concat(id, " .g-form-field.checkbox-field .error-message:before {\ncontent: \"\" !important;\nposition: absolute !important;\ntop: 100% !important;\nleft: 6px !important;\nborder-width: 5px !important;\nborder-color: #ffebeb transparent transparent transparent !important;\nborder-style: solid !important;\n}\n#data-form-id-").concat(id, " .g-form-field .error-message {\nfont-size: 16px !important;\nbackground: #ffebeb !important;\ncolor: #ce141b !important;\npadding: 10px 20px !important;\njustify-content: space-between !important;\nalign-items: center !important;\nmargin-bottom: 15px !important;\nborder-radius: 4px !important;\nposition: relative !important;\ndisplay: none !important;\nmargin-top: -2px !important;\n}\n#data-form-id-").concat(id, " .g-form-field .error-message span {\ndisplay: inline-block !important;\nvertical-align: middle !important;\n}\n#data-form-id-").concat(id, " .g-form-field .error-message span svg{\nwidth: 16px;\nheight: 16px;\nmargin-right: 7px;\ndisplay: inline-block;\nvertical-align: middle;\nmargin-bottom: 2px;\n}\n#data-form-id-").concat(id, " .g-form-field .error-message .close {\nwidth: 22px !important;\nheight: 22px !important;\nborder-radius: 50% !important;\nborder: 1px solid #ce141b !important;\nposition: relative !important;\ncursor: pointer !important;\ndisplay: inline-block !important;\nvertical-align: middle !important;\nmargin-left: 40px !important;\nflex-shrink: 0 !important;\n}\n#data-form-id-").concat(id, " .g-form-field .error-message .close:before, #data-form-id-").concat(id, " .g-form-field .error-message .close:after {\ncontent: \"\" !important;\nwidth: 8px !important;\nheight: 1px !important;\nbackground: #ce141b !important;\ntransform: translate(-50%, -50%) rotate(-45deg) !important;\nposition: absolute !important;\ntop: 50% !important;\nleft: 50% !important;\n}\n#data-form-id-").concat(id, " .g-form-field .error-message .close:after {\ntransform: translate(-50%, -50%) rotate(45deg) !important;\n}\n#data-form-id-").concat(id, " .g-form-field.with-variants .wrap-input:after{\ncontent: \"\" !important;\nposition: absolute !important;\nright: 20px !important;\ntop: 50% !important;\nborder-width: 0 0 2px 2px !important;\nwidth: 13px !important;\nheight: 13px !important;\nborder-style: solid !important;\ntransform-origin: center center !important;\nborder-color: transparent transparent #23689b #23689b !important;\ntransform: translateY(-50%) rotate(-45deg) !important;\npointer-events: none !important;\n}\n#data-form-id-").concat(id, " .g-form-field.with-variants {\nz-index: 3!important;\ntransition: z-index 0s .2s;\n}\n#data-form-id-").concat(id, " .g-form-field.with-variants.focused{\nz-index: 4!important;\ntransition: z-index 0s 0s;\n}\n#data-form-id-").concat(id, " .g-form-field.with-variants input:focus ~ .variants {\nmax-height: 300px !important;\nopacity: 1 !important;\ntransition: 0.3s 0s!important;\n}\n#data-form-id-").concat(id, " .g-form-field.with-variants .variants {\nposition: absolute !important;\ntop: 100% !important;\nleft: 0 !important;\nwidth: 100% !important;\nz-index: 2 !important;\nmax-height: 0 !important;\noverflow-y: auto !important;\nbackground: #fff !important;\npadding: 0 !important;\nmargin: 3px 0 0 !important;\nborder: 1px solid #e5e5e5 !important;\nborder-bottom-width: 0 !important;\nborder-radius: 4px !important;\nopacity: 0 !important;\ntransition: 0.3s 0.2s !important;\n}\n#data-form-id-").concat(id, " .g-form-field.with-variants .variants li {\noverflow: hidden !important;\nlist-style: none !important;\nposition: relative !important;\nborder-bottom: 1px solid #e5e5e5 !important;\ncursor: pointer !important;\n}\n#data-form-id-").concat(id, " .g-form-field.with-variants .variants li:before {\ncontent: \"\" !important;\ntop: 5px !important;\nleft: 5px !important;\nright: 5px !important;\nbottom: 5px !important;\nposition: absolute !important;\nbackground: #f9f9f9 !important;\nopacity: 0 !important;\n}\n#data-form-id-").concat(id, " .g-form-field.with-variants .variants li:hover:before {\nopacity: 1 !important;\n}\n#data-form-id-").concat(id, " .g-form-field.with-variants .variants li .text {\npadding: 10px 28px !important;\nposition: relative !important;\nz-index: 3 !important;\n}\n#data-form-id-").concat(id, " .g-form-field.with-variants .variants li.hide {\nmax-height: 0 !important;\nborder-bottom-width: 0 !important;\n}\n#data-form-id-").concat(id, " .g-form-field h4 {\nmargin-top: 30px !important;\nmargin-bottom: 18px !important;\nfont-size: 20px !important;\ncolor: #797979 !important;\n}\n#data-form-id-").concat(id, " .g-form-field.select-tab .tab-row {\ndisplay: flex !important;\njustify-content: flex-start !important;\nalign-items: stretch !important;\nflex-wrap: wrap !important;\n}\n#data-form-id-").concat(id, " .g-form-field.select-tab .tab-row.small {\nmargin: -5px !important;\n}\n#data-form-id-").concat(id, " .g-form-field.select-tab .tab-row.smalllabel span{\npadding: 5px !important;\nfont-size: 12px !important;\n}\n\n#data-form-id-").concat(id, " .g-form-field.select-tab .tab-row .wrap-tab {\nmin-width: 25%;\n}\n#data-form-id-").concat(id, " .g-form-field.select-tab .tab-row .wrap-tab:last-child label{\nborder-top-right-radius: 4px;\nborder-bottom-right-radius: 4px;\n}\n#data-form-id-").concat(id, " .g-form-field.select-tab .tab-row .wrap-tab:first-child label{\nborder-top-left-radius: 4px;\nborder-bottom-left-radius: 4px;\n}\n#data-form-id-").concat(id, " .g-form-field.select-tab .tab-row label {\nposition: relative !important;\nflex-grow: 1 !important;\nmargin: 0 -1px -1px 0 !important;\nborder: 1px solid #23689b !important;\n}\n#data-form-id-").concat(id, " .g-form-field.select-tab .tab-row label:hover span{\nbackground: rgba(35, 104, 155, .7) !important;\ncolor: #fff!important;\n}\n\n#data-form-id-").concat(id, " .g-form-field.select-tab .tab-row label span {\npadding: 15px !important;\nfont-size: 16px !important;\ncolor: #797979 !important;\nwidth: 100% !important;\ntext-align: center !important;\ndisplay: inline-block !important;\ncursor: pointer !important;\ntransition: all 0.3s, padding 0s, font-size 0s !important;\n}\n#data-form-id-").concat(id, " .g-form-field.select-tab .tab-row label input {\nwidth: 0 !important;\nheight: 0 !important;\nopacity: 0 !important;\nposition: absolute !important;\ntop: 0 !important;\nleft: 0 !important;\nvisibility: hidden !important;\n}\n#data-form-id-").concat(id, " .g-form-field.select-tab .tab-row label input:checked + span {\nbackground: #23689b !important;\ncolor: #fff !important;\n}\n#data-form-id-").concat(id, " .g-form-field .description {\nmargin-top: 10px !important;\nfont-size: 14px !important;\ncolor: #9b9b9b !important;\n}\n#data-form-id-").concat(id, " .g-form-field.checkbox-single label {\nposition: relative !important;\ncursor: pointer !important;\nmargin-bottom: 12px !important;\n}\n#data-form-id-").concat(id, " .g-form-field.checkbox-single label input {\nwidth: 0 !important;\nheight: 0 !important;\nopacity: 0 !important;\nposition: absolute !important;\ntop: 0 !important;\nleft: 0 !important;\nvisibility: hidden !important;\n}\n#data-form-id-").concat(id, " .g-form-field.checkbox-single label input:checked + span:after {\nopacity: 1 !important;\n}\n#data-form-id-").concat(id, " .g-form-field.checkbox-single label span {\npadding-left: 42px !important;\ndisplay: inline-block !important;\nfont-size: 14px !important;\nline-height: 20px !important;\ncolor: #9b9b9b !important;\n}\n#data-form-id-").concat(id, " .g-form-field.checkbox-single label span:before {\ncontent: \"\" !important;\nwidth: 20px !important;\nheight: 20px !important;\nborder: 1px solid #efefef !important;\nborder-radius: 4px !important;\nposition: absolute !important;\ntop: 2px !important;\nleft: 0 !important;\n}\n#data-form-id-").concat(id, " .g-form-field.checkbox-single label span:after {\ncontent: \"\" !important;\nwidth: 20px !important;\nheight: 9px !important;\nborder: 2px solid #f5821f !important;\nborder-width: 0 0 3px 3px !important;\nposition: absolute !important;\ntop: 3px !important;\nleft: 5px !important;\nopacity: 0 !important;\ntransform: rotate(-45deg) !important;\ntransition: 0.3s !important;\n}\n#data-form-id-").concat(id, " .g-form-field.select .wrap-select {\nborder: 1px solid #efefef !important;\nborder-radius: 4px !important;\ndisplay: block !important;\nwidth: 100% !important;\n}\n#data-form-id-").concat(id, " .g-form-field.select .wrap-select select {\ncursor: pointer !important;\nborder: none !important;\nbox-shadow: none !important;\nbackground-color: transparent !important;\nbackground-image: none !important;\n-webkit-appearance: none !important;\n-moz-appearance: none !important;\nappearance: none !important;\nheight: 70px !important;\npadding-right: 40px !important;\n}\n#data-form-id-").concat(id, " .g-form-field.select .wrap-select:before {\ncontent: \"\" !important;\nposition: absolute !important;\nright: 3px !important;\ntop: 2px !important;\nbottom: 2px !important;\nwidth: 20px !important;\nbackground: #fff !important;\npointer-events: none !important;\n}\n#data-form-id-").concat(id, " .g-form-field.select .wrap-select:after {\ncontent: \"\" !important;\nposition: absolute !important;\nright: 20px !important;\ntop: 50% !important;\nborder-width: 0 0 2px 2px !important;\nwidth: 13px !important;\nheight: 13px !important;\nborder-style: solid !important;\ntransform-origin: center center !important;\nborder-color: transparent transparent #23689b #23689b !important;\ntransform: translateY(-50%) rotate(-45deg) !important;\npointer-events: none !important;\n}\n@media screen and (max-width: 600px) {\n#data-form-id-").concat(id, " .g-form-field.with-popup {\npadding-right: 40px !important;\n}\n}\n#data-form-id-").concat(id, " .g-form-wrapper .results {\npadding: 125px 30px 30px !important;\nbackground: #fff !important;\n}\n#data-form-id-").concat(id, " .g-form-wrapper .results h3 {\ncolor: #f5821f !important;\nfont-size: 30px !important;\nfont-weight: 700 !important;\nmargin: 0 !important;\n}\n#data-form-id-").concat(id, " .g-form-wrapper .results p {\nmargin-top: 1em !important;\nmargin-bottom: 1em !important;\nfont-size: 18px !important;\nfont-weight: 400 !important;\ncolor: #333 !important;\nline-height: 29px !important;\nbackground: #fff !important;\n}\n#data-form-id-").concat(id, " .g-form-wrapper .results p a {\ncolor: #e37c2f !important;\ntext-decoration: none !important;\ntransition: all 0.1s ease-in-out !important;\n}\n#data-form-id-").concat(id, " .g-form-wrapper .results .results-headline{\ntext-align:center;\nmargin-bottom: 45px;\n}\n#data-form-id-").concat(id, " .g-form-wrapper .results .results-headline h3{\ncolor: #f5821f!important;\nfont-size: 32px!important;\nfont-weight: 700!important;\nmargin: 0!important;\n}\n#data-form-id-").concat(id, " .g-form-wrapper .results .results-headline p{\nmargin: 0!important;\nfont-size: 24px!important;\ncolor: #9b9b9b!important;\n}\n\n@media screen and (max-width: 600px) {\n#data-form-id-").concat(id, " .g-form-wrapper .results {\npadding-left: 15px !important;\npadding-right: 15px !important;\n}\n}\n#data-form-id-").concat(id, " .g-form-submit-btn {\nbackground: #f5821f !important;\nfont-size: 14px !important;\nletter-spacing: 0.6px !important;\nwidth: 100% !important;\ncolor: #fff !important;\nborder-radius: 4px !important;\nborder: none !important;\npadding: 21px !important;\ncursor: pointer !important;\n}\n\n/*# sourceMappingURL=test.css.map */\n");
  }

  function generateCSSLongForm11(id) {
    return "#data-form-id-".concat(id, " .g-form-container {\nmargin-top: 50px!important;\nline-height: 1.625!important;\nfont-size: 16px!important;\nfont-family: 'ProximaNova', sans-serif!important;\nmargin-left: auto!important;\nmargin-right: auto!important;\nmax-width: 1200px!important;\nbox-shadow: 0 0 20px 30px rgba(0, 0, 0, 0.05) !important;\n}\n#data-form-id-").concat(id, " li{\nlist-style: none!important;\n}\n#data-form-id-").concat(id, " .gf_step_clear{\noverflow: auto!important;\nwidth: 100%;\n}\n#data-form-id-").concat(id, " .gf_step_clear::after {\ncontent: \"\"!important;\nclear: both!important;\ndisplay: table!important;\n}\n\n#data-form-id-").concat(id, " .g-form-container h1,\n#data-form-id-").concat(id, " .g-form-container h2,\n#data-form-id-").concat(id, " .g-form-container h3,\n#data-form-id-").concat(id, " .g-form-container h4,\n#data-form-id-").concat(id, " .g-form-container h5,\n#data-form-id-").concat(id, " .g-form-container h6 {\nfont-family: 'ProximaNova',sans-serif !important;\nfont-weight: 600 !important;\nline-height: 1.2 !important;\nmargin: 0 0 10px !important;\n}\n\n\n\n#data-form-id-").concat(id, " .g-form-container,\n#data-form-id-").concat(id, " .g-form-container * {\nbox-sizing: border-box!important;\n}\n\n#data-form-id-").concat(id, " .g-form {\nbackground: #fff!important;\n}\n\n#data-form-id-").concat(id, " .g-form__head {\nbackground-color: #fbfbfb!important;\npadding: 15px!important;\ntext-align: center!important;\nline-height: 1.2!important;\n}\n\n#data-form-id-").concat(id, " .g-form__head h3 {\ncolor: #f5821f!important;\nfont-size: 32px!important;\nfont-weight: 700!important;\nmargin: 0!important;\n}\n\n#data-form-id-").concat(id, " .g-form__head p {\nmargin: 0!important;\nfont-size: 24px!important;\ncolor: #9b9b9b!important;\n}\n\n#data-form-id-").concat(id, " .g-form__step {\npadding: 32px 50px!important;\n}\n\n#data-form-id-").concat(id, " .g-form__step h3 {\ncolor: #23689b!important;\nfont-size: 20px!important;\nmargin: 0 0 16px!important;\n}\n\n#data-form-id-").concat(id, " .g-form-container .financing-object {\ndisplay: flex!important;\nflex-wrap: wrap!important;\npadding: 0!important;\nmargin: 0 -13px!important;\nlist-style: none!important;\n}\n\n#data-form-id-").concat(id, " .financing-object__item {\nflex: 0 0 33.3%!important;\nmax-width: 33.3% !important;\npadding: 19px 13px !important;\nmargin: 0 !important\n}\n\n#data-form-id-").concat(id, " .financing-object__inner {\nposition: relative!important;\noverflow: hidden!important;\nheight: 144px!important;\n}\n\n#data-form-id-").concat(id, " .financing-object__radio {\nposition: absolute!important;\ntop: 0!important;\nleft: 0!important;\nz-index: 10!important;\nwidth: 100%!important;\nheight: 100%!important;\nopacity: 0!important;\ncursor: pointer!important;\n}\n\n#data-form-id-").concat(id, " .financing-object__cont {\nborder: 2px solid #efefef!important;\nborder-radius: 4px!important;\nwidth: 100%!important;\nheight: 100%!important;\nposition: absolute!important;\ntop: 0!important;\nleft: 0!important;\ntransition: 0.3s all ease!important;\ndisplay: flex!important;\nflex-wrap: wrap!important;\njustify-content: center!important;\ntext-align: center!important;\n}\n\n#data-form-id-").concat(id, " .financing-object__inner:hover .financing-object__cont,\n#data-form-id-").concat(id, " .financing-object__radio:checked+.financing-object__cont {\nborder-color: #23689b!important;\n}\n\n#data-form-id-").concat(id, " .financing-object__cont img {\nmax-width: 100%!important;\n}\n\n#data-form-id-").concat(id, " .financing-object__cont h3 {\nfont-size: 20px!important;\ncolor: #23689b!important;\nline-height: 1!important;\nfont-weight: 700!important;\nwhite-space: nowrap!important;\ntext-overflow: ellipsis!important;\nmargin: 0!important;\n}\n\n#data-form-id-").concat(id, " .g-form__footer {\ndisplay: flex!important;\nflex-wrap: wrap!important;\n}\n\n#data-form-id-").concat(id, " .col-auto {\n-ms-flex: 0 0 auto!important;\nflex: 0 0 auto!important;\nwidth: auto!important;\nmax-width: 100%!important;\n}\n\n#data-form-id-").concat(id, " .mr-auto {\nmargin-right: auto!important;\n}\n\n#data-form-id-").concat(id, " .ml-auto {\nmargin-left: auto!important;\n}\n\n#data-form-id-").concat(id, " .g-form-container .g-form-next {\ncolor: #fff!important;\nfont-weight: normal!important;\noutline: 0!important;\nborder: 0!important;\ntransition: 0.3s all ease!important;\ntext-transform: uppercase!important;\nfont-size: 14px!important;\nborder-radius: 4px!important;\nmin-width: calc(33.3% - 17px)!important;\ntext-align: center!important;\ncolor: #fff!important;\nfont-weight: bold!important;\ntext-decoration: none!important;\nbackground: #f5821f!important;\nheight: 44px!important;\nline-height: 44px!important;\ndisplay: inline-block!important;\nvertical-align: top!important;\npadding: 0 15px!important;\ncursor: pointer;\n}\n\n#data-form-id-").concat(id, " .g-form-container .g-form-next:hover {\ncolor: #fff!important;\ntext-decoration: none!important;\nbackground: #23689b!important;\n}\n\n#data-form-id-").concat(id, " .g-grid {\ndisplay: flex!important;\nflex-wrap: wrap!important;\nmargin: 0 -16px!important;\n}\n\n#data-form-id-").concat(id, " .g-grid__item {\nflex: 0 0 50%!important;\nmax-width: 50%!important;\npadding-left: 16px!important;\npadding-right: 16px!important;\nmargin-bottom: 32px!important;\n}\n\n#data-form-id-").concat(id, " .g-form-row {}\n\n#data-form-id-").concat(id, " .g-form-row__head {\ndisplay: flex!important;\nflex-wrap: wrap!important;\nline-height: 26px!important;\n}\n\n#data-form-id-").concat(id, " .g-form-row__label {\ncolor: #23689b!important;\nfont-size: 20px!important;\nfont-weight: bold!important;\nmargin-right: auto!important;\n}\n\n#data-form-id-").concat(id, " .g-form-row__error-text {\nmargin-left: auto!important;\nfont-size: 14px!important;\ncolor: #be0707!important;\ndisplay: none!important;\n}\n\n#data-form-id-").concat(id, " .g-form-row__error .g-form-row__error-text {\ndisplay: block!important;\n}\n\n#data-form-id-").concat(id, " .g-form-row__input-w {\nposition: relative!important;\nmargin-top: 8px!important;\n}\n\n#data-form-id-").concat(id, " .g-form-container .g-form-row__input {\nbox-shadow: none!important;\npadding: 5px 40px 5px 20px!important;\nheight: 60px!important;\nborder-radius: 4px!important;\nborder: 2px solid #e1e1e1!important;\nbackground: #fff!important;\ncolor: #333!important;\nfont-size: 20px!important;\ntransition: 0.3s all ease!important;\nwidth: 100%!important;\noutline: 0!important;\ntext-align: left!important;\nmargin: 0!important;\n}\n #data-form-id-").concat(id, " .g-form-container .g-form-row__input::-webkit-input-placeholder { /* Edge */\ncolor: #757575!important;\n}\n\n#data-form-id-").concat(id, " .g-form-container .g-form-row__input:-ms-input-placeholder { /* Internet Explorer 10-11 */\ncolor: #757575!important;\n}\n\n#data-form-id-").concat(id, " .g-form-container .g-form-row__input::placeholder {\ncolor: #757575!important;\n}\n\n@media only screen and (max-width: 767px) {\n#data-form-id-").concat(id, " .g-form-container .g-form-row__input {\nheight: 40px !important;\npadding-left: 15px !important;\npadding-right: 15px !important;\nfont-size: 14px !important;\n}\n}\n\n#data-form-id-").concat(id, " .g-form-row__input:focus,\n#data-form-id-").concat(id, " .g-form-row__input:active {\nborder-color: #23689b!important;\n}\n\n#data-form-id-").concat(id, " .g-form-row__error .g-form-row__input {\nborder-color: #be0707!important;\n}\n\n#data-form-id-").concat(id, " .g-form__last-step.g-form__step {\npadding: 30px 20px !important;\npadding-top: 125px!important;\nfont-size: 18px!important;\nfont-weight: 400!important;\nfont-family: 'ProximaNova'!important;\ncolor: rgb(51, 51, 51)!important;\nline-height: 29px!important;\n}\n\n#data-form-id-").concat(id, " .g-form__last-step a {\ncolor: #e37c2f !important;\ntext-decoration: none !important;\ntransition: all .1s ease-in-out !important;\n}\n\n#data-form-id-").concat(id, " .g-form__last-step a:hover {\ncolor: #333 !important;\ntext-decoration: underline !important;\n}\n\n#data-form-id-").concat(id, " .g-form-row__error .g-form-row__input {\nbackground-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACgUlEQVRIiZXV24tVdRQH8M85nfE0GqUTWtlkXt4UCx8G9NELTTCZQYnkBQp98SEQREgSwVuooOBjJFL0MNlD3lLrodN/kDNQhvggzcWosbtjZaE+rN/APoe99zkt2PzW3nut7/qt32+t76o06nUlMg/rsRILMBdduIVv8SU+wVgRQKUgQC/exeuoZb7/jn8xCw+lb/9hEG/jZitQNQd8fdrdFvyCw1iOGZiJ2UlfgSP4NdlexYvtMngLJ3APx7Afk3kpZuQR7MVO3Md2vJ8X4CWcxT94FZ+3AD2OPSnrA+IesjIg7qOOtbicDfAUvku7GcAXOTv9CJuTfgpbc2xexqe4jSUYn7qDfXgMRwvA4cmMPr/A5jyOJ6xDRLrz8SZ+xMECR/g+o4+W2O3DBDaht4oNohRP4k6J43BGHyqxm0xYNWyoYnX6cbbE6f8EgHNpXVVp1OtjmIPpommK5FH8lvSejJ4n08RpjNcS+EQbcPgDN5JeBg538TNm11BpY5yVdkeTlWnERfwk2r+mfRbDolvbSbegldGq4JAuPNeB45DOslia1m+qaKSXVzpwHMbXHditS+tXlUa9vgDXxVEtwl8ljmvFEX1WYjNdFEMPFlXTyweCj3aXOPYJKriAZSV274jKPI2RKbJ7GtfwMPrFpGqVXlxJ+vNyhgtewCXRA0ukS4ZxbBPcdAZrcpzH8Ex68sD7k281YY3SPNE+xi5B2ZcF53e3gPydnqx0C+a8KE5gh5gLyJ/JG/FeCvQDPhQ8NSSGEdEzfaJa3sAT+DP5NhVA0dB/VsyG11qynBA0MEf0DjFeT4uhP9IKVBRgShYKOl+FxQmYKOmrohgGNc+KJnkAMNKO+61Fz84AAAAASUVORK5CYII=')!important;\nbackground-repeat: no-repeat!important;\nbackground-position: 96% 50%!important;\n}\n\n#data-form-id-").concat(id, " .g-form-row__hint {\npadding-top: 8px!important;\nfont-size: 14px!important;\ncolor: #9b9b9b!important;\n}\n\n#data-form-id-").concat(id, " .g-form-row__select-w {\nmargin-top: 8px!important;\nposition: relative!important;\n}\n\n#data-form-id-").concat(id, " .g-form-row__select {\nbackground-size: 21px 12px!important;\npadding: 8px 40px 8px 20px!important;\n-webkit-appearance: none!important;\n-moz-appearance: none!important;\nappearance: none!important;\nbackground-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAMCAYAAACNzvbFAAABG0lEQVQokZ3TTSvEURTH8Y9/ymZqCrMgG4YUZTYsWFmKZmGaFclKSYpXI0WsZMPK80PGhgUvwMabmDwUJRb/O5kmf8Oczal7fr/vuefcblN2ceMI/ZjAo8ajD6d4iJBDFiV0NwjswVXIuQgFlNGFy5D/E9W+MgoR7jCFl6qOHX8Edvqe8BmTuI9C8QZ5vIp3c4FMHWAm6HqDL49biKpEJfEq3jEYDK0JwDbxyAN4wzSuK8WoRnyGYgDnxK+ZrtGkw/lQ0BVxXi2ohcIBZvGBERwjFWopnGA41GdwWAv4CQp7mA/GsdCoPQBGw/kc9n8yNydAYQct2MS4+GOk8YkF7CYZk25aiS0sB1AFuITt30z1oLCGVTxhBev1DF/nnztkmCrkdgAAAABJRU5ErkJggg==')!important;\nbackground-repeat: no-repeat!important;\nbackground-position: 96% 50%!important;\nheight: 60px!important;\nborder-radius: 4px!important;\nborder: 2px solid #e1e1e1!important;\nbackground-color: #fff!important;\nfont-size: 20px!important;\ncolor: #333!important;\nwidth: 100%!important;\n}\n\n\n@media only screen and (max-width: 767px) {\n#data-form-id-").concat(id, " .g-form-row__select {\nbackground-size: 19px 10px !important;\n}\n}\n\n#data-form-id-").concat(id, " .g-form-row__error .g-form-row__select {\nborder-color: #be0707!important;\n}\n\n#data-form-id-").concat(id, " .g-form-back {\nbackground-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAAz0lEQVQ4jaXSPUoDQRgG4CdLjpCgnXWCaGm/6Ck8QAgoQZIDiL2IioXsScQkXZoU0QQbzyAmN1ALZyHIWOzsC18xPzzDzDeNoihEsosJXnEa2/BfssjcDqbo4r0KFgPbAevgGld1wBLr4gajqtg22MYY+7jFMAUrwRaecYB7XOC7DviEwzA+x1cAU2qWiXc6Nc0MORZh4jEc0EisowwbnOAFPTyExaSU110HdIk+7lLR7ff7DOgKZ37/YmX0b0M+cIw3DHBZFyzRHHPsVQV/AMM7L9k/+eOGAAAAAElFTkSuQmCC')!important;\nbackground-position: 28px 50%!important;\nbackground-repeat: no-repeat!important;\nbackground-color: #f5f3f3!important;\ncolor: #9b9b9b!important;\ntext-transform: uppercase!important;\nfont-size: 14px!important;\nborder: none!important;\noutline: 0!important;\nborder-radius: 4px!important;\nheight: 42px!important;\nmin-width: 210px!important;\ntext-align: center!important;\nfont-weight: bold!important;\ndisplay: inline-block!important;\nvertical-align: top!important;\ntext-decoration: none!important;\nline-height: 42px!important;\ntransition: 0.3s all ease!important;\n}\n\n#data-form-id-").concat(id, " .g-form-back:hover {\nbackground-color: #ddd6d6!important;\n}\n\n#data-form-id-").concat(id, " .g-form__step h2 {\nfont-family: 'Mriad Pro', 'ProximaNova', sans-serif!important;\ncolor: #f5821f!important;\nfont-size: 30px!important;\nfont-weight: 700!important;\nmargin: 0!important;\n}\n\n@media(max-width: 1200px) {\n#data-form-id-").concat(id, " .g-form__head h3 {\nfont-size: 26px!important;\n}\n\n#data-form-id-").concat(id, " .g-form__head p {\nfont-size: 18px!important;\n}\n\n#data-form-id-").concat(id, " .g-form__step {\npadding: 20px 30px!important;\n}\n\n#data-form-id-").concat(id, " .financing-object__item {\npadding: 13px !important\n}\n}\n\n@media(max-width: 768px) {\n#data-form-id-").concat(id, " .g-form__head h3 {\nfont-size: 22px!important;\n}\n\n#data-form-id-").concat(id, " .g-form__head p {\nfont-size: 16px!important;\n}\n\n#data-form-id-").concat(id, " .g-form__step h3 {\nfont-size: 15px!important;\nmargin-bottom: 10px!important;\n}\n\n#data-form-id-").concat(id, " .financing-object__item {\nflex: 0 0 50% !important;\nmax-width: 50% !important;\npadding: 6px !important;\n}\n\n#data-form-id-").concat(id, " .financing-object__cont img {\nwidth: 60px!important;\n}\n\n#data-form-id-").concat(id, " .g-form__step {\npadding: 15px 20px!important;\n}\n\n#data-form-id-").concat(id, " .g-form__last-step {\npadding: 100px 20px !important;\n}\n\n#data-form-id-").concat(id, " .financing-object {\nmargin: 0 -6px!important;\n}\n\n#data-form-id-").concat(id, " .financing-object__inner {\nheight: 105px!important;\n}\n\n#data-form-id-").concat(id, " .g-form__footer {\nmargin-top: 15px!important;\n}\n\n#data-form-id-").concat(id, " .g-form-next {\nwidth: 100%!important;\nmargin-bottom: 10px!important;\n}\n\n#data-form-id-").concat(id, " .g-form-row__label {\nfont-size: 15px!important;\n}\n\n#data-form-id-").concat(id, " .g-form-row__error-text,\n#data-form-id-").concat(id, " .g-form-row__hint {\nfont-size: 12px!important;\n}\n\n#data-form-id-").concat(id, " .g-form-back {\nwidth: 100%!important;\nmargin-bottom: 10px!important;\n}\n\n#data-form-id-").concat(id, " .g-grid__item {\nflex: 0 0 100%!important;\nmax-width: 100%!important;\nmargin-bottom: 15px!important;\n}\n\n#data-form-id-").concat(id, " .g-form-row__input,\n#data-form-id-").concat(id, " .g-form-row__select {\nheight: 40px!important;\nfont-size: 14px!important;\n}\n}\n\n#data-form-id-").concat(id, " .g-form-header {\nheight: 125px!important;\nbackground: url(" + imgDir + "leadformular-header.jpg) no-repeat 50% 33%!important;\nbackground-size: cover!important;\ntext-align: center!important;\nfloat: left!important;\nwidth: 100%!important;\n}\n\n#data-form-id-").concat(id, " .g-form-header .offert-logo {\nposition: relative!important;\nbackground-color: #fff!important;\ntext-align: center!important;\ndisplay: inline-block!important;\nborder-radius: 100px!important;\n}\n\n@media only screen and (min-width: 992px) {\n#data-form-id-").concat(id, " .g-form-header .offert-logo {\ntop: -48px!important;\nwidth: 145px!important;\nheight: 145px!important;\nline-height: 140px!important;\n}\n\n#data-form-id-").concat(id, " .offert-logo-img {\nvertical-align: middle\n}\n}\n\n#data-form-id-").concat(id, " .g-form-steps {\nbackground-color: #f5f3f3!important;\nborder-bottom: 1px solid #fff!important;\nmargin-bottom: 0 !important;\npadding-bottom: 0!important;\n}\n\n#data-form-id-").concat(id, " .g-form-steps {\nwidth: 100%!important;\nmargin: 0!important;\npadding: 0!important;\n}\n\n#data-form-id-").concat(id, " .g-form-step {\nfont-family: 'Nexa Heavy', sans-serif!important;\ncolor: #9b9b9b!important;\nopacity: 1!important;\npadding: 0!important;\nmargin: 0!important;\nline-height: 50px !important;\nheight: inherit!important;\ntext-align: center!important;\nfont-size: 14px !important;\ntext-transform: uppercase!important;\nletter-spacing: .08em!important;\n}\n\n#data-form-id-").concat(id, " .g-form-step-active {\nbackground-color: #23689b!important;\ncolor: #fff!important;\n}\n\n@media only screen and (min-width: 768px) {\n#data-form-id-").concat(id, " .g-form-step+.g-form-step {\nborder-left: 1px solid #fff\n}\n\n#data-form-id-").concat(id, " .g-form-step {\nfloat: left!important;\nwidth: 33.3333%!important;\n}\n}\n\n#data-form-id-").concat(id, " .g-form-footer {\nflex-wrap: wrap!important;\nbackground-color: #fbfbfb!important;\nborder-top: 2px solid #eee!important;\noverflow: hidden!important;\ndisplay: flex!important;\n}\n\n#data-form-id-").concat(id, " .g-form-footer-item-wrapper {\npadding: 0 15px!important;\n/* float: left!important;\nwidth: 33.3%!important;\ndisplay: -webkit-box!important;\ndisplay: -moz-box!important;\ndisplay: -ms-flexbox!important;\ndisplay: -webkit-flex!important;\ndisplay: flex!important;\nflex-wrap: wrap!important;\n-webkit-box-pack: center!important;\n-webkit-justify-content: center!important;\n-ms-flex-pack: center!important;\njustify-content: center!important; */\n}\n\n@media only screen and (min-width: 768px) {\n#data-form-id-").concat(id, " .g-form-footer-item-wrapper {\nwidth: 33.33333% !important;\ndisplay: -webkit-box !important;\ndisplay: -moz-box !important;\ndisplay: -ms-flexbox !important;\ndisplay: -webkit-flex !important;\ndisplay: flex !important;\n-webkit-box-pack: center !important;\n-webkit-justify-content: center !important;\n-ms-flex-pack: center !important;\njustify-content: center !important;\n}\n}\n\n#data-form-id-").concat(id, " .g-form-footer-item {\nwidth: auto!important;\nbackground: url(" + imgDir + "leadformular-footer-check.png) no-repeat 0 50%!important;\npadding: 15px 0 15px 60px!important;\ndisplay: inline-block!important;\ntext-align: left!important;\n}\n\n#data-form-id-").concat(id, " .g-form-footer [class^=g-form-footer-item-wrapper]+[class^=g-form-footer-item-wrapper] {\nborder-left: 2px solid #eee!important;\n}\n\n#data-form-id-").concat(id, " .g-form-footer-item-wrapper:before {\ncontent: ''!important;\ndisplay: table!important;\n}\n\n#data-form-id-").concat(id, " .g-form-footer-item .g-form-footer-title {\nfont-family: 'ProximaNova'!important;\ncolor: #23689b!important;\nfont-size: 18px!important;\nmargin-bottom: 0!important;\nfont-weight: 300!important;\nmargin: 0!important;\n}\n\n#data-form-id-").concat(id, " .g-form-footer-item p {\nfont-size: 14px !important;\nmargin-bottom: 0!important;\nmargin-top: 0!important;\n}\n\n@media only screen and (max-width: 800px) {\n#data-form-id-").concat(id, " .g-form-footer-item-wrapper {\nwidth: 100%!important;\nborder-left: 2px solid #eee !important;\nborder-right: 2px solid #eee !important;\nborder-bottom: 2px solid #eee !important;\n}\n}\n\n#data-form-id-").concat(id, " .g-form-row input:focus {\nborder-color: #23689b!important;\ncolor: #23689b!important;\nbox-shadow: 0 10px 15px rgba(0, 0, 0, .05)!important;\n}\n\n@media only screen and (max-width: 991px) {\n#data-form-id-").concat(id, " .g-form-header .offert-logo {\nwidth: 100px!important;\nheight: 100px!important;\npadding: 20px!important;\ntop: -35px!important;\n}\n\n#data-form-id-").concat(id, " .g-form-header .offert-logo img {\ndisplay: block!important;\nwidth: 100%!important;\n}\n}\n\n@media only screen and (max-width: 767px) {\n#data-form-id-").concat(id, " .g-form-header .offert-logo {\nwidth: 70px!important;\nheight: 70px!important;\npadding: 10px!important;\n}\n\n#data-form-id-").concat(id, " .g-form-header {\nheight: 70px!important;\n}\n\n#data-form-id-").concat(id, " .g-form-step:not(.g-form-step-active) {\ndisplay: none!important;\n}\n\n#data-form-id-").concat(id, " .g-form-step {\nline-height: 30px !important;\nfont-size: 12px !important;\n}\n}");
  }

  function generateHTMLLongForm1(options) {
    insertElementsWithEvents(self.form, options);

    if (options.showHeader) {
      insertHeader(self.form);
    }

    if (options.showNavHeader) {
      insertNavHeader(self.form);
    }

    if (options.showFooter) {
      insertFooter(self.form);
    }
  }
}

function validateForm(form) {
  var error = false;
  var fields = form.elements;

  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];

    if ((field.hasAttribute('required') || field.value && field.type === "radio") && (field.closest('.g-form-field') ? !field.closest('.g-form-field').classList.contains('hidden') : true)) {
      if (validateField(field)) {
        field.closest('.g-form-field').classList.remove('error');
        field.closest('.g-form-field').classList.add('valid');
      } else {
        error = true;
        field.closest('.g-form-field').classList.remove('valid');
        field.closest('.g-form-field').classList.add('error');
      }
    }
  }

  if (error) {
    window.scrollTo({
      top: getOffsetTop(form.querySelector('.g-form-field.error')),
      left: 0,
      behavior: 'smooth'
    });
  }

  return !error;
}

function getOffsetTop(elem) {
  var offsetTop = 0;

  do {
    if (!isNaN(elem.offsetTop)) {
      offsetTop += elem.offsetTop;
    }
  } while (elem = elem.offsetParent);

  return offsetTop;
}

function validateField(field) {
  var form = field.closest('form');
  var value = field.value;

  if (!value) {
    return false;
  }

  switch (field.getAttribute('name')) {
    case "lastname":
    {
      return !/\d/.test(field.value);
    }

    case "firstname":
    {
      return !/\d/.test(field.value);
    }
  }

  switch (field.getAttribute('type')) {
    case "radio":
    {
      var nameRadio = field.getAttribute('name');

      if (form.querySelectorAll('[type="radio"][name="' + nameRadio + '"][required]').length) {
        var selectedRadio = form.querySelectorAll('[type="radio"][name="' + nameRadio + '"]:checked');

        if (selectedRadio.length === 0) {
          return false;
        }
      }
    }
      break;

    case "email":
    {
      if (!emailRegex.test(value)) {
        return false;
      }
    }
      break;

    case "tel":
    {
      if (field.classList.contains('phone')) {
        if (!proneRegex.test(value)) {
          return false;
        }
      }
    }
      break;
  }

  return true;
}

function checkInputSymbol(e) {
  var value = e.target.value;

  if (e.target.type === "tel") {
    if (e.target.classList.contains('phone')) {
      if (value[0] === "+") {
        e.target.value = "+" + value.replace(/[^()\d\s]/gi, '');
      } else {
        e.target.value = value.replace(/[^()\d\s]/gi, '');
      }
    } else {
      e.target.value = formatInputNumber(value.replace(/\(\)\D/g, ''));
    }
  }

  if (e.target.closest('.g-form-field') && e.target.closest('.g-form-field').classList.contains('with-variants')) {
    var variants = e.target.closest('.g-form-field').querySelector('.variants').querySelectorAll('li');

    for (var i = 0; i < variants.length; i++) {
      var variant = variants[i];

      if (checkStringConsist(variant.getAttribute('data-value'), e.target.value)) {
        variant.classList.remove('hide');
      } else {
        variant.classList.add('hide');
      }
    }
  }

  if (e.target.tagName === "TEXTAREA") {
    var description = e.target.closest('.g-form-field').querySelector('.description');

    if (description) {
      var startDescription = description.getAttribute('data-description-start');
      var endDescription = description.getAttribute('data-description-end');
      var maxCount = description.getAttribute('data-description-max-count');

      if (startDescription && endDescription && maxCount) {
        description.innerHTML = startDescription + " " + (maxCount - e.target.value.length) + " " + endDescription;
      }
    }
  }

  var field = e.target;

  if (field.value && (field.hasAttribute('required') || field.value && field.type === "radio") && (field.closest('.g-form-field') ? !field.closest('.g-form-field').classList.contains('hidden') : true)) {
    clearTimeout(timeout);
    field.closest('.g-form-field').classList.remove('error');
    field.closest('.g-form-field').classList.remove('valid');
    timeout = setTimeout(function (field) {
      if (validateField(field)) {
        field.closest('.g-form-field').classList.remove('error');
        field.closest('.g-form-field').classList.add('valid');
      } else {
        field.closest('.g-form-field').classList.remove('valid');
        field.closest('.g-form-field').classList.add('error');
      }
    }, 800, field);
  }
}

function checkStringConsist(value, search) {
  return !!value.toLowerCase().replace(regularSymbol, " ").replace(/\s\s+/g, " ").includes(search.toLowerCase().replace(regularSymbol, " ").replace(/\s\s+/g, " "));
}

function formatInputNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function checkFocusScroll(e) {
  var field = e.target;
  var position = field.getBoundingClientRect();
  var difference = position.y - window.innerHeight / 2;

  if (difference > 0) {
    window.scrollTo({
      top: getOffsetTop(field) - window.innerHeight / 2 + position.height,
      left: 0,
      behavior: 'smooth'
    });
  }
}

function checkInput(e, start) {
  clearTimeout(timeout);

  if (e) {
    var field = e.target || e;
    var value = field.value;

    if (field.type === "tel") {
      if (field.classList.contains('phone')) {
        if (value[0] === "+") {
          field.value = "+" + value.replace(/\D/g, '');
        } else {
          field.value = value.replace(/\D/g, '');
        }
      } else {
        if (!field.classList.contains('optifin-mask-input')) {
          field.value = formatInputNumber(value.replace(/\D/g, ''));
        }
      }
    }

    if (field.value) {
      field.classList.add('has-value');
    } else {
      field.classList.remove('has-value');
    }

    if (!start && field.value && (field.hasAttribute('required') || field.value && field.type === "radio") && (field.closest('.g-form-field') ? !field.closest('.g-form-field').classList.contains('hidden') : true)) {
      if (validateField(field)) {
        field.closest('.g-form-field').classList.remove('error');
        field.closest('.g-form-field').classList.add('valid');
      } else {
        field.closest('.g-form-field').classList.remove('valid');
        field.closest('.g-form-field').classList.add('error');
      }
    }
  }
}

function generateTemplate(options) {
  var type = options.typeForm || 'long_form_2';
  var result = "<div class=\"g-form-wrapper\">\n" + "<div class=\"g-form-container\">\n";

  if (type === "long_form_2") {
    result += generateFormContent(options);
  }

  if (type === "short_form_1") {
    result += generateShortFormContent(options);
  }

  result += generateResult() + "</div>\n" + "</div>";
  return result;
}

function generateFormContent(options) {
  // return "<form class=\"g-form\" novalidate>\n" + "<div id=\"optifin-main-title\" class=\"g-form__head\">\n" + "<h3 class=\"form-headline\">" + texts.headText.title + "</h3>\n" + "<p>" + texts.headText.subtitle + "</p>\n" + "<hr>\n" + "<p class=\"text\">" + texts.formText.topText + "</p>\n" + "</div>\n" + "<div id=\"form_inner\" class=\"g-form-inner\">\n" + "<h3>" + texts.formText.form.h3_one + "</h3>\n" + "<div class=\"g-form-field " + (texts.formText.form.field_1.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<label>\n" + "<input type=\"tel\" name=\"" + texts.formText.form.field_1.name + "\" class=\"optifin-mask-input\" required>" + // "<input type=\"tel\" name=\"" + texts.formText.form.field_1.name + "\" required>\n" +
  return "<form class=\"g-form\" novalidate>\n" + "<div id=\"optifin-main-title\" class=\"g-form__head\">\n" + "<h3 class=\"form-headline\">" + texts.headText.title + "</h3>\n" + "<p>" + texts.headText.subtitle + "</p>\n" + "<hr>\n" + "<p class=\"text\">" + texts.formText.topText + "</p>\n" + "</div>\n" + "<div id=\"form_inner\" class=\"g-form-inner\">\n" + "<h3>" + texts.formText.form.h3_one + "</h3>\n" + "<div class=\"g-form-field " + (texts.formText.form.field_1.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<label>\n" + "<input type=\"text\" name=\"" + texts.formText.form.field_1.name + "\" required>" + // "<input type=\"tel\" name=\"" + texts.formText.form.field_1.name + "\" required>\n" +
    "<span class=\"placeholder\">" + texts.formText.form.field_1.placeholder + " <i class=\"red\">*</i></span>\n" + // "<span class=\"with-value\">€</span>\n" +
    "</label>\n" + (texts.formText.form.field_1.popup_content ? "<span class=\"details-popup\">\n" + "<span class=\"details-toggle\"></span>\n" + "<span class=\"details-content\">\n" + "<span class=\"close\"></span>\n" + "<span class=\"content\">" + texts.formText.form.field_1.popup_content + "</span>\n" + "</span>\n" + "</span>\n" : '') + "</div>\n" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + texts.formText.form.field_1.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n" + "<div class=\"g-form-field " + (texts.formText.form.field_2.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<label>\n" + "<input type=\"text\" name=\"" + texts.formText.form.field_2.name + "\" required>" + // "<input type=\"tel\" name=\"" + texts.formText.form.field_2.name + "\" required>\n" +
    "<span class=\"placeholder\">" + texts.formText.form.field_2.placeholder + " <i class=\"red\">*</i></span>\n" + // "<span class=\"with-value\">€</span>\n" +
    "</label>\n" + (texts.formText.form.field_2.popup_content ? "<span class=\"details-popup\">\n" + "<span class=\"details-toggle\"></span>\n" + "<span class=\"details-content\">\n" + "<span class=\"close\"></span>\n" + "<span class=\"content\">" + texts.formText.form.field_2.popup_content + "</span>\n" + "</span>\n" + "</span>\n" : '') + "</div>\n" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + texts.formText.form.field_2.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n" + "<h3>" + texts.formText.form.h3_two + "</h3>\n" + "<div class=\"g-form-field checkbox-field" + (texts.formText.form.field_3.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + texts.formText.form.field_3.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + texts.formText.form.field_3.values.map(function (value) {
      return "<label class=\"checkbox-block\">\n" + "<input type=\"radio\" name=\"" + texts.formText.form.field_3.name + "\" value=\"" + value + "\" required>\n" + "<span>" + value + "</span>\n" + "</label>";
    }).join("") + "</div>\n" + "<div class=\"g-form-field" + (texts.formText.form.field_4.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<label>\n" + "<input type=\"text\" name=\"" + texts.formText.form.field_4.name + "\" required>\n" + "<span class=\"placeholder\">" + texts.formText.form.field_4.placeholder + " <i class=\"red\">*</i></span>\n" + "</label>\n" + "</div>\n" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + texts.formText.form.field_4.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n" + "<div class=\"g-form-field" + (texts.formText.form.field_5.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<label>\n" + "<input type=\"text\" name=\"" + texts.formText.form.field_5.name + "\" required>\n" + "<span class=\"placeholder\">" + texts.formText.form.field_5.placeholder + " <i class=\"red\">*</i></span>\n" + "</label>\n" + (texts.formText.form.field_5.popup_content ? "<span class=\"details-popup\">\n" + "<span class=\"details-toggle\"></span>\n" + "<span class=\"details-content\">\n" + "<span class=\"close\"></span>\n" + "<span class=\"content\">" + texts.formText.form.field_5.popup_content + "</span>\n" + "</span>\n" + "</span>\n" : '') + "</div>\n" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + texts.formText.form.field_5.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n" + "<div class=\"g-form-field" + (texts.formText.form.field_6.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<label>\n" + "<input type=\"email\" name=\"" + texts.formText.form.field_6.name + "\" required>\n" + "<span class=\"placeholder\">" + texts.formText.form.field_6.placeholder + " <i class=\"red\">*</i></span>\n" + "</label>\n" + (texts.formText.form.field_6.popup_content ? "<span class=\"details-popup\">\n" + "<span class=\"details-toggle\"></span>\n" + "<span class=\"details-content\">\n" + "<span class=\"close\"></span>\n" + "<span class=\"content\">" + texts.formText.form.field_6.popup_content + "</span>\n" + "</span>\n" + "</span>\n" : '') + "</div>\n" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + texts.formText.form.field_6.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n" + (options.styleDropdown ? "<div class=\"g-form-field with-variants" + (texts.formText.form.field_7.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<input name=\"" + texts.formText.form.field_7.name + "\" type=\"text\" class=\"with-search\" autocomplete=\"off\">\n" + "<span class=\"placeholder\">" + texts.formText.form.field_7.placeholder + "</span>\n" + "<ul class=\"variants\">\n" + (selectOptions["cf_state"] && selectOptions["cf_state"].length ? selectOptions["cf_state"] : texts.formText.form.field_7.values).sort(function (a, b) {
      if (b === "Sonstiges") return -1;
      if (a === "Sonstiges") return 1;
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }).map(function (value) {
      return "<li data-value=\"" + value + "\">\n" + "<div class=\"text\">" + value + "</div>\n" + "</li>\n";
    }).join("") + "</ul>\n" + (texts.formText.form.field_7.popup_content ? "<span class=\"details-popup\">\n" + "<span class=\"details-toggle\"></span>\n" + "<span class=\"details-content\">\n" + "<span class=\"close\"></span>\n" + "<span class=\"content\">" + texts.formText.form.field_7.popup_content + "</span>\n" + "</span>\n" + "</span>\n" : '') + "</div>\n" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + texts.formText.form.field_7.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n" : "<div class=\"g-form-field select" + (texts.formText.form.field_7.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<label>\n" + "<span class=\"wrap-select\">\n" + "<select name=\"" + texts.formText.form.field_7.name + "\">\n" + "<option value=\"\" selected hidden disabled></option>\n" + (selectOptions["cf_state"] && selectOptions["cf_state"].length ? selectOptions["cf_state"] : texts.formText.form.field_7.values).sort(function (a, b) {
      if (b === "Sonstiges") return -1;
      if (a === "Sonstiges") return 1;
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }).map(function (value) {
      return "<option value=\"" + value + "\">" + value + "</option>\n";
    }).join("") + "</select>\n" + "<div class=\"placeholder\">" + texts.formText.form.field_7.placeholder + "</div>\n" + "</span>\n" + "</label>\n" + (texts.formText.form.field_7.popup_content ? "<span class=\"details-popup\">\n" + "<span class=\"details-toggle\"></span>\n" + "<span class=\"details-content\">\n" + "<span class=\"close\"></span>\n" + "<span class=\"content\">" + texts.formText.form.field_7.popup_content + "</span>\n" + "</span>\n" + "</span>\n" : '') + "</div>" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + texts.formText.form.field_7.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n")  +
    // "<div class=\"g-form-field checkbox-field" + (texts.formText.form.field_9.popup_content ? " with-popup" : "") + "\">\n" +
    // "<div class=\"error-message\">\n" +
    // "<span>" + texts.formText.form.field_9.error_message + "</span>\n" +
    // "<div class=\"close\"></div>\n" +
    // "</div>\n" +
    // (texts.formText.form.field_9.values.map(function(value){
    // return "<label class=\"checkbox-block\">\n" +
    // "<input type=\"radio\" name=\"" + texts.formText.form.field_9.name + "\" value=\""+ value +"\">\n" +
    // "<span>" + value + "</span>\n" +
    // "</label>"
    // }).join("")) +
    // "</div>\n" +
    (options.styleDropdown ? "<div class=\"g-form-field with-variants hidden" + (texts.formText.form.field_8_1.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<input name=\"" + texts.formText.form.field_8_1.name + "\" type=\"text\" class=\"with-search\" autocomplete=\"off\">\n" + "<span class=\"placeholder\">" + texts.formText.form.field_8_1.placeholder + "</span>\n" + "<ul class=\"variants\">\n" + (texts.formText.form.field_8_1.values).map(function (value) {
      return "<li data-value=\"" + value + "\">\n" + "<div class=\"text\">" + value + "</div>\n" + "</li>\n";
    }).join("") + "</ul>\n" + (texts.formText.form.field_8_1.popup_content ? "<span class=\"details-popup\">\n" + "<span class=\"details-toggle\"></span>\n" + "<span class=\"details-content\">\n" + "<span class=\"close\"></span>\n" + "<span class=\"content\">" + texts.formText.form.field_8_1.popup_content + "</span>\n" + "</span>\n" + "</span>\n" : '') + "</div>\n" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + texts.formText.form.field_8_1.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n" : "<div class=\"g-form-field select hidden" + (texts.formText.form.field_8_1.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<label>\n" + "<span class=\"wrap-select\">\n" + "<select name=\"" + texts.formText.form.field_8_1.name + "\">\n" + "<option value=\"\" selected hidden disabled></option>\n" + texts.formText.form.field_8_1.values.map(function (value) {
      return "<option value=\"" + value + "\">" + value + "</option>\n";
    }).join("") + "</select>\n" + "<div class=\"placeholder\">" + texts.formText.form.field_8_1.placeholder + "</div>\n" + "</span>\n" + "</label>\n" + (texts.formText.form.field_8_1.popup_content ? "<span class=\"details-popup\">\n" + "<span class=\"details-toggle\"></span>\n" + "<span class=\"details-content\">\n" + "<span class=\"close\"></span>\n" + "<span class=\"content\">" + texts.formText.form.field_8_1.popup_content + "</span>\n" + "</span>\n" + "</span>\n" : '') + "</div>" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + texts.formText.form.field_8_1.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n") +

    (options.styleDropdown ? "<div class=\"g-form-field with-variants hidden" + (texts.formText.form.field_8_2.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<input name=\"" + texts.formText.form.field_8_2.name + "\" type=\"text\" class=\"with-search\" autocomplete=\"off\">\n" + "<span class=\"placeholder\">" + texts.formText.form.field_8_2.placeholder + "</span>\n" + "<ul class=\"variants\">\n" + (texts.formText.form.field_8_2.values).map(function (value) {
      return "<li data-value=\"" + value + "\">\n" + "<div class=\"text\">" + value + "</div>\n" + "</li>\n";
    }).join("") + "</ul>\n" + (texts.formText.form.field_8_2.popup_content ? "<span class=\"details-popup\">\n" + "<span class=\"details-toggle\"></span>\n" + "<span class=\"details-content\">\n" + "<span class=\"close\"></span>\n" + "<span class=\"content\">" + texts.formText.form.field_8_2.popup_content + "</span>\n" + "</span>\n" + "</span>\n" : '') + "</div>\n" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + texts.formText.form.field_8_2.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n" : "<div class=\"g-form-field select hidden" + (texts.formText.form.field_8_2.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<label>\n" + "<span class=\"wrap-select\">\n" + "<select name=\"" + texts.formText.form.field_8_2.name + "\">\n" + "<option value=\"\" selected hidden disabled></option>\n" + texts.formText.form.field_8_2.values.map(function (value) {
      return "<option value=\"" + value + "\">" + value + "</option>\n";
    }).join("") + "</select>\n" + "<div class=\"placeholder\">" + texts.formText.form.field_8_2.placeholder + "</div>\n" + "</span>\n" + "</label>\n" + (texts.formText.form.field_8_2.popup_content ? "<span class=\"details-popup\">\n" + "<span class=\"details-toggle\"></span>\n" + "<span class=\"details-content\">\n" + "<span class=\"close\"></span>\n" + "<span class=\"content\">" + texts.formText.form.field_8_2.popup_content + "</span>\n" + "</span>\n" + "</span>\n" : '') + "</div>" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + texts.formText.form.field_8_2.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n") +

    (options.styleDropdown ? "<div class=\"g-form-field with-variants hidden" + (texts.formText.form.field_8_3.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<input name=\"" + texts.formText.form.field_8_3.name + "\" type=\"text\" class=\"with-search\" autocomplete=\"off\">\n" + "<span class=\"placeholder\">" + texts.formText.form.field_8_3.placeholder + "</span>\n" + "<ul class=\"variants\">\n" + (texts.formText.form.field_8_3.values).map(function (value) {
      return "<li data-value=\"" + value + "\">\n" + "<div class=\"text\">" + value + "</div>\n" + "</li>\n";
    }).join("") + "</ul>\n" + (texts.formText.form.field_8_3.popup_content ? "<span class=\"details-popup\">\n" + "<span class=\"details-toggle\"></span>\n" + "<span class=\"details-content\">\n" + "<span class=\"close\"></span>\n" + "<span class=\"content\">" + texts.formText.form.field_8_3.popup_content + "</span>\n" + "</span>\n" + "</span>\n" : '') + "</div>\n" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + texts.formText.form.field_8_3.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n" : "<div class=\"g-form-field select hidden" + (texts.formText.form.field_8_3.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<label>\n" + "<span class=\"wrap-select\">\n" + "<select name=\"" + texts.formText.form.field_8_3.name + "\">\n" + "<option value=\"\" selected hidden disabled></option>\n" + texts.formText.form.field_8_3.values.map(function (value) {
      return "<option value=\"" + value + "\">" + value + "</option>\n";
    }).join("") + "</select>\n" + "<div class=\"placeholder\">" + texts.formText.form.field_8_3.placeholder + "</div>\n" + "</span>\n" + "</label>\n" + (texts.formText.form.field_8_3.popup_content ? "<span class=\"details-popup\">\n" + "<span class=\"details-toggle\"></span>\n" + "<span class=\"details-content\">\n" + "<span class=\"close\"></span>\n" + "<span class=\"content\">" + texts.formText.form.field_8_3.popup_content + "</span>\n" + "</span>\n" + "</span>\n" : '') + "</div>" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + texts.formText.form.field_8_3.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n") +


    "<div class=\"g-form-field select-tab"  + "\">\n"   + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>"  + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n" + "<div class=\"g-form-field" + (texts.formText.form.field_11.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<label>\n" + "<input type=\"tel\" name=\"" + texts.formText.form.field_11.name + "\" class=\"phone\" placeholder=\"\" required>\n" + "<span class=\"placeholder\">" + texts.formText.form.field_11.placeholder + " <i class=\"red\">*</i></span>\n" + "</label>\n" + (texts.formText.form.field_11.popup_content ? "<span class=\"details-popup\">\n" + "<span class=\"details-toggle\"></span>\n" + "<span class=\"details-content\">\n" + "<span class=\"close\"></span>\n" + "<span class=\"content\">" + texts.formText.form.field_11.popup_content + "</span>\n" + "</span>\n" + "</span>\n" : '') + "</div>\n" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + texts.formText.form.field_11.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n" + "<div class=\"g-form-field" + (texts.formText.form.field_12.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<label>\n" + "<textarea type=\"text\" name=\"" + texts.formText.form.field_12.name + "\" maxlength='4000'></textarea>\n" + "<span class=\"placeholder\">" + texts.formText.form.field_12.placeholder + "</span>\n" + "<span class=\"description\" data-description-start=\"" + texts.formText.form.field_12.description_start + "\" data-description-end=\"" + texts.formText.form.field_12.description_end + "\" data-description-max-count=\"" + texts.formText.form.field_12.max_counts + "\">\n" + texts.formText.form.field_12.description_start + " " + texts.formText.form.field_12.max_counts + " " + texts.formText.form.field_12.description_end + "</span>\n" + "</label>\n" + (texts.formText.form.field_12.popup_content ? "<span class=\"details-popup\">\n" + "<span class=\"details-toggle\"></span>\n" + "<span class=\"details-content\">\n" + "<span class=\"close\"></span>\n" + "<span class=\"content\">" + texts.formText.form.field_12.popup_content + "</span>\n" + "</span>\n" + "</span>\n" : '') + "</div>\n" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + texts.formText.form.field_12.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n" + (options.legaltext ? "<div class=\"g-form-field checkbox-single" + (texts.formText.form.field_13.popup_content ? " with-popup" : "") + "\">\n" + "<label>\n" + "<input type=\"checkbox\" name=\"" + texts.formText.form.field_13.name + "\" value=\"true\">\n" + "<span>" + texts.formText.form.field_13.placeholder + "</span>\n" + "</label>\n" + "</div>\n" : '') + "<button type=\"submit\" class=\"g-form-submit-btn\">" + texts.formText.form.btn_text + "</button>\n" + "</div>\n" + "</form>";
}

function generateShortFormContent(options) {
  return "<form class=\"g-form\" novalidate>\n" + "<div id=\"optifin-main-title\" class=\"g-form__head\">\n" + "<h3 class=\"form-headline\">" + textsShort.headText.title + "</h3>\n" + "<p>" + textsShort.headText.subtitle + "</p>\n" + "<hr>\n" + "<p class=\"text\">" + texts.formText.topText + "</p>\n" + "</div>\n" + "<div id=\"form_inner\" class=\"g-form-inner\">\n" + "<h3>" + textsShort.formText.form.h3_two + "</h3>\n" + "<div class=\"g-form-field checkbox-field" + (textsShort.formText.form.field_3.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + textsShort.formText.form.field_3.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + textsShort.formText.form.field_3.values.map(function (value) {
    return "<label class=\"checkbox-block\">\n" + "<input type=\"radio\" name=\"" + textsShort.formText.form.field_3.name + "\" value=\"" + value + "\" required>\n" + "<span>" + value + "</span>\n" + "</label>";
  }).join("") + "</div>\n" + "<div class=\"g-form-field" + (textsShort.formText.form.field_4.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<label>\n" + "<input type=\"text\" name=\"" + textsShort.formText.form.field_4.name + "\" required>\n" + "<span class=\"placeholder\">" + textsShort.formText.form.field_4.placeholder + " <i class=\"red\">*</i></span>\n" + "</label>\n" + "</div>\n" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + textsShort.formText.form.field_3.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n" + "<div class=\"g-form-field" + (texts.formText.form.field_6.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<label>\n" + "<input type=\"email\" name=\"" + textsShort.formText.form.field_6.name + "\" required>\n" + "<span class=\"placeholder\">" + textsShort.formText.form.field_6.placeholder + " <i class=\"red\">*</i></span>\n" + "</label>\n" + (textsShort.formText.form.field_6.popup_content ? "<span class=\"details-popup\">\n" + "<span class=\"details-toggle\"></span>\n" + "<span class=\"details-content\">\n" + "<span class=\"close\"></span>\n" + "<span class=\"content\">" + textsShort.formText.form.field_6.popup_content + "</span>\n" + "</span>\n" + "</span>\n" : '') + "</div>\n" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + textsShort.formText.form.field_6.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n" + "<div class=\"g-form-field" + (textsShort.formText.form.field_11.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<label>\n" + "<input type=\"tel\" name=\"" + textsShort.formText.form.field_11.name + "\" class=\"phone\" placeholder=\"\" required>\n" + "<span class=\"placeholder\">" + textsShort.formText.form.field_11.placeholder + " <i class=\"red\">*</i></span>\n" + "</label>\n" + (textsShort.formText.form.field_11.popup_content ? "<span class=\"details-popup\">\n" + "<span class=\"details-toggle\"></span>\n" + "<span class=\"details-content\">\n" + "<span class=\"close\"></span>\n" + "<span class=\"content\">" + textsShort.formText.form.field_11.popup_content + "</span>\n" + "</span>\n" + "</span>\n" : '') + "</div>\n" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + textsShort.formText.form.field_11.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n" + "<div class=\"g-form-field" + (textsShort.formText.form.field_12.popup_content ? " with-popup" : "") + "\">\n" + "<div class=\"wrap-input\">\n" + "<label>\n" + "<textarea type=\"text\" name=\"" + textsShort.formText.form.field_12.name + "\"></textarea>\n" + "<span class=\"placeholder\">" + textsShort.formText.form.field_12.placeholder + "</span>\n" + "</label>\n" + (textsShort.formText.form.field_12.popup_content ? "<span class=\"details-popup\">\n" + "<span class=\"details-toggle\"></span>\n" + "<span class=\"details-content\">\n" + "<span class=\"close\"></span>\n" + "<span class=\"content\">" + textsShort.formText.form.field_12.popup_content + "</span>\n" + "</span>\n" + "</span>\n" : '') + "</div>\n" + "<div class=\"error-message\">\n" + "<span>" + "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"511pt\" viewBox=\"0 -26 511.82388 511\" width=\"511pt\"><path d=\"m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0\" fill=\"#FE0000\"/><path d=\"m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0\" fill=\"#fff\"/><path d=\"m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0\" fill=\"#fff\"/></svg>" + textsShort.formText.form.field_12.error_message + "</span>\n" + "<div class=\"close\"></div>\n" + "</div>\n" + "</div>\n" + (options.legaltext ? "<div class=\"g-form-field checkbox-single" + (textsShort.formText.form.field_13.popup_content ? " with-popup" : "") + "\">\n" + "<label>\n" + "<input type=\"checkbox\" name=\"" + textsShort.formText.form.field_13.name + "\" value=\"true\">\n" + "<span>" + textsShort.formText.form.field_13.placeholder + "</span>\n" + "</label>\n" + "</div>\n" : '') + "<button type=\"submit\" class=\"g-form-submit-btn\">" + texts.formText.form.btn_text + "</button>\n" + "</div>\n" + "</form>";
}

function generateHeaderFormContent() {
  return "<div class=\"g-form-header\">\n" + "<div class=\"offert-logo\">\n" + "<img src=\"" + imgDir + "logo-klein.png\" alt=\"optifin-logo-klein\" class=\"offert-logo-img\">\n" + "</div>\n" + "</div>";
}

function generateResult() {
  return "<div class=\"results\" style=\"display: none\">\n" + "<p>" + texts.results.top_text + "</p>\n" + "<h3>" + texts.results.top_header + "</h3>\n" + "<p>" + texts.results.middle_text + "<br>" + texts.results.middle_second_text + "</p>\n" + "<p>" + texts.results.middle_third_text + "</p>\n" + "<p class=\"contact\">\n" + "<span>" + texts.results.telephone_text + "</span> <a href=\"tel:" + texts.results.telephone_href + "\">" + texts.results.telephone + "</a>\n <br>" + "<span>" + texts.results.mail_text + "</span> <a href=\"mailto:" + texts.results.mail + "\">" + texts.results.mail + "</a>\n" + "</p>\n" + "<p>" + texts.results.bottom_text + "<br>" + texts.results.bottom_text_second + "</p>\n" + "</div>";
}

function showResults(form) {
  form.style.display = "none";
  form.closest('.g-form-container').querySelector('.results').style.display = "block";
  window.scrollTo({
    top: getOffsetTop(form.closest('.g-form-container').querySelector('.results')),
    left: 0,
    behavior: 'smooth'
  });
}

function checkTabRowHeight(form) {
  var rows = form.querySelectorAll('.tab-row');

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    row.classList.remove('small');
    var rowHeight = row.offsetHeight;
    var maxHeight = 0;
    var labels = row.querySelectorAll('.wrap-tab');

    for (var j = 0; j < rows.length; j++) {
      var label = labels[j];

      if (label.offsetHeight > maxHeight) {
        maxHeight = label.offsetHeight;
      }
    }

    if (maxHeight < rowHeight) {
      row.classList.add('small');
    } else {
      row.classList.remove('small');
    }
  }
}

function generateId() {
  var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
    return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
}

function insertElementsWithEvents(element, options) {
  element.innerHTML = formTemplate;
  var stepsContainer = element.querySelector('#form_inner');
  var step1Container = document.createElement('div');
  step1Container.innerHTML = step1;
  var step2Container = document.createElement('div');
  step2Container.style.display = 'none';
  step2Container.innerHTML = step2;
  var step3Container = document.createElement('div');
  step3Container.style.display = 'none';
  step3Container.innerHTML = step3;
  var finalStepContainer = document.createElement('div');
  finalStepContainer.style.display = 'none';
  finalStepContainer.innerHTML = finalResult;
  findNavigationButtonsAndAddHandlers(element, step1Container, null, step2Container, firstStepValidation.bind(null, step1Container), false, options);
  findNavigationButtonsAndAddHandlers(element, step2Container, step1Container, step3Container, secondStepValidation.bind(null, step2Container), false, options);
  findNavigationButtonsAndAddHandlers(element, step3Container, step2Container, finalStepContainer, thirdStepValidation.bind(null, step3Container), true, options);
  stepsContainer.append(step1Container, step2Container, step3Container, finalStepContainer);
  element.querySelectorAll('.financing-object__radio').forEach(function (selector) {
    selector.addEventListener('change', function () {
      step1Container.querySelector('.g-form-next').click();
    });
  });
}

function insertHeader(form) {
  var container = form.querySelector('.g-form-container');
  var headerContainer = document.createElement('div');
  headerContainer.innerHTML = header;
  container.insertBefore(headerContainer, container.firstChild);
}

function insertNavHeader(form) {
  var stepsList = document.createElement('div');
  stepsList.id = 'optifin-steps-list';
  stepsList.innerHTML = steps;
  var containerForSteps = form.querySelector('.g-form');
  containerForSteps.insertBefore(stepsList, containerForSteps.firstChild);
}

function insertFooter(form) {
  var container = form.querySelector('.g-form-container');
  var footerContainer = document.createElement('div');
  footerContainer.innerHTML = footer;
  container.appendChild(footerContainer);
}

function findNavigationButtonsAndAddHandlers(form, container, prevStep, nextStep, nextStepValidation, isLast, options) {
  var next = container.querySelector('.g-form-next');
  var prev = container.querySelector('.g-form-back');

  if (next) {
    next.addEventListener('click', function (e) {
      e.preventDefault();

      if (nextStepValidation && nextStepValidation()) {
        container.style.display = 'none';
        nextStep.removeAttribute('style');

        if (!isLast) {
          handleActiveStep(form, nextStep.firstChild.dataset.step);
        }

        if (isLast) {
          form.querySelector('.g-form__head').style.display = 'none';
          var elements = form.querySelector('form').elements;
          var obj = {};

          for (var i = 0; i < elements.length; i++) {
            var item = elements.item(i);
            obj[item.name] = item.value;
          }

          if (obj['cf_financing_demand']) {
            // obj['cf_financing_demand'] = parseInt(obj['cf_financing_demand'].replace(/[,.' '€]/g, '')) / 100;
            obj['cf_financing_demand'] = parseInt(obj['cf_financing_demand'].replace(/[,.' '€]/g, ''));
          }

          if (obj['cf_own_funds']) {
            // obj['cf_own_funds'] = parseInt(obj['cf_own_funds'].replace(/[,.' '€]/g, '')) / 100;
            obj['cf_own_funds'] = parseInt(obj['cf_own_funds'].replace(/[,.' '€]/g, ''));
          }

          if (options.assigned_user_id) {
            obj['assigned_user_id'] = options.assigned_user_id;
          }

          obj['cf_1006'] = options.typeForm;
          obj['leadstatus'] = "unbearbeitet";
          obj['partnerid'] = 1;
          obj['source'] = 'WEBSERVICE';
          obj['cf_opti_pid'] = options.partnerId;
          obj['cf_partner_ref'] = options.partnerUrl;
          obj['cf_partner_url'] = options.partnerUrl;

          vtigerClient.doCreate('Leads', obj, handleActiveStep.bind(this, form, nextStep.firstChild.dataset.step, true));
        }
      }
    });
  }

  if (prev) {
    prev.addEventListener('click', function (e) {
      e.preventDefault();
      container.style.display = 'none';

      if (container.querySelectorAll('[data-step="1"]').length) {
        secondStepValidationClear(container);
      }

      handleActiveStep(form, prevStep.firstChild.dataset.step);
      prevStep.removeAttribute('style');
    });
  }
}

function handleActiveStep(form, index, isLast) {
  steps = form.querySelectorAll('.g-form-steps .g-form-step');
  steps.forEach(function (node) {
    node.classList.remove('g-form-step-active');
  });

  if (!isLast) {
    steps[index].classList.add('g-form-step-active');
  } else {
    var stepsWrapper = document.getElementById('optifin-steps-list');
    var mainTitle = document.getElementById('optifin-main-title');

    if (stepsWrapper) {
      stepsWrapper.style.display = 'none';
    }

    mainTitle.style.display = 'none';
  }
}

function firstStepValidation(container) {
  var radio = container.querySelectorAll('input[type="radio"]');
  return Array.prototype.slice.call(radio).some(function (item) {
    return item.checked;
  });
}

function secondStepValidation(container) {
  var textInputs = container.querySelectorAll('input[type="text"]');
  var arrayInputs = Array.prototype.slice.call(textInputs);
  var isValid = true;
  arrayInputs.forEach(function (item) {
    var parent = item.closest('.g-form-row');

    if (item.value.trim() === '') {
      isValid = false;
      parent && parent.classList.add('g-form-row__error');
    } else {
      parent && parent.classList.remove('g-form-row__error');
    }
  });
  return isValid;
}

function secondStepValidationClear(container) {
  var textInputs = container.querySelectorAll('input[type="text"]');
  var arrayInputs = Array.prototype.slice.call(textInputs);
  var isValid = true;
  arrayInputs.forEach(function (item) {
    var parent = item.closest('.g-form-row');
    parent && parent.classList.remove('g-form-row__error');
  });
  return isValid;
}

function thirdStepValidation(container) {
  var textInputs = container.querySelectorAll('input[type="text"]');
  var arrayInputs = Array.prototype.slice.call(textInputs);
  var isValid = true;
  arrayInputs.forEach(function (item) {
    var parent = item.closest('.g-form-row');

    if (item.value.trim() === '') {
      isValid = false;
      parent && parent.classList.add('g-form-row__error');
    } else {
      if (item.classList.contains('is-email')) {
        if (emailRegExpr.test(item.value.trim())) {
          parent && parent.classList.remove('g-form-row__error');
        } else {
          isValid = false;
          parent && parent.classList.add('g-form-row__error');
        }
      } else {
        parent && parent.classList.remove('g-form-row__error');
      }
    }
  });
  return isValid;
}

function enableMasker(id) {
  VMasker(document.querySelectorAll('#data-form-id-' + id + ' .optifin-mask-input')).maskMoney({
    precision: 0,
    separator: ',-',
    delimiter: '.',
    suffixUnit: '€',
    zeroCents: true
  });
}


const kaufenodermietenrechner = document.querySelector('#kaufenodermietenrechner');
const hauskostenrechner = document.querySelector('#hauskostenrechner');
const haushaltsbudgetrechner = document.querySelector('#haushaltsbudgetrechner');
const effektivzinssatzrechner = document.querySelector('#effektivzinssatzrechner');
const kreditrechner = document.querySelector('#kreditrechner');
const nebenkostenrechner = document.querySelector('#nebenkostenrechner');
const umschuldungsrechner = document.querySelector('#umschuldungsrechner');

var shortcodeAtts;
if(kaufenodermietenrechner) {
  shortcodeAtts = typeof shortcode_atts_kaufenodermietenrechner !== "undefined" ? shortcode_atts_kaufenodermietenrechner : null;
} else if(hauskostenrechner) {
  shortcodeAtts = typeof shortcode_atts_hauskostenrechner !== "undefined" ? shortcode_atts_hauskostenrechner : null;
} else if(haushaltsbudgetrechner) {
  shortcodeAtts = typeof shortcode_atts_haushaltsbudgetrechner !== "undefined" ? shortcode_atts_haushaltsbudgetrechner : null;
} else if(effektivzinssatzrechner) {
  shortcodeAtts = typeof shortcode_atts_effektivzinssatzrechner !== "undefined" ? shortcode_atts_effektivzinssatzrechner : null;
} else if(kreditrechner) {
  shortcodeAtts = typeof shortcode_atts_kreditrechner !== "undefined" ? shortcode_atts_kreditrechner : null;
} else if(nebenkostenrechner) {
  shortcodeAtts = typeof shortcode_atts_nebenkostenrechner !== "undefined" ? shortcode_atts_nebenkostenrechner : null;
} else if(umschuldungsrechner) {
  shortcodeAtts = typeof shortcode_atts_umschuldungsrechner !== "undefined" ? shortcode_atts_umschuldungsrechner : null;
}
const opti_pid = shortcodeAtts ? shortcodeAtts.opti_pid : false;
const opti_purl = shortcodeAtts ? shortcodeAtts.opti_purl : false;

var form3 = new buildOptifinForm({
  selector: '#lf1',
  showHeader: !0,
  showNavHeader: !0,
  showFooter: !0,
  styleDropdown: !1,
  partnerId: opti_pid,
  partnerUrl: opti_purl,
  legaltext: !0,
  typeForm: "long_form_2"
});
