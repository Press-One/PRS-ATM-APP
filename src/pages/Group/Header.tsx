import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdInfoOutline } from 'react-icons/md';
import { HiOutlineShare } from 'react-icons/hi';
import { FiDelete, FiChevronLeft } from 'react-icons/fi';
import { Menu, MenuItem } from '@material-ui/core';

export default observer(() => {
  const state = useLocalStore(() => ({
    anchorEl: null,
    showMenu: false,
    showBackButton: false,
  }));

  const handleMenuClick = (event: any) => {
    state.anchorEl = event.currentTarget;
  };

  const handleMenuClose = () => {
    state.anchorEl = null;
    state.showBackButton = true;
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
        <div className="font-bold text-gray-4a text-15 leading-none tracking-wide">
          今天有什么瓜可以吃？
        </div>
        <div className="py-1 px-3 rounded-full bg-indigo-100 text-indigo-400 text-12 leading-none ml-3 font-bold tracking-wide">
          同步中...
        </div>
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
          PaperProps={{
            style: {
              width: 110,
              margin: '27px 0 0 -10px',
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <div className="flex items-center text-gray-600 leading-none pl-1 py-2">
              <span className="flex items-center mr-3">
                <MdInfoOutline className="text-18 opacity-50" />
              </span>
              <span className="font-bold">详情</span>
            </div>
          </MenuItem>
          <MenuItem>
            <div className="flex items-center text-gray-600 leading-none pl-1 py-2">
              <span className="flex items-center mr-3">
                <HiOutlineShare className="text-16 opacity-50" />
              </span>
              <span className="font-bold">分享</span>
            </div>
          </MenuItem>
          <MenuItem>
            <div className="flex items-center text-red-400 leading-none pl-1 py-2">
              <span className="flex items-center mr-3">
                <FiDelete className="text-16 opacity-50" />
              </span>
              <span className="font-bold">离开</span>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
});
