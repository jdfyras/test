const mongoose = require('mongoose'),
    CryptoJS = require('crypto-js'),
    { env } = require('process')
const userSchema = new mongoose.Schema(
    {
        accountBalance: {
            type: Number,
            required: true,
            default: 0
        },
        firstName: {
            type: String,
            upperrcase: true,
            required: true
        },
        lastName: {
            type: String,
            upperrcase: true,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        deposit: { type: mongoose.Schema.Types.Mixed, required: false, default: [] },
        withdrawal: { type: mongoose.Schema.Types.Mixed, required: false, default: [] },
        birthday: {
            type: Date,
            required: true
        }
    },
    { collection: 'user' }
)
userSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

userSchema.set('toJSON', {
    virtuals: true
})
userSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            var hashedPassword = await CryptoJS.AES.encrypt(this.password, env.CRYPTO_SECRET)
            var hashedBbcPassword = await CryptoJS.AES.encrypt(this.passwordBBC, env.CRYPTO_SECRET)
            this.password = hashedPassword
            this.passwordBBC = hashedBbcPassword
        }
        next()
    } catch (error) {
        next(error)
    }
})
userSchema.methods.isValidPassword = function (password) {
    var bytes = CryptoJS.AES.decrypt(this.password, env.CRYPTO_SECRET)
    var oldPassword = bytes.toString(CryptoJS.enc.Utf8)
    return oldPassword === password
}

const userDB = mongoose.model('user', userSchema)
module.exports = userDB
