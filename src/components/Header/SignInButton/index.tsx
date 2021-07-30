import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import { Button } from "./styles";

export const SignInButton = () => {
	const isUserLoggedIn = true;

	return isUserLoggedIn ? (
		<Button type="button">
			<FaGithub color="#84d361" />
			Nome usuario
			<FiX color="#737380" className="closeIcon" />
		</Button>
	) : (
		<Button type="button">
			<FaGithub color="#eba417" />
			Sign in with Github
		</Button>
	);
};
