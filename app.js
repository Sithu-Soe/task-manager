const connectDB = require('./db/connect');
const express = require('express')
const tasks = require('./routes/tasks')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

require('dotenv').config()

const app = express()

//middleware
app.use(express.json())
app.use(express.static('./public'))


//routes
app.use('/api/v1/tasks', tasks)

// remember order matters
app.use(notFound)
app.use(errorHandlerMiddleware)

// app.get('/api/v1/tasks')         - get all the tasks
// app.post('/api/v1/tasks')        - create a new task
// app.get('/api/v1/tasks/:id')     - get a single task
// app.patch('/api/v1/tasks/:id')   - update a task
// app.delete('/api/v1/tasks/:id')  - delete a task

const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server listening on port ${port}....`)
        })
    } catch (error) {
        console.log('from app', error);
    }
}
start()