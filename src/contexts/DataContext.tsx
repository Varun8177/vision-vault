import {
  createContext,
  useContext,
  useState,
  ReactElement,
  useEffect,
} from "react";
import { FileDataType } from "../utils/types";
import { AuthContext } from "./AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

type DataContextType = {
  data: FileDataType[];
  handleNewFileAdded: (file: FileDataType) => void;
  videoSize: number;
  imageSize: number;
};

export const DataContext = createContext<DataContextType | null>(null);

const DataContextProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const authContext = useContext(AuthContext);
  const [files, setFiles] = useState<FileDataType[]>([]);
  const [videoSize, setVideoSize] = useState<number>(0);
  const [imageSize, setImageSize] = useState<number>(0);

  const calculateSize = (files: FileDataType[]) => {
    const videoSize = files.reduce((acc, file) => {
      if (file.type.split("/")[0] === "video") {
        const val: number = Number(acc + file.size);
        return val;
      }
      return acc;
    }, 0);

    const imageSize = files.reduce((acc, file) => {
      if (file.type.split("/")[0] !== "video") {
        const val: number = Number(acc + file.size);
        return val;
      }
      return acc;
    }, 0);
    const videoSizeGB = +(videoSize / (1024 * 1024)).toFixed(1);
    const imageSizeGB = +(imageSize / (1024 * 1024)).toFixed(1);

    setImageSize(imageSizeGB);
    setVideoSize(videoSizeGB);
  };

  const getFiles = async (): Promise<void> => {
    if (authContext?.user) {
      try {
        const res = await getDoc(doc(db, "files", authContext.user.uid));
        const file = res.data();
        if (file) {
          const temp: FileDataType[] = file.files;
          setFiles(temp);
          calculateSize(temp);
        } else {
          console.log("No files found for the user");
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    } else {
      console.log("No user");
    }
  };

  const handleNewFileAdded = (file: FileDataType) => {
    const temp: FileDataType[] = [file, ...files];
    setFiles(temp);
  };

  useEffect(() => {
    getFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext]);

  return (
    <DataContext.Provider
      value={{ data: files, handleNewFileAdded, imageSize, videoSize }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
