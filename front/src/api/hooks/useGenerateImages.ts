import { useAppSelector } from "../../hooks/useAppSelector";
import useCustomQuery from "./useCustomQuery";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { appendChat, selectSession } from "../../store/appStepSlice";
import { FetchType, Step } from "../../types/types";
import BaseRepository from "../BaseRequestRepo";

const useImageGenerationQuery = (
  step: FetchType,
  message: string,
  nextFetch: Step | null,
  setNextFetch: (param: Step | null) => void
) => {
  const session = useAppSelector(selectSession);
  const dispatch = useAppDispatch();
  return useCustomQuery({
    queryKey: ["imageGeneration", session, message, step],
    queryFn: () =>
      BaseRepository.ImageGenerationRequest(message, session as string),
    enabled:
      (step === "IMAGES" || step === "all") &&
      !!session &&
      (nextFetch === "IMAGES" || !nextFetch),
    onSuccess(urls: string) {
      dispatch(
        appendChat({
          isUser: false,
          step: "IMAGES",
          message: message,
          imageList: [urls],
          userMessage: message,
          dateTime: new Date().toISOString(),
        })
      );
      setNextFetch(null);
    },
  });
};

export default useImageGenerationQuery;
