!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=5)}({5:function(e,t,n){e.exports=n("BHd/")},"BHd/":function(e,t,n){"use strict";n.r(t);var r=n("EuuU"),o=n("xvUD"),a=n("ZDLt");jQuery((function(e){var t=e("#pb-cloner-form");t.on("submit",(function(n){n.preventDefault();var i=e("#pb-cloner-button"),c=e("#pb-sse-progressbar"),s=e("#pb-sse-info"),u=e(".notice"),d=null;c.val(0).show(),i.attr("disabled",!0).hide(),u.remove();var l=PB_ClonerToken.ajaxUrl+(PB_ClonerToken.ajaxUrl.includes("?")?"&":"?")+e.param(t.find(":input")),f=new EventSource(l);f.onopen=function(){d=Object(a.a)(),e(window).on("beforeunload",(function(){return PB_ClonerToken.unloadWarning}))},f.onmessage=function(t){var n=JSON.parse(t.data);switch(n.action){case"updateStatusBar":c.val(parseInt(n.percentage,10)),s.html(n.info);break;case"complete":f.close(),e(window).unbind("beforeunload"),n.error?(c.val(0).hide(),i.attr("disabled",!1).show(),Object(r.a)("error",n.error,!0),d&&Object(o.a)(d)):window.location=PB_ClonerToken.redirectUrl}},f.onerror=function(){f.close(),e("#pb-sse-progressbar").removeAttr("value"),e("#pb-sse-info").html("EventStream Connection Error "+PB_ClonerToken.reloadSnippet),e(window).unbind("beforeunload"),d&&Object(o.a)(d)}}))}))},EuuU:function(e,t,n){"use strict";t.a=function(e,t,n){var r,o=document.createElement("div"),a=document.createElement("p"),i=document.getElementsByTagName("h1")[0];if(a.setAttribute("aria-live","assertive"),a.insertAdjacentHTML("beforeend",t),o.classList.add("notice","notice-".concat(e)),o.appendChild(a),n){r=document.createElement("button");var c=document.createElement("span");r.classList.add("notice-dismiss"),c.classList.add("screen-reader-text"),c.appendChild(document.createTextNode("Dismiss this notice.")),r.appendChild(c),o.classList.add("is-dismissible"),o.appendChild(r)}i.parentNode.insertBefore(o,i.nextSibling),r&&(r.onclick=function(){o.parentNode.removeChild(o)})}},ZDLt:function(e,t,n){"use strict";var r=function(e){return e>9?e:"0".concat(e)};t.a=function(){var e=document.getElementById("pb-sse-seconds"),t=document.getElementById("pb-sse-minutes"),n=0;return t.textContent="00:",e.textContent="00",setInterval((function(){e.textContent=r(++n%60),t.textContent=r(parseInt(n/60,10))+":"}),1e3)}},xvUD:function(e,t,n){"use strict";t.a=function(e){var t=document.getElementById("pb-sse-seconds");document.getElementById("pb-sse-minutes").textContent="",t.textContent="",clearInterval(e)}}});