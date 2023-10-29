export function scanner(code: string) {
  let currentIndex = 0;
  let strInfo = ''
  let Tag = undefined;
  let isTag = false
  const GameMap: {
    [key: string]: string
  } = {};
  while (currentIndex < code.length) {
    let currentChar = code[currentIndex];
    if (currentChar === '【') {
      // 说明是进到标志位
      Tag = undefined;
      strInfo = ''
      console.log(6666)
      isTag = true;
    }
     else if (currentChar === '】') {
      Tag && (GameMap[Tag as string] = '');
      strInfo = '';
      // 收拢数据
      isTag = false;
    } else {
      //console.log(currentChar)
      strInfo += currentChar;
      if (isTag) {
      // 进入标签
        switch(strInfo) {
          case '场景':
            Tag = 'screen';
            break;
          case '剧情':
            Tag = 'story';
            break;
          case '选项':
            Tag = 'phrase'
            break;
          case '文字提示':
            Tag = 'tip'
        }
      } else {
        GameMap[Tag as string] = strInfo;
      }
    }
    currentIndex++;
  }
  return GameMap;
}