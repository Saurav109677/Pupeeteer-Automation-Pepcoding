const puppeteer = require('puppeteer')


let tab;
let globalIDX;
let globalCode;

solveHackerrankProb();

function solveHackerrankProb(){
    let browserOpenPromise = puppeteer.launch({
        headless:false,
        defaultViewport : null,
        args : ["--start-maximized"]
    });
    browserOpenPromise.then(async function(browser){
        let pages = await browser.pages();
        tab = pages[0];
        await tab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        await tab.type("#input-1","nabob71501");
        await tab.type("#input-2","123456");
        await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
        await waitAndClick("#base-card-1-link");
        await waitAndClick('a[data-attr1="warmup"]');
        await tab.waitForSelector(".js-track-click.challenge-list-item",{visible:true});
        
        let questionObjects = await tab.$$(".js-track-click.challenge-list-item");
        
        let allLinksArray = [];
        for(let i=0;i<questionObjects.length;i++){
            let link =  await tab.evaluate(function(elem){return elem.getAttribute("href")},questionObjects[i])
            allLinksArray.push(link);
        }

        let completeLinksArrays = [];
        for(let i=0;i<allLinksArray.length;i++){
            let prefix = "https://www.hackerrank.com/";
            completeLinksArrays.push(prefix+allLinksArray[i]);
        }

        for(let i=0;i<completeLinksArrays.length;i++)
            await solveOneProblem(completeLinksArrays[i]);

        console.log('all problems solved');
    })
}

async function solveOneProblem(link){
        await tab.goto(link);
        await waitAndClick('div[data-attr2="Editorial"]');
        await handleUnlock();
        await getCode();
}

async function getCode(){
        await tab.waitForSelector(".hackdown-content h3");
        let allH3Properties = await tab.$$(".hackdown-content h3")

        let onlyNames = [];
        for(let i=0;i<allH3Properties.length;i++){
            let name = await tab.evaluate((elem)=>elem.textContent,allH3Properties[i])
            onlyNames.push(name);
        }

        for(let i=0;i<onlyNames.length;i++){
            if(onlyNames[i]=="C++"){
                globalIDX = i;
                break;
            }
        }

        let allDiv = await tab.$$(".hackdown-content .highlight")
        let code=await tab.evaluate((elem)=>elem.textContent,allDiv[globalIDX])
        globalCode = code;
        //console.log(code);
        await tab.click("#tab-1-item-0");
        await pasteCode();
        await tab.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled")
        console.log("one problem solved");
}

async  function pasteCode(){
        await waitAndClick(".checkbox-input")
        await tab.type(".custom-input",globalCode);
        await tab.keyboard.down('Control');
        await tab.keyboard.press("a");
        await  tab.keyboard.press("x");
        await tab.click(".view-lines")
        await tab.keyboard.press("a");
        await tab.keyboard.press("v");
}

async function handleUnlock(){
        try{
            await waitAndClick(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");
        }
        catch(err){
            return err;
        }
}

async function waitAndClick(selector){
        await tab.waitForSelector(selector,{visible:true});
        await tab.click(selector);
}
