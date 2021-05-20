import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Grid from '@material-ui/core/Grid';
import { Button } from "@material-ui/core";
import Dropzone from 'react-dropzone'
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

export default function App() {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30,aspect: 1});
  const [completedCrop, setCompletedCrop] = useState(null);
  const [guide,setGuide] = useState(true);
  const onSelectFile = useCallback((acceptedFiles) => {
    
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
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

  


  return (
    
    <Grid container spacing={2}>
      <Grid item sm={guide?12:5} xs={12}>
        <Grid container className="App" style={{background: "#D7D7D7",borderRadius: "16px",padding:"1rem 2.5rem 1rem 2.5rem"}}>
            {guide?null:<Grid item sm={12} xs={12}>
                <ReactCrop
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                />
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
      <Grid item container direction="row" alignItems="center" sm={7} xs={12} >
        <Grid container direction="column" justify="center" alignItems="center" sm={6} style={{background: "#D7D7D7",borderRadius:"16px",height:"100%"}}>
            <Grid item sm={6}>
              <canvas
                        ref={previewCanvasRef}
                        // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                        style={{
                            width: Math.round(completedCrop?.width ?? 0),
                            height: Math.round(completedCrop?.height ?? 0),
                        }}
                        />
            </Grid>
            <Grid item sm={6}>

            </Grid>
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