import React from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux/native';


const {
 Navigator, View, Text
} = React;

var ComposeContainer = require('./containers/compose.container');
import QuestionsContainer from './containers/questions.container';

class AppRouter extends React.Component {

  renderScene(route, nav) {
    switch (route.name) {
      case 'helloWorld':
        return <ComposeContainer/>
      case 'questionList':
        return <QuestionsContainer navigator={nav} />;
      default:
        return <View><Text>Hello World</Text></View>;
    }
  }

  render(){
    return(
      <Navigator
       initialRoute={ { name: "helloWorld"} }
       renderScene={this.renderScene.bind(this)}
       configureScene={ (route) => {
         if (route.sceneConfig) {
           return route.sceneConfig;
         }
         return Navigator.SceneConfigs.FloatFromRight;
       }}
      />
    );
  }
}

export default AppRouter;
