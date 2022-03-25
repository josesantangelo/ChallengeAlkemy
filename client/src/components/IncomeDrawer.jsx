import React, { useEffect, useState, useRef } from 'react'
import {
    Stack,
    Button,
    FormControl,
    FormLabel,
    Input,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useToast,
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'

import { postMovement, deleteMovement, updateMovement } from '../utils/functions'

const IncomeDrawer = ({ isOpen, onClose, item, stateManager, originalInfo, setOriginalInfo, setVisibleInfo }) => {
    //useStates :
    const [modifiedMovement, setModifiedMovement] = useState({
        id: "",
        concept: "",
        date: "",
        amount: 0,
        type: "income",
    })
    //useDisclosures :
    const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure()
    //useEffects : 
    useEffect(() => {
        item.type ? setModifiedMovement(item) : null
    }, [isOpen])
    //initializations : 
    const cancelRef = useRef()
    const toast = useToast()
    //functions & aux : 
    const cleanAndClose = () => {
        stateManager({
            id: "",
            concept: "",
            date: "",
            amount: 0,
            type: "",
        });
        setModifiedMovement({
            id: "",
            concept: "",
            date: "",
            amount: 0,
            type: "income",
        })
        onClose();
    }



    return (
        <Drawer
            isOpen={isOpen}
            placement={{ base: "top", sm: "right" }}
            onClose={cleanAndClose}
        >
            <DrawerOverlay />
            <DrawerContent maxWidth={{ base: "100%", sm: "30%" }} height="100%">
                <DrawerCloseButton />
                <DrawerHeader marginTop={5}>{item.concept ? "Modificar Ingreso" : "Nuevo Ingreso"}</DrawerHeader>

                <DrawerBody>
                    <Stack spacing={8}>
                        <FormControl isRequired>
                            <FormLabel textAlign="left">Concepto</FormLabel>
                            <Input type="text" size="xs" name='concept' defaultValue={item.concept} onChange={(e) => {
                                setModifiedMovement({
                                    ...modifiedMovement,
                                    concept: e.target.value
                                })
                            }} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel textAlign="left">Fecha</FormLabel>
                            <Input type="date" size="xs" name='date' defaultValue={item.date} onChange={(e) => {
                                setModifiedMovement({
                                    ...modifiedMovement,
                                    date: e.target.value
                                })
                            }} />

                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel textAlign="left">Total</FormLabel>
                            <Input type="number" size="xs" name='total' defaultValue={item.amount} onChange={(e) => {
                                setModifiedMovement({
                                    ...modifiedMovement,
                                    amount: Number(e.target.value)
                                })
                            }} />
                        </FormControl>
                    </Stack>




                    <AlertDialog
                        isOpen={isOpenAlert}
                        leastDestructiveRef={cancelRef}
                        onClose={onCloseAlert}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    Eliminar movimiento
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    ¿Estas seguro? Esta accion no se puede deshacer.
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onCloseAlert}>
                                        Cancelar
                                    </Button>
                                    <Button colorScheme='red' onClick={async () => {
                                        await deleteMovement(modifiedMovement, toast);
                                        let newMovements = [...originalInfo];
                                        newMovements = newMovements.filter(item => item.id !== modifiedMovement.id)
                                        setOriginalInfo(newMovements)
                                        setVisibleInfo(newMovements)
                                        onCloseAlert();
                                        cleanAndClose();
                                    }} ml={3}>
                                        Eliminar
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>

                </DrawerBody>

                <DrawerFooter justifyContent="space-between" alignItems="baseline">
                    <Stack>
                        <Button colorScheme='red'
                            onClick={onOpenAlert}
                            isDisabled={item.concept.length &&
                                item.date.length && item.amount
                                ? false : true}
                        >Eliminar</Button>
                    </Stack>
                    <Stack flexDirection="row" alignItems="baseline">
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme='green'
                            onClick={async () => {
                                let newMovements;
                                let index;
                                if (modifiedMovement.id) {
                                    await updateMovement(modifiedMovement, toast)
                                    newMovements = [...originalInfo];
                                    index = newMovements.findIndex(item => item.id === modifiedMovement.id)
                                    newMovements[index] = modifiedMovement;
                                    setOriginalInfo(newMovements)
                                    setVisibleInfo(newMovements)
                                }
                                else {
                                    let result = await postMovement(modifiedMovement, toast);
                                    newMovements = [...originalInfo, result];
                                    newMovements.sort((a, b) => b.id - a.id)
                                    setOriginalInfo(newMovements)
                                    setVisibleInfo(newMovements)
                                }
                                cleanAndClose();
                            }}
                            isDisabled={modifiedMovement.concept.length &&
                                modifiedMovement.date.length && modifiedMovement.amount
                                ? false : true}
                        >{item.concept ? "Modificar" : "Guardar"}</Button></Stack>

                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default IncomeDrawer