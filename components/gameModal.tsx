"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useChat } from 'ai/react'
// @ts-ignore
export default function GameModal({isOpen, onOpenChange}) {
  const { input, handleInputChange, handleSubmit, isLoading, messages } = useChat({
    api: '/api/chat'
  });
  console.log(messages, input)
  const gameScreen = {
    screen: '游戏开始',
    message: `[系统启动中...]\n
    [加载游戏数据...]\n
    [初始化角色状态... 健康值: 100, 幸运值: 50, 金钱值: 20]
    [游戏开始...]
    
    你是一个名叫艾瑞克的冒险者，身处在一个古老且神秘的世界。你的目标是寻找传说中的神器，但是这个世界充满了未知和危险。你准备好开始你的冒险了吗？
    
    (｡•̀ᴗ-)✧
    
    健康值: 100 (100-0=100)
    幸运值: 50 (50+0=50)
    金钱值: 20 (20+0=20)
    `,
    buttons: [
      '去市场',
      '开始冒险'
    ]
  }

  const submit = (e: any, msg: string) => {
    e.target.value = msg;
    handleInputChange(e);
    handleSubmit(e);
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
              <ModalHeader className="flex flex-col gap-1">{gameScreen.screen}</ModalHeader>
              <ModalBody>
              {gameScreen.message}
              </ModalBody>
              <ModalFooter>
              {gameScreen.buttons.map(BT => 
                <Button key={BT} className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onClick={(e) => submit(e, BT)}>
                  {BT}
                </Button>)}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
