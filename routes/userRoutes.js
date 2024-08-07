const express = require('express');
const { getUserController, updateUserController, updateUserPasswordController,resetPasswordController, deleteUserController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();


//GET USER || GET
router.get("/getUser",authMiddleware,getUserController);

//Update Profile
router.put("/updateUser",authMiddleware,updateUserController);


//Update Password
router.post("/updatePassword",authMiddleware,updateUserPasswordController);

//RESET PASSWORD
router.post("/resetPassword",authMiddleware,resetPasswordController);

//DELETE ACCOUNT
router.post("/deleteUser/:id",authMiddleware,deleteUserController);

module.exports = router;