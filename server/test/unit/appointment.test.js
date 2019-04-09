const assert = require('chai').assert;
const Appointment = require('../../lib/models/appointment');

describe('Appointment model', () => {

  it('throws error for missing fields', () => {
    const resource = new Appointment({});
    const { errors } = resource.validateSync();
    assert.equal(errors.type.kind, 'required');
    assert.equal(errors.user.kind, 'required');
    assert.equal(errors.duration.kind, 'required');
    assert.equal(errors.date.kind, 'required');
  });

  it('throws errors for incorrect data types', () => {
    const resource = new Appointment({
      type: {},
      user: {},
      duration: {},
      date: {},
    });
    const { errors } = resource.validateSync();
    assert.equal(errors.type.kind, 'String');
    assert.equal(errors.user.kind, 'ObjectID');
    assert.equal(errors.duration.kind, 'Number');
    assert.equal(errors.date.kind, 'Date');
  });
});
