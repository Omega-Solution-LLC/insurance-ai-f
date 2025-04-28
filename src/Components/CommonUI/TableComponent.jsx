import React, { useEffect, useState } from "react";
import { BsDatabaseExclamation } from "react-icons/bs";

import { CiCreditCard2, CiViewTable } from "react-icons/ci";
import Pagination from "./Pagination";
import Table from "./Table";

const TableComponent = ({
  list,
  total,
  loading,
  children,
  filters,
  columns,
  extraFilter,
  title,
  setPageConfig,
  isSearch,
  loadingUiSize = 10,
  nestedRowKey,
  card,
  defaultView = "list",
}) => {
  const fetchData = (page, count) => {
    setPageConfig((prev) => {
      return { ...prev, page, count };
    });
  };

  const [view, setView] = useState(defaultView);

  // column select
  const [columnsToShow, setColumnsToShow] = useState([]);
  useEffect(() => {
    setColumnsToShow(columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns?.length]);

  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };

  const handleChange = (value) => {
    setView(value);
  };

  const options = [
    {
      value: "card",
      icon: <CiCreditCard2 size={21} />,
      title: "Card",
    },
    {
      value: "list",
      icon: <CiViewTable size={21} />,
      title: "List",
    },
  ];

  return (
    <>
      <div className="mt-2">
        {view === "list" && (
          <Table
            loading={loading}
            columns={columnsToShow}
            nestedRowKey={nestedRowKey}
            data={
              !!list?.length && list.map((item) => ({ ...item, key: item?.id }))
            }
            scroll={{ y: window.innerHeight - 350 }}
            loadingUiSize={loadingUiSize}
          />
        )}

        {view === "card" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
              {list?.map((item) => card(item))}
            </div>
            {!list?.length && !loading && (
              <div className="flex flex-col justify-center items-center h-full py-10">
                <BsDatabaseExclamation className="text-slate-200" size={70} />
                <span className="py-2 text-lg  text-slate-500"> Empty</span>
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex justify-center mt-3">
        {total >= 11 && <Pagination onChange={fetchData} total={total} />}
      </div>
      {children && children}
    </>
  );
};
export default TableComponent;
