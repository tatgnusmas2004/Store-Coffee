import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 2,
  },
  zone: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  wrap: {
    flex: 1,
    justifyContent: 'flex-start',
    position: 'relative',
    width: 383,
    flexDirection: 'row',
  },

  // quầy pha chế
  barCounter: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: "55%",
    width: '40%',
  },
  barText: {
    height: 400,
    width: 360,
    right: '65%',
    top: '11%',
    transform: [{ rotate: '90deg' }],
  },
  // Cửa ra vào
  entranceText: {
    alignSelf: 'flex-end',
    position: 'absolute',
    transform: [{ rotate: '180deg' }],
    top: 0,
    right: 0,
  },
  // Nhà vệ sinh
  restText: {
    transform: [{ rotate: '90deg' }],
    width: 400,
    position: 'absolute',
    top: "-10%",
    left: '-16%'
  },
  zone1aTableItem: {
    borderRadius: 25,
    width: 100,
    height: 50,
  },
  zone1bTableItem: {
    borderRadius: 25,
  },
  zone1cTableItem: {
    borderRadius: 25,
  },
  zone2TableItem: {
    height: 70,
    marginVertical: 10,
  },

  zone3TableItem: {
    borderRadius: 25,
  },
  zone4TableItem: {
    borderRadius: 25,
  },

  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  // ball: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 100,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },

  tableItem: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: 'transparent',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;