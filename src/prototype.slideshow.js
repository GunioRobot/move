/*
 * ----------------------- PROTOTYPE SLIDESHOW --------------------------------
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
  
  defaultConfig: {
    CONTAINER: "slideshow",
    ELEMENTS: "li",
    DURATION: "1.0",
    TIMEOUT: "5",
    AUTOPLAY: true
  },
  
  initialize: function(options) {    
    this._options = options || {};
        
    this._container = this._options.container || $(this.defaultConfig.CONTAINER);
    this._elements = this._container.getElementsBySelector(this.defaultConfig.ELEMENTS);
    this._nextLink = this._container.down(this._options.nextLink) || false;
    this._previousLink = this._container.down(this._options.previousLink) || false;
    this._stopLink = this._container.down(this._options.stopLink) || false;
    this._duration = this._options.duration || this.defaultConfig.DURATION;
    this._timeout = this._options.timeout || this.defaultConfig.TIMEOUT;
    this._autoplay = this._options.autoplay || this.defaultConfig.AUTOPLAY;
    
    this._container.addClassName("prototype-slideshow");
    
    this._activeElement = 0;
    this._elementCount = this._elements.length - 1;
    this._hoverStop = false;
    this._clickStop = (this._autoplay == true) ? false : true;
    
    this._observe();
    this._loop.delay(this._timeout, this);
  },
    
  _loop: function(that) { 
    (function repeat() {
      console.log(that._clickStop);
      console.log(that._hoverStop);
      if (that._hoverStop == false && that._clickStop == false) {
        that._next();
      } 
      repeat.delay(that._timeout);
    })();
  },
  
  _next: function() {
    if (this._activeElement < this._elementCount) {
      this._fade(this._activeElement, this._activeElement + 1);
      this._activeElement ++;
    } else {
      this._fade(this._activeElement, 0);
      this._activeElement = 0;
    }
  },

  _previous: function() {
    if (this._activeElement != 0) {
      this._fade(activeElement, activeElement -1);
      this._activeElement --;
    } else {
      this._fade(activeElement, this._elementCount);
      this._activeElement = this._elementCount;
    }
  },
  
  _fade: function(elementIn, elementOut) {
    this._elements[elementIn].fade(this._duration);
    this._elements[elementOut].appear(this._duration);
  },
  
  _observe: function() {
    this._nextLink.observe('click', function(event) {
      event.preventDefault;
      this._next();
    }.bind(this));
    
    this._previousLink.observe('click', function(event) {
      event.preventDefault;
      this._previous();
    }.bind(this));
    
    this._stopLink.observe('click', function(event) {
      event.preventDefault;
      this._stopLink.toggleClassName('play');
      this._clickStop = (this._clickStop != true);
    }.bind(this));
    
    this._container.observe('mouseenter', function() {
      this._hoverStop = true;
    }.bind(this));
      
    this._container.observe('mouseleave', function() {
      this._hoverStop = false;
    }.bind(this));
  }
    
});