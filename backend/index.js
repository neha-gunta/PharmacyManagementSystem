const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const connection = require('./database');
const { response } = require('express');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));



// //read all
// app.get('/getAll', (request, response) => {
//     // response.json({
//     //     success: true
//     // })
//     let sql = 'SELECT * FROM EMPLOYEE_INFO';
//     connection.query(sql, (err, result) => {
//         if(err) throw err;
//         response.json(result);
//     })
// })

// //insert 
// app.post('/insert', (request, response) => {
//     const {name, job} = request.body;
//     //console.log(name, job);
//     let sql_insert = `INSERT INTO EMPLOYEE_INFO(full_name, job_title) VALUES("${name}", "${job}")`;
//     connection.query(sql_insert, (err, res) => {
//         if(err) throw err;
//         //response.json(res);
//     })
// })


// //update
// app.put('/edit/:id', (request, response) => {
//     const {id} = request.params;
//     const {name, job} = request.body;
//     let sql_insert = `UPDATE EMPLOYEE_INFO SET FULL_NAME=?, JOB_TITLE=? WHERE ID=?`;
//     connection.query(sql_insert, [name, job, id], (err, res) => {
//         if(err) throw err;
//         //response.json(res);
//     })
// })

// //delete
// app.delete('/delete/:id', (request, response) => {
//     const {id} = request.params;
//     let sql_insert = `DELETE FROM EMPLOYEE_INFO WHERE ID=${id}`;
//     connection.query(sql_insert, (err, res) => {
//         if(err) throw err;
//         //response.json(res);
//     })
// })


//for actual pharmacy database

//admin table
//login
app.post('/login', (request, response) => {
    let username = request.body.username;
    let password = request.body.password;
    //console.log(username);
    let sql = `SELECT * FROM ADMIN WHERE username='${username}' and password='${password}';`;
    connection.query(sql, (error, result) => {
        if(error) 
            console.log(error);
        else if(result.length == 0)
            response.send("Wrong combination!");
        else 
            response.send("Success");
    })
})

//medicine table

//get all medicine

app.get('/getAllMedicine', (request, response) => {
    let sql = 'SELECT * FROM MEDICINE;'
    connection.query(sql, (error, result) => {
        if(error) 
            throw error;
        else
            response.json(result);
    })
});

//get medicine by id

app.get('/getMedicine/:id', (request, response) => {
    const {id} = request.params;
    let sql = `SELECT * FROM MEDICINE WHERE MEDICINEID=${id};`
    connection.query(sql, (error, result) => {
        if(error) throw error;
        response.json(result);
    })
});

//get medicine by name

app.get('/getMedicineByName/:name', (request, response) => {
    const name = request.params.name;
    console.log(name);
    let sql = `SELECT * FROM MEDICINE WHERE MEDICINENAME='${name}';`
    connection.query(sql, (error, result) => {
        if(error) throw error;
        response.json(result);
    })
});

//add medicine
app.post('/addMedicine', (request, response) => {
    const {medicineName, medicineDescription, companyName, categoryName} = request.body;
    let sql = `INSERT INTO MEDICINE(medicineName, medicineDescription, companyName, categoryName) VALUES('${medicineName}', '${medicineDescription}', '${companyName}', '${categoryName}');`;
    connection.query(sql, (error, result) => {
        if(error) response.json(error);
        response.json(result);
    })
});

//update medicine
app.put('/editMedicine/:id', (request, response) => {
    const {id} = request.params;
    const {medicineName, medicineDescription, companyName, categoryName} = request.body;
    let sql = `UPDATE MEDICINE SET medicineName='${medicineName}', medicineDescription='${medicineDescription}', companyName='${companyName}', categoryName='${categoryName}' WHERE MEDICINEID=${id};`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        response.send("done"); 
    })
});

//delete medicine
app.delete('/deleteMedicine/:id', (request, response) => {
    const {id} = request.params;
    let sql = `DELETE FROM MEDICINE WHERE medicineID=${id};`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        response.send("deleted");
    })
})

//read  Category
app.get('/getCategory', (request, response) => {
    // response.json({
    //     success: true
    // })
    let sql = 'SELECT * FROM category';
    connection.query(sql, (err, result) => {
        if(err) throw err;
        response.json(result);
    })
})

//read Category by name
app.get('/getCategoryByName/:name', (request, response) => {
    const name = request.params.name;
    let sql = `SELECT * FROM category WHERE CATEGORYNAME COLLATE utf8mb4_general_ci LIKE '%${name}%'`;
    connection.query(sql, (err, result) => {
        if(err) throw err;
        response.json(result);
    })
})


//insertCategory
app.post('/insertCategory', (request, response) => {
    var {categoryName, categoryDescription} = request.body;
    //console.log(name, job);
   
    connection.query(`INSERT INTO CATEGORY VALUES('${categoryName}', '${categoryDescription}');`, (err, res) => {
        if(err) response.send("This category already exists!");
        else
        response.send("result");
        //response.json(res);
    })
})



