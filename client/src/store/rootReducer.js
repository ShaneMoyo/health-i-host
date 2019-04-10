import { combineReducers } from 'redux';
import auth from '../components/auth/reducer';
import appointments from '../components/appointments/reducer';
import { error, loading } from '../services/reducer';

export default combineReducers({
  auth,
  appointments,
  loading,
  error
});
