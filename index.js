const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// password:vPV7EoZNLgyY5QgZ
//user:database2

const uri =
  'mongodb+srv://database2:vPV7EoZNLgyY5QgZ@cluster0.fhpnqfy.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    const userCollection = client.db('nodeMongoCrud').collection('users')
    //get data /read data
    app.get('/users', async (req, res) => {
      const query = {}
      const cursor = userCollection.find(query)
      const users = await cursor.toArray()
      res.send(users)
    })
    // create data / post data
    app.post('/users', async (req, res) => {
      const user = req.body
      console.log(user)
      const result = await userCollection.insertOne(user)
      res.send(result)
    })
    // delete data
    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id
      //console.log('trying to delete', id)
      const query = { _id: new ObjectId(id) }
      const result = await userCollection.deleteOne(query)
      console.log(result)
      res.send(result)
    })
  } finally {
    //await client.close()
  }
}
run().catch((err) => console.log(err))

app.get('/', (req, res) => {
  res.send('Simple Node Mongo CRUD Server Running')
})
app.listen(port, () => {
  console.log(`Simple node server running on port ${port}`)
})
