const express = require("express");
const chat = require("../modele/chat");
const router = express.Router();

async function getall(req, res) {
  try {
    const data = await chat.find();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
}

async function getbyid(req, res) {
  try {
    const data = await chat.findById(req.params.id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
}

async function add(msge) {
  try {
    const Chat = new chat({
      msg: msge,
      date: new Date(),
    });
    //console.log("resultat:" + JSON.stringify(req.body));
    // console.log("resultat:" + JSON.stringify(Chat));
    console.log(new Date());
    await Chat.save();
    console.log("add success");
  } catch (err) {
    console.log({ error: err.toString() });
  }
}






















module.exports = { getall, getbyid, add };
