import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import SummarizeIcon from "@mui/icons-material/Summarize";
import DescriptionIcon from "@mui/icons-material/Description";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectChats } from "../../../store/appStepSlice";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import saveFile from "../../../service/saveFile";

const ReportHistory = () => {
  const reports = useAppSelector(selectChats);

  const handleDownload = (message: string, title: string) => {
    saveFile(message, title);
  };

  return (
    <Box className="h-1/3 w-full bg-white border-b border-gray-200">
      <Paper
        elevation={1}
        className="w-full h-20 flex justify-center items-center gap-3"
      >
        <DescriptionIcon fontSize="large" color="info" />
        <Typography variant="h5" className="text-gray-600">
          Report History
        </Typography>
      </Paper>

      <List
        className="top-5 w-full h-2/3 overflow-y-auto"
        sx={{ bgcolor: "background.paper" }}
      >
        {reports.map((report) => {
          if (report.isUser || report?.step !== "REPORT") return;
          return (
            <>
              <ListItem alignItems="center">
                <ListItemIcon>
                  <SummarizeIcon />
                </ListItemIcon>
                <ListItemText
                  primary={report.message!.slice(0, 32)}
                  secondary={new Date().toISOString()}
                />
                <Tooltip className="right-0" title="Download">
                  <IconButton
                    className="absolute top-0 right-0"
                    size="large"
                    onClick={() =>
                      handleDownload(
                        report.message!,
                        `${report.dateTime}_report`
                      )
                    }
                  >
                    <DownloadForOfflineIcon />
                  </IconButton>
                </Tooltip>
              </ListItem>

              <Divider variant="inset" component="li" />
            </>
          );
        })}
      </List>
    </Box>
  );
};

export default ReportHistory;
