const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

function saveExcelFile(data, fileName) {
  // Convert the JSON data to an Excel worksheet
  const ws = XLSX.utils.json_to_sheet(data);
  // Create a new Excel workbook and add the worksheet to it

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
  // Convert the workbook to a binary buffer

  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
  // Write the buffer to a file
  fs.writeFile(path.resolve(__dirname, `./${fileName}.xlsx`), excelBuffer, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log(`${fileName}.xlsx has been created successfully.`);
    }
  });
}

const jsonData = [
  { Name: 'John', Age: 30, City: 'New York' },
  { Name: 'Alice', Age: 25, City: 'Los Angeles' },
  { Name: 'Bob', Age: 35, City: 'Chicago' },
  { Name: 'JD', Age: 21, City: 'Minnesota' },
];

saveExcelFile(jsonData, 'output');
