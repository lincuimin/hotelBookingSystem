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
import Spinner from "../ui/Spinner";
import ActionButton from "../ui/ActionButton";
import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../services/apiAnnouncements";
import { HiPencil, HiTrash } from "react-icons/hi2";

function AnnouncementForm({ announcementToEdit = {}, onCloseModal, onSave }) {
  const { id: editId, ...editValues } = announcementToEdit;
  const isEditSession = Boolean(editId);

  const [title, setTitle] = useState(editValues.title || "");
  const [context, setContext] = useState(editValues.context || "");
  const [endTime, setEndTime] = useState(
    editValues.end_time ? editValues.end_time.slice(0, 16) : ""
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { title, context, end_time: endTime || null };

    if (isEditSession) {
      await updateAnnouncement(editId, data);
    } else {
      await createAnnouncement(data);
    }
    onSave();
    onCloseModal?.();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="标题">
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormRow>
      <FormRow label="内容">
        <Textarea
          id="context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          required
        />
      </FormRow>
      <FormRow label="结束时间">
        <Input
          type="datetime-local"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
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

export function Announcements_emp() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchAnnouncements() {
    setIsLoading(true);
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error("Failed to fetch announcements", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("确定要删除这条公告吗？")) {
      await deleteAnnouncement(id);
      fetchAnnouncements();
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal" style={{ marginBottom: "2rem" }}>
        <Heading as="h1">公告</Heading>
        <Modal>
          <Modal.Open opens="create-announcement">
            <Button>添加公告</Button>
          </Modal.Open>
          <Modal.Window name="create-announcement">
            <AnnouncementForm onSave={fetchAnnouncements} />
          </Modal.Window>
        </Modal>
      </Row>

      <Row>
        <Table columns="1.5fr 3fr 1.5fr 1.5fr 1fr">
          <Table.Header>
            <div>标题</div>
            <div>内容</div>
            <div>发布时间</div>
            <div>结束时间</div>
            <div>操作</div>
          </Table.Header>

          <Table.Body
            data={announcements}
            render={(announcement) => (
              <Table.Row key={announcement.id}>
                <div>{announcement.title}</div>
                <div>{announcement.context.substring(0, 50)}...</div>
                <div>
                  {new Date(announcement.publish_time).toLocaleString()}
                </div>
                <div>
                  {announcement.end_time
                    ? new Date(announcement.end_time).toLocaleString()
                    : "-"}
                </div>
                <div>
                  <Modal>
                    <Modal.Open opens="edit">
                      <ActionButton>
                        <HiPencil />
                      </ActionButton>
                    </Modal.Open>
                    <Modal.Window name="edit">
                      <AnnouncementForm
                        announcementToEdit={announcement}
                        onSave={fetchAnnouncements}
                      />
                    </Modal.Window>
                  </Modal>

                  <ActionButton onClick={() => handleDelete(announcement.id)}>
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
