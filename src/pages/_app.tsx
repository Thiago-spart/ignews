import type { AppProps } from "next/app";
import { GlobalStyles } from "../../styles/global";
import { Header } from "../components/Header";
import { Provider as NextAuthProvider } from "next-auth/client";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<NextAuthProvider session={pageProps.session}>
			<Header />
			<Component {...pageProps} />
			<GlobalStyles />
		</NextAuthProvider>
	);
}
export default MyApp;
