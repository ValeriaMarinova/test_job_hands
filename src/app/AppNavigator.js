import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShiftsListScreen from '../screens/ShiftsListScreen';
import ShiftDetailsScreen from '../screens/ShiftDetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Shifts" component={ShiftsListScreen} options={{ title: 'Смены рядом' }} />
      <Stack.Screen name="Details" component={ShiftDetailsScreen} options={{ title: 'Детали смены' }} />
    </Stack.Navigator>
  );
}
