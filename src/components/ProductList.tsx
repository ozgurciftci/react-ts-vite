import {Container, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useProductContext} from "../context/ProductContext.tsx";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'title', headerName: 'Title', width: 200},
    {field: 'description', headerName: 'Description', width: 580},
    {field: 'category', headerName: 'Category', width: 150},
    {field: 'price', headerName: 'Price', width: 150},
];

const paginationModel = {page: 0, pageSize: 5};

export const ProductList = () => {
    const {products} = useProductContext();
    return (
        <Container >
            <Typography variant="h4" sx={{marginBottom: '20px', textAlign: 'center'}}>
                Products
            </Typography>
            <Paper sx={{height: 400, width: '100%'}}>
                <DataGrid data-testid="productList"
                          rows={products}
                          columns={columns}
                          initialState={{pagination: {paginationModel}}}
                          pageSizeOptions={[5, 10, 15]}
                          checkboxSelection
                          sx={{border: 0}}
                />
            </Paper>
        </Container>
    )
}
