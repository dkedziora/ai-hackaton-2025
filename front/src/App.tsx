import { Backdrop, Box, Typography } from "@mui/material";
import ChatHistory from "./features/ChatHistory/ChatHistory";
import ChatView from "./features/ChatView/ChatView";
import ChatForm from "./features/ChatForm/ChatForm";
import useNewChatSession from "./api/hooks/useNewChat";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const { isLoading } = useNewChatSession();
  return (
    <Box className="w-full h-screen flex">
      <Backdrop
        sx={(theme) => ({ color: "#bbb", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h4" className="pl-5">
          Application Loading
        </Typography>
      </Backdrop>

      <Box className="h-screen w-1/6 bg-amber-200">
        <ChatHistory />
      </Box>
      <Box className="h-screen w-5/6 relative">
        <ChatView />
        <Box className="absolute bottom-0 pb-5 py-2 border-t border-gray-200 w-full flex justify-center h-fit z-50 bg-white">
          <ChatForm />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
