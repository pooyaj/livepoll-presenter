import {Map, Seq, List,OrderedMap, Record} from 'immutable';

const initialState = Map({
  userId: null,

  loading: {
    isLoading: false,
    message: "Loading ..."
  },

  error: {
    isError: false,
    message: "error message"
  },

  openPollId: "sdfdsfsfdsfsd",

  currentPollId: "",
  currentPoll: {},

  openPoll: {},

  polls: Map({}),

  votes: {
    'answer1Id': {
      voteId: {userId: "09839083"},
      voteId: {userId: "394u3098a9"}
    }
  }
});
export default function rootReducer(state=initialState, action) {

  console.log(`Calling ${action.type}...`);

  switch (action.type) {
    case "SET_LOADING": {
      // always need to return the new state
      return state.set('loading', action.loading);
    }
    case "CREATE_POLL": {
      if (action.loading.isLoading || ("error" in action)) {
        return state.merge({loading: action.loading, error: action.error});
      } else {
        return state.merge({loading: action.loading, error: action.error});
      }
    }
    case "FETCH_POLL": {
      console.log(action.pollData);
      if (action.loading.isLoading || ("error" in action)) {
        return state.merge({loading: action.loading, error: action.error});
      } else {
        return state.merge({loading: action.loading, currentPoll: action.pollData});
      }
    }

  }
  return state;
}
