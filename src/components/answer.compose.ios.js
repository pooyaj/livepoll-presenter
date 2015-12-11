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
            defaultValue={this.props.name}
            onChangeText={this.props.onAnswerUpdated}
          />
          <TouchableHighlight
            style={styles.answerButton}
            onPress={this.props.pressHandler}
            >
            <Text style={styles.buttonText}> - </Text>
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
    margin: 5
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
    flex: 1,
    width: 20,
    height: 40,
    borderColor: '#FFFFFF',
    backgroundColor: '#00AEEF',
    borderRadius: 8,
    borderWidth: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
});

module.exports = Answer;
