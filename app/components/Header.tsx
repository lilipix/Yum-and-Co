import Image from "next/image";
import YumCo from "@/public/YumCo.png";

const Header = () => {
  return (
    <div className="flex justify-center flex-start mt-6">
      <Image src={YumCo} alt="Logo" width={300} height={100} />
    </div>
  );
};

export default Header;
