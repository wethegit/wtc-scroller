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
let instance = null;

class Scroller {
  constructor() {
    if (!instance) {
      instance = this;
    } else {
      return instance;
    }

    this.events = {};

    window.addEventListener('scroll', (e)  => {
      this.onScroll(e);
    });

    return this;
  }

  getCanScroll() {
    return true;
  }

  onScroll(e) {
    let bottom, middle, top, wHeight;

    if (!this.getCanScroll()) {
      return false;
    }

    wHeight = window.innerHeight;
    top = window.pageYOffset;
    bottom =wHeight + top;
    middle = top + wHeight / 2;

    this.trigger('scroll', top, bottom, middle);
    this.triggerPoints(this.oldTop, top, bottom, middle);
    this.oldTop = top;

    return this.oldTop;
  }

  bind(topic, handler, context = this) {
    let ev = this.events[topic];
    if (!ev) {
      ev = this.events[topic] = [];
    }

    ev.push({
      handler: handler,
      context: context
    });

    return ev;
  }

  bindTriggerPoint(point, handler, context = this) {
    let tp = this.events.triggerpoint;
    if (!tp) {
      tp = this.events.triggerpoint = [];
    }

    return tp[point]({
      handler: handler,
      context: context
    });
  }

  bindTriggerElement(element, handler, context = this) {
    let te = this.events.triggerelement;
    if(!te) {
      te = this.events.triggerelement = [];
    }

    te.push({
      element: element,
      handler: handler,
      context: context
    });

    return te;
  }

  trigger() {
    var results = [];
    let topic = arguments[0];
    let args = (2 <= arguments.length) ? [].slice.call(arguments, 1) : [];

    if (this.events[topic] !== null) {
      let ref = this.events[topic];
      for (let i = 0; i < ref.length; i++) {
        let event = ref[i];
        results.push(event.handler.apply(event.context, args));
      }

      return results;
    }
  }

  triggerPoints (oldTop, top, bottom, middle) {
    var results = [];

    if (this.events.triggerpoint !== null) {
      let events = this.events.triggerpoint.slice(oldTop, top);
      for (let i = 0; i < events.length; i++) {
        let event = events[i];
        results.push(event.handler.apply(event.context, args));
      }

      return results;
    }
  }

  triggerElements(oldTop, top, bottom, middle) {
    var results = [];
    if (this.events.triggerelement !== null) {
      let ref = this.events.triggerelement;

      for (let i = 0; i < ref.length; i++) {
        let event = ref[i];
        let element_top = event.element.getBoundingClientRect().top;
        results.push(element_top >= oldTop && element_top < top ? event.handler.apply(event.context, args) : element_top <= oldTop && element_top > top ? event.handler.apply(event.context, args) : void 0);
      }

      return results;
    }
  }

  static get instance() {
    if (!instance) {
      instace = new Scroller();
    }
    return instance;
  }
}

export default Scroller;
