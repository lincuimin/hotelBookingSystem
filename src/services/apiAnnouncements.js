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

export async function getAnnouncements() {
  const response = await fetch(`${API_BASE}/notices`);
  return handleResponse(response, '获取公告列表失败');
}

export async function getActiveAnnouncements() {
  const response = await fetch(`${API_BASE}/notices/active`);
  return handleResponse(response, '获取有效公告失败');
}

export async function createAnnouncement(newAnnouncement) {
  const response = await fetch(`${API_BASE}/notices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnnouncement),
  });
  return handleResponse(response, '创建公告失败');
}

export async function updateAnnouncement(id, updatedAnnouncement) {
  const response = await fetch(`${API_BASE}/notices/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnnouncement),
  });
  return handleResponse(response, '更新公告失败');
}

export async function deleteAnnouncement(id) {
  const response = await fetch(`${API_BASE}/notices/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    try {
      const error = await response.json();
      throw new Error(error.error || error.message || '删除公告失败');
    } catch (e) {
      if (e.message) throw e;
      throw new Error('删除公告失败');
    }
  }
  return id;
}
