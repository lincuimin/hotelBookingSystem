import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Table from "../ui/Table";
import Tag from "../ui/Tag";
import Spinner from "../ui/Spinner";
import { getBookings } from "../services/apiBookings";
import { useAuth } from "../context/useAuth";

export function History() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchBookings() {
    setIsLoading(true);
    try {
      const data = await getBookings();
      // Filter for current user and history bookings
      const historyBookings = data.filter(
        (booking) =>
          booking.customer_id === user.id &&
          ["checked-out", "cancelled"].includes(booking.status)
      );
      setBookings(historyBookings);
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

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal" style={{ marginBottom: "2rem" }}>
        <Heading as="h1">历史</Heading>
      </Row>

      <Row>
        <Table columns="1fr 1fr 2fr 2fr 1fr 1fr 2fr 4fr">
          <Table.Header>
            <div>订单号</div>
            <div>房间号</div>
            <div>入住时间</div>
            <div>退房时间</div>
            <div>人数</div>
            <div>价格</div>
            <div>状态</div>
            <div>备注</div>
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
                  <Tag
                    type={booking.status === "checked-out" ? "silver" : "red"}
                  >
                    {booking.status === "checked-out" ? "已完成" : "已取消"}
                  </Tag>
                </div>
                <div>{booking.remarks}</div>
              </Table.Row>
            )}
          />
        </Table>
      </Row>
    </>
  );
}
