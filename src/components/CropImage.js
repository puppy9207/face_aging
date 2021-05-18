import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Grid from '@material-ui/core/Grid';
import { Button } from "@material-ui/core";
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
  const [crop, setCrop] = useState({ unit: '%', width: 30});
  const [completedCrop, setCompletedCrop] = useState(null);
  const [guide,setGuide] = useState(true);
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setGuide(v=>!v);
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

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
      <Grid item sm={6} xs={12}>
        <Grid container className="App" style={{background: "#D7D7D7",borderRadius: "16px",padding:"1rem 2.5rem 1rem 2.5rem"}}>
            <Grid item sm={12} xs={12}>
                <ReactCrop
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                />
            </Grid>
            <Grid item sm={12} xs={12}>
            { guide ? <p>이미지를 넣어주세요</p> : null }
            </Grid>
            <Grid item sm={12} xs={12}>
                    
                <input type="file" accept="image/*" onChange={onSelectFile} />
            </Grid>
            
        </Grid>
      </Grid>
      <Grid item container direction="column" alignItems="center" sm={6} xs={12} >
        <Grid container direction="column" alignItems="center" justify="flex-end" sm={12} style={{background: "#D7D7D7",borderRadius: "16px",padding:"1rem"}}>
          <Grid item sm={11}>
            <canvas
                      ref={previewCanvasRef}
                      // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                      style={{
                          width: Math.round(completedCrop?.width ?? 0)/1.05,
                          height: Math.round(completedCrop?.height ?? 0)/1.05,
                      }}
                      />
          </Grid>
          {guide ? null : <Grid item sm={1} xs={12}>
                  <Button variant="outlined"
                          type="button"
                          disabled={!completedCrop?.width || !completedCrop?.height}
                          onClick={() =>
                          generateDownload(previewCanvasRef.current, completedCrop)
                          }
                      >
                      Download
                  </Button>
              </Grid> }
        </Grid>
      </Grid>
    </Grid>
  );
}
