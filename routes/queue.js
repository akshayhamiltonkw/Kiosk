const router=require('express').Router();
//const {insideSeating,checkYourTurn,getInLineKiosk,outSideSeating}

const getInLineKiosk=require('../controllers/example');


// router.get('/insideSeating',insideSeating);
// router.post('/outSideSeating',outSideSeating);
router.post('/getInLineKiosk',getInLineKiosk);
// router.post('/checkYourTurn',checkYourTurn);

module.exports=router