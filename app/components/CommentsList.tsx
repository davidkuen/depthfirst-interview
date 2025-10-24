"use client";

import { useRouter, useSearchParams } from "next/navigation";
import RepoSwitcher from "./RepoSwitcher";
import useComments, { CommentSchema } from "@/api/useComments";
import DailyChart from "@/components/DailyChart";
import Link from "next/link";
import SelectMenu from "@/components/SelectMenu";

const daysAgo = (date: Date): string => {
  const now = new Date();
  // Get rid of time for both dates
  const utc1 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const utc2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const daysDiff = Math.floor((utc1 - utc2) / (1000 * 60 * 60 * 24));
  if (daysDiff < 0) return "in the future";
  if (daysDiff === 0) return "today";
  if (daysDiff === 1) return "yesterday";
  return `${daysDiff} days ago`;
};

const StatusBadge = ({ status }: { status: CommentSchema["status"] }) => {
  if (status === "accepted") {
    return (
      <div className="font-mono text-green-600 text-xl" title="Accepted">
        ✓
      </div>
    );
  }
  if (status === "rejected") {
    return (
      <div className="font-mono text-red-600 text-xl" title="Rejected">
        ✗
      </div>
    );
  }
  return null;
  //   return (
  //     <div className={`rounded-full px-2 text-xs bg-green-600/50`}>{status}</div>
  //   );
};

const CommentLoading = () => {
  return (
    <div className="flex gap-2 items-center hover:bg-foreground/10 py-2 px-4 -mx-4">
      <h3
        className={`text-lg font-bold animate-pulse bg-foreground/10 px-2 w-3/4`}
      >
        &nbsp;
      </h3>
    </div>
  );
};

const CommentItem = ({ comment }: { comment: CommentSchema }) => {
  const done = comment.status === "accepted" || comment.status === "rejected";
  return (
    <Link
      key={comment.id}
      href="#"
      className={`flex gap-2 items-center justify-between hover:bg-foreground/10 py-2 px-4 -mx-4 ${
        done ? "opacity-50" : ""
      }`}
    >
      <div className="flex gap-2 items-center">
        <h3 className={`text-lg font-bold ${done ? "line-through" : ""}`}>
          {comment.title}
        </h3>
        <p className="text-sm text-foreground/50">
          {daysAgo(comment.createdAt)}
        </p>
        <div className="rounded-full bg-foreground/10 px-2 text-xs font-mono">
          {comment.repoName}
        </div>
      </div>
      <StatusBadge status={comment.status} />
    </Link>
  );
};

// in a real app, we would retrieve these from the current project/org or another internal api
const REPOS = [
  "DepthFirst/mono",
  "DepthFirst/service-auth",
  "DepthFirst/mobile-ios",
];

const LoadingChart = () => {
  return <div className="h-48 flex-grow-1 bg-foreground/10 animate-pulse" />;
};

const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border border-foreground/10 px-3 py-2 flex-grow-1 h-48">
      {children}
    </div>
  );
};

export default function CommentsList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const repo = searchParams.get("repo");
  const status = searchParams.get("status");

  const commentsResponse = useComments({ repoName: repo ?? "" });

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 p-4 justify-between border-b border-foreground/10 sticky top-[var(--header-height)] bg-[var(--content-background)] z-10">
        <h1 className="text-xl font-bold font-mono">PR Review Analytics</h1>
        <RepoSwitcher selectedRepo={repo ?? ""} repos={REPOS} />
      </div>
      <div className="flex flex-col gap-4 p-4">
        {commentsResponse.isLoading ? (
          <div className="flex flex-col gap-4">
            <LoadingChart />
            <div className="flex gap-4">
              <LoadingChart />
              <LoadingChart />
              <LoadingChart />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <ChartContainer>
              <DailyChart
                title="Total Issues"
                data={commentsResponse.data.stats.total.map((stat) => ({
                  date: stat.date,
                  value: stat.count,
                }))}
                className="h-full"
                gapSize="large"
              />
            </ChartContainer>
            <div className="flex gap-4">
              <ChartContainer>
                <DailyChart
                  title="Open Issues"
                  data={commentsResponse.data.stats.open.map((stat) => ({
                    date: stat.date,
                    value: stat.count,
                  }))}
                  className="h-full"
                  color="neutral"
                />
              </ChartContainer>
              <ChartContainer>
                <DailyChart
                  title="Accepted Issues"
                  data={commentsResponse.data.stats.accepted.map((stat) => ({
                    date: stat.date,
                    value: stat.count,
                  }))}
                  className="h-full"
                  color="green"
                />
              </ChartContainer>
              <ChartContainer>
                <DailyChart
                  title="Rejected Issues"
                  data={commentsResponse.data.stats.rejected.map((stat) => ({
                    date: stat.date,
                    value: stat.count,
                  }))}
                  className="h-full"
                  color="red"
                />
              </ChartContainer>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold font-mono">Recent Issues</h2>
          <div className="flex gap-2">
            <SelectMenu
              before="Status"
              options={[
                { label: "All", value: "" },
                { label: "Open", value: "open" },
                { label: "Accepted", value: "accepted" },
                { label: "Rejected", value: "rejected" },
              ]}
              selectedOption={status ?? ""}
              onChange={(value) => {
                router.push(
                  `/?repo=${repo || ""}&status=${encodeURIComponent(value)}`
                );
              }}
            />
            <SelectMenu
              disabled // this is nonfunctional
              before="Date"
              options={[
                { label: "Past year", value: "past_year" },
                { label: "Past month", value: "past_month" },
                { label: "Past week", value: "past_week" },
                { label: "Past day", value: "past_day" },
              ]}
              selectedOption={""}
              onChange={() => {}}
            />
          </div>
        </div>
        <div className="flex flex-col">
          {commentsResponse.isLoading ? (
            <div className="flex flex-col">
              <CommentLoading />
              <CommentLoading />
              <CommentLoading />
              <CommentLoading />
              <CommentLoading />
            </div>
          ) : (
            commentsResponse.data.comments
              .filter((comment) => {
                if (!status) return true;
                if (status === "open") return comment.status === "open";
                if (status === "accepted") return comment.status === "accepted";
                if (status === "rejected") return comment.status === "rejected";
                return false;
              })
              .map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
          )}
        </div>
      </div>
    </div>
  );
}
