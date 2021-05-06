import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import Loading from 'components/Loading';
import { sleep } from 'utils';
import Sidebar from './Sidebar';
import Header from './Header';
import Editor from './Editor';
import Contents from './Contents';

export default observer(() => {
  const state = useLocalStore(() => ({
    isFetched: false,
  }));

  React.useEffect(() => {
    (async () => {
      await sleep(500);
      state.isFetched = true;
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
      <div className="flex-1 h-screen bg-gray-f7">
        <Header />
        <div className="overflow-y-auto scroll-view">
          <div className="pt-6 flex justify-center">
            <Editor />
          </div>
          <div className="flex justify-center pb-5">
            <Contents />
          </div>
        </div>
        <style jsx>{`
          .scroll-view {
            height: calc(100vh - 52px);
          }
        `}</style>
      </div>
    </div>
  );
});
