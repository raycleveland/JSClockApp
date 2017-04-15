/**
 * Javascript Clock App
 * 
 * @purpose to create functionality for a simple timer on a page with start, pause, and reset buttons
 * @author Ray Cleveland
 */
(function() {
  
  JsClock = {

  	currentCount: 0,
  	lastDisplayCount: null,
  	time: null,
  	ticking: false,

  	// container objects
  	contHours: null,
  	contMins: null,
  	contSecs: null,

  	/**
  	 * Initialize the class
  	 * Start the date object, assign event handlers to the buttons, and initialize the date containers
  	 */
  	init: function() {

  		JsClock.time = new Date(0, 0, 0, 0, 0, 0, 0);

  		window.setInterval(function() {
  			JsClock.tick();
  			JsClock.updateDisplay();
  		}, 1000);

  		// initialize the button interaction
  		var btnStart = document.querySelector('.buttonForm .start');
  		if(btnStart != null) {
  			btnStart.addEventListener('click', JsClock.start);
  		}

  		var btnPause = document.querySelector('.buttonForm .pause');
  		if(btnPause != null) {
  			btnPause.addEventListener('click', JsClock.pause);
  		}

  		var btnReset = document.querySelector('.buttonForm .reset');
  		if(btnReset != null) {
  			btnReset.addEventListener('click', JsClock.reset);
  		}

  		JsClock.contHours = document.querySelector('.clock .hours');
  		JsClock.contMins = document.querySelector('.clock .minutes');
  		JsClock.contSecs = document.querySelector('.clock .seconds');
  	},

  	/**
  	 * Start the timer by setting the ticking flag to true
  	 */
  	start: function(e) {
  		if(e != null) {e.preventDefault();}
  		JsClock.ticking = true;
  	},

  	/**
  	 * pause the timer by setting the ticking flag to false
  	 */
  	pause: function(e) {
  		if(e != null) {e.preventDefault();}
  		
  		JsClock.ticking = false;
  	},

  	/**
  	 * reset the timer
  	 */
  	reset: function(e) {
  		if(e != null) {e.preventDefault();}
  		JsClock.pause();
  		JsClock.currentCount = 0;
  		JsClock.time = new Date(0, 0, 0, 0, 0, 0, 0);
  		JsClock.time.setMilliseconds(JsClock.currentCount);
  		JsClock.updateDisplay();
  	},

  	/**
  	 * Increment the timer
  	 */
  	tick: function() {
  		if(JsClock.ticking) {
  			JsClock.currentCount += 1000;
  			JsClock.time = new Date(0, 0, 0, 0, 0, 0, 0);
  			JsClock.time.setUTCMilliseconds(JsClock.currentCount);
  			JsClock.updateDisplay();
  		}
  	},

  	/**
  	 * updates the timer display on the page
  	 */
  	updateDisplay: function() {
  		if(JsClock.lastDisplayCount != JsClock.currentCount) {
  			JsClock.lastDisplayCount = JsClock.currentCount
  			//update display here
  			if(JsClock.contHours != null) {
  				JsClock.contHours.innerHTML = JsClock.zpad(JsClock.time.getHours(), 2);
  			}
  			if(JsClock.contMins != null) {
  				JsClock.contMins.innerHTML = JsClock.zpad(JsClock.time.getMinutes(), 2);
  			}
  			if(JsClock.contSecs != null) {
  				JsClock.contSecs.innerHTML = JsClock.zpad(JsClock.time.getSeconds(), 2);
  			}
  		}
  	},

  	/**
  	 * Zero padding helper function
  	 */
  	zpad: function(n, width) {
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join(0) + n;
	}

  }

  // attach the event
  window.addEventListener("load", JsClock.init);

})();