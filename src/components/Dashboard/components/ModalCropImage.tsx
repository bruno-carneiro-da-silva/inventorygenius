import { showErrorToast } from "@/components/Toast";
import { CloseIcon } from "@/icons";
import setCanvasPreview from "@/setCanvaPreview";
import { ChangeEvent, useRef, useState } from "react";
import User from "@/assets/cover.png";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { PencilIcon } from "lucide-react";
import { Company } from "@/queries/company/types";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

type ModalProps = {
  updateFile: (file: File) => void;
  company?: Company;
};

const ModalCropImage = ({ updateFile, company }: ModalProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgSrc, setImgSrc] = useState<any | null>(null);
  const [crop, setCrop] = useState<any>();
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const avatarUrl = useRef(
    `${company?.data.photoUrl ?? ""}?t=${new Date().getTime()}`
  );

  const updateAvatar = (imgSrc: string) => {
    avatarUrl.current = imgSrc;
  };

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setModalOpen(true);

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } =
          e.currentTarget as HTMLImageElement;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          showErrorToast("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <div className="col-span-2 relative rounded-full place-self-center hover:bg-gray-50 group">
        <img
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = User;
          }}
          onClick={() => fileInputRef?.current?.click()}
          src={avatarUrl.current ?? ""}
          className="w-32 h-32 border-gray-200 border cursor-pointer rounded-full group-hover:opacity-50 transition-opacity duration-300"
        />
        <button
          className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-white hover:bg-gray-200 border border-gray-200"
          title="Mudar foto"
          type="button"
          onClick={() => fileInputRef?.current?.click()}
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={onSelectFile}
          className="w-full hidden text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-primary-light hover:file:bg-gray-600"
        />
      </div>
      {modalOpen && (
        <div
          className="relative z-10"
          aria-labelledby="crop-image-dialog"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-all backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full justify-center px-2 py-12 text-center">
                <div
                  className="relative w-[20%] sm:w-[50%] rounded-2xl bg-white text-slate-100 text-left shadow-xl transition-all flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()} // Prevenir fechamento ao clicar dentro do modal
                >
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      className="rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:bg-gray-300 focus:outline-none"
                      onClick={() => setModalOpen(false)}
                    >
                      <span className="sr-only">Fechar o menu</span>
                      <CloseIcon />
                    </button>
                  </div>
                  <div className="p-11 mx-auto flex items-center justify-center rounded-md">
                    <label className="block mb-3 w-fit">
                      <span className="sr-only">Escolha a foto de perfil</span>
                    </label>
                    {error && <p className="text-red-400 text-xs">{error}</p>}
                    {imgSrc && (
                      <div className="flex flex-col items-center">
                        <ReactCrop
                          crop={crop}
                          onChange={(percentCrop) => setCrop(percentCrop)}
                          circularCrop
                          keepSelection
                          aspect={ASPECT_RATIO}
                          minWidth={MIN_DIMENSION}
                        >
                          <img
                            ref={imgRef}
                            src={imgSrc}
                            alt="Upload"
                            style={{ maxHeight: "70vh" }}
                            onLoad={onImageLoad}
                          />
                        </ReactCrop>
                        <button
                          className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-primary-dark hover:bg-primary-darker"
                          onClick={() => {
                            if (imgRef.current && previewCanvasRef.current) {
                              setCanvasPreview({
                                image: imgRef.current,
                                canvas: previewCanvasRef.current,
                                crop: convertToPixelCrop(
                                  crop,
                                  imgRef.current.width,
                                  imgRef.current.height
                                ),
                              });
                              previewCanvasRef.current.toBlob((blob) => {
                                if (blob) {
                                  const file = new File(
                                    [blob],
                                    "cropped_image.png",
                                    {
                                      type: "image/png",
                                    }
                                  );
                                  updateFile(file);
                                }
                              }, "image/png");

                              const dataUrl =
                                previewCanvasRef.current.toDataURL();
                              updateAvatar(dataUrl);
                              setModalOpen(false);
                            }
                          }}
                        >
                          Cortar a imagem
                        </button>
                      </div>
                    )}
                    {crop && (
                      <canvas
                        ref={previewCanvasRef}
                        className="mt-4"
                        style={{
                          display: "none",
                          border: "1px solid black",
                          objectFit: "contain",
                          width: 150,
                          height: 150,
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCropImage;
