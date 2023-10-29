"use client"
import { scanner } from "@/app/util/parserTemplate";
// import parserTemplate from "@/app/util/parserTemplate";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { ChatRequestOptions } from "ai";
import { Message, useChat } from 'ai/react'
import { ChangeEvent, FormEvent, useEffect, useLayoutEffect, useMemo } from "react";
interface IProps {
  isOpen: boolean;
  messages: Message[];
  handleSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
}
// @ts-ignore
 const GameModal: React.FC<IProps> = ({isOpen, onOpenChange, messages, handleInputChange, handleSubmit}) => {
  //const { input, handleInputChange, handleSubmit, isLoading, messages } = useChat();
  console.log(messages.filter(msg => msg.role === 'assistant'));
  const output = useMemo(() => messages.filter(msg => msg.role === 'assistant').pop(), [messages]);
  const cc = scanner(output?.content || '');
  const gameScreen = {
    screen: cc.screen,
    message: cc.story,
    buttons: cc.tip ? cc?.phrase?.split(/(、)/).filter(s => !/(、|\d )/.test(s)) : [],
    tip: cc.tip,
  }

  const submit = (e: any, msg: string) => {
    e.target.value = msg;
    handleInputChange(e);
    handleSubmit(e, {
			options: {
				headers: {
					apiKey: localStorage.getItem('OPENAI_API_KEY') || ''
				}
			}
		})
  }

  return (
    <>
      <Modal 
        backdrop="blur" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        isDismissable={false}
        scrollBehavior="inside"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Game</ModalHeader>
              <ModalBody>
              {gameScreen.screen}
              {gameScreen?.message}
              </ModalBody>
              <ModalFooter className="flex flex-wrap">
              {gameScreen.buttons.map(BT => 
                <form onSubmit={(e) => submit(e, BT)} key={BT}>
                  <Button key={BT} className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20 text-xs" type="submit">
                    {BT}
                  </Button> 
                </form>)}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
export default GameModal;