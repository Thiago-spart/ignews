import Head from "next/head";
import Image from "next/image";

import { Container, Hero } from "../../styles/home";
import { SubscribeButton } from "../components/SubscribeButton";

export default function Home() {
	return (
		<>
			<Head>
				<title>Home | ig.news</title>
			</Head>

			<Container>
				<Hero>
					<span>👏 Hey, welcome</span>
					<h1>
						News about the <span>React</span> world.
					</h1>
					<p>
						Get access to all the publications
						<br />
						<span>for $9.90 month</span>
					</p>
					<SubscribeButton />
				</Hero>

				<Image
					src="/images/avatar.svg"
					alt="Girl coding"
					width="500px"
					height="500px"
				/>
			</Container>
		</>
	);
}
