(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{"0b8eb3e35929778b339a":function(e,t,n){"use strict";n.r(t);var r,o=n("5744828f4855bfd1694a"),i=n("3ed81f8d24b90b29f580"),a=Object(i.a)(function(){return Promise.all([n.e(18),n.e(25)]).then(n.bind(null,"b8e308020f3b1fdee1d9"))}),c=n("d784e1c0a913ee720a01"),s=n("6542cd13fd5dd1bcffd4").selectFirebase,u=n("a28fc3c963a1d4d1a2e5").createSelector,f=(n("8a2d1b95e05b6a321e74"),n("8af190b70a6bc55c6f1b")),l=n.n(f),d=n("a28fc3c963a1d4d1a2e5"),h=n("d7dd51e1bf6bfc2c9c3d"),p=n("ab4cb61bcb2dc161defb"),b=n("4a5602adf82fe13d6438");var v={arrows:!1,infinite:!0,speed:500,slidesToScroll:1,slidesToShow:3,centerPadding:"100px",responsive:[{breakpoint:1280,settings:{slidesToShow:2}},{breakpoint:900,settings:{slidesToShow:1}}]};var m,y=Object(d.createStructuredSelector)({courses:u(s,function(e){return e.ordered.courses})}),g=Object(h.connect)(y),w=Object(p.compose)(Object(b.firebaseConnect)(function(){return[{path:"courses"}]}),g)(function(e){var t=e.courses;return function(e,t,n,o){r||(r="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,a=arguments.length-3;if(t||0===a||(t={children:void 0}),t&&i)for(var c in i)void 0===t[c]&&(t[c]=i[c]);else t||(t=i||{});if(1===a)t.children=o;else if(a>1){for(var s=new Array(a),u=0;u<a;u++)s[u]=arguments[u+3];t.children=s}return{$$typeof:r,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}(c.a,{CardComponent:a,details:t,sliderName:"Upcoming Courses",sliderSettings:v,bgColor:Object(o.useColorModeValue)("white.400","gray.800")})});function _(){return(_=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function O(e,t,n,r){m||(m="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),t&&o)for(var a in o)void 0===t[a]&&(t[a]=o[a]);else t||(t=o||{});if(1===i)t.children=r;else if(i>1){for(var c=new Array(i),s=0;s<i;s++)c[s]=arguments[s+3];t.children=c}return{$$typeof:m,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}var x=O("br",{}),C=O(o.Text,{as:"span",color:"red.500"},void 0,"Learn Together!"),j=O(o.Image,{alt:"Hero Image",fit:"cover",align:"center",w:"100%",h:"100%",src:"https://images.pexels.com/photos/6335/man-coffee-cup-pen.jpg?auto=compress"});var S,E=Object(o.createIcon)({displayName:"PlayIcon",viewBox:"0 0 58 58",d:"M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z"}),M=O(E,{w:12,h:12}),k=O("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z",fill:"currentColor"}),T=function(e){return l.a.createElement(o.Icon,_({width:"100%",viewBox:"0 0 578 440",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e),k)},A=Object(f.memo)(function(){return O(o.Box,{bgColor:Object(o.useColorModeValue)("rgb(237 242 247 / 0.5)","rgb(23 25 35 / 0.4)"),mb:12},void 0,O(o.Container,{maxW:"7xl",pb:"5rem"},void 0,O(o.Stack,{align:"center",spacing:{base:8,md:10},py:{base:20,md:28},direction:{base:"column",md:"row"}},void 0,O(o.Stack,{flex:1,spacing:{base:5,md:10}},void 0,O(o.Heading,{lineHeight:1.1,fontWeight:700,fontSize:{base:"4xl",sm:"5xl",lg:"6xl"}},void 0,O(o.Text,{as:"span",position:"relative",_after:{content:"''",width:"full",height:"30%",position:"absolute",bottom:1,left:0,bg:Object(o.useColorModeValue)("red.300","red.500"),zIndex:-1}},void 0,"Learn Everywhere,"),x,C),O(o.Text,{color:"gray.500",fontSize:{md:"lg"}},void 0,"Online courses have taken the world by storm. We help you find like-minded individuals to learn together interactively and in real-time."),O(o.Stack,{spacing:{base:4,sm:6},direction:{base:"column",sm:"row"}},void 0,O(o.Button,{rounded:"md",size:"lg",fontWeight:"semibold",px:6,colorScheme:"red",color:"white",bg:Object(o.useColorModeValue)("red.400","red.500")},void 0,"Get started"),O(o.Button,{rounded:"md",size:"lg",fontWeight:"normal",px:6,leftIcon:O(E,{h:4,w:4,color:Object(o.useColorModeValue)("gray.400","gray.300")})},void 0,"How It Works"))),O(o.Flex,{flex:1,justify:"center",align:"center",position:"relative",w:"full"},void 0,O(T,{w:"150%",h:"150%",position:"absolute",top:"-20%",left:0,zIndex:-1,color:Object(o.useColorModeValue)("red.100","red.500")}),O(o.Box,{position:"relative",height:"300px",rounded:"2xl",boxShadow:"2xl",width:"full",overflow:"hidden"},void 0,O(o.IconButton,{"aria-label":"Play Button",variant:"ghost",_hover:{bg:"transparent"},icon:M,size:"lg",color:"white",position:"absolute",left:"50%",top:"50%",transform:"translateX(-50%) translateY(-50%)"}),j)))))});function I(e,t,n,r){S||(S="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),t&&o)for(var a in o)void 0===t[a]&&(t[a]=o[a]);else t||(t=o||{});if(1===i)t.children=r;else if(i>1){for(var c=new Array(i),s=0;s<i;s++)c[s]=arguments[s+3];t.children=c}return{$$typeof:S,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}var B=I(o.Box,{},void 0,I(A,{}),I(w,{}));t.default=Object(p.compose)(f.memo)(function(){return B})},bace86ab871ad70aba9b:function(e,t,n){(function(t){var n;n=function(){"use strict";var e=function(){if("undefined"!==typeof Map)return Map;function e(e,t){var n=-1;return e.some(function(e,r){return e[0]===t&&(n=r,!0)}),n}return function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(t){var n=e(this.__entries__,t),r=this.__entries__[n];return r&&r[1]},t.prototype.set=function(t,n){var r=e(this.__entries__,t);~r?this.__entries__[r][1]=n:this.__entries__.push([t,n])},t.prototype.delete=function(t){var n=this.__entries__,r=e(n,t);~r&&n.splice(r,1)},t.prototype.has=function(t){return!!~e(this.__entries__,t)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(e,t){void 0===t&&(t=null);for(var n=0,r=this.__entries__;n<r.length;n++){var o=r[n];e.call(t,o[1],o[0])}},t}()}(),n="undefined"!==typeof window&&"undefined"!==typeof document&&window.document===document,r="undefined"!==typeof t&&t.Math===Math?t:"undefined"!==typeof self&&self.Math===Math?self:"undefined"!==typeof window&&window.Math===Math?window:Function("return this")(),o="function"===typeof requestAnimationFrame?requestAnimationFrame.bind(r):function(e){return setTimeout(function(){return e(Date.now())},1e3/60)},i=2,a=20,c=["top","right","bottom","left","width","height","size","weight"],s="undefined"!==typeof MutationObserver,u=function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=function(e,t){var n=!1,r=!1,a=0;function c(){n&&(n=!1,e()),r&&u()}function s(){o(c)}function u(){var e=Date.now();if(n){if(e-a<i)return;r=!0}else n=!0,r=!1,setTimeout(s,t);a=e}return u}(this.refresh.bind(this),a)}return e.prototype.addObserver=function(e){~this.observers_.indexOf(e)||this.observers_.push(e),this.connected_||this.connect_()},e.prototype.removeObserver=function(e){var t=this.observers_,n=t.indexOf(e);~n&&t.splice(n,1),!t.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},e.prototype.updateObservers_=function(){var e=this.observers_.filter(function(e){return e.gatherActive(),e.hasActive()});return e.forEach(function(e){return e.broadcastActive()}),e.length>0},e.prototype.connect_=function(){n&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),s?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){n&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(e){var t=e.propertyName,n=void 0===t?"":t;c.some(function(e){return!!~n.indexOf(e)})&&this.refresh()},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e}(),f=function(e,t){for(var n=0,r=Object.keys(t);n<r.length;n++){var o=r[n];Object.defineProperty(e,o,{value:t[o],enumerable:!1,writable:!1,configurable:!0})}return e},l=function(e){return e&&e.ownerDocument&&e.ownerDocument.defaultView||r},d=y(0,0,0,0);function h(e){return parseFloat(e)||0}function p(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return t.reduce(function(t,n){return t+h(e["border-"+n+"-width"])},0)}function b(e){var t=e.clientWidth,n=e.clientHeight;if(!t&&!n)return d;var r=l(e).getComputedStyle(e),o=function(e){for(var t={},n=0,r=["top","right","bottom","left"];n<r.length;n++){var o=r[n],i=e["padding-"+o];t[o]=h(i)}return t}(r),i=o.left+o.right,a=o.top+o.bottom,c=h(r.width),s=h(r.height);if("border-box"===r.boxSizing&&(Math.round(c+i)!==t&&(c-=p(r,"left","right")+i),Math.round(s+a)!==n&&(s-=p(r,"top","bottom")+a)),!function(e){return e===l(e).document.documentElement}(e)){var u=Math.round(c+i)-t,f=Math.round(s+a)-n;1!==Math.abs(u)&&(c-=u),1!==Math.abs(f)&&(s-=f)}return y(o.left,o.top,c,s)}var v="undefined"!==typeof SVGGraphicsElement?function(e){return e instanceof l(e).SVGGraphicsElement}:function(e){return e instanceof l(e).SVGElement&&"function"===typeof e.getBBox};function m(e){return n?v(e)?function(e){var t=e.getBBox();return y(0,0,t.width,t.height)}(e):b(e):d}function y(e,t,n,r){return{x:e,y:t,width:n,height:r}}var g=function(){function e(e){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=y(0,0,0,0),this.target=e}return e.prototype.isActive=function(){var e=m(this.target);return this.contentRect_=e,e.width!==this.broadcastWidth||e.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var e=this.contentRect_;return this.broadcastWidth=e.width,this.broadcastHeight=e.height,e},e}(),w=function(){return function(e,t){var n,r,o,i,a,c,s,u=(r=(n=t).x,o=n.y,i=n.width,a=n.height,c="undefined"!==typeof DOMRectReadOnly?DOMRectReadOnly:Object,s=Object.create(c.prototype),f(s,{x:r,y:o,width:i,height:a,top:o,right:r+i,bottom:a+o,left:r}),s);f(this,{target:e,contentRect:u})}}(),_=function(){function t(t,n,r){if(this.activeObservations_=[],this.observations_=new e,"function"!==typeof t)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=n,this.callbackCtx_=r}return t.prototype.observe=function(e){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!==typeof Element&&Element instanceof Object){if(!(e instanceof l(e).Element))throw new TypeError('parameter 1 is not of type "Element".');var t=this.observations_;t.has(e)||(t.set(e,new g(e)),this.controller_.addObserver(this),this.controller_.refresh())}},t.prototype.unobserve=function(e){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!==typeof Element&&Element instanceof Object){if(!(e instanceof l(e).Element))throw new TypeError('parameter 1 is not of type "Element".');var t=this.observations_;t.has(e)&&(t.delete(e),t.size||this.controller_.removeObserver(this))}},t.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},t.prototype.gatherActive=function(){var e=this;this.clearActive(),this.observations_.forEach(function(t){t.isActive()&&e.activeObservations_.push(t)})},t.prototype.broadcastActive=function(){if(this.hasActive()){var e=this.callbackCtx_,t=this.activeObservations_.map(function(e){return new w(e.target,e.broadcastRect())});this.callback_.call(e,t,e),this.clearActive()}},t.prototype.clearActive=function(){this.activeObservations_.splice(0)},t.prototype.hasActive=function(){return this.activeObservations_.length>0},t}(),O="undefined"!==typeof WeakMap?new WeakMap:new e,x=function(){return function e(t){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var n=u.getInstance(),r=new _(t,n,this);O.set(this,r)}}();return["observe","unobserve","disconnect"].forEach(function(e){x.prototype[e]=function(){var t;return(t=O.get(this))[e].apply(t,arguments)}}),"undefined"!==typeof r.ResizeObserver?r.ResizeObserver:x},e.exports=n()}).call(this,n("698d75b157f24ae829cc"))},d784e1c0a913ee720a01:function(e,t,n){"use strict";var r,o=n("67cab2d3541edef7eb53"),i=n("5744828f4855bfd1694a"),a=(n("8a2d1b95e05b6a321e74"),n("8af190b70a6bc55c6f1b")),c=n.n(a),s=n("a9db75321692539513f7"),u=n.n(s),f=n("0b3cb19af78752326f59");function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function d(e,t,n,o){r||(r="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,a=arguments.length-3;if(t||0===a||(t={children:void 0}),t&&i)for(var c in i)void 0===t[c]&&(t[c]=i[c]);else t||(t=i||{});if(1===a)t.children=o;else if(a>1){for(var s=new Array(a),u=0;u<a;u++)s[u]=arguments[u+3];t.children=s}return{$$typeof:r,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var b=Object(f.b)(u.a).withConfig({displayName:"Carousel__CardSlider",componentId:"axk1dd-0"})(["padding-top:4rem;.slick-slide{height:auto;justify-content:center;margin-bottom:0.25rem;display:flex !important;}"]),v=d(o.ArrowBackIcon,{color:"white"}),m=d(o.ArrowForwardIcon,{color:"white"});t.a=function(e){var t=e.CardComponent,n=e.details,r=e.sliderName,o=e.sliderSettings,s=p(e,["CardComponent","details","sliderName","sliderSettings"]),u=h(Object(a.useState)(null),2),f=u[0],y=u[1];return c.a.createElement(i.Box,l({position:"relative"},s),d(i.Box,{maxW:"1280px",margin:"auto"},void 0,d(i.Flex,{direction:"row",align:"stretch",justify:"space-between"},void 0,d(i.Heading,{fontSize:"4xl",letterSpacing:"0.025em",align:"center"},void 0,r),d(i.Flex,{align:"center"},void 0,d(i.IconButton,{onClick:f?f.slickPrev:function(){},padding:"0.5rem",mt:"0px",ml:"1.5rem",isRound:"true",icon:v,colorScheme:"red",bg:Object(i.useColorModeValue)("red.400","red.500")}),d(i.IconButton,{onClick:f?f.slickNext:function(){},padding:"0.5rem",mt:"0px",ml:"1.5rem",isRound:"true",icon:m,colorScheme:"red",bg:Object(i.useColorModeValue)("red.400","red.500")}))),c.a.createElement(b,l({ref:y},o),n&&n.map(function(e){return d(t,{data:e.value},e.key)}))))}},f8429041af5de15944fe:function(e,t){e.exports=function(e){return e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()}).toLowerCase()}},f9afcabf039666982141:function(e,t,n){(function(t){var n="Expected a function",r=NaN,o="[object Symbol]",i=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,s=/^0o[0-7]+$/i,u=parseInt,f="object"==typeof t&&t&&t.Object===Object&&t,l="object"==typeof self&&self&&self.Object===Object&&self,d=f||l||Function("return this")(),h=Object.prototype.toString,p=Math.max,b=Math.min,v=function(){return d.Date.now()};function m(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function y(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&h.call(e)==o}(e))return r;if(m(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=m(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(i,"");var n=c.test(e);return n||s.test(e)?u(e.slice(2),n?2:8):a.test(e)?r:+e}e.exports=function(e,t,r){var o,i,a,c,s,u,f=0,l=!1,d=!1,h=!0;if("function"!=typeof e)throw new TypeError(n);function g(t){var n=o,r=i;return o=i=void 0,f=t,c=e.apply(r,n)}function w(e){var n=e-u;return void 0===u||n>=t||n<0||d&&e-f>=a}function _(){var e=v();if(w(e))return O(e);s=setTimeout(_,function(e){var n=t-(e-u);return d?b(n,a-(e-f)):n}(e))}function O(e){return s=void 0,h&&o?g(e):(o=i=void 0,c)}function x(){var e=v(),n=w(e);if(o=arguments,i=this,u=e,n){if(void 0===s)return function(e){return f=e,s=setTimeout(_,t),l?g(e):c}(u);if(d)return s=setTimeout(_,t),g(u)}return void 0===s&&(s=setTimeout(_,t)),c}return t=y(t)||0,m(r)&&(l=!!r.leading,a=(d="maxWait"in r)?p(y(r.maxWait)||0,t):a,h="trailing"in r?!!r.trailing:h),x.cancel=function(){void 0!==s&&clearTimeout(s),f=0,o=u=i=s=void 0},x.flush=function(){return void 0===s?c:O(v())},x}}).call(this,n("698d75b157f24ae829cc"))}}]);