import React from 'react';
import { observer } from 'mobx-react-lite';
import { ago } from 'utils';

export default observer((props: any) => {
  const { content } = props;

  return (
    <div
      className="rounded-12 bg-white mb-3 px-8 py-6 w-[600px] box-border"
      key={content.author}
    >
      <div className="flex relative">
        <img
          className="rounded-full border-shadow absolute top-0 left-0"
          src={content.avatar}
          alt={content.author}
          width="42"
          height="42"
        />
        <div className="pl-12 ml-2">
          <div className="flex items-center leading-none mt-3-px">
            <div className="text-gray-88 font-bold text-14">
              {content.author}
            </div>
            <div className="px-2 text-gray-1b">·</div>
            <div className="text-12 text-gray-bd">{ago(content.createdAt)}</div>
          </div>
          <div className="mt-2 text-gray-1e break-words whitespace-pre-wrap tracking-wide">
            {content.content}
          </div>
        </div>
      </div>
      <style jsx>{`
        .border-shadow {
          border: 2px solid hsl(212, 12%, 90%);
        }
      `}</style>
    </div>
  );
});
