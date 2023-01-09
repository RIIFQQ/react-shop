import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { headerAxios } from "../../utils/headersAxios";
import { Button, CssBaseline, TextField, Box, Grid, Typography, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
const theme = createTheme();

function UserComponent() {
    const params = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [dataDetail, setDataDetail] = useState(null);

    useEffect(() => {
        getDataUser();
    })

    const getDataUser = async() =>{
        const url_api = "http://localhost:3000";

        const response = await axios.get(url_api + "/users/" + params.id, { headers:headerAxios });
        if(response)
        {
            setDataDetail(response.data.data);
        }
    }
    
    const prosesEdit = async (e) => {
        e.preventDefault();
        console.log("tombol edit ditekan");
        try {
            // const url_api = "https://muddy-flip-flops-bat.cyclic.app/users/register";
            const url_api = "http://localhost:3000/users/edit" + params.id;
            const response = await axios.post(url_api, {
                name : name,
                email : email
            });

            if(response){
                console.log("berhasil edit");
                navigate("/");
            }else{
                console.log("gagal edit");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                { dataDetail &&
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
                            Data User
                        </Typography>
                        <Box component="form" method='post' onSubmit={prosesEdit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                name="name"
                               
                                autoFocus
                            />
                            
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                name="email"
                                autoComplete="email"
                            />
                            
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                UBAH
                            </Button>
                            
                        </Box>
                    </Box>
                    </Grid>
                }
            </Container>
        </ThemeProvider>
    )
}

export default UserComponent