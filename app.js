const config=require('config')
const express=require('express')
const mongoose=require('mongoose')
const expresshandlebars = require('express-handlebars')
const app=express()
const cookieParser = require('cookie-parser')
const PORT=config.get('port')

const homeRoute=require('./routes/home.routes')
const authRoute = require('./routes/auth.routes')
const adminRoute = require('./routes/admin.routes')


const hbs=expresshandlebars.create({
    defaultLayout:'main',
    extname:'hbs',
    helpers: {
        comparison: function(a, b, options){
            return (a > b) ? options.fn(this) : options.inverse(this);
        }
    }
})

app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','views')
app.use(express.static("public"))
app.use(cookieParser())

app.use(express.urlencoded({
    extended:true
}))

app.use(homeRoute)
app.use('/auth',authRoute)
app.use('/admin',adminRoute)


async function start(){
try {
    await mongoose.connect(config.get('connectionstring'),{
        useNewUrlParser:true,
        useUnifiedTopology: true
    })
    app.listen(PORT,()=>console.log('Server Start, Port:',PORT))
    
} catch (error) {
    console.log('error',error.message)
    process.exit(1)
}


}

start()