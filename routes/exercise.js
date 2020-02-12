const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercise => res.json(exercise))
        .catch(err => res.send(400).json('Error' + err))

});

router.route('/add').post((req, res) => {
    const userName = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const newExercise = new Exercise({
        userName,
        description,
        duration,
        date
    })
    newExercise.save()
        .then(() => res.send('Exercise_Added'))
        .catch(err => { res.status(400).json('Error:' + err) });
});

router.route('/getById/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then((exercise) => {
            console.log(exercise)
            res.json(exercise)
        })
        .catch(err => res.status(400).json("Error" + err))
})

router.route('/delete/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(exercise => res.json('Exercise Deleted'))
        .catch(err => res.status(400).json("Error" + err))
})

router.route('/update/:id').post((req, res) => {
    // let options = req.body;
    // Exercise.update({ 'userName': req.body.username }, options, { multi: true }).exec((err, result) => {
    //         if (err) {
    //             console.warn(err)
    //             res.send(err)
    //         } else if (result == undefined || result == null || result == '') {
    //             console.warn('No author found');
    //             res.send('No author found');
    //         } else {
    //             res.send(result);
    //         }
    //     })
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.userName = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = req.body.duration;
            exercise.date = req.body.date;

            exercise.save()
                .then(() => res.json('Esercise_Updated'))
                .catch((err) => res.status(400).json('Error' + err))
        })
        .catch((err) => res.status(400).json('Error' + err))
})
module.exports = router;