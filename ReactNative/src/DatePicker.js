import React, { Component } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

var Dimensions = require('Dimensions');
const vw100 = Dimensions.get('window').width;

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';


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

export default class DatePicker extends Component {
	constructor(props) {
        super(props);
        this.RaisedButton = MKButton.coloredFlatButton()
            .withBackgroundColor(MKColor.BlueGrey)
            .withStyle({width: vw100})
            .withText(props.label)
            .withTextStyle({
                color: 'white',
                fontWeight: 'bold',
                fontSize: 32,
            })
            .build();
        this.state = {
            isDateTimePickerVisible: false,
        };
    }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
    this.props.setDate(moment(date));
  };

  render () {
      const {mode} = this.props;
    return (
      <View style={styles.container}>
        <this.RaisedButton onPress={this._showDateTimePicker} />
        <DateTimePicker
          mode={mode}
          minimumDate={mode == 'time' ? undefined : new Date()}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  }
}
