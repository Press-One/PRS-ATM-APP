import { Group, CreateGroupsResult, NodeInfo, ContentItem } from 'apis/group';
import Store from 'electron-store';

const store = new Store();

export function createGroupStore() {
  return {
    nodeInfo: {} as NodeInfo,
    id: '',
    ids: <string[]>[],
    map: <{ [key: string]: Group }>{},
    contentTrxIds: <string[]>[],
    contentMap: <{ [key: string]: ContentItem }>{},
    justAddedContentTrxId: '',
    get isSelected() {
      return !!this.id;
    },
    get groups() {
      return this.ids
        .map((id: any) => this.map[id])
        .sort((a, b) => b.LastUpdate - a.LastUpdate);
    },
    get contents() {
      return this.contentTrxIds
        .map((trxId: any) => this.contentMap[trxId])
        .sort((a, b) => b.TimeStamp - a.TimeStamp);
    },
    get group() {
      return this.map[this.id];
    },
    get isCurrentGroupOwner() {
      return this.isOwner(this.group);
    },
    get groupSeed() {
      return this.getSeedFromStore(this.id);
    },
    isOwner(group: Group) {
      if (!group) {
        return false;
      }
      return group.OwnerPubKey === this.nodeInfo.node_publickey;
    },
    setId(id: string) {
      if (this.id === id) {
        return;
      }
      if (!this.map[id]) {
        console.error(`groupStore.setId：id 对应的 group 不存在`);
        return;
      }
      this.id = id;
      this.contentTrxIds = [];
      this.contentMap = {};
      this.justAddedContentTrxId = '';
    },
    addGroups(groups: Group[] = []) {
      for (const group of groups) {
        if (!this.map[group.GroupId]) {
          this.ids.unshift(group.GroupId);
        }
        this.map[group.GroupId] = group;
      }
    },
    removeGroup() {
      const removedId = this.id;
      this.id = '';
      this.ids = this.ids.filter((id) => id !== removedId);
      delete this.map[removedId];
      this.contentTrxIds = [];
      this.contentMap = {};
      this.justAddedContentTrxId = '';
    },
    setNodeInfo(nodeInfo: NodeInfo) {
      this.nodeInfo = nodeInfo;
    },
    saveSeedToStore(group: CreateGroupsResult) {
      store.set(`group_seed_${group.group_id}`, group);
    },
    getSeedFromStore(id: string) {
      return store.get(`group_seed_${id}`);
    },
    saveCachedNewContentToStore(content: ContentItem) {
      const cachedNewContents: any = this.getCachedNewContentsFromStore();
      cachedNewContents.push(content);
      store.set(`group_cached_new_contents_${this.id}`, cachedNewContents);
    },
    getCachedNewContentsFromStore() {
      return (store.get(`group_cached_new_contents_${this.id}`) ||
        []) as ContentItem[];
    },
    addContents(contents: ContentItem[] = []) {
      for (const content of contents) {
        if (this.contentMap[content.TrxId]) {
          if (content.Publisher) {
            this.contentMap[content.TrxId] = content;
          }
        } else {
          this.contentTrxIds.unshift(content.TrxId);
          this.contentMap[content.TrxId] = content;
        }
      }
    },
    setJustAddedContentTrxId(trxId: string) {
      this.justAddedContentTrxId = trxId;
    },
  };
}
