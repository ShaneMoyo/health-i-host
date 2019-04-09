const chai = require('chai');
const mongoose = require('mongoose');
const request = require('./request');
const assert = chai.assert;

describe('Appointment API', () => {

  let token1 = '';
  let token2 = '';
  let userId1 = '';
  const testAppointment = [
    {
      type: 'massage',
      duration: 1,
      date: new Date(2018, 11, 24, 10, 33, 30, 0),
      status: 'pending'
    },
    {
      type: 'movement',
      duration: 2,
      date: new Date(2018, 11, 24, 10, 33, 30, 0),
      status: 'pending'
    },
    {
      type: 'mineral',
      duration: 3,
      date: new Date(2018, 11, 24, 10, 33, 30, 0),
      status: 'pending'
    }
  ];
  beforeEach(() => mongoose.connection.dropDatabase());
  beforeEach(() => {
    return Promise.all([
      request.post('/api/auth/')
        .send({
          email: 'test1@test.com',
          password: 'password'
        })
        .then(({ body })  => token1 = body ),
      request.post('/api/auth/')
        .send({
          email: 'test2@test.com',
          password: 'password'
        })
        .then(({ body })  => token2 = body )
    ]);
  });

  beforeEach(() => {
    return request.get('/api/auth/verify')
        .set('Authorization', token1)
        .then(({ body })  => userId1 = body)
  })

  it('Should save a resource with an id', () => {
    return request.post('/api/appointments')
      .set('Authorization', token1)
      .send(testAppointment[0])
      .then(({ body: savedResource}) => {
        assert.ok(savedResource._id);
        assert.ok(savedResource.type);
        assert.equal(savedResource.type, testAppointment[0].type);
        assert.equal(savedResource.user, userId1);
      });
  });

  it('Should get my appointments', () => {
    return Promise.all([
      request.post('/api/appointments')
        .set('Authorization', token1)
        .send(testAppointment[0])
        .then(({ body: savedAppointment }) => savedAppointment),
      request.post('/api/appointments')
        .set('Authorization', token2)
        .send(testAppointment[1])
        .then(({ body: savedAppointment }) => savedAppointment),
    ])
      .then(savedAppointments => {
        return request.get('/api/appointments/me')
          .set('Authorization', token1)
          .then(({ body: gotAppointments}) => {
            assert.deepEqual(savedAppointments[0]._id, gotAppointments[0]._id);
            assert.equal(gotAppointments.length, 1)
          });
      });
  });

  it('Should get a resource by id with token', () => {
    return request.post('/api/appointments')
      .set('Authorization', token1)
      .send(testAppointment[0])
      .then(({ body: savedResource }) => {
        return request.get(`/api/appointments/${savedResource._id}`)
          .set('Authorization', token1)
          .then(({ body: gotResource }) => {
            assert.deepEqual(gotResource._id, savedResource._id)
          })
      });
  })

  it('Should delete an resource with admin token', () => {
    return request.post('/api/appointments')
    .set('Authorization', token1)
    .send(testAppointment[0])
    .then(({ body: savedResource }) => {
      return request.delete(`/api/appointments/${savedResource._id}`)
        .set('Authorization', token1)
        .then(({ body: deleteResponse }) => {
          return request.get(`/api/appointments/${savedResource._id}`)
          .set('Authorization', token1)
          .then(({ body: gotResource }) => {
            console.log('gotResource: ', gotResource);
            assert.deepEqual(gotResource, null);
          });
        });
      });
    })

})
