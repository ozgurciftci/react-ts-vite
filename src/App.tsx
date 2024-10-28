import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {UserList} from './pages/UserList';
import {CreateUser} from './pages/CreateUser';
import {EditUser} from './pages/EditUser';
import {HomePage} from "./pages/Home.tsx";
import {DenemePage} from "./pages/Deneme.tsx";
import {ProductsPage} from "./pages/Products.tsx";
import {Providers} from "./context/Providers.tsx";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";
import {LoginPage} from "./pages/Login.tsx";
import {CounterWithState} from "./features/counter/CounterWithState.tsx";
import {StarshipPage} from "./pages/Starship.tsx";
import {AppLayout} from "./layout/AppLayout.tsx";

function App() {

    return (
        <>
            <Router>
                <Providers>
                    <AppLayout>
                    <Routes>
                        <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
                        <Route path="/users-list" element={<UserList/>}/>
                        <Route path="/create-user" element={<CreateUser/>}/>
                        <Route path="/edit-user/:id" element={<EditUser/>}/>
                        <Route path="/deneme" element={<DenemePage/>}/>
                        <Route path="/products" element={<ProductsPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/counter-with-state" element={<CounterWithState/>}/>
                        <Route path="/starships" element={<StarshipPage/>}/>
                    </Routes>
                    </AppLayout>
                </Providers>
            </Router>
        </>
    );
}

export default App;
