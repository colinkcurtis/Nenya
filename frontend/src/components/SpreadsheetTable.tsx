'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useState } from 'react';

// Utility function to evaluate cell formulas
const evaluateFormula = (formula: string, getCellValue: (ref: string) => any): any => {
  if (!formula.startsWith('=')) return formula;

  try {
    // Remove the '=' prefix
    const expression = formula.substring(1);

    // Replace cell references (e.g., A1, B2) with their values
    const evaluatedExpression = expression.replace(/[A-Z]\d+/g, (match) => {
      const value = getCellValue(match);
      return typeof value === 'number' ? value.toString() : `"${value}"`;
    });

    // Safely evaluate the expression
    return Function(`"use strict"; return (${evaluatedExpression})`)();
  } catch (error) {
    return '#ERROR!';
  }
};

interface Cell {
  value: string | number;
  formula?: string;
}

interface SpreadsheetRow {
  [key: string]: Cell;
}

// Create initial data with 10 rows and columns A through J
const createInitialData = () => {
  const rows: SpreadsheetRow[] = [];
  const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  for (let i = 0; i < 10; i++) {
    const row: SpreadsheetRow = {};
    cols.forEach(col => {
      row[col] = { value: '' };
    });
    rows.push(row);
  }

  return rows;
};

const columnHelper = createColumnHelper<SpreadsheetRow>();

const EditableCell = ({
  getValue,
  row,
  column,
  table,
}: any) => {
  const cell = getValue() as Cell;
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(cell.formula || cell.value.toString());

  const onBlur = () => {
    setEditing(false);
    if (value.startsWith('=')) {
      const getCellValue = (ref: string) => {
        const col = ref.charAt(0);
        const rowIndex = parseInt(ref.slice(1)) - 1;
        const cellValue = table.getRowModel().rows[rowIndex]?.getValue(col) as Cell;
        return cellValue?.value;
      };

      const evaluated = evaluateFormula(value, getCellValue);
      table.options.meta?.updateData(row.index, column.id, {
        value: evaluated,
        formula: value
      });
    } else {
      const numValue = !isNaN(Number(value)) ? Number(value) : value;
      table.options.meta?.updateData(row.index, column.id, {
        value: numValue
      });
    }
  };

  return (
    <input
      value={editing ? value : cell.value.toString()}
      onChange={e => setValue(e.target.value)}
      onFocus={() => {
        setEditing(true);
        setValue(cell.formula || cell.value.toString());
      }}
      onBlur={onBlur}
      className="p-2 w-full h-full text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  );
};

export default function SpreadsheetTable() {
  const [data, setData] = useState(() => createInitialData());

  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map(col =>
    columnHelper.accessor(col, {
      header: col,
      cell: EditableCell
    })
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: Cell) => {
        setData(old => old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...row,
              [columnId]: value
            };
          }
          return row;
        }));
      },
    },
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              <th className="w-10 bg-gray-100 border text-center">#</th>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="w-32 bg-gray-100 border text-center">
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
          {table.getRowModel().rows.map((row, i) => (
            <tr key={row.id}>
              <td className="border bg-gray-100 text-center">{i + 1}</td>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border p-0 h-8">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
