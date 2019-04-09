const router = require('express').Router();
const Appointment = require('../models/appointment');

module.exports = router

  .post('/',(req, res, next) => {
    req.body.user = req.user.id
    new Appointment(req.body).save()
      .then(appointment => res.json(appointment))
      .catch(next);
  })

  .get('/me', (req, res, next) => {
    Appointment.find({ user: req.user.id})
      .populate({ path: 'user', select: 'name _id user'})
      .lean()
      .then(appointments =>{
        console.log('sending appointments ', appointments)
        res.json(appointments)
      } )
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Appointment.findOne({'_id' : req.params.id, user: req.user.id})
      .populate({ path: 'user', select: 'name user _id' })
      .lean()
      .then(appointments => res.json(appointments))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    return Appointment.findOneAndRemove({'_id' : req.params.id, user: req.user.id})
        .then(result => {
          console.log('removing!', result);
            const isRemoved = result ? true : false;
            return isRemoved;
        })
        .then(isRemoved => {
          console.log('isRemoved: ', isRemoved)
          res.json({ removed: isRemoved })
        })
        .catch(next);
  })
