import { useEffect, useState } from 'react';

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    const handleError = () => {
      reject(src);
    };
    img.onerror = handleError;
    img.onabort = handleError;
    img.src = src;
  });
}

export default function useImagePreloader(imageList) {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function effect() {
      if (isCancelled) {
        return;
      }

      const imagesPromiseList = [];
      imageList.forEach(element => {
        imagesPromiseList.push(preloadImage(element));
      });

      await Promise.all(imagesPromiseList);

      if (isCancelled) {
        return;
      }

      setImagesPreloaded(true);
    }

    effect();

    return () => {
      isCancelled = true;
    };
  }, [imageList]);

  return { imagesPreloaded };
}
