import React from 'react';
import { observer } from 'mobx-react-lite';
import Content from './Content';
import { useStore } from 'store';
import { ContentItem } from 'apis/group';

export default observer(() => {
  const { groupStore } = useStore();
  return (
    <div>
      {groupStore.contents.map((content: ContentItem) => (
        <div key={content.TrxId} className="cursor-pointer">
          <Content content={content} />
        </div>
      ))}
    </div>
  );
});
