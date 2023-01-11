import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { headerAxios } from "../../utils/headersAxios";
import { Link, Button, CssBaseline, TextField, Box, Grid, Typography, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
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
                <Grid container spacing={3}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        
                        <Typography component="h1" variant="h5">
                            Edit Profile User
                        </Typography>
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
                                            My Profile 
                                        </Link>
                                    </Grid>

                                    <Grid item xs>
                                        <Link component={RouterLink} to="/product/1" variant="body2">
                                            Checkout
                                        </Link>
                                    </Grid>

                                    <Grid item>
                                        <Link component={RouterLink} to="/login" variant="body2">
                                            Logout
                                        </Link>
                                    </Grid>
                                </Grid>                                                         
                        </Box>
                    </Box>
                    </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default UserComponent