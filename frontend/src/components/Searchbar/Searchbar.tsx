import {
  Flex,
  InputGroup,
  Input,
  Select,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoSearch, GoCheck } from "react-icons/go";

interface Props {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

const Searchbar: React.FC<Props> = (props) => {
  const [searchField, setSearchField] = useState("");
  const [type, setType] = useState("student");
  const navigate = useNavigate();

  const { userId, setUserId } = props;
  const [demoId, setDemoId] = useState(userId);

  const search = (): void => {
    if (searchField === "" || type === "student") {
      navigate(searchField);
    } else {
      navigate(`${type}/${searchField}`);
    }
  };

  return (
    <Flex alignItems="center">
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
            placeholder={`Search for a ${type}`}
            marginRight="10px"
            bgColor="white"
          />
          <Select
            width="30%"
            bgColor="white"
            marginRight="14px"
            onChange={(e) => {
              setType(e.currentTarget.value);
            }}
          >
            <option value="student">Student</option>
            <option value="module">Module</option>
            <option value="class">Class</option>
          </Select>
          <IconButton
            onClick={() => search()}
            aria-label="Search"
            icon={<GoSearch />}
          />
        </InputGroup>
      </Flex>
      {/* Demo Feature */}
      <Flex flexDir="column" marginLeft="400px">
        <Text>[Demo] Set Student ID:</Text>
        <Flex>
          <Input
            value={demoId}
            onChange={(e) => setDemoId(e.target.value)}
            bgColor="grey"
            width="166px"
            color="white"
          />
          <IconButton
            onClick={() => {
              setUserId(demoId);
              alert(`DEMO: USER ID SET TO ${demoId}`);
            }}
            aria-label="Set User ID"
            icon={<GoCheck />}
            marginLeft="6px"
            variant="ghost"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Searchbar;
