import styled from 'styled-components';
import CropImage from './CropImage'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Loader from "react-loader-spinner";
const LoadingTemplateBlock = styled.div`
  position:absolute;
  top:40%;
  left:50%;
  transform: translate(-50%,50%)
`
const MainTemplateBlock = styled.div`
  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  margin: 2rem 1rem 1rem 1rem;
  padding: 1rem;
`;
//상태별 snackbar 추가하기
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



function MainContainerTemplate(props) {
  const [model, setModel] = useState(false);
  const [imgLink, setImgLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const [event, setEvent] = useState("success");
  const [snackMsg, setSnackMsg] = useState("success");

  const {open, vertical, horizontal} = snackOpen;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen({
      open: false,
      vertical: 'top',
      horizontal: 'center',
    });
  };
  if (model){
      return <>
      <Grid container>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={12} sm={6}>
          <img src={"data:image/png;base64,"+imgLink}></img>
        </Grid>
      </Grid>
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={event}>
          This is a success message!
        </Alert>
      </Snackbar></>
  }
  else{
    if(loading){
      return <LoadingTemplateBlock>
            <Loader
            type="Puff"
            color="#978875"
            height={100}
            width={100} 
          />
        </LoadingTemplateBlock>
        
    }else{
        return <MainTemplateBlock >
          <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={10000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={event}>
              {snackMsg}
            </Alert>
          </Snackbar>
        <CropImage setModel={setModel} setImgLink={setImgLink} setLoading={setLoading} 
          setPage={props.setPage} setEvent={setEvent} setSnackOpen={setSnackOpen} setSnackMsg={setSnackMsg}>

        </CropImage>
      </MainTemplateBlock>
    }
  }
}

export default MainContainerTemplate;