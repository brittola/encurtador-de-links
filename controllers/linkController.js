const Link = require('../models/Link');

const generateShort = () => {

    const CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let short = '';

    for (i = 0; i < 9; i++) {
        short += CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
    }

    return short;

}

const redirectToURL = async (req, res) => {

    let short = req.params.short;

    let doc = await Link.findOne({ short });

    try {
        res.redirect(doc.url);
    } catch (error) {
        res.status(404).send('Não encontramos o link 10.0.0.105:3000/' + short + ' no nosso banco de dados :(');
    }

}

const createLink = async (req, res) => {

    let url = req.body.url;

    let doc = await Link.findOne({ url });

    if(doc){ //se o link já foi encurtado, envia ele

        res.send('localhost:3000/' + doc.short);
    
    }else{ //se não, encurta, salva no banco de dados e então envia

        req.body.short = generateShort();

        let link = new Link(req.body);

        doc = await link.save();

        let shortURL = 'localhost:3000/' + doc.short;

        res.send(shortURL);
    }

}

module.exports = { generateShort, redirectToURL, createLink }