//updateCategory
app.put('/editCategory/:name', (request, response) => {
    var inp = request.params.name;
    var {categoryName, categoryDescription} = request.body;
        //let sql_insert = `UPDATE category SET categoryName=?, categoryDesc=? WHERE categoryName='${nam}`;
    connection.query('UPDATE category SET categoryName = ?, categoryDescription=? WHERE (categoryName = ?);', [categoryName, categoryDescription, inp], (err, res) => {
            if(err) throw err;
            else
            response.send("done");
            //response.json(res);
        })
    });

//deleteCategory
app.delete('/deleteCategory/:name', (request, response) => {
    const {name} = request.params;
    let sql_insert = `DELETE FROM category WHERE categoryName='${name}'`;
    connection.query(sql_insert, (err, res) => {
        if(err) throw err;
        else
        response.send('Deleted');
        //response.json(res);
    })
})
//read  Company
app.get('/getCompany', (request, response) => {
    // response.json({
    //     success: true
    // })
    let sql = 'SELECT * FROM company';
    connection.query(sql, (err, result) => {
        if(err) throw err;
        response.json(result);
    })
})

//get company by name
app.get("/getCompanyByName/:companyName", (request, response) => {
    const companyName = request.params.companyName;
    console.log(companyName);
    let sql = `SELECT * FROM company WHERE companyName COLLATE utf8mb4_general_ci like '%${companyName}%';`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      response.json(result);
    });
  });

//insertCompany
app.post('/insertCompany', (request, response) => {
    var {companyName, companyDescription} = request.body;
    //console.log(name, job);
   
    connection.query(`INSERT INTO COMPANY VALUES('${companyName}', '${companyDescription}');`, (err, res) => {
        if(err) response.send("This company name already exists!");
        else
        response.send("result");
        //response.json(res);
    })
})



//updateCompany
app.put('/editCompany/:name', (request, response) => {
    var inpu = request.params.name;
    var {companyName, companyDescription} = request.body;
        //let sql_insert = `UPDATE category SET categoryName=?, categoryDesc=? WHERE categoryName='${nam}`;
    connection.query('UPDATE company SET companyName = ?, companyDescription=? WHERE (companyName = ?);', [companyName, companyDescription, inpu], (err, res) => {
            if(err) response.send("error");
            else response.send("done");
            //response.json(res);
        })
    });

//deleteCompany
app.delete('/deleteCompany/:name', (request, response) => {
    const {name} = request.params;
    let sql_insert = `DELETE FROM company WHERE companyName='${name}';`;
    connection.query(sql_insert, (err, res) => {
        if(err) response.send("Cannot delete");
        else response.send('Deleted');
        //response.json(res);
    })
})


//stock

//get all stock
app.get('/getAllStock', (request, response) => {
    let sql = `SELECT * FROM STOCK INNER JOIN MEDICINE ON STOCK.MEDICINEID=MEDICINE.MEDICINEID ORDER BY STOCKID ASC;`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        else response.json(result);
    })
})

//get stock by id
app.get('/getStockById/:id', (request, response) => {
    const {id} = request.params;
    let sql = `SELECT * FROM STOCK WHERE STOCKID=${id};`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        response.json(result);
    })
})

//get stock by medicine name
app.get('/getStockByName/:name', (request, response) => {
    const name = request.params.name;
    let sql = `SELECT * FROM STOCK WHERE MEDICINEID IN (SELECT MEDICINEID FROM MEDICINE WHERE MEDICINENAME like '%${name}%');`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        response.json(result);
    })
})

//add stock
app.post('/addStock', (request, response) => {
    const {costPerItem, quantity, manufactureDate, expiryDate, medicineID} = request.body;
    let sql = `INSERT INTO STOCK(costPerItem, quantity, manufactureDate, expiryDate, medicineID) VALUES(${costPerItem}, ${quantity}, '${manufactureDate}', '${expiryDate}', ${medicineID});`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        response.json(result);
    })
});

//update stock
app.put('/editStock/:id', (request, response) => {
    const {id} = request.params;
    const {costPerItem, quantity, manufactureDate, expiryDate, medicineID} = request.body;
    let sql = `UPDATE STOCK SET costPerItem=${costPerItem}, quantity=${quantity}, manufactureDate='${manufactureDate}', expiryDate='${expiryDate}', medicineID=${medicineID} WHERE STOCKID=${id};`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        response.send("done"); 
    })
});

//delete stock
app.delete('/deleteStock/:id', (request, response) => {
    const {id} = request.params;
    let sql = `DELETE FROM STOCK WHERE STOCKID=${id};`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        response.send("deleted");
    })
})

//customer
//get customer
app.get('/getAllCustomer', (request, response) => {
    let sql = `SELECT * FROM customer;`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        response.json(result);
    })
})

