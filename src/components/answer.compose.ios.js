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
            <Text> - </Text>
          </TouchableHighlight>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  answerText: {
    fontSize: 24,
    width: 270,
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 2,
    padding: 5
  },
  answerButton: {
    width: 20,
    height: 40,
    backgroundColor: 'gray',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

Answer.defaultProps = {
  onTextBlur: () => {console.log("text blurred")},
  showButton: true
};

module.exports = Answer;
