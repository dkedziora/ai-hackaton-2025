import { saveAs } from "file-saver";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saveFile = (data: any, title: string) => {
  const blob = new Blob([data], {
    type: "text/plain;charset=utf-8",
  });

  saveAs(blob, title);
};

export default saveFile;
