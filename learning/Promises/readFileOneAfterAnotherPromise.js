const fs = require('fs')

let files= ["../file1.txt","../file2.txt","../file3.txt"]

// callback

// for(let i=0;i<files.length;i++){
//     fs.readFile(files[i],"utf8",function(error,data){
//         console.log(data);
//     }) // random
// }


// promise


let f1kaPromise = fs.promises.readFile("../file1.txt");


for(let i=1;i<files.length;i++){
    f1KaPromise = f1kaPromise.then(function(data){
        console.log("Content"+ data)
        // console.log(files[i]);
        let thenKaPromise = fs.promises.readFile(files[i]);
        return thenKaPromise;
    })
}

f1kaPromise.then(function(data){
    console.log("Content"+data);
})