const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});
const fs = require('fs');
const path = require('path');
const Class = require('../models/classModel');
const Student = require('../models/studentModel');
const User = require('../models/userModel');
const { argv } = require("process");
const Subreg = require("../models/subregModel");

//console.log(process.env);

mongoose.connect(process.env.DATABASE,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology: true
})
.then(() => console.log("Database Connection Successfull!"))
.catch(err=>console.log(err));

const loadData = async (Model, filePath) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname,filePath)));
    try {  
        await Model.create(data);
        console.log(`${Model.modelName}s Data loaded successfully`);
    } catch (error) {
        console.log(error.message);
    }
}

const saveData = async (Model, filePath) => {
    const data = await Model.find();
    try {  
        fs.writeFileSync(path.join(__dirname,filePath),JSON.stringify(data));
        console.log(`${Model.modelName}s Data saved successfully`);
    } catch (error) {
        console.log(error.message);
    }
}

const deleteData = async (Model, filePath) => {
    try {  
        await Model.deleteMany({});
        console.log(`${Model.modelName}s Data deleted successfully`);
    } catch (error) {
        console.log(error.message);
    }
}

const replaceClassWithID = async () => {

    const students = await Student.find();
    students.forEach(async stud => {
        const id = await Class.findOne({class:stud.class});
        stud.class = id._id;
        stud.save({runValidators:false});
    });

    console.log('Ids swapped successfully');
}

const controllerFunc = async (i) => {
    const funcs = [loadData,saveData,deleteData];
    [
        // [Class,'classes.json']
        [Student,'students.json'],
        // [Subreg,'subregs.json']
        // [User,'users.json']
    ].forEach(params => funcs[i](...params));
}

if(process.argv[2] === "--import"){
    controllerFunc(0);
}else if(process.argv[2] === "--save"){
    controllerFunc(1);
}else if(process.argv[2] === "--delete"){
    controllerFunc(2);
}else if(process,argv[2] === '--updateIDs'){
    replaceClassWithID();
}

// (async ()=> {
//     const data = await Class.find({name:"JSS 3"}).populate('students').select('students');
//     console.log(data);
// })
// ();



//loadData(Class,'classes.json');
