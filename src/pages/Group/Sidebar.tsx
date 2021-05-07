import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { BiUser } from 'react-icons/bi';
import { RiAddLine } from 'react-icons/ri';
import { MdPeopleOutline } from 'react-icons/md';
import classNames from 'classnames';
import { Menu, MenuItem } from '@material-ui/core';
import GroupEditorModal from './GroupEditorModal';
import MyNodeInfoModal from './MyNodeInfoModal';
import JoinGroupModal from './JoinGroupModal';
import { useStore } from 'store';

export default observer(() => {
  const { groupStore } = useStore();
  const state = useLocalStore(() => ({
    anchorEl: null,
    showMenu: false,
    showGroupEditorModal: false,
    showMyNodeInfoModal: false,
    showJoinGroupModal: false,
  }));

  const openGroup = (groupId: string) => {
    groupStore.setId(groupId);
  };

  const openGroupEditorModal = () => {
    handleMenuClose();
    state.showGroupEditorModal = true;
  };

  const openJoinGroupModal = () => {
    handleMenuClose();
    state.showJoinGroupModal = true;
  };

  const openMyNodeInfoModal = () => {
    state.showMyNodeInfoModal = true;
  };

  const handleMenuClick = (event: any) => {
    state.anchorEl = event.currentTarget;
  };

  const handleMenuClose = () => {
    state.anchorEl = null;
  };

  return (
    <div className="relative flex flex-col h-screen">
      <div className="pl-4 pr-3 leading-none h-13 flex items-center justify-between text-gray-500 border-b border-gray-200 font-bold tracking-widest">
        <div className="flex items-center">
          <div className="border-4 rounded-full border-indigo-200 w-4 h-4 mr-2" />
          <span className="opacity-75 text-15">圈子</span>
        </div>
        <div className="flex items-center">
          <div
            className="py-1 px-1 mr-2 cursor-pointer"
            onClick={handleMenuClick}
          >
            <RiAddLine className="text-24 opacity-75" />
          </div>
          <div
            className="py-1 px-1 cursor-pointer"
            onClick={() => openMyNodeInfoModal()}
          >
            <BiUser className="text-20 opacity-[0.72]" />
          </div>
        </div>
        <Menu
          anchorEl={state.anchorEl}
          keepMounted
          open={Boolean(state.anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          PaperProps={{
            style: {
              width: 140,
              margin: '27px 0px 0px 20px',
            },
          }}
        >
          <MenuItem onClick={() => openGroupEditorModal()}>
            <div className="flex items-center text-gray-600 leading-none pl-1 py-2">
              <span className="flex items-center mr-3">
                <RiAddLine className="text-20 opacity-50" />
              </span>
              <span className="font-bold">创建圈子</span>
            </div>
          </MenuItem>
          <MenuItem onClick={() => openJoinGroupModal()}>
            <div className="flex items-center text-gray-600 leading-none pl-1 py-2">
              <span className="flex items-center mr-3">
                <MdPeopleOutline className="text-20 opacity-50" />
              </span>
              <span className="font-bold">加入圈子</span>
            </div>
          </MenuItem>
        </Menu>
      </div>
      <div className="flex-1 overflow-y-auto">
        {groupStore.groups.map((group: any) => (
          <div key={group.GroupId}>
            <div
              className={classNames(
                {
                  'bg-indigo-300 text-indigo-400 bg-opacity-25':
                    groupStore.id === group.GroupId,
                  'text-gray-4a': groupStore.id !== group.GroupId,
                },
                'leading-none font-bold text-14 py-4 px-4 cursor-pointer hover:bg-opacity-25 hover:bg-indigo-300 hover:text-indigo-400 tracking-wider'
              )}
              onClick={() => openGroup(group.GroupId)}
            >
              {group.GroupName}
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
      <MyNodeInfoModal
        open={state.showMyNodeInfoModal}
        onClose={() => {
          state.showMyNodeInfoModal = false;
        }}
      />
      <JoinGroupModal
        open={state.showJoinGroupModal}
        onClose={() => {
          state.showJoinGroupModal = false;
        }}
      />
    </div>
  );
});
