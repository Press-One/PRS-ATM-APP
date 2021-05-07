import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import Dialog from 'components/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import Button from 'components/Button';
import { MdDone } from 'react-icons/md';
import { remote } from 'electron';
import fs from 'fs';
import util from 'util';
import { sleep } from 'utils';
import { useStore } from 'store';
import GroupApi, { CreateGroupsResult } from 'apis/group';

const pReadFile = util.promisify(fs.readFile);

interface IProps {
  open: boolean;
  onClose: () => void;
}

const MyNodeInfo = observer((props: IProps) => {
  const { snackbarStore, groupStore } = useStore();
  const state = useLocalStore(() => ({
    loading: false,
    done: false,
    loadingSeed: false,
    seed: null as any,
  }));

  const submit = async () => {
    if (state.loading) {
      return;
    }
    state.loading = true;
    state.done = false;
    try {
      const seed = state.seed as CreateGroupsResult;
      if (seed.owner_pubkey === groupStore.nodeInfo.node_publickey) {
        await sleep(500);
        state.loading = false;
        snackbarStore.show({
          message: '这是你创建的圈子，你不需要再加入了',
          type: 'error',
          duration: 2500,
        });
        return;
      }
      await GroupApi.joinGroup(seed);
      await sleep(200);
      const { groups } = await GroupApi.fetchMyGroups();
      if (groups) {
        state.loading = false;
        state.done = true;
        await sleep(300);
        groupStore.addGroups(groups);
        groupStore.setId(seed.group_id);
        props.onClose();
        await sleep(200);
        snackbarStore.show({
          message: '加入成功',
        });
      }
    } catch (err) {
      state.loading = false;
      console.log(err.message);
      snackbarStore.show({
        message: '貌似出错了',
        type: 'error',
      });
    }
  };

  return (
    <div className="bg-white rounded-12 text-center p-8">
      <div className="w-64">
        <div className="text-18 font-bold text-gray-700">加入圈子</div>
        <div className="mt-4 pt-2" />
        <Tooltip
          disableHoverListener={!!state.seed}
          placement="top"
          title="选择要加入圈子的种子文件"
          arrow
        >
          <div className="px-8 py-2">
            <Button
              fullWidth
              color={state.seed ? 'green' : 'primary'}
              isDoing={state.loadingSeed}
              onClick={async () => {
                state.loadingSeed = true;
                try {
                  const file = await remote.dialog.showOpenDialog({
                    filters: [{ name: 'json', extensions: ['json'] }],
                    properties: ['openFile'],
                  });
                  if (!file.canceled && file.filePaths) {
                    const seedString = await pReadFile(
                      file.filePaths[0].toString(),
                      'utf8'
                    );
                    await sleep(500);
                    state.seed = JSON.parse(seedString);
                  }
                } catch (err) {
                  console.log(err.message);
                }
                state.loadingSeed = false;
              }}
            >
              {state.seed ? '种子文件已选中' : '点击选择种子文件'}
              {state.seed && <MdDone className="ml-1 text-15" />}
            </Button>
          </div>
        </Tooltip>
        <div className="mt-6">
          <Button
            fullWidth
            isDoing={state.loading}
            isDone={state.done}
            disabled={!state.seed}
            onClick={submit}
          >
            确定
          </Button>
        </div>
      </div>
    </div>
  );
});

export default observer((props: IProps) => {
  return (
    <Dialog
      disableBackdropClick={false}
      open={props.open}
      onClose={() => props.onClose()}
      transitionDuration={{
        enter: 300,
      }}
    >
      <MyNodeInfo {...props} />
    </Dialog>
  );
});
