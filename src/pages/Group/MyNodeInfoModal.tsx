import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import Dialog from 'components/Dialog';

interface IProps {
  open: boolean;
  onClose: () => void;
}

const MyNodeInfo = observer(() => {
  const state = useLocalStore(() => ({
    loading: false,
  }));

  return (
    <div className="bg-white rounded-12 text-center p-8">
      <div className="w-64">
        <div className="text-18 font-bold text-gray-700">我的节点状态</div>
        {state.loading ? '' : ''}
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
      <MyNodeInfo />
    </Dialog>
  );
});
