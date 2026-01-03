import React from 'react';
import { Search } from 'lucide-react';

const DataTable = ({
    columns,
    data,
    searchTerm,
    setSearchTerm,
    searchPlaceholder = "Search...",
    filters,
    children
}) => {
    return (
        <div className="space-y-3 md:space-y-4 animate-in fade-in duration-500">
            {/* Toolbar */}
            <div className="bg-white p-3 md:p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-3 md:gap-4 items-center">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#8D6E63]/20 focus:border-[#8D6E63] transition-all"
                    />
                </div>
                {filters && (
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
                        {filters.map((filter, index) => (
                            <select
                                key={index}
                                onChange={(e) => filter.onChange(e.target.value)}
                                className="bg-gray-50 border border-gray-200 rounded-lg px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8D6E63]/20 shrink-0"
                            >
                                {filter.options.map((opt, i) => (
                                    <option key={i} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        ))}
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white text-gray-600 font-bold border-b border-gray-200 uppercase tracking-widest text-[9px] md:text-[10px]">
                            <tr>
                                {columns.map((col, index) => (
                                    <th key={index} className={`px-4 md:px-6 py-3 md:py-4 ${col.align === 'right' ? 'text-right' : ''}`}>
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 uppercase tracking-tighter text-[10px] md:text-[11px] text-gray-700">
                            {data.length > 0 ? (
                                data.map((item, rowIndex) => (
                                    <tr key={rowIndex} className="hover:bg-gray-50/50 transition-colors">
                                        {columns.map((col, colIndex) => (
                                            <td key={colIndex} className={`px-4 md:px-6 py-3 md:py-4 ${col.align === 'right' ? 'text-right' : ''}`}>
                                                {col.render ? col.render(item) : item[col.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-400 font-medium text-xs">
                                        No results found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
