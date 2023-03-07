const axios = require('axios');
const HTMLparser = require('node-html-parser');
const { mdToPdf } = require('md-to-pdf');
const ebookConverter = require('node-ebook-converter');


// TODO
/*
    ( proxy if I'm still locked out )

    --add headers for chapters and proper spacing between text body and header --

    text to pdf by arc/volume (1 per pdf)

    have next chapter go to next most page and start at top of page with chapter name & Number 
    (if not possible just spkip 5-6 lines and add chap title and number (Ex. Ch 1, Mom fucks dad)) < centered :) set random color (not white or black)


    dark mode pdf using css
*/


const url = "https://re-library.com/original/aurora-god/";
let queue = [];

async function getPageContent(page_link) {
    let content = "";
    const resp = await axios.get(page_link);
    const root = HTMLparser.parse(resp.data);
    const container = root.querySelector('[class="entry-content"]');
    const paragraphs = container.querySelectorAll('p');

    paragraphs.forEach(p => {
        content += p.innerText+`\n`;
    })

    return content;
}


// Main program
(async () => {
//    // Get main HTML data
//    const resp = await axios.get(url);
//    const root = HTMLparser.parse(resp.data);
//    const volume_containers = root.querySelectorAll('[class*="su-spoiler-icon-plus"]');
//
//    volume_containers.forEach(vc => {
//        const volume_title = vc.firstChild.innerText;
//        const volume_content = vc.lastChild;
//
//        //console.log("\n----------"+volume_title+"----------\n")
//        const link_containers = volume_content.querySelectorAll('[class*="page_item"]');
//        link_containers.forEach(async lc => {
//            const title = lc.innerText
//            const link = lc.childNodes[0]._attrs.href;
//            const content = await getPageContent(link);
//            queue.push({
//                "Volume": volume_title,
//                "Title": title,
//                "URL": link,
//                "Content": content
//            });
//        });
//    })
//
//
//    // Rate limit get page content
//    const interval = setInterval(() => {
//        const current = queue.shift();
//        console.log(current);
//
//
//        if (queue.length == 0) 
//            clearInterval(interval);
//    }, 1000)

    // Write to pdf
    await mdToPdf({ content: "# yeet"}, { dest: 'temp.pdf'});

    // Convert to epub
    ebookConverter.convert({
        input: "temp.pdf",
        output: "output.epub",
        authors: "fuck off T_T"
    });
})();







