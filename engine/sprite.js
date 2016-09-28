function WorldObject(width, height) {
	this.DOM = new DOMElement($("<div class='Lonegine_object'></div>"));
	if(width) this.GetDOM().setWidth(width);
	if(height) this.GetDOM().setHeight(height);
}
WorldObject.prototype = {
	GetDOM: function(){
		return this.DOM;
	}
	ApplyImage: function(path) {
		this.DOM.setBackgroundImage(path);
	}
}