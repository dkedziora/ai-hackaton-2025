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
import NewspaperIcon from "@mui/icons-material/Newspaper";
import TagIcon from "@mui/icons-material/Tag";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectChats } from "../../../store/appStepSlice";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import saveFile from "../../../service/saveFile";

const PostsHistory = () => {
  const posts = useAppSelector(selectChats);

  const handleDownload = (message: string, title: string) => {
    saveFile(message, title);
  };

  return (
    <Box className="h-1/3 w-full bg-white border-b border-gray-200">
      <Paper
        elevation={1}
        className="w-full h-20 flex justify-center items-center gap-3"
      >
        <TagIcon fontSize="large" color="info" />
        <Typography variant="h5" className="text-gray-600">
          Posts History
        </Typography>
      </Paper>

      <List className="top-5 max-w-5/6" sx={{ bgcolor: "background.paper" }}>
        {posts.map((post) => {
          if (post.isUser || post?.step !== "POSTS") return;
          return (
            <>
              <ListItem alignItems="center">
                <ListItemIcon>
                  <NewspaperIcon />
                </ListItemIcon>
                <ListItemText
                  primary={post.message!.slice(0, 32)}
                  secondary={new Date().toISOString()}
                />
                <Tooltip className="right-0" title="Download">
                  <IconButton
                    className="absolute top-0 right-0"
                    size="large"
                    onClick={() =>
                      handleDownload(post.message!, `${post.dateTime}_posts`)
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

export default PostsHistory;
