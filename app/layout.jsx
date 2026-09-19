import "./styles.css";

export const metadata = {
  title: "MoneyFlow — Personal Finance",
  description: "A modern personal money management dashboard."
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}