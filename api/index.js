const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World! this is a test, hope it works')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
