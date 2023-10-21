"use client"
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import GameModal from "@/components/gameModal";
import { Button, useDisclosure } from "@nextui-org/react";

export default function Home() {
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Make&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>Interesting&nbsp;</h1>
				<br />
				<h1 className={title()}>
					Text Adventure Game Power By GPT.
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Freedom, Storytelling and Unique For U.
				</h2>
			</div>

			<div className="flex gap-3">
				<Button color="primary" variant="shadow"
					onClick={onOpen}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Start Game
				</Button>
				<Link
					isExternal
					as={NextLink}
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link>
			</div>

			<div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						Get started by Gpt 4 <Code color="primary">Go</Code>
					</span>
				</Snippet>
			</div>
			<GameModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
		</section>
	);
}
