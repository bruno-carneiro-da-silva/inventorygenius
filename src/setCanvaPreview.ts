type PixelCrop = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

type CanvasPreviewParams = {
  image: HTMLImageElement;
  canvas: HTMLCanvasElement;
  crop: PixelCrop;
};

const setCanvasPreview = ({
  image, // HTMLImageElement
  canvas, // HTMLCanvasElement
  crop, // PixelCrop
}: CanvasPreviewParams) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No 2d context");
  }

  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = Math.floor((crop.width ?? 0) * scaleX * pixelRatio);
  canvas.height = Math.floor((crop.height ?? 0) * scaleY * pixelRatio);

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = "high";
  ctx.save();

  const cropX = (crop.x ?? 0) * scaleX;
  const cropY = (crop.y ?? 0) * scaleY;

  ctx.translate(-cropX, -cropY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
};
export default setCanvasPreview;
