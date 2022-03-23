import React, { useEffect, useState } from 'react'
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
} from '@chakra-ui/react'
import axios from 'axios'

const ExpenseDrawer = ({ isOpen, onOpen, onClose }) => {
    return (
        <Drawer
            isOpen={isOpen}
            placement={{ base: "top", sm: "right" }}
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent maxWidth={{ base: "100%", sm: "30%" }} height={{ base: "100%", sm: "90%" }}>
                <DrawerCloseButton />
                <DrawerHeader marginTop={5}>Nuevo Gasto</DrawerHeader>

                <DrawerBody>
                    <Stack spacing={8}>
                        <FormControl isRequired>
                            <FormLabel textAlign="left">Concepto</FormLabel>
                            <Input type="text" size="xs" name='concept' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel textAlign="left">Fecha</FormLabel>
                            <Input type="date" size="xs" name='date' />

                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel textAlign="left">Total</FormLabel>
                            <Input type="number" size="xs" name='total' />
                        </FormControl>
                    </Stack>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button colorScheme='red'>Guardar</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default ExpenseDrawer