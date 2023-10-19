import { useEffect, useState } from "react";
import TopLoading from "react-top-loading-bar";
const LoadingBar = ({ loading }: { loading: boolean }) => {
  const [progress, setProgress] = useState<number>();

  useEffect(() => {
    if (loading) setProgress(30);
    else setProgress(100);
  }, [loading]);
  return (
    <TopLoading
      color="#f119"
      progress={progress}
      shadow={true}
      height={4}
      onLoaderFinished={() => progress}
    />
  );
};

export default LoadingBar;
