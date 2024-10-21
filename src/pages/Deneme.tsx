import {useState} from "react";
import {Button, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

export const DenemePage = () => {
   const [number, setNumber] = useState(0);
   const indir = () => {
       setNumber(number - 1);
   }
   const fisekle = () => {
       setNumber(number + 1);
   }
    return (
        <Container sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        }}>
            <Grid size={12}>
                <Typography>
                    Deneme Page
                </Typography>
            </Grid>
            <Grid size={12}>
                {number}
            </Grid>
            <Grid size={6}>
                <Button onClick={indir}>Anansi mal indir</Button>
            </Grid>
            <Grid size={6}>
                <Button onClick={fisekle}>Anansi fisekle</Button>
            </Grid>


        </Container>

   )
}
