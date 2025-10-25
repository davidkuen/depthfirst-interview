"use client";

import Drawer from "@/components/Drawer";
import { useRouter } from "next/navigation";
import useComment from "@/api/useComment";

const IssueDrawer = ({ id }: { id: string }) => {
  const commentResponse = useComment({ id });
  const router = useRouter();
  return (
    <Drawer
      open={true}
      onClose={() => {
        router.push("/");
      }}
    >
      <div className="p-8">
        {commentResponse.isLoading ? (
          <div className="animate-pulse bg-foreground/10 text-2xl font-bold font-mono w-full">
            &nbsp;
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold font-mono">
              {commentResponse.data.title}
            </h2>
            <p className="text-sm text-foreground/50">
              {commentResponse.data.prName}
            </p>
            <p className="text-sm text-foreground/50">
              {commentResponse.data.repoName}
            </p>
            <p className="text-sm text-foreground/50">test</p>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default IssueDrawer;
