const express = require('express');
const fs = require('fs')
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  try {
    let today = new Date().toISOString()
    let file = today.replace(/:/g, '-')
    fs.writeFileSync(`Date/${file}.txt`,today,'utf8')
    let data = fs.readFileSync(`Date/${file}.txt`,'utf8')
    res.json( {"Data": data, " click to see All Files":`${req.url}getAllFiles` });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.get('/getAllFiles',(req,res) => {
  try {
    const dataFolderPath = path.join(__dirname, 'Date');
    fs.readdir(dataFolderPath,(err,files) => {
      const data = files.map((file) => {
        return file
      })
    res.send(data)
    })
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }

})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
