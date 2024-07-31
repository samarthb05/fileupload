const controller=require('./controller')
const express =require('express');
const router =express.Router();

router.post('/upfile',controller.uploadfile);
router.get('/getfiles',controller.getallfiles);
router.get('/fileById/:id',controller.getfilebyId);
router.put('/editfile/:id',controller.editfile);
router.delete('/deletefile/:id',controller.deletefile);


module.exports=router;