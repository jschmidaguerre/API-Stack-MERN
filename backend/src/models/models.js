const mongoose = require('mongoose');
const { userSchema } = require('./usuario.model').default;

const usuario = mongoose.model('usuario', userSchema);


module.exports = {
    usuario
};