import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import Table from "../ui/Table";
import Modal from "../ui/Modal";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/input";
import Select from "../ui/Select";
import Spinner from "../ui/Spinner";
import ActionButton from "../ui/ActionButton";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/apiEmployees";
import { HiPencil, HiTrash } from "react-icons/hi2";

function EmployeeForm({ employeeToEdit = {}, onCloseModal, onSave }) {
  const { id: editId, ...editValues } = employeeToEdit;
  const isEditSession = Boolean(editId);

  const [name, setName] = useState(editValues.name || "");
  const [email, setEmail] = useState(editValues.email || "");
  const [password, setPassword] = useState(editValues.password || "");
  const [gender, setGender] = useState(editValues.gender || "男");
  const [department, setDepartment] = useState(editValues.department || "");
  const [position, setPosition] = useState(editValues.position || "");
  const [hireDate, setHireDate] = useState(editValues.hire_date || "");
  const [phone, setPhone] = useState(editValues.phone || "");

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      gender,
      department,
      position,
      hire_date: hireDate,
      phone,
    };

    if (isEditSession) {
      await updateEmployee(editId, data);
    } else {
      await createEmployee(data);
    }
    onSave();
    onCloseModal?.();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="姓名">
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormRow>
      <FormRow label="邮箱">
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormRow>
      <FormRow label="密码">
        <Input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormRow>
      <FormRow label="性别">
        <Select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          options={[
            { value: "男", label: "男" },
            { value: "女", label: "女" },
          ]}
        />
      </FormRow>
      <FormRow label="部门">
        <Input
          type="text"
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
      </FormRow>
      <FormRow label="职位">
        <Input
          type="text"
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
      </FormRow>
      <FormRow label="入职日期">
        <Input
          type="date"
          id="hireDate"
          value={hireDate}
          onChange={(e) => setHireDate(e.target.value)}
          required
        />
      </FormRow>
      <FormRow label="电话">
        <Input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </FormRow>
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          取消
        </Button>
        <Button type="submit">{isEditSession ? "保存" : "添加"}</Button>
      </FormRow>
    </Form>
  );
}

export function Employees() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchEmployees() {
    setIsLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("确定要删除这名员工吗？")) {
      await deleteEmployee(id);
      fetchEmployees();
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal" style={{ marginBottom: "2rem" }}>
        <Heading as="h1">员工管理</Heading>
        <Modal>
          <Modal.Open opens="create-employee">
            <Button>添加员工</Button>
          </Modal.Open>
          <Modal.Window name="create-employee">
            <EmployeeForm onSave={fetchEmployees} />
          </Modal.Window>
        </Modal>
      </Row>

      <Row>
        <Table columns="0.8fr 1.2fr 1fr 0.5fr 1fr 1fr 1fr 1.2fr 0.5fr">
          <Table.Header>
            <div>姓名</div>
            <div>邮箱</div>
            <div>密码</div>
            <div>性别</div>
            <div>部门</div>
            <div>职位</div>
            <div>入职日期</div>
            <div>电话</div>
            <div>操作</div>
          </Table.Header>

          <Table.Body
            data={employees}
            render={(employee) => (
              <Table.Row key={employee.id}>
                <div>{employee.name}</div>
                <div>{employee.email}</div>
                <div>{employee.password}</div>
                <div>{employee.gender}</div>
                <div>{employee.department}</div>
                <div>{employee.position}</div>
                <div>{employee.hire_date}</div>
                <div>{employee.phone}</div>
                <div>
                  <Modal>
                    <Modal.Open opens="edit">
                      <ActionButton>
                        <HiPencil />
                      </ActionButton>
                    </Modal.Open>
                    <Modal.Window name="edit">
                      <EmployeeForm
                        employeeToEdit={employee}
                        onSave={fetchEmployees}
                      />
                    </Modal.Window>
                  </Modal>

                  <ActionButton onClick={() => handleDelete(employee.id)}>
                    <HiTrash />
                  </ActionButton>
                </div>
              </Table.Row>
            )}
          />
        </Table>
      </Row>
    </>
  );
}
