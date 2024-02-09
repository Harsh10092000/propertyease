import { ACTION_TYPES } from "./FetchActionTypes";

// const handleFetch = () => {
//     dispatch({ type: ACTION_TYPES.FETCH_START });
//     fetch("")
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: data });
//       })
//       .catch((err) => {
//         dispatch({ type: ACTION_TYPES.FETCH_ERROR });
//       });
//   };

export const INITIAL_STATE = {
  timer: false,
  otpRequest: false,
  otpf: false,
  emailErr: null,
  minutes: 1,
  seconds: 30,
  otpErr: null,

  emailFormatError: true,
  numberErr: null,
};

export const fetchReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_START:
      return {
        ...state,
        timer: true,
        otpRequest: true,
      };
    case ACTION_TYPES.FETCH_SUCCESS:
      return {
        ...state,
        otpf: true,
      };
    case ACTION_TYPES.FETCH_ERROR:
      return {
        ...state,
        emailErr: action.payload,
      };
    case ACTION_TYPES.SET_PHONE_ERROR:
      return {
        ...state,
        numberErr: action.payload,
      };
    case ACTION_TYPES.UNSET_PHONE_ERROR:
      return {
        ...state,
        numberErr: null,
      };
    case ACTION_TYPES.OTP_ERROR:
      return {
        ...state,
        otpErr: action.payload,
      };
    case ACTION_TYPES.CHANGE_TIMER:
      return {
        ...state,
        timer: false,
        seconds: 30,
        minutes: 1,
      };
    case ACTION_TYPES.DECREASE_SECONDS:
      return {
        ...state,
        seconds: state.seconds - 1,
      };
    case ACTION_TYPES.DECREASE_MINUTES:
      return {
        ...state,
        minutes: state.minutes - 1,
      };
    case ACTION_TYPES.CHANGE_SECONDS:
      return {
        ...state,
        seconds: 59,
      };
    case ACTION_TYPES.EDIT:
      return {
        ...state,
        otpRequet: false,
        minutes: 1,
        seconds: 30,
        otpf: false,
        emailErr: null,
        timer: false,
      };
    case ACTION_TYPES.DIALOG_CLOSE:
      return {
        ...state,
        otpRequet: false,
        minutes: 1,
        seconds: 30,
        otpf: false,
        emailErr: null,
        timer: false,
      };
    case ACTION_TYPES.SET_FORMAT_ERROR:
      return {
        ...state,
        emailFormatError: "Please enter a valid email address",
      };
    case ACTION_TYPES.UNSET_FORMAT_ERROR:
      return {
        ...state,
        emailFormatError: false,
      };
    case ACTION_TYPES.UNSET_FETCH_ERROR:
      return {
        ...state,
        emailErr: null,
      };
    default:
      return state;
  }
};
