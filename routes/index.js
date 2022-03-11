var express = require('express');
const { default: mongoose } = require('mongoose');
var router = express.Router();
const Taker = require('../model/taker');
const Sender = require('../model/sender');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'راسلني' });
});

router.post('/fslniwrnp29hviwrnirwvuwrbukr' , (req,res,next)=>{
  Taker.findOne({ userName : req.body.code } , (error,doc)=>{
    if(error) console.log(error) ;
    if(!doc){
      const taker = new Taker({
        userName : req.body.code 
      });
      taker.save((err,r)=>{
        if (err) console.log(err) ;
        res.redirect('/fslniwrnp29hviwrnirwvuwrbukr/'+ r.id);
      });
    } else {
      res.send('هذه الكلمة مستخدمة من قبل');
    }
  });
});

router.get('/fslniwrnp29hviwrnirwvuwrbukr/:id' , (req,res,next)=>{
  //Taker.findOne({userName:req.params.id} , (err,r)=>{
  //if (err) console.log(err) ;
  const link = req.params.id ;
  res.render('link' , {link : link});
})


router.get('/up/:id' , (req,res,next)=>{
  res.render('up' , {id : req.params.id});
});

router.post('/msg' , (req,res,next)=>{
  const sender = new Sender({
    its : req.body.id ,
    msg : req.body.msg 
  });
  sender.save((err,r)=>{
    if (err) console.log(err) ;
    res.redirect('/up/'+req.body.id);
  });
});

router.get('/qw12er34tymwwurh82h82f8o2hf28fhieqh/:id' , (req,res,next)=>{
  Sender.find({its:req.params.id} ,(err,r)=>{
    if (err) console.log(err) ;
    console.log(r) ;
    console.log(r.length) ;
    res.render('get' , {r : r , length : r.length });
  });
});









module.exports = router;
