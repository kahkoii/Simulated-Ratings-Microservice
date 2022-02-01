import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { VscFeedback } from "react-icons/vsc";
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
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
