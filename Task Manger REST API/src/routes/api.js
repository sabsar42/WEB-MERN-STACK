const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const TasksController = require("../controllers/TasksController");


router.post("/registration", UsersController.registration);
router.post("/login", UsersController.login);
router.post("/profileUpdate",AuthVerifyMiddleware, UsersController.profileUpdate);
router.post("/profileDetails",AuthVerifyMiddleware,UsersController.profileDetails);

router.get("/RecoverVerifyEmail/:email",AuthVerifyMiddleware,UsersController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",AuthVerifyMiddleware,UsersController.RecoverVerifyOTP);
router.post("/RecoverResetPass",AuthVerifyMiddleware,UsersController.RecoverResetPass);


router.post("/createTask",AuthVerifyMiddleware, TasksController.createTask);
router.get("/updateTaskStatus/:id/:status",AuthVerifyMiddleware,TasksController.updateTaskStatus);
router.get("/deleteTask/:id",AuthVerifyMiddleware,TasksController.deleteTask);
// router.get("/showAllTask/:status",AuthVerifyMiddleware,TasksController.showAllTask);
router.get("/taskStatusCounts",AuthVerifyMiddleware,TasksController.taskStatusCounts);
router.get("/ListTaskByStatus/:status", AuthVerifyMiddleware,TasksController.ListTaskByStaus)

module.exports = router;