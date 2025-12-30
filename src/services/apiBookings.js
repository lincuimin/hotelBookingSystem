// Mock data for Orders (Bookings)
let bookings = [
  {
    id: 1001,
    staff_id: 1,
    cabin_id: 101,
    customer_id: 1,
    order_time: "2023-10-20T10:00:00",
    guest_count: 2,
    earliest_check_in_time: "2023-10-25T14:00:00",
    latest_check_out_time: "2023-10-28T12:00:00",
    price: 900,
    check_in_days: 3,
    status: "reserved", // reserved, checked-in, checked-out, cancelled
    remarks: "需要加床",
  },
  {
    id: 1002,
    staff_id: 2,
    cabin_id: 102,
    customer_id: 2,
    order_time: "2023-10-22T09:30:00",
    guest_count: 1,
    earliest_check_in_time: "2023-10-26T14:00:00",
    latest_check_out_time: "2023-10-27T12:00:00",
    price: 500,
    check_in_days: 1,
    status: "checked-in",
    remarks: "",
  },
  {
    id: 1003,
    staff_id: 1,
    cabin_id: 201,
    customer_id: 1,
    order_time: "2023-09-15T15:00:00",
    guest_count: 4,
    earliest_check_in_time: "2023-10-01T14:00:00",
    latest_check_out_time: "2023-10-05T12:00:00",
    price: 3200,
    check_in_days: 4,
    status: "checked-out",
    remarks: "VIP客户",
  },
  {
    id: 1004,
    staff_id: 3,
    cabin_id: 202,
    customer_id: 2,
    order_time: "2023-09-20T11:00:00",
    guest_count: 2,
    earliest_check_in_time: "2023-10-10T14:00:00",
    latest_check_out_time: "2023-10-12T12:00:00",
    price: 2400,
    check_in_days: 2,
    status: "cancelled",
    remarks: "行程变更",
  },
];

export async function getBookings() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return bookings;
}

export async function createBooking(newBooking) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const id = Math.floor(Math.random() * 10000) + 2000;
  const booking = {
    ...newBooking,
    id,
    order_time: new Date().toISOString(),
    status: "reserved",
    staff_id: 1, // Mock staff ID
  };
  bookings = [booking, ...bookings];
  return booking;
}

export async function updateBookingStatus(id, status) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  bookings = bookings.map((booking) =>
    booking.id === id ? { ...booking, status } : booking
  );
  return { id, status };
}

export async function deleteBooking(id) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  bookings = bookings.filter((booking) => booking.id !== id);
  return id;
}
