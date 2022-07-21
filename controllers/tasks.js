const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const {createCustomError} = require("../errors/custom-error");

// we are passing the whole function to the asyncWrapper function to handle error and refactor the code.
const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find({});
	res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body);
	res.status(201).json({ task });

	// const task = await Task.create(req.body).catch((err) =>
	// 	res.status(500).json({msg: err})
	// );
	// res.status(201).json(task);
});

const getTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const task = await Task.findOne({ _id: taskID });
	if (!task) {
		return next(createCustomError(`no task with id: ${taskID}`, 404));
		// return res.status(404).json({ msg: `no task with id: ${taskID}` });
	}
	res.status(200).json({ task });
});

// patch update is to update the partial fields of the document
const updateTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const task = await Task.findByIdAndUpdate(taskID, req.body, {
		new: true,
		runValidators: true,
	});
	// const task = await Task.findOneAndUpdate({_id: taskID}, req.body)
	if (!task) {
		return next(createCustomError(`no task with id: ${taskID}`, 404));
	}
	res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const task = await Task.findOneAndDelete({ _id: taskID });
	if (!task) {
		return next(createCustomError(`no task with id: ${taskID}`, 404));
	}
	res.status(200).json({ task });
	// res.status(200).send()
	// res.status(200).json({task: null, stauts: 'success'})
});

//put method update is that updates entire document.
const editTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findByIdAndUpdate(taskID, req.body, {
		new: true,
		runValidators: true,
		overwrite: true, // that is the main to update the entire document
	});
	// const task = await Task.findOneAndUpdate({_id: taskID}, req.body)
	if (!task) {
		return next(createCustomError(`no task with id: ${taskID}`, 404));
	}
	res.status(200).json({ task });
});

const errorResponse = (res, err) => {
	return res.status(500).json({ msg: err });
};

module.exports = {
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
	editTask,
};
