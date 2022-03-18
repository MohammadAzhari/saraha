var express = require("express");
var router = express.Router();
const Taker = require("../model/taker");
const Sender = require("../model/sender");

//mongodb+srv://mazhari:2875@cluster0.4ipww.mongodb.net/send
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "صراحة بجنيه" });
});

router.post("/send", (req, res, next) => {
  Taker.findOne({ userName: req.body.code }, (error, doc) => {
    if (error) console.log(error);
    if (!doc) {
      const taker = new Taker({
        userName: req.body.code,
        random: Math.random(),
      });
      taker.save((err, r) => {
        if (err) console.log(err);
        res.redirect("/send/" + r.random);
      });
    } else {
      let condition = false;
      res.render("notfound", { condition: condition });
    }
  });
});

router.get("/send/:num", (req, res, next) => {
  Taker.findOne({ random: req.params.num }, (err, r) => {
    if (err) console.log(err);
    const link = r.id;
    Sender.find({ its: link }, (err, r) => {
      if (err) console.log(err);
      let condition = false;
      r.length == 0 ? (condition = true) : 1;
      res.render("get", {
        link: link,
        r: r,
        length: r.length,
        condition: condition,
      });
    });
  });
});

router.get("/up/:id", (req, res, next) => {
  res.render("up", { id: req.params.id });
});

router.get("/suceess", (req, res, next) => {
  res.render("success");
});

router.post("/msg", (req, res, next) => {
  const sender = new Sender({
    its: req.body.id,
    msg: req.body.msg,
  });
  sender.save((err, r) => {
    if (err) console.log(err);
    res.redirect("/suceess");
  });
});

router.post("/search", (req, res) => {
  Taker.findOne({ userName: req.body.search }, (err, r) => {
    if (err) console.log(err);
    if (!r) {
      let condition = true;
      res.render("notfound", { condition: condition });
    } else {
      res.redirect("/send/" + r.random);
    }
  });
});

module.exports = router;
