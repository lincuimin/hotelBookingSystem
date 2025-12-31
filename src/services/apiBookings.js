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

export async function getBookings() {
  const response = await fetch(`${API_BASE}/orders`);
  return handleResponse(response, '获取订单列表失败');
}

export async function getBookingsByCustomer(customerId) {
  const response = await fetch(`${API_BASE}/orders/customer/${customerId}`);
  return handleResponse(response, '获取客户订单失败');
}

export async function createBooking(newBooking) {
  const response = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBooking),
  });
  return handleResponse(response, '创建订单失败');
}

export async function updateBookingStatus(id, status) {
  const response = await fetch(`${API_BASE}/orders/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return handleResponse(response, '更新订单状态失败');
}

export async function deleteBooking(id) {
  const response = await fetch(`${API_BASE}/orders/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    try {
      const error = await response.json();
      throw new Error(error.error || error.message || '删除订单失败');
    } catch (e) {
      if (e.message) throw e;
      throw new Error('删除订单失败');
    }
  }
  return id;
}
