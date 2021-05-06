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

export default observer(() => {
  const state = useLocalStore(() => ({
    isFetched: false,
    backToTopEnabled: false,
  }));

  React.useEffect(() => {
    (async () => {
      await sleep(500);
      state.isFetched = true;
      await sleep(500);
      state.backToTopEnabled = true;
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
          <div className="py-2 mt-3 flex justify-center">
            <Button outline>有 2 条新内容</Button>
          </div>
          <div className="flex justify-center pb-5">
            <Contents />
          </div>
        </div>
        {state.backToTopEnabled && (
          <BackToTop
            element={document.querySelector('.scroll-view') as HTMLElement}
          />
        )}
        <style jsx>{`
          .scroll-view {
            height: calc(100vh - 52px);
          }
        `}</style>
      </div>
    </div>
  );
});