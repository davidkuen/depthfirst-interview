import Image from "next/image";
import { ContentContainer } from "./Layout";

export const Header = () => {
  return (
    <header className="pt-6 pb-4 sticky top-0 z-10 bg-background/50 backdrop-blur-md">
      <ContentContainer>
        <Image
          src="/dflogo.svg"
          alt="DepthFirst logo"
          width={155}
          height={26}
        />
      </ContentContainer>
    </header>
  );
};
