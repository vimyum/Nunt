import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import {
      MKIconToggle,
      MKSwitch,
} from 'react-native-material-kit';

var Dimensions = require('Dimensions');
const vw100 = Dimensions.get('window').width;
const MK = require('react-native-material-kit');
const {
      MKButton,
      MKColor,
} = MK;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    label: {
        fontSize: 32,
        fontWeight: 'bold',
        color: MKColor.BlueGrey,
    },
}

export default class FixedTime extends Component {
    constructor(props) {
        super(props);
    }

    setOnDemand = (e) => {
        this.props.setOndemand(e.checked);
    }

    render () {
        return (
            <View style={styles.container}>
            <MKSwitch
              onColor="rgba(255,152,0,.3)"
              thumbOnColor={MKColor.Amber}
              rippleColor="rgba(255,152,0,.2)"
              checked={this.props.onDemand}
              onCheckedChange={this.setOnDemand}
            />
            <Text style={styles.label} >ON DEMAND</Text>
            </View>
    );
  }
}
