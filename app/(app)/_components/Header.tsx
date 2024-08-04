import Image from "next/image";
import YumCo from "@/public/YumCo.png";

const Header = () => {
  return (
    <div className="flex-start mt-6 flex justify-center">
      <Image src={YumCo} alt="Logo" priority className="h-[100px] w-[300px]" />
    </div>
  );
};

export default Header;
