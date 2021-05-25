import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Grid from '@material-ui/core/Grid';
// import { Button } from "@material-ui/core";
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
// function generateDownload(canvas, crop) {
//   if (!crop || !canvas) {
//     return;
//   }

//   canvas.toBlob(
//     (blob) => {
//       const previewUrl = window.URL.createObjectURL(blob);

//       const anchor = document.createElement('a');
//       anchor.download = 'cropPreview.png';
//       anchor.href = URL.createObjectURL(blob);
//       anchor.click();

//       window.URL.revokeObjectURL(previewUrl);
//     },
//     'image/png',
//     1
//   );
// }



// 메인 함수
const Crops = (props) => {
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
    return dataURL;
  }
  function getFileToBase64Image(file) {

    var canvas = document.createElement('CANVAS');
    let img = document.createElement('avatar');
    img.onload = function()
    {
        canvas.height = img.height;
        canvas.width = img.width;
        var dataURL = canvas.toDataURL('image/png');

        canvas = null;
        return dataURL
    };
    img.src = file;
  }

  //rest api 서버에 이미지 두개를 넘겨줌
  async function uploadCropImage(canvas, crop, index) {
      if (!crop || !canvas) {
        return;
      }
      // canvas object를 base64 문자열로 변환
      props.setLoading(true)
      const filedata = getBase64Image(document.getElementsByClassName('images').item(index));
      const formData = new FormData();
      const temp = canvas.toDataURL('images/png')
      const decodImg1 = atob(temp.split(',')[1]);
      const decodImg2 = atob(filedata.split(',')[1]);
      
      //base64문자열을 file 객체로 변환
      let array1 = [];
      let array2 = [];
      for (let i = 0; i < decodImg1 .length; i++) {
        array1.push(decodImg1 .charCodeAt(i));
      }
      for (let i = 0; i < decodImg2 .length; i++) {
        array2.push(decodImg2 .charCodeAt(i));
      }
      const file1 = new Blob([new Uint8Array(array1)], {type: 'image/png'});
      const fileName1 = 'file1' + new Date().getMilliseconds() + '.png';
      const file2 = new Blob([new Uint8Array(array2)], {type: 'image/png'});
      const fileName2 = 'file2' + new Date().getMilliseconds() + '.png';


      //form에 이미지 두개를 싣는다.
      formData.append("xs",file1,fileName1)
      formData.append("xt",file2,fileName2)

      //axios로 post 전송
      await axios({
        method: "POST",
        url: "http://192.168.0.213:5000/imageupload/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data", Authorization: localStorage.getItem("access_token") }
      }).then(response => { 
        props.setModel(v=>!v);
        props.setImgLink(response.data.message);
        props.setLoading(false)
        setTimeout(function(){
          props.setPage(0)
        },3000)
        console.log(response.data.message)
      })
      .catch(error => {
          props.setModel(v=>!v);
          props.setLoading(false)
          props.setImgLink("에러입니다.");
          setTimeout(function(){
            props.setPage(3)
            props.setPage(1)
          },3000)
          console.log(error.response)
      });
      
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
  const [tiled,setTiled] = useState();
  const onSelectTileFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      
      
      reader.addEventListener('load', () => setTileData(tileData.concat({
        img: reader.result,
        title: '<= 이 얼굴과 합쳐보기',
       author: 'author',
        featured: true,})));
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const [tileData,setTileData] = useState([
    {
      img: im1,
      title: '<= 이 얼굴과 합쳐보기',
     author: 'author',
      featured: true,
    },
    {
     img: im2,
     title: '<= 이 얼굴과 합쳐보기',
    author: 'author',
     featured: true,
   },
   {
     img: im3,
     title: '<= 이 얼굴과 합쳐보기',
    author: 'author',
     featured: true,
   },
   {
     img: im4,
     title: '<= 이 얼굴과 합쳐보기',
    author: 'author',
     featured: true,
   },
   {
     img: im5,
     title: '<= 이 얼굴과 합쳐보기',
    author: 'author',
     featured: true,
   },
   {
     img: im6,
     title: '<= 이 얼굴과 합쳐보기',
    author: 'author',
     featured: true,
   },
  ]);
  


  return (

    <Grid container spacing={3}>
      <Grid item sm={12} xs={12}>
        <Grid container className="App" style={{background: "#D7D7D7",padding:"1rem 0rem 1rem 0rem" ,overflowX:"hidden",overflowY:"auto"}}>

            {guide?null:
            <Grid item sm={12} xs={12}>
                <p>얼굴에 맞게 조정해주세요</p>
                <ReactCrop
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    style={{width:"30vh"}}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    />
                  
            </Grid>}

            <Grid item sm={12} xs={12}>
            { guide ? <Dropzone onDrop={acceptedFiles => onSelectFile(acceptedFiles)}>{({getRootProps, getInputProps}) => (
                      <section>
                        <div style={{display:"flex",height:"40vw",justifyContent:"center",alignItems:"center"}} {...getRootProps()}>
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
      <Grid item container direction="row" sm={12} xs={12} style={{backgroundColor:"#D7D7D7",padding:"2vw"}}>
        <Grid container direction="column" justify="center" alignItems="center" sm={6} >
            <Grid item sm={12}>
              <p>조정된 이미지</p>
              <canvas
                        ref={previewCanvasRef}
                        // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                        style={{
                            // width: Math.round(completedCrop?.width ?? 0),
                            // height: Math.round(completedCrop?.height ?? 0),
                            width:"25vh",
                            height:"25vh",
                        }}
                        />
            </Grid>
        </Grid>
        <Grid item sm={6}  style={{height:"45vh",overflowX:"hidden",overflowY:"auto" }}>
          <input type={"file"} accept="image/png,image/jpg,image/jpeg" onChange={onSelectTileFile}></input>
          <GridList cellHeight={200} spacing={1}>
              {tileData.slice(0).reverse().map((tile,index) => (
              <GridListTile key={tile.img} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
                <img className={"images"} src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  titlePosition="top"
                  actionIcon={
                    <IconButton onClick = {() =>uploadCropImage(previewCanvasRef.current, completedCrop,index,tile.title)} aria-label={`star ${tile.title}`}>
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
export default Crops
{/* <Button variant="outlined" type="button" disabled={!completedCrop?.width || !completedCrop?.height} onClick={() =>
                          generateDownload(previewCanvasRef.current, completedCrop)
                          }
                      >
                      Download
                  </Button> */}