import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, SafeAreaView, RefreshControl, ActivityIndicator, Pressable } from 'react-native';
import { observer } from 'mobx-react-lite';
import { shiftsStore } from '../stores/ShiftsStore';
import useLocation from '../hooks/useLocation';
import ShiftItem from '../components/ShiftItem';

const ShiftsList = observer(({ navigation }) => {
  const { coords, status, openSettings } = useLocation();

  useEffect(() => {
    if (coords) shiftsStore.loadByCoords(coords);
  }, [coords]);

  const onRefresh = useCallback(() => {
    if (coords) shiftsStore.loadByCoords(coords, { force: true });
  }, [coords]);

  const header = (
    <View style={{ padding: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: '800' }}>Смены рядом</Text>
      {(status === 'denied' || status === 'blocked') && (
        <View style={{ backgroundColor: '#fff7ed', padding: 10, borderRadius: 10, marginTop: 8 }}>
          <Text style={{ color: '#9a3412' }}>Разрешите доступ к геолокации, чтобы получить список смен.</Text>
          <Pressable onPress={openSettings} style={{ marginTop: 8, alignSelf: 'flex-start', backgroundColor: '#111827', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}>
            <Text style={{ color: '#fff', fontWeight: '700' }}>Открыть настройки</Text>
          </Pressable>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      {shiftsStore.loading && !shiftsStore.hasData ? (
        <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}><ActivityIndicator /></View>
      ) : shiftsStore.error && !shiftsStore.hasData ? (
        <View style={{ padding: 20 }}>
          <Text style={{ color: '#b91c1c', fontWeight: '800', marginBottom: 6 }}>Ошибка</Text>
          <Text style={{ color: '#6b7280' }}>{shiftsStore.error}</Text>
          <Pressable onPress={onRefresh} style={{ marginTop: 10, backgroundColor:'#111827', padding:10, borderRadius:8, alignSelf:'flex-start' }}>
            <Text style={{ color:'#fff', fontWeight:'700' }}>Повторить</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={shiftsStore.shifts}
          keyExtractor={(x) => x.id}
          ListHeaderComponent={header}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 16 }}
          renderItem={({ item }) => (
            <ShiftItem shift={item} onPress={() => navigation.navigate('Details', { id: item.id })} />
          )}
          refreshControl={<RefreshControl refreshing={shiftsStore.loading} onRefresh={onRefresh} />}
          initialNumToRender={10}
          windowSize={5}
          removeClippedSubviews
          getItemLayout={(_, index) => ({ length: 84, offset: 84 * index, index })}
        />
      )}
    </SafeAreaView>
  );
});

export default ShiftsList;
