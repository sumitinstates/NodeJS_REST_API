var express = require('express');
var sql = require('mysql');
var app = express();
var bodyparser = require('body-parser');
app.use(bodyparser.json());

var connection = sql.createConnection({
    host : 'localhost',
    user : 'c_ssaurab',
    password: 'Sunit@123456',
    database : 'sumit'
});

connection.connect((err)=>{
    if(err) throw err;
    console.log('Database connected');
});

const port = 3000;
app.listen(port,()=>{
    console.log(`app running at port ${port}`);

})

var query = "CREATE TABLE employee_details (id INT(20) AUTO_INCREMENT PRIMARY KEY ,name VARCHAR(255), address VARCHAR(255))";

//GET REQUEST
app.get('/',(req,res)=>{
    res.send("Hi Sumit ! Table Created");
    connection.query(query, (err,rows,fields)=>{
     if(err) throw err
     res.send(rows);
    console.log("Table Created");
    })
});

//GET REQUEST FOR ALL EMPLOYEE
app.get('/getAllEmployeeDetails',(req,res)=>{
    connection.query("SELECT * FROM employee_details",(err,rows,fields)=>{
        if(err) throw err
        res.send(rows);

    })
})

//GET REQUEST FOR EMPLOYEE WITH ID
app.get('/getEmployeeDetail/:id', (req,res)=>{
    
    connection.query('SELECT * FROM employee_details WHERE id = ?',[req.params.id],(err,rows,fields)=>{
        if(err) throw err
        res.send(rows);
    })
})

//POST or PUT REQUEST TO CREATE NEW EMPLOYEE
app.put('/createEmployee',(req,res)=>
{
    res.send("Data inserted");
    connection.query("INSERT INTO employee_details (name , address) VALUES ('ARPITA VATS' , 'BOSTON')",
     (err,rows, fields)=>{
        if(err) throw err
        res.send(rows);
        console.log("Data1 Inserted into table");
    });
    connection.query("INSERT INTO employee_details (name , address) VALUES ('SWATI TANVI' , 'BANGALORE')"
    , (err,result)=>{
        if(err) throw err
        console.log("Data2 Inserted into table");
    })
});


