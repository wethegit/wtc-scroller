/*
  Scroller
  =======================================
  Author      liamegan
  email       liam@wethecollective.com
  Created     2014-03-11 15:28:33
  namespace     wtc.utilities
  Requirements  jquery
  Description   This is a singleton class that is used for controlling and reporting on user scrolling.
  Edited by     liamegan
  Edited      2014-06-10 08:34:45
  Version     0.5
*/
; 'use strict';

(function() {
  var _base;
  var __slice = Array.prototype.slice;
  window.wtc || (window.wtc = {});
  (_base = window.wtc).utilities || (_base.utilities = {});
  return (function($, NS) {
    var $w;
    $w = $(window);
    return NS.Scroller = (function() {
      var ScrollerPrivate, instance;
      function Scroller() {}
      instance = null;
      ScrollerPrivate = (function() {
        ScrollerPrivate.prototype.events = {};
        function ScrollerPrivate() {
          var op;
          op = this;
          this.events = {};
          $w.scroll(function(e) {
            return op.onScroll(e);
          });
        }
        ScrollerPrivate.prototype.getCanScroll = function() {
          return true;
        };
        ScrollerPrivate.prototype.onScroll = function(e) {
          var bottom, middle, top;
          if (!this.getCanScroll()) {
            return false;
          }
          top = $w.scrollTop();
          bottom = $w.height() + top;
          middle = top + $w.height() / 2;
          this.trigger('scroll', top, bottom, middle);
          this.triggerPoints(this.oldTop, top, bottom, middle);
          return this.oldTop = top;
        };
        ScrollerPrivate.prototype.bind = function(topic, handler, context) {
          var _base2;
          if (context == null) {
            context = this;
          }
          return ((_base2 = this.events)[topic] || (_base2[topic] = [])).push({
            handler: handler,
            context: context
          });
        };
        ScrollerPrivate.prototype.bindTriggerPoint = function(point, handler, context) {
          var _base2;
          if (context == null) {
            context = this;
          }
          return ((_base2 = this.events)['triggerpoint'] || (_base2['triggerpoint'] = []))[point]({
            handler: handler,
            context: context
          });
        };
        ScrollerPrivate.prototype.bindTriggerElement = function($element, handler, context) {
          var _base2;
          if (context == null) {
            context = this;
          }
          return ((_base2 = this.events)['triggerelement'] || (_base2['triggerelement'] = [])).push({
            $element: $element,
            handler: handler,
            context: context
          });
        };
        ScrollerPrivate.prototype.trigger = function() {
          var args, event, topic, _i, _len, _ref, _results;
          topic = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          if (this.events[topic] != null) {
            _ref = this.events[topic];
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              event = _ref[_i];
              _results.push(event.handler.apply(event.context, args));
            }
            return _results;
          }
        };
        ScrollerPrivate.prototype.triggerPoints = function(oldTop, top, bottom, middle) {
          var event, _events, _i, _len, _results;
          if (this.events['triggerpoint'] != null) {
            _events = this.events['triggerpoint'].slice(oldTop, top);
            _results = [];
            for (_i = 0, _len = _events.length; _i < _len; _i++) {
              event = _events[_i];
              _results.push(event.handler.apply(event.context, args));
            }
            return _results;
          }
        };
        ScrollerPrivate.prototype.triggerElements = function(oldTop, top, bottom, middle) {
          var element_top, event, _i, _len, _ref, _results;
          if (this.events['triggerelement'] != null) {
            _ref = this.events['triggerelement'];
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              event = _ref[_i];
              element_top = event.$element.offset().top;
              _results.push(element_top >= oldTop && element_top < top ? event.handler.apply(event.context, args) : element_top <= oldTop && element_top > top ? event.handler.apply(event.context, args) : void 0);
            }
            return _results;
          }
        };
        return ScrollerPrivate;
      })();
      Scroller.bind = function(topic, handler, context) {
        if (context == null) {
          context = this;
        }
        return this.get().bind(topic, handler, context);
      };
      Scroller.bindTriggerPoint = function(point, handler, context) {
        if (context == null) {
          context = this;
        }
        return this.get().bindTriggerPoint(point, handler, context);
      };
      Scroller.bindTriggerElement = function($element, handler, context) {
        if (context == null) {
          context = this;
        }
        return this.get().bindTriggerElement($element, handler, context);
      };
      Scroller.trigger = function() {
        var args, topic, _ref;
        topic = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return (_ref = this.get()).trigger.apply(_ref, [topic].concat(__slice.call(args)));
      };
      Scroller.get = function() {
        return instance != null ? instance : instance = new ScrollerPrivate();
      };
      return Scroller;
    })();
  })(jQuery, window.wtc.utilities);
})();