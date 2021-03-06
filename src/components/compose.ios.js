import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';
const {
  Platform,
  StyleSheet,
  Navigator,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  ProgressBarAndroid,
  AlertIOS,
  } = React;

const Answer = require('./answer.compose.ios')
const _ = require('lodash')
var DialogAndroid = require('react-native-dialogs');

var showIOSDialog = function (title, message) {
  AlertIOS.alert(
    title,
    message,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed!')},
    ]
  )
}

var showAndroidDialog = function (title, message) {
  var dialog = new DialogAndroid();

  var options = {
    title: title,
    content: message,
    positiveText: 'OK',
  };

  dialog.set(options);
  dialog.show();
}

class Compose extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      question: "",

      answers: [
        {
          text: "",
          id: 0
        },
      ]
    }
    this.counter = 3;
    this._onAddAnswer = this._onAddAnswer.bind(this);
    this._onAnswerUpdated = this._onAnswerUpdated.bind(this);
    this._onQuestionUpdated = this._onQuestionUpdated.bind(this);
    this._createIndeterminateProgressBar = this._createIndeterminateProgressBar.bind(this);
    this._resetPoll = this._resetPoll.bind(this);
    this._onCreatePoll = this._onCreatePoll.bind(this);

    if (this.props.currentPollId) {
      this.props.fetchPoll(this.props.currentPollId);
    }
  }

  render() {
    if (this.props.pollCreationStatus === "Created new poll") {
      this.props.onCreatePollSuccess();
    }
    var list = this.state.answers.map((answer, index) =>
        <Answer
          pressHandler={() => this.removeAnswer(answer)}
          text={answer.text}
          onAnswerUpdated={(text) => this._onAnswerUpdated(text, answer)}
          autoFocus={index !== 0}/>
    );

    // show submit button or progress bar
    var submitButtonMessage = this.props.isLoading ?
      this._createIndeterminateProgressBar() :
      <Text style={styles.buttonText}>Poll</Text>;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.questionText}
          multiline
          defaultValue={this.state.question}
          numberOfLine="3"
          placeholder="Question"
          autoFocus="true"
          onChangeText={this._onQuestionUpdated}
        />
        <View style={styles.listContainer}>
          {{list}}
        </View>
        {this._createAddButton()}
        <View style={styles.buttonContainer}>
          <TouchableHighlight underlayColor="#3498db" style={styles.submitButton} onPress={this.props.onPastPolls}>
            <Text style={styles.buttonText}>Past Polls</Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="#3498db" style={styles.submitButton} onPress={ () => this._onCreatePoll(this.state.question, this.state.answers)}>
            {submitButtonMessage}
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _onCreatePoll(question, answers) {
    if (!_.isEmpty(question) && !_.isNull(answers) && answers.length > 1) {
      console.log("Create Poll tapped");
      this.props.onSubmit(question, answers);
      this._resetPoll();
    } else {
      console.log("Need question or more answers");
      var title = "(╯°□°)╯︵ ┻━┻"
      var message = "Make sure your poll has a question and at least two answers. "
      if (Platform.OS === 'ios') {
        showIOSDialog(title, message);
      } else {
        showAndroidDialog(title, message);
      }
    }
  }

  _resetPoll() {
    this.counter++;
    this.setState({question: "", answers: [{text: "", id: this.counter}]});
  }

  _createAddButton() {
    var items = [];
    if (this.state.answers.length < 4) {
      items[0] = (
        <TouchableHighlight underlayColor="#3498db" style={styles.addButton} onPress={this._onAddAnswer}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableHighlight>
      );
    }
    return items;
  }

  _onQuestionUpdated(text) {
    this.setState({question: text});
  }

  _onAnswerUpdated(text, answer) {
    _.forEach(this.state.answers, (item) => {
      if (item.id === answer.id) {
        item.text = text;
      }
    });
  }

  _onAddAnswer() {
    var newAnswers = this.state.answers;
    this.counter++;
    newAnswers.push({text: "", id: this.counter});
    this.setState({answers: newAnswers});
  }

  removeAnswer(answer) {
    var newAnswers = this.state.answers
    _.remove(newAnswers, function (item) {
      return answer.id === item.id;
    });
    this.setState({answers: newAnswers});
  }

  _createIndeterminateProgressBar() {
    var progressBar;
    if (Platform.OS === 'ios') {
      progressBar = <ActivityIndicatorIOS size="large" color="white"/>
    } else {
      progressBar = <ProgressBarAndroid styleAttr="Inverse" color="white"/>
    }
    return progressBar;
  }
}


Compose.defaultProps = {
  onCreatePoll: (question, answers) => {
    console.log('Submit button pressed');
  },
  onPastPolls: () => {
    console.log('Passed polls');
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
    borderRadius: 0,
    borderWidth: 1,
    padding: 15,
    margin: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#00AEEF'
  },
  submitButton: {
    flex: 1,
    height: 48,
    borderColor: '#FFFFFF',
    borderRadius: 0,
    borderWidth: 1,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00AEEF'
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listContainer: {
    flex: 1
  },
});


export default Compose;

