interface MaxWidthProps {
  children: React.ReactNode;
}
export const MaxWidth = ({ children }: MaxWidthProps) => {
  return <div className="mx-auto max-w-4xl px-4">{children}</div>;
};
