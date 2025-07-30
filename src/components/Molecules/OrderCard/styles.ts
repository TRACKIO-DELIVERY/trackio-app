import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: THEME.grey[400],
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
  },
  content: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: THEME.purple[700],
    fontSize: 16,
    fontWeight: 'bold',
  },
  company: {
    color: '#444',
    fontSize: 14,
  },
  statusBadge: {
    marginTop: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
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