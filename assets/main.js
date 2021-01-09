!function(n){var o={};function i(e){if(o[e])return o[e].exports;var t=o[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=n,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=1)}([function(e,t,n){var o,i;
/*!
 * baguetteBox.js
 * @author  feimosi
 * @version 1.11.1
 * @url https://github.com/feimosi/baguetteBox.js
 */!function(){"use strict";void 0===(i="function"==typeof(o=function(){"use strict";var a,s,u,l,o,i='<svg width="44" height="60"><polyline points="30 10 10 30 30 50" stroke="rgba(255,255,255,0.5)" stroke-width="4"stroke-linecap="butt" fill="none" stroke-linejoin="round"/></svg>',r='<svg width="44" height="60"><polyline points="14 10 34 30 14 50" stroke="rgba(255,255,255,0.5)" stroke-width="4"stroke-linecap="butt" fill="none" stroke-linejoin="round"/></svg>',c='<svg width="30" height="30"><g stroke="rgb(160,160,160)" stroke-width="4"><line x1="5" y1="5" x2="25" y2="25"/><line x1="5" y1="25" x2="25" y2="5"/></g></svg>',d={},f={captions:!0,buttons:"auto",fullScreen:!1,noScrollbars:!1,bodyClass:"baguetteBox-open",titleTag:!1,async:!1,preload:2,animation:"slideIn",afterShow:null,afterHide:null,onChange:null,overlayBackgroundColor:"rgba(0,0,0,.8)"},g={},p=[],n=0,m=!1,v={},b=!1,y=/.+\.(gif|jpe?g|png|webp)/i,h={},w=[],t=null,k=function(e){-1!==e.target.id.indexOf("baguette-img")&&O()},E=function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,H()},x=function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,M()},C=function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,O()},L=function(e){v.count++,1<v.count&&(v.multitouch=!0),v.startX=e.changedTouches[0].pageX,v.startY=e.changedTouches[0].pageY},B=function(e){if(!b&&!v.multitouch){e.preventDefault?e.preventDefault():e.returnValue=!1;var t=e.touches[0]||e.changedTouches[0];40<t.pageX-v.startX?(b=!0,H()):t.pageX-v.startX<-40?(b=!0,M()):100<v.startY-t.pageY&&O()}},S=function(){v.count--,v.count<=0&&(v.multitouch=!1),b=!1},P=function(){S()},T=function(e){"block"===a.style.display&&a.contains&&!a.contains(e.target)&&(e.stopPropagation(),_())};function N(e){if(h.hasOwnProperty(e)){var t=h[e].galleries;[].forEach.call(t,function(e){[].forEach.call(e,function(e){V(e.imageElement,"click",e.eventHandler)}),p===e&&(p=[])}),delete h[e]}}function q(e){switch(e.keyCode){case 37:H();break;case 39:M();break;case 27:O();break;case 36:!function e(t){t&&t.preventDefault();return I(0)}(e);break;case 35:!function e(t){t&&t.preventDefault();return I(p.length-1)}(e)}}function A(e,t){if(p!==e){for(p=e,function e(t){t=t||{};for(var n in f)d[n]=f[n],"undefined"!=typeof t[n]&&(d[n]=t[n]);s.style.transition=s.style.webkitTransition="fadeIn"===d.animation?"opacity .4s ease":"slideIn"===d.animation?"":"none","auto"===d.buttons&&("ontouchstart"in window||1===p.length)&&(d.buttons=!1);u.style.display=l.style.display=d.buttons?"":"none";try{a.style.backgroundColor=d.overlayBackgroundColor}catch(e){}}(t);s.firstChild;)s.removeChild(s.firstChild);for(var n,o=[],i=[],r=w.length=0;r<e.length;r++)(n=U("div")).className="full-image",n.id="baguette-img-"+r,w.push(n),o.push("baguetteBox-figure-"+r),i.push("baguetteBox-figcaption-"+r),s.appendChild(w[r]);a.setAttribute("aria-labelledby",o.join(" ")),a.setAttribute("aria-describedby",i.join(" "))}}function j(e){d.noScrollbars&&(document.documentElement.style.overflowY="hidden",document.body.style.overflowY="scroll"),"block"!==a.style.display&&(z(document,"keydown",q),v={count:0,startX:null,startY:null},F(n=e,function(){X(n),D(n)}),R(),a.style.display="block",d.fullScreen&&function e(){a.requestFullscreen?a.requestFullscreen():a.webkitRequestFullscreen?a.webkitRequestFullscreen():a.mozRequestFullScreen&&a.mozRequestFullScreen()}(),setTimeout(function(){a.className="visible",d.bodyClass&&document.body.classList&&document.body.classList.add(d.bodyClass),d.afterShow&&d.afterShow()},50),d.onChange&&d.onChange(n,w.length),t=document.activeElement,_(),m=!0)}function _(){d.buttons?u.focus():o.focus()}function O(){d.noScrollbars&&(document.documentElement.style.overflowY="auto",document.body.style.overflowY="auto"),"none"!==a.style.display&&(V(document,"keydown",q),a.className="",setTimeout(function(){a.style.display="none",document.fullscreen&&function e(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen()}(),d.bodyClass&&document.body.classList&&document.body.classList.remove(d.bodyClass),d.afterHide&&d.afterHide(),t&&t.focus(),m=!1},500))}function F(t,n){var e=w[t],o=p[t];if(void 0!==e&&void 0!==o)if(e.getElementsByTagName("img")[0])n&&n();else{var i=o.imageElement,r=i.getElementsByTagName("img")[0],a="function"==typeof d.captions?d.captions.call(p,i):i.getAttribute("data-caption")||i.title,s=function e(t){var n=t.href;if(t.dataset){var o=[];for(var i in t.dataset)"at-"!==i.substring(0,3)||isNaN(i.substring(3))||(o[i.replace("at-","")]=t.dataset[i]);for(var r=Object.keys(o).sort(function(e,t){return parseInt(e,10)<parseInt(t,10)?-1:1}),a=window.innerWidth*window.devicePixelRatio,s=0;s<r.length-1&&r[s]<a;)s++;n=o[r[s]]||n}return n}(i),u=U("figure");if(u.id="baguetteBox-figure-"+t,u.innerHTML='<div class="baguetteBox-spinner"><div class="baguetteBox-double-bounce1"></div><div class="baguetteBox-double-bounce2"></div></div>',d.captions&&a){var l=U("figcaption");l.id="baguetteBox-figcaption-"+t,l.innerHTML=a,u.appendChild(l)}e.appendChild(u);var c=U("img");c.onload=function(){var e=document.querySelector("#baguette-img-"+t+" .baguetteBox-spinner");u.removeChild(e),!d.async&&n&&n()},c.setAttribute("src",s),c.alt=r&&r.alt||"",d.titleTag&&a&&(c.title=a),u.appendChild(c),d.async&&n&&n()}}function M(){return I(n+1)}function H(){return I(n-1)}function I(e,t){return!m&&0<=e&&e<t.length?(A(t,d),j(e),!0):e<0?(d.animation&&Y("left"),!1):e>=w.length?(d.animation&&Y("right"),!1):(F(n=e,function(){X(n),D(n)}),R(),d.onChange&&d.onChange(n,w.length),!0)}function Y(e){s.className="bounce-from-"+e,setTimeout(function(){s.className=""},400)}function R(){var e=100*-n+"%";"fadeIn"===d.animation?(s.style.opacity=0,setTimeout(function(){g.transforms?s.style.transform=s.style.webkitTransform="translate3d("+e+",0,0)":s.style.left=e,s.style.opacity=1},400)):g.transforms?s.style.transform=s.style.webkitTransform="translate3d("+e+",0,0)":s.style.left=e}function X(e){e-n>=d.preload||F(e+1,function(){X(e+1)})}function D(e){n-e>=d.preload||F(e-1,function(){D(e-1)})}function z(e,t,n,o){e.addEventListener?e.addEventListener(t,n,o):e.attachEvent("on"+t,function(e){(e=e||window.event).target=e.target||e.srcElement,n(e)})}function V(e,t,n,o){e.removeEventListener?e.removeEventListener(t,n,o):e.detachEvent("on"+t,n)}function W(e){return document.getElementById(e)}function U(e){return document.createElement(e)}return[].forEach||(Array.prototype.forEach=function(e,t){for(var n=0;n<this.length;n++)e.call(t,this[n],n,this)}),[].filter||(Array.prototype.filter=function(e,t,n,o,i){for(n=this,o=[],i=0;i<n.length;i++)e.call(t,n[i],i,n)&&o.push(n[i]);return o}),{run:function e(t,n){return g.transforms=function e(){var t=U("div");return"undefined"!=typeof t.style.perspective||"undefined"!=typeof t.style.webkitPerspective}(),g.svg=function e(){var t=U("div");return t.innerHTML="<svg/>","http://www.w3.org/2000/svg"===(t.firstChild&&t.firstChild.namespaceURI)}(),g.passiveEvents=function e(){var t=!1;try{var n=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("test",null,n)}catch(e){}return t}(),function e(){if(a=W("baguetteBox-overlay"))return s=W("baguetteBox-slider"),u=W("previous-button"),l=W("next-button"),void(o=W("close-button"));(a=U("div")).setAttribute("role","dialog"),a.id="baguetteBox-overlay",document.getElementsByTagName("body")[0].appendChild(a),(s=U("div")).id="baguetteBox-slider",a.appendChild(s),(u=U("button")).setAttribute("type","button"),u.id="previous-button",u.setAttribute("aria-label","Previous"),u.innerHTML=g.svg?i:"&lt;",a.appendChild(u),(l=U("button")).setAttribute("type","button"),l.id="next-button",l.setAttribute("aria-label","Next"),l.innerHTML=g.svg?r:"&gt;",a.appendChild(l),(o=U("button")).setAttribute("type","button"),o.id="close-button",o.setAttribute("aria-label","Close"),o.innerHTML=g.svg?c:"&times;",a.appendChild(o),u.className=l.className=o.className="baguetteBox-button",function e(){var t=g.passiveEvents?{passive:!1}:null,n=g.passiveEvents?{passive:!0}:null;z(a,"click",k),z(u,"click",E),z(l,"click",x),z(o,"click",C),z(s,"contextmenu",P),z(a,"touchstart",L,n),z(a,"touchmove",B,t),z(a,"touchend",S),z(document,"focus",T,!0)}()}(),N(t),function e(t,r){var n=document.querySelectorAll(t),o={galleries:[],nodeList:n};return h[t]=o,[].forEach.call(n,function(e){r&&r.filter&&(y=r.filter);var t=[];if(t="A"===e.tagName?[e]:e.getElementsByTagName("a"),0!==(t=[].filter.call(t,function(e){if(-1===e.className.indexOf(r&&r.ignoreClass))return y.test(e.href)})).length){var i=[];[].forEach.call(t,function(e,t){var n=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1,A(i,r),j(t)},o={eventHandler:n,imageElement:e};z(e,"click",n),i.push(o)}),o.galleries.push(i)}}),o.galleries}(t,n)},show:I,showNext:M,showPrevious:H,hide:O,destroy:function e(){!function e(){var t=g.passiveEvents?{passive:!1}:null,n=g.passiveEvents?{passive:!0}:null;V(a,"click",k),V(u,"click",E),V(l,"click",x),V(o,"click",C),V(s,"contextmenu",P),V(a,"touchstart",L,n),V(a,"touchmove",B,t),V(a,"touchend",S),V(document,"focus",T,!0)}(),function e(){for(var t in h)h.hasOwnProperty(t)&&N(t)}(),V(document,"keydown",q),document.getElementsByTagName("body")[0].removeChild(document.getElementById("baguetteBox-overlay")),h={},p=[],n=0}}})?o.call(t,n,t,e):o)||(e.exports=i)}()},function(e,t,n){n(2),n(3),e.exports=n(4)},function(e,t,n){"use strict";n.r(t);var o=n(0),i=n.n(o);window.addEventListener("load",function(){i.a.run(".post-content .post-img-lb")})},function(e,t){function n(){return window.matchMedia(l).matches}function o(){a&&a.classList.toggle("hidden",!n()),r&&r.classList.toggle("hidden",n()),u&&u.classList.toggle("hidden",!n())}var i=document.querySelector(".container"),r=document.querySelector(".menu"),a=document.querySelector(".menu-trigger"),s=(document.querySelector(".menu__inner--desktop"),document.querySelector(".menu__sub-inner-more-trigger")),u=document.querySelector(".menu__sub-inner-more"),l=getComputedStyle(document.body).getPropertyValue("--phoneWidth");r&&r.addEventListener("click",function(e){return e.stopPropagation()}),u&&u.addEventListener("click",function(e){return e.stopPropagation()}),o(),document.body.addEventListener("click",function(){n()||!u||u.classList.contains("hidden")?n()&&!r.classList.contains("hidden")&&r.classList.add("hidden"):u.classList.add("hidden")}),window.addEventListener("resize",o),a&&a.addEventListener("click",function(e){e.stopPropagation(),r&&r.classList.toggle("hidden")}),s&&s.addEventListener("click",function(e){e.stopPropagation(),u&&u.classList.toggle("hidden"),u.getBoundingClientRect().right>i.getBoundingClientRect().right&&(u.style.left="auto",u.style.right=0)})},function(e,t){var n=getComputedStyle(document.body).getPropertyValue("--phoneWidth");if(!window.matchMedia(n).matches){var o=document.querySelector(".language-selector-current"),i=document.querySelector(".language-selector__more");document.body.addEventListener("click",function(){i&&!i.classList.contains("hidden")&&i.classList.add("hidden")}),o&&o.addEventListener("click",function(e){e.stopPropagation(),i.classList.toggle("hidden")})}}]);