const express = require('express');
const fs = require('fs');
const XLSX = require('xlsx');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const filePath = './data.xlsx';

app.post('/submit', (req, res) => {
  const { name, email } = req.body;

  let data = [];
  if (fs.existsSync(filePath)) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    data = XLSX.utils.sheet_to_json(sheet);
  }

  data.push({ Name: name, Email: email });

  const newWB = XLSX.utils.book_new();
  const newSheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(newWB, newSheet, 'Data');
  XLSX.writeFile(newWB, filePath);

  res.send({ message: 'Saved to Excel.' });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
