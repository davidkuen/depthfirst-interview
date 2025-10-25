import useFakeGETApi from "./useFakeGETApi";
import SAMPLE_COMMENTS_ALL from "../sample_responses/comments_all.json";
import React from "react";

// const SAMPLE_COMMENTS = [
//   {
//     url: "https://api.github.com/repos/octocat/Hello-World/pulls/comments/1",
//     pull_request_review_id: 42,
//     id: 10,
//     node_id: "MDI0OlB1bGxSZXF1ZXN0UmV2aWV3Q29tbWVudDEw",
//     diff_hunk: "@@ -16,33 +16,40 @@ public class Connection : IConnection...",
//     path: "file1.txt",
//     position: 1,
//     original_position: 4,
//     commit_id: "6dcb09b5b57875f334f61aebed695e2e4193db5e",
//     original_commit_id: "9c48853fa3dc5c1c3d6f1f1cd1f2743e72652840",
//     in_reply_to_id: 8,
//     user: {
//       login: "octocat",
//       id: 1,
//       node_id: "MDQ6VXNlcjE=",
//       avatar_url: "https://github.com/images/error/octocat_happy.gif",
//       gravatar_id: "",
//       url: "https://api.github.com/users/octocat",
//       html_url: "https://github.com/octocat",
//       followers_url: "https://api.github.com/users/octocat/followers",
//       following_url:
//         "https://api.github.com/users/octocat/following{/other_user}",
//       gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
//       starred_url:
//         "https://api.github.com/users/octocat/starred{/owner}{/repo}",
//       subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
//       organizations_url: "https://api.github.com/users/octocat/orgs",
//       repos_url: "https://api.github.com/users/octocat/repos",
//       events_url: "https://api.github.com/users/octocat/events{/privacy}",
//       received_events_url:
//         "https://api.github.com/users/octocat/received_events",
//       type: "User",
//       site_admin: false,
//     },
//     body: "Great stuff!",
//     created_at: "2011-04-14T16:00:49Z",
//     updated_at: "2011-04-14T16:00:49Z",
//     html_url: "https://github.com/octocat/Hello-World/pull/1#discussion-diff-1",
//     pull_request_url:
//       "https://api.github.com/repos/octocat/Hello-World/pulls/1",
//     author_association: "NONE",
//     _links: {
//       self: {
//         href: "https://api.github.com/repos/octocat/Hello-World/pulls/comments/1",
//       },
//       html: {
//         href: "https://github.com/octocat/Hello-World/pull/1#discussion-diff-1",
//       },
//       pull_request: {
//         href: "https://api.github.com/repos/octocat/Hello-World/pulls/1",
//       },
//     },
//     start_line: 1,
//     original_start_line: 1,
//     start_side: "RIGHT",
//     line: 2,
//     original_line: 2,
//     side: "RIGHT",
//   },
// ];

// The following schemas are what our internal api returns. The data is derived/transformed from the github api response on the server side.
// We're faking the data for the purposes of this demo.

export type CommentPreviewSchema = {
  id: string;
  createdAt: Date;
  prName: string;
  status: "open" | "accepted" | "rejected";
  repoName: string;
  title: string;
};

export type StatsBucket = {
  date: Date;
  count: number;
};

export type CommentsResponse = {
  comments: CommentPreviewSchema[];
  stats: {
    total: StatsBucket[];
    open: StatsBucket[];
    accepted: StatsBucket[];
    rejected: StatsBucket[];
  };
};

const generateFakeStats = () => {
  return [
    {
      date: new Date("2025-05-30T00:00:00.000Z"),
      count: Math.floor(Math.random() * 100),
    },
    {
      date: new Date("2025-05-31T00:00:00.000Z"),
      count: Math.floor(Math.random() * 100),
    },
    {
      date: new Date("2025-06-01T00:00:00.000Z"),
      count: Math.floor(Math.random() * 100),
    },
    {
      date: new Date("2025-06-02T00:00:00.000Z"),
      count: Math.floor(Math.random() * 100),
    },
    {
      date: new Date("2025-06-03T00:00:00.000Z"),
      count: Math.floor(Math.random() * 100),
    },
    {
      date: new Date("2025-06-04T00:00:00.000Z"),
      count: Math.floor(Math.random() * 100),
    },
    {
      date: new Date("2025-06-05T00:00:00.000Z"),
      count: Math.floor(Math.random() * 100),
    },
  ];
};

const useComments = ({ repoName }: { repoName: string }) => {
  let response: CommentsResponse;

  const fakeStats = React.useMemo(
    () => ({
      total: generateFakeStats(),
      open: generateFakeStats(),
      accepted: generateFakeStats(),
      rejected: generateFakeStats(),
    }),
    [repoName]
  );

  const allComments = SAMPLE_COMMENTS_ALL.comments.map((comment) => ({
    id: comment.id,
    createdAt: new Date(comment.createdAt),
    prName: comment.prName,
    status: comment.status as "open" | "accepted" | "rejected",
    repoName: comment.repoName,
    title: comment.title,
  }));

  switch (repoName) {
    case "":
      response = {
        comments: allComments,
        stats: fakeStats,
      };
      break;
    case "DepthFirst/mono":
      response = {
        comments: allComments.filter(
          (comment) => comment.repoName === "DepthFirst/mono"
        ),
        stats: fakeStats,
      };
      break;
    case "DepthFirst/service-auth":
      response = {
        comments: allComments.filter(
          (comment) => comment.repoName === "DepthFirst/service-auth"
        ),
        stats: fakeStats,
      };
      break;
    case "DepthFirst/mobile-ios":
      response = {
        comments: allComments.filter(
          (comment) => comment.repoName === "DepthFirst/mobile-ios"
        ),
        stats: fakeStats,
      };
      break;
    default:
      response = {
        comments: allComments,
        stats: fakeStats,
      };
      break;
  }
  return useFakeGETApi<CommentsResponse>(response);
};

export default useComments;
