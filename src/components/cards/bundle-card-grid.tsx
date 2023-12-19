import Image from "@components/ui/image";
import { useTranslation } from "next-i18next";
import { Slide } from "@framework/types";
import img1 from "public/media/pro_image/slide1.webp";
import Link from "next/link";
interface Props {
  imgWidth?: number | string;
  imgHeight?: number | string;
  className?: string;
  thumbnailClassName?: string;
  effectActive?: boolean;
  bundle: Slide;
}

const BundleCardGrid: React.FC<Props> = ({
  bundle,
  imgWidth = 593,
  imgHeight = 490,
  effectActive = true,
}) => {
  const { image, title, link } = bundle;

  const { t } = useTranslation("common");
  return (
    <a href={link} target="_blank">
      <div className="group relative flex items-center w-full overflow-hidden">
        <div className="flex max-w-full shrink-0">
          <Image
            src={image ? image : "/assets/placeholder/collection.svg"}
            alt={t(title) || t("text-card-thumbnail")}
            width={imgWidth}
            height={imgHeight}
            className="bg-sink-thumbnail"
          />
        </div>
        {effectActive && (
          <div className="absolute top-0 block w-1/2 h-full transform -skew-x-12 ltr:-left-full rtl:-right-full z-5 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
        )}
      </div>
    </a>
  );
};

export default BundleCardGrid;
