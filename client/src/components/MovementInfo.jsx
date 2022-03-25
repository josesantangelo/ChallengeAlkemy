import { Stack, Text } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { RiEmotionHappyLine, RiEmotionUnhappyLine } from 'react-icons/ri'

const MovementInfo = ({ id, concept, date, amount, type, modal, stateManager }) => {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            paddingX={1}
            paddingY={1}
            backgroundColor={type}
            borderRadius="md"
        >
            <Stack direction="row" alignItems="center">
                {type === 'income' ? <RiEmotionHappyLine /> : <RiEmotionUnhappyLine />}
                <Stack alignItems="flex-start" spacing={0} justifyContent="flex-end">
                    <Text fontSize={14}>{concept}</Text>
                    <Text fontSize={10}> {date}</Text>
                </Stack>
            </Stack>

            <Stack
                alignItems="flex-end"
                spacing={0}
                paddingTop={2}
                justifyContent="flex-end"
            >
                <EditIcon w={4} h={4} cursor="pointer" onClick={() => {
                    stateManager({
                        id: id,
                        concept: concept,
                        date: date,
                        amount: amount,
                        type: type,
                    });
                    modal();
                }} />
                {amount > 0 ? <Text fontSize={14}>${amount}</Text> : <Text fontSize={14}>${amount * -1}</Text>}

            </Stack>
        </Stack>
    );
}

export default MovementInfo