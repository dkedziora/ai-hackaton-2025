import { IconButton, Tooltip } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { Step } from "../../../types/types";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectUserMessage, setRetryData } from "../../../store/appStepSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useCallback } from "react";

const RetryButton = ({ step }: { step: Step }) => {
  const userMessage = useAppSelector(selectUserMessage);
  const dispatch = useAppDispatch();

  const handleRetry = useCallback(() => {
    dispatch(
      setRetryData({
        message: userMessage,
        step: step,
      })
    );
  }, [userMessage, step]);

  return (
    <Tooltip title="Retry">
      <IconButton
        className="absolute top-0 right-0"
        size="large"
        onClick={handleRetry}
      >
        <ReplayIcon />
      </IconButton>
    </Tooltip>
  );
};

export default RetryButton;
