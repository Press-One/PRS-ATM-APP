import React from 'react';
import { observer } from 'mobx-react-lite';
import Content from './Content';
import { useStore } from 'store';

export default observer((props: any) => {
  const { groupStore } = useStore();
  // const contents: any = [
  //   {
  //     author: '浩然',
  //     avatar: 'https://source.unsplash.com/user/erondu/100x100',
  //     content:
  //       '想要记录一下今天早上那莫名想哭的情绪，打开电脑先在自己写过的文字中搜了一下「情绪」二字，发现自己有超过几十篇文章都在围绕这「情绪」写来写去……想要记录一下今天早上那莫名想哭的情绪，打开电脑先在自己写过的文字中搜了一下「情绪」二字，发现自己有超过几十篇文章都在围绕这「情绪」写来写去……想要记录一下今天早上那莫名想哭的情绪，打开电脑先在自己写过的文字中搜了一下「情绪」二字，发现自己有超过几十篇文章都在围绕这「情绪」写来写去……想要记录一下今天早上那莫名想哭的情绪，打开电脑先在自己写过的文字中搜了一下「情绪」二字，发现自己有超过几十篇文章都在围绕这「情绪」写来写去……想要记录一下今天早上那莫名想哭的情绪，打开电脑先在自己写过的文字中搜了一下「情绪」二字，发现自己有超过几十篇文章都在围绕这「情绪」写来写去……',
  //     createdAt: '2021-04-28T08:11:03.863Z',
  //   },
  //   {
  //     author: '田老九',
  //     avatar: 'https://source.unsplash.com/user/erondu/101x101',
  //     content:
  //       '今天是跟大师学管理的第35天，如果你对管理感兴趣，请下载得到APP购买《宁向东的管理学课》，或者在我的朋友圈每天抢一个学习名额，一起学习。',
  //     createdAt: '2021-04-27T07:22:37.335Z',
  //   },
  //   {
  //     author: '建清',
  //     avatar: 'https://source.unsplash.com/user/erondu/102x102',
  //     content:
  //       '以太坊一直在发展，我们不能静态的看他，觉得以太坊还是之前的以太坊，以太坊升级可能会分叉，分叉了就归零了，觉得风险很大。其实以太坊的生态上的创新实在太强大，比如项目UNI、MKR、COMP、SNX、YFI等。虽说以太有其自身的问题，但不是不能改进，其实 L2网路、EIP-1559、POS共识机制、全球金融结算层都已经在路上了。',
  //     createdAt: '2021-04-28T08:13:46.995Z',
  //   },
  //   {
  //     author: '林水水',
  //     avatar: 'https://source.unsplash.com/user/erondu/103x103',
  //     content:
  //       '想要记录一下今天早上那莫名想哭的情绪，打开电脑先在自己写过的文字中搜了一下「情绪」二字，发现自己有超过几十篇文章都在围绕这「情绪」写来写去……',
  //     createdAt: '2021-04-28T08:11:03.863Z',
  //   },
  //   {
  //     author: '田老十',
  //     avatar: 'https://source.unsplash.com/user/erondu/104x104',
  //     content:
  //       '今天是跟大师学管理的第35天，如果你对管理感兴趣，请下载得到APP购买《宁向东的管理学课》，或者在我的朋友圈每天抢一个学习名额，一起学习。',
  //     createdAt: '2021-04-27T07:22:37.335Z',
  //   },
  //   {
  //     author: '建浊',
  //     avatar: 'https://source.unsplash.com/user/erondu/105x105',
  //     content:
  //       '以太坊一直在发展，我们不能静态的看他，觉得以太坊还是之前的以太坊，以太坊升级可能会分叉，分叉了就归零了，觉得风险很大。其实以太坊的生态上的创新实在太强大，比如项目UNI、MKR、COMP、SNX、YFI等。虽说以太有其自身的问题，但不是不能改进，其实 L2网路、EIP-1559、POS共识机制、全球金融结算层都已经在路上了。',
  //     createdAt: '2021-04-28T08:13:46.995Z',
  //   },
  // ];

  return (
    <div>
      {groupStore.contents.map((content: any) => (
        <div key={content.author} className="cursor-pointer">
          <Content content={content} />
        </div>
      ))}
    </div>
  );
});
