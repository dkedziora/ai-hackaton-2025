import useCustomQuery from "./useCustomQuery";
import BaseRepository from "../BaseRequestRepo";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  appendChat,
  selectRetryData,
  selectSession,
} from "../../store/appStepSlice";
import { FetchType, Step } from "../../types/types";
import { useAppSelector } from "../../hooks/useAppSelector";

const useGeneratePost = (
  step: FetchType,
  message: string,
  nextFetch: Step | null,
  setNextFetch: (param: Step) => void
) => {
  const dispatch = useAppDispatch();
  const session = useAppSelector(selectSession);
  const retry = useAppSelector(selectRetryData);

  return useCustomQuery({
    queryKey: ["post-generation", message, step, session],
    queryFn: () => BaseRepository.postGeneration(message, session as string),
    enabled:
      ((step === "POSTS" || step === "all") && !!session) ||
      nextFetch === "POSTS",
    staleTime: 0,
    onSuccess(results: string) {
      dispatch(
        appendChat({
          isUser: false,
          step: "POSTS",
          message: results,
          userMessage: message,
          dateTime: new Date().toISOString(),
        })
      );
      if (retry !== null) setNextFetch("IMAGES");
    },
  });
};

export default useGeneratePost;
