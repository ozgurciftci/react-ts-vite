import {useCounterContext} from "../context/CounterContext.tsx";
import {Box, Button} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

export const Counter = () => {
    const {counter, increment, decrement} = useCounterContext()
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center',
            }}
        >
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Typography variant="h4" sx={{marginBottom: '20px'}}>
                        Counter Example
                    </Typography>
                    <Typography variant="h2" data-testid={'counter-test-id'} sx={{marginBottom: '20px'}}>
                        {counter}
                    </Typography>
                </Grid>
                <Grid size={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={decrement}
                        sx={{padding: '10px 20px', fontSize: '16px'}}
                    >
                        Decrement Counter
                    </Button>
                </Grid>
                <Grid size={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={increment}
                        sx={{padding: '10px 20px', fontSize: '16px'}}
                    >
                        Increment Counter
                    </Button>
                </Grid>
            </Grid>
        </Box>

    )
}
