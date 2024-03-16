import { ChangeEvent, useContext, useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { IoAdd } from "react-icons/io5";
import UploaderOverlay from "./UploaderOverlay";
import Spinner from "../../constants/Spinner";
import { useSnackbar } from "notistack";
import { DataContext } from "../../contexts/DataContext";

const ImageUploader = () => {
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const [progress, setProgress] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileUpload = (file: any) => {
    setLoading(true);
    const data = {
      name: file.name,
      size: file.size,
      type: file.type,
      imageUrl: "",
    };
    const storageRef = ref(storage, data.name);
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: "video/mp4",
    });
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(() => progress);
      },
      (error) => {
        setLoading(false);
        enqueueSnackbar("something went wrong, please try again", {
          variant: "error",
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          data.imageUrl = downloadURL;
          console.log({ downloadURL });
          await updateDoc(doc(db, "files", authContext?.user?.uid), {
            files: arrayUnion(data),
          });
          enqueueSnackbar("file has been successfully uploaded", {
            variant: "success",
          });
          if (dataContext) {
            dataContext.handleNewFileAdded(data);
          }
          setLoading(false);
        });
      },
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files;
    if (selectedFile?.length) {
      handleFileUpload(selectedFile[0]);
    }
  };
  return (
    <div className="h-[150px] w-full md:max-w-[150px]">
      <input
        type="file"
        name="imageuploader2"
        id="imageuploader2"
        className="hidden disabled:cursor-not-allowed"
        onChange={handleChange}
        disabled={loading}
        accept="image/*, video/*"
      />
      <label htmlFor="imageuploader2">
        <div className="relative flex h-full w-full  grow cursor-pointer flex-col items-center justify-center gap-4 rounded-md border border-blue-500 p-4 text-center">
          {loading ? (
            <Spinner />
          ) : (
            <IoAdd size={30} className="text-blue-500" />
          )}
          <p className="text-sm">
            {loading
              ? `${progress.toFixed(1)}% uploaded`
              : "click here to add images/videos"}
          </p>
          {loading && <UploaderOverlay />}
        </div>
      </label>
    </div>
  );
};

export default ImageUploader;
