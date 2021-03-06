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

  .delete('/me/:id', (req, res, next) => {
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

  .delete('/me/:id', (req, res, next) => {
    const { id }= req.params;
    const { id: tokenId } = req.user;
    let { type, date, note, user: userId, status } = req.body;
    console.log('here in the thing', userId)
    userId = userId._id ? userId._id : userId;
    const isMe = tokenId === userId
    if (!id || !isMe ) {
      console.log('here', tokenId, 'userID: ', userId._id )
      const error = !isMe ?
        { code: 401, error: 'unauthorized'} :
        { code: 404, error: `id ${id} does not exist`}
        console.log('here', error )
        next(err);
    }
    const update = { type, date, note, status };
    if (status !== 'cancelled') {
        delete update.status;
    }
    Appointment.findByIdAndUpdate({ _id: id }, update, { new: true , runValidators: true })
        .lean()
        .then(updatedAppointment => res.json(updatedAppointment));
  })

  .put('/me/:id', (req, res, next) => {
    const { id }= req.params;
    const { id: tokenId } = req.user;
    let { type, date, note, user: userId, status } = req.body;
    userId = userId._id ? userId._id : userId;
    const isMe = tokenId === userId
    if (!id || !isMe ) {
      console.log('here', tokenId, 'userID: ', userId._id )
      const error = !isMe ?
        { code: 401, error: 'unauthorized'} :
        { code: 404, error: `id ${id} does not exist`}
        console.log('here', error )
        next(err);
    }
    const update = { type, date, note, status };
    if (status !== 'cancelled') {
        delete update.status;
    }
    Appointment.findByIdAndUpdate({ _id: id }, update, { new: true , runValidators: true })
        .lean()
        .then(updatedAppointment => res.json(updatedAppointment));
  })
