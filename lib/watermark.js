/*
 * Description: 页面水印
 * version: 0.1.0
 * Author: liejiayong(809206619@qq.com)
 * Date: 2020-03-22 11:55:34
 * LastEditors: liejiayong(809206619@qq.com)
 * LastEditTime: 2020-03-23 17:27:06
 */

function WaterMark(container, options) {
  this.constructor = this;
  this.container = container || document.body || document.documentElement.querySelector('body');
  this.canvas = { el: '', width: 0, height: 0 };
  this.pixelRatio = 1;
  this.WMUrl = null;
  this._$wm = null;
  this._wmSty = null;
  this.options = this._extend(WaterMark._DEFAULT, options);

  this._init();
}

WaterMark.prototype.genWMUrl = function () {
  var canvas = this.canvas.el, ctx = this.canvas.ctx,
    width = this.canvas.width, height = this.canvas.width,
    options = this.options,
    globalAlpha = options.globalAlpha, textAlign = options.textAlign,
    textBaseline = options.textBaseline, font = options.font,
    fillStyle = options.fillStyle, rotate = options.rotate,
    x = options.x, y = options.y, msg = options.msg;

  ctx.save();
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  ctx.globalAlpha = globalAlpha;
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.rotate((Math.PI * rotate) / 180);
  ctx.fillText(msg, x, y);

  this.WMUrl = canvas.toDataURL();
}

WaterMark.prototype.addWM = function () {
  var options = this.options,
    wmCls = options.wmCls,
    $wm = document.querySelector(wmCls),
    _$wm = this._$wm,
    _wmSty = this._wmSty,
    container = this.container;

  // container.style.position = 'relative';

  if ($wm) {
    console.log('WM exist!!!');
    $wm.style.cssText = _wmSty;
  }
  else {
    console.log('WM create!!!');
    container.appendChild(_$wm);
  }

  this._WMObserve();
}

WaterMark.prototype._WMObserve = function () {
  var self = this,
    options = this.options, container = this.container,
    wmCls = options.wmCls,
    _wmSty = this._wmSty;
  $wm = document.querySelector(wmCls);

  setTimeout(function () {
    try {
      var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
      var mo = new MutationObserver(function () {
        // 只在_$wm元素变动才重新调用
        if (
          !$wm
          || ($wm && $wm.getAttribute('style') !== _wmSty)
          // || container.style.position !== 'relative'
        ) {
          // 避免一直触发
          mo.disconnect();
          mo = null;
          self.addWM()
        }
      });
      mo.observe(container, {
        attributes: true, // 观察目标节点的属性节点
        subtree: true, // 观察目标节点的所有后代节点
        childList: true, // 观察目标节点的子节点
      });
    } catch (error) {
      console.warn('window is not support API MutationObserver')
    }
  }, 40);
}

WaterMark.prototype._createWMElement = function () {
  var options = this.options,
    wmCls = options.wmCls.substr(1), WMUrl = this.WMUrl,
    $wm = document.createElement("div"),
    WMSty = "position:absolute;"
      + "top:0px;"
      + "left:0px;"
      + "width:100%;"
      + "height:100%;"
      + "z-index:${zIndex};"
      + "background-repeat:repeat;"
      + "background-image:url('" + WMUrl + "');";

  $wm.setAttribute('class', wmCls);
  $wm.style.cssText = WMSty;
  this._$wm = $wm;
  this._wmSty = WMSty;
  this.addWM();
}

WaterMark.prototype._createCanvas = function () {
  var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'),
    options = this.options, width = options.width, height = options.height,
    pixelRatio = this._getPixelRatio(ctx),
    widthPR = width * pixelRatio, heightPR = height * pixelRatio;

  ctx.scale(pixelRatio, pixelRatio)
  canvas.setAttribute('width', widthPR);
  canvas.setAttribute('height', heightPR);

  this.pixelRatio = pixelRatio;
  this.canvas.el = canvas;
  this.canvas.ctx = ctx;
  this.canvas.width = widthPR;
  this.canvas.height = heightPR;
}

WaterMark.prototype._init = function () {
  this._createCanvas();
  this.genWMUrl();
  this._createWMElement();
}

WaterMark.prototype._getPixelRatio = function (context) {
  var backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1
  return (window.devicePixelRatio || 1) / backingStore
}

WaterMark.prototype._extend = function (ov, nv) {
  nv = nv || {};
  var ret = {};
  for (var key in ov) {
    if (nv.hasOwnProperty(key)) {
      ret[key] = nv[key];
    } else {
      ret[key] = ov[key];
    }
  }
  return ret;
}

WaterMark._DEFAULT = {
  msg: '内部文档，请勿外传', // 水印内容
  wmCls: '.jy_wm', // 水印主件类名
  width: '100', // canvas元素宽
  height: '100', // canvas元素高
  textAlign: 'left', // 文字对齐
  textBaseline: 'bottom', // 基准线
  font: '16px Microsoft Yahei', // 字体大小及样式
  fillStyle: '#000', // 自定义水印的颜色
  globalAlpha: 0.1, // 设置图形和图像透明度的值
  rotate: 16, // 文字旋转角度
  zIndex: 1000, // 元素堆叠顺序
  x: 50,
  y: 50
}

module.exports = WaterMark;
