const { Op } = require("sequelize");
const Reviews = require("../models/Reviews");

class reviewsController{
    
    static getAllReviews = async (req, res) => {
        const review = await Reviews.findAll();
        res.send(review)
      };

    static addReview = async (req, res) => {
    const { valoration, reviewComment } = req.body
    const created =  await Reviews.create({
      valoration,
      reviewComment,
      userId: req.user.id,
      bookId: req.params.id,
      userName: req.user.userName
    });
    res.send(created)
    }
    static getReviewByUserId = async (req,res) => {
      const rev = await Reviews.findAll({
        where: {
            userId: req.params.id,
        }
      });
      res.send(rev)
    }
    static getReviewByBookId = async (req,res) => {
      const rev = await Reviews.findAll({
        where: {
            bookId: req.params.id,
        },
      });
      res.send(rev)
    }
    static modifyReview = async (req,res) => {
      const { valoration, reviewComment } = req.body
      const updated = await Reviews.update({valoration: valoration, reviewComment: reviewComment},
        {where: {
            bookId: Number(req.params.id),
            userId: req.user.id,

        },
      });
      res.send(updated)
    }
    static removeReview = async (req,res) => {
      const revDel = await Reviews.destroy({
        where: {
            bookId: Number(req.params.id), userId: req.user.id,
        },
      });
      res.send("deleted" + revDel);
    }
}

module.exports = reviewsController