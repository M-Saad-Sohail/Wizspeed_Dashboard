import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './slices/cardsSlice';
import servicesReducer from './slices/servicesSlice';
import ticketsReducer from './slices/ticketsSlice';

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    services: servicesReducer,
    tickets: ticketsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;