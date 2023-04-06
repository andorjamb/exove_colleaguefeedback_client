const puppeteer = require('puppeteer')

//for fetching chart SVGs from a url and saving to file, to be inserted into PDF


const reportURL: string = ''; //login page? 
const savePath: string = '';
//set the save path

async function printPDF() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`${reportURL}`, { waitUntil: 'networkidle0' });
//protected page:



    const pdf = await page.pdf({
        format: 'A4',
        path: { savePath }
    });

    await browser.close();
    return pdf
}