import { Flex, Text } from "@chakra-ui/react";
import { useParams, Outlet } from "react-router-dom";
import { VscFeedback } from "react-icons/vsc";
import Searchbar from "../components/Searchbar/Searchbar";
import SideNavbar from "../components/SideNavbar/SideNavbar";

const Layout: React.FC = () => {
  const { studentId } = useParams<{ studentId?: string }>();
  const locations: [string, string, JSX.Element][] = [
    // Params: Page Name, Endpoint, Icon
    ["Feedback", "/feedback", <VscFeedback />],
  ];
  return (
    <Flex h="100vh">
      <SideNavbar locations={locations} />
      <Flex
        justifyContent="center"
        alignItems="center"
        marginTop={{ base: "66px", md: "0" }}
        marginLeft={{ base: "0", md: "74px" }}
        w="100%"
        h="100%"
      >
        <Flex
          flexDir="column"
          height="88%"
          width="80%"
          borderRadius="20px"
          boxShadow="xl"
          bgColor="#f5f5f5"
          padding="30px"
        >
          <Searchbar />
          <Text
            fontWeight="semibold"
            fontSize="3xl"
            margin="16px"
            marginLeft="0"
          >
            {studentId === undefined
              ? "My Feedback"
              : `Student ${studentId}'s Feedback`}
          </Text>
          <Flex height="100%" width="100%">
            <Outlet />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
