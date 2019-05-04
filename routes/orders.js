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

    res.status(200).send(orders)
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
