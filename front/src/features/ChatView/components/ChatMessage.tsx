import { Box, CardMedia } from "@mui/material";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import RetryButton from "./RetryButton";
import { Chat } from "../../../types/types";

const ChatMessage = ({ isUser, message, step, imageList }: Chat) => {
  return (
    <Box
      className={`${
        isUser
          ? "bg-blue-500/80 self-end max-w-1/2"
          : "bg-gray-300 self-start max-w-2/3"
      } w-fit h-fit relative flex flex-col rounded p-4`}
    >
      <Box
        className={`prose whitespace-pre-wrap [&_table]:w-full [&_th]:border [&_td]:p-1 [&_th]:p-1`}
      >
        {isUser ? (
          message
        ) : step !== "IMAGES" ? (
          <Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>
        ) : (
          <Box className="flex items-center gap-2 h-full w-full">
            {imageList?.map((img) => (
              <CardMedia
                className="h-60 flex justify-center items-center object-cover"
                component="img"
                image={img}
                alt="AI generated Image"
              />
            ))}
          </Box>
        )}
      </Box>
      {step && (
        <Box className="self-end mt-1">
          <RetryButton step={step} />
        </Box>
      )}
    </Box>
  );
};

export default ChatMessage;
