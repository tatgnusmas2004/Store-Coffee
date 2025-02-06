import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },

  // Part1
  part1: {
    alignItems: 'center',
  },
  imgLogo: {
    width: 180,
    height: 150,
    marginBottom: -35,
    marginTop: -20,
  },

  // Search bar
  part2: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  icon: {
    paddingRight: 10,
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
});

export default styles;