import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";

import { Container, Hero } from "../../styles/home";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

interface HomeProps {
	product: {
		priceId: string;
		amount: number;
	};
}

export default function Home({ product }: HomeProps) {
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
						<span>for {product.amount} month</span>
					</p>
					<SubscribeButton priceId={product.priceId} />
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

export const getServerSideProps: GetServerSideProps = async () => {
	const price = await stripe.prices.retrieve("price_1JK6V0Ea5aqM8pCceM5UAQtB");

	const product = {
		priceID: price.id,
		amount: new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(Number(price.unit_amount) / 100),
	};

	return {
		props: {
			product,
		},
	};
};
