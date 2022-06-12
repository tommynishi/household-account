import { Button } from "@chakra-ui/react"
import { FC, memo } from "react";

type Props = {
  // children: string;
  isDisabled: boolean;
  onClick: () => void;
  side: string;
  date: number;
};

export const DateButton: FC<Props> = memo((props) => {
  return (
    <Button
      fontSize="2rem"
      bg="gray.400"
      color="red.500"
      _hover={{ opacity: 0.7 }}
      size="md"
      w="84px"
      disabled={props.isDisabled}
      onClick={props.onClick}
    >
      {props.date + '月'}
    </Button>
  );
});