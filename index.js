const express = require('express');
const app =express();


app.get('/', (req, res) => {
    res.send('Hello World111!');
});

app.listen(5000,()=>{
    console.log('Server is Running');
    
})