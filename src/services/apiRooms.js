const API_BASE = '/api';

async function handleResponse(response, errorMessage) {
  if (!response.ok) {
    try {
      const error = await response.json();
      throw new Error(error.error || error.message || errorMessage);
    } catch (e) {
      if (e.message) throw e;
      throw new Error(errorMessage);
    }
  }
  return response.json();
}

export async function getRooms() {
  const response = await fetch(`${API_BASE}/cabins`);
  return handleResponse(response, '获取房间列表失败');
}

export async function createRoom(newRoom) {
  const response = await fetch(`${API_BASE}/cabins`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newRoom),
  });
  return handleResponse(response, '创建房间失败');
}

export async function updateRoom(id, updatedRoom) {
  const response = await fetch(`${API_BASE}/cabins/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedRoom),
  });
  return handleResponse(response, '更新房间失败');
}

export async function deleteRoom(id) {
  const response = await fetch(`${API_BASE}/cabins/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    try {
      const error = await response.json();
      throw new Error(error.error || error.message || '删除房间失败');
    } catch (e) {
      if (e.message) throw e;
      throw new Error('删除房间失败');
    }
  }
  return id;
}
