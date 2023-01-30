const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express()
const cors = require('cors');
const port = 5000 || process.env.PORT


app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.IB_USER}:${process.env.IB_PASS}@cluster0.oi96zuc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 async function run () {
      try{
       await client.connect()
       const productCollection = client.db('ibm').collection('products')

       app.get('/products' , async(req,res) =>{
        const query = {}
        const result = await productCollection.find(query).toArray()
        res.send(result)
       })
      }

      finally{

      }
}

run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello from IBM!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})