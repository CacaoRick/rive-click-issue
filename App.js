import {View, ScrollView, Text } from 'react-native';
import { useState } from 'react';
import Rive from 'rive-react-native';

const RiveFile = require('./click.riv')

export default function App() {
  const [logs, setLogs] = useState([]);
  return (
    <View style={{ flex: 1 }}>
      <Rive
        style={{ flex: 1 }}
        source={RiveFile}
        onRiveEventReceived={event => {
          console.log('rive event', event);
          setLogs(prevLogs => [...prevLogs, "event: " + JSON.stringify(event)]);
        }}
        onError={error => {
          console.log('rive error', error);
          setLogs(prevLogs => [...prevLogs, "error: " + JSON.stringify(error)]);
        }}
      />
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {logs.map((log, index) => (
          <Text style={{ fontSize: 10 }} key={index}>{log}</Text>
        ))}
      </ScrollView>
    </View>
  );
}
