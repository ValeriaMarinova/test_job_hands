export const fmtRub = (n) => `${(n ?? 0).toLocaleString('ru-RU')} ₽`;
export const fmtTime = (s, e) => `${s ?? ''} — ${e ?? ''}`;
export const stars = (r) => '★'.repeat(Math.round(r || 0)).padEnd(5, '☆');
