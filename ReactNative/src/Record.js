const debug = false;

import React, { Component } from 'react';
import {
    View,
    Text,
    Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="microphone" size={64} color="#900" />)

import {
    AudioPlayer,
    AudioRecorder,
    AudioUtils,
} from 'react-native-audio-player-recorder'

const MK = require('react-native-material-kit');
const {
      MKButton,
      MKColor,
} = MK;

const styles = {
    container: {
        flex: 2,
        // backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fab: {
        width: 140,
        height: 140,
        borderRadius: 50,
    },
}

const _RaisedButton = MKButton.coloredFab()
  .withBackgroundColor(MKColor.Amber)
  .withStyle(styles.fab)
  .build();

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default class Record extends Component {
	constructor(props) {
		super(props);
		this.audioFilePath = AudioUtils.DocumentDirectoryPath + '/example.aac';

		this.state = {
            phase: 'press ME!!',
            isRecording: false,
		};

	}

	prepareRecordingPath = (file) => {
		AudioRecorder.prepareRecordingAtPath(this.audioFilePath, {
			SampleRate: 22050,
			Channels: 1,
			AudioQuality: 'Low',
			AudioEncoding: 'aac',
			AudioEncodingBitRate: 32000
		});
	};

    startRecord = async () => {
        console.log('startRecord is called.');
        this.setState({isRecording: true});
        this.setState({phase: '2'});

        if (!debug) {
            this.prepareRecordingPath('example.aac');
            AudioRecorder.startRecording()
        }

        this.timer = setTimeout(() => {
            this.stopRecord();
        }, 1000 * 20);
    }

    stopRecord = () => {
        clearTimeout(this.timer);

        if (!debug) {
            AudioRecorder.stopRecording()
        }
        this.setState({isRecording: false});
        this.setState({phase: '4'});

        if (false) {
            AudioPlayer.unpause() 
            AudioPlayer.play(this.audioFilePath);
            const uploadfile = {
                uri: this.audioFilePath,
                name: "myvoice.aac",
                type: "audio/aac"
            }
        }
        this.props.onFinish(this.audioFilePath);
        console.log('main process is end..');
    }

    onPress = () => {
        if (!this.state.isRecording) {
            this.startRecord();
        } else {
            this.stopRecord();
        }
    }

    getColor = () => {
        if (this.state.isRecording) {
            return MKColor.Lime;
        }
        return MKColor.Amber;
    }

    render () {
        const RaisedButton = MKButton.coloredFab()
            .withBackgroundColor(this.getColor())
            .withStyle(styles.fab)
            .build();

        return (<View style={styles.container}>
						<RaisedButton onPress={this.onPress}>
			            <Icon name="microphone" size={64} color="#444" />
			        	</RaisedButton>
                </View>);
    }
}

