const express = require("express");
const router = express.Router();
const chatController = require ("../controller/chatController");
const validate= require ("../middleware/validate");
const chat = require("../modele/chat");



router.get("/chat", (req, res, next) => {
  console.log("Rendering chat page");
  res.render("chat");
});


router.get("/get/:id", chatController.getbyid);

router.get("/getall", chatController.getall);

router.post("/new", chatController.add);


router.post("/add", async (req, res) => {
  try {
    const { msg } = req.body;

    if (!msg) {
      return res.status(400).send({
        success: false,
        message: "Message content is required",
      });
    }

    const newChat = new chat({
      msg,
      date: new Date(),
    });

    await newChat.save();
    res.status(201).send({
      success: true,
      message: "Chat added successfully",
    });
  } catch (err) {
    console.error("Error adding chat:", err);
    res.status(500).send({
      success: false,
      message: "Failed to add chat",
      error: err.message,
    });
  }
});





module.exports = router;
