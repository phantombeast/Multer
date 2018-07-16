const express=require('express');
const ejs=require('ejs');
const multer=require('multer')
const path=require('path')

const app=express();
const port=process.env.PORT||3000;


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/myupload')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage,
    }).single('profilepic')


app.set("view-engine","ejs");

app.use(express.static('./public'))

app.get('/',(req,res)=>{

    res.render("index.ejs");
})

app.post('/upload',(req,res)=>{

        upload(req,res,(err)=>{

            if(err){

                res.render('index.ejs',{
                    message:err
                })
            }else {

                res.render('index.ejs',{

                    message:'success',
                    filename:`myupload/${req.file.filename}`,

                })
                console.log(`myupload/${req.file.filename}`);
            }
        })

})


app.listen(port,()=>{
    console.log( `Server started at http://localhost:${port}`);
})
