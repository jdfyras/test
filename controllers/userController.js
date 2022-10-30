const createError = require('http-errors')
const { userValidation, depositValidation, withdrawalValidation } = require('../models/validation.js')
const userModel = require('../models/userModel.js')

module.exports = {
    register: async (req, res, next) => {
        try {
            const result = await userValidation.validateAsync(req.body)
            console.info(result.email)
            const exist = await userModel.findOne({ email: result.email })
            console.log(exist)
            if (exist) throw createError.Conflict(`User  is already been registered`)
            const user = new userModel(req.body)
            const c = await user.save()
            return res.json({ id: c.id, balance: c.accountBalance })
        } catch (error) {
            console.log(error)
            if (error.isJoi === true) error.status = 422

            return next(error)
        }
    },
    deposit: async (req, res, next) => {
        try {
            const result = await depositValidation.validateAsync(req.body)
            const exist = await userModel.findById({ _id: result.id })
            console.log(exist)
            if (!exist) throw createError.Conflict(`User id is not valid`)
            let amount = exist.accountBalance + result.depositAmount
            let depositArr = [...exist.deposit, { deposit: result.depositAmount, dateTime: new Date() }]
            const upd = await userModel.findOneAndUpdate({ _id: result.id }, { accountBalance: amount, deposit: depositArr }, { new: true })
            return res.json({ id: upd.id, balance: upd.accountBalance })
            // return res.json(upd)
        } catch (error) {
            console.log(error)
            if (error.isJoi === true) error.status = 422

            return next(error)
        }
    },
    withdrawal: async (req, res, next) => {
        try {
            const result = await withdrawalValidation.validateAsync(req.body)
            const exist = await userModel.findById({ _id: result.id })
            console.log(exist)
            if (!exist) throw createError.NotFound(`User id is not valid`)
            let amount = exist.accountBalance - result.withdrawalAmount
            if (amount < 0) throw createError.NotAcceptable(`User cannot proceed with excessive withdrawal (user balance cannot be negative)`)
            let withdrawalArr = [...exist.withdrawal, { withdrawal: result.withdrawalAmount, dateTime: new Date() }]
            const upd = await userModel.findOneAndUpdate({ _id: result.id }, { accountBalance: amount, withdrawal: withdrawalArr }, { new: true })
            return res.json({ id: upd.id, balance: upd.accountBalance })
            // return res.json(upd)
        } catch (error) {
            console.log(error)
            if (error.isJoi === true) error.status = 422

            return next(error)
        }
    }
}
