type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className="px-4">
      <div className="mx-auto p-6">{children}</div>
    </div>
  );
}
