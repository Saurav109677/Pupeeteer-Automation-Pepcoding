const puppeteer = require("puppeteer");

let browserOpenPromise = puppeteer.launch({
    headless:false,
    defaultViewport : null,
    args : ["--start-maximized"]
});
let tab;
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
    let waitAndClickPromise = waitAndClick("#base-card-1-link");
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
    return Promise.all(completeLinks);
})
.then(function(completeLinks){
    // console.log(completeLinks);
    let link = completeLinks[0];
    return solveOneProblem(link);
})
// .then(function(){
//     console.log("in i want to unlock");
//     let waitPromise = waitAndClick(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");
//     return waitPromise;
// })
.then(function(){

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
            let waitPromise = waitAndClick(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");
           return waitPromise;
        })
        .catch(function(){

        })
    })
    
    
}

function waitAndClick(selector){
    let waitPromise = tab.waitForSelector(selector,{visible:true});
    waitPromise.then(function(){
        let clickPromise = tab.click(selector);
         return clickPromise;
    })
}