const images = {
    blush: [
        "https://pa1.narvii.com/5792/32a77023b267c7996735ea2f88865e225005f191_00.gif",
        "https://i.pinimg.com/originals/b7/4a/5b/b74a5b128b5d65ea1fdb9090c0b3f295.gif",
        "https://tenor.com/view/anime-girl-blush-shocked-gif-12912497",
        "https://i.pinimg.com/originals/09/7f/46/097f46e1db35653902b10b0a322c908f.gif",
        "https://pa1.narvii.com/5792/f371f3f6b20cd1d9944c683b6d5f511855c542c7_hq.gif",
        "https://steamuserimages-a.akamaihd.net/ugc/862865288948416256/E2332AAE1F5FD8506E37F9AF68B8CCB67F96B332",
        "https://media1.tenor.com/images/2cffd00cdf0aa113c4c39b85a3a38b23/tenor.gif?itemid=10666309"
    ],

    cheer: [
        "https://media1.tenor.com/images/f42beb68f170e9da11aa5da10c1be9cd/tenor.gif?itemid=14754210",
        "https://media.tenor.com/images/3fcc1b897b5dccb2a5edda6fb0d78e59/tenor.gif",
        "https://media1.tenor.com/images/296818513b48a1639a837ea68d4eda46/tenor.gif?itemid=5543976",
        "https://i.pinimg.com/originals/f9/5e/6c/f95e6caca36e7102d359c4288ffba40d.gif",
        "https://66.media.tumblr.com/334839e4f483e880f2a79a742b383b81/tumblr_pi25tnvrPv1vcyftzo3_400.gif"
    ],

    cuddle: [
        "https://cdn.lowgif.com/full/3fe63ed50b1a35a6-image-miku-cuddling-yoshino-gif-date-a-live-wiki.gif",
        "https://media.tenor.com/images/63f37cdce7bdc233c7186c2b91e9810c/tenor.gif?itemid=16038267",
        "https://i.imgur.com/wOmoeF8.gif",
        "https://i.imgur.com/ntqYLGl.gif",
        "https://i.imgur.com/4oLIrwj.gif",
        "https://i.imgur.com/6qYOUQF.gif",
        "https://i.imgur.com/p2Jt2P5.gif"
    ],

    dance: [
        "https://media.tenor.com/images/7fa3b39ddac5925af0d81aefeeeb3ad4/tenor.gif",
        "https://media.tenor.com/images/14214b4c77e0de0976427cb43c276024/tenor.gif",
        "https://media.tenor.com/images/a9b97ac4e23e3d4cbed85e2b1b1d26b2/tenor.gif"
    ]
};

module.exports = type => {
    if (!images[type]) throw new Error("Invalid image type.");

    return images[type][Math.floor(Math.random() * images[type].length)];
};