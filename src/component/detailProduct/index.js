import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Typography,
  Link
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { dataProducts } from "../../utils/static";
import { headerAxios } from "../../utils/headersAxios";
import { currencyFormat } from "../../utils/functions";
import { Link as RouterLink} from "react-router-dom";



export default function DetailProductComponent() {
  const params = useParams();
  const [qty, setQty] = useState(0);
  const [dataProducts, setDataProducts] = useState([]);
  const [loading, setLoading] = useState(null);
  const [dataDetail, setDataDetail] = useState(null);

  // useEffect(() => {
  //   updateState();
  // }, []);

  useEffect(() => {
    getDataProduct();
  },[qty])

  const updateState = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      let newCart = cart.filter((val) => val.id == dataDetail.id);
      if (newCart.length > 0) {
        setQty(newCart.qty);
      }
    }
  };


  const qtyChange = (type) => {
    let newQty = qty;
    if (type === "min") {
      newQty--;
    } else {
      newQty++;
    }

    if (newQty < 0) {
      newQty = 0;
    }else if( newQty > dataDetail.qty){
      newQty = dataDetail.qtyl
    }

    setQty(newQty);
  };

  const updateCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let newDataDetail = {};
    if (!cart) {
      cart = [];
      newDataDetail = dataDetail;
    } else {
      let newCart = cart.filter((val) => val.id == dataDetail.id);
      if (newCart.length > 0) {
        newDataDetail = newCart;
      } else {
        newDataDetail = dataDetail;
      }
    }
    newDataDetail.qty = qty;
    let allCart = cart.filter((val) => val.id != dataDetail.id);
    allCart.push(newDataDetail);

    localStorage.setItem("cart", JSON.stringify(allCart));
    alert("Berhasil ditambahkan ke Cart");
  };

  const getDataProduct = async() =>{
    const url_api = "http://localhost:3000";

    const response = await axios.get(url_api + "/products/" + params.id, { headers:headerAxios });
    if(response)
    {
      // console.log("response", response);
      setDataDetail(response.data.data);
    }
  }
// console.log(dataDetail);
  return (
    
    <Container sx={{ mt: 2 }}>
      <Grid container>
        <Grid item xs>
            <Link component={RouterLink} to={"/user/edit/"} variant="body2">
                My Profile 
            </Link>
        </Grid>
        <Grid item xs>
            <Link component={RouterLink} to="/product" variant="body2">
                List Product
            </Link>
        </Grid>

        <Grid item>
            <Link component={RouterLink} to="/login" variant="body2">
                Logout
            </Link>
        </Grid>
      </Grid>
      
      { dataDetail &&
        <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={3}>
          <img
            src={dataDetail.image}
            srcSet={dataDetail.image}
            alt={dataDetail.name}
            loading="lazy"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={9}>
          <Card>
            <CardHeader title={dataDetail.name} />
            <CardContent>
              <Typography variant="subtitle2">Rp. 150.000</Typography>
              <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
                {/* {currencyFormat(dataDetail.price)} */}
              </Typography>
              <Stack direction={"row"} alignItems="center" sx={{ mt: 3 }}>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => qtyChange("min")}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Typography
                  sx={{
                    borderBottom: 1,
                    width: 50,
                    mx: 1,
                    textAlign: "center",
                    fontSize: 20,
                  }}
                  variant="subtitle2"
                >
                  {qty}
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => qtyChange("plus")}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button variant="contained" color="error" onClick={updateCart}>
                + Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
        </Grid>
      }  
    </Container>
  );
}
