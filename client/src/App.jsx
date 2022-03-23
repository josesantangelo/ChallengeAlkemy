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
import { balanceInfo } from './utils/constants'
function App() {
  const [visibleNumbers, setVisibleNumbers] = useState(false);

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


    </Container>
  )
}

export default App
