const express = require("express");
const bodyParser = require('body-parser')
const MongoClient = require("mongodb").MongoClient;

const database_user = process.env.DATABASE_USER;
const database_pass = process.env.DATABASE_PASSWORD;
const database_host = process.env.DATABASE_HOST;
const url = `mongodb://${database_user}:${database_pass}@${database_host}:27017`

const app = express();
const jsonParser = bodyParser.json();

app.use(function(req, resp, next) {
    resp.setHeader("Access-Control-Allow-Origin","*");
    resp.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE");
    resp.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-type");
    next();
})

app.get('/api/tickets', (req, resp) => {
    try {
        MongoClient.connect(url, (err, client) => {
            if(err) throw err;
            console.log("database connected!");
    
            const db = client.db("ticket_management");
            db.collection("tickets").find().toArray((err, result) => {
                if(err) throw err;
                resp.status(200).send(result);
                client.close();
            })
        })
    }
    catch (err) {
        return res.status(400).json({
            error: err.message,
        })
    }
})

app.get('/api/sold-tickets', (req, resp) => {
    try {
        MongoClient.connect(url, (err, client) => {
            if(err) throw err;
            console.log("database connected!");
    
            const db = client.db("ticket_management");
            db.collection("sold_tickets").find().toArray((err, result) => {
                if(err) throw err;
                resp.status(200).send(result);
                client.close();
            })
        })
    }
    catch (err) {
        return res.status(400).json({
            error: err.message,
        })
    }
})

app.post('/api/sold-tickets', jsonParser, (req, resp) => {
    try {
        console.log(req.body)
        MongoClient.connect(url, (err, client) => {
            if(err) throw err;
            console.log("database connected!");

            const db = client.db("ticket_management");
            db.collection("sold_tickets").insertMany(req.body, (err, result) => {
                if(err) throw err;
                client.close();
                return resp.status(200).json({
                    status: 'Buy Success',
                    data: result,
                })
            })
        })
    } catch (err) {
        return resp.status(400).json({
            error: err.message,
        })
    }
})

app.listen(3000, () => {
    console.log("server listening on port 3000")
})