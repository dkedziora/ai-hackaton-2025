import useCustomQuery from "./useCustomQuery";
import BaseRepository from "../BaseRequestRepo";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { appendChat, selectSession } from "../../store/appStepSlice";
import { useAppSelector } from "../../hooks/useAppSelector";

const useChatGreeting = () => {
  const dispatch = useAppDispatch();
  const session = useAppSelector(selectSession);

  return useCustomQuery({
    queryKey: ["chat-greeting", session],
    queryFn: () => BaseRepository.chatGreeting(session as string),
    enabled: !!session,
    onSuccess(results: string) {
      dispatch(
        appendChat({
          isUser: false,
          message: results,
          userMessage: results,
        })
      );
    },
  });
};

export default useChatGreeting;
