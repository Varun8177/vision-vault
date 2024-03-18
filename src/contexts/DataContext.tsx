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
import { useSnackbar } from "notistack";

type DataContextType = {
  data: FileDataType[];
  handleNewFileAdded: (file: FileDataType) => void;
  videoSize: number;
  imageSize: number;
  totalSize: number;
  loading: boolean;
  emptyData: () => void;
};

export const DataContext = createContext<DataContextType | null>(null);

const DataContextProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const authContext = useContext(AuthContext);
  const [files, setFiles] = useState<FileDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [videoSize, setVideoSize] = useState<number>(0);
  const [imageSize, setImageSize] = useState<number>(0);
  const [totalSize, setTotalSize] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();

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
    const totalSize = files.reduce((acc, file) => {
      const val: number = Number(acc + file.size);
      return val;
    }, 0);
    const videoSizeMB = +(videoSize / (1024 * 1024)).toFixed(1);
    const imageSizeMB = +(imageSize / (1024 * 1024)).toFixed(1);
    const totalSizeMB = +(totalSize / (1024 * 1024)).toFixed(1);

    setImageSize(imageSizeMB);
    setVideoSize(videoSizeMB);
    setTotalSize(totalSizeMB);
  };

  const getFiles = async (): Promise<void> => {
    if (authContext?.user) {
      setLoading(true);
      try {
        const res = await getDoc(doc(db, "files", authContext.user.uid));
        const file = res.data();
        if (file) {
          const temp: FileDataType[] = file.files;
          setFiles(temp);
          calculateSize(temp);
        }
      } catch (error) {
        enqueueSnackbar("Error fetching files,please try again", {
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNewFileAdded = (file: FileDataType) => {
    const temp: FileDataType[] = [file, ...files];
    setFiles(temp);
  };

  const emptyData = (): void => {
    setFiles([]);
    setImageSize(0);
    setVideoSize(0);
    setTotalSize(0);
  };
  useEffect(() => {
    getFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext?.user?.uid]);

  return (
    <DataContext.Provider
      value={{
        data: files,
        handleNewFileAdded,
        imageSize,
        videoSize,
        totalSize,
        loading,
        emptyData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
