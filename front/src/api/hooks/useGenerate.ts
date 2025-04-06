import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  appendChat,
  selectIsFetch,
  selectUserMessage,
} from "../../store/appStepSlice";
import useGeneratePost from "./useGeneratePost";
import useGenerateReport from "./useGenerateReport";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import useImageGenerationQuery from "./useGenerateImages";
import { Step } from "../../types/types";

const useGenerate = () => {
  const fetchStep = useAppSelector(selectIsFetch);
  const dispatch = useAppDispatch();
  const [nextFetch, setNextFetch] = useState<Step>("REPORT");

  const message = useAppSelector(selectUserMessage);

  useEffect(() => {
    if (message && fetchStep !== "none") {
      dispatch(
        appendChat({
          isUser: true,
          message: message,
          userMessage: message,
          dateTime: new Date().toISOString(),
        })
      );
    }
  }, [message, fetchStep]);

  const reportQuery = useGenerateReport(
    fetchStep,
    message,
    nextFetch,
    setNextFetch
  );
  const postQuery = useGeneratePost(
    fetchStep,
    message,
    nextFetch,
    setNextFetch
  );
  const imageQuery = useImageGenerationQuery(fetchStep, message, nextFetch);

  return {
    isError: postQuery.isError || reportQuery.isError || imageQuery.isError,
    isLoading:
      postQuery.isLoading || reportQuery.isLoading || imageQuery.isLoading,
  };
};

export default useGenerate;
