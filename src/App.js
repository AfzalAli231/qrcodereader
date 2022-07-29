import "./App.css";
import {Container, Card, CardContent, Grid, TextField, Button} from '@mui/material';
import {makeStyles} from "@mui/styles";
import QRCode from 'qrcode';
import {QrReader} from "react-qr-reader";
import { useState } from "react";

function App() {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [scanFile, setScanFile] = useState("");
  const [res, setRes] = useState("");


  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setRes(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleErrorFile = (err) => {
    console.log(err);
  }

  const handleScanFile = (result) => {
    if(result) {
      setScanFile(result);
    }
  }

  return (
    <Container className={classes.container}>
      <Card>
        <h2 className={classes.title}>
          Generate Download & Scan Qr Code With React JS
        </h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Enter Text Here"
                variant="standard"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={() => generateQrCode()}
              >
                Generate
              </Button>
              <br />
              <br />
              <br />
              {res ? (
                <a href={res} download>
                  <img src={res} alt="img" />
                </a>
              ) : null}
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <h3>Scan Qr Code By Webcam</h3>
              <QrReader
                delay={300}
                onError={handleErrorFile}
                onResult={handleScanFile}
                style={{ width: "100%" }}
                legacyMode
              />
              <h3>Scanned Code: {scanFile}</h3>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10,
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    color: "#fff",
    background: "#3f51b5",
  },
  btn: {
    marginTop: 10,
    marginBottom: 20
  },
}));

export default App;
