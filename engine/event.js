KeyNameToCode = {
	'right-arrow': 39,
	'left-arrow': 37,
	'up-arrow': 38,
	'down-arrow': 40,
	'space': 32,
	'enter': 13,
	'tab': 9,
	'shift': 16,
	'control': 17
};
keyBinds = {};
keyUpBinds = {};
function EventListener() {
	this.keyBinds = {};
	this.keyUpBinds = {};
	this.msgBinds = {};
	this.keyHandler = window.addEventListener('keydown', this.handleKeyDown, true);
	this.keyUpHandler = window.addEventListener('keyup', this.handleKeyUp, true);
}
/* ME: On the handlers *this* is a window object? */
EventListener.prototype = {
	handleKeyUp: function(e) {
		var keyCode = e.keyCode;
		if(keyUpBinds[keyCode]) {
			for(var i = 0;i < keyUpBinds[keyCode].length;i++) {
				keyUpBinds[keyCode][i]();
			}
		}
	},
	handleKeyDown: function(e) {
		var keyCode = e.keyCode;
		if(keyBinds[keyCode]) {
			for(var i = 0;i < keyBinds[keyCode].length;i++) {
				keyBinds[keyCode][i]();
			}
		}
	},
	listenKey: function(keyName, callback) {
		isUp = keyName.endsWith("-up");
		keyName = keyName.replace("-up", "");
		if(KeyNameToCode[keyName]) {
			var code = KeyNameToCode[keyName];
			if(!isUp) {
				if(!keyBinds[code]) keyBinds[code] = [];
				keyBinds[code].push(callback);
			}
			else {
				if(!keyUpBinds[code]) keyUpBinds[code] = [];
				keyUpBinds[code].push(callback);
			}
		}
	},
	ignoreKey: function(keyName, callback) {
		isUp = keyName.endsWith("-up");
		if(!isUp)
		    keyBinds[code] = RemoveAt(keyBinds[code].indexOf(callback), keyBinds[code]);
		else
			keyUpBinds[code] = RemoveAt(keyUpBinds[code].indexOf(callback), keyUpBinds[code]);
	},
	// to finish
	sendMessage: function(msgName) {
		for(var otherMsgName in this.msgBinds) {
			for(var callback in this.msgBinds[otherMsgName]) {
				callback();
			}
		}
	},
	listenMessage: function(msgName, callback) {
		if(!this.msgBinds.hasOwnProperty(msgName)) this.msgBinds[msgName] = [];
		this.msgBinds[msgName].push(callback);
	},
	ignoreMessage: function(msgName, callback) {
		
	}
}
//$(document).on('keydown', function(e){console.log(e.keyCode);});