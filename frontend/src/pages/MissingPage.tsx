import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const MissingPage: React.FC = () => {
  const navigate = useNavigate();
  const prevPage = (): void => {
    navigate(-1);
  };

  return (
    <>
      <h1>The page you are looking for does not exist</h1>
      <Button onClick={prevPage}>Go Back</Button>
    </>
  );
};

export default MissingPage;
