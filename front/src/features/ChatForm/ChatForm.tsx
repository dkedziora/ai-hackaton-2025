import { Box, Button, TextField } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  clearChat,
  enableFetch,
  selectRetryData,
  setRetryData,
  setUserMessage,
} from "../../store/appStepSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { FetchType } from "../../types/types";

const ChatForm = () => {
  const [message, setMessage] = useState<string>("");
  const dispatch = useAppDispatch();
  const retryData = useAppSelector(selectRetryData);
  const [step, setStep] = useState<FetchType>("all");

  useEffect(() => {
    if (retryData) {
      setMessage(retryData.message);
      setStep(retryData.step);
    }
  }, [retryData?.message, retryData?.step]);

  const handleSubmit = useCallback(() => {
    dispatch(setUserMessage(message));
    dispatch(enableFetch(step));
    setMessage("");
    dispatch(setRetryData(undefined));
  }, [message, step]);

  const handleClear = useCallback(() => {
    dispatch(clearChat());
  }, []);

  return (
    <Box className="bottom-5 w-5/6 h-fit left-1/12 z-50 flex gap-1 items-end bg-white">
      <TextField
        className="w-full bottom-0"
        multiline
        minRows={2}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        className="h-20 w-28 border bg-white"
        component="label"
        onClick={handleSubmit}
        variant="contained"
        disabled={!message}
        tabIndex={-1}
        startIcon={<AutoAwesomeIcon />}
      >
        Ask
      </Button>
      <Button
        className="h-20 w-40 border bg-white"
        component="label"
        onClick={handleClear}
        variant="contained"
        color="error"
        tabIndex={-1}
        startIcon={<CleaningServicesIcon />}
      >
        Clear All
      </Button>
    </Box>
  );
};

export default ChatForm;
