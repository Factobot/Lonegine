function Task(_function, name) {
	this._function = _function;
	this.name = name;
	this.TaskDone = 100;
}
Task.prototype = {
	reset: function() {
		this.frame = 0;
	},
	execute: function() {
		this.frame += 1;
		return this._function(this);
	}
}

function TaskManager() {
	this.frameRate = 60.0;
	this.taskRate = 1000.0 / this.frameRate;
	this.frame = 0;
	this.tasks = {};
}

TaskManager.prototype = {
	enable: function() {
		var stepFunc = this.step;
		var mgr = this;
		window.setInterval(function(){stepFunc(mgr);}, this.taskRate);
	},
	addTask: function(task, name) {
		if(task.constructor.name != "Task") {
			task = new Task(task, name);
			task.reset();
		}
		this.tasks[name] = task;
	},
	clearTask: function(name) {
		delete this.tasks[name];
	},
	step: function(taskMgr) {
		taskMgr.frame += 1;
		for(var taskName in taskMgr.tasks) {
			var task = taskMgr.tasks[taskName];
			var result = task.execute();
			if(result == task.TaskDone) this.clearTask(task.name);
		}
	},
	getRunningTime: function() {
		return this.frame / this.frameRate;
	}
}