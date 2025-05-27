import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { approveDataHeroAccount, changeContactQueryStatus, getAllContactQueries, getAllDmpContactQueries } from "../../actions/queriesAction";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { dmpQueriesTypeTabs } from "../../constants/tabDataConstant";
import { APPROVE_DATA_HERO_ACCOUNT_RESET, GET_ALL_DMP_CONTACT_QUERIES_RESET } from "../../constants/queriesContants";
import { message } from "antd";

const DmpContactQueries = () => {
    const dispatch = useDispatch<any>();
    const [tickets, setTickets] = useState([])
    const [currentTab, setCurrentTab] = useState("1");
    const [expandedId, setExpandedId] = useState(-1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([])
    const [upicopied, setUpiCopied] = useState(false);
    const [emailcopied, setEmailCopied] = useState(false);
    const [phonecopied, setPhoneCopied] = useState(false);

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

    const getAllDmpContactQueriesData = useSelector(
        (state: any) => state.getAllDmpContactQueries
    );
    const {
        loading: dmpContactQueriesLoading,
        error: dmpContactQueriesError,
        success: dmpContactQueriesSuccess,
        data: dmpContactQueries } = getAllDmpContactQueriesData;

    const approveDataHeroAccountData = useSelector(
        (state: any) => state.approveDataHeroAccount
    );
    const {
        loading: approveDataHeroAccountLoading,
        error: approveDataHeroAccountError,
        success: approveDataHeroAccountSuccess,
        data: changeContactQueryResponse } = approveDataHeroAccountData;

    useEffect(() => {
        const filterResult = tickets.filter(
            (ticket: any) =>
                ticket?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ticket?.industry?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredResults(filterResult)
    }, [searchQuery])
    useEffect(() => {
        dispatch(
            getAllDmpContactQueries({
                status: dmpQueriesTypeTabs?.filter(
                    (tab: any) => tab.id === currentTab
                )[0]?.value
            })
        );
    }, [currentTab]);
    useEffect(() => {
        if (dmpContactQueriesSuccess) {
            setTickets(dmpContactQueries.contactQueries)
            const filterResult = dmpContactQueries.contactQueries?.filter(
                (ticket: any) =>
                    ticket?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    ticket?.industry?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredResults(filterResult);
            dispatch({ type: GET_ALL_DMP_CONTACT_QUERIES_RESET });
        }

        if (dmpContactQueriesError) {
            alert("Error while fetching Queries : " + dmpContactQueriesError)
            dispatch({ type: GET_ALL_DMP_CONTACT_QUERIES_RESET });
        }

        if (approveDataHeroAccountSuccess) {
            message.success("Status Changed Successfully")
            dispatch(
                getAllDmpContactQueries({
                    status: dmpQueriesTypeTabs?.filter(
                        (tab: any) => tab.id === currentTab
                    )[0]?.value
                })
            );
            dispatch({ type: APPROVE_DATA_HERO_ACCOUNT_RESET });
        }

        if (approveDataHeroAccountError) {
            alert("Error while fetching Queries : " + approveDataHeroAccountError)
            dispatch({ type: APPROVE_DATA_HERO_ACCOUNT_RESET });
        }

    }, [dmpContactQueriesSuccess, dmpContactQueriesError, approveDataHeroAccountSuccess, approveDataHeroAccountError, searchQuery]);

    const toggleExpand = (id: number) => {
        if (expandedId === id)
            setExpandedId(-1)
        else
            setExpandedId(id);
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

    const handleStatusChange = (id: any) => {
        dispatch(approveDataHeroAccount({ "id": id }))
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Ticket Request</h2>

            <div className="flex items-center border-b pb-2 mb-4 text-sm font-medium text-gray-600">
                <TabWithoutIcon
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    tabData={dmpQueriesTypeTabs}
                />
                <div className="ml-auto">
                    <input
                        type="text"
                        placeholder="Search By Name Or Company"
                        className="border px-3 py-1 rounded-md text-sm w-64"
                        onChange={(event) => {
                            setSearchQuery(event.target.value)
                        }}
                    />
                </div>
            </div>

            {filteredResults.map((ticket: any, index) => (
                <div key={index} className="border rounded-md mb-3">
                    <div
                        className="flex items-center justify-between px-4 py-3 cursor-pointer"
                        onClick={() => toggleExpand(index)}
                    >
                        <div className="flex items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold mr-3 ${getBgColors(index % 10)}`}>
                                {ticket.name[0]}
                            </div>
                            <div>
                                <div className="font-semibold">{ticket.name}</div>
                                <div className="flex flex-row justify-center items-center gap-4">
                                    <div className="text-sm text-gray-500">{ticket.industry}</div>
                                    <div className="font-semibold text-sm text-gray-500">{ticket.isVerified ? "Verified" : "UnVerified"}</div>
                                </div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                            <span className="mr-2">📅 Date - {new Date(ticket.createdAt).toLocaleDateString('en-US')}</span>
                            {expandedId === index ? ChevronUp : ChevronDown}
                        </div>
                    </div>
                    {expandedId === index && (
                        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 font-sans">
                            <div className="font-bold">Request For</div>
                            <div className="bg-gray-50 rounded-xl border">
                                <div className="grid grid-rows-2 grid-cols-3 text-sm font-medium text-gray-700">
                                    <div className="bg-[#E5F4FF] p-4">
                                        <p className="text-[#129BFF] font-semibold"><i className="items-center fi fi-sr-marker"></i>  City</p>
                                    </div>
                                    <div className="bg-[#E5F4FF] p-4 flex items-center">
                                        <p className="text-[#129BFF] font-semibold"><i className="items-center fi fi-sr-shop"></i>  Touchpoint</p>
                                    </div>
                                    <div className="bg-[#E5F4FF] p-4 items-center">
                                        <p className="text-[#129BFF] font-semibold"><i className="items-center fi fi-sr-building"></i>  Location</p>
                                    </div>

                                    <div className="bg-white p-4">
                                        <p>{ticket?.market}</p>
                                    </div>
                                    <div className="bg-white p-4">
                                        <p>{ticket?.touchPoints?.[0]?.touchPoint}</p>
                                    </div>
                                    <div className="bg-white p-4">
                                        <p>{ticket?.touchPoints?.[0]?.marketSites?.[0]}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="font-bold">{`About ${ticket?.name}`}</div>
                            <div>
                                <p className="text-sm text-gray-700">
                                    {ticket?.aboutYourself}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-xl border">
                                    <h3 className="font-semibold text-[#129BFF] mb-2 bg-[#E5F4FF] p-2 pl-4">Profession Details</h3>
                                    <div className="flex flex-col text-sm font-medium text-gray-700">
                                        <div className="grid grid-cols-2 p-2 pl-4">
                                            <p className="text-[#129BFF] font-semibold"><i className="fi fi-sr-customize-computer"></i>  Designation</p>
                                            <p>{ticket?.designation}</p>
                                        </div>
                                        <div className="grid grid-cols-2 p-2 pl-4">
                                            <p className="text-[#129BFF] font-semibold"><i className="fi fi-sr-industry-windows"></i>  Industry</p>
                                            <p>{ticket?.industry}</p>
                                        </div>
                                        <div className="grid grid-cols-2 p-2 pl-4">
                                            <p className="text-[#129BFF] font-semibold"><i className="fi fi-sr-user"></i>  Experience</p>
                                            <p>{ticket?.experience}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border">
                                    <h3 className="font-semibold text-[#129BFF] mb-2 bg-[#E5F4FF] p-2 pl-4">Personal Details</h3>
                                    <div className="flex flex-col text-sm font-medium text-gray-700">
                                        <div className="grid grid-cols-2 p-2 pl-4">
                                            <p className="text-[#129BFF] font-semibold"><i className="fi fi-sr-envelope"></i>  Email</p>
                                            <div className="flex items-center gap-2">
                                                <p>{ticket?.email}</p>
                                                <button
                                                    onClick={async () => {
                                                        await navigator.clipboard.writeText(ticket?.email);
                                                        setEmailCopied(true);
                                                        setTimeout(() => setEmailCopied(false), 2000);
                                                    }}
                                                    className="text-gray-500 hover:text-black transition"
                                                    title="Copy Email"
                                                >
                                                    <i className="fi fi-rr-copy text-lg"></i>
                                                </button>
                                                {emailcopied && <span className="text-green-600 text-sm">Copied!</span>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 p-2 pl-4">
                                            <p className="text-[#129BFF] font-semibold"><i className="fi fi-sr-phone-call"></i>  Phone Number</p>
                                            <div className="flex items-center gap-2">
                                                <p>{ticket?.phone}</p>
                                                <button
                                                    onClick={async () => {
                                                        await navigator.clipboard.writeText(ticket?.phone);
                                                        setPhoneCopied(true);
                                                        setTimeout(() => setPhoneCopied(false), 2000);
                                                    }}
                                                    className="text-gray-500 hover:text-black transition"
                                                    title="Copy Phone Number"
                                                >
                                                    <i className="fi fi-rr-copy text-lg"></i>
                                                </button>
                                                {phonecopied && <span className="text-green-600 text-sm">Copied!</span>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 p-2 pl-4">
                                            <p className="text-[#129BFF] font-semibold"><i className="fi fi-sr-id-badge"></i>  Upi Id</p>
                                            <div className="flex items-center gap-2">
                                                <p>{ticket?.upiId}</p>
                                                <button
                                                    onClick={async () => {
                                                        await navigator.clipboard.writeText(ticket?.upiId);
                                                        setUpiCopied(true);
                                                        setTimeout(() => setUpiCopied(false), 2000);
                                                    }}
                                                    className="text-gray-500 hover:text-black transition"
                                                    title="Copy UPI ID"
                                                >
                                                    <i className="fi fi-rr-copy text-lg"></i>
                                                </button>
                                                {upicopied && <span className="text-green-600 text-sm">Copied!</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 mt-2">
                                <a href={`${ticket?.linkedin}`} target="_blank" rel="noopener noreferrer">
                                    <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600">
                                        <i className="fi fi-brands-linkedin flex items-center text-[#0c69c7] text-2xl"></i> LinkedIn
                                    </button>
                                </a>
                                <a href={`${ticket?.resumeUrl}`} target="_blank" rel="noopener noreferrer">
                                    <button className="flex items-center gap-2 border border-red-500 text-red-500 rounded-lg px-4 py-2 text-sm">
                                        <i className="fi fi-sr-resume flex items-center text-[#FF0000]  text-2xl"></i> Resume
                                    </button>
                                </a>
                                {!ticket?.isVerified && <div className="ml-auto">
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-medium"
                                        onClick={() => {
                                            handleStatusChange(ticket?._id)
                                        }}>Verify & Share</button>
                                </div>}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export {DmpContactQueries};