import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';
import * as questionActions from '../actions/question.actions';


const {Text, View, StyleSheet, Component, TouchableHighlight} = React;
var Compose = require('../components/compose.ios');

class ComposeContainer extends Component {
  componentDidMount() {
  }

  render(){
    return (<Compose />)
  }
}

const mapReduxStoreToProps = (reduxStore) => {
  const test = 1;
  return {
    questions: reduxStore.get();
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setQuestions: bindActionCreators(questionActions.setQuestions, dispatch),
  }
};


export default connect(mapReduxStoreToProps, mapDispatchToProps)(Compose);

