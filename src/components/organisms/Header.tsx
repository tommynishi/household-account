import { Flex, Heading } from "@chakra-ui/react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

export const Header = memo(() => {
  const navigate = useNavigate();

  const onClickHome = () => navigate("/");

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      shadow="md"
      padding={{ base: 3, md: 5}}>
        <Flex
            align="center"
            as="a"
            mr={8}
            _hover={{cursor: "pointer"}}
            onClick={onClickHome}>
            <Heading
              as="h1"
              fontSize={{ base: "md", md: "lg" }}>
                家計簿アプリ
            </Heading>
          </Flex>
    </Flex>
  );
})