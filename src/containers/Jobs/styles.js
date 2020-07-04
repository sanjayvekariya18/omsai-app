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
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
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
});
export default styles;
