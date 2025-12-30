// Mock data for Customers
let customers = [
  {
    id: 1,
    name: "赵六",
    email: "zhaoliu@example.com",
    password: "password123",
    id_card: "110101199001011234",
    phone: "15000150001",
    gender: "男",
    check_in_count: 5,
    total_amount: 2500.0,
  },
  {
    id: 2,
    name: "孙七",
    email: "sunqi@example.com",
    password: "password123",
    id_card: "310101199505055678",
    phone: "15100151002",
    gender: "女",
    check_in_count: 2,
    total_amount: 800.0,
  },
];

export async function getCustomers() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return customers;
}

export async function createCustomer(newCustomer) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const id = Math.floor(Math.random() * 10000);
  // Initialize stats for new customer
  const customer = {
    ...newCustomer,
    id,
    check_in_count: 0,
    total_amount: 0,
  };
  customers = [customer, ...customers];
  return customer;
}

export async function updateCustomer(id, updatedCustomer) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  customers = customers.map((cust) =>
    cust.id === id ? { ...cust, ...updatedCustomer } : cust
  );
  return { ...updatedCustomer, id };
}
