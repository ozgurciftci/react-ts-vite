import {useStarshipContext} from "../context/StarshipContext.tsx";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Input,
    Container,
    Card,
    CardContent, CardActions, Box, Alert
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ChangeEvent, useCallback, useState} from "react";
import debounce from 'lodash.debounce';
import Grid2 from "@mui/material/Grid2";

export const StarshipList = () => {
    const {starships,
        addToStarshipFleet,
        searchStarship,
        starshipFleet,
        removeStarshipFleet,
        sendToHQ
    } = useStarshipContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const handleSendToHQ = async () => {
        try {
            setMessage(null);
            await sendToHQ(starshipFleet);
            setMessage("Starship fleet successfully sent to HQ!"); // Update success message
        } catch (error) {
            console.error("Failed to send fleet to HQ:", error);
            setMessage("Failed to send fleet to HQ."); // Handle errors if needed
        }
    };

    const debouncedSearch = debounce((value: string) => {
        if (value.length >= 3) {
            void searchStarship(value);
        }
    }, 300);

    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    }, [debouncedSearch]);

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Starship Management
            </Typography>

            <Grid2 container spacing={4}>
                {/* First Table (Starship Search Results) */}
                <Grid2 size={{xs: 12, sm: 6}}>
                    <Typography variant="h6" gutterBottom>
                        Starship Fleet Search:
                    </Typography>
                    <Input
                        type="text"
                        placeholder="Search Starships"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        fullWidth
                        sx={{marginBottom: 3}}
                    />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Model</TableCell>
                                <TableCell>Starship Class</TableCell>
                                <TableCell>Crew</TableCell>
                                <TableCell align="center"><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {starships.map((starship, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>{starship.name}</TableCell>
                                    <TableCell>{starship.model}</TableCell>
                                    <TableCell>{starship.starship_class}</TableCell>
                                    <TableCell>{starship.crew}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => addToStarshipFleet(starship)}>Add</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid2>

                {/* Second Table (Starship Fleet) */}
                <Grid2 size={{xs: 12, sm: 6}}>
                    <Typography variant="h6" gutterBottom>
                        Starship Fleet:
                    </Typography>

                    {starshipFleet.map((starship, index) => (
                        <Card key={index} sx={{m: 2}}>
                            <CardContent>
                                <Typography variant="h6">{starship.name}</Typography>
                                <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>{starship.model}</Typography>
                                <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>{starship.starship_class}</Typography>
                                <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>{starship.crew}</Typography>
                            </CardContent>
                            <CardActions sx={{flexDirection:'row-reverse'}} >
                                <Button onClick={() => removeStarshipFleet(starship)}>Remove</Button>
                            </CardActions>
                        </Card>
                    ))}
                    <Box sx={{ml:2}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={()=> void handleSendToHQ()} // Send to HQ on click
                        >
                            Send to HQ
                        </Button>
                        {message && (
                            <Box mt={2}>
                                <Alert severity={message.includes("successfully") ? "success" : "error"}>
                                    {message}
                                </Alert>
                            </Box>
                        )}
                    </Box>

                </Grid2>
            </Grid2>
        </Container>
    );
};
