import { Popover } from "antd";
import { BsDatabaseExclamation, BsThreeDots } from "react-icons/bs";
import { cn } from "../../utils/functions";
import Menu from "./Menu";

const Table = ({
  columns,
  data,
  loading = false,
  loadingUiSize = 5,
  scroll = {},
  headClass,
  nestedRowKey,
}) => {
  let nestedRow = null;

  const renderItem = (item, column) => {
    if (column?.key === "action" && column?.render) {
      return (
        <Popover
          content={<Menu items={column.render(item)} />}
          placement="bottomRight"
          arrow={false}
          trigger="click">
          <div className="flex justify-end">
            <div className="hover:bg-gray-100 p-1 rounded-lg transition-all">
              <BsThreeDots className="cursor-pointer text-gray-500 hover:text-gray-600 text-lg" />
            </div>
          </div>
        </Popover>
      );
    } else if (
      column?.dataIndex &&
      Object.prototype.hasOwnProperty.call(item, column?.dataIndex)
    ) {
      if (column.render)
        return column.render(item[column?.dataIndex], item) || "-";
      else if (typeof item[column?.dataIndex] === "number") {
        return item[column?.dataIndex];
      } else {
        return item[column?.dataIndex] ? item[column?.dataIndex] : "-";
      }
    } else if (column.render && !column?.dataIndex) {
      return column.render(item) || "-";
    }
    return "-";
  };

  const renderNestedRow = (nestedItem, column) => {
    if (column.renderNested)
      return column.renderNested(nestedItem[column.nestDataIndex]) || "-";
  };

  return (
    <div className="  rounded-lg overflow-hidden bg-white">
      <div
        className="tableScrollBar overflow-y-auto w-full"
        style={{
          maxHeight: scroll.y ? `${scroll.y}px` : "auto",
        }}>
        <table className="w-full border-collapse">
          <thead
            className={cn("font-Popins bg-gray-100 sticky top-0 z-10", {
              [headClass]: headClass,
            })}>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={`py-4 px-4 text-left whitespace-nowrap tracking-wide text-gray-700 font-semibold text-sm border-b border-gray-200 ${
                    index === 0 ? "rounded-tl-lg" : ""
                  } ${index === columns.length - 1 ? "rounded-tr-lg" : ""}`}>
                  {column.title || null}
                </th>
              ))}
            </tr>
          </thead>
          {data?.length > 0 && !loading && (
            <>
              {data.map((item, index) => {
                const isNest = Boolean(
                  nestedRowKey &&
                    item[nestedRowKey] &&
                    item[nestedRowKey].length > 1
                );

                if (isNest) {
                  nestedRow = item[nestedRowKey];
                }

                let nestContent = null;
                if (nestedRow) {
                  nestContent = nestedRow.map((nestedItem, nestedIndex) => {
                    if (nestedIndex === 0) {
                      return null;
                    }
                    return (
                      <tr
                        key={nestedIndex}
                        className={`bg-gray-50 hover:bg-gray-50 transition-colors duration-150 ${
                          nestedIndex === nestedRow.length - 1
                            ? "border-b border-gray-200"
                            : "border-b border-gray-200"
                        }`}>
                        {columns.map((column) => {
                          if (
                            column?.nestDataIndex &&
                            Object.prototype.hasOwnProperty.call(
                              nestedItem,
                              column?.nestDataIndex
                            )
                          ) {
                            return (
                              <td
                                key={column.key}
                                className={cn(
                                  "py-3 px-4 whitespace-nowrap text-gray-600",
                                  {
                                    [column.tdClass]: column.tdClass,
                                  }
                                )}>
                                {renderNestedRow(nestedItem, column)}
                              </td>
                            );
                          } else return null;
                        })}
                      </tr>
                    );
                  });
                }
                nestedRow = null;

                return (
                  <tbody className="text-sm font-medium" key={index}>
                    <tr
                      className={cn(
                        "bg-white hover:bg-gray-50 transition-colors duration-150",
                        {
                          "border-b border-gray-100": index !== data.length - 1,
                        }
                      )}>
                      {columns.map((column, colIndex) => {
                        const isNest = Boolean(
                          nestedRowKey &&
                            item[nestedRowKey] &&
                            item[nestedRowKey].length > 1
                        );
                        const isSetRowSpan = Boolean(
                          isNest && !column.renderNested
                        );
                        return (
                          <td
                            rowSpan={
                              isSetRowSpan ? item[nestedRowKey].length : 1
                            }
                            key={column.key}
                            className={cn(
                              "py-4 px-4 whitespace-nowrap text-gray-700",
                              {
                                "rounded-bl-lg":
                                  index === data.length - 1 && colIndex === 0,
                              },
                              {
                                "rounded-br-lg":
                                  index === data.length - 1 &&
                                  colIndex === columns.length - 1,
                              },
                              {
                                [column.tdClass]: column.tdClass,
                              }
                            )}>
                            {renderItem(item, column)}
                          </td>
                        );
                      })}
                    </tr>
                    {nestContent || null}
                  </tbody>
                );
              })}
            </>
          )}
        </table>
        {!data?.length && !loading && (
          <div className="flex flex-col justify-center items-center h-full py-16">
            <div className="bg-gray-50 p-6 rounded-full mb-4 border border-gray-100">
              <BsDatabaseExclamation className="text-gray-300" size={50} />
            </div>
            <span className="py-2 text-lg text-gray-400 font-medium">
              No Data Available
            </span>
            <p className="text-gray-400 text-sm">No records found to display</p>
          </div>
        )}
        {loading && <TableLoader length={loadingUiSize} />}
      </div>
    </div>
  );
};

export default Table;

const TableLoader = ({ length = 3 }) => {
  const loaderArray = Array(length).fill("1");
  return (
    <div className="p-4">
      {loaderArray.map((_, index) => (
        <div
          key={index}
          className="w-full flex justify-between px-4 py-4 gap-5 border-b border-gray-100">
          <div className="rounded-md w-full h-5 bg-slate-100 animate-pulse" />
          <div className="rounded-md w-full h-5 bg-slate-100 animate-pulse" />
          <div className="rounded-md w-full h-5 bg-slate-100 animate-pulse" />
        </div>
      ))}
    </div>
  );
};
