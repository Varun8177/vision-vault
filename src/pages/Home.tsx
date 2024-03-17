import { ReactElement, useContext } from "react";
import ImageUploader from "../components/Home/ImageUploader";
import Overviews from "../components/Home/Overviews";
import { DataContext } from "../contexts/DataContext";
import Spinner from "../constants/Spinner";

type Props = {};

const Home = (props: Props): ReactElement => {
  const dataContext = useContext(DataContext);

  return (
    <div className="m-auto mt-4 w-[90%] space-y-4">
      <Overviews />
      {dataContext?.loading ? (
        <Spinner />
      ) : (
        <div className="flex w-full flex-wrap justify-center gap-4 md:justify-start">
          <ImageUploader />
          {dataContext?.data &&
            dataContext?.data.map(({ imageUrl, type, name }, i) => {
              const videoUrl = imageUrl;

              return (
                <div
                  className="relative h-[100px] w-[100px] max-w-[150px] grow overflow-hidden rounded-md bg-black sm:h-[150px] sm:w-[150px]"
                  key={`${imageUrl}${i}`}
                >
                  {type.split("/")[0] === "video" ? (
                    <video
                      width="150"
                      height="150"
                      controls
                      className="h-full w-full"
                    >
                      <source src={videoUrl} type={type} />
                    </video>
                  ) : (
                    <img
                      src={imageUrl}
                      alt="post"
                      height={1080}
                      width={1349}
                      className="h-full cursor-pointer rounded-md object-contain"
                      loading="lazy"
                    />
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Home;
