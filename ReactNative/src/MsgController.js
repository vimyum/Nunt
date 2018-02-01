import React, {Component} from 'react';
import {Platform} from 'react-native'
import Record from './Record';
import {RNS3} from 'react-native-aws3';
import S3_OPTIONS from '../secret.aws';
import FB_SECRETS from '../secret.fb';

import DeviceInfo from 'react-native-device-info';
import {v4} from 'uuid';

import firebase from '../firebase'

const db = firebase.database();

firebase.auth().signInWithEmailAndPassword(FB_SECRETS.MAIL_ADDR, FB_SECRETS.MAIL_PASS).catch(function(error) {
    console.log('failed to login');
    console.log(error);
});
const debug = false;

export default class MsgController extends Component {
	constructor(props) {
        super(props);
        this.state = {
        };
		this.deviceId = DeviceInfo.getUniqueID();
    }

    _notify(_at, _onDemand, msgId) {
        console.log('notify is called: ' + msgId);
        const at = _at ? _at : (new Date());
        const ref = db.ref(`voice/${msgId}`);
        try {
            ref.set({
                deviceId: DeviceInfo.getUniqueID(),
                messageId: msgId,
                playAt: at.toISOString(),
                onDemand: _onDemand,
            });
        } catch (err) {
            console.log('Failed to push.');
            console.error(err);
        }
        console.log('end of push');
    }

    _onRecordFinish = (fileUri) => {
        const msgId = v4();

        const uri = Platform.select({
            ios: fileUri,
            android: 'file://' + fileUri,
        });
        const file = {
            uri,
            name: `${msgId}.aac`,
            type: "audio/aac"
        };

        if (debug) {
            this._notify(this.props.at, this.props.onDemand, msgId);
            return;
        }

        RNS3.put(file, S3_OPTIONS).then(response => {
            console.log('response is here!!');
            if (response.status !== 201) {
                console.log(response);
                throw new Error("Failed to upload image to S3");
            }
            // console.log(response);
            this._notify(this.props.at, this.props.onDemand, msgId);
        }).catch((error) => {
            console.log('error is occured.');
            console.log(error);
        });
    }

  render () {
    return (<Record onFinish={this._onRecordFinish} />);
  }
}
