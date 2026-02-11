'use client'

import * as React from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useText2ReelStore } from '@/store/useText2ReelStore'
import type { Scene } from '@/store/useText2ReelStore'

const columnHelper = createColumnHelper<Scene>()

export default function SceneTable() {
    const { scenes, updateScene } = useText2ReelStore()

    const columns = [
        columnHelper.accessor('text', {
            header: 'Text Overlay',
            cell: (info) => (
                <input
                    value={info.getValue()}
                    onChange={(e) => {
                        const newScene = { ...info.row.original, text: e.target.value }
                        updateScene(info.row.index, newScene)
                    }}
                    className="w-full bg-transparent border-b border-transparent focus:border-[#fcbf49] outline-none text-white py-1"
                />
            ),
        }),
        columnHelper.accessor('duration', {
            header: 'Duration (s)',
            cell: (info) => (
                <input
                    type="number"
                    value={info.getValue()}
                    onChange={(e) => {
                        const newScene = { ...info.row.original, duration: Number(e.target.value) }
                        updateScene(info.row.index, newScene)
                    }}
                    className="w-20 bg-transparent border-b border-transparent focus:border-[#fcbf49] outline-none text-white py-1"
                />
            ),
        }),
        columnHelper.accessor('color', {
            header: 'Bg Color',
            cell: (info) => (
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={info.getValue()}
                        onChange={(e) => {
                            const newScene = { ...info.row.original, color: e.target.value }
                            updateScene(info.row.index, newScene)
                        }}
                        className="w-8 h-8 rounded cursor-pointer border-none bg-transparent p-0"
                    />
                    <span className="text-gray-400 text-xs font-mono">{info.getValue()}</span>
                </div>
            ),
        }),
    ]

    const table = useReactTable({
        data: scenes,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f0518]">
            <table className="w-full text-left border-collapse">
                <thead className="bg-white/5 text-[#fcbf49]">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="p-4 font-bold text-sm tracking-wider uppercase border-b border-white/10">
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
                <tbody className="divide-y divide-white/5">
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-white/5 transition-colors">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="p-4 text-sm">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {scenes.length === 0 && (
                <div className="p-8 text-center text-gray-500 italic">
                    No scenes yet. Generate some above!
                </div>
            )}
        </div>
    )
}
