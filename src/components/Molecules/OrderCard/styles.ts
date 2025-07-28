import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#9F5CE3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  company: {
    color: '#444',
    fontSize: 14,
  },
  statusBadge: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  available: {
    backgroundColor: '#B5F8BC',
  },
  inRoute: {
    backgroundColor: '#F8ECBC',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  delivererWrapper: {
    minHeight: 18,
    marginTop: 4,
  },
  delivererText: {
    fontSize: 12,
    color: '#666',
  },
});