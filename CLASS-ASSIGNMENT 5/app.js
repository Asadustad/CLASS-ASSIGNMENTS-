//  const express = require ('express')
//  const {MongoClient} = require ('mongodb')

//  const app = express()

//  app.use(express.json());


//  const uri = 'mongodb+srv://asadustad83_db_user:asadali0@cluster0.hab8lew.mongodb.net/'

//  const client = new MongoClient(uri)

// const dbname = 'SMIT'

// async function main(){
//     try {
//        await client.connect()
//        const db = client.db(dbName)
//        const collection = db.collection('students')

//        const data = {
//         name: 'asadali', 
//         age: 19,
//          email: 'asadali@example.com'
//        }

//        const { name, age, email } = data

//       if(name && age && email){
//           const insertOneDoc = await collection.insertOne({
//               name,
//               age,
//               email
//           })
//           console.log('Inserted documents =>', insertOneDoc);
//       } else {
//         console.log("Requirement not met");
//       }
//        const getDoc = await collection.findOne({
//        }).toArray()
//        app.use('/getTodos', (req, res) => {
//   res.send(' Hello getTodos' + getDoc)
// })






//     // const getDoc = await collection.find({age: 25}).toArray()

//       //  console.log('Found documents =>', getDoc, );
//       //  console.log('Document count  =>', getDoc.length );



//     // const updateDoc = await collection.updateMany(
//     //     {age: 25},
//     //     {$set: {age: 30}}
//     // )

//     // console.log('Updated documents =>', updateDoc);


//     // const deleteDoc = await collection.deleteMany({age: 30})

//     // console.log('Deleted documents =>', deleteDoc);

//     // const deleteDoc = await collection.findOneAndDelete({name: "John Doe Updated"})

//     // console.log('Deleted documents =>', deleteDoc);
//     //    return "DONE "
     
//     } catch (error) {
//         console.log(error);
        
//     }
// }



// app.use('/getTodos', (req, res) => {
//   res.send(' Hello getTodos')
// })
// app.use('/updateTodo', (req, res) => {
//   res.send('Hello updateTodo!')
// })
// app.use('/deleteTodo', (req, res) => {
//     res.send('Hello deleteTodo!')
// })
// app.use('/postTodo',(req,res)=>{
//     res.send('Hello posttodo!')
// })

// app.listen(3000, () => {
//   console.log('Server is running on port 3000')
// })

const express = require('express');
const { MongoClient, CURSOR_FLAGS } = require('mongodb');

const app = express();
app.use(express.json());

const uri = "mongodb+srv://asadustad83_db_user:asadali0@cluster0.hab8lew.mongodb.net/";
const client = new MongoClient(uri);
const dbname = 'smit';

// GET Todos
app.get('/', async (req, res) => {
    try {
        await client.connect();
        console.log("Connected to database");
        const db = client.db(dbname);
        const collection = db.collection('student');


        const insertOneDoc = await collection.insertOne({ 
            name: 'asadali', 
            age: 19,
            email: 'asadali@example.com'

               
        })

          console.log('Inserted documents =>', insertOneDoc)
        
        const docs = await collection.find({}).toArray();
        res.json(docs);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// POST Todo
app.post('/postTodo', async (req, res) => {
    const { name, age, email } = req.body;

    if (name && age && email) {
        try {
            await client.connect();
            const db = client.db(dbname);
            const collection = db.collection('students');
            const result = await collection.insertOne({ name, age, email });
            res.status(201).json(result);
        } catch (err) {
            console.error(err);
            res.status(500).send("Insert failed");
        }
    } else {
        res.status(400).send("Missing fields");
    }
});

// Sample Routes
// app.put('/updateTodo', (req, res) => {
//     res.send('Hello updateTodo!');
// });
// app.delete('/deleteTodo', (req, res) => {
//     res.send('Hello deleteTodo!');
// });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
