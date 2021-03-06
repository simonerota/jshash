/*
MIT License

Copyright (c) 2019 Simone Rota
Adapted from smbshah.js, Copyright (C) 2011-2012  Joshua M. Clulow <josh@sysmgr.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice (including the next
paragraph) shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF
OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/



function str_pad(input, pad_length, pad_string) {
    while (input.length < pad_length) {
        input += pad_string;
    }
    return input;
}

function expandkey(key56)
{
  var key64 = [];

  key64[0] = key56[0] & 0xFE;
  key64[1] = ((key56[0] << 7) & 0xFF) | (key56[1] >> 1);
  key64[2] = ((key56[1] << 6) & 0xFF) | (key56[2] >> 2);
  key64[3] = ((key56[2] << 5) & 0xFF) | (key56[3] >> 3);
  key64[4] = ((key56[3] << 4) & 0xFF) | (key56[4] >> 4);
  key64[5] = ((key56[4] << 3) & 0xFF) | (key56[5] >> 5);
  key64[6] = ((key56[5] << 2) & 0xFF) | (key56[6] >> 6);
  key64[7] =  (key56[6] << 1) & 0xFF;

  return key64;
}

/*
 * Fix (odd) parity bits in a 64-bit DES key.
 */
function oddpar(buf)
{
  for (var j = 0; j < buf.length; j++) {
    var par = 1;
    for (var i = 1; i < 8; i++) {
      par = (par + ((buf[j] >> i) & 1)) % 2;
    }
    buf[j] |= par & 1;
  }
  return buf;
}

function arraytostr(a) {
    var ret = "";
    for (var i=0; i < a.length; i++) {
        ret += String.fromCharCode(a[i]);
    }
    return ret;
}

function string2Hex(s) {
    var r = "";
    var hexes = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
    for (var i=0; i<s.length; i++) {r += hexes [s.charCodeAt(i) >> 4] + hexes [s.charCodeAt(i) & 0xf];}
    return r;
  }

function hex2String (h) {
    var r = "";
    for (var i= (h.substr(0, 2)=="0x")?2:0; i<h.length; i+=2) {r += String.fromCharCode (parseInt (h.substr (i, 2), 16));}
    return r;
}

function lmhash(str) {

    password = str.toUpperCase();
	  password = password.substr(0, 14);
    password = str_pad(password, 14, String.fromCharCode(0));
    var y = [];
    for (k = 0; k < password.length; k++) {
        y[k] = password.charCodeAt(k);
    }

    var halves = [
        arraytostr(oddpar(expandkey(y.slice(0, 7)))),
        arraytostr(oddpar(expandkey(y.slice(7, 14))))
    ];
    
    var d1 = des(halves[0], "KGS!@#$%", 1);
    var d2 = des(halves[1], "KGS!@#$%", 1);

    var d = d1.concat(d2);
    return string2Hex(d);

}
