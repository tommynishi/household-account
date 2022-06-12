import {HStack, Box, Flex, Input, Select, Spacer, Stat, StatLabel, StatNumber } from "@chakra-ui/react"
import { ChangeEvent, FC, memo, Suspense, useEffect, useState } from "react"
import { PrimaryButton } from "../atom/PrimaryButton"
import { DataTable } from "../organisms/DataTables";
import { Header } from "../organisms/Header";
import {mnyYen} from "../atom/Mny";
import { useInitialize } from "../../hooks/useInitialize";
import { Data } from "../../type/DataType";
import { DateButton } from "../atom/DateButton";
import { useUpdate } from "../../hooks/useUpdate";

export const Household: FC = memo(() => {
  const {getMonthData} = useInitialize();
  const {updateData} = useUpdate();
  const [type, setType] = useState<string>('食費')
  const [item, setItem] = useState<string>('');
  const [mny, setMny] = useState<number>(0);
  const [data, setData] = useState<Array<Data>>([]);
  const [checkId, setCheckId] = useState<Array<number>>([]);
  const [sumMny, setSumMny] = useState<number>(0);
  const [ym, setYm] = useState<Date>(new Date());

  const [updDisable, setUpdDisable] = useState<boolean>(true);
  useEffect(() => {
    getMonthData(ym).then((d) => {
      setData(d);
      let sm = 0;
      d.forEach((dd)=>{
        sm += dd.mny
      })
      setSumMny(sm);
    });
  }, []);

  const onBackDate = () => {
    ym.setMonth(ym.getMonth()-1)
    setYm(ym);
    getMonthData(ym).then((d) => {
      setData(d);
      let sm = 0;
      d.forEach((dd)=>{
        sm += dd.mny
      })
      setSumMny(sm);
    });
  }
  const onForwardDate = () => {
    ym.setMonth(ym.getMonth()+1);
    setYm(ym);
    getMonthData(ym).then((d) => {
      setData(d);
      let sm = 0;
      d.forEach((dd)=>{
        sm += dd.mny
      })
      setSumMny(sm);
    });
  }

  const onChangeType = (e:ChangeEvent<HTMLSelectElement>) => setType(e.target.value);
    
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

    const ary: Array<number> = data.map((p) => p.id);
    const aryMax = function (a: number, b: number) {return Math.max(a, b);}
    let maxId = ary.length === 0 ? 0 : ary.reduce(aryMax);

    setData([...data,{
      id: maxId + 1,
      type: type,
      item: item,
      mny: mny,
    }]);
    console.log(maxId)
    console.log(data)
    setItem('');
    setMny(0);
    setSumMny(sumMny + mny);
    setUpdDisable(false);
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

    let sumMnyCal = 0;
    delAftrData.forEach((d) => {
      sumMnyCal += d.mny
    });
    setSumMny(sumMnyCal);
    setUpdDisable(false);
  }

  const onUpdate = () => {
    updateData(ym, data);
  }

  return (
    <>
      <Header />
      <Box
        border="2px"
        maxW="55rem"
        mx="auto"
        mt="3rem"
        mb="3rem"
        borderColor="teal.900"
        backgroundColor="gray.100"
        >
        <Box
          as='h1'
          bg='gray.300'
          fontSize="3rem"
          mb="1rem">
          {ym.getMonth() + 1}月
        </Box>
        <Flex
          mb="1rem">
          <DateButton
            isDisabled={false}
            onClick={onBackDate}
            side={"left"}
            date={ym.getMonth()}
            />
          <Spacer/>
          <DateButton
            isDisabled={false}
            onClick={onForwardDate}
            side={"right"}
            date={ym.getMonth()+2}
            />
        </Flex>
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
        <Suspense fallback={<p>Loading...</p>}>
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
                  maxW="8rem"
                  mr="8rem">
                  <StatLabel
                  color="red.700">一人当たり金額</StatLabel>
                  <StatNumber
                  color="red.800">￥{mnyYen(sumMny / 2)}</StatNumber>
                </Stat>
                <Stat
                  maxW="8rem">
                  <StatLabel
                  color="red.900">合計金額</StatLabel>
                  <StatNumber
                  color="red.800">￥{mnyYen(sumMny)}</StatNumber>
                </Stat>
            </Flex>
            <HStack
              mx="auto"
              ml={{ base: "3", md: "10" }}
              mb="2rem">
              <PrimaryButton
                isDisabled={false}
                onClick={alert} >
                Excel出力
              </PrimaryButton>
              <PrimaryButton
                isDisabled={updDisable}
                onClick={onUpdate} >
                更新
              </PrimaryButton>
            </HStack>
          </Box>
        </Suspense>
      </Box>
    </>
  )
})