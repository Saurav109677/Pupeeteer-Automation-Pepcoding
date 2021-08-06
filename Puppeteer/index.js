const puppeteer = require("puppeteer");

let browserOpenPromise = puppeteer.launch({
    headless:false,
    defaultViewport : null,
    args : ["--start-maximized"]
});
let tab;
let globalIDX;
let globalCode;
browserOpenPromise.then(function(browser){
    let pagesPromise = browser.pages();
    return pagesPromise;
})
.then(function(pages){
    let page = pages[0];
    tab = page;
    let pageOpenPromise = page.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    return pageOpenPromise;
})
.then(function(){
    let idTypedPromise = tab.type("#input-1","nabob71501");
    return idTypedPromise;
})
.then(function(){
    let pwdTypedPromise =  tab.type("#input-2","123456");
    return pwdTypedPromise;
})
.then(function(){
    let loginClickPromise = tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return loginClickPromise;
})
.then(function(){
    // let it wait to write the DOM
    // two diffeent thing.. to get data and to load it in DOM
    //Interview Preparation Kit
    let waitAndClickPromise = waitAndClick("#base-card-1-link");
    return waitAndClickPromise
})
.then(function(){
    // let it wait to write the DOM
    // two diffeent thing.. to get data and to load it in DOM
    // let waitPromise = tab.waitForSelector("#base-card-1-link",{visible:true});
    // return waitPromise;
    //WarmUpChallenge
    console.log("warmup challenge");
    let waitAndClickPromise = waitAndClick('a[data-attr1="warmup"]');
    return waitAndClickPromise;
})
.then(function(){
    // let it wait to write the DOM
    // two diffeent thing.. to get data and to load it in DOM
    let waitPromise = tab.waitForSelector(".js-track-click.challenge-list-item",{visible:true});
    return waitPromise;
})
.then(function(){
    let allQuestionsPromise = tab.$$(".js-track-click.challenge-list-item");
    return allQuestionsPromise;
})
.then(function(allQuestions){
   
    let allLinksPromise = [];
    for(let i=0;i<allQuestions.length;i++){
        let linkPendingPromise = tab.evaluate(function(elem){return elem.getAttribute("href");}, allQuestions[i]);
        allLinksPromise.push(linkPendingPromise);
    }

    let allQuestionPromise = Promise.all(allLinksPromise);
    return allQuestionPromise;
})
.then(function(allLinks){
    // console.log(allLinks);
    let completeLinks=[];
    for(let i=0;i<allLinks.length;i++){
         let prefix = "https://www.hackerrank.com/";
         completeLinks.push(prefix+allLinks[i]);
    }

    // for multiple questions
    // dont know why ont working
//    let oneQuestionSovledPromise = solveOneProblem(completeLinks[0])
//    for(let i=1;i<completeLinks.length;i++){
//        oneQuestionSovledPromise =  oneQuestionSovledPromise.then(function(){
//              nextQuestionSovledPromise = solveOneProblem(completeLinks[i])
//              return nextQuestionSovledPromise;
//         })
//    }
    let oneQuestionSolvePromise = solveOneProblem(completeLinks[0]);
    return oneQuestionSolvePromise;
})
.then(function(){
    console.log("from main","solved all questions");
})
.catch(function(error){
    console.log(error); 
})


function solveOneProblem(link){
    return new Promise(function(resolve,reject){
        let openQuestionPromise = tab.goto(link);
        openQuestionPromise.then(function(){
            let waitPromise = waitAndClick('div[data-attr2="Editorial"]');
            return waitPromise;
        })
        .then(function(){
            let unlockPromise = isUnlockButton();
            return unlockPromise;
        })
        .then(function(msg){
            console.log(msg);
            let codePromise = getCode();
            return codePromise;
        })
        .then(function(){
            console.log("code cae");
        })
        .catch(function(error){
            reject(error)
        })
    }) 
}

function getCode(){
    return new Promise(function(resolve,reject){
            // will have to wait again 
        let waitPromise = tab.waitForSelector(".hackdown-content h3");
        waitPromise.then(function(){
            let allTextsArrayPromise = tab.$$(".hackdown-content h3")
            return allTextsArrayPromise;
        })
        .then(function(allTextArray){
            let onlyTextArray = [];
            for(let i=0;i<allTextArray.length;i++){
                let namePromise = tab.evaluate(function(elem){
                    return elem.textContent;
                },allTextArray[i])
                onlyTextArray.push(namePromise);
            }

            let promiseAllNames = Promise.all(onlyTextArray);
            return promiseAllNames;
        })
        .then(function(namesArray){
            let idx;
            for(let i=0;i<namesArray.length;i++){
                if(namesArray[i]=="C++"){
                    idx = i;
                    break;
                }
            }
            globalIDX = idx;
            let allDivPromise = tab.$$(".hackdown-content .highlight")
            return  allDivPromise;
        })
        .then(function(allDiv){
            
            let codePromise = tab.evaluate(function(elem){
                return elem.textContent;
            },allDiv[globalIDX])
            return codePromise;
        })
        .then(function(code){
            globalCode = code;
            let clickProblemsPromise = tab.click("#tab-1-item-0");
            return clickProblemsPromise;
        })
        .then(function(){
            let pastePromise = pasteCode();
            return pastePromise;
        })
        .then(function(){
           let submitPromise =  tab.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled")
            return submitPromise;
        })
        .then(function(){
            console.log("success");
        })
        .catch(function(err){
            console.log(err);
        })
    })
        
}

function pasteCode(){
    return new Promise(function(resolve,reject){
        let checkBoxPromise =  waitAndClick(".checkbox-input")
         checkBoxPromise.then(function(){
            let writeCodePromise = tab.type(".custom-input",globalCode);
            return writeCodePromise;
         })
         .then(function(){
             let clickCtrlPromise = tab.keyboard.down('Control');
             return clickCtrlPromise;
         })
         .then(function(){
             let aClickPromise = tab.keyboard.press("a");
             return aClickPromise;
         })
         .then(function(){
             let xClickPromise = tab.keyboard.press("x");
             return xClickPromise;
         })
         .then(function(){
             let tabClickPromise =  tab.click(".view-lines")
             return tabClickPromise;
         })
         .then(function(){
            let aClickPromise = tab.keyboard.press("a");
            return aClickPromise;
        })
        .then(function(){
            let vClickPromise = tab.keyboard.press("v");
            return vClickPromise;
        })
         .then(function(){
            resolve();
         })
         .catch(function(){
            reject();
         })
    })
}

function isUnlockButton(){
        console.log("in unlock");
        return new Promise(function(resolve,reject){
            let unlockButtonPromise = waitAndClick(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");
            unlockButtonPromise.then(function(){
                resolve("unlock button clicked");
            })
            unlockButtonPromise.catch(function(){
                resolve("timeout and another page");
            })
        })
}

function waitAndClick(selector){    
    return new Promise(function(resolve,reject){
        let waitPromise = tab.waitForSelector(selector,{visible:true});
        waitPromise.then(function(){
            let clickPromise = tab.click(selector);
             return clickPromise;
        })
        .then(function(){
            resolve()
        })
        .catch(function(err){
            reject(err);
        })
       
    })
    
}