const mongoose = require('mongoose');

module.exports.dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('DB connected...');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
