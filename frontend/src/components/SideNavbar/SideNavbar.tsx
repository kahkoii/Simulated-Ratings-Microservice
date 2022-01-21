import { useState } from "react";
import { Flex, Text, Avatar } from "@chakra-ui/react";
import { FaPowerOff } from "react-icons/fa";
import Hamburger from "hamburger-react";
import SideNavIconLink from "./SideNavIconLink";
import SideNavTextLink from "./SideNavTextLink";

interface SideNavbarProps {
  // Page Name, URL, Icon Component
  locations: [string, string, JSX.Element][];
}

const SideNavbar: React.FC<SideNavbarProps> = (props) => {
  const { locations } = props;
  const [isMenuOpen, setMenuState] = useState(false);
  // PLACEHOLDER VALUES
  const name = "T024681012";

  // TODO
  const power = (): void => {
    // eslint-disable-next-line no-console
    console.log("power button clicked");
  };

  return !isMenuOpen ? (
    // Closed Navbar
    <Flex
      bgColor="gray.700"
      position="fixed"
      minWidth="70px"
      alignItems="center"
      flexDirection={{ base: "row", md: "column" }}
      height={{ base: "auto", md: "100%" }}
      width={{ base: "100%", md: "auto" }}
      zIndex="10"
    >
      {/* Hamburger Container */}
      <Flex
        margin={{ base: "0", md: "20px 0px 28px 0px" }}
        position={{ base: "absolute", md: "static" }}
        right={{ base: "4vw", md: "auto" }}
      >
        <Hamburger
          color="#fff"
          rounded
          toggled={isMenuOpen}
          toggle={setMenuState}
          label="Show Menu"
          hideOutline={false}
        />
      </Flex>
      {/* Icon Links Container */}
      <Flex
        flexDirection={{ base: "row", md: "column" }}
        margin-top="30px"
        gridGap="16px"
        role="group"
        alignItems="center"
        display={{ base: "none", md: "flex" }}
      >
        {Array.from(locations, ([pageName, endpoint, component], index) => (
          <SideNavIconLink
            key={index}
            to={endpoint}
            tooltipMsg={pageName}
            icon={component}
          />
        ))}
      </Flex>
      {/* Bottom Section Container */}
      <Flex
        marginTop="auto"
        marginBottom="0"
        width={{ base: "auto", md: "100%" }}
        justifyContent="center"
      >
        <Flex
          margin={{ base: "10px 16px", md: "18px 14px" }}
          bgColor="gray.600"
          padding="10px"
          borderRadius="12px"
          cursor="pointer"
          onClick={power}
          _hover={{
            bgColor: "gray.400",
          }}
        >
          <FaPowerOff color="white" size="26px" />
        </Flex>
      </Flex>
    </Flex>
  ) : (
    // Opened Navbar
    <Flex
      flexDirection="column"
      bgColor="gray.700"
      position="fixed"
      height="100%"
      alignItems="center"
      width={{ base: "100%", md: "auto" }}
      zIndex="10"
    >
      {/* Hamburger Container */}
      <Flex
        margin="20px 0px 28px 0px"
        marginRight={{ md: "62px" }}
        gridGap="12px"
      >
        <Flex position="absolute" right={{ base: "4vw", md: "10px" }}>
          <Hamburger
            color="#fff"
            rounded
            toggled={isMenuOpen}
            toggle={setMenuState}
            label="Show Menu"
            hideOutline={false}
          />
        </Flex>
      </Flex>
      {/* Text Links Container */}
      <Flex
        flexDirection="column"
        gridGap="16px"
        marginTop="48px"
        role="group"
        alignItems="center"
        width={{ base: "100%", md: "auto" }}
      >
        {Array.from(locations, ([pageName, endpoint, component], index) => (
          <SideNavTextLink
            key={index}
            to={endpoint}
            text={pageName}
            icon={component}
          />
        ))}
      </Flex>
      {/* Bottom User Section Container */}
      <Flex
        marginTop="auto"
        marginBottom="0"
        width="100%"
        bgColor="gray.600"
        padding="18px 12px"
        alignItems="center"
      >
        <Avatar
          name={name}
          alt="Profile Picture"
          boxSize="38px"
          borderRadius="30px"
          marginLeft={{ base: "3vw", md: "0" }}
        />
        <Flex
          flexDirection="column"
          justifyContent="center"
          color="white"
          margin="0px 8px"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          <Text fontSize="13px">{name}</Text>
          <Text fontSize="10px" fontWeight="semibold">
            Student
          </Text>
        </Flex>
        <Flex
          margin="0 0 0 auto"
          padding="10px"
          borderRadius="12px"
          cursor="pointer"
          onClick={power}
          _hover={{
            bgColor: "gray.400",
          }}
        >
          <FaPowerOff color="white" size="26px" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideNavbar;
