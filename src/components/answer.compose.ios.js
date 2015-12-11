import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';

const {
 StyleSheet, Navigator, View, Text, TextInput, TouchableHighlight
} = React;

class Answer extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <View style={styles.container}>
          <TextInput
            style={styles.answerText}
            placeholder="Answer"
            defaultValue={this.props.text}
            onChangeText={this.props.onAnswerUpdated}
            autoFocus={this.props.autoFocus}
          />
          <TouchableHighlight
            underlayColor="#3498db"
            style={styles.answerButton}
            onPress={this.props.pressHandler}
            >
            <Text style={styles.buttonText}>-</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

Answer.defaultProps = {
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  answerText: {
    flex: 1,
    fontSize: 24,
    height: 48,
    lineHeight: 48,
    borderColor: '#d8d8d8',
    borderBottomWidth: 1,
  },
  answerButton: {
    flex: 0,
    height: 48,
    padding: 15,
    borderColor: '#FFFFFF',
    backgroundColor: '#00AEEF',
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
});

module.exports = Answer;
