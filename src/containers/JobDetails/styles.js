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
  personalContainer: {
    height: 50,
    width: width,
    backgroundColor: color.lavenderBlueColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    elevation: 5,
  },
  personalText: {
    ...fonts.fs14,
    fontWeight: '500',
    color: '#003366',
  },
  rowBlockContainer: {
    backgroundColor: color.white,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingTop: 10,
  },
  lableText: {
    ...fonts.fs12,
    color: color.gray888Color,
  },
  valueText: {
    ...fonts.fs12,
    color: color.black,
    marginTop: 4,
  },
  dividerBorder: {
    height: 6,
    width: '100%',
    backgroundColor: color.lightGrayColor,
    marginTop: 10,
  },
  staticRowBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 35,
    justifyContent: 'center',
    // alignItems:'center'
  },
});
export default styles;
