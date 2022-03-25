import { useState, useEffect } from 'react'
import {
  Stack,
  Text,
  Container,
  Button,
  Heading,
  StackDivider,
  useDisclosure,
  Spinner,
  ButtonGroup
} from "@chakra-ui/react";
import { AddIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import axios from "axios";

import IncomeDrawer from './components/IncomeDrawer';
import ExpenseDrawer from './components/ExpenseDrawer';
import MovementInfo from './components/MovementInfo';
// import { filterButtons } from './utils/constants'
import { getInfo, calculateBalance, filterInfo } from './utils/functions'

function App() {
  //useDisclosures : 
  const {
    isOpen: isOpenIncomeDrawer,
    onOpen: onOpenIncomeDrawer,
    onClose: onCloseIncomeDrawer,
  } = useDisclosure();

  const {
    isOpen: isOpenExpenseDrawer,
    onOpen: onOpenExpenseDrawer,
    onClose: onCloseExpenseDrawer,
  } = useDisclosure();

  //useStates : 
  const [visibleNumbers, setVisibleNumbers] = useState(false);
  const [originalInfo, setOriginalInfo] = useState([]);
  const [visibleInfo, setVisibleInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accountBalance, setaccountBalance] = useState({
    balance: 0,
    incomes: 0,
    expenses: 0,
  })
  const [selectedMovement, setSelectedMovement] = useState({
    id: "",
    concept: "",
    date: "",
    amount: 0,
    type: "",
  });

  //useEffects : 
  useEffect(async () => {
    let result = await getInfo();
    setOriginalInfo(result)
    setVisibleInfo(result)
    if (result.length) {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let result = calculateBalance(originalInfo)
    setaccountBalance(result)
  }, [originalInfo])

  // useEffect(async () => {
  //   let result = await getInfo();
  //   setOriginalInfo(result)
  //   setVisibleInfo(result)
  // }, [isOpenIncomeDrawer, isOpenExpenseDrawer]);


  //maps & aux functions
  const balanceInfo = [
    {
      header: "Balance",
      info: accountBalance.balance,
      add: false,
      eye: true,
    },
    {
      header: "Ingresos",
      info: accountBalance.incomes,
      add: true,
      eye: false,
      modal: onOpenIncomeDrawer,
    },
    {
      header: "Gastos",
      info: accountBalance.expenses,
      add: true,
      eye: false,
      modal: onOpenExpenseDrawer,
    },
  ]

  const filterButtons = [
    {
      key: 'incomeFilterButton',
      text: "Ingresos",
      hover: { backgroundColor: "green.200" },
      click: filterInfo(originalInfo, 'income')
    },
    {
      key: 'clearFiltersButton',
      text: "Ver todo",
      hover: { backgroundColor: "gray.200" },
      click: filterInfo(originalInfo, '')
    },
    {
      key: 'expenseFilterButton',
      text: "Gastos",
      hover: { backgroundColor: "pink.200" },
      click: filterInfo(originalInfo, 'expense')
    },
  ]





  return (
    <Container
      backgroundColor="bgHome"
      height="100vh"
      justifyContent="center"
      maxWidth={{ base: "100%", sm: "container.sm" }}
      paddingTop={2}
    >
      <Stack divider={<StackDivider />}>
        <Stack
          alignItems="center"
          borderColor="boxesBorders"
          borderRadius="md"
          borderWidth={2}
          justifyContent="center"
          paddingY={2}
          flexDirection="row"

        >
          <Heading fontSize={26} letterSpacing={1} flexDirection="row">
            Alkemy-Control
          </Heading>

        </Stack>
        <Stack color="white" letterSpacing={1}>
          {balanceInfo.map(element => {
            return (
              <Stack
                backgroundColor="boxes"
                borderRadius="md"
                justifyContent="center"
                paddingX={2}
                paddingY={1}
                key={element.header}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                  paddingRight={1}
                >
                  <Heading fontSize={22}>{element.header}</Heading>
                  {element.add ? <AddIcon cursor="pointer" h={3} w={3} onClick={element.modal} /> : null}

                </Stack>

                {visibleNumbers ? (
                  <Stack direction="row" justifyContent="space-between">
                    <Text fontSize={16}>${element.info}</Text>
                    {element.eye ? <ViewIcon cursor="pointer" h={5} w={5} onClick={() => setVisibleNumbers(false)} /> : null}

                  </Stack>
                ) : (
                  <Stack direction="row" justifyContent="space-between">
                    <Text fontSize={16}>*****</Text>
                    {element.eye ? <ViewOffIcon cursor="pointer" h={5} w={5} onClick={() => setVisibleNumbers(true)} /> : null}

                  </Stack>
                )}
              </Stack>
            )
          })}
        </Stack>
      </Stack>

      <ButtonGroup flexDirection="row" justifyContent="center" width="full" paddingTop={4} gap={6}>
        {filterButtons.map(element => {
          return (
            <Button key={element.key} colorScheme="whatsapp" fontSize={14} variant="outline" _hover={element.hover}
              onClick={() => {
                let result = element.click;
                setVisibleInfo(result);
              }}
            >
              {element.text}
            </Button>
          )
        })}

      </ButtonGroup>


      {loading ? <Stack justifyContent="center" paddingTop={10} alignItems="center">
        <Spinner color={"green.500"} size="xl" />
      </Stack> : visibleInfo.length ? <Stack color="white" paddingTop={4}>
        {
          visibleInfo.map(element => {
            let modal;
            element.type === "income" ? modal = onOpenIncomeDrawer : modal = onOpenExpenseDrawer
            return (
              <MovementInfo
                key={element.id}
                id={element.id}
                amount={element.amount}
                concept={element.concept}
                date={element.date}
                type={element.type}
                modal={modal}
                stateManager={setSelectedMovement}
              />
            );
          }).slice(0, 10)}
      </Stack> : <Stack justifyContent="center" paddingTop={10} alignItems="center"> <Text>No hay movimientos para mostrar.</Text></Stack>}




      <IncomeDrawer
        isOpen={isOpenIncomeDrawer}
        onClose={onCloseIncomeDrawer}
        onOpen={onOpenIncomeDrawer}
        item={selectedMovement}
        stateManager={setSelectedMovement}
        originalInfo={originalInfo}
        setOriginalInfo={setOriginalInfo}
        setVisibleInfo={setVisibleInfo}

      />


      <ExpenseDrawer
        isOpen={isOpenExpenseDrawer}
        onClose={onCloseExpenseDrawer}
        onOpen={onOpenExpenseDrawer}
        item={selectedMovement}
        stateManager={setSelectedMovement}
        setOriginalInfo={setOriginalInfo}
        setVisibleInfo={setVisibleInfo}
        originalInfo={originalInfo}
      />



    </Container>
  )
}

export default App
