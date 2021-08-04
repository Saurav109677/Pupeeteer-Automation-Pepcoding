

let fs= require("fs")

function myPromise(path){
    return new Promise(function(resolve,reject){
        fs.readFile(path,"utf8", function(error,data){
            if(error)
                reject("I am failed cb");
            else    
                resolve(data)
        })
    });
}


// let fileReadPromise = fs.promises.readFile("./file1.txt","utf8");
let fileReadPromise = myPromise("./file1.txt");

fileReadPromise.then(function(data){
    console.log(data);
});

fileReadPromise.catch( function(){
    console.log("catch");
    console.log(error);
})