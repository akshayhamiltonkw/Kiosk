const router = require("express").Router();
const auth = require("../middleware/authentication");
const {GetCustomerByPhone,GetQueueByPhoneAndRest} = require("../controllers/GetCustomerByPhone");

router.get("/GetCustomerByPhone", GetCustomerByPhone);
router.get("/GetQueueByPhoneAndRest", GetQueueByPhoneAndRest);


module.exports = router; 