import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Searchbar from "../components/Searchbar";

const Layout: React.FC = () => (
  <Flex h="100vh" flexDirection="column">
    <Flex
      flexDirection="column"
      flexGrow={1}
      bg="neutral.100"
      alignItems="center"
    >
      <Searchbar />
      <Outlet />
    </Flex>
  </Flex>
);

export default Layout;
