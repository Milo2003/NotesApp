const express = require('express');
const router = express.Router();



router.get('/users/signIn', (req, res) => {
    res.send('Sing in ');
});

router.get('/users/signup', (req, res)=>{
   res.render('users/signup');
});

router.post('/users/signup', (req, res)=>{
    const { name, email, password, confirm_password} = req.body;
    const errors = []
    if(password !== confirm_password){
        errors.push({text: 'Password do not match'});
    }
    if (password.length < 8){
        errors.push({text: 'Password must be at least 8 characters'})
    }
    if (errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, confirm_password});
    }else {
        res.send('Ok')
    }
})



module.exports = router;