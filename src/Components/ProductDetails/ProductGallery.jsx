import { useEffect, useState } from "react";

const ProductGallery = ({ product }) => {
  const images = product?.images?.length
    ? product.images
    : product?.thumbnail
      ? [product.thumbnail]
      : [];

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    setSelectedImage(images[0] || "");
  }, [product?.id]);

  if (!product) {
    return (
      <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 sm:grid-cols-[80px_minmax(0,1fr)] sm:gap-4">
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="aspect-square animate-pulse rounded-sm bg-gray-100"
            />
          ))}
        </div>

        <div className="h-[300px] animate-pulse rounded-sm bg-gray-100 sm:h-[360px] lg:h-[420px]" />
      </div>
    );
  }

  return (
    <div className="grid h-auto w-full min-w-0 grid-cols-[64px_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[80px_minmax(0,1fr)] sm:gap-4 md:h-full md:grid-rows-[minmax(0,1fr)] lg:grid-cols-[90px_minmax(0,1fr)] lg:gap-5">
      {/* Thumbnail Images: আগের মতোই চৌকোণা, ওপরে বসে */}
      <div className="flex min-w-0 flex-col gap-3 self-start sm:gap-4">
        {images.slice(0, 4).map((image, index) => (
          <button
            key={`${product.id}-${index}`}
            type="button"
            onClick={() => setSelectedImage(image)}
            aria-label={`View product image ${index + 1}`}
            aria-pressed={selectedImage === image}
            className={`flex aspect-square w-full items-center justify-center overflow-hidden rounded-sm bg-[#F5F5F5] p-2 transition ${
              selectedImage === image
                ? "ring-1 ring-gray-400"
                : "hover:ring-1 hover:ring-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`${product.title} view ${index + 1}`}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Main Product Image: ৭৬৮px থেকে ডান পাশের উচ্চতার সমান */}
      <div className="relative h-[300px] min-w-0 overflow-hidden rounded-sm bg-[#F5F5F5] sm:h-[360px] md:h-full md:self-stretch">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt={product.title}
            className="absolute inset-0 h-full w-full object-contain p-3 sm:p-5 lg:p-6"
          />
        ) : (
          <p className="flex h-full items-center justify-center text-sm text-gray-400">
            Image not available
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;