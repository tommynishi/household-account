import { Checkbox, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ChangeEvent, FC, memo } from "react";

type Data = {
  id: number,
  type: string,
  item: string,
  mny: number,
}

type Props = {
  data: Data[],
  onChangeCheck: (e:ChangeEvent<HTMLInputElement>) => void,
}


export const PartDataTable :FC<Props> = memo((props) => {
  const {data, onChangeCheck} = props;

  return (
    <TableContainer>
      <Table
        variant='simple'>
        <Thead>
          <Tr>
            <Th
              bgColor="gray.400"
              fontSize="lg">選択</Th>
            <Th
              bgColor="gray.400"
              fontSize="lg">No.</Th>
            <Th
              bgColor="gray.400"
              fontSize="lg">種類</Th>
            <Th
              bgColor="gray.400"
              fontSize="lg">項目</Th>
            <Th
              bgColor="gray.400"
              fontSize="lg"
              isNumeric>金額</Th>
            <Th
              bgColor="gray.400"
              fontSize="lg">どっちが負担</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((d: Data) => (
            <Tr key={d.id} borderBottom="2px" borderColor="teal.700">
              <Td><Checkbox
                      size="md"
                      value={d.id}  
                      onChange={(e) => onChangeCheck(e)}/></Td>
              <Td>{d.id}</Td>
              <Td>{d.type}</Td>
              <Td>{d.item}</Td>
              <Td isNumeric>{d.mny}</Td>
              <Td>秋穂</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
});