parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"omYY":[function(require,module,exports) {
function n(n,r){var e;if("undefined"==typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(e=t(n))||r&&n&&"number"==typeof n.length){e&&(n=e);var o=0,a=function(){};return{s:a,n:function(){return o>=n.length?{done:!0}:{done:!1,value:n[o++]}},e:function(n){throw n},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,c=!1;return{s:function(){e=n[Symbol.iterator]()},n:function(){var n=e.next();return u=n.done,n},e:function(n){c=!0,i=n},f:function(){try{u||null==e.return||e.return()}finally{if(c)throw i}}}}function t(n,t){if(n){if("string"==typeof n)return r(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);return"Object"===e&&n.constructor&&(e=n.constructor.name),"Map"===e||"Set"===e?Array.from(n):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?r(n,t):void 0}}function r(n,t){(null==t||t>n.length)&&(t=n.length);for(var r=0,e=new Array(t);r<t;r++)e[r]=n[r];return e}var e=document.getElementById("buttonDiv"),o=["#3aa757","#e8453c","#f9bb2d","#4688f1"];function a(t){var r,o=n(t);try{var a=function(){var n=r.value,t=document.createElement("button");t.style.backgroundColor=n,t.addEventListener("click",function(){chrome.storage.sync.set({color:n},function(){console.log("color is "+n)})}),e.appendChild(t)};for(o.s();!(r=o.n()).done;)a()}catch(i){o.e(i)}finally{o.f()}}a(o);
},{}]},{},["omYY"], null)
//# sourceMappingURL=/options.9097c942.js.map