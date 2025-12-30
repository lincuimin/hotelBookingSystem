import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Table from "../ui/Table";
import Tag from "../ui/Tag";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/input";
import Textarea from "../ui/Textarea";
import {
  getBookings,
  createBooking,
  updateBookingStatus,
} from "../services/apiBookings";
import { useAuth } from "../context/useAuth";
import ActionButton from "../ui/ActionButton";

function BookingForm({ onCloseModal, onSave, customerId }) {
  const [cabinId, setCabinId] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [remarks, setRemarks] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    // Mock price calculation
    const price = Math.floor(Math.random() * 1000) + 500;

    const data = {
      cabin_id: Number(cabinId),
      customer_id: customerId,
      earliest_check_in_time: checkInTime,
      latest_check_out_time: checkOutTime,
      guest_count: Number(guestCount),
      price,
      remarks,
    };

    await createBooking(data);
    onSave();
    onCloseModal?.();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="房间号">
        <Input
          type="number"
          id="cabinId"
          value={cabinId}
          onChange={(e) => setCabinId(e.target.value)}
          required
        />
      </FormRow>
      <FormRow label="入住时间">
        <Input
          type="datetime-local"
          id="checkInTime"
          value={checkInTime}
          onChange={(e) => setCheckInTime(e.target.value)}
          required
        />
      </FormRow>
      <FormRow label="退房时间">
        <Input
          type="datetime-local"
          id="checkOutTime"
          value={checkOutTime}
          onChange={(e) => setCheckOutTime(e.target.value)}
          required
        />
      </FormRow>
      <FormRow label="人数">
        <Input
          type="number"
          id="guestCount"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
          required
          min={1}
        />
      </FormRow>
      <FormRow label="备注">
        <Textarea
          id="remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
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
        <Button type="submit">提交预订</Button>
      </FormRow>
    </Form>
  );
}

export function Bookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchBookings() {
    setIsLoading(true);
    try {
      const data = await getBookings();
      // Filter for current user and active bookings
      const activeBookings = data.filter(
        (booking) =>
          booking.customer_id === user.id &&
          ["reserved", "checked-in"].includes(booking.status)
      );
      setBookings(activeBookings);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchBookings();
    }
  }, [user?.id]);

  async function handleCancel(id) {
    if (window.confirm("确认取消该预订？")) {
      await updateBookingStatus(id, "cancelled");
      fetchBookings();
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal" style={{ marginBottom: "2rem" }}>
        <Heading as="h1">预订</Heading>
        <Modal>
          <Modal.Open opens="create-booking">
            <Button>申请预订</Button>
          </Modal.Open>
          <Modal.Window name="create-booking">
            <BookingForm onSave={fetchBookings} customerId={user.id} />
          </Modal.Window>
        </Modal>
      </Row>

      <Row>
        <Table columns="1fr 1fr 1.5fr 1.5fr 0.8fr 1fr 1.2fr 4fr 1.2fr">
          <Table.Header>
            <div>订单号</div>
            <div>房间号</div>
            <div>入住时间</div>
            <div>退房时间</div>
            <div>人数</div>
            <div>价格</div>
            <div>状态</div>
            <div>备注</div>
            <div>操作</div>
          </Table.Header>

          <Table.Body
            data={bookings}
            render={(booking) => (
              <Table.Row key={booking.id}>
                <div>{booking.id}</div>
                <div>{booking.cabin_id}</div>
                <div>
                  {new Date(
                    booking.earliest_check_in_time
                  ).toLocaleDateString()}
                </div>
                <div>
                  {new Date(booking.latest_check_out_time).toLocaleDateString()}
                </div>
                <div>{booking.guest_count}</div>
                <div>¥{booking.price}</div>
                <div>
                  <Tag type={booking.status === "reserved" ? "blue" : "green"}>
                    {booking.status === "reserved" ? "已预订" : "已入住"}
                  </Tag>
                </div>
                <div>{booking.remarks}</div>
                <div>
                  {booking.status === "reserved" && (
                    <ActionButton onClick={() => handleCancel(booking.id)}>
                      取消
                    </ActionButton>
                  )}
                </div>
              </Table.Row>
            )}
          />
        </Table>
      </Row>
    </>
  );
}
