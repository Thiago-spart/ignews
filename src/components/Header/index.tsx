import Image from "next/image";
import { SignInButton } from "./SignInButton";

import { Container, ContainerContent, NavLink } from "./styles";

export const Header = () => {
	return (
		<Container>
			<ContainerContent>
				<Image src="/images/logo.svg" alt="ig.news" width="100" height="76" />
				<nav>
					<NavLink className="active">Home</NavLink>
					<NavLink>Posts</NavLink>
				</nav>

				<SignInButton />
			</ContainerContent>
		</Container>
	);
};
