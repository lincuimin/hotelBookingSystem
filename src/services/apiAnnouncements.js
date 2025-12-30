// Mock data
let announcements = [
  {
    id: 1,
    title: "泳池维护通知",
    context:
      "我们将于本周三下午2点至5点对泳池进行例行维护，届时泳池将暂停开放。给您带来的不便敬请谅解。",
    publish_time: "2023-10-25T10:00:00",
    end_time: "2023-10-26T18:00:00",
    status: "active",
  },
  {
    id: 2,
    title: "早餐时间调整",
    context: "从下个月开始，早餐供应时间将延长至上午10:30。",
    publish_time: "2023-10-20T08:00:00",
    end_time: "2023-11-20T08:00:00",
    status: "active",
  },
  {
    id: 3,
    title: "节日特惠活动",
    context: "圣诞节期间入住可享受8折优惠，详情请咨询前台。",
    publish_time: "2023-12-01T09:00:00",
    end_time: "2023-12-25T23:59:59",
    status: "scheduled",
  },
];

export async function getAnnouncements() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return announcements;
}

export async function createAnnouncement(newAnnouncement) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const id = Math.floor(Math.random() * 10000);
  const announcement = {
    ...newAnnouncement,
    id,
    publish_time: new Date().toISOString(),
  };
  announcements = [announcement, ...announcements];
  return announcement;
}

export async function updateAnnouncement(id, updatedAnnouncement) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  announcements = announcements.map((ann) =>
    ann.id === id ? { ...ann, ...updatedAnnouncement } : ann
  );
  return { ...updatedAnnouncement, id };
}

export async function deleteAnnouncement(id) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  announcements = announcements.filter((ann) => ann.id !== id);
  return id;
}
