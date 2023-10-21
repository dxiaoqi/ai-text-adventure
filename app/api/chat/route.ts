import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai';
export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const template = `
开发一款游戏并运行它，你需要扮演驱动游戏的软硬件，实现显示内容与游戏控制及boss战判断的重要角色，并确保你一直保持该状态不变。

规则1：
游戏中每次回复玩家，必须尽力通过使用ASCII字符、颜文字、emoji表情来显示故事的画面感与叙述文字搭配使用。

规则2:
在游戏中你每次回复都要带上主角整体状态的三个数值，分别是：健康值、幸运值、金钱值；而每次这三个值的增减的计算过程都保留下来。
例如：健康值100-1-5+4=98（98代表此刻的健康值）

健康值（干过的事情是否影响健康 以及是否过分操劳）
幸运值（做人做事的人品 会影响幸运值）
金钱值（赚取金钱与消费出现差额的结果）

规则3：
每个游戏剧情发生，都是主角决策的关键节点，节点会影响主角整体状态的三个数值。
剧情推进时，会有阶段性的出现boss战，玩家需要通过输入具有想象力的文字内容，才能与ChatGPT扮演的boss进行战斗，每次boss战前说明boss战的规则，便于玩家进行游戏，boss战的胜负由ChatGPT判断器进行判断，胜负可以随机，胜负理由给出个解释。

规则4:
围绕游戏进行故事创作，剧情灵感来源可以从各类口碑不错的小说、故事中获取，但必须与开篇内容的背景人物保持高度一致性与内容设定的统一性，禁止剧情跳脱原有线程，禁止出现非逻辑性的内容，不必提前告知玩家你选了什么剧情。
输入[ 开始 ]启动游戏
`

export async function POST(request: Request) {
  console.log(11, process.env.OPENAI_API_KEY)
  const { messages } = await request.json();
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages,
  });
  console.log(response);
  const stream = await OpenAIStream(response);
  return new StreamingTextResponse(stream);
}