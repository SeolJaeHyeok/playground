import Image from "next/image";
import { ReloadButton } from "./reload-button";
import { getProductById } from "@/services/server-action";
import { Card } from "@/components/ui/card";

type Props = {
  params: {
    id: string;
  };
};

const ProductModal = async ({ params }: Props) => {
  const id = parseInt(params.id, 10);
  const { data } = await getProductById(id);

  return (
    <Card className="fixed rounded-md text-black bg-white/90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] min-h-[300px]">
      <div className="flex flex-col p-5 gap-2 items-center">
        <Image
          src={data.images}
          alt={data.title}
          width={100}
          height={100}
          className="w-[100px] h-[100px] object-cover"
        ></Image>
        <div className="text-lg font-bold ">{data.title}</div>
        <div className="line-clamp-3">{data.description}</div>

        <ReloadButton />
      </div>
    </Card>
  );
};

export default ProductModal;
