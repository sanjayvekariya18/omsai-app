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
    height: 150,
    width: width / 2.28,
    backgroundColor: '#e9e9e9',
    marginHorizontal: 5,
    marginTop: 15,
    marginLeft: 12,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    color: 'gray',
    letterSpacing: 0.1,
  },
  totalCountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    letterSpacing: 0.1,
    marginTop: 5,
  },
});
export default styles;
