const createPng = (canvas: HTMLCanvasElement): Promise<Blob | null> =>
  new Promise((resolve) => {
    const bgCanvas = document.createElement("canvas"); // for white background in exported file
    const ctx = bgCanvas.getContext("2d");

    if (!ctx) {
      resolve(null);
      return;
    }

    bgCanvas.width = canvas.width;
    bgCanvas.height = canvas.height;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

    ctx.drawImage(canvas, 0, 0);

    bgCanvas.toBlob((blob) => {
      resolve(blob);
    }, "image/png");
  });

export { createPng };
