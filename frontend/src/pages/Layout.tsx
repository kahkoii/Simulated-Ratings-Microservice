import { Flex, Text, Button } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { VscFeedback } from "react-icons/vsc";
import { Oval } from "react-loading-icons";
import Searchbar from "../components/Searchbar/Searchbar";
import SideNavbar from "../components/SideNavbar/SideNavbar";

interface Props {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

const Layout: React.FC<Props> = (props) => {
  const { userId, setUserId } = props;
  const locations: [string, string, JSX.Element][] = [
    // Params: Page Name, Endpoint, Icon
    ["Feedback", "/feedback", <VscFeedback />],
  ];

  let mainBody;
  if (userId === "") {
    mainBody = (
      <Flex flexDir="column" alignItems="center" paddingTop="220px">
        <Oval stroke="#2176FF" height="80px" width="80px" />
        <Text color="#2176FF" marginTop="12px">
          Loading
        </Text>
      </Flex>
    );
  } else if (userId === "-1") {
    mainBody = (
      <Flex flexDir="column" alignItems="center" paddingTop="220px">
        <Text fontSize="20px">ERROR WITH LOGIN CREDENTIALS</Text>
        <Button
          colorScheme="teal"
          marginTop="12px"
          onClick={() => window.open("http://10.31.11.11:8090", "_self")}
        >
          Return to Login
        </Button>
      </Flex>
    );
  } else {
    mainBody = <Outlet />;
  }

  return (
    <Flex h="100vh">
      <SideNavbar locations={locations} />
      <Flex
        justifyContent="center"
        alignItems="center"
        paddingLeft="74px"
        height="100%"
        width="100%"
        maxW="100vw"
        maxH="100vh"
      >
        <Flex
          flexDir="column"
          height="94%"
          width="94%"
          borderRadius="20px"
          boxShadow="xl"
          bgColor="#f5f5f5"
          padding="30px"
        >
          <Searchbar userId={userId} setUserId={setUserId} />
          {mainBody}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
