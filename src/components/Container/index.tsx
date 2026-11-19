type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <div className="lg:max-w-5xl px-4 mx-auto">{children}</div>;
}
