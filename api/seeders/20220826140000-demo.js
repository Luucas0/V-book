"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    //Add seed commands here.
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "franca",
          lastname: "visokolskis",
          email: "franca@gmail.com",
          password: "12345678",
          userName: "franca",
          role: "admin",
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
          loginWithOauth: false,
        },
        {
          name: "santi",
          lastname: "Posse",
          email: "santi@gmail.com",
          password: "12345678",
          userName: "santi",
          role: "admin",
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
          loginWithOauth: false,
        },
        {
          name: "Marcos",
          lastname: "Rueda",
          email: "marcos@gmail.com",
          password: "12345678",
          userName: "marquitos",
          role: "user",
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
          loginWithOauth: false,
        },
        {
          name: "Lucas",
          lastname: "De Lellis",
          email: "lucas@gmail.com",
          password: "12345678",
          userName: "luquitas",
          role: "user",
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
          loginWithOauth: false,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "genres",
      [
        {
          genreName: "fantasy",
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
        },
        {
          genreName: "terror",
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "books",
      [
        {
          title: "Harry Potter and the Philosopher's Stone",
          description: "the boy who lived",
          author: "J.K Rowling",
          price: 100,
          posterURL:
            "https://n2.sdlcdn.com/imgs/a/4/6/Harry-Potter-And-The-Philosophers-SDL237954387-1-5e0d6.jpg",
          releaseDate: new Date(),
          publisher: "somePublisher",
          rating: 5,
          idGenre: 1,
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
        },
        {
          title: "Harry Potter and the Chamber of Secrets",
          description: "the boy who lived",
          author: "J.K Rowling",
          price: 110,
          posterURL:
            "https://images.cdn3.buscalibre.com/fit-in/360x360/3f/69/3f6906a1d16eacdabe804bae162b0398.jpg",
          releaseDate: new Date(),
          publisher: "somePublisher",
          rating: 4,
          idGenre: 1,
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
        },
        {
          title: "Harry Potter and the Prisoner of Azkaban",
          description: "the boy who lived",
          author: "J.K Rowling",
          price: 120,
          posterURL:
            "https://images.cdn3.buscalibre.com/fit-in/360x360/5a/7c/5a7c032f211089350a994f2a29f14362.jpg",
          releaseDate: new Date(),
          publisher: "somePublisher",
          rating: 5,
          idGenre: 1,
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
        },
        {
          title: "Harry Potter and the Goblet of Fire",
          description: "the boy who lived",
          author: "J.K Rowling",
          price: 130,
          posterURL:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4ejsIA5vEcfZJkbv3gn2nNhlXHHdD7Txl8Q&usqp=CAU",
          releaseDate: new Date(),
          publisher: "somePublisher",
          rating: 3,
          idGenre: 1,
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
        },

        {
          title: "Lord of the rings: The fellowship of the ring",
          description: "Live the adventure",
          author: "J.R.R Tolkien",
          price: 174,
          posterURL:
            "https://images-na.ssl-images-amazon.com/images/I/41gHG-a2OEL._SX331_BO1,204,203,200_.jpg",
          releaseDate: new Date(),
          publisher: "otherPublisher",
          rating: 2,
          idGenre: 1,
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
        },
        {
          title: "Lord of the rings: The two towers",
          description: "Live the adventure",
          author: "J.R.R Tolkien",
          price: 154,
          posterURL:
            "https://images-na.ssl-images-amazon.com/images/I/A1y0jd28riL.jpg",
          releaseDate: new Date(),
          publisher: "otherPublisher",
          rating: 5,
          idGenre: 1,
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
        },
        {
          title: "Lord of the rings: The return of the king",
          description: "Live the adventure",
          author: "J.R.R Tolkien",
          price: 126,
          posterURL:
            "https://images-na.ssl-images-amazon.com/images/I/91tZn9CjAwL.jpg",
          releaseDate: new Date(),
          publisher: "otherPublisher",
          rating: 4,
          idGenre: 1,
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
        },
        {
          title: "It",
          description: "the evil clown",
          author: "Stephen King",
          price: 50,
          posterURL:
            "https://images-na.ssl-images-amazon.com/images/I/71tFhdcC0XL.jpg",
          releaseDate: new Date(),
          publisher: "publisherUnkown",
          rating: 3,
          idGenre: 2,
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
        },
        {
          title: "Carrie",
          description: "carrie description",
          author: "Stephen King",
          price: 51,
          posterURL:
            "https://images.cdn1.buscalibre.com/fit-in/360x360/25/3b/253b35902bbebc059355fa26c19d9dc4.jpg",
          releaseDate: new Date(),
          publisher: "publisherUnkown",
          rating: 4,
          idGenre: 2,
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
        },
        {
          title: "The Shining",
          description: "the shining description",
          author: "Stephen King",
          price: 63,
          posterURL:
            "https://http2.mlstatic.com/D_NQ_NP_982397-MLA48910816051_012022-O.jpg",
          releaseDate: new Date(),
          publisher: "publisherUnkown",
          rating: 2,
          idGenre: 2,
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
        },
        {
          title: "Misery",
          description: "Misery description",
          author: "Stephen King",
          price: 56,
          posterURL:
            "https://images-na.ssl-images-amazon.com/images/I/91pzqqwsg5L.jpg",
          releaseDate: new Date(),
          publisher: "publisherUnkown",
          rating: 2,
          idGenre: 2,
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
        },
        {
          title: "The Mist",
          description: "The Mist description",
          author: "Stephen King",
          price: 42,
          posterURL:
            "https://images-na.ssl-images-amazon.com/images/I/810dEwTg54L.jpg",
          releaseDate: new Date(),
          publisher: "publisherUnkown",
          rating: 1,
          idGenre: 2,
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
        },
        {
          title: "The Stand",
          description: "The Stand description",
          author: "Stephen King",
          price: 60,
          posterURL:
            "https://images-na.ssl-images-amazon.com/images/I/81c8No6mSPL.jpg",
          releaseDate: new Date(),
          publisher: "publisherUnkown",
          rating: 3,
          idGenre: 2,
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
        },
        {
          title: "The Green Mile",
          description: "The Green Mile description",
          author: "Stephen King",
          price: 55,
          posterURL:
            "https://http2.mlstatic.com/D_NQ_NP_982754-MLA48337110465_112021-O.jpg",
          releaseDate: new Date(),
          publisher: "publisherUnkown",
          rating: 5,
          idGenre: 2,
          updatedAt: "2022-08-23T22:40:23.479Z",
          createdAt: "2022-08-23T22:40:23.479Z",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
