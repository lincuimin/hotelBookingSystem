import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import Table from "../ui/Table";
import Modal from "../ui/Modal";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/input";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import Tag from "../ui/Tag";
import Spinner from "../ui/Spinner";
import ActionButton from "../ui/ActionButton";
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../services/apiRooms";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { useToast } from "../context/ToastContext";

function RoomForm({ roomToEdit = {}, onCloseModal, onSave }) {
  const { id: editId, ...editValues } = roomToEdit;
  const isEditSession = Boolean(editId);

  const [type, setType] = useState(editValues.type || "");
  const [capacity, setCapacity] = useState(editValues.capacity || 1);
  const [price, setPrice] = useState(editValues.price || 0);
  const [description, setDescription] = useState(editValues.description || "");
  const [isAvailable, setIsAvailable] = useState(
    editValues.is_available !== undefined ? editValues.is_available : true
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      type,
      capacity: Number(capacity),
      price: Number(price),
      description,
      is_available: Boolean(isAvailable),
    };

    if (isEditSession) {
      await updateRoom(editId, data);
    } else {
      await createRoom(data);
    }
    onSave();
    onCloseModal?.();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="房间类型">
        <Input
          type="text"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </FormRow>
      <FormRow label="容量 (人)">
        <Input
          type="number"
          id="capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
          min={1}
        />
      </FormRow>
      <FormRow label="价格 (¥)">
        <Input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min={0}
        />
      </FormRow>
      <FormRow label="描述">
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormRow>
      <FormRow label="是否可用">
        <Select
          id="isAvailable"
          value={isAvailable}
          onChange={(e) => setIsAvailable(e.target.value === "true")}
          options={[
            { value: true, label: "是" },
            { value: false, label: "否" },
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

export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showError, showSuccess } = useToast();

  async function fetchRooms() {
    setIsLoading(true);
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (error) {
      showError(error.message || "获取房间列表失败");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("确定要删除这个房间吗？")) {
      try {
        await deleteRoom(id);
        showSuccess("房间删除成功");
        fetchRooms();
      } catch (error) {
        showError(error.message || "删除房间失败");
      }
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal" style={{ marginBottom: "2rem" }}>
        <Heading as="h1">房间</Heading>
        <Modal>
          <Modal.Open opens="create-room">
            <Button>添加房间</Button>
          </Modal.Open>
          <Modal.Window name="create-room">
            <RoomForm onSave={fetchRooms} />
          </Modal.Window>
        </Modal>
      </Row>

      <Row>
        <Table columns="0.6fr 1.2fr 0.6fr 0.8fr 1fr 2fr 0.8fr">
          <Table.Header>
            <div>房间号</div>
            <div>类型</div>
            <div>容量</div>
            <div>价格</div>
            <div>状态</div>
            <div>描述</div>
            <div>操作</div>
          </Table.Header>

          <Table.Body
            data={rooms}
            render={(room) => (
              <Table.Row key={room.id}>
                <div>{room.id}</div>
                <div>{room.type}</div>
                <div>{room.capacity}人</div>
                <div>¥{room.price}</div>
                <div>
                  {!room.is_available ? (
                    <Tag type="red">维护中</Tag>
                  ) : room.is_booked ? (
                    <Tag type="blue">已预订</Tag>
                  ) : (
                    <Tag type="green">空闲</Tag>
                  )}
                </div>
                <div>{room.description}</div>
                <div>
                  <Modal>
                    <Modal.Open opens="edit">
                      <ActionButton>
                        <HiPencil />
                      </ActionButton>
                    </Modal.Open>
                    <Modal.Window name="edit">
                      <RoomForm roomToEdit={room} onSave={fetchRooms} />
                    </Modal.Window>
                  </Modal>

                  <ActionButton onClick={() => handleDelete(room.id)}>
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
