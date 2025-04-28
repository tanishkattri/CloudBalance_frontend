import React, { useState, useEffect } from "react";
import { getApi, postApi } from "../../../services/apiService";
import AccountDropdown from "../../../component/AccountDropDown";
import CenteredLoader from "../../../component/CenteredLoader";
import GroupByTabs from "../../../component/GroupBy";
import FilterListIcon from "@mui/icons-material/FilterList";
import IconButton from "@mui/material/IconButton";
import FilterSidebar from "../../../component/FilterSideBar";
import { toast } from "react-toastify";
import TwoDBarChart from "../../../component/TwoDBarChart";
import LineChart from "../../../component/LineChart";
import MuiDataTable from "../../../component/table/DataTable";
const CostExplorer = () => {
  const [loading, setLoading] = useState(false);
  const [allAccounts, setAllAccounts] = useState([]);
  const [selectedAccountNumber, setSelectedAccountNumber] = useState(null);
  const [groupByOptions, setGroupByOptions] = useState([]);
  const [currentGroup, setCurrentGroup] = useState("");
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]); // here i'm setting list of filters
  const [sidebarLoading, setSidebarLoading] = useState(false);
  const [filtersMap, setFiltersMap] = useState({}); // use to final request filters
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [costData, setCostData] = useState(null);
  const [costLoading, setCostLoading] = useState(false);

  const requestPayload = {
    startMonth, // e.g. "2024-03"
    endMonth, // e.g. "2024-06"
    groupBy: currentGroup,
    filters: filtersMap,
    accountNumber: selectedAccountNumber,
  };

  const tableColumns = [
    { field: "USAGE_MONTH", headerName: "Usage Month", flex: 1 },
    { field: currentGroup, headerName: currentGroup, flex: 1 },
    { field: "TOTAL_USAGE_COST", headerName: "Total Usage Cost (₹)", flex: 1 },
  ];

  // 💬 Create table rows by adding an 'id' 
  const tableRows = (costData || []).map((item, index) => ({
    id: index + 1,
    ...item,
  }));

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await getApi("/accounts");
        const accounts = res.data;
        setAllAccounts(accounts);
        if (accounts.length > 0) {
          setSelectedAccountNumber(accounts[0].accountNumber);
        }
      } catch (err) {
        console.error("Failed to fetch accounts", err);
      }
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    const fetchGroupByFields = async () => {
      setLoading(true);
      try {
        const res = await getApi("/snowflake/group-by-options");
        setGroupByOptions(res.data.data);
        setFilterOptions(res.data.data);
      } catch (err) {
        console.error("Failed to fetch group by fields", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupByFields();
  }, []);

  useEffect(() => {
    const fetchCostData = async () => {
      try {
        setCostLoading(true); // Start loading
        const res = await postApi("/snowflake/cost", requestPayload);
        if (res.data.data.length === 0) {
          setCostData([]);
          toast.error("No data found for the fields ❗");
        } else {
          setCostData(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch cost data", err);
        toast.error("Failed to fetch cost data ❌");
      } finally {
        setCostLoading(false); // Stop loading
      }
    };

    if (currentGroup) {
      fetchCostData();
    }
  }, [currentGroup, filtersMap, startMonth, endMonth, selectedAccountNumber]);


  return (
    <>
      {loading && <CenteredLoader />}
      <div className="flex justify-between items-center mb-8 max-h-full">
        <div>
          <h2 className="text-xl font-semibold">Cost Explorer</h2>
          <p>How to always be aware of cost changes and history</p>
        </div>
        <div>
          <AccountDropdown
            accounts={allAccounts}
            selectedAccountNumber={selectedAccountNumber}
            onChange={(e) => setSelectedAccountNumber(e.target.value)}
            label="Select Account"
            name="arnNumber"
            required={true}
          />
        </div>
      </div>

      <div className="bg-white shadow-xl p-8 space-y-5 relative pb-32">
        <div className="flex justify-between items-center mb-4">
          <GroupByTabs
            groupByOptions={groupByOptions}
            onSelect={(val) => setCurrentGroup(val)}
          />
          <div className="flex items-center gap-2">
            {/* 📅 Start Month */}
            <div className="flex flex-col text-xs">
              <label className="mb-1 text-gray-600">Start Month</label>
              <input
                type="month"
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
                className="border border-gray-300 px-2 py-1 rounded text-sm"
              />
            </div>

            {/* 📅 End Month */}
            <div className="flex flex-col text-xs">
              <label className="mb-1 text-gray-600">End Month</label>
              <input
                type="month"
                value={endMonth}
                onChange={(e) => setEndMonth(e.target.value)}
                className="border border-gray-300 px-2 py-1 rounded text-sm"
              />
            </div>
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => {
                setFiltersMap({});
                toast.info("All filters have been cleared ✨");
              }}
            >
              Clear All Filters
            </button>
            <IconButton onClick={() => setShowFilterSidebar((prev) => !prev)}>
              <FilterListIcon />
            </IconButton>
          </div>
        </div>

        <div className="relative flex">
          {/* 📊 Chart Area */}
          <div
            className={`${
              showFilterSidebar ? "w-[calc(100%-300px)]" : "w-full"
            } transition-all duration-300`}
          >
            {costLoading || !costData ? (
              <CenteredLoader /> // 🌟 Show loader while fetching or empty
            ) : (
              <TwoDBarChart costData={costData} groupByKey={currentGroup} />
            )}
          </div>

          {/* 🎯 Filter Sidebar */}

          {showFilterSidebar && (
            <FilterSidebar
              sidebarLoading={sidebarLoading}
              setSidebarLoading={setSidebarLoading}
              filterOptions={filterOptions}
              filtersMap={filtersMap}
              setFiltersMap={setFiltersMap}
            />
          )}
        </div>
        <div>
          {costLoading || !costData ? (
            <CenteredLoader />
          ) : (
            <LineChart costData={costData} groupByKey={currentGroup} />
          )}
        </div>
        <div>
          {costLoading || !costData ? (
            <CenteredLoader />
          ) : (
            <div className="w-full">
              <MuiDataTable
                columns={tableColumns}
                rows={tableRows}
                pageSize={5}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CostExplorer;
