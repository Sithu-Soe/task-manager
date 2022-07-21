const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.status(200).json({ tasks });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const createTask = async (req, res) => {
	try {
		const task = await Task.create(req.body);
		res.status(201).json({ task });
	} catch (error) {
		errorResponse(res, error);
		// res.status(500).json({msg: error})
	}
	// const task = await Task.create(req.body).catch((err) =>
	// 	res.status(500).json({msg: err})
	// );
	// res.status(201).json(task);
};

const getTask = async (req, res) => {
	try {
		const { id: taskID } = req.params;
		const task = await Task.findOne({ _id: taskID });
		if (!task) {
			return res.status(404).json({ msg: `no task with id: ${taskID}` });
		}
		res.status(200).json({ task });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

// patch update is to update the partial fields of the document
const updateTask = async (req, res) => {
	try {
		const { id: taskID } = req.params;
		const task = await Task.findByIdAndUpdate(taskID, req.body, {
			new: true,
			runValidators: true,
		});
		// const task = await Task.findOneAndUpdate({_id: taskID}, req.body)
		if (!task) {
			return res.status(404).json({ msg: `no task with id: ${taskID}` });
		}
		res.status(200).json({ task });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const deleteTask = async (req, res) => {
	try {
		const { id: taskID } = req.params;
		const task = await Task.findOneAndDelete({ _id: taskID });
		if (!task) {
			return res.status(404).json({ msg: `no task with id: ${taskID}` });
		}
		res.status(200).json({ task });
		// res.status(200).send()
		// res.status(200).json({task: null, stauts: 'success'})
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

//put method update is that updates entire document.
const editTask = async (req, res) => {
	try {
		const { id: taskID } = req.params;
		const task = await Task.findByIdAndUpdate(taskID, req.body, {
			new: true,
			runValidators: true,
            overwrite: true,// that is the main to update the entire document
		});
		// const task = await Task.findOneAndUpdate({_id: taskID}, req.body)
		if (!task) {
			return res.status(404).json({ msg: `no task with id: ${taskID}` });
		}
		res.status(200).json({ task });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

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
