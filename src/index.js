const express = require('express');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

//
const app = express();

//middl
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req,file,cb)=>{
        cb(null, uuidv4()+path.extname(file.originalname))
    },
    
})

app.use(multer({
    storage,
    dest: path.join(__dirname, '../public/uploads'),
    limits: {fileSize: 1000000000},
    fileFilter: (req,file,cb)=>{
        const filetypes = /jpeg|jpg|png|pdf|webp|PDF|PNG|JPEG|JPG/
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname))
        if(mimetype && extname){
            console.log("aqui")
            return cb(null,true)
        }
        cb("Por favor el archivo debe ser de los formatos siguientes: JPG, JPEG, PNG, WEBP, PDF")
    }
}).single('image-featured'))


//settings
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//static files
app.use(express.static(path.join(__dirname,'public')))

//routes
app.use(require('./routes/index.routes'))

//start the server
app.listen(PORT,() => {
    console.log(`Our app is running on port ${ PORT }`);
});