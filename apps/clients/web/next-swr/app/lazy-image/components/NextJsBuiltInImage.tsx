import Image from "next/image";

export default function NextJsBuiltInImage() {
  return (
    <>
      <p>Image Gallery</p>
      <div className='w-4/5 flex flex-wrap mx-auto gap-2'>
        {new Array(200).fill(1).map((value, index) => {
          return (
            <Image
              key={`${value}-${index}`}
              src={`https://picsum.photos/200/300?random=${index}`}
              alt={`https://picsum.photos/200/300?random=${index}`}
              width='200'
              height='300'
              loading='eager'
            />
          );
        })}
      </div>
    </>
  );
}
