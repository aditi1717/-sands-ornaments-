import React from 'react';

export const Input = ({ label, ...props }) => (
    <div className="space-y-1 md:space-y-1.5">
        {label && (
            <label className="block ml-1 text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                {label}
            </label>
        )}
        <input
            {...props}
            className="w-full bg-white border border-gray-200 md:border-gray-300 rounded-xl md:rounded-lg py-2 md:py-2.5 px-3 md:px-4 text-xs md:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#3E2723] focus:ring-1 focus:ring-[#3E2723] transition-all shadow-sm"
        />
    </div>
);

export const Select = ({ label, options, ...props }) => (
    <div className="space-y-1 md:space-y-1.5">
        {label && (
            <label className="block ml-1 text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                {label}
            </label>
        )}
        <select
            {...props}
            className="w-full bg-white border border-gray-200 md:border-gray-300 rounded-xl md:rounded-lg py-2 md:py-2.5 px-3 md:px-4 text-xs md:text-sm text-gray-900 focus:outline-none focus:border-[#3E2723] focus:ring-1 focus:ring-[#3E2723] transition-all shadow-sm appearance-none cursor-pointer"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23374151' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.8rem center', backgroundSize: '0.8em' }}
        >
            {options.map((opt, i) => (
                <option key={i} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    </div>
);

export const TextArea = ({ label, ...props }) => (
    <div className="space-y-1 md:space-y-1.5">
        {label && (
            <label className="block ml-1 text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                {label}
            </label>
        )}
        <textarea
            {...props}
            rows={props.rows || 4}
            className="w-full bg-white border border-gray-200 md:border-gray-300 rounded-xl md:rounded-lg py-2 md:py-2.5 px-3 md:px-4 text-xs md:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#3E2723] focus:ring-1 focus:ring-[#3E2723] transition-all shadow-sm resize-none"
        ></textarea>
    </div>
);

export const FormSection = ({ title, children, className = "" }) => (
    <div className={`bg-gray-50 p-4 md:p-6 rounded-2xl md:rounded-xl border border-gray-200 ${className}`}>
        {title && (
            <h3 className="text-xs md:text-sm font-bold text-gray-800 mb-4 md:mb-5 pb-2 border-b border-gray-200 tracking-tight">
                {title}
            </h3>
        )}
        <div className="space-y-4 md:space-y-5">
            {children}
        </div>
    </div>
);
