import { Box, CircularProgress, Skeleton } from "@mui/material";

const ChatLoader = () => {
  return (
    <Box className="max-w-2/3 h-72 relative flex justify-center items-center">
      <Skeleton
        variant="rectangular"
        className="min-w-full min-h-full absolute"
      />
      <CircularProgress size={40} />
    </Box>
  );
};

export default ChatLoader;
