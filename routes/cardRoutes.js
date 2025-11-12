const router = require("express").Router();
const cardController = require("../controller/cardController");

router.post("/sendBirthdayMessage", cardController.postBirthdayMessage);
router.get("/card/:id", cardController.showBirthdayCard);
router.get("/form", cardController.getBirthdayMessageForm);

module.exports = router;
