"use client";

import Drawer from "@/components/Drawer";
import { useRouter } from "next/navigation";
import useComment from "@/api/useComment";
import { DiffHunkViewer } from "@/components/DiffHunkViewer";

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
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold font-mono">
                {commentResponse.data.title}
              </h2>
              <div className="flex gap-2 items-center">
                <div className="text-sm text-foreground/50">
                  {commentResponse.data.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <a
                  href={`https://github.com/${commentResponse.data.repoName}`}
                  target="_blank"
                  className="text-sm text-white bg-foreground/10 px-1 font-mono hover:bg-foreground/20 transition-colors duration-200"
                >
                  {commentResponse.data.repoName}
                </a>
                {commentResponse.data.status === "accepted" ? (
                  <div className="text-sm text-white bg-green-600 px-1 font-mono">
                    Accepted
                  </div>
                ) : commentResponse.data.status === "rejected" ? (
                  <div className="text-sm text-white bg-red-600 px-1 font-mono">
                    Rejected
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2 border-t border-foreground/10 pt-4">
              <div className="text-right">
                <div className="flex gap-2 items-center justify-between">
                  <div className="text-sm text-foreground/50 font-mono">
                    Issue raised by Security Bot 🤖
                  </div>
                  <a
                    href="#"
                    target="_blank"
                    className="text-sm text-white bg-foreground/10 px-1 font-mono hover:bg-foreground/20 transition-colors duration-200"
                  >
                    View in GitHub →
                  </a>
                </div>
              </div>
              <DiffHunkViewer hunk={commentResponse.data.diffHunk} />
              <p className="text-lg text-foreground">
                {commentResponse.data.description}
              </p>
            </div>
            <div className="flex flex-col gap-2 border-t border-foreground/10 pt-4 pl-12">
              {/* <h3 className="text-lg font-bold font-mono">Replies</h3> */}
              {commentResponse.data.replies.map((reply, i) => (
                <div key={`reply-${i}`} className="flex flex-col gap-2">
                  <div className="text-sm text-foreground/50 font-mono">
                    Reply by {reply.user}
                  </div>
                  <p>{reply.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default IssueDrawer;
