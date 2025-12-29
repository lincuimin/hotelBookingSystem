import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function Empty({ resourceName }) {
  const { t } = useTranslation();

  const emptyMessages = {
    cabins: "empty.noCabins",
    bookings: "empty.noBookings",
    users: "empty.noUsers",
    guests: "empty.noGuests",
  };

  const messageKey = emptyMessages[resourceName] || `empty.no${resourceName}`;

  return <p>{t(messageKey, `No ${resourceName} could be found.`)}</p>;
}

Empty.propTypes = {
  resourceName: PropTypes.string,
};

export default Empty;
