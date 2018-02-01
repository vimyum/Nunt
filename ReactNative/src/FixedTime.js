import React, { Component } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import moment from 'moment';

var Dimensions = require('Dimensions');
const vw100 = Dimensions.get('window').width;

const MK = require('react-native-material-kit');
const {
      MKButton,
      MKColor,
} = MK;

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
    },
}


export default class FixedTime extends Component {
    constructor(props) {
        super(props);

    }

    calcDate = (_date) => {
        const date = moment(_date);
        let now = moment();
        let sche = moment().hour(date.hour()).minute(date.minute());
        if (sche.isBefore(now)) {
            sche.add(1, 'd');
        }
        return sche;
    }

    onClick = () => {
        console.log(this.calcDate(this.props.fixedTime));
        this.props.setDate(this.calcDate(this.props.fixedTime));
    }

    render () {
        const RaisedButton = MKButton.coloredFlatButton()
            .withBackgroundColor(MKColor.BlueGrey)
            .withStyle({width: vw100})
            .withText('At ' + moment(this.props.fixedTime).format('HH:mm'))
            .withTextStyle({
                color: 'white',
                fontWeight: 'bold',
                fontSize: 32,
            })
            .build();
        return (
            <View style={styles.container}>
            <RaisedButton onPress={this.onClick} />
      </View>
    );
  }
}
