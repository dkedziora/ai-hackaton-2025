import { Box } from "@mui/material";
import ReportHistory from "./components/ReportHistory";
import PostsHistory from "./components/PostsHistory";
import ImageHistory from "./components/ImageHistory";

const ChatHistory = () => {
  return (
    <Box className="h-full w-full">
      <ReportHistory />
      <PostsHistory />
      <ImageHistory />
    </Box>
  );
};

export default ChatHistory;
