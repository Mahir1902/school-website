import React from "react";
import { cn } from "@/lib/utils";

interface Column {
  key: string;
  header: string;
  className?: string;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, any>[];
  caption?: string;
  striped?: boolean;
  compact?: boolean;
  className?: string;
}

export default function DataTable({
  columns,
  data,
  caption,
  striped = true,
  compact = false,
  className,
}: DataTableProps) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-lg border border-border", className)}>
      <table className="w-full border-collapse">
        {caption && (
          <caption className="px-6 py-4 text-left text-lg font-orpheus text-primary bg-muted/30">
            {caption}
          </caption>
        )}
        <thead className="bg-primary text-white sticky top-0 z-10">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "text-left font-poppins font-semibold",
                  compact ? "px-4 py-2 text-sm" : "px-6 py-4 text-base",
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={cn(
                "border-t border-border transition-colors",
                striped && rowIndex % 2 === 1 && "bg-muted/50",
                "hover:bg-muted/70"
              )}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    "font-proximaNova text-foreground/80",
                    compact ? "px-4 py-2 text-sm" : "px-6 py-4 text-base",
                    column.className
                  )}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
