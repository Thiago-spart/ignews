import { NextApiRequest, NextApiResponse } from "next";
import { Readable} from 'stream'
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

const buffer = async (readable: Readable) => {
	const chunks = []

	for await (const chunk of readable) {
		chunks.push(
			typeof chunk === 'string' ? Buffer.from(chunk) : chunk
		)
	}

	return Buffer.concat(chunks)
}

export const config = {
	api: {
		bodyParser: false
	}
}

const relevantEvents = new Set([
	'checkout.session.completed'
])

export const webhooks = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const buf = await buffer(req)
		const secret = req.headers['stripe-signature'] //console

		let event: Stripe.Event

		try {
			event = stripe.webhooks.constructEvent(buf, String(secret), String(process.env.STRIPE_WEBHOOK_SECRET))
		} catch(err) {
			return res.status(400).send(`Webhook error: ${err}`)
		}

		const type = event.type

		if (relevantEvents.has(type)) {
			try {
				switch(type) {
					case 'checkout.session.completed':
						const checkoutSession = event.data.object as Stripe.Checkout.Session
					
						await saveSubscription(
							String(checkoutSession.subscription),
							String(checkoutSession.customer?.toString())
						)
						break;
					default: 
						throw new Error('Unhandled event.')
				}
			} catch(err) {
				return res.json({ error: 'Webhook handler failed.'})
			}
		}
		
		res.status(200).json({ received: true })
	}	else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method not allowed')
	}
}