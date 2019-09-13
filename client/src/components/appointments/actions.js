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
    dispatch({ type: actions.LOADING });
    dispatch({
      type: actions.LOAD_APPOINTMENTS,
      payload: appointmentApi.getMy()
    })
    .then(() => dispatch({ type: actions.DONE_LOADING}))
    .catch(error => dispatch({ type: actions.ERROR , payload: error }));
  };
}

export function loadAllAppointments(){
  return dispatch => {
    dispatch({ type: actions.LOADING });
    dispatch({
      type: actions.LOAD_APPOINTMENTS,
      payload: appointmentApi.get()
    })
    .then(() => dispatch({ type: actions.DONE_LOADING}))
    .catch(error => dispatch({ type: actions.ERROR , payload: error }));
  };
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
  console.log('dispatching delete')
  // return dispatch => {
  //   dispatch({
  //     type: actions.DELETE_APPOINTMENT,
  //     payload: appointmentApi.remove(id).then(() => id)
  //   });
  // };
  return dispatch => {

    dispatch({
      type: actions.DELETE_APPOINTMENT,
      payload: appointmentApi.remove(id).then(() => id)
    })
    
  };

}
