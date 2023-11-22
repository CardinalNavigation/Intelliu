//this file is used to create a newfile that contains a custom String

// file system : access the computers files
const fs = require('fs');
const path = require('path');

function saveFile(content, fileName){
  // console.log(`Saving content to ${fileName}.txt..`)
  fs.writeFile(path.resolve(__dirname, `./${fileName}`), content, err => {
  if (err) {
    console.error("Error writing file:",err);
    }}
    );
}//end saveFile



let string = 'This is a test for Moody';

saveFile(string,'TEST1.txt');

// to run this file simply type 
// node JSON2XL/createfile.js 
