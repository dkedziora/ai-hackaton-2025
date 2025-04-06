import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../types/store.types";
import { Chat, FetchType, RetryType, Step } from "../types/types";

// Define a type for the slice state
interface AppStep {
  session: string | undefined;
  chats: Chat[];
  isFetch: FetchType;
  userMessage: string;
  retryData: RetryType | undefined;
}

// Define the initial state using that type
const initialState: AppStep = {
  session: undefined,
  chats: [],
  isFetch: "none",
  userMessage: "",
  retryData: undefined,
};

// Add the function reducer that modify the properties
export const appStepSlice = createSlice({
  name: "appStep",
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<string>) => {
      return { ...state, session: action.payload };
    },
    appendChat: (
      state,
      action: PayloadAction<Chat & { userMessage: string }>
    ) => {
      return { ...state, chats: [...state.chats, action.payload] };
    },
    enableFetch: (state, action: PayloadAction<Step | "all" | "none">) => {
      return { ...state, isFetch: action.payload };
    },
    setUserMessage: (state, action: PayloadAction<string>) => {
      return { ...state, userMessage: action.payload };
    },
    clearChat: () => {
      return initialState;
    },
    setRetryData: (state, action: PayloadAction<RetryType | undefined>) => {
      return { ...state, retryData: action.payload };
    },
  },
});

// Exporting the reducers
export const {
  addSession,
  appendChat,
  setUserMessage,
  enableFetch,
  clearChat,
  setRetryData,
} = appStepSlice.actions;

// List of selectors
export const selectChats = (state: RootState) => state.appSteps.chats;
export const selectIsFetch = (state: RootState) => state.appSteps.isFetch;
export const selectUserMessage = (state: RootState) =>
  state.appSteps.userMessage;
export const selectRetryData = (state: RootState) => state.appSteps.retryData;
export const selectSession = (state: RootState) => state.appSteps.session;

// export the reducer as default
export default appStepSlice.reducer;
