// Mock data for Rooms (Cabins)
let rooms = [
  {
    id: 101,
    is_booked: false,
    is_available: true,
    price: 300,
    type: "标准间",
    capacity: 2,
    description: "舒适的标准双人间，配备独立卫浴。",
  },
  {
    id: 102,
    is_booked: true,
    is_available: true,
    price: 500,
    type: "豪华大床房",
    capacity: 2,
    description: "宽敞豪华大床房，拥有城市景观。",
  },
  {
    id: 201,
    is_booked: false,
    is_available: false,
    price: 800,
    type: "家庭套房",
    capacity: 4,
    description: "适合家庭入住，包含两个卧室和客厅。",
  },
  {
    id: 202,
    is_booked: false,
    is_available: true,
    price: 1200,
    type: "总统套房",
    capacity: 2,
    description: "顶级奢华体验，私人管家服务。",
  },
];

export async function getRooms() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return rooms;
}

export async function createRoom(newRoom) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const id = Math.floor(Math.random() * 1000) + 300; // Random ID
  const room = { ...newRoom, id, is_booked: false };
  rooms = [room, ...rooms];
  return room;
}

export async function updateRoom(id, updatedRoom) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  rooms = rooms.map((room) =>
    room.id === id ? { ...room, ...updatedRoom } : room
  );
  return { ...updatedRoom, id };
}

export async function deleteRoom(id) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  rooms = rooms.filter((room) => room.id !== id);
  return id;
}
