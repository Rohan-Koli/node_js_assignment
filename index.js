const express = require("express")
const schoolsRouter = require("./routes/school.route.js")
const PORT = 8000
const app = express()
app.use(express.json())
app.use("/",schoolsRouter)

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))