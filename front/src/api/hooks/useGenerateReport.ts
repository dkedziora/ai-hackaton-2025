import useCustomQuery from "./useCustomQuery";
import BaseRepository from "../BaseRequestRepo";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { appendChat, selectSession } from "../../store/appStepSlice";
import { FetchType, Step } from "../../types/types";
import { useAppSelector } from "../../hooks/useAppSelector";

const useGenerateReport = (
  step: FetchType,
  message: string,
  nextFetch: Step | null,
  setNextFetch: (param: Step) => void
) => {
  const dispatch = useAppDispatch();
  const session = useAppSelector(selectSession);

  return useCustomQuery({
    queryKey: ["report-generation", message, step, session],
    queryFn: () => BaseRepository.reportGeneration(message, session as string),
    enabled:
      (step === "REPORT" || step === "all") &&
      !!session &&
      (nextFetch === "REPORT" || !nextFetch),
    staleTime: 0,
    onSuccess(results: string) {
      dispatch(
        appendChat({
          isUser: false,
          step: "REPORT",
          message: results,
          userMessage: message,
          dateTime: new Date().toISOString(),
        })
      );
      setNextFetch("POSTS");
    },
  });
};

export default useGenerateReport;
