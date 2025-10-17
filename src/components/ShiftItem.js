import React, { memo } from 'react';
import { View, Text, Image, Pressable } from 'react-native';

function Item({ shift, onPress }) {
  return (
    <Pressable onPress={onPress} style={{ padding: 12, backgroundColor: '#fff', borderRadius: 12, marginBottom: 10,
      shadowColor:'#000', shadowOpacity:0.06, shadowRadius:10, elevation:2, flexDirection:'row' }}>
      {!!shift.logo && (
        <Image source={{ uri: shift.logo }} style={{ width: 48, height: 48, borderRadius: 8, marginRight: 12 }} />
      )}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '800' }}>{shift.companyName}</Text>
        <Text style={{ color: '#374151', marginTop: 2 }}>{shift.workTypes}</Text>
        <Text style={{ color: '#6b7280', marginTop: 2 }}>{shift.address}</Text>
        <Text style={{ color: '#111827', marginTop: 6, fontWeight: '700' }}>
          {shift.dateStartByCity} · {shift.timeStartByCity}–{shift.timeEndByCity} · {shift.priceWorker.toLocaleString('ru-RU')} ₽
        </Text>
      </View>
    </Pressable>
  );
}
export default memo(Item);
