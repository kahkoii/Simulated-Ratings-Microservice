import { Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

interface SideNavTextLinkProps {
  to: string;
  text: string;
  icon: JSX.Element;
}

const SideNavTextLink: React.FC<SideNavTextLinkProps> = (props) => {
  const { to, text, icon } = props;
  return (
    <Flex
      width="80%"
      margin="0 20px"
      minWidth="210px"
      borderRadius={{ base: "0px", md: "12px" }}
      overflow="hidden"
      _hover={{ bg: "gray.900" }}
    >
      <NavLink
        to={to}
        style={({ isActive }) => ({
          width: "100%",
          color: isActive ? "#2d3748" : "white",
          background: isActive ? "white" : "none",
          fontSize: "28px",
          padding: "12px",
        })}
      >
        <Flex alignItems="center" paddingLeft={{ base: "8vw", md: "6px" }}>
          {icon}
          <Text fontSize="16px" marginLeft="12px">
            {text}
          </Text>
        </Flex>
      </NavLink>
    </Flex>
  );
};

export default SideNavTextLink;
