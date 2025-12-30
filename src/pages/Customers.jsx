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
  getCustomers,
  createCustomer,
  updateCustomer,
} from "../services/apiCustomers";
import { HiPencil } from "react-icons/hi2";

function CustomerForm({ customerToEdit = {}, onCloseModal, onSave }) {
  const { id: editId, ...editValues } = customerToEdit;
  const isEditSession = Boolean(editId);

  const [name, setName] = useState(editValues.name || "");
  const [email, setEmail] = useState(editValues.email || "");
  const [password, setPassword] = useState(editValues.password || "");
  const [idCard, setIdCard] = useState(editValues.id_card || "");
  const [phone, setPhone] = useState(editValues.phone || "");
  const [gender, setGender] = useState(editValues.gender || "男");

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      id_card: idCard,
      phone,
      gender,
    };

    if (isEditSession) {
      await updateCustomer(editId, data);
    } else {
      await createCustomer(data);
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
      <FormRow label="身份证号">
        <Input
          type="text"
          id="idCard"
          value={idCard}
          onChange={(e) => setIdCard(e.target.value)}
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

export function Customers() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchCustomers() {
    setIsLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Failed to fetch customers", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal" style={{ marginBottom: "2rem" }}>
        <Heading as="h1">客户管理</Heading>
        <Modal>
          <Modal.Open opens="create-customer">
            <Button>添加客户</Button>
          </Modal.Open>
          <Modal.Window name="create-customer">
            <CustomerForm onSave={fetchCustomers} />
          </Modal.Window>
        </Modal>
      </Row>

      <Row>
        <Table columns="0.8fr 1.2fr 1fr 1.2fr 1fr 0.5fr 0.8fr 0.8fr 0.5fr">
          <Table.Header>
            <div>姓名</div>
            <div>邮箱</div>
            <div>密码</div>
            <div>身份证号</div>
            <div>电话</div>
            <div>性别</div>
            <div>入住次数</div>
            <div>消费总额</div>
            <div>操作</div>
          </Table.Header>

          <Table.Body
            data={customers}
            render={(customer) => (
              <Table.Row key={customer.id}>
                <div>{customer.name}</div>
                <div>{customer.email}</div>
                <div>{customer.password}</div>
                <div>{customer.id_card}</div>
                <div>{customer.phone}</div>
                <div>{customer.gender}</div>
                <div>{customer.check_in_count}</div>
                <div>¥{customer.total_amount}</div>
                <div>
                  <Modal>
                    <Modal.Open opens="edit">
                      <ActionButton>
                        <HiPencil />
                      </ActionButton>
                    </Modal.Open>
                    <Modal.Window name="edit">
                      <CustomerForm
                        customerToEdit={customer}
                        onSave={fetchCustomers}
                      />
                    </Modal.Window>
                  </Modal>
                </div>
              </Table.Row>
            )}
          />
        </Table>
      </Row>
    </>
  );
}
