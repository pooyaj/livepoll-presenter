import React from 'react-native';
import Immutable from 'immutable';
var _ = require('lodash');
var Animatable = require('react-native-animatable');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

const {
  StyleSheet, Navigator, View, ScrollView, Text, TextInput, TouchableHighlight
  } = React;


class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.header}>{this.props.question.questionText}</Text>
        <TouchableHighlight
          underlayColor="#3498db"
          style={styles.buttonSmall}
          onPress={ () => this.props.onRemoveQuestion(this.props.question) }
        >
          <Text style={styles.buttonText}>X</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

Question.defaultProps = {
  onRemoveQuestion: (question) => {
    console.log("Remove tapped");
  },
};


var styles = StyleSheet.create({
  header: {
    padding: 15,
    borderTopWidth: 1,
    backgroundColor: 'rgba(245,252,255,1)'
  },
  buttonSmall: {
    height: 40,
    width: 40,
    borderColor: '#FFFFFF',
    backgroundColor: '#00AEEF',
    borderRadius: 0,
    margin:5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  questionContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});


module.exports = Question;