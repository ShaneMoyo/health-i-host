import { request } from './request';

export default {
  get(id) {
    const path = id ? `/appointments/${id}` : '/appointments';
    return request.get(path);
  },

  getMy() {
    return request.get('/appointments/me');
  },

  book(donation) {
    return request.post('/appointments', donation);
  },

  update(appointment) {
    return request.update(`/appointments/me/${appointment._id}`, appointment);
  },

  remove(id) {
    return request.delete(`/appointments/${id}`);
  }
};
