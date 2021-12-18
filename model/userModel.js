
const mongoose =require('mongoose');
const bcrypt   =require('bcryptjs');
const UserCollection = 'users';
const userSchema = new mongoose.Schema({
    firstName: { type: String, trim: true, default:null},
    phoneNumber: { type: String, trim: true, default:null},
    lastName: { type: String, trim : true, default:null},
    email: {
        type: String,
        default: null
    },
    userToken: {
        type: String,
        default: null
    },
    password: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
},
    {
        collection: UserCollection
    });
userSchema.pre('save', async function (cb) {
    try {
        var user = this;
        user.password = bcrypt.hashSync(this.password, 10);
        cb();
    } catch (error) {
        cb(error);
    }
});
module.exports = { user:  mongoose.model(UserCollection, userSchema)} 