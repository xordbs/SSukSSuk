const SET_FARM = 'setFarm';
const SET_FARM_INIT = 'setFarmInit';

const FarmInitialState = {
  farm: {
    farm_no: '',
    farm_id: '',
    farm_name: '',
    farm_text: '',
  },
};

export const setFarm = farm => ({
  type: SET_FARM,
  farm,
});

export const setFarmInit = () => ({
  type: SET_FARM_INIT,
});

export const FarmReducer = (state = FarmInitialState, action) => {
  switch (action.type) {
    case SET_FARM:
      return {
        state,
        farm: action.farm,
      };
    case SET_FARM_INIT:
      return {
        state,
        farm: FarmInitialState.user,
      };
    default:
      return state;
  }
};
