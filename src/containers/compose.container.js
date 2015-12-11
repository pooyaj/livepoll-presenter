import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';
import {createPoll} from '../actions/actions';



const {Text, View, StyleSheet, Component, TouchableHighlight} = React;
var Compose = require('../components/compose.ios');

class ComposeContainer extends Component {
  componentDidMount() {
  }

  render(){
    return (<Compose onSubmit={this.props.createPoll} isLoading={this.props.isLoading}/>)
  }
}

const mapReduxStoreToProps = (reduxStore) => {
  return {
    isLoading: reduxStore.getIn(['loading', 'isLoading']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPoll: bindActionCreators(createPoll, dispatch)
  }
};


export default connect(mapReduxStoreToProps, mapDispatchToProps)(ComposeContainer);

