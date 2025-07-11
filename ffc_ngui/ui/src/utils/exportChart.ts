const createPng = (canvases: HTMLCanvasElement[]): Promise<Blob | null> =>
  new Promise((resolve) => {
    const bgCanvas = document.createElement("canvas"); // for white background in exported file
    const ctx = bgCanvas.getContext("2d");

    if (!ctx) {
      resolve(null);
      return;
    }

    bgCanvas.width = Math.max(...canvases.map((canvas) => canvas.width));
    bgCanvas.height = Math.max(...canvases.map((canvas) => canvas.height));

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

    canvases.forEach((canvas) => {
      ctx.drawImage(canvas, 0, 0);
    });

    bgCanvas.toBlob((blob) => {
      resolve(blob);
    }, "image/png");
  });

export { createPng };
