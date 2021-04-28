import request from '../request';

export default {
  createGroup(data: any) {
    return request(`http://127.0.0.1:8002/api/v1/group `, {
      method: 'POST',
      body: data,
    });
  },
  fetchMyGroups() {
    return request(`http://127.0.0.1:8002/api/v1/group`, {
      method: 'GET',
      minPendingDuration: 300,
    });
  },
};
