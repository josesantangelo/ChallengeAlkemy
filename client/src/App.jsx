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
import GenericDrawer from './components/GenericDrawer';
import MovementInfo from './components/MovementInfo';
import { getInfo, calculateBalance, filterInfo } from './utils/functions'

function App() {
  const initialState = {
    id: "",
    concept: "",
    date: "",
    amount: 0,
    type: "",
  }

  //useDisclosures : 
  const {
    isOpen: isOpenGenericDrawer,
    onOpen: onOpenGenericDrawer,
    onClose: onCloseGenericDrawer,
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
  const [selectedMovement, setSelectedMovement] = useState(initialState);

  //useEffects : 
  useEffect(async () => {
    let result = await getInfo();
    setOriginalInfo(result)
    setVisibleInfo(result)
    setLoading(false)
  }, [])

  useEffect(() => {
    let result = calculateBalance(originalInfo)
    setaccountBalance(result)
  }, [originalInfo])




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
      emptyMovement: {
        ...initialState,
        type: "income"
      },
      modal: onOpenGenericDrawer,
    },
    {
      header: "Gastos",
      info: accountBalance.expenses,
      add: true,
      eye: false,
      emptyMovement: {
        id: "",
        concept: "",
        date: "",
        amount: 0,
        type: "expense"
      },
      modal: onOpenGenericDrawer,
    },


  ]

  const filterButtons = [
    {
      key: 'incomeFilterButton',
      text: "Ingresos",
      hover: { backgroundColor: "income", color: "white", transition: "all ease 0.5s" },
      click: filterInfo(originalInfo, 'income')
    },
    {
      key: 'clearFiltersButton',
      text: "Ver todo",
      hover: { backgroundColor: "blue.600", color: "white", transition: "all ease 0.5s" },
      click: filterInfo(originalInfo, '')
    },
    {
      key: 'expenseFilterButton',
      text: "Gastos",
      hover: { backgroundColor: "expense", color: "white", transition: "all ease 0.5s" },
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
                  {element.add ? <AddIcon cursor="pointer" h={3} w={3} onClick={() => {
                    setSelectedMovement(element.emptyMovement)
                    onOpenGenericDrawer();
                  }} /> : null}

                </Stack>

                {visibleNumbers ? (
                  <Stack direction="row" justifyContent="space-between">
                    {element.info >= 0 ? <Text fontSize={16}>${element.info}</Text> : <Text fontSize={16}>- ${element.info * -1}</Text>}

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
            return (
              <MovementInfo
                key={element.id}
                id={element.id}
                amount={element.amount}
                concept={element.concept}
                date={element.date}
                type={element.type}
                onOpenGenericDrawer={onOpenGenericDrawer}
                setSelectedMovement={setSelectedMovement}
              />
            );
          }).slice(0, 10)}
      </Stack> : <Stack justifyContent="center" paddingTop={10} alignItems="center" flexDirection="column"> <Text textAlign="center">No hay movimientos para mostrar.
      </Text><Text>Carga tu primer movimiento desde el icono " + " correspondiente.</Text></Stack>}

      <GenericDrawer
        isOpen={isOpenGenericDrawer}
        onClose={onCloseGenericDrawer}
        onOpen={onOpenGenericDrawer}
        item={selectedMovement}
        setSelectedMovement={setSelectedMovement}
        setOriginalInfo={setOriginalInfo}
        setVisibleInfo={setVisibleInfo}
        originalInfo={originalInfo}
        setLoading={setLoading}
      />


    </Container>
  )
}

export default App
