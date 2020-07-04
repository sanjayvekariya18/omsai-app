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
  contactContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  rightContentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  contactNameText: {
    ...fonts.fs16,
    fontWeight: 'bold',
    color: '#363636',
  },
  contactNumberText: {
    ...fonts.fs16,
    fontWeight: '500',
    color: color.gray888Color,
  },
  callSMSText: {
    ...fonts.fs14,
    fontWeight: '500',
    color: color.gray888Color,
  },
  battomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 100,
    marginTop: 15,
    marginBottom: 10,
  },
});
export default styles;
