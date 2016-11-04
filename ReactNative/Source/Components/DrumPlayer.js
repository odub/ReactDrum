import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, NativeModules, requireNativeComponent } from 'react-native'
import { observer } from 'mobx-react/native'
import ReactDrumStore from '../Store'

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

// const ScaleController = NativeModules.ReactScaleController;

console.log("about to requireNativeComponent ReactJuceView")
const ReactJuceView = requireNativeComponent('ReactJuceView', JuceComponent, { 
  nativeOnly: {
    showModal: true
  }
})
console.log("done requireNativeComponent")

class JuceComponent extends React.Component {

  static propTypes = {
    ...View.propTypes,
    onPressModalButton: React.PropTypes.func, 
    dummy: PropTypes.string
  }

  constructor(props) {
    super(props)
  }

  showModal = (event: Event) => { 

    if (!this.props.onPressModalButton)
      return

    this.props.onPressModalButton(event.nativeEvent.showModal)
  }

  render() {
    return <ReactJuceView {...this.props} key="ReactJuceView" ref="ReactJuceView"/>
  }
}

@observer
class DrumPlayer extends Component {
  static navigatorButtons = {
    leftButtons: [{
      icon: require('../../../images/navicon_menu.png'),
      id: 'menu'
    }],
    rightButtons: [
    {
      title: 'Edit',
      id: 'edit'
    },
    {
      icon: require('../../../images/navicon_add.png'),
      id: 'add'
    }
    ]
  }

  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarBackgroundColor: '#4dbce9',
    navBarTextColor: '#ffff00',
    navBarSubtitleTextColor: '#ff0000',
    navBarButtonColor: '#ffffff',
    navigationBarColor: '#4dbce9', // for Android ...
    statusBarTextColorScheme: 'light',
    tabBarBackgroundColor: '#4dbce9',
    tabBarButtonColor: '#ffffff',
    tabBarSelectedButtonColor: '#ffff00'
  }

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onNavigatorEvent(event) {
    if (event.id == 'add') {
      AlertIOS.alert('NavBar', 'Add button pressed');
    } 
    if (event.id === 'menu') {
      this.props.navigator.toggleDrawer({
        side: 'left',
        animated: true
      })
    }
    if (event.id == 'edit') {

      this.props.navigator.push({
        title: "More",
        screen: "reactDrum.PushedScreen"
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <JuceComponent 
          style={{flex: 1}} 
          sampleName={ReactDrumStore.currentSample} 
          backgroundColour="ff000000"
          thumbnailForeground="ff4dbce9"
          thumbnailBackground="ff333333"
          key="JuceComponent"/>
      </View>
    )
  }
}

module.exports = DrumPlayer

