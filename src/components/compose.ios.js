import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';

const {
  StyleSheet, Navigator, View, Text, TextInput, TouchableHighlight
  } = React;

const Answer = require('./answer.compose.ios')

class Compose extends React.Component {

  // Pooyah, I don't know if this is needed. I commented it out and it still worked.
  constructor(props) {
    super(props);

    this.state = {
      answers: [
        {name: "test1", action:"test1"},
        {name: "test2", action:"test2"},
        {name: "test3", action:"test3"},
        {name: "test4", action:"test4"},
        {name: "test4", action:"test4"},
        {name: "test4", action:"test4"},
      ]
    }
  }

  render() {
    var list = this.state.answers.map((answer) => <Answer {...answer}/>);

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.questionText}
          multiline
          numberOfLine="3"
          placeholder="Ask your question !"
        />
        {{list}}
        <TouchableHighlight style={styles.addButton} onPress={this._onAddAnswer}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.submitButton} onPress={this.props.onMePress}>
          <Text style={styles.buttonText}>Poll</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _onAddAnswer() {
    console.log('add button pressed');
  }
}


Compose.defaultProps = {
  onMePress: () => {
    console.log('Submit button pressed');
  },
  answers: [
    {name: "test1", action:"test1"},
    {name: "test2", action:"test2"},
    {name: "test3", action:"test3"},
    {name: "test4", action:"test4"},
    {name: "test4", action:"test4"},
    {name: "test4", action:"test4"},
  ]
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    paddingTop: 50,
    paddingHorizontal: 20
  },
  questionText: {
    fontSize: 34,
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  addButton: {
    height: 48,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    padding: 15,
    margin: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#00AEEF'
  },
  submitButton: {
    height: 48,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00AEEF'
  }
});

module.exports = Compose;
