import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdInfoOutline } from 'react-icons/md';
import { HiOutlineShare } from 'react-icons/hi';
import { FiDelete, FiChevronLeft } from 'react-icons/fi';
import { Menu, MenuItem } from '@material-ui/core';
import Loading from 'components/Loading';
import ShareModal from './ShareModal';
import GroupInfoModal from './GroupInfoModal';
import { useStore } from 'store';

export default observer(() => {
  const { confirmDialogStore, groupStore } = useStore();
  const state = useLocalStore(() => ({
    anchorEl: null,
    showMenu: false,
    showBackButton: false,
    loading: false,
    showShareModal: false,
    showGroupInfoModal: false,
  }));

  const handleMenuClick = (event: any) => {
    state.anchorEl = event.currentTarget;
  };

  const handleMenuClose = () => {
    state.anchorEl = null;
  };

  const openGroupInfoModal = () => {
    handleMenuClose();
    state.showGroupInfoModal = true;
  };

  const openGroupShareModal = () => {
    handleMenuClose();
    state.showShareModal = true;
  };

  const leaveGroup = () => {
    confirmDialogStore.show({
      content: `确定要离开圈子吗？`,
      okText: '确定',
      isDangerous: true,
      ok: () => {
        confirmDialogStore.hide();
      },
    });
    handleMenuClose();
  };

  const deleteGroup = () => {
    confirmDialogStore.show({
      content: `确定要删除圈子吗？<br />删除之后将无法恢复`,
      okText: '确定',
      isDangerous: true,
      ok: () => {
        confirmDialogStore.hide();
      },
    });
    handleMenuClose();
  };

  if (state.showBackButton) {
    return (
      <div className="border-b border-gray-200 h-13 px-5 flex items-center">
        <div
          className="font-bold text-indigo-400 text-14 leading-none tracking-wide flex items-center cursor-pointer"
          onClick={() => {
            state.showBackButton = false;
          }}
        >
          <FiChevronLeft className="text-20 mr-1 opacity-90" />
          返回
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-200 h-13 px-5 flex items-center justify-between">
      <div className="flex items-center">
        <div
          className="font-bold text-gray-4a text-15 leading-none tracking-wide"
          onClick={() => openGroupInfoModal()}
        >
          {groupStore.group.GroupName}{' '}
        </div>
        {state.loading && (
          <div className="flex items-center py-1 px-3 rounded-full bg-indigo-100 text-indigo-400 text-12 leading-none ml-3 font-bold tracking-wide">
            <span className="mr-1">同步中</span> <Loading size={12} />
          </div>
        )}
      </div>
      <div>
        <div onClick={handleMenuClick} className="p-2">
          <FiMoreHorizontal className="text-indigo-400 text-24 cursor-pointer" />
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
              width: 110,
              margin: '27px 0 0 20px',
            },
          }}
        >
          <MenuItem onClick={() => openGroupInfoModal()}>
            <div className="flex items-center text-gray-600 leading-none pl-1 py-2">
              <span className="flex items-center mr-3">
                <MdInfoOutline className="text-18 opacity-50" />
              </span>
              <span className="font-bold">详情</span>
            </div>
          </MenuItem>
          <MenuItem onClick={() => openGroupShareModal()}>
            <div className="flex items-center text-gray-600 leading-none pl-1 py-2">
              <span className="flex items-center mr-3">
                <HiOutlineShare className="text-16 opacity-50" />
              </span>
              <span className="font-bold">分享</span>
            </div>
          </MenuItem>
          {!groupStore.isCurrentGroupOwner && (
            <MenuItem onClick={() => leaveGroup()}>
              <div className="flex items-center text-red-400 leading-none pl-1 py-2">
                <span className="flex items-center mr-3">
                  <FiDelete className="text-16 opacity-50" />
                </span>
                <span className="font-bold">离开</span>
              </div>
            </MenuItem>
          )}
          {groupStore.isCurrentGroupOwner && (
            <MenuItem onClick={() => deleteGroup()}>
              <div className="flex items-center text-red-400 leading-none pl-1 py-2">
                <span className="flex items-center mr-3">
                  <FiDelete className="text-16 opacity-50" />
                </span>
                <span className="font-bold">删除</span>
              </div>
            </MenuItem>
          )}
        </Menu>
      </div>
      <ShareModal
        open={state.showShareModal}
        onClose={() => {
          state.showShareModal = false;
        }}
      />
      <GroupInfoModal
        open={state.showGroupInfoModal}
        onClose={() => {
          state.showGroupInfoModal = false;
        }}
      />
    </div>
  );
});
