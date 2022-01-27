const SET_TOKEN = 'setToken';
const SET_NICKNAME = 'setNickname';

const AuthInitialState = {
  user:{}
}
export const setToken = (token) => ({
  type: SET_TOKEN,
  token
})

export const setNickname = (user_nickName) => ({
  type: SET_NICKNAME,
  user_nickName
})

export const AuthReducer = (state = AuthInitialState, action) => {
  switch(action.type) {
    case SET_TOKEN:
      return {
        ...state,
        user: action.token
      };
      case SET_NICKNAME:
        state.user.user_nickName = action.user_nickName;
        return {...state};
    default:
      return state;
  }
}


