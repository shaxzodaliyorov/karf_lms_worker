import { Header } from "../header";

export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};
