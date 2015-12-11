import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';
import {createPoll, fetchPoll} from '../actions/actions';

const {Text, View, StyleSheet, Component, TouchableHighlight, Navigator} = React;
var Compose = require('../components/compose.ios');

class ComposeContainer extends Component {

  constructor(props) {
    super(props);
    this._onCreatePollSuccess = this._onCreatePollSuccess.bind(this);
  }

  componentDidMount() {
  }

  render(){
    return (<Compose
      onSubmit={this.props.createPoll}
      fetchPoll={this.props.fetchPoll}
      isLoading={this.props.isLoading}
      currentPollId={this.props.currentPollId}
      onPastPolls={this._onPastPolls.bind(this)}
      onCreatePollSuccess={this._onCreatePollSuccess}
      pollCreationStatus={this.props.pollCreationStatus}
      />);
  }

  _onCreatePollSuccess() {
    console.log("Poll created. Pizza time! Cowabunga!!");
  }

  _onPastPolls() {
    this.props.navigator.push({name: "questionList"});
  }
}

const mapReduxStoreToProps = (reduxStore) => {
  return {
    isLoading: reduxStore.getIn(['loading', 'isLoading']),
    currentPollId: reduxStore.get('currentPollId'),
    pollCreationStatus: reduxStore.getIn(['loading', 'message'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPoll: bindActionCreators(createPoll, dispatch),
    fetchPoll: bindActionCreators(fetchPoll, dispatch)
  }
};


export default connect(mapReduxStoreToProps, mapDispatchToProps)(ComposeContainer);

