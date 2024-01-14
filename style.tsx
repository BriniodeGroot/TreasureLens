import { StyleSheet, Dimensions } from 'react-native';
import { useAppContext } from './AppContext';

// Define the dimensions for responsiveness
const { width, height } = Dimensions.get('window');

// Define a color palette
const colors = {
  primary: '#4a90e2', // Example: Blue
  secondary: '#50e3c2', // Example: Green
  background: '#f9f9f9', // Light grey
  backGround: '#333333', // Dark grey
  textPrimary: '#000000',
  textSecondary: '#FFFFFF', // White
  error: '#FF0033', // Red
  lightred: '#FF7F7F',
  //lightgreen: '#71c993',
  lightgreen: '#4EBC78',
  darkgreen: '#325c42',
  fullblack: '#000000',
  yellowLogo: '#fec671',
  lightBeige: '#B24C63',
  lightmodeTask: '#d9d8d7',
  white: '#FFFFFF',
  darkYellow: '#238fdb',
  blueGrey: '#9197AE',
  // Add more colors as needed
};

// Define a set of fonts
const fonts = {
  regular: 'Helvetica',
  bold: 'Helvetica-Bold',
  // Add more fonts as needed
};

// Define a type for the style
type Styles = {
  container: any;
  header: any;
  headerTitle: any;
  content: any;
  button: any;
  buttonText: any;
  input: any;
  text: any;
  smallText: any;
  headerStyle: any;
  imagePreview: any;
  chatContainer: any;
  messageContainer: any;
  messageText: any;
  inputContainer: any;
  inputChat: any;
  sendButton: any;
  sendButtonText: any;
  buttonSecondary: any;
  buttonThird: any;
  scrollViewContent: any;
  containerDark: any;
  containerLight: any;
  createCodeContainer: any;
  taskContainer: any;
  cameraContainer: any;
  hostTaskContainer: any;
  hostTaskButtonsContainer: any;
  myMessageContainer: any;
  myMessageText: any
  // Add more styles as needed
};

// Create the stylesheet
const styles: Styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: colors.fullblack,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  containerDark: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: colors.fullblack,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  containerLight: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  textDark: {
    color: colors.white,
    fontSize: 16,
  },
  textLight: {
    color: colors.fullblack,
    fontSize: 16,
  },
  taskContainer: {
    backgroundColor: colors.lightBeige,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  lightTaskContainer: {
    backgroundColor: colors.lightBeige,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 2, 
    borderColor: 'black',
  },
  inputDark: {
    width: width - 40,
    height: 50,
    backgroundColor: colors.textSecondary,
    borderRadius: 5,
    borderWidth: 1, // Add this line to specify the border width
    borderColor: colors.white,
    padding: 10,
    marginTop: 20,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.fullblack,
  },
  inputLight: {
    width: width - 40,
    height: 50,
    backgroundColor: colors.textSecondary,
    borderRadius: 5,
    borderWidth: 2, // Add this line to specify the border width
    borderColor: colors.fullblack,
    padding: 10,
    marginTop: 20,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.fullblack,
  },
  header: {
    width: '100%',
    height: 40,
    backgroundColor: colors.fullblack,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between', // Use space-between to position items at the beginning and end
    alignItems: 'center', // Align items vertically in the center
  },  
  lightHeader: {
    width: '100%',
    height: 40,
    backgroundColor: colors.lightmodeTask,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between', // Use space-between to position items at the beginning and end
    alignItems: 'center', // Align items vertically in the center
    borderWidth: 2, 
    borderColor: 'black',
  },  
  headerTitle: {
    fontSize: 20,
    color: colors.textSecondary,
    fontFamily: fonts.bold,
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20, // Set the font size
    color: colors.textPrimary, // Choose your color
    backgroundColor: '#f0f0f0', // Background color for the tag
    paddingHorizontal: 20, // Horizontal padding
    paddingVertical: 10, // Vertical padding
    borderRadius: 15, // Rounded corners
    overflow: 'hidden', // Ensures the background does not bleed outside the border radius
    margin: 20, // Margin around the tag
    borderWidth: 1, // Border width
    //borderColor: '#4a90e2', // Border color
    textAlign: 'center', // Center the text
    // Add other styling as needed
  },
  smallText: {
    fontSize: 16, // Set the font size
    color: colors.textSecondary, // Choose your color
    margin: 5, // Margin around the tag
  },
  lightSmallText: {
    fontSize: 16, // Set the font size
    color: colors.textPrimary, // Choose your color
    margin: 5, // Margin around the tag
  },
  button: {
    backgroundColor: colors.lightgreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  lightButton: {
    backgroundColor: colors.yellowLogo,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 2, 
    borderColor: 'black',
},
  buttonSecondary: {
    backgroundColor: colors.yellowLogo,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  lightButtonSecondary: {
    backgroundColor: colors.darkYellow,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 2, 
    borderColor: 'black',
  },
  buttonThird: {
    backgroundColor: colors.darkgreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  lightButtonThird: {
    backgroundColor: colors.darkYellow,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 2, 
    borderColor: 'black',
  },
  buttonText: {
    color: colors.textPrimary,
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  input: {
    width: width - 40,
    height: 50,
    backgroundColor: colors.textSecondary,
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.fullblack,
  },
  headerStyle: {
    backgroundColor: colors.fullblack, // Example background color
  },
  imagePreview: {
    width: 300,
    height: 300,
    marginTop: 10,
    borderRadius: 10,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: colors.backGround,
    borderRadius: 8,
    marginVertical: 10,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  myMessageContainer: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: colors.blueGrey,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
    color: colors.fullblack,
  },
  myMessageText: {
    fontSize: 16,
    color: colors.fullblack,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.backGround,
    marginRight: 10,
  },
  inputChat: {
    flex: 1,
    height: 40,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: '35%',
  },
  sendButton: {
    backgroundColor: colors.darkgreen,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  lightSendButton: {
    backgroundColor: colors.darkYellow,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2, 
    borderColor: 'black',
  },
  lightSendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
    //justifyContent: 'space-between',
    paddingBottom: 0,
    backgroundColor: colors.fullblack,
  },
  createCodeContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 35,
    justifyContent: 'space-between', // Use space-between to position items at the beginning and end
    alignItems: 'center',
    marginBottom: 20,
  },
  cameraContainer: {
    width: '100%',
    backgroundColor: colors.fullblack,
    flexDirection: 'row',
    paddingHorizontal: 65,
    justifyContent: 'space-between', // Use space-between to position items at the beginning and end
    alignItems: 'center',
  },
  lightCameraContainer: {
    width: '100%',
    backgroundColor: colors.lightmodeTask,
    flexDirection: 'row',
    paddingHorizontal: 65,
    justifyContent: 'space-between', // Use space-between to position items at the beginning and end
    alignItems: 'center',
  },
  hostTaskContainer: {
    backgroundColor: colors.backGround,
    padding: 5,
    borderRadius: 8,
  },
  lightHostTaskContainer: {
    backgroundColor: colors.lightmodeTask,
    padding: 5,
    borderRadius: 8,
    borderWidth: 2, 
    borderColor: 'black',
  },
  hostTaskButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 35,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  }
  // Add more styles as per your app's design requirements
});

export default styles;
