import useCustomQuery from "./useCustomQuery";
import BaseRepository from "../BaseRequestRepo";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { appendChat, selectSession } from "../../store/appStepSlice";
import { FetchType } from "../../types/types";
import { useAppSelector } from "../../hooks/useAppSelector";

const useGenerateReport = (step: FetchType, message: string) => {
  const dispatch = useAppDispatch();
  const session = useAppSelector(selectSession);

  return useCustomQuery({
    queryKey: ["report-generation", message, step, session],
    queryFn: () => BaseRepository.reportGeneration(message, session as string),
    enabled: (step === "REPORT" || step === "all") && !!session,
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
    },
  });
};

export default useGenerateReport;
