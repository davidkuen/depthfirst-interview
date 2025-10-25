import useFakeGETApi from "./useFakeGETApi";
import SAMPLE_COMMENTS_ALL from "../sample_responses/comments_all.json";

type CommentSchema = {
  id: string;
  createdAt: Date;
  prName: string;
  status: "open" | "accepted" | "rejected";
  repoName: string;
  title: string;
  description: string;
  diffHunk: string;
};

const useComment = ({ id }: { id: string }) => {
  const comment = SAMPLE_COMMENTS_ALL.comments.find(
    (comment) => comment.id === id
  );

  if (!comment) {
    throw new Error(`Comment with id ${id} not found`);
  }

  return useFakeGETApi<CommentSchema>({
    ...comment,
    createdAt: new Date(comment.createdAt),
    status: comment.status as "open" | "accepted" | "rejected",
  });
};

export default useComment;
