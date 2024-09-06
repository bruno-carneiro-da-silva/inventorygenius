import { formatDateTime } from "@/constants/date";
import { ContactGroupDetails } from "@/queries/contact/types";

interface GroupItemProps {
  group: ContactGroupDetails;
}

const GroupItem: React.FC<GroupItemProps> = ({ group }) => {
  return (
    <div className="col-span-1 bg-white p-3 rounded-md text-gray-500">
      <div className="font-bold text-lg">{group.name}</div>
      <div className="font-extralight text-sm">
        {group.totalCustomer} contacts
      </div>
      <div className="font-extralight text-sm">
        {formatDateTime(group.createDate, "MMM d, yyyy")}
      </div>
    </div>
  );
};

export default GroupItem;
