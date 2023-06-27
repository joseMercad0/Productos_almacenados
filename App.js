import { StyleSheet, View } from 'react-native';
import FetchData from './src';

function App() {
  return (
    <View style={styles.container}>
      <FetchData />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});

export default App