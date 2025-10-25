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
  diff_hunk: string;
};

const useComment = ({ id }: { id: string }) => {
  return useFakeGETApi<CommentSchema>(
    SAMPLE_COMMENTS_ALL.comments.find(
      (comment) => comment.id === id
    ) as unknown as CommentSchema
  );
};

export default useComment;
