const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNEC, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Db Connect')
    }
    catch (error) {
        console.log('Error al iniciar la base de datos' + error);
        throw new Error('Error al iniciar la base de datos')
    }

}

module.exports = {
    dbConnection
}