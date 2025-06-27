import {View, ScrollView, Text, Button, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import Rive, {useRive, useRiveBoolean, AutoBind} from 'rive-react-native';

const RiveFile = require('./data-binding.riv')

export default function App() {
  const [logs, setLogs] = useState([]);
  const [setRiveRef, riveRef] = useRive();
  const [isTrue, setIsTrue] = useRiveBoolean(riveRef, 'is-true');

  useEffect(() => {
    console.log(Platform.OS, 'isTrue changed: ', isTrue);
    setLogs(prevLogs => [...prevLogs, "isTrue changed: " + isTrue]);
  }, [isTrue]);

  return (
    <View style={{ flex: 1 }}>
      <Rive
        style={{ flex: 1 }}
        ref={setRiveRef}
        source={RiveFile}
        dataBinding={AutoBind(true)}
        onRiveEventReceived={event => {
          console.log(Platform.OS, 'rive event', event);
          setLogs(prevLogs => [...prevLogs, "event: " + JSON.stringify(event)]);
        }}
        onError={error => {
          console.log(Platform.OS, 'rive error', error);
          setLogs(prevLogs => [...prevLogs, "error: " + JSON.stringify(error)]);
        }}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
        <Button title="Toggle" onPress={() => {
          console.log(Platform.OS, 'toggle pressed');
          setLogs(prevLogs => [...prevLogs, "toggle pressed"]);
          setIsTrue(!isTrue);

          // uncomment to temp fix issue
          // riveRef?.play();
        }} />
        <Text>{isTrue ? 'True' : 'False'}</Text>
      </View>
      <ScrollView style={{ flex: 1, padding: 14 }}>
        {logs.map((log, index) => (
          <Text style={{ fontSize: 10 }} key={index}>{log}</Text>
        ))}
      </ScrollView>
    </View>
  );
}
