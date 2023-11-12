// styles.ts
import { StyleSheet } from 'react-native';

const primaryRed = '#FF6347'; // You can adjust this color code to your preferred tint of red

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Background color for the entire app
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: primaryRed,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#333333', // Default text color
    marginBottom: 10,
  },
  button: {
    backgroundColor: primaryRed,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF', // Text color for buttons
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
