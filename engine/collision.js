LeftBottomPadding = 39;
RightTopPadding = 5;

function TriggerData(x, y, f) {
	this.x = x;
	this.y = y;
	this.frame = f;
}

function CollisionManager(world) {
	this.world = world;
	this.objectList = [];
	this.listenList = [];
	this.listenListIndexer = {};
}
CollisionManager.prototype = {
	enable: function() {
		this.canvas = this.world.GetCanvas();
		var cMgr = this;
		this.canvas.taskMgr.addTask(function(t){cMgr.step(t);}, "CollisionMgrTask");
	},
	step: function(task) {
		for(var i = 0;i < this.listenList.length;i++) {
			var listenData = this.listenList[i];
			var elem = listenData[0].GetDOM();
			var elem2 = listenData[1].GetDOM();
			var callback = listenData[2];
			var x = elem.getX();
			var y = elem.getY();
			var left = elem2.getX() - LeftBottomPadding;
			var right = elem2.getX() + elem2.getWidth() - RightTopPadding;
			var _top = elem2.getY() + (elem2.getHeight()) - RightTopPadding;
			var bottom = elem2.getY() - LeftBottomPadding;
			if(this.inSquare(x, y, left, right, _top, bottom)) {
				callback(
					new TriggerData(x, y, this.canvas.taskMgr.getRunningTime())
				);
			}
		}
	},
	addObject: function(object) {
		this.objectList.push(object);
	},
	removeObject: function(object) {
		this.objectList = RemoveAt(this.objectList.indexOf(object), this.objectList);
	},
	inSquare: function(x, y, left, right, _top, bottom) {
		if(
			((x >= left && x <= right) && (y >= bottom && y <= _top)) ||
			((y == bottom || y == _top) && (x >= left && x <= right))
		) return true;
	},
	collidesAt: function(obj, x, y) {
		for(var i = 0;i < this.objectList.length;i++) {
			var obj2 = this.objectList[i];
			var elem = obj.GetDOM();
			var elem2 = obj2.GetDOM();
			if(elem2 != elem && obj.collLevel >= obj2.collLevel) {
				var left = elem2.getX() - LeftBottomPadding;
				var right = elem2.getX() + elem2.getWidth() - RightTopPadding;
				var _top = elem2.getY() + (elem2.getHeight()) - RightTopPadding;
				var bottom = elem2.getY() - LeftBottomPadding;
				if(this.inSquare(x, y, left, right, _top, bottom)) 
					return true;
			}
		}
	},
	listenTo: function(fromObj, toObj, callback) {
		this.listenListIndexer[fromObj.name + "TO" + toObj.name] = this.listenList.length;
		this.listenList.push(
			[fromObj, toObj, callback]
		);
	},
	clearListen: function(fromObj, toObj) {
		uniq = fromObj.name + "TO" + toObj.name;
		indexed = this.listenListIndexer.hasOwnProperty(uniq);
		if(indexed) {
			var listIndex = this.listenListIndexer[uniq];
			this.listenList = RemoveAt(listIndex, this.listenList);
			delete this.listenListIndexer[uniq];
		}
	}
};