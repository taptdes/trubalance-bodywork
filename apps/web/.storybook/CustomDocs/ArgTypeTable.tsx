import React, { useState } from 'react'
import { CopyButton } from './CopyButton'

type Column<T = any> = {
  key: string
  label: string
  width?: string
  render?: (item: T) => React.ReactNode
}

interface ArgTypeTableProps<T = any> {
  data: T[]
  columns: Column<T>[]
}

function ArgTypeTable<T = any>({ data, columns }: ArgTypeTableProps<T>) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  return (
    <div className="w-full relative">
      <table
        className="min-w-full table-auto border-separate border-spacing-0 text-[13px]"
        style={{
          borderSpacing: '0',
          borderCollapse: 'separate',
          marginTop: '24px',
          marginBottom: '40px',
        }}
      >
        <thead>
          <tr style={{ border: 'none' }}>
            {columns.map((column, index) => (
              <th
                key={index}
                className="text-left text-[13px] font-bold text-[#8B8C95]"
                style={{
                  width: column.width || 'auto',
                  border: 'none',
                  color: 'rgba(46, 52, 56, 0.75)',
                  paddingLeft: index === 0 ? '20px' : '14px',
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          style={{
            borderRadius: '4px',
            boxShadow: '0px 1px 4px rgba(124, 124, 124, 0.25)',
            fontSize: '13px',
          }}
        >
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={`relative hover-trigger ${hoveredRow === rowIndex ? 'is-hovered' : ''}`}
              onMouseEnter={() => setHoveredRow(rowIndex)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="py-2 text-[13px] text-gray-500 bg-white"
                  style={{
                    fontSize: '13px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    paddingLeft: colIndex === 0 ? '20px' : '14px',
                    borderLeft:
                      colIndex === 0
                        ? '1px solid hsla(203, 50%, 30%, 0.15)'
                        : 'none',
                    borderRight:
                      colIndex === columns.length - 1
                        ? '1px solid #E2E8F0'
                        : 'none',
                    borderTop:
                      rowIndex === 0
                        ? '1px solid hsla(203, 50%, 30%, 0.15)'
                        : 'none',
                    borderBottom: '1px solid hsla(203, 50%, 30%, 0.15)',
                    borderTopLeftRadius:
                      colIndex === 0 && rowIndex === 0 ? '4px' : '0',
                    borderBottomLeftRadius:
                      colIndex === 0 && rowIndex === data.length - 1
                        ? '4px'
                        : '0',
                    borderTopRightRadius:
                      colIndex === columns.length - 1 && rowIndex === 0
                        ? '4px'
                        : '0',
                    borderBottomRightRadius:
                      colIndex === columns.length - 1 &&
                      rowIndex === data.length - 1
                        ? '4px'
                        : '0',
                    verticalAlign: 'top',
                    position: 'relative',
                  }}
                >
                  {column.render ? column.render(item) : (item as any)[column.key]}
                  {column.key === 'actions' && (
                    <div
                      style={{
                        display: 'block',
                        position: 'absolute',
                        top: '0',
                        right: '0',
                      }}
                    >
                      <CopyButton
                        copiedIcon="check"
                        label="Copy"
                        text={(item as any).class}
                        onCopy={() => console.log('Copied!:', (item as any).class)}
                      />
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ArgTypeTable
