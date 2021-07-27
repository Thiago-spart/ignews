import type { AppProps } from "next/app";
import { GlobalStyles } from "../../styles/global";
import { Header } from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Header />
			<Component {...pageProps} />
			<GlobalStyles />
		</>
	);
}
export default MyApp;
