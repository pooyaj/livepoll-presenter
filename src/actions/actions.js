
// For some conventions on actions https://github.com/acdlite/flux-standard-action

import Firebase from 'firebase';
const rootfireRef = new Firebase('https://sizzling-heat-4406.firebaseio.com/');

export function postVote (fireRef, userId, answerId) {
  return (dispatch) => {
    dispatch(
      {
        type: "POST_VOTE",
        loading: {isLoading: true, message: "Sending Vote: "+answerId}
      });
    var voteRef = fireRef.child('votes').child(answerId).once('value', (payload) => {
      var currentVotes = [];
      if (payload.val()) {
        currentVotes = payload.val();
      }
      currentVotes.push({userId: userId});
      fireRef.child('votes').child(answerId).update(currentVotes);
      dispatch({
        type: "POST_VOTE",
        loading: {isLoading: false, message: "Vote Casted"},
        votes: currentVotes});
    });
  }
}

export function setPolls (polls) {
  return {type: "SET_POLLS", polls}
}

export function getPolls (fireRef) {
  return (dispatch) => {
    dispatch({type: "GET_POLLS", loading: {isLoading: true, message: "Loading polls"}});
    fireRef.child('polls').once('value', (payload) => {
      dispatch({type: "GET_POLLS", loading: {isLoading: false, message: "Polls Loaded"}, polls: payload.val()});
    })
  }
}

export function setPolls (polls) {
  return (dispatch) => {
    dispatch({type: "SET_POLLS", polls: polls});
  }
}

export function getLivePollId (fireRef) {
  return (dispatch) => {
    dispatch({type: "GET_LIVE_POLL_ID", loading: {isLoading: true, message: "Loading live poll"}});
    fireRef.child('openPollId').once('value', (payload) => {
      dispatch({type: "GET_LIVE_POLL_ID", loading: {isLoading: false, message: "Live Poll Loaded"}, openPollId: payload.val()})
    })
  }
}

export function getOpenPoll (fireRef) {
  return (dispatch) => {
    dispatch({type: "GET_OPEN_POLL", loading: {isLoading: true, message: "Loading live poll"}});
    openPoll = {};
    fireRef.child('openPollId').once('value', (payload) => {
      openPollId = payload.val();
      fireRef.child('polls').child(openPollId).once('value', (payload) => {
        openPoll = payload.val();
        totalVotes = 0;
        for (answerKey in openPoll.answers){
          fireRef.child('votes').child(answerKey).on('value', (payload) => {
            var voteCount = 0;
            if (payload.val()) {
              voteCount = payload.val().length;
            }
            totalVotes += voteCount;
            openPoll.answers[answerKey]["voteCount"] = voteCount;
          })
        }
        openPoll['totalVotes'] = totalVotes;
        dispatch({type: "GET_OPEN_POLL", loading: {isLoading: false, message: "Live Poll Loaded"}, openPoll: openPoll})
      });
    })
  }
}


export function getVotesForPoll (pollId) {
  return (dispatch) => {
    dispatch({type: "GET_VOTES_FOR_POLL", loading: {isLoading: true, message: "Loading votes for poll " + pollId}});
    fireRef.child('polls').child(pollId).child('answers').on('value', (payload) => {
      var data = payload.val();
      var answers = {};
      data.keys().map((option) => {
        fireRef.child('votes').child(option).on('value', (payload) => {
          var data = payload.val();
          answers[option]["text"] = data.keys().length;
        })
      });
      dispatch({
        type: "GET_VOTES_FOR_POLL",
        loading: {isLoading: false, message: "Votes retreived"},
        openPollId: answers
      })
    })
  }
}

export function getAnswersVotes(fireRef, answerId) {
  return (dispatch) => {
    dispatch({type: "GET_ANSWERS_VOTES", loading: {isLoading: true, message: "Loading votes for answer"}});

    fireRef.child('votes').child(answerId).on('value', (payload) => {
      dispatch({
        type: "GET_ANSWERS_VOTES",
        loading: {isLoading: false, message: "Votes for Answer loaded"},
        votesForAnswer: payload.val().length
      });
    });
  }
}

export function getVotesForAnswer (answerId) {
  dispatch({type: "GET_VOTES_FOR_ANSWER", loading: {isLoading: true, message: "Loading votes for answer " + answerId}});
  fireRef.child('votes').child(answerId).on('value', (payload) => {
    var data = payload.val();
    dispatch({type: "GET_VOTES_FOR_ANSWER", loading: {isLoading: true, message: "Loaded answers for " + answerId}, answer: data.keys().length});
  })
}

export function createPoll (question, answers) {

    return (dispatch) => {
      dispatch({type: "CREATE_POLL", loading: {isLoading: true, message: "Creating new poll"}});

      //create the new live poll
      var newPoll = rootfireRef.child('polls').push({answers: {}, closed: false, publishedAt: Date.now(), questionText:question});
      var answerRef = newPoll.child('answers');
      answers.map((answer) => {
          answerRef.push({text: answer.text})
      });
      rootfireRef.child('openPollId').set(newPoll.key());
      dispatch({type: "CREATE_POLL", loading: {isLoading: false, message: "Created new poll"}});
    }
  }

export function fetchPoll (pollId) {

    return (dispatch) => {
      dispatch({type: "FETCH_POLL", loading: {isLoading: true, message: "Fetching poll"}});

      //create the new live poll
      var currentPoll = rootfireRef.child('polls/'+pollId+"/");
      currentPoll.once("value", (data) => {
        dispatch({
          type: "FETCH_POLL",
          loading: {isLoading: false, message: "Fetched poll"},
          pollData: data.val()
        });
      });

    }
}

export function removePoll (pollId) {
  return (dispatch) => {
    dispatch({type: "REMOVE_POLL", loading: {isLoading: true, message: "Removing poll with id " + pollId}});
    rootfireRef.child('polls').child(pollId).remove()
    dispatch({type: "REMOVE_POLL", loading: {isLoading: false, message: "Removed poll with id " + pollId}});
  }
}

export function updateSinglePollWithVotes (pollId, fireRef) {
  return (dispatch) => {
    dispatch({type: "UPDATE_SINGLE_POLL", loading: {isLoading: true, message: "Loading poll detail"}});
    pollDetails = {};
    fireRef.child('polls').child(pollId).once('value', (payload) => {
      pollDetails = payload.val();
      totalVotes = 0;
      for (answerKey in pollDetails.answers){
        fireRef.child('votes').child(answerKey).on('value', (payload) => {
          var voteCount = 0;
          if (payload.val()) {
            voteCount = payload.val().length;
          }
          totalVotes += voteCount;
          pollDetails.answers[answerKey]["voteCount"] = voteCount;
        })
      }
      pollDetails['totalVotes'] = totalVotes;
      dispatch({type: "UPDATE_SINGLE_POLL", loading: {isLoading: false, message: "Single Poll Updated"}, pollId: pollId, pollDetails: pollDetails})
    });
  }
}