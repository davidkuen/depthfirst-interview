import Image from "next/image";
import { ContentContainer } from "./Layout";

export const Header = () => {
  return (
    <header className="pt-6 pb-4 sticky top-0 z-10 bg-background">
      <ContentContainer className="flex gap-4">
        <Image
          src="/dflogo.svg"
          alt="DepthFirst logo"
          width={155}
          height={26}
        />
        <div
          className="font-mono text-md text-right text-white"
          style={{ marginTop: "5px" }}
        >
          dashboard
        </div>
      </ContentContainer>
    </header>
  );
};
