!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.WaterMark=e():t.WaterMark=e()}(window,(function(){return function(t){var e={};function i(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=t,i.c=e,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(o,n,function(e){return t[e]}.bind(null,n));return o},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e){function i(t,e){this.constructor=this,this.container=t||document.body||document.documentElement.querySelector("body"),this.canvas={el:"",width:0,height:0},this.pixelRatio=1,this.WMUrl=null,this._$wm=null,this._wmSty=null,this.options=this._extend(i._DEFAULT,e),this._init()}i.prototype.genWMUrl=function(){var t=this.canvas.el,e=this.canvas.ctx,i=this.canvas.width,o=this.canvas.width,n=this.options,r=n.globalAlpha,s=n.textAlign,a=n.textBaseline,l=n.font,c=n.fillStyle,u=n.rotate,h=n.x,d=n.y,p=n.msg;e.save(),e.fillStyle="#fff",e.fillRect(0,0,i,o),e.restore(),e.globalAlpha=r,e.textAlign=s,e.textBaseline=a,e.font=l,e.fillStyle=c,e.rotate(Math.PI*u/180),e.fillText(p,h,d),this.WMUrl=t.toDataURL()},i.prototype.addWM=function(){var t=this.options.wmCls,e=document.querySelector(t),i=this._$wm,o=this._wmSty,n=this.container;e?(console.log("WM exist!!!"),e.style.cssText=o):(console.log("WM create!!!"),n.appendChild(i)),this._WMObserve()},i.prototype._WMObserve=function(){var t=this,e=this.options,i=this.container,o=e.wmCls,n=this._wmSty;$wm=document.querySelector(o),setTimeout((function(){try{var e=new(window.MutationObserver||window.WebKitMutationObserver)((function(){(!$wm||$wm&&$wm.getAttribute("style")!==n)&&(e.disconnect(),e=null,t.addWM())}));e.observe(i,{attributes:!0,subtree:!0,childList:!0})}catch(t){console.warn("window is not support API MutationObserver")}}),40)},i.prototype._createWMElement=function(){var t=this.options.wmCls.substr(1),e=this.WMUrl,i=document.createElement("div"),o="position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:${zIndex};background-repeat:repeat;background-image:url('"+e+"');";i.setAttribute("class",t),i.style.cssText=o,this._$wm=i,this._wmSty=o,this.addWM()},i.prototype._createCanvas=function(){var t=document.createElement("canvas"),e=t.getContext("2d"),i=this.options,o=i.width,n=i.height,r=this._getPixelRatio(e),s=o*r,a=n*r;e.scale(r,r),t.setAttribute("width",s),t.setAttribute("height",a),this.pixelRatio=r,this.canvas.el=t,this.canvas.ctx=e,this.canvas.width=s,this.canvas.height=a},i.prototype._init=function(){this._createCanvas(),this.genWMUrl(),this._createWMElement()},i.prototype._getPixelRatio=function(t){var e=t.backingStorePixelRatio||t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1;return(window.devicePixelRatio||1)/e},i.prototype._extend=function(t,e){e=e||{};var i={};for(var o in t)e.hasOwnProperty(o)?i[o]=e[o]:i[o]=t[o];return i},i._DEFAULT={msg:"内部文档，请勿外传",wmCls:".jy_wm",width:"100",height:"100",textAlign:"left",textBaseline:"bottom",font:"16px Microsoft Yahei",fillStyle:"#000",globalAlpha:.1,rotate:16,zIndex:1e3,x:50,y:50},t.exports=i}])}));