//get customer by id
app.get('/getCustomerById/:id', (request, response) => {
    const {id} = request.params;
    let sql = `SELECT * FROM customer WHERE customerID=${id};`;
    connection.query(sql, (error, result) => {
        if(error) response.send("error");
        else response.json(result);
    })
})

//get customer by name
app.get('/getCustomerByName/:name', (request, response) => {
    const name = request.params.name;
    console.log(request.params.name);
    let sql = `SELECT * FROM CUSTOMER WHERE CUSTOMERNAME COLLATE utf8mb4_general_ci LIKE '%${name}%';`;
    connection.query(sql, (error, result) => {
        if(error) response.send(error);
        else response.send(result);
    })
})

//get customer by number
app.get('/getCustomerByNumber/:num', (request, response) => {
    const num = request.params.num;
    console.log(request.params.num);
    let sql = `SELECT * FROM CUSTOMER WHERE CUSTOMERPHONENUMBER LIKE '%${num}%';`;
    connection.query(sql, (error, result) => {
        if(error) response.send("error");
        else response.send(result);
    })
})
//insertCustomer
app.post('/insertCustomer', (request, response) => {
    var {customerName, customerPhoneNumber} = request.body;   
    connection.query(`INSERT INTO customer VALUES('${customerName}', ${customerPhoneNumber})`, (error, result) => {
        if(error) response.send(error);
        else response.send(result);
        //response.json(res);
    })
})

//updateCustomer
app.put('/editCustomer/:id', (request, response) => {
    const {id}  = request.params;
    const {customerPhoneNumber,customerName} = request.body;
    let sql = `UPDATE customer SET customerPhoneNumber=${customerPhoneNumber}, customerName='${customerName}' WHERE customerID=${id};`;
    connection.query(sql, (error, result) => {

        if(error) throw error;
        response.send("done"); 
    })
});

//deleteCustomer
app.delete('/deleteCustomer/:id', (request, response) => {
    const {id} = request.params;
    let sql_insert = `DELETE FROM customer WHERE customerID='${id}'`;
    connection.query(sql_insert, (err, res) => {
        if(err) throw err;
        else
        response.send('Deleted');
        //response.json(res);
    })
})

//order
//get order
app.get('/getOrder', (request, response) => {
    let sql = `SELECT * FROM orders;`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        response.json(result);
    })
});

//get order by id
app.get('/getOrderById/:id', (request, response) => {
    const {id} = request.params;
    let sql = `SELECT * FROM orders WHERE orderID=${id};`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        response.json(result);
    })
})
//insertOrder
app.post('/insertOrder', (request, response) => {
    var data = request.body;
    //console.log(name, job);
   
    connection.query('INSERT INTO orders SET ?',data, (err, res) => {
        if(err) throw err;
        else
        response.send("result");
        //response.json(res);
    })
})



//updateOrder
app.put('/editOrder/:id', (request, response) => {
    const {id}  = request.params;
    const {orderDate,customerID} = request.body;
    let sql = `UPDATE orders SET orderDate='${orderDate}', customerID=${customerID} WHERE orderID=${id};`;
    connection.query(sql, (error, result) => {

        if(error) throw error;
        response.send("done"); 
    })
});

//deleteOrder
app.delete('/deleteOrder/:id', (request, response) => {
    const {id} = request.params;
    let sql_insert = `DELETE FROM orders WHERE orderID='${id}'`;
    connection.query(sql_insert, (err, res) => {
        if(err) throw err;
        else
        response.send('Deleted');
        //response.json(res);
    })
})


//order_contains
//get details of order
app.get('/getdetorder', (request, response) => {
    let sql = `SELECT * FROM order_contains;`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        response.json(result);
    })
})


//insert details of order
app.post('/insertdetorder', (request, response) => {
    var data = request.body;
    //console.log(name, job);
   
    connection.query('INSERT INTO order_contains SET ?',data, (err, res) => {
        if(err) throw err;
        else
        response.send("result");
        //response.json(res);
    })
})

//update orders of details
app.put('/editdetorder/:id/:id2', (request, response) => {
    const {id, id2}  = request.params;
    const {quantity} = request.body;
    let sql = `UPDATE order_contains SET quantity=${quantity} WHERE (orderID=${id}) and (stockID=${id2});`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        response.send("done"); 
    })
});

//delete details of orders in order det
app.delete('/deletedetorder/:id/:id2', (request, response) => {
    const {id,id2} = request.params;
    let sql_insert = `DELETE FROM order_contains WHERE orderID='${id}' and stockID='${id2}'`;
    connection.query(sql_insert, (err, res) => {
        if(err) throw err;
        else
        response.send('Deleted');
        //response.json(res);
    })
})



app.get('/getOrder', (request, response) => {
    let sql = 'SELECT * FROM ORDERs;';
    connection.query(sql, (error, result) => {
        if(error) throw error;
        response.json(result);
    })
});

app.listen(process.env.PORT, () => {
    console.log('app is running');
    connection.connect((err) => {
        if(err) console.log(error);
        console.log("Database connected");
    })
});

