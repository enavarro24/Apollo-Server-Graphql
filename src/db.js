const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const userModel  = require('./services/user/user.model');

// Connection  with dB

try {
   console.log('connection success');

} catch (error) {
   
    console.error('Unable to connect to the database:', error);
}


module.exports = {
    userModel
}