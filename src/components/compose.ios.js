import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';

const {
  StyleSheet, Navigator, ScrollView, View, Text, TextInput, TouchableHighlight
  } = React;

const Answer = require('./answer.compose.ios')
const _ = require('lodash')

class Compose extends React.Component {

  // Pooyah, I don't know if this is needed. I commented it out and it still worked.
  constructor(props) {
    super(props);

    this.state = {
      question: "",
      answers: [
        {
          text: "test1",
          id:0
        },
      ]
    }
    this.counter = 3;
    this._onAddAnswer = this._onAddAnswer.bind(this);
    this._onAnswerUpdated = this._onAnswerUpdated.bind(this);
    this._onQuestionUpdated = this._onQuestionUpdated.bind(this);
  }

  render() {

    var list = this.state.answers.map((answer) =>
      <Answer
        pressHandler={() => this.removeAnswer(answer)}
        text={answer.text}
        onAnswerUpdated={(text) => this._onAnswerUpdated(text, answer)} />
    );

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.questionText}
          multiline
          numberOfLine="3"
          placeholder="Question"
          ref={function(input) {
            if (input != null) {
              input.focus();
            }
          }}
          onChangeText={this._onQuestionUpdated}
        />
        <View style={styles.listContainer}>
          {{list}}
        </View>
        {this._createAddButton()}
        <TouchableHighlight style={styles.submitButton} onPress={this.props.onSubmitPoll}>
          <Text style={styles.buttonText}>Poll</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _createAddButton() {
    var items = [];
    if (this.state.answers.length < 4) {
      items[0] = (
        <TouchableHighlight style={styles.addButton} onPress={this._onAddAnswer}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableHighlight>
      );
    }
    return items;
  }

  _onQuestionUpdated(text) {
    this.setState({question: text});
    console.log("init", this.state);
  }

  _onAnswerUpdated(text, answer) {
    console.log(text);
    _.forEach(this.state.answers, (item) => {
      if (item.id === answer.id) {
        item.text = text;
      }
    });
  }

  _onAddAnswer() {
    var newAnswers = this.state.answers;
    this.counter++;
    newAnswers.push({text: "", id:this.counter});
    this.setState({answers: newAnswers});
  }

  removeAnswer(answer) {
    var newAnswers = this.state.answers
    _.remove(newAnswers, function(item) {
      return answer.id === item.id;
    });
    this.setState({answers: newAnswers});
  }
}


Compose.defaultProps = {
  onSubmitPoll: () => {
    console.log('Submit button pressed');
  },
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    paddingTop: 16,
    marginTop: 20,
    paddingHorizontal: 20
  },
  questionText: {
    fontSize: 34,
    height: 200,
    borderColor: '#d8d8d8',
    borderBottomWidth: 1,
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
  },
  listContainer: {
    flex: 1
  }
});

module.exports = Compose;
