const groups: any = [
  {
    group_id: '8923a026-eca8-4670-be4c-716166d5ba0f',
    group_name: '自学 Go 语言',
  },
  {
    group_id: '8923a026-eca8-4670-be4c-716166d5ba01',
    group_name: '定投改变命运',
  },
  {
    group_id: '8923a026-eca8-4670-be4c-716166d5ba02',
    group_name: '暴富指南',
  },
  {
    group_id: '8923a026-eca8-4670-be4c-716166d5ba03',
    group_name: '今天有什么瓜可以吃？',
  },
  {
    group_id: '8923a026-eca8-4670-be4c-716166d5ba04',
    group_name: '恋情情感专区',
  },
];

export function createGroupStore() {
  return {
    groupId: '',
    groupIdSet: new Set(),
    groupMap: {} as any,
    get isSelected() {
      return !!this.groupId;
    },
    get groupIds() {
      return Array.from(this.groupIdSet);
    },
    get groups() {
      return this.groupIds.map((id: any) => this.groupMap[id]);
    },
    get group() {
      return this.groupMap[this.groupId];
    },
    setGroupId(groupId: string) {
      this.groupId = groupId;
    },
    addGroups(groups: any = []) {
      for (const group of groups) {
        this.groupIdSet.add(group.group_id);
        this.groupMap[group.group_id] = group;
      }
    },
  };
}
