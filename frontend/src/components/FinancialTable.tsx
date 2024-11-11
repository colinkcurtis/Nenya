'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface FinancialRow {
  id: string;
  category: string;
  amount: number;
}

const defaultData: FinancialRow[] = [
  {
    id: uuidv4(),
    category: 'Salary',
    amount: 5000,
  },
  {
    id: uuidv4(),
    category: 'Rent',
    amount: -2000,
  },
];

const columnHelper = createColumnHelper<FinancialRow>();

const EditableCell = ({
    getValue,
    row,
    column,
    table,
  }: any) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
      table.options.meta?.updateData(row.index, column.id, value);
    };

    const baseInputStyles = "p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800";

    return column.id === 'amount' ? (
      <input
        type="number"
        value={value}
        onChange={e => setValue(parseFloat(e.target.value) || 0)}
        onBlur={onBlur}
        className={`${baseInputStyles} ${value < 0 ? 'text-red-600' : 'text-gray-800'}`}
      />
    ) : (
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
        className={baseInputStyles}
      />
    );
  };

export default function FinancialTable() {
  const [data, setData] = useState(() => [...defaultData]);

  const columns = [
    columnHelper.accessor('category', {
      header: 'Category',
      cell: EditableCell
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: EditableCell,
      footer: ({ table }) => {
        const rows = table.getRowModel().rows;
        const total = rows.reduce((sum, row) => sum + row.getValue('amount'), 0);
        return (
          <div className="font-bold">
            Total: ${total.toLocaleString()}
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {
        setData(old => old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...row,
              [columnId]: value,
            };
          }
          return row;
        }));
      },
    },
  });

  const addRow = () => {
    const newRow: FinancialRow = {
      id: uuidv4(),
      category: '',
      amount: 0,
    };
    setData(old => [...old, newRow]);
  };

  const deleteRow = (index: number) => {
    setData(old => old.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="p-2 border-b text-left bg-gray-50">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
              <th className="p-2 border-b text-left bg-gray-50 w-20">Actions</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="p-2">
                <button
                  onClick={() => deleteRow(row.index)}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="p-2">Summary</td>
            <td className="p-2">
              {flexRender(
                columns[1].footer,
                table.getFooterGroups()[0].headers[1].getContext()
              )}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      <button
        onClick={addRow}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Row
      </button>
    </div>
  );
}
