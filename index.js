const axios = require("axios")
const cheerio = require ("cheerio")
const express = require("express")

const app = express()

const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap'


app.get("/",(req,res) => {
    const links =[]
    axios.get(url).then((response) => {
        if(response.status ===200) {
            const html = response.data
            const $ = cheerio.load(html)
            $("#mw-pages a").each((index,element) => {
                const link= $(element).attr("href")
                const link2= `https://es.wikipedia.org${link}`
                links.push(link2)
            })
            console.log(links)
        }
    })
    links.forEach(element => {
        axios.get(element).then((response)=> {
            console.log(element)
            if(response.status ===200) {
                const html = response.data
                const $ = cheerio.load(html)

                const h1= $("h1").text();
                const imgs=[]
                const texts =[]
                    
                $("img").each((index,element) => {
                    const img = $(element).attr("src")
                    imgs.push(img)
                })
                $("p").each((index,element) => {
                    const text = $(element).text()
                    texts.push(text)
                })
            const resultado = {h1, imgs, texts}
            console.log(imgs)
        }
    })
    })
})


app.listen(3000, () => {
    console.log("express está escuchando en el puerto http:localhost:3000")
})