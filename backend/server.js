const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors());

const URL = process.env.DATABASE;
const DB = process.env.DATABASE_NAME;
const client = new MongoClient(URL);

client
  .connect()
  .then(() => {
    console.log('Connected Successfully to MongoDB!');
    client.close();
  })
  .catch((error) => console.log('No connection...', error));

//1) GET/memberships
//2) POST /membership
//3) DELETE /membership/:id
//4) GET /users/:order
//5) POST /users
//6) POST /services

app.post('/users/:id', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(DB)
      .collection('users')
      .insertMany([
        {
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          ip: req.body.ip,
          serviceId: new ObjectId(req.params.id),
        },
      ]);
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/users/:order', async (req, res) => {
  try {
    const { order } = req.params;
    const sort = order === 'asc' ? 1 : -1;
    const con = await client.connect();
    const data = await con
      .db(DB)
      .collection('users')
      .aggregate([
        {
          $lookup: {
            from: 'services',
            localField: 'serviceId',
            foreignField: '_id',
            as: 'membership',
          },
        },
        {
          $unwind: '$membership',
        },
        { $sort: { name: sort } },
        {
          $project: {
            _id: 1,
            name: 1,
            surname: 1,
            email: 1,
            ip: 1,
            membership: { name: 1 },
          },
        },
      ])
      .toArray();

    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.get('/memberships', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(DB).collection('services').find().toArray();
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post('/memberships', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(DB)
      .collection('services')
      .insertMany([
        {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
        },
      ]);
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/memberships/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(DB)
      .collection('services')
      .deleteOne({ _id: new ObjectId(id) });
    res.json({ message: 'successfully deleted...' });
    await con.close();
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Sever started at port ${port}`));
