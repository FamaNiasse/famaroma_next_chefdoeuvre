import Footer from "@/components/footer";
import Header from "@/components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/swiper.css';


export default function App({ Component, pageProps }: AppProps) {
  return <>
  <Header/>
  <Component {...pageProps} />
  <Footer/>
  </>
}
