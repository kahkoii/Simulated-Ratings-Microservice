import { Flex, Text, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Searchbar: React.FC = () => {
  const [searchField, setSearchField] = useState("");
  const navigate = useNavigate();

  const search = (): void => {
    navigate(searchField);
  };
  return (
    <Flex
      marginTop="20px"
      justifyContent="center"
      alignItems="center"
      padding="20px"
      borderRadius="30px"
      boxShadow="md"
      width="60vw"
      bgColor="lightblue"
    >
      <Text marginRight="12px">Search:</Text>
      <Input
        value={searchField}
        onChange={(val) => setSearchField(val.currentTarget.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            search();
          }
        }}
        type="string"
        placeholder="Student ID"
        bgColor="white"
      />
    </Flex>
  );
};

export default Searchbar;
