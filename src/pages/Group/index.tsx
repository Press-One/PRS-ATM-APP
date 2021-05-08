import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import Loading from 'components/Loading';
import Button from 'components/Button';
import { sleep } from 'utils';
import Sidebar from './Sidebar';
import Header from './Header';
import Editor from './Editor';
import Contents from './Contents';
import BackToTop from 'components/BackToTop';
import { useStore } from 'store';
import GroupApi from 'apis/group';
import { reaction } from 'mobx';

export default observer(() => {
  const { groupStore, confirmDialogStore } = useStore();
  const state = useLocalStore(() => ({
    isFetched: false,
    hasUnreadContents: false,
  }));

  React.useEffect(() => {
    const disposer = reaction(
      () => groupStore.id,
      async (groupId) => {
        try {
          const contents = await GroupApi.fetchContents(groupId);
          console.log({ contents });
        } catch (err) {
          console.log(err);
        }
      }
    );
    return () => {
      disposer();
    };
  }, [groupStore]);

  React.useEffect(() => {
    (async () => {
      try {
        const [nodeInfo, { groups }] = await Promise.all([
          GroupApi.fetchMyNodeInfo(),
          GroupApi.fetchMyGroups(),
        ]);
        if (groups) {
          console.log({ groups });
          console.log({ nodeInfo });
          groupStore.setNodeInfo(nodeInfo);
          groupStore.addGroups(groups);
          const firstGroup = groupStore.groups[0];
          groupStore.setId(firstGroup.GroupId);
        }
        await sleep(500);
        state.isFetched = true;
      } catch (err) {
        console.log(err);
        await sleep(500);
        confirmDialogStore.show({
          content: `圈子没能正常启动，请再尝试一下`,
          okText: '重新启动',
          ok: () => {
            confirmDialogStore.hide();
          },
        });
      }
    })();
  }, [state]);

  if (!state.isFetched) {
    return (
      <div className="flex bg-white h-screen items-center justify-center">
        <div className="-mt-32 -ml-6">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-white">
      <div className="w-[250px] border-r border-l border-gray-200 h-screen">
        <Sidebar />
      </div>
      <div className="flex-1 bg-gray-f7">
        {groupStore.isSelected && (
          <div className="h-screen">
            <Header />
            <div className="overflow-y-auto scroll-view">
              <div className="pt-6 flex justify-center">
                <Editor />
              </div>
              {state.hasUnreadContents && (
                <div className="py-2 mt-3 flex justify-center">
                  <Button outline>有 2 条新内容</Button>
                </div>
              )}
              <div className="flex justify-center pb-5">
                <Contents />
              </div>
            </div>
            <BackToTop elementSelector=".scroll-view" />
            <style jsx>{`
              .scroll-view {
                height: calc(100vh - 52px);
              }
            `}</style>
          </div>
        )}
        {!groupStore.isSelected && (
          <div className="h-screen flex items-center justify-center tracking-widest text-18 text-gray-9b">
            打开一个圈子看看
          </div>
        )}
      </div>
    </div>
  );
});
