"use client";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ReactImageLazyLoadComponent() {
  return (
    <>
      <p>Image Gallery</p>
      <div className='w-4/5 flex flex-wrap mx-auto gap-2'>
        {new Array(200).fill(1).map((value, index) => {
          return (
            <LazyLoadImage
              key={`${value}-${index}`}
              src={`https://picsum.photos/200/300?random=${index}`}
              alt={`https://picsum.photos/200/300?random=${index}`}
              width={200}
              height={300}
            />
          );
        })}
      </div>
    </>
  );
}
