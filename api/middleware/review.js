const Reviews = require('../models/Reviews')

async function validateReview(req, res, next){
    const rev = await Reviews.count({
        where:{
            bookId: req.params.id,
            userId: req.user.id,
        },
    })
    if(rev === 0){next()}
    else{res.send(401)}
}

module.exports = { validateReview };