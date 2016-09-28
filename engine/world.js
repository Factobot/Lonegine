function World() {
	this.collisionManager = new CollisionManager(this);
	this.objectList = [];
	this.rootNode = null;
	this.canvas = null;
}
World.prototype = {
	enable: function() {
		this.collisionManager.enable();
	},
	CreateObject: function() {
		worldObj = new WorldObject;
		this.AddObject(worldObj);
		return worldObj;
	},
	AddObject: function(obj) {
		this.objectList.push(worldObj);
		worldObj.world = this;
		worldObj.myIndex = this.objectList.length;
	},
	RemoveObject: function(obj) {
		this.objectList = RemoveAt(this.objectList.indexOf(obj), this.objectList);
		obj.postRemove();
	},
	SetRoot: function(root) {
		this.rootNode = root;
	},
	GetRoot: function() {
		return this.rootNode;
	},
	SetCanvas: function(canvas) {
		this.canvas = canvas;
	},
	GetCanvas: function() {
		return this.canvas;
	}
}