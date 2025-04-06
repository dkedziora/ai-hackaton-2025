import { Box } from "@mui/material";
import ChatMessage from "./components/ChatMessage";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectChats } from "../../store/appStepSlice";
import ChatLoader from "../../components/ChatLoader";
import useGenerate from "../../api/hooks/useGenerate";
import useChatGreeting from "../../api/hooks/useChatGreeting";

const ChatView = () => {
  const { isLoading } = useGenerate();
  const { isLoading: isLoadingGreeting } = useChatGreeting();
  const chats = useAppSelector(selectChats);
  return (
    <Box className="h-screen w-full p-14 pb-32 border-l border-gray-200 flex flex-col overflow-y-auto gap-4">
      {chats.map((chat, index) => (
        <ChatMessage {...chat} key={index} />
      ))}
      {(isLoading || isLoadingGreeting) && <ChatLoader />}
    </Box>
  );
};

export default ChatView;
