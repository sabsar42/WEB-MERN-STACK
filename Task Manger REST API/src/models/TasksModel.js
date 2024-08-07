const mongoose = require('mongoose');

const DataScheme = mongoose.Scheme({
    title: String,
    description: String,
    status: String,
    email: String,

},{
    timestamps:true, versionKey: false
    }
    );

const TasksModel = mongoose.model('tasks', DataScheme);
module.exports = TasksModel;