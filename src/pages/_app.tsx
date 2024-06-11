import Footer from "@/components/footer";
import Header from "@/components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/swiper.css';
import { useRouter } from "next/router";


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();


  // Liste des chemins où le header et le footer ne doivent pas apparaître
  const noLayoutPaths = ['/admin-dashboard', '/dashboard'];

  const showLayout = !noLayoutPaths.includes(router.pathname);

  return( <div>
      {showLayout && <Header />}
      <Component {...pageProps} />
      {showLayout && <Footer />}
    </div>
    )
}
