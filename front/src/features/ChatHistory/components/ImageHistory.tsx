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
import ImageIcon from "@mui/icons-material/Image";
import CollectionsIcon from "@mui/icons-material/Collections";
import { selectChats } from "../../../store/appStepSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import saveFile from "../../../service/saveFile";

const ImageHistory = () => {
  const images = useAppSelector(selectChats);

  const handleClick = async (links: string[]) => {
    links.forEach(async (link) => {
      try {
        const response = await fetch(link);
        const blob = await response.blob();
        saveFile(blob, `${link}.png`);
      } catch (err) {
        console.error("Download failed", err);
      }
    });
  };
  return (
    <Box className="h-1/3 w-full bg-white">
      <Paper
        elevation={1}
        className="w-full h-20 flex justify-center items-center gap-3"
      >
        <CollectionsIcon fontSize="large" color="info" />
        <Typography variant="h5" className="text-gray-600">
          Image History
        </Typography>
      </Paper>

      <List className="top-5 max-w-5/6" sx={{ bgcolor: "background.paper" }}>
        {images.map((post) => {
          if (post.isUser || post?.step !== "IMAGES") return;
          return (
            <>
              <ListItem alignItems="center">
                <ListItemIcon>
                  <ImageIcon />
                </ListItemIcon>
                <ListItemText
                  primary={post.message!.slice(0, 32)}
                  secondary={new Date().toISOString()}
                />
                <Tooltip className="right-0" title="Open Images">
                  <IconButton
                    className="absolute top-0 right-0"
                    size="large"
                    onClick={() => handleClick(post.imageList!)}
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

export default ImageHistory;
