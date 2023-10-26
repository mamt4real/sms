// const {readFileSync, writeFile} = require("fs");
// const path = require("path");

// const database = {
//     "Classes":"classes.json",
//     "Students": "students.json",
//     "Subjects": "subjects.json",
//     "SubRegs": "subRegs.json",
//     "Users":"users.json"
// };

// const load = (fileName) =>{
//     try{
//         const text = readFileSync(path.join(__dirname,fileName),"utf-8");
//         return JSON.parse(text);
//     }catch(error){
//         console.log(error);
//         return null;
//     }
// }

// const save = (fileName,data) => {
//     writeFile(path.join(__dirname,fileName), JSON.stringify(data,null,4),(err)=>{
//         console.log(err);
//     });
// }

// for(key in database){
//     if(!(database[key] instanceof Array))
//         database[key] = load(database[key]);
// }

// //console.log(database.Classes);

// module.exports = {...database,save};