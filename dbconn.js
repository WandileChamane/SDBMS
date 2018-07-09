// app.js
const mysql = require('mysql'); 
// First you need to create a connection to the db
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sdbmsroot',
});

const dbconn = con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

let sql = "";

con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
});


con.end((err) => {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});