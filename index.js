const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql')
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
  user: 'root',
  password: '',
  database: 'eyecart'
  });



  
app.post('/addCart', (req, res) =>{
    const { id, name, price, originalPrice, image, discount } = req.body;
    
    if (!id || !name || !price || !originalPrice || !image || !discount) {
        return res.status(400).send({message: 'all field are required'})
    }
    const sql = "INSERT INTO `eyecart` (id, name, price, originalPrice, image, discount) VALUES (?, ?, ?, ?, ?, ?)";
   
    const VALUES = [id, name, price, originalPrice, image, discount];
    console.log(VALUES);
    connection.query(sql, VALUES, (err, results) =>{
        if(err){
            console.log('something is wrong', err);
            return res.status(500).send({message: "do not send"})
        }
        res.status(201).send({
            message: 'send successfully',
            item: { id, name, price, originalPrice, image, discount }
        })
    })
    
    
})

app.get('/addCart', (req, res) =>{
    const sql = "SELECT * FROM eyecart";
    connection.query(sql, (err, data) =>{
        if(err) return res.status(400).send({message:'can not be posted'});
        return res.json(data)
    })
})

app.get('/', (req,res) =>{
    res.send('running server')
})

app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
})
