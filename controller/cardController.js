const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../data/cardContent.json");
const { v4: uuidv4 } = require("uuid");

exports.postBirthdayMessage = (req, res, next) => {
  const { birthdayMessage } = req.body;
  const cardId = uuidv4();

  if (!birthdayMessage) {
    return res.status(400).json({ error: "Message is required" });
  }
  fs.readFile(dataPath, "utf8", (err, filedata) => {
    let allCards = JSON.parse(filedata || "[]");
    if (!err && filedata) {
      try {
        allCards = JSON.parse(filedata);
      } catch (parseErr) {
        allCards = [];
      }
    }
    //add new message
    const newCard = { id: cardId, birthdayMessage };
    allCards.push(newCard);

    //save updated array

    fs.writeFile(dataPath, JSON.stringify(allCards, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to save message" });
      }
      // res.redirect(`/card/${cardId}`);
      res.json({id: cardId});
    });
  });
};
exports.showBirthdayCard = (req, res, next) => {
  const cardId = req.params.id;
  
  fs.readFile(dataPath, "utf8", (err, filedata) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read message" });
    }
    const allCards = JSON.parse(filedata);
    const card = allCards.find(c => c.id === cardId)
    if (!card) {
      return res.status(404).send("Card not found");
    }
    res.render("innerPage", {
      pageTitle: "Birthday Message",
      birthdayMessage: card.birthdayMessage,
    });
  });
};

exports.getBirthdayMessageForm = (req, res, next) => {
  res.render("form", {
    pageTitle: "Create Birthday Message",
    birthdayMessage: "",
  });
};
