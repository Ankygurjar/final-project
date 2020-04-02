const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
  extended: true
}))

app.use(cors())

const router = require('./routes')
app.use('/track', router)

app.listen(PORT, ()=>{
  console.log('Server is running on port : ', PORT)
})
