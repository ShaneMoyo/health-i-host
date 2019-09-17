import * as actions from '../../utils/constants';
import appointmentApi from '../../services/appointmentApi';

export function bookAppointment(appointment){
  return dispatch => {
    dispatch({ type: actions.LOADING })
    return appointmentApi.book(appointment)
      .then( bookedAppointment => dispatch({type: actions.BOOKED_APPOINTMENT, payload: bookedAppointment}))
      .then(() => dispatch({ type: actions.DONE_LOADING}))
      .catch(error => dispatch({ type: actions.ERROR , payload: error }));
  }
}

export function loadMyAppointments(){
  return dispatch => {
    dispatch({ type: actions.LOADING })
    return appointmentApi.getMy()
      .then( appointments => dispatch({type: actions.LOAD_APPOINTMENTS, payload: appointments}))
      .then(() => dispatch({ type: actions.DONE_LOADING}))
      .catch(error => dispatch({ type: actions.ERROR , payload: error }));
  }
}

export function updateAppointment(update) {
  return dispatch => {
    dispatch({ type: actions.LOADING })
    return appointmentApi.update(update)
      .then( updatedAppointment => dispatch({type: actions.APPOINTMENT_UPDATE, payload: updatedAppointment}))
      .then(() => dispatch({ type: actions.DONE_LOADING}))
      .catch(error => dispatch({ type: actions.ERROR , payload: error }));
  }
}

export function deleteAppointment(id) {
  return dispatch => {
    dispatch({ type: actions.LOADING })
    return appointmentApi.remove(id).then(() => id)
      .then( id => dispatch({type: actions.DELETE_APPOINTMENT, payload: id}))
      .then(() => dispatch({ type: actions.DONE_LOADING}))
      .catch(error => dispatch({ type: actions.ERROR , payload: error }));
  }
}
