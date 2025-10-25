import IssueDrawer from "./components/IssueDrawer";

export default async function IssuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <IssueDrawer id={id} />;
}
