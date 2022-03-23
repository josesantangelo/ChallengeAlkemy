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
import { filterButtons } from './utils/constants'
import { getInfo } from './utils/functions'








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
  const [visibleInfo, setVisibleInfo] = useState([])

  //useEffects : 
  useEffect(async () => {
    let result = await getInfo();
    setOriginalInfo(result)
    setVisibleInfo(result)
  }, [])



  const balanceInfo = [
    {
      header: "Balance",
      // info: balance,
      add: false,
    },
    {
      header: "Ingresos",
      // info: incomes,
      add: true,
      modal: onOpenIncomeDrawer,
    },
    {
      header: "Gastos",
      // info: expenses,
      add: true,
      modal: onOpenExpenseDrawer,
    },
  ]
  // let visibleInfo = [
  //   {
  //     "id": 1,
  //     "concept": "Ir al cine",
  //     "date": "20/7/2021",
  //     "amount": -250,
  //     "type": "expense"
  //   },
  //   {
  //     "id": 2,
  //     "concept": "Plazo Fijo",
  //     "date": "5/7/2021",
  //     "amount": 2500,
  //     "type": "income"
  //   },
  // ]




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
        >
          <Heading fontSize={26} letterSpacing={1}>
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
                    {element.info > 0 ? <Text fontSize={16}>${element.info}</Text> :
                      <Text fontSize={16}>${element.info * - 1}</Text>}

                    <ViewIcon cursor="pointer" h={5} w={5} onClick={() => setVisibleNumbers(false)} />
                  </Stack>
                ) : (
                  <Stack direction="row" justifyContent="space-between">
                    <Text fontSize={16}>*****</Text>
                    <ViewOffIcon cursor="pointer" h={5} w={5} onClick={() => setVisibleNumbers(true)} />
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
            <Button key={element.key} colorScheme="whatsapp" fontSize={14} variant="outline" _hover={element.hover}>
              {element.text}
            </Button>
          )
        })}

      </ButtonGroup>


      {visibleInfo.length ? <Stack color="white" paddingTop={4}>
        {
          visibleInfo.map(element => {
            // let modal;
            // element.type === "income" ? modal = onOpenIncomeDrawer : modal = onOpenExpenseModal
            return (
              <MovementInfo
                key={element.id}
                amount={element.amount}
                concept={element.concept}
                date={element.date}
                type={element.type}
              // modal={modal}
              // stateManager={setSelectedMovement}
              />
            );
          }).slice(0, 10)}
      </Stack> :
        <Stack justifyContent="center" paddingTop={10} alignItems="center">
          <Spinner color={"green.500"} size="xl" />
        </Stack>}

      <IncomeDrawer
        isOpen={isOpenIncomeDrawer}
        onClose={onCloseIncomeDrawer}
        onOpen={onOpenIncomeDrawer}
      />


      <ExpenseDrawer
        isOpen={isOpenExpenseDrawer}
        onClose={onCloseExpenseDrawer}
        onOpen={onOpenExpenseDrawer}
      />



    </Container>
  )
}

export default App
