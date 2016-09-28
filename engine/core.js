// Utilities
function toPixels(integer) {
	if(String(integer).endsWith('px'))
		return integer; // Already in pixels?
	return String(integer) + 'px';
}
function fromPixels(pixels) {
	return Number(pixels.replace('px','')) || 0;
}
function fromDeg(deg) {
	if(typeof(deg) == "string")
		return Number(deg.replace('deg','')) || 0;
	else
		return deg;
}
function toCSSUrl(path) {
	if(path.startsWith('url('))
		return path; // Already an url?
	return 'url(' + path + ')';
}
function RemoveAt(index, array) {
	var newArray = [];
	for(var i = 0;i < array.length;i++) {
		if(i != index)
			newArray.push(array[i]);
	}
	return newArray;
}

// Constructor for handling DOM elements
function DOMElement(jqElement) {
	this.element = jqElement;
	this.parent = null;
}
DOMElement.BG_NO_REPEAT = 'no-repeat';
DOMElement.BG_COVER = 'cover';
DOMElement.BG_CONTAIN = 'contain';
DOMElement.prototype = {
	setWidth: function(width) {
		this.element.css('width', toPixels(width));
	},
	setHeight: function(height) {
		this.element.css('height', toPixels(height));
	},
	setWidthHeight: function(width, height) {
		this.setWidth(width);
		this.setHeight(height);
	},
	setParent: function(newParent) {
		newParent.addChild(this.element);
		this.parent = newParent;
	},
	getParent: function() {
		return this.parent;
	},
	addChild: function(child) {
		this.element.append(child);
	},
	setBackgroundImage: function(path) {
		this.element.css('background-image', toCSSUrl(path));
	},
	setBackgroundProperties: function(repeat, size) {
		if(repeat) this.element.css('background-repeat', repeat);
		if(size) this.element.css('background-size', size);
	},
	setX: function(posX) {
		this.element.css('left', toPixels(posX));
	},
	setY: function(posY) {
		this.element.css('bottom', toPixels(posY));
	},
	setXY: function(posX, posY) {
		this.setX(posX);
		this.setY(posY);
	},
	getX: function() {
		return fromPixels(this.element.css('left'));
	},
	getY: function() {
		return fromPixels(this.element.css('bottom'));
	},
	getWidth: function() {
		return this.element.width();
	},
	getHeight: function() {
		return this.element.height();
	},
	addClass: function(className) {
		this.element.addClass(className);
	},
	setR: function(r) {
		this.element.css({rotate: r});
	},
	getR: function() {
		return fromDeg(this.element.css('rotate'));
	},
	setText: function(text) {
		this.element.text(text);
	},
	hide: function() {
		this.element.hide();
	},
	show: function() {
		this.element.show();
	},
	remove: function() {
		this.element.remove();
	},
	setBackgroundColor: function(color) {
		this.element.css('background-color', color);
	}
}

function Canvas(width, height, rootNode) {
	this.DOM = new DOMElement($("<div class='Lonegine_canvas'></div>"));
	//this.DOM.setWidthHeight(width, height);
	this.DOM.setParent(rootNode);
	this.eventListener = new EventListener;
	this.taskMgr = new TaskManager;
	this.taskMgr.enable();
	this.worldList = [];
	this.fps = 60;
	this.dt = 0;
	this.lastFrame = 0;
	c = this;
	window.setInterval(function(){c.registerDt();}, 1000);
}
Canvas.prototype = {
	registerDt: function() {
		this.fps = (this.taskMgr.frame - this.lastFrame)
		this.dt = this.fps / this.taskMgr.frameRate;
		this.lastFrame = this.taskMgr.frame;
	},
	getDt: function() {
		return this.dt;
	},
	GetDOM: function() {
		return this.DOM;
	},
	AddWorld: function(world) {
		this.worldList.push(world);
		world.SetRoot(this.GetDOM());
		world.SetCanvas(this);
		world.enable();
		return this.worldList.length - 1;
	},
	GetWorld: function(worldIndex) {
		return this.worldList[worldIndex];
	},
	outXBounds: function(x) {
		return x <= this.GetDOM().getX() || x >= this.GetDOM().getWidth();
	},
	outYBounds: function(y) {
		return y <= this.GetDOM().getY() || y >= this.GetDOM().getHeight();
	}
}