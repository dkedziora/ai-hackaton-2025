import useCustomQuery from "./useCustomQuery";
import BaseRepository from "../BaseRequestRepo";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addSession, selectSession } from "../../store/appStepSlice";
import { useAppSelector } from "../../hooks/useAppSelector";

const useNewChatSession = () => {
  const dispatch = useAppDispatch();
  const session = useAppSelector(selectSession);
  return useCustomQuery({
    queryKey: ["new-session", session],
    queryFn: () => BaseRepository.getSession(),
    enabled: session === undefined,
    onSuccess(data) {
      dispatch(addSession(data));
    },
  });
};

export default useNewChatSession;
