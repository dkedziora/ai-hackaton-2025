import { Provider } from "react-redux";
import { store } from "../store/store";
import { StyledEngineProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../api/queryClient";
import App from "../App";

const AppProviders = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default AppProviders;
