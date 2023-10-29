export function MdExporter({
  content,
  filename,
  children,
}: {
  content: any;
  filename: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={"data:text/markdown;charset=utf-8," + encodeURIComponent(content)}
      download={filename}
    >
      {children}
    </a>
  );
}
