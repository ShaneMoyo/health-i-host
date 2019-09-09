const router = require('express').Router();
const Appointment = require('../models/appointment');
const ensureRole = require('../../lib/utils/ensure-role');

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

  .delete('/:id', ensureRole(['admin']), (req, res, next) => {
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

  .put('/me/:id', (req, res, next) => {
    const { id }= req.params;
    const { id: tokenId } = req.user;
    const { type, date, user: userId } = req.body;
    const isMe = tokenId === userId
    if (!id || !isMe ) {
      console.log('here', tokenId, userId )
      const error = !isMe ?
        { code: 401, error: 'unauthorized'} :
        { code: 404, error: `id ${id} does not exist`}
        next(err);
    }
    const update = { type, date }
    Appointment.findByIdAndUpdate({ _id: id }, update, { new: true , runValidators: true })
        .lean()
        .then(updatedAppointment => res.json(updatedAppointment));
  })
