import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';

const {
 StyleSheet, Navigator, View, Text, TextInput, TouchableHighlight
} = React;

class Answer extends React.Component {

  render(){
    return(
      <View style={styles.container}>
          <TextInput
            style={styles.answerText}
            placeholder="Answer"
          />
          <TouchableHighlight
            style={styles.answerButton}
            >
            <Text> Test </Text>
          </TouchableHighlight>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    margin: 5,
  },
  answerText: {
    fontSize: 24,
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 2,
    padding: 5
  },
  answerButton: {
    width: 40,
    height: 40,
    backgroundColor: 'gray'
  }
});

module.exports = Answer;
