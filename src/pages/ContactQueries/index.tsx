import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  changeContactQueryStatus,
  getAllContactQueries,
} from "../../actions/queriesAction";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { queriesTypeTabs } from "../../constants/tabDataConstant";
import {
  CHANGE_CONTACT_QUERY_STATUS_RESET,
  GET_ALL_CONTACT_QUERIES_RESET,
} from "../../constants/queriesContants";
import { message } from "antd";
import { SearchInputField } from "../../components/index";

const ContactQueries = () => {
  const dispatch = useDispatch<any>();
  const [tickets, setTickets] = useState([]);
  const [currentTab, setCurrentTab] = useState("1");
  const [expandedId, setExpandedId] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const getBgColors = (index: any) => {
    const colors = [
      "bg-[#EF444450]",
      "bg-[#F59E0B50]",
      "bg-[#22C55E50]",
      "bg-[#06B6D450]",
      "bg-[#3B82F650]",
      "bg-[#8B5CF650]",
      "bg-[#78DCCA50]",
      "bg-[#FF77E950]",
      "bg-[#3F3CBB50]",
      "bg-[#06B6D450]",
    ];
    return colors[index];
  };

  const getAllContactQueriesData = useSelector(
    (state: any) => state.getAllContactQueries
  );
  const {
    loading: contactQueriesLoading,
    error: contactQueriesError,
    success: contactQueriesSuccess,
    data: contactQueries,
  } = getAllContactQueriesData;

  const changeContactQueryData = useSelector(
    (state: any) => state.changeContactQueryStatus
  );
  const {
    loading: changeContactQueryLoading,
    error: changeContactQueryError,
    success: changeContactQuerySuccess,
    data: changeContactQueryResponse,
  } = changeContactQueryData;

  useEffect(() => {
    const filterResult = tickets?.filter(
      (ticket: any) =>
        ticket?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket?.companyName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResults(filterResult);
  }, [searchQuery]);
  useEffect(() => {
    dispatch(
      getAllContactQueries({
        status: queriesTypeTabs?.filter((tab: any) => tab.id === currentTab)[0]
          ?.value,
      })
    );
  }, [currentTab]);
  useEffect(() => {
    if (contactQueriesSuccess) {
      setTickets(contactQueries.contactQueries);
      const filterResult = contactQueries.contactQueries?.filter(
        (ticket: any) =>
          ticket?.firstName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          ticket?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket?.companyName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(filterResult);
      dispatch({ type: GET_ALL_CONTACT_QUERIES_RESET });
    }

    if (contactQueriesError) {
      alert("Error while fetching Queries : " + contactQueriesError);
      dispatch({ type: GET_ALL_CONTACT_QUERIES_RESET });
    }

    if (changeContactQuerySuccess) {
      message.success("Status Changed Successfully");
      dispatch(
        getAllContactQueries({
          status: queriesTypeTabs?.filter(
            (tab: any) => tab.id === currentTab
          )[0]?.value,
        })
      );
      dispatch({ type: CHANGE_CONTACT_QUERY_STATUS_RESET });
    }

    if (changeContactQueryError) {
      alert("Error while fetching Queries : " + changeContactQueryError);
      dispatch({ type: CHANGE_CONTACT_QUERY_STATUS_RESET });
    }
  }, [
    contactQueriesSuccess,
    contactQueriesError,
    changeContactQuerySuccess,
    changeContactQueryError,
    searchQuery,
  ]);

  const toggleExpand = (id: number) => {
    if (expandedId === id) setExpandedId(-1);
    else setExpandedId(id);
  };

  const ChevronDown = (
    <svg width="16" height="16" fill="#6b7280" viewBox="0 0 24 24">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );

  const ChevronUp = (
    <svg width="16" height="16" fill="#6b7280" viewBox="0 0 24 24">
      <path d="M7 14l5-5 5 5z" />
    </svg>
  );

  const handleStatusChange = (id: any, status: any) => {
    dispatch(changeContactQueryStatus({ id: id, status: status }));
  };

  return (
    <div className="font-custom">
      <div className="bg-white rounded-lg shadow-sm mb-2">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Ticket Request</h2>
          <div className="w-[30%]">
            <SearchInputField
              onChange={(value: string) => {
                setSearchQuery(value);
              }}
              placeholder="Search by name or company"
            />
          </div>
        </div>
        <div className="px-4 flex items-center text-sm font-medium text-gray-600">
          <TabWithoutIcon
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            tabData={queriesTypeTabs?.map((type: any) => ({
              ...type,
              param: type.value,
            }))}
          />
        </div>
      </div>
      <div className="mt-2 overflow-y-auto h-[70vh] pr-2">
        {filteredResults.map((ticket: any, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm my-1 hover:shadow-lg"
          >
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold mr-3 ${getBgColors(
                    index % 10
                  )}`}
                >
                  {ticket.firstName[0]}
                </div>
                <div>
                  <div className="font-semibold">
                    {ticket.firstName + ticket.lastName}
                  </div>
                  <div className="flex flex-row justify-center items-center gap-4">
                    <div className="text-sm text-gray-500">
                      {ticket.companyName}
                    </div>
                    <div className="font-semibold text-sm text-gray-500">
                      {ticket.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500 flex items-center">
                <span className="mr-2">
                  📅 Date - {new Date(ticket.date).toLocaleDateString("en-US")}
                </span>
                {expandedId === index ? ChevronUp : ChevronDown}
              </div>
            </div>
            {expandedId === index && (
              <div className="px-6 pb-4 text-sm text-gray-700">
                {ticket.subjects && (
                  <div className="font-semibold mb-2">{ticket.subjects[0]}</div>
                )}
                {ticket.message && <p className="mb-3">{ticket.message}</p>}
                <div className="space-y-1">
                  <div>
                    <strong>Website:</strong>{" "}
                    <a
                      href={`https://${ticket.website}`}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {ticket.website}
                    </a>
                  </div>
                  <div>
                    <strong>Email:</strong>{" "}
                    <a
                      href={`mailto:${ticket.email}`}
                      className="text-blue-600 underline"
                    >
                      {ticket.email}
                    </a>
                  </div>
                  <div>
                    <strong>Contact No:</strong> {ticket.phoneNumber}
                  </div>

                  {(ticket.status === "unread" || ticket.status === "read") && (
                    <div className="flex justify-end">
                      <button
                        onClick={() =>
                          handleStatusChange(
                            ticket._id,
                            ticket.status === "unread" ? "read" : "resolved"
                          )
                        }
                        className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-md shadow hover:bg-blue-700 transition"
                      >
                        {ticket.status === "unread"
                          ? "Mark as Read"
                          : "Mark as Resolved"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export { ContactQueries };
