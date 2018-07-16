const express=require('express');
const ejs=require('ejs');
const multer=require('multer')
const path=require('path')

const app=express();
const port=process.env.PORT||3000;


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/public/myupload')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage,
    }).single('myimage')


app.set("view-engine","ejs");

app.use(express.static('./public'))

app.get('/',(req,res)=>{

    res.send('this is fine');
})


app.listen(port,()=>{
    console.log( `Server started at http://localhost:${port}`);
})
