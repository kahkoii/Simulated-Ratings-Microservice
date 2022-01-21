import { Flex, Tooltip } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

interface SideNavIconLinkProps {
  to: string;
  icon: JSX.Element;
  tooltipMsg?: string;
}

const SideNavIconLink: React.FC<SideNavIconLinkProps> = (props) => {
  const { to, tooltipMsg, icon } = props;
  return (
    <Flex borderRadius="12px" overflow="hidden" _hover={{ bg: "gray.900" }}>
      <Tooltip
        hasArrow
        bg="gray.300"
        color="black"
        label={tooltipMsg}
        placement="right"
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
          {icon}
        </NavLink>
      </Tooltip>
    </Flex>
  );
};

export default SideNavIconLink;
