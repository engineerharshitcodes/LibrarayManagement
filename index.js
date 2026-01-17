const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello World!'
    });
});



// ❗ always LAST
app.use((req, res) => {
   return res.status(404).json({
        message: 'Route not found'
    });
});


const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
