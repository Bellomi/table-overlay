import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

interface TableProps<T extends object> {
  columns: ColumnDef<T>[];
  data: T[];
}

export const Table = <T extends object>({ columns, data }: TableProps<T>) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [starredRows, setStarredRows] = useState<Set<number>>(new Set());

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleToggleClick = (rowIndex: number) => {
    setStarredRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowIndex)) {
        newSet.delete(rowIndex);
      } else {
        newSet.add(rowIndex); // Add if not starred
      }
      return newSet;
    });
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    borderBottom: "2px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              onMouseEnter={() => setHoveredRow(rowIndex)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                position: "relative",
                cursor: "pointer",
                background: hoveredRow === rowIndex ? "#f9f9f9" : "transparent",
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              {hoveredRow === rowIndex && (
                <td
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "white",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
                    padding: "8px",
                    borderRadius: "6px",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleToggleClick(rowIndex)}
                  >
                    {starredRows.has(rowIndex) ? "⭐️" : "☆"}
                  </button>
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    🗑️
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
