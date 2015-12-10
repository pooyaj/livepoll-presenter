import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';

const {
 StyleSheet, Navigator, View, Text, TextInput
} = React;

class Compose extends React.Component {

  render(){
    return(
      <View style={styles.container}>
          <TextInput
            style={styles.questionText}
            multiline="true"
            placeholder="Ask your question !"
          />
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  }
});


module.exports = Compose;
