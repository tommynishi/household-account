import { Box, Flex, Heading, Input, Stack } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { PrimaryButton } from "../atom/PrimaryButton"

export const Login =  () => {

  const [userId, setUserId] = useState<string>('');
  const { login } = useAuth();

  /**
   * 入力値のstate保管
   * @param e 入力param
   */
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  /**
   * ログイン処理
   */
  const onLogin = () => login(userId);

  return (
    <Flex
      align="center"
      justify="center"
      height="sm" >
      <Box
        w="sm"
        bg="white"
        border="2px"
        borderColor="green.600"
        >
        <Heading
          as="h1"
          size="lg"
          bg="green.200"
          >
          認証画面
        </Heading>
        <Stack
          px={8}
          py={3}
          spacing={3}>
          <Input
            bg="white"
            borderColor="green"
            placeholder="ユーザID"
            onChange={onInputChange}
            value={userId}
            />
          <PrimaryButton
            isDisabled={userId===''}
            onClick={onLogin}>
            ログイン
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
}