// await keyword needs a async funciton
// function => IIFE
// Immediately Invoked Function Expression

// IIFE
(function(){
    console.log("krsna");
})();

let fs = require("fs");

// async indicates, it will directly go to NODEAPI and 
// not in stack.. it will not interfere in stack
async function fun(){
    try{
        let data1 =  await fs.promises.readFile("../file1.txt");
                    // wait to let data1 come
        // next line will run only if data1 comes
        // if error  then catch
        let data2 = await fs.promises.readFile("../file2.txt");
        // next line when data2 will come
        let data3 = await fs.promises.readFile("../file3.txt");
        console.log("Content "+ data1);
        console.log("Content "+ data2);
        console.log("Content "+ data3);
    }
    catch(error){
        console.log(error);
    }
}

fun();  // funcition call


// IIFE function
// no need to call
// called only once
(async function(){
    try{
        let data1 =  await fs.promises.readFile("../file1.txt");
                    // wait to let data1 come
        // next line will run only if data1 comes
        // if error  then catch
        let data2 = await fs.promises.readFile("../file2.txt");
        // next line when data2 will come
        let data3 = await fs.promises.readFile("../file3.txt");
        console.log("Content "+ data1);
        console.log("Content "+ data2);
        console.log("Content "+ data3);
    }
    catch(error){
        console.log(error);
    }
})();


//


let files = ["../file1.txt" , "../file2.txt" , "../file2.txt" ,"../file3.txt"];



async function myReadFile(){
    console.log("===================")
    for(let i=0;i<files.length;i++){
        let data = await fs.promises.readFile(files[i]);
        console.log("Conent:"+data);
    }
} 

myReadFile();