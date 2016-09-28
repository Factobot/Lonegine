function WorldObject() {
	this.DOM = new DOMElement($("<div class='Lonegine_object'></div>"));
	this.myIndex = null;
	this.world = null;
	this.collided = false;
	this.name = "object-" + Math.random();
	this.collLevel = 1;
}
WorldObject.prototype = {
	GetDOM: function(){
		return this.DOM;
	},
	ApplyImage: function(path) {
		this.DOM.setBackgroundImage(path);
	},
	GetWorld: function() {
		return this.world;
	},
	ApplyCollisions: function() {
		this.collided = true;
		this.world.collisionManager.addObject(this);
	},
	/* Do not call this! Use world.RemoveObject instead */
	postRemove: function() {
		if(this.collided) this.world.collisionManager.removeObject(this);
		this.GetDOM().remove();
	},
	setCollisionLevel: function(level) {
		this.collLevel = level;
	}
}