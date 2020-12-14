const images = {
    blowjob: [
        "https://cdn.donmai.us/original/0d/d4/0dd49151ef86bc3168d05dd9eaf5b48b.gif",
        "https://www.juicygif.com/albums/userpics/2014y/10/31/22/1/4983-amazing-blowjob-anime-porn-animated-photo.gif",
        "https://thumb-p7.xhcdn.com/a/eHhG17lixd4JV_uMAD1K-g/000/100/817/537_1000.gif"
    ],

    spank: [
        "https://media.tenor.com/images/d75aead0dbf59fff4b996ebfecde0560/tenor.gif",
        "https://i.imgur.com/6DF495Z.gif",
        "https://media.tenor.com/images/5f05ce0dbd223f72dce8d46b4db78c30/tenor.gif"
    ],

    fuck: [
        "https://media.tenor.com/images/21039e758a5ae6b6e032f534a1946e86/tenor.gif",
        "https://media.tenor.com/images/73cd3c50ae98999045d80e6d9b57aab4/tenor.gif"
    ]
};

module.exports = type => {
    if (!images[type]) throw new Error("Invalid image type.");

    return images[type][Math.floor(Math.random() * images[type].length)];
};