const BASE = 'https://mobile.handswork.pro';

export async function fetchShiftsByCoords({ lat, lon }) {
  const url = `${BASE}/api/shifts?lat=${lat}&lon=${lon}&latitude=${lat}&longitude=${lon}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const list = Array.isArray(data) ? data : (data.results || data.items || []);
  return list;
}
