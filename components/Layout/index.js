import NavigationBar from "../NavigationBar";
import Header from "../Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <NavigationBar />
    </>
  );
}
