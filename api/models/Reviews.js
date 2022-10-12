const { AlertDialogOverlay } = require("@chakra-ui/react");
const Sequelize = require("sequelize");
const db = require("../db");
const Book = require("./Book");

class Reviews extends Sequelize.Model {}

Reviews.init(
    {
      valoration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reviewComment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    { sequelize: db, modelName: "reviews" }
  );
  Reviews.afterBulkUpdate(async (reviews) => {
    let cont = 0;
    console.log('reviews', reviews)
    const rev = await Reviews.findAll({
      where: {
        bookId: reviews.where.bookId,
      },
    });
    rev.forEach(review => {
      cont += review.valoration
    });
    console.log('reviews2', rev)
    console.log('reviews3', cont)

    await Book.update(
      { rating: cont / rev.length },
      {
      where: {
        id: reviews.where.bookId,
      },
    })
});


  Reviews.afterCreate(async (reviews) => {
        let cont = 0;
        const rev = await Reviews.findAll({
          where: {
            bookId: reviews.bookId,
          },
        });
        rev.forEach(review => {
          cont += review.valoration
        });
        await Book.update(
          { rating: cont / rev.length },
          {
          where: {
            id: reviews.bookId,
          },
        })
        //console.log(await Book.findOne({where: {id: reviews.bookId}}));
    });

    Reviews.afterBulkDestroy(async (reviews) => {
      let cont = 0;
      console.log('reviews', reviews)
      const rev = await Reviews.findAll({
        where: {
          bookId: reviews.where.bookId,
        },
      });
      console.log('reviews2', rev)

      rev.forEach(review => {
        cont += review.valoration
      });
      console.log('reviews3', cont)

      await Book.update(
        { rating: cont / rev.length },
        {
        where: {
          id: reviews.where.bookId,
        },
      })
  });


  
 
  module.exports = Reviews;