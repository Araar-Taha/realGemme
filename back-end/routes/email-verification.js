const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.get('/verify/:veriftoken', async (req , res) => {
    console.log('verification fired')
    try{
        const {veriftoken} = req.params
        //searching in DB for a user that have this verification token
        const user = await User.findOne({verificationtoken : veriftoken})
        if (!user){
            console.log('invalide token')
        }
        //token verified here
        user.verified = true;
        user.verificationtoken = undefined;
        await user.save();
        console.log('user email verified');
    }
    catch (err){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})


module.exports = router ;