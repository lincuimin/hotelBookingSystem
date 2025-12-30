import { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
import { getAnnouncements } from "../services/apiAnnouncements";

const AnnouncementCard = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-grey-800);
  margin-bottom: 1rem;
`;

const Meta = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 1.4rem;
  color: var(--color-grey-500);
  margin-bottom: 1.6rem;
`;

const Content = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: var(--color-grey-600);
`;

export function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const data = await getAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error("Failed to fetch announcements", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAnnouncements();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">公告</Heading>
      </Row>

      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id}>
          <Title>{announcement.title}</Title>
          <Meta>
            <span>
              发布时间: {new Date(announcement.publish_time).toLocaleString()}
            </span>
            {announcement.end_time && (
              <span>
                结束时间: {new Date(announcement.end_time).toLocaleString()}
              </span>
            )}
          </Meta>
          <Content>{announcement.context}</Content>
        </AnnouncementCard>
      ))}
    </>
  );
}
