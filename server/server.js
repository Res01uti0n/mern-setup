import express from "express"
import path from "path"
import { MongoClient } from "mongodb"

import devBundle from "./devBundel"
import index from "../index.js"

const CURRENT_WORKING_DIR = process.cwd()
const app = express()
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")))
devBundle.compile(app)

app.get('/', (req, res) => {
  res.status(200).send(index())
  })

let port = process.env.PORT || 3000
app.listen(port, err => {

  if (err) {
    console.log(err)
  }

  console.info("Server started on port %s.", port)
})

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/mernSetup"
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    console.log("Connected successfully to mongodb server")
    db.close()
  }
)
