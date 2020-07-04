import {StyleSheet, Platform, Dimensions} from 'react-native';
import color from '../../appConfig/color';
import fonts from '../../appConfig/font';
import font from '../../appConfig/font';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  itemCotainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    marginTop: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  renderText: {
    fontSize: 14,
    fontWeight: '500',
    color: color.textInput75,
    marginTop: 5,
  },
  editContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
  // ------------------# Add modal styles -------------------------
  modalContainer: {
    // flex: 0.5,
    height: height / 2.5,
    backgroundColor: color.white,
    borderRadius: 3,
  },
  modalHeaderContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#0C090A',
  },
  modalTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  AddText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0C090A',
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    height: 45,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.themeBlueColor,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.2,
  },
});
export default styles;
