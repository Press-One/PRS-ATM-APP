import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { BiUser } from 'react-icons/bi';
import { RiAddLine } from 'react-icons/ri';
import GroupEditorModal from './GroupEditorModal';
import classNames from 'classnames';

export default observer(() => {
  const state = useLocalStore(() => ({
    activeGroupId: '',
    showGroupEditorModal: false,
  }));

  const groups: any = [
    {
      group_id: '8923a026-eca8-4670-be4c-716166d5ba0f',
      group_name: '自学 Go 语言',
    },
    {
      group_id: '8923a026-eca8-4670-be4c-716166d5ba01',
      group_name: '定投改变命运',
    },
    {
      group_id: '8923a026-eca8-4670-be4c-716166d5ba02',
      group_name: '暴富指南',
    },
    {
      group_id: '8923a026-eca8-4670-be4c-716166d5ba03',
      group_name: '今天有什么瓜可以吃？',
    },
    {
      group_id: '8923a026-eca8-4670-be4c-716166d5ba04',
      group_name: '恋情情感专区',
    },
  ];

  const openGroup = (groupId: string) => {
    state.activeGroupId = groupId;
  };

  return (
    <div className="relative flex flex-col h-screen">
      <div className="pl-4 pr-3 leading-none h-13 flex items-center justify-between text-gray-500 border-b border-gray-200 font-bold tracking-widest">
        <div className="flex items-center">
          <div className="border-4 rounded-full border-indigo-200 w-4 h-4 mr-2" />
          <span className="opacity-75 text-15">圈子</span>
        </div>
        <div
          className="flex items-center"
          onClick={() => {
            state.showGroupEditorModal = true;
          }}
        >
          <div className="py-1 px-1 mr-2 cursor-pointer">
            <RiAddLine className="text-24 opacity-75" />
          </div>
          <div className="py-1 px-1 cursor-pointer">
            <BiUser className="text-20 opacity-[0.72]" />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {groups.map((group: any) => (
          <div key={group.group_id}>
            <div
              className={classNames(
                {
                  'bg-indigo-300 text-indigo-400 bg-opacity-25':
                    state.activeGroupId === group.group_id,
                  'text-gray-4a': state.activeGroupId !== group.group_id,
                },
                'leading-none font-bold text-14 py-4 px-4 cursor-pointer hover:bg-opacity-25 hover:bg-indigo-300 hover:text-indigo-400 tracking-wider'
              )}
              onClick={() => openGroup(group.group_id)}
            >
              {group.group_name}
            </div>
          </div>
        ))}
      </div>
      <GroupEditorModal
        open={state.showGroupEditorModal}
        onClose={() => {
          state.showGroupEditorModal = false;
        }}
      />
    </div>
  );
});
