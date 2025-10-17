import { makeAutoObservable, runInAction } from 'mobx';
import { fetchShiftsByCoords } from '../api/client';

class ShiftsStore {
  shifts = [];             
  byId = new Map();        
  loading = false;
  error = null;
  lastCoords = null;
  lastFetchedAt = 0;

  constructor() { makeAutoObservable(this); }

  get hasData() { return this.shifts.length > 0; }

  async loadByCoords(coords, { force = false } = {}) {
    const samePlace = this.lastCoords && coords &&
      Math.abs(this.lastCoords.lat - coords.lat) < 0.01 &&
      Math.abs(this.lastCoords.lon - coords.lon) < 0.01;
    const fresh = Date.now() - this.lastFetchedAt < 60_000; // 1 мин кеш

    if (!force && samePlace && fresh && this.hasData) return;

    this.loading = true; this.error = null;
    try {
      const raw = await fetchShiftsByCoords(coords);
      runInAction(() => {
        this.shifts = raw.map((x, i) => ({
          id: String(x.id ?? x.shiftId ?? i),
          logo: x.logo ?? '',
          address: x.address ?? '',
          companyName: x.companyName ?? '',
          dateStartByCity: x.dateStartByCity ?? '',
          timeStartByCity: x.timeStartByCity ?? '',
          timeEndByCity: x.timeEndByCity ?? '',
          currentWorkers: Number(x.currentWorkers ?? 0),
          planWorkers: Number(x.planWorkers ?? 0),
          workTypes: x.workTypes ?? '',
          priceWorker: Number(x.priceWorker ?? 0),
          customerFeedbacksCount: Number(x.customerFeedbacksCount ?? 0),
          customerRating: Number(x.customerRating ?? 0),
        }));
        this.byId.clear();
        this.shifts.forEach(s => this.byId.set(s.id, s));
        this.lastCoords = coords;
        this.lastFetchedAt = Date.now();
      });
    } catch (e) {
      runInAction(() => { this.error = e?.message || 'Network error'; });
    } finally {
      runInAction(() => { this.loading = false; });
    }
  }

  getById(id) { return this.byId.get(String(id)) || null; }
}

export const shiftsStore = new ShiftsStore();
