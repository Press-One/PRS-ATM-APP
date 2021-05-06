import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import Button from 'components/Button';
import { useStore } from 'store';
import TextareaAutosize from 'react-textarea-autosize';

export default observer(() => {
  const { snackbarStore } = useStore();

  const state = useLocalStore(() => ({
    content: '',
    submitting: false,
    done: false,
  }));
  const submit = () => {
    state.content = '';
    snackbarStore.show({
      message: '发布成功',
    });
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
        <Button size="small" onClick={submit}>
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
