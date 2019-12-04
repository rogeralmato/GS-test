let {PythonShell} = require('python-shell');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const auth = require('http-auth');
const request = require('supertest');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', (req, res) => {
    res.render('form',{ title: 'Main' });
});


router.post('/', 
    [
        body('input')
          .isLength({ min: 1 })
          .withMessage('Please enter a string to encrypt')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            console.log(req.body);
            var valorInput = req.body['input'];
            console.log(valorInput)
            app.use(process({ vI: valorInput }))

             
            
        } else {
            res.render('form', {
              title: 'Main',
              errors: errors.array(),
              data: req.body,
            });
        }
    } 
);
router.post('/process',[
    body('input')
      .isLength({ min: 1 })
      .withMessage('Please enter a string to encrypt')
    ],
    (req,res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            var val_inp = req.body['input'];
            let crc = 0;
            const prom =  new Promise(async function(resolve,reject){
                //console.log(val_inp)
                let xcrc = await lastElem();
                let r = await runPy(val_inp,xcrc)
                rj = JSON.parse(r);
                var sql = "INSERT INTO data (input, inputEncrypted,inputCRC) VALUES ('"+rj.valorOriginal+"', '"+rj.valorEncriptat+"','"+rj.valorCRC+"')";
                db.query(sql, function (err, result) {
                    if (err) throw err;
                });
            })
            e = [ { msg: 'Missatge encriptat i guardat a la bd correctament'} ]
            res.render('form', {
                title: 'Main',
                errors: e,
                data: req.body,
              });
      
        }else {
            console.log(errors.array())
            res.render('form', {
                title: 'Main',
                errors: errors.array(),
                data: req.body,
              });
        }
        
    
});
  
router.get('/process',(req,res) => {
    console.log(req.query.valorInput)
    var val_inp = req.query.valorInput
    const promC = new Promise(async function(resolve,reject) {
        let crc = 0;
        const prom =  new Promise(async function(resolve,reject){
            let xcrc = await lastElem();
            let r = await runPy(val_inp,xcrc)
            rj = JSON.parse(r);
            var sql = "INSERT INTO data (input, inputEncrypted,inputCRC) VALUES ('"+rj.valorOriginal+"', '"+rj.valorEncriptat+"','"+rj.valorCRC+"')";
            db.query(sql, function (err, result) {
                if (err) throw err;
            });
        })
    })
}); 

router.get('/registrations',  auth.connect(basic),(req, result) => {  
    sql = "SELECT * FROM goldenspear.data;";
    db.query(sql, function (err, res) {
        if (err) {
            throw err; 
        }
         registrations= res;
         result.render('index', { title: 'Listing registrations', registrations }); 
         
    });
});
router.get('/registrationsJSON',  auth.connect(basic),(req, result) => {  
    sql = "SELECT * FROM goldenspear.data;";
    db.query(sql, function (err, res) {
        if (err) {
            throw err; 
        }
         result.end(JSON.stringify(res));
         
    });
});

function runPy(originalInput, crcAnterior){
  return new Promise(async function(resolve, reject){
        let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: './python/',
        pythonPath: '/usr/local/bin/python3',
        args: [originalInput,crcAnterior]
       };

        await PythonShell.run('fitxerpython.py', options, function (err, results) { 
          if (err) throw err;
    resolve(JSON.parse(JSON.stringify(results.toString())))
   });
 })
} 

function lastElem() {
  //Si no hi ha cap element, el shift ha de ser 0
  var result = 0
  return new Promise(async function(resolve,reject){
    sql = "select if((select count(inputCRC) from goldenspear.data order by id desc limit 1)>0,(select inputCRC  from goldenspear.data order by id desc limit 1),0) as inputCRC;";
    db.query(sql, function (err, res) {
        if (err) {
            throw err; 
        }
         //console.log(res[0].inputCRC)
         result = res[0].inputCRC;
         resolve(result);
    });
    
    
  })
}

module.exports = router;