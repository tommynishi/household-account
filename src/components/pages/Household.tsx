import {HStack, Box, Flex, Input, Select, Spacer, Stat, StatLabel, StatNumber } from "@chakra-ui/react"
import { ChangeEvent, FC, memo, useState } from "react"
import { PrimaryButton } from "../atom/PrimaryButton"
import { DataTable } from "../organisms/DataTables";
import { Header } from "../organisms/Header";

type Data = {
  id: number,
  type: string,
  item: string,
  mny: number,
}

const sample = [
  {
    id: 1,
    type: "食費",
    item: "外で食べた",
    mny: 10000,
  },
  {
    id: 2,
    type: "日用品",
    item: "化粧道具",
    mny: 10000,
  }
];

export const Household: FC = memo(() => {

  const [type, setType] = useState<string>('食費')
  const [item, setItem] = useState<string>('');
  const [mny, setMny] = useState<number>(0);
  const [data, setData] = useState<Array<Data>>(sample);
  const [checkId, setCheckId] = useState<Array<number>>([]);
  
  const onChangeType = (e:ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value)};
  const onChangeItem = (e:ChangeEvent<HTMLInputElement>) => {
    console.log("こうもく変更");
    setItem(e.target.value)
  };
  const onChangeMny = (e:ChangeEvent<HTMLInputElement>) => {
    console.log("金額変更");
    const num = Number(e.target.value);
    if(!num){
      setMny(0);
    } else {
      setMny(num);
    }
  };

  const onClickAdd = () => {
    console.log("追加");
    setData([...data,{
      id: data.length + 1,
      type: type,
      item: item,
      mny: mny,
    }]);
    setItem('');
    setMny(0);
  };

  const onChangeCheck = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("チェックした");

    const num = Number(e.target.value);
    const array = checkId;
    if(e.target.checked){
      setCheckId([...checkId, Number(e.target.value)])
    } else (
      setCheckId(array.filter(x => x !== num))
    )
  }

  const onDeleteRow = () => {
    console.log("削除");

    let delAftrData = data;
    let delAftrCheckId = checkId;
    checkId.forEach((delId: number) => {
      delAftrData = delAftrData.filter(x => x.id !== delId);
      delAftrCheckId = delAftrCheckId.filter(y => y !== delId);
    });
    setData(delAftrData);
    setCheckId(delAftrCheckId);
  }

  return (
    <>
      <Header />
      <Box
        border="2px"
        maxW="55rem"
        mx="auto"
        mt="3rem"
        borderColor="teal.900"
        backgroundColor="gray.100"
        >
        <Flex
          p="8px"
          align="center"
          justify="center"
          >
          <Select
            w="170px"
            mr={{ base: "3", md: "10" }}
            ml={{ base: "3", md: "10" }}
            border="2px"
            borderColor="teal.800"
            _hover={{opacity:0.9}}
            bg="white.400"
            onChange={onChangeType}>
            <option id="food" value="食費">食費</option>
            <option id="daily" value="日用品">日用品</option>
            <option id="goout" value="外食">外食</option>
            <option id="hobby" value="娯楽品">娯楽品</option>
            <option id="other" value="その他">その他</option>
          </Select>
          <Input
            placeholder="項目入力"
            value={item}
            onChange={onChangeItem} 
            w="sm"
            mr={{ base: "3", md: "10" }}
            ml={{ base: "3", md: "10" }}
            bg="white.400"
            border="2px"
            borderColor="teal.800"
            _hover={{opacity:0.9}} />
          <Input
            placeholder="金額入力"
            value={mny} 
            w="sm"
            bg="white.400"
            mr={{ base: "3", md: "10" }}
            ml={{ base: "3", md: "10" }}
            onChange={onChangeMny}
            border="2px"
            borderColor="teal.800" 
            _hover={{opacity:0.9}} />
        </Flex>
        <HStack
          mx="auto"
          ml={{ base: "3", md: "10" }}
          mt="1rem"
          >
          <PrimaryButton
            isDisabled={item==='' || mny===0}
            onClick={onClickAdd}
            >
            追加
          </PrimaryButton>
          <PrimaryButton
            isDisabled={checkId.length === 0}
            onClick={onDeleteRow}
            >
            削除
          </PrimaryButton>
        </HStack>
        <Box
          mt="3rem">
          <DataTable 
            data={data} 
            onChangeCheck={onChangeCheck}/>
          <Flex
            mt="1rem"
            mb="2rem">
              <Spacer />
              <Stat
                maxW="8rem">
                <StatLabel
                 color="red.500">合計金額</StatLabel>
                <StatNumber
                 color="red.800">100000</StatNumber>
              </Stat>
          </Flex>
          <DataTable 
            data={data} 
            onChangeCheck={onChangeCheck}/>
          <Flex
            mx="1rem"
            mt="1rem"
            mb="1rem">
            <PrimaryButton
              isDisabled={false}
              onClick={alert} >
              Excel出力
            </PrimaryButton>
          </Flex>
        </Box>
      </Box>
    </>
  )
})