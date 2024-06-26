import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Modal from "@/components/modals/Modal";
import RegisterModal from "@/components/modals/RegisterModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogInModal from "@/components/modals/LogInModal";
import getCurrentUser from "./libs/actions/getCurrentUser.action";
import RentModal from "@/components/modals/RentModal";
import MainModalContainer from "@/components/modals/MainModalContainer";
const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "A booking/reservation website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="s9oJup06uNe5EbnDyrx1Q41nMsOXYalZQN_y0vp_XM4"
      />
      <body className={font.className}>
        <ToastContainer pauseOnHover={false} autoClose={2500} />
        <MainModalContainer />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
