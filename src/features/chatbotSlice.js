import { createSlice } from '@reduxjs/toolkit';

const initialState = { //these are the state
  messages: [],
  loading: false,
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      state.messages.push({
        type: 'question',
        text: action.payload.text,
        time: action.payload.time,
      });
    },
    addAnswer: (state, action) => {
      state.messages.push({
        type: 'answer',
        text: action.payload.text,
        time: action.payload.time,
      });
    },
   //loader--------
  },
});

export const { addQuestion, addAnswer} = chatbotSlice.actions;

export default chatbotSlice.reducer;
