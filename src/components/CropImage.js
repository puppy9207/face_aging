import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Grid from '@material-ui/core/Grid';
import { Button } from "@material-ui/core";
import Dropzone from 'react-dropzone'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import axios from 'axios'

import im1 from '../static/exampleImg/1.jpg';
import im2 from '../static/exampleImg/2.jpg';
import im3 from '../static/exampleImg/3.jpg';
import im4 from '../static/exampleImg/4.jpg';
import im5 from '../static/exampleImg/5.jpg';
import im6 from '../static/exampleImg/6.jpg';
// 이벤트 발생시 사용자의 컴퓨터에 crop한 이미지를 저장하는 함수
function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(
    (blob) => {
      const previewUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.download = 'cropPreview.png';
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);
    },
    'image/png',
    1
  );
}



// 메인 함수
export default function App() {
  const [loading, setLoading] = useState(false);
  //이미지가 저장되는 state
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  // aspect는 crop의 비율을 정할 수 있다.
  const [crop, setCrop] = useState({ unit:'%', width: 30,aspect: 1});
  const [completedCrop, setCompletedCrop] = useState(null);
  // 사용자가 이미지를 업로드 하기 전과 후를 나누는 상태
  const [guide,setGuide] = useState(true);

  // 사용자가 파일을 업로드 하는 과정
  const onSelectFile = useCallback((acceptedFiles) => {
    
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      setGuide(v=>!v);
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(file);
    })
    
  }, [])

  const onLoad = useCallback((img) => {
    imgRef.current = img;
    
  }, []);
  function getBase64Image(img) {

    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  //rest api 서버에 이미지 두개를 넘겨줌
  async function uploadCropImage(canvas, crop, index) {
      if (!crop || !canvas) {
        return;
      }
      const filedata = getBase64Image(document.getElementsByClassName('images').item(index));
      const formData = new FormData();
      const temp = canvas.toDataURL('images/png')
      setLoading(true)
      formData.append("image",temp)
      formData.append("image",filedata)
      const response = await axios({
        method: "POST",
        url: "http://192.168.0.213:5000/imageupload/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data", Authorization: localStorage.getItem("access_token") }
      });
      setLoading(false)
      console.log(response)
    }
  // crop
  useEffect(() => {

    
    
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  const tileData = [
       {
         img: im1,
         title: 'Image',
        author: 'author',
         featured: true,
       },
       {
        img: im2,
        title: 'Image',
       author: 'author',
        featured: true,
      },
      {
        img: im3,
        title: 'Image',
       author: 'author',
        featured: true,
      },
      {
        img: im4,
        title: 'Image',
       author: 'author',
        featured: true,
      },
      {
        img: im5,
        title: 'Image',
       author: 'author',
        featured: true,
      },
      {
        img: im6,
        title: 'Image',
       author: 'author',
        featured: true,
      },
     ];


  return (

    <Grid container spacing={2}>
      <Grid item sm={guide?12:5} xs={12}>
        <Grid container className="App" style={{background: "#D7D7D7",padding:"1rem 2.5rem 1rem 2.5rem"}}>

            {guide?null:
            <Grid item sm={12} xs={12}>
                <ReactCrop
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}/>
            </Grid>}

            <Grid item sm={12} xs={12}>
            { guide ? <Dropzone onDrop={acceptedFiles => onSelectFile(acceptedFiles)}>{({getRootProps, getInputProps}) => (
                      <section>
                        <div style={{display:"flex",height:"40rem",justifyContent:"center",alignItems:"center"}} {...getRootProps()}>
                          <input {...getInputProps()} accept="image/jpeg,image/png,image/jpg,image/bmp" />
                          <p>변환하고 싶은 사진을 drag & drop 혹은 클릭해서 넣어주세요</p>
                        </div>
                      </section>
                    )}
                    </Dropzone> : null }
            </Grid>
        </Grid>
      </Grid>
      {guide ? null :
      <Grid item container direction="row" sm={7} xs={12} style={{backgroundColor:"#D7D7D7"}}>
        <Grid container direction="column" justify="center" alignItems="center" sm={6} style={{paddingTop:"0.5rem",paddingBottom:"0.5rem"}}>
            <Grid item sm={12}>
              <canvas
                        ref={previewCanvasRef}
                        // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                        style={{
                            // width: Math.round(completedCrop?.width ?? 0),
                            // height: Math.round(completedCrop?.height ?? 0),
                            width:"18rem",
                            height:"18rem",
                        }}
                        />
            </Grid>
        </Grid>
        <Grid item sm={6}  style={{height:"23rem",borderLeft:"1px dashed",overflowX:"hidden",overflowY:"auto" }}>
          <GridList cellHeight={200} spacing={1}>
              {tileData.map((tile,index) => (
              <GridListTile key={tile.img} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
                <img className={"images"} src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  titlePosition="top"
                  actionIcon={
                    <IconButton onClick = {() =>uploadCropImage(previewCanvasRef.current, completedCrop,index)} aria-label={`star ${tile.title}`}>
                      <StarBorderIcon />
                    </IconButton>
                  }
                  actionPosition="left"
                />
              </GridListTile>
              ))}
          </GridList>
        </Grid>  
      </Grid>}
    </Grid>
  );
  
}

{/* <Button variant="outlined" type="button" disabled={!completedCrop?.width || !completedCrop?.height} onClick={() =>
                          generateDownload(previewCanvasRef.current, completedCrop)
                          }
                      >
                      Download
                  </Button> */}