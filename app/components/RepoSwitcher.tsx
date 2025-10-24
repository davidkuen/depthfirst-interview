"use client";

import { SelectMenu } from "@/components/SelectMenu";
import { useRouter } from "next/navigation";

export const RepoSwitcher = ({
  selectedRepo,
  repos,
}: {
  selectedRepo: string;
  repos: string[];
}) => {
  const router = useRouter();
  return (
    <SelectMenu
      before={<span>Repository</span>}
      options={[
        { label: "All", value: "" },
        ...repos.map((repo) => ({ label: repo, value: repo })),
      ]}
      selectedOption={selectedRepo}
      onChange={(value) => {
        if (value === "") {
          router.push("/");
          return;
        }
        router.push(`/?repo=${encodeURIComponent(value)}`);
      }}
    />
  );
};

export default RepoSwitcher;
