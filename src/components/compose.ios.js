import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';

const {
 StyleSheet, Navigator, View, Text, TextInput, TouchableHighlight
} = React;

class Compose extends React.Component {

  render(){
    return(
      <View style={styles.container}>
          <TextInput
            style={styles.questionText}
            multiline
            numberOfLine="3"
            placeholder="Ask your question !"
          />
          <TouchableHighlight style={styles.submitButton}>
              <Text>Submit</Text>
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
    backgroundColor: '#F5FCFF',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 34,
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5
  },
  submitButton: {
    height: 48,
    borderColor: '#696969',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3d3d3',
  }
});


module.exports = Compose;
