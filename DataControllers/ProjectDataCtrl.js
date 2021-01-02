const { MongoClient, ObjectID } = require('mongodb');

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
      console.error(err);
    }

    console.log('Created Project Data Controller');
  }

  getByID(id) {
    this.collection
      .findOne({
        _id: ObjectID(id),
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  async findByUserID(userID) {
    console.log(userID);

    const cursor = this.collection.find({
      owner: userID,
    });

    await cursor.forEach(console.dir);
  }
};
