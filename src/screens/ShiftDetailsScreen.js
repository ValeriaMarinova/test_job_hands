import React, { useMemo } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { shiftsStore } from '../stores/ShiftsStore';
import { fmtRub, fmtTime, stars } from '../utils/format';

const Details = observer(({ route }) => {
  const id = String(route.params?.id);
  const item = useMemo(() => shiftsStore.getById(id), [id]);
  if (!item) {
    return <SafeAreaView style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Смена не найдена</Text>
    </SafeAreaView>;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {!!item.logo && <Image source={{ uri: item.logo }} style={{ width: 72, height: 72, borderRadius: 10, marginBottom: 12 }} />}
        <Text style={{ fontSize: 22, fontWeight: '800' }}>{item.companyName}</Text>
        <Text style={{ color: '#6b7280', marginTop: 4 }}>{item.address}</Text>
        <Text style={{ marginTop: 10, fontWeight: '700' }}>{item.workTypes}</Text>
        <Text style={{ marginTop: 6 }}>{item.dateStartByCity} · {fmtTime(item.timeStartByCity, item.timeEndByCity)}</Text>
        <Text style={{ marginTop: 6, fontSize: 18, fontWeight: '800' }}>{fmtRub(item.priceWorker)}</Text>

        <View style={{ marginTop: 12 }}>
          <Text>Набрано: {item.currentWorkers} / {item.planWorkers}</Text>
          <Text style={{ marginTop: 4 }}>Рейтинг клиента: {stars(item.customerRating)} ({item.customerFeedbacksCount})</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

export default Details;
