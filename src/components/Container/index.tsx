type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 md:px-6">
      {children}
    </main>
  );
}
