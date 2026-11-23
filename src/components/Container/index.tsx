type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className="px-4 flex-1">
      <div className="mx-auto p-6 xl:max-w-300">{children}</div>
    </div>
  );
}
