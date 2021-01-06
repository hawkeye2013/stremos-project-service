const { response } = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const { Error500 } = require('../error/Errors');

module.exports = class ProjectDataController {
  constructor() {
    try {
      new MongoClient(
        `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`,
        {
          poolSize: 10,
          useUnifiedTopology: true,
          useUnifiedTopology: true,
        }
      ).connect((err, client) => {
        if (err) throw err;

        this.collection = client
          .db(process.env.MONGO_DB)
          .collection(process.env.MONGO_COLLECTION);
      });
    } catch (err) {
      console.log(err);
    }
  }

  getByID(id) {
    return new Promise((resolve, reject) => {
      this.collection
        .findOne({
          _id: ObjectID(id),
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(new Error500(err)));
    });
  }

  findByUserID(userID) {
    return new Promise((resolve, reject) => {
      this.collection
        .find({
          owner: userID,
        })
        .toArray((err, data) => {
          if (err) {
            reject(new Error500(err));
          } else {
            resolve(data);
          }
        });
    });
  }
};
