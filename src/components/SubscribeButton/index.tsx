import { useSession, signIn } from 'next-auth/client'
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import { Button } from "./styles";

interface SubscribeButtonProps {
	priceId: string;
}

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
	const [session] = useSession()
	
	async function handleSubscribe() {
		if (!session) {
			signIn('github')
			return
		}

		try {
			const response = await api.post('/subscribe')

			const { sessionId } = response.data
		
			const stripe = await getStripeJs()

			await stripe?.redirectToCheckout({ sessionId })			
		} catch(err) {
			alert(err)
		}
	}
	
	return (
		<Button type="button" onClick={handleSubscribe}>Subscribe now</Button>
	) 
};
