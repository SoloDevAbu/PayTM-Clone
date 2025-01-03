const { default: mongoose } = require("mongoose");
const { Account } = require("../db/db");

const getbalance = async (req, res) => {
    const { userId } = req.headers;

    try {
        const account = await Account.findOne({userId});

        const balance = account.balance;

        res.status(200).json({
            balance: balance
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const transferBalance = async (req, res) => {
    const session = mongoose.startSession();

    const { ammount, to } = req.body;
    const { userId } = req.headers; 

    try {
        (await session).startTransaction();
        const account = await Account.findOne({userId}).session(session);

        if(!account || account.balance < ammount) {
            (await session).abortTransaction();
            res.status(400).json({
                message: 'Insufficient balance'
            })
        }

        const toAccount = await Account.findOne({userId: to}).session(session);

        if(!toAccount) {
            (await session).abortTransaction();
            res.status(400).json({
                message: 'Account not found'
            })
        }

        await Account.updateOne({userId}, {
            $inc: {balance: -ammount}
        }).session(session);

        await Account.updateOne({to}, {
            $inc: {balance: ammount}
        }).session(session);

        (await session).commitTransaction();

        res.status(200).json({
            message: 'Transfer successful'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    getbalance,
    transferBalance,
}