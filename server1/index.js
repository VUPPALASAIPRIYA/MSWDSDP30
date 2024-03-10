// server/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const loanRoutes = require('./routes/loanRoutes');

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const client = new MongoClient('mongodb+srv://project2:project2@cluster0.vfmtvno.mongodb.net/?retryWrites=true&w=majority');
client.connect();

const db = client.db("Project");
const col = db.collection("user");
const col2 = db.collection("Banking");

// Routes for Loan Management module
app.use('/api', loanRoutes);

app.get('/home', (req, res) => {
  res.send("It is a Home page-New page1");
});

app.post('/insert', async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 5);
  console.log(req.body);
  col.insertOne(req.body);
  res.send("Data Received");
});

app.post('/check', async (req, res) => {
  console.log(req.body);
  var result = await col.findOne({ "name": req.body.un });
  if (result != null) {
    if (await bcrypt.compare(req.body.pw, result.password)) {
      res.send(result);
    } else {
      res.send("fail");
    }
  } else {
    res.send("fail");
  }
});

app.get('/show', async (req, res) => {
  var result = await col.find().toArray();
  console.log(result);
  res.send(result);
});

app.post('/entry', async (req, res) => {
  try {
    const loanData = req.body;
    const result = await col2.insertOne(loanData);

    if (result.insertedCount === 1) {
      res.send("Successfully Inserted");
    } else {
      res.status(500).send("Failed to insert loan data");
    }
  } catch (error) {
    console.error('Error applying for loan:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/display', async (req, res) => {
  var result = await col2.find().toArray();
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/delete',async(req,res) => {
  const result2 = await col.findOne({'name':req.body.un})
  console.log(result2.firstName)
  console.log(req.body.un)
  if(result2.firstName == req.body.un)
  {
      col.deleteOne({firstName:result2.firstName});
      res.send("deleted Successfully");
  }
})
