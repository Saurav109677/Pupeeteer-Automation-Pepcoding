const puppeteer = require("puppeteer");

let browserOpenPromise = puppeteer.launch({headless:false});
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
    console.log("logged in hackerank");
})
.catch(function(){
    console.log("error");
})