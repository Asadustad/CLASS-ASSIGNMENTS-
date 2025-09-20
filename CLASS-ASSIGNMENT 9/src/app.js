const express = require('express')
const { connectDB } = require('./config/database')
const { User } = require('../model/user')
const {bcrypt }= require('bcrypt')
const {validator} = require('validator')
const {cookieparser} = require('cookie-parser')
const { userAuth } = require('./middleware/weare')
const app = express()
app.use(express.json())
app.use(cookieparser())


app.use('/signup',  async(req, res)=>{
    try{
        const { firstname, lastname, email, password } = req.body

        if(!firstname || !lastname){
            throw new Error ('name is not valid')
        }else if(!validator.isEmail(email)){
            throw new Error('email is not valid')
        }else if (!validator.isStrongPassword(password)){
            throw new Error ('plz use a strong password ')
        }
         
        const hashedpassword = await bcrypt.hash(password, 10)

        const user = new User({
            firstname,
            lastname,
            email,
            password: hashedpassword
        })
        await user.save()
        res.send('User signed up successfully !')
    

        
    } catch (error) {
          res.status(400).send({
            message: 'Add Product error !',
            error: error.message
        })
    }

})

app.use ('/login', async(req, res)=>{
    try {
        const { email, password } = req.body
        if(!email || !password){
            throw new Error('Invalid credentials')
        }
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error('User not found')
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error('Invalid credentials')
        }
        res.send('User logged in successfully')
    } catch (error) {
        res.status(400).send({
            message: 'Login error !',
            error: error.message
        })
    }
})
app.post('/addProduct', userAuth,  async (req, res)=>{
    try {
        const {firstName} = req.user
        console.log("User from Add Product API-->", firstName);
        
        res.send(`Product added by ${firstName}`)
    } catch (error) {
          res.status(400).send({
            message: 'Add Product error !',
            error: error.message
        })
    }
})

app.use('/getuser', userAuth, async (req, res) => {
    try {
        const { firstName,} = req.user
        res.send(`get created by ----> ${firstName}`)        
    } catch (error) {
        res.status(400).send({
            message: 'get creation error !',
            error: error.message
        })
    }
})

app.use('/post' , userAuth, async (req, res) => {
    try {
        const {firstName} = req.user
        res.send(`Post created successfully ! ${firstName}`)

    } catch (error) {
        res.status(400).send({
            message: 'Post creation error !',
            error: error.message
        })
    }
})

app.use('/delete', userAuth, async (req, res) => {
    try {
        const {firstName} = req.user
        res.send(`Post deleted by ${firstName}`)
    } catch (error) {
        res.status(400).send({
            message: 'Post deletion error !',
            error: error.message
        })
    }
})
app.use('/update', userAuth, async (req, res) => {
    try {
        const {firstName} = req.user
        res.send(`Post updated successfully ! ${firstName}`)
    }
    catch (error) {
        res.status(400).send({
            message: 'Post updation error !',
            error: error.message
        })
    }
})
app.use('/logout', userAuth, async (req, res) => {
    try {
        res.clearCookie('token')
        res.send('User logged out successfully !')
    } catch (error) {
        res.status(400).send({
            message: 'Logout error !',
            error: error.message
        })
    }
})



connectDB().then(()=>{

    console.log('Database connected')
    
    app.listen(3000, ()=>{
        console.log('Server is running on port 3000')
    })

}).catch((err)=>{
    console.error('Database connection failed' ,err)
})