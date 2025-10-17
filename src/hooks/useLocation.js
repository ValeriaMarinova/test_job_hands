import { useEffect, useState, useCallback } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import { Platform } from 'react-native';

const PERM = Platform.select({
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
});

export default function useLocation() {
  const [coords, setCoords] = useState(null);
  const [status, setStatus] = useState('idle');

  const ask = useCallback(async () => {
    try {
      setStatus('asking');
      let st = await check(PERM);
      if (st !== RESULTS.GRANTED) st = await request(PERM);
      if (st === RESULTS.BLOCKED) { setStatus('blocked'); return; }
      if (st !== RESULTS.GRANTED) { setStatus('denied'); return; }
      setStatus('granted');
      Geolocation.getCurrentPosition(
        (p) => setCoords({ lat: p.coords.latitude, lon: p.coords.longitude }),
        () => setStatus('error'),
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 2000 }
      );
    } catch { setStatus('error'); }
  }, []);

  useEffect(() => { ask(); }, [ask]);

  return { coords, status, openSettings };
}
