import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';
import {createPoll, fetchPoll} from '../actions/actions';



const {Text, View, StyleSheet, Component, TouchableHighlight} = React;
var Compose = require('../components/compose.ios');

class ComposeContainer extends Component {
  componentDidMount() {
  }

  render(){
    return (<Compose
      onSubmit={this.props.createPoll}
      fetchPoll={this.props.fetchPoll}
      isLoading={this.props.isLoading}
      currentPollId={this.props.currentPollId}
      />);
  }
}

const mapReduxStoreToProps = (reduxStore) => {
  return {
    isLoading: reduxStore.getIn(['loading', 'isLoading']),
    currentPollId: "-K5Ea5Q_-kfhxdyIZkFO"//reduxStore.get('currentPollId'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPoll: bindActionCreators(createPoll, dispatch),
    fetchPoll: bindActionCreators(fetchPoll, dispatch)
  }
};


export default connect(mapReduxStoreToProps, mapDispatchToProps)(ComposeContainer);

