import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { headerAxios } from "../../utils/headersAxios";
import { Card, CardHeader, CardContent, Link, Button, CssBaseline, TextField, Box, Grid, Typography, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
const theme = createTheme();

function UserComponent() {
    const params = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const navigate = useNavigate();
    const [dataDetail, setDataDetail] = useState(null);
   
    useEffect(() => {
        getDataUser();
    }, []);
    
    const getDataUser = async() =>{
        const url_api = "http://localhost:3000";

        const response = await axios.get(url_api + "/users/" + params.id, { headers:headerAxios });
        if(response)
        {
            setId(response.data.data.id)
            setName(response.data.data.name)
            setEmail(response.data.data.email)
            
        }
    }

    const prosesEdit = async (e) => {
        e.preventDefault();
        console.log("tombol edit ditekan");
        try {
            // const url_api = "https://muddy-flip-flops-bat.cyclic.app/users/register";
            const url_api = "http://localhost:3000/users/edit/" + id;
            const response = await axios.put(url_api, {
                name : name,
                email : email
            });

            navigate("/user/"+id);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Grid container spacing={8}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Grid container xs={2}>
                            <Grid item >
                                <Link component={RouterLink} to="/cart" variant="body2">
                                <IconButton color="primary" aria-label="add to shopping cart">
                                    <AddShoppingCartIcon />
                                </IconButton>
                                </Link>
                            </Grid>
                        </Grid>
                        <Card>
                            <CardHeader  style={{textAlign: "center"}} title= 'Edit Profile User' />
                            <CardContent>
                                <Box component="form" method='post' onSubmit={prosesEdit} noValidate sx={{ mt: 1 }}>

        
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"   
                                        value = {name}
                                        onChange={(e) => setName(e.target.value)} 
                                        autoFocus
                                    />
                                    
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        value = {email}
                                        onChange={(e) => setEmail(e.target.value)} 
                                    />

                                        <Grid container>
                                            <Grid item xs>
                                            <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            >SAVE</Button>        
                                            </Grid> 
                                        </Grid>    

                                        <Grid container>
                                            <Grid item xs>
                                                <Link component={RouterLink} to={"/user/"+id} variant="body2">
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        sx={{ mt: 3, mb: 2, mr:5, ml:5 }}
                                                    >
                                                        <p>My Profile</p> 
                                                    </Button>
                                                </Link>
                                            </Grid>

                                            <Grid item xs>
                                                <Link component={RouterLink} to="/product" variant="body2">
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        sx={{ mt: 3, mb: 2, mr:5 }}
                                                    >
                                                        <p>List Product</p>
                                                    </Button>
                                                </Link>
                                            </Grid>
                                            <Grid item xs>
                                                <Link component={RouterLink} to="/login" variant="body2">
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        sx={{mt: 3,mb: 2}}
                                                    >
                                                    <p>Logout</p>
                                                    </Button>
                                                </Link>
                                            </Grid>

                                            
                                        </Grid>                                                         
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                    </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default UserComponent