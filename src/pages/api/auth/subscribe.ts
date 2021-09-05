import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/client'
import { stripe } from "../../../services/stripe";

export default async(req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const session = await getSession({ req })

		const stripeCustomer = await stripe.customers.create({
			email: String(session?.user?.email)
		})

		const stripeCheckoutSession = await stripe.checkout.sessions.create({
			customer: stripeCustomer.id,
			payment_method_types: ['card'],
			billing_address_collection: 'required',
			line_items: [
				{ price: 'price_1JK6V0Ea5aqM8pCceM5UAQtB', quantity: 1 }
			],
			mode: 'subscription',
			allow_promotion_codes: true,
			success_url: String(process.env.STRIPE_SUCCESS_URL),
			cancel_url: String(process.env.STRIPE_CANCEL_URL)
		})

		return res.status(200).json({ sessionId: stripeCheckoutSession.id})
	} else {
		res.setHeader('Allow', "POST")
		res.status(405).end('Method not allowed')
	}
}