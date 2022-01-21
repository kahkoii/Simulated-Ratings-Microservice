import { Flex, InputGroup, Input, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";

const Searchbar: React.FC = () => {
  const [searchField, setSearchField] = useState("");
  const navigate = useNavigate();

  const search = (): void => {
    navigate(searchField);
  };
  return (
    <Flex
      marginLeft="-30px"
      justifyContent="center"
      alignItems="center"
      padding="12px 30px"
      borderRadius="0px 30px 30px 0px"
      boxShadow="md"
      width="60%"
      bgColor="#2176FF"
    >
      <InputGroup>
        <Input
          value={searchField}
          onChange={(val) => setSearchField(val.currentTarget.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              search();
            }
          }}
          type="string"
          placeholder="Search for Student ID"
          marginRight="20px"
          bgColor="white"
        />
        <IconButton
          onClick={() => search()}
          aria-label="Search"
          icon={<GoSearch />}
        />
      </InputGroup>
    </Flex>
  );
};

export default Searchbar;
