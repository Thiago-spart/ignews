import { Button } from "./styles";

interface SubscribeButtonProps {
	priceId: string;
}

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
	return <Button type="button">Subscribe now</Button>;
};
