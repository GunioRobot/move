/*
 * ----------------------------- JSTORAGE -------------------------------------
 *
 * Copyright (c) 2011 Tobias Otte, kontakt@tobias-otte.de
 * Project homepage: https://github.com/Stereobit/prototype-slideshow
 *
 * Licensed under MIT-style license:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var PrototypeSlideShow = Class.create({
  
  selectors: {
      NEXT: ".next",
      PREVIOUS: ".previous"
  },
  
  initialize: function(container, elements, duration, timeout) {
    this._container = container;
    this._elements = this._container.getElementsBySelector(elements);
    this._nextLink = this._container.down(this.selectors.NEXT);
    this._previousLink = this._container.down(this.selectors.PREVIOUS);

    this._duration = { duration: duration };
    this._timeout = timeout;
    this._activeElement = 0;
        
    this._observe();
    
    setTimeout(this._loop.bind(this),this._timeout);
                    
  },
    
  _observe: function() {
    this._nextLink.observe('click', function(event) {
      Event.stop(event);
      this._next();
    }.bind(this));
    
    this._previousLink.observe('click', function(event) {
      Event.stop(event);
      this._previous();
    }.bind(this));
    
    this._container.observe('mouseenter', function() {
      this._container.addClassName("stoploop");
    }.bind(this));
      
    this._container.observe('mouseleave', function() {
      this._container.removeClassName("stoploop");
    }.bind(this));
  },
    
  _next: function() {
    if (this._activeElement < this._elements.length - 1) {
      this._fade(this._activeElement, this._activeElement  + 1);
      this._activeElement = this._activeElement + 1;
    } else {
      this._fade(this._activeElement, 0);
      this._activeElement = 0;
    }
  },
  
  _previous: function() {
    if (this._activeElement != 0) {
      this._fade(this._activeElement, this._activeElement -1);
      this._activeElement = this._activeElement - 1;
    } else {
      this._fade(this._activeElement, this._elements.length -1);
      this._activeElement = this._elements.length -1;
    }
  },
  
  _fade: function(elementIn, elementOut) {
    this._elements[elementIn].fade(this._duration);
    this._elements[elementOut].appear(this._duration);
  },
    
  _loop: function() { 
    (function repeat() {
      if (this._container.hasClassName("stoploop") == false) {
         this._next();            
      } 
        setTimeout(repeat.bind(this),this._timeout);
    }).bind(this)();
  }
    
});

PrototypeSlideShow.render = function(config) {
    new PrototypeSlideShow(
        $(config.container),
        config.elements,
        config.duration,
        config.timeout
    );
};