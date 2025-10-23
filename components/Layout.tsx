export const ContentContainer = ({
  children,
  className = "",
}: React.PropsWithChildren<{
  className?: string;
}>) => {
  return <div className={`max-w-5xl mx-auto ${className}`}>{children}</div>;
};
