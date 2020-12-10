/*
  dependencies
*/

  const express = require('express')
  const admin = require('firebase-admin');
  let inspect = require('util').inspect
  let Busboy = require('busboy');
  let path = require('path')
  let os = require('os')
  let fs = require('fs')
  let UUID = require('uuid-v4')

/*
  config - express
*/

  const app = express()

/*
  config - firebase
*/

  const serviceAccount = require('./serviceAccountKey.json');
    
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db = admin.firestore();

/*
  endpoint - posts
*/

  app.get('/posts', (request, response) => {
    response.set('Access-Control-Allow-Origin', '*')

    let posts = []
    db.collection('posts').orderBy('date', 'desc').get().then(snapshot => {
      snapshot.forEach((doc) => {
        posts.push(doc.data())
      });
      response.send(posts)
    })
  })

/*
  listen
*/

  app.listen(process.env.PORT || 3000)