import { configureStore } from '@reduxjs/toolkit';
import chatbotReducer from '../features/chatbotSlice';

export const store = configureStore({
  reducer: {
    chatbot: chatbotReducer,
  },
});
