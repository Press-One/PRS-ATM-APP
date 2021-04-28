import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import Dialog from 'components/Dialog';
import { TextField } from '@material-ui/core';
import Button from 'components/Button';
import { sleep } from 'utils';
import { useStore } from 'store';

interface IProps {
  open: boolean;
  onClose: () => void;
}

const CurrencySelector = observer((props: IProps) => {
  const { snackbarStore } = useStore();
  const state = useLocalStore(() => ({
    name: '',
    loading: false,
  }));

  return (
    <div className="bg-white rounded-12 text-center py-8 px-12">
      <div className="w-50">
        <div className="text-18 font-bold text-gray-700">创建圈子</div>
        <div className="pt-3">
          <TextField
            className="w-full"
            placeholder="圈子名称"
            size="small"
            value={state.name}
            onChange={(e) => {
              state.name = e.target.value;
            }}
            margin="dense"
            variant="outlined"
          />
        </div>
        <div
          className="mt-5"
          onClick={async () => {
            if (!state.name) {
              snackbarStore.show({
                message: '圈子名称',
                type: 'error',
              });
              return;
            }
            state.loading = true;
            await sleep(1000);
            props.onClose();
          }}
        >
          <Button fullWidth isDoing={state.loading}>
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
      <CurrencySelector {...props} />
    </Dialog>
  );
});
