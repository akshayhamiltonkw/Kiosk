const router = require("express").Router();
//const {insideSeating,checkYourTurn,getInLineKiosk,outSideSeating}

//const  = require("../controllers/example");
//const { createQueue, getInLineKiosk } = require("../controllers/queue");
const { getInlineKiosk, getQueue } = require("../controllers/newqueue");

// router.get('/insideSeating',insideSeating);
// router.post('/outSideSeating',outSideSeating);
// router.post("/getInLineKiosk", getInLineKiosk);
// router.post("/createQueue", createQueue);

router.post("/getInlineKiosk", getInlineKiosk);
router.get("/getQueue", getQueue);

module.exports = router;
