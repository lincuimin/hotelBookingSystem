// Mock data for Employees (Staff)
let employees = [
  {
    id: 1,
    name: "张三",
    email: "zhangsan@hotel.com",
    password: "password123",
    gender: "男",
    department: "前厅部",
    position: "前台接待",
    hire_date: "2023-01-15",
    phone: "13800138001",
  },
  {
    id: 2,
    name: "李四",
    email: "lisi@hotel.com",
    password: "password123",
    gender: "女",
    department: "客房部",
    position: "客房主管",
    hire_date: "2022-05-20",
    phone: "13900139002",
  },
  {
    id: 3,
    name: "王五",
    email: "wangwu@hotel.com",
    password: "password123",
    gender: "男",
    department: "安保部",
    position: "保安队长",
    hire_date: "2021-11-11",
    phone: "13700137003",
  },
];

export async function getEmployees() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return employees;
}

export async function createEmployee(newEmployee) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const id = Math.floor(Math.random() * 10000);
  const employee = { ...newEmployee, id };
  employees = [employee, ...employees];
  return employee;
}

export async function updateEmployee(id, updatedEmployee) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  employees = employees.map((emp) =>
    emp.id === id ? { ...emp, ...updatedEmployee } : emp
  );
  return { ...updatedEmployee, id };
}

export async function deleteEmployee(id) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  employees = employees.filter((emp) => emp.id !== id);
  return id;
}
