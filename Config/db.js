const mongoose = require('mongoose');

console.log("DB_USER: ", process.env.DB_User)

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_User}:${process.env.DB_Password}@ac-62j8ihz-shard-00-00.7lbrva6.mongodb.net:27017,ac-62j8ihz-shard-00-01.7lbrva6.mongodb.net:27017,ac-62j8ihz-shard-00-02.7lbrva6.mongodb.net:27017/?ssl=true&replicaSet=atlas-g1t94d-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error("MongoDB Connection Error ", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;