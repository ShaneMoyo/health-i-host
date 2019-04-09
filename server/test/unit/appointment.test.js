const assert = require('chai').assert;
const Appointment = require('../../lib/models/appointment');

describe('Appointment model', () => {

  it('throws error for missing fields', () => {
    const resource = new Appointment({});
    const { errors } = resource.validateSync();
    assert.equal(errors.type.kind, 'required');
    assert.equal(errors.user.kind, 'required');
  });

  it('throws errors for incorrect data types', () => {
    const resource = new Appointment({
      type: {},
      user: {}
    });
    const { errors } = resource.validateSync();
    assert.equal(errors.type.kind, 'String');
    assert.equal(errors.user.kind, 'ObjectID');
  });
});
