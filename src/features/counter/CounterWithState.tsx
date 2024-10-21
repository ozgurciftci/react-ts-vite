import {useState} from "react"

import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {
    decrement,
    increment,
    incrementAsync,
    incrementByAmount,
    incrementIfOdd,
    selectCount,
    selectStatus,
} from "./counterSlice"
import {Button, Container, Input} from "@mui/material";
import Typography from "@mui/material/Typography";


export const CounterWithState = () => {
    const dispatch = useAppDispatch()
    const count = useAppSelector(selectCount)
    const status = useAppSelector(selectStatus)
    const [incrementAmount, setIncrementAmount] = useState("2")

    const incrementValue = Number(incrementAmount) || 0

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
        }}>
            <div>
                <Button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </Button>
                <Typography aria-label="Count" variant="h2">
                    {count}
                </Typography>
                <Button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    +
                </Button>
            </div>
            <div>
                <Input
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    type="number"
                    onChange={e => {
                        setIncrementAmount(e.target.value)
                    }}
                />
                <Button
                    onClick={() => dispatch(incrementByAmount(incrementValue))}
                >
                    Add Amount
                </Button>
                <Button
                    disabled={status !== "idle"}
                    onClick={() => void dispatch(incrementAsync(incrementValue))}
                >
                    Add Async
                </Button>
                <Button
                    onClick={() => {
                        dispatch(incrementIfOdd(incrementValue))
                    }}
                >
                    Add If Odd
                </Button>
            </div>
        </Container>
    )
}
