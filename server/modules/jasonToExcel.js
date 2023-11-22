const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
let dummydata1 = require("./DummyData/dummydata1.json");
let dummydata2 = require("./DummyData/dummydata2");
const dummydata3 = require("./DummyData/dummydata3");



function saveExcelFile(data, fileName) {
  // Convert the JSON data to an Excel worksheet
  const ws = XLSX.utils.json_to_sheet([data]);
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


dummydata1 = dummydata1[0].compare_results
let flattendata={
  high_level_spec: dummydata1[0].high_level_spec,
  low_level_spec: dummydata1[0].low_level_spec,
  ...dummydata1[0].compare_results
}
console.log
saveExcelFile(flattendata, 'dummyData3');
// saveExcelFile(data1, 'dummyData1');

