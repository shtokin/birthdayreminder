import { FETCH_BIRTHDAYS, CREATE_BIRTHDAY, FETCH_BIRTHDAY, DELETE_BIRTHDAY, UPDATE_BIRTHDAY } from "../actions/types";
import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_BIRTHDAYS:
      return { ...state, ...action.payload};
    case FETCH_BIRTHDAY:
    case CREATE_BIRTHDAY:
    case UPDATE_BIRTHDAY:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_BIRTHDAY:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}

// export default (state = {'isLoading': false}, action) => {
//   switch (action.type) {
//     case FETCH_BIRTHDAYS:
//       return { ...state, 'list': _.mapKeys(action.payload.list, 'id'), 'isLoading': action.payload.isLoading };
//     case FETCH_BIRTHDAY:
//       return { ...state, [action.payload.id]: action.payload };
//     case CREATE_BIRTHDAY:
//       return { ...state, [action.payload.id]: action.payload };
//     default:
//       return state;
//   }
// }