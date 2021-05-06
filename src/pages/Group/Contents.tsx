import React from 'react';
import { observer } from 'mobx-react-lite';
import Content from './Content';

export default observer((props: any) => {
  const contents: any = [
    {
      author: '浩然',
      avatar:
        'https://mixin-images.zeromesh.net/XN5OIg7Jb50JCwskfVKgWIzxt8XSIlXQ_oyVx9lWcopGQe7uM_ZQjSl1JX4sZ_8ORGZIBXUcPSplisFKt_fZnEg=s256?image=&action=resize:w_80',
      content:
        '想要记录一下今天早上那莫名想哭的情绪，打开电脑先在自己写过的文字中搜了一下「情绪」二字，发现自己有超过几十篇文章都在围绕这「情绪」写来写去……想要记录一下今天早上那莫名想哭的情绪，打开电脑先在自己写过的文字中搜了一下「情绪」二字，发现自己有超过几十篇文章都在围绕这「情绪」写来写去……想要记录一下今天早上那莫名想哭的情绪，打开电脑先在自己写过的文字中搜了一下「情绪」二字，发现自己有超过几十篇文章都在围绕这「情绪」写来写去……想要记录一下今天早上那莫名想哭的情绪，打开电脑先在自己写过的文字中搜了一下「情绪」二字，发现自己有超过几十篇文章都在围绕这「情绪」写来写去……想要记录一下今天早上那莫名想哭的情绪，打开电脑先在自己写过的文字中搜了一下「情绪」二字，发现自己有超过几十篇文章都在围绕这「情绪」写来写去……',
      createdAt: '2021-04-28T08:11:03.863Z',
    },
    {
      author: '田老九',
      avatar: 'https://i.xue.cn/680b327.jpg?image=&action=resize:w_80',
      content:
        '今天是跟大师学管理的第35天，如果你对管理感兴趣，请下载得到APP购买《宁向东的管理学课》，或者在我的朋友圈每天抢一个学习名额，一起学习。',
      createdAt: '2021-04-27T07:22:37.335Z',
    },
    {
      author: '建清',
      avatar:
        'https://mixin-images.zeromesh.net/qNm_3mFPgHmv87mv5TV6eWcVvtwZ2sPtcMSHPHDHBQMmSRT3T1aK5WAm4YZ2ZrmapIFMe9GJ1bMRMjkCd95L9O8=s256?image=&action=resize:w_80',
      content:
        '以太坊一直在发展，我们不能静态的看他，觉得以太坊还是之前的以太坊，以太坊升级可能会分叉，分叉了就归零了，觉得风险很大。其实以太坊的生态上的创新实在太强大，比如项目UNI、MKR、COMP、SNX、YFI等。虽说以太有其自身的问题，但不是不能改进，其实 L2网路、EIP-1559、POS共识机制、全球金融结算层都已经在路上了。',
      createdAt: '2021-04-28T08:13:46.995Z',
    },
    {
      author: '林水水',
      avatar:
        'https://mixin-images.zeromesh.net/XN5OIg7Jb50JCwskfVKgWIzxt8XSIlXQ_oyVx9lWcopGQe7uM_ZQjSl1JX4sZ_8ORGZIBXUcPSplisFKt_fZnEg=s256?image=&action=resize:w_80',
      content:
        '想要记录一下今天早上那莫名想哭的情绪，打开电脑先在自己写过的文字中搜了一下「情绪」二字，发现自己有超过几十篇文章都在围绕这「情绪」写来写去……',
      createdAt: '2021-04-28T08:11:03.863Z',
    },
    {
      author: '田老十',
      avatar: 'https://i.xue.cn/680b327.jpg?image=&action=resize:w_80',
      content:
        '今天是跟大师学管理的第35天，如果你对管理感兴趣，请下载得到APP购买《宁向东的管理学课》，或者在我的朋友圈每天抢一个学习名额，一起学习。',
      createdAt: '2021-04-27T07:22:37.335Z',
    },
    {
      author: '建浊',
      avatar:
        'https://mixin-images.zeromesh.net/qNm_3mFPgHmv87mv5TV6eWcVvtwZ2sPtcMSHPHDHBQMmSRT3T1aK5WAm4YZ2ZrmapIFMe9GJ1bMRMjkCd95L9O8=s256?image=&action=resize:w_80',
      content:
        '以太坊一直在发展，我们不能静态的看他，觉得以太坊还是之前的以太坊，以太坊升级可能会分叉，分叉了就归零了，觉得风险很大。其实以太坊的生态上的创新实在太强大，比如项目UNI、MKR、COMP、SNX、YFI等。虽说以太有其自身的问题，但不是不能改进，其实 L2网路、EIP-1559、POS共识机制、全球金融结算层都已经在路上了。',
      createdAt: '2021-04-28T08:13:46.995Z',
    },
  ];

  return (
    <div>
      {contents.map((content: any) => (
        <div key={content.author} className="cursor-pointer">
          <Content content={content} />
        </div>
      ))}
    </div>
  );
});
