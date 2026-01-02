import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Table from "../ui/Table";
import Tag from "../ui/Tag";
import Spinner from "../ui/Spinner";
import SpinnerMini from "../ui/SpinnerMini";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";
import {
  getBookings,
  createBooking,
  updateBookingStatus,
} from "../services/apiBookings";
import { getRooms } from "../services/apiRooms";
import { useAuth } from "../context/useAuth";
import ActionButton from "../ui/ActionButton";
import { useToast } from "../context/ToastContext";

function BookingForm({ onCloseModal, onSave, customerId }) {
  const [cabinId, setCabinId] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [remarks, setRemarks] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [rawAvailableRooms, setRawAvailableRooms] = useState([]);
  const [price, setPrice] = useState(0);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [formError, setFormError] = useState("");
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    async function checkAvailability() {
      setFormError("");

      if (!checkInTime || !checkOutTime) {
        setAvailableRooms([]);
        setRawAvailableRooms([]);
        return;
      }

      const start = new Date(checkInTime);
      const end = new Date(checkOutTime);
      const now = new Date();

      if (start >= end) {
        setFormError("入住时间必须早于退房时间");
        setAvailableRooms([]);
        setRawAvailableRooms([]);
        return;
      }

      if (start < now && start.toDateString() !== now.toDateString()) {
        setFormError("入住时间不能是过去的日期");
        setAvailableRooms([]);
        setRawAvailableRooms([]);
        return;
      }

      setIsCheckingAvailability(true);
      try {
        const [roomsData, bookingsData] = await Promise.all([
          getRooms(),
          getBookings(),
        ]);

        const available = roomsData.filter((room) => {
          if (!room.is_available) return false;

          const hasOverlap = bookingsData.some((booking) => {
            if (booking.cabin_id !== room.id) return false;
            if (!["reserved", "checked-in"].includes(booking.status))
              return false;

            const bookingStart = new Date(booking.earliest_check_in_time);
            const bookingEnd = new Date(booking.latest_check_out_time);

            return start < bookingEnd && end > bookingStart;
          });

          return !hasOverlap;
        });

        setRawAvailableRooms(available);
        setAvailableRooms(
          available.map((room) => ({
            value: room.id,
            label: `${room.id} - ${room.type} (¥${room.price})`,
          }))
        );

        if (available.length === 0) {
          setFormError("该时段没有可用房间");
        }
      } catch (err) {
        showError("检查房间可用性失败");
      } finally {
        setIsCheckingAvailability(false);
      }
    }

    checkAvailability();
  }, [checkInTime, checkOutTime, showError]);

  useEffect(() => {
    if (!cabinId) return;
    const room = rawAvailableRooms.find((r) => r.id === Number(cabinId));
    if (room) {
      setGuestCount(room.capacity);
      if (checkInTime && checkOutTime) {
        const start = new Date(checkInTime);
        const end = new Date(checkOutTime);
        const nights = Math.max(
          1,
          Math.ceil((end - start) / (1000 * 60 * 60 * 24))
        );
        setPrice(room.price * nights);
      }
    }
  }, [cabinId, checkInTime, checkOutTime, rawAvailableRooms]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cabinId) {
      setFormError("请选择房间");
      return;
    }

    const data = {
      cabin_id: Number(cabinId),
      customer_id: customerId,
      earliest_check_in_time: checkInTime,
      latest_check_out_time: checkOutTime,
      guest_count: Number(guestCount),
      price,
      remarks,
    };

    try {
      await createBooking(data);
      showSuccess("预订提交成功");
      onSave();
      onCloseModal?.();
    } catch (error) {
      showError(error.message || "创建预订失败");
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {formError && (
        <div style={{
          color: 'var(--color-red-700)',
          backgroundColor: 'var(--color-red-100)',
          padding: '1.2rem',
          borderRadius: 'var(--border-radius-sm)',
          marginBottom: '1.6rem'
        }}>
          {formError}
        </div>
      )}
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
      <FormRow label="房间号">
        {isCheckingAvailability ? (
          <SpinnerMini />
        ) : (
          <Select
            id="cabinId"
            value={cabinId}
            onChange={(e) => setCabinId(e.target.value)}
            options={[
              {
                value: "",
                label:
                  availableRooms.length > 0
                    ? "请选择房间"
                    : checkInTime && checkOutTime
                      ? "该时段无可用房间"
                      : "请先选择时间",
              },
              ...availableRooms,
            ]}
            disabled={availableRooms.length === 0}
            required
          />
        )}
      </FormRow>
      <FormRow label="人数">
        <Input
          type="number"
          id="guestCount"
          value={guestCount}
          readOnly
          disabled
        />
      </FormRow>
      <FormRow label="价格">
        <Input type="number" id="price" value={price} readOnly disabled />
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
