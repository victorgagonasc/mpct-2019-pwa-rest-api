const express = require('express');
const router = express.Router();
const firebase = require('firebase');

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
};

firebase.initializeApp(config);

const db = firebase.firestore().collection('orders');

router.get('/', async (req, res) => {
  try {
    const orderSnapshot = await db.get();
    const orders = [];

    orderSnapshot.forEach(doc => {
      orders.push({ id: doc.id, ...doc.data() });
    });

    return res.status(200).send(orders)
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const order = await db.doc(id).get();

    if (!order.exists)
      return res.status(404).send({});

    return res.status(200).send({
      id: order.id,
      ...order.data()
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const { item, price, timeToGetReady } = req.body;

    if (!item || !price || !timeToGetReady) return res.status(400).send();

    const data = { item, price, timeToGetReady };

    const ref = await db.add(data);

    return res.status(200).send({ id: ref.id, ...data })
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { item, price, timeToGetReady } = req.body;

    if (!id || !item || !price || !timeToGetReady) return res.status(400).send();

    const data = { item, price, timeToGetReady };

    await db.doc(id).set(data, { merge: true });

    return res.status(200).send({ id, ...data });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) return res.status(400).send();

    await db.doc(id).delete();

    return res.status(200).send(id);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
