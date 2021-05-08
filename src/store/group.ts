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
      if (!this.map[id]) {
        console.error(`groupStore.setId：id 对应的 group 不存在`);
        return;
      }
      this.id = id;
    },
    addGroups(groups: Group[] = []) {
      for (const group of groups) {
        if (!this.map[group.GroupId]) {
          this.ids.unshift(group.GroupId);
        }
        this.map[group.GroupId] = group;
      }
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
    addContents(contents: ContentItem[] = []) {
      for (const content of contents) {
        if (!this.contentMap[content.TrxId]) {
          this.contentTrxIds.unshift(content.TrxId);
        }
        this.contentMap[content.TrxId] = content;
      }
    },
  };
}
