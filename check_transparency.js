const img = new Image();
img.src = '/src/assets/images/amelogo.png';
img.onload = () => {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const pixel = ctx.getImageData(0, 0, 1, 1).data;
  console.log('TopLevelPixel:', pixel);
};
