// @ts-nocheck
"use client"
import NextLink from "next/link";
import { useChat } from 'ai/react'
import genPrompt from "@/app/util/genPrompt";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import GameModal from "@/components/gameModal";
import { Button, useDisclosure, Input } from "@nextui-org/react";
import { useEffect, useState } from 'react'

export default function Home() {
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const { input, handleInputChange, handleSubmit, stop, messages } = useChat({
	});
	const [background, setBackground] = useState('');
  useEffect(() => {
    var event = new InputEvent('change', {
      bubbles: true, // 是否冒泡
      cancelable: true, // 是否可取消
      composed: true // 是否可穿越 shadow DOM 边界
    });
    
    // 创建一个包含value属性的对象，并将其设置为事件的目标
    var target = {
      value: genPrompt(background)
    };
    Object.defineProperty(event, 'target', { value: target, enumerable: true });

    handleInputChange(event as any);
		if (!isOpen) {
			stop();
		}
  }, [isOpen, background, handleInputChange, stop]);

	const submit = (e) => {
		handleSubmit(e, {
			options: {
				headers: {
					apiKey: localStorage.getItem('OPENAI_API_KEY') || ''
				}
			}
		})
	}
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
				<form onSubmit={submit}>
					<Button color="primary" variant="shadow"
						type="submit"
						onClick={onOpen}
						className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
					>
						Start Game
					</Button>
				</form>
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
			
			<div className="mt-8 min-w-[460px] max-w-md">
				<Input
					key={'default'}
					color={'default'}
					placeholder="Enter your BackGround Story"
					fullWidth
					value={background}
					onValueChange={setBackground}
					/>
			</div>
			<GameModal handleSubmit={handleSubmit} handleInputChange={handleInputChange} messages={messages} isOpen={isOpen} onOpen={onOpen as any} onOpenChange={onOpenChange} />
		</section>
	);
}
