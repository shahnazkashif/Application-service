const mongoose = require('mongoose');
console.log('testing connection')
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            // useUnifiedTopology: true,
            // useNewUrlParser: true
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB



