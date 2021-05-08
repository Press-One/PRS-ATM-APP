import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import Button from 'components/Button';
import { useStore } from 'store';
import TextareaAutosize from 'react-textarea-autosize';
import GroupApi from 'apis/group';
import classNames from 'classnames';
import { sleep } from 'utils';

export default observer(() => {
  const { snackbarStore, groupStore } = useStore();
  const state = useLocalStore(() => ({
    content: '',
    loading: false,
    done: false,
  }));

  const submit = async () => {
    if (!state.content || state.loading) {
      return;
    }
    state.loading = true;
    state.done = false;
    try {
      const res = await GroupApi.postContent({
        type: 'Add',
        object: {
          type: 'Note',
          content: state.content,
          name: '',
        },
        target: {
          id: groupStore.id,
          type: 'Group',
        },
      });
      console.log({ res });
      state.loading = false;
      state.done = true;
      await sleep(400);
      state.content = '';
    } catch (err) {
      state.loading = false;
      console.log(err);
      snackbarStore.show({
        message: '貌似出错了',
        type: 'error',
      });
    }
  };

  return (
    <div className="rounded-12 bg-white px-8 pt-5 pb-4 w-[600px] box-border">
      <TextareaAutosize
        className="w-full textarea-autosize"
        placeholder="有什么想法？"
        minRows={2}
        value={state.content}
        autoFocus={true}
        onChange={(e) => {
          state.content = e.target.value;
        }}
      />
      <div className="mt-1 flex justify-end">
        <Button
          size="small"
          className={classNames({
            'opacity-50': !state.content,
          })}
          isDoing={state.loading}
          isDone={state.done}
          onClick={submit}
        >
          发布
        </Button>
      </div>
      <style jsx global>{`
        .textarea-autosize {
          color: rgba(0, 0, 0, 0.87);
          font-size: 14px;
          padding: 12px;
          font-weight: normal;
          border: 1px solid rgba(0, 0, 0, 0.1) !important;
          border-radius: 4px;
          resize: none;
        }
        .textarea-autosize:focus {
          border-color: #7f9cf5 !important;
          outline: none;
        }
      `}</style>
    </div>
  );
});
