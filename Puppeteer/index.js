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
    let waitPromise = tab.waitForSelector("#base-card-1-link",{visible:true});
    return waitPromise;
})
.then(function(){   
    let ipkitClickPromise = tab.click("#base-card-1-link");
    return ipkitClickPromise;
})
.then(function(){
    // let it wait to write the DOM
    // two diffeent thing.. to get data and to load it in DOM
    let waitPromise = tab.waitForSelector("#base-card-1-link",{visible:true});
    return waitPromise;
})
.then(function(){
    let warmupClickPromise = tab.click("#base-card-1-link");
    return warmupClickPromise;
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
    console.log(allLinks);
})
.catch(function(error){
    console.log(error);
})