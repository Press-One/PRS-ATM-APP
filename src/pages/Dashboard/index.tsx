import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useStore } from 'store';
import { useHistory } from 'react-router-dom';
import Page from 'components/Page';
import Account from './Account';
import Assets from './Assets';
import BottomSection from './BottomSection';
import { IProducer } from 'types';

export default observer(() => {
  const { accountStore } = useStore();
  const { isLogin, account, isRunningProducer, isDeveloper } = accountStore;
  const history = useHistory();
  const state = useLocalStore(() => ({
    isFetchedAccount: false,
  }));

  React.useEffect(() => {
    if (isLogin) {
      state.isFetchedAccount = true;
    } else {
      history.replace('/producer');
    }
  }, [isLogin, history, state]);

  return (
    <Page
      title={isDeveloper ? '开发者账号' : '我的账号'}
      loading={!state.isFetchedAccount}
    >
      <div className="relative">
        <div className="flex">
          <div className="flex-1">
            <Assets minHeight={isRunningProducer ? 229 : 153} />
          </div>
          <div className="ml-5 w-300-px">
            <Account producer={account.producer ?? ({} as IProducer)} />
          </div>
        </div>
        <div className="mt-5 pb-4">
          <BottomSection />
        </div>
      </div>
    </Page>
  );
});
