import { Button } from "@chakra-ui/react"
import { FC, memo } from "react";

type Props = {
  children: string;
  isDisabled: boolean;
  onClick: () => void;
};


export const PrimaryButton: FC<Props> = memo((props) => {
  return (
    <Button
      bg="green.800"
      color="white"
      _hover={{ opacity: 0.7 }}
      borderRadius="15"
      size="md"
      w="84px"
      disabled={props.isDisabled}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
});