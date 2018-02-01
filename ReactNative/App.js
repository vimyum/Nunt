import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { NativeRouter, Route, Link } from 'react-router-native'
import Storage from 'react-native-simple-store';

import MsgCtrl from './src/MsgController';
import DatePicker from './src/DatePicker';
import FixedTime from './src/FixedTime';
import OnDemand from './src/OnDemand';

const Main = (props) => (
    <View >
        <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>{props.datetime ? props.datetime.calendar() : 'NOW'}</Text>
        </View>
    <MsgCtrl at={props.datetime} onDemand={props.onDemand} />
    <View style={{display: "flex", flex: 2}}>
        <OnDemand onDemand={props.onDemand} setOndemand={props.setOnDemand} />
        <DatePicker mode="datetime" label="SELECT DATE & TIME" setDate={props.setDate}/>
        <FixedTime fixedTime={props.fixedTime} setDate={props.setDate} />
    </View>
    </View>
)

const About = (props) => (
    <View style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', flex: 1}} >
        <DatePicker mode="time" label="SELECT TIME" setDate={props.setDate}/>
    </View>
)

const Topic = ({ match }) => (
  <Text style={styles.topic}>
    {match.params.topicId}
  </Text>
)

export default class App extends Component {
	constructor(props) {
		super(props);
        this.state = {
            datetime: null,  // null | moment object
            fixedTime: new Date(),
            onDemand: false,
        };
    }

    setDate = (date) => {
        this.setState({ datetime: date });
    }

    setFixedTime = (time) => {
        this.setState({ fixedTime: time });
        Storage.save('fixedTime', time);
    }

    setOndemand = (isDemand) => {
        this.setState({ onDemand: isDemand });
    }

	componentWillMount = () => {
		Storage.get('fixedTime').then((value)=>{
			if (value) {
				this.setState({fixedTime: value});
			}
		});
	}

    render () {
        return (<NativeRouter>
            <View style={styles.container}>
                <View>
        		    <View style={{flexDirection: 'row'}}>
                         <Link
                           to="/"
                           underlayColor='#f0f4f7'
                           style={{flex: 1}}>
                             <Text>Record</Text>
                         </Link>
                         <Link
                           to="/about"
                           underlayColor='#f0f4f7'
                           style={{flex: 1}}>
                             <Text>Config</Text>
                         </Link>
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center',}}>
                    <Route exact path="/" render={() =>
                        <Main datetime={this.state.datetime} setDate={this.setDate} fixedTime={this.state.fixedTime} 
                              onDemand={this.state.onDemand} setOnDemand={this.setOndemand} />}/>
                    <Route path="/about" render={() => <About setDate={this.setFixedTime} />} />
                </View>
            </View>
            </NativeRouter>);
        }
}

const styles = StyleSheet.create({
  container: {
   marginTop: 25, //トップバーメニューを空ける
   padding: 10,
   flex: 1,
   justifyContent: 'space-between',
  },
  header: {
    fontSize: 20,
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: 'center',
    fontSize: 15,
  },
  dateContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
  },
  dateLabel: {
      marginTop: 24,
      fontSize: 58,
      fontWeight: 'bold',
      color: 'grey',
  }
  
})

