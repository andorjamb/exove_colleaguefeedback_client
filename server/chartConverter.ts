const puppeteer = require('puppeteer')

//for fetching chart SVGs from a url and saving to file, to be inserted into PDF


const reportURL: string = ''; //login page? 
const savePath: string = '';
//set the save path

async function printPDF() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`${reportURL}`, { waitUntil: 'networkidle0' });
//protected page: can only be viewed by managers and HR
//served by own server, needs authenication values in the options?

//or viewable in React if authenticated correctly by LDAP?



    const pdf = await page.pdf({
        format: 'A4',
        path: { savePath }
    });

    await browser.close();
    return pdf
}