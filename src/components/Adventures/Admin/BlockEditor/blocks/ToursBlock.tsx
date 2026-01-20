'use client';

import { useState, useEffect, useMemo } from 'react';
import { ToursBlock as ToursBlockType } from '@/components/Adventures/Admin/BlockEditor/types';
import { FiPlus, FiX, FiMap, FiSearch, FiLoader } from 'react-icons/fi';
import { fetchTours, Tour } from '@/components/Adventures/Admin/BlockEditor/services/tours';

interface ToursBlockProps {
    data: ToursBlockType['data'];
    onChange: (data: ToursBlockType['data']) => void;
    isActive?: boolean;
}

export const ToursBlock = ({ data, onChange, isActive }: ToursBlockProps) => {
    const [allTours, setAllTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const loadTours = async () => {
            setLoading(true);
            const tours = await fetchTours('en', searchQuery);
            setAllTours(tours);
            setLoading(false);
        };

        const debounceTimer = setTimeout(() => {
            loadTours();
        }, searchQuery ? 500 : 0); // Delay search, but load initial instantly

        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    const filteredTours = useMemo(() => {
        // Now the filtering is already done by the API or we show all results from the API
        return allTours.slice(0, 15);
    }, [allTours]);

    const addTour = (tour: Tour) => {
        const newItem = {
            id: tour.id,
            title: tour.name,
            image: tour.photo.file,
            duration: `${tour.days} DAYS`,
            price: `${tour.price} ${tour.valute || 'USD'}`,
            link: `/prototype/tours/${tour.slug}`
        };

        if (!data.items.some(item => item.id === tour.id || item.link === newItem.link)) {
            onChange({ ...data, items: [...data.items, newItem] });
        }
        setSearchQuery('');
        setShowResults(false);
    };

    const removeTour = (index: number) => {
        onChange({ ...data, items: data.items.filter((_, i) => i !== index) });
    };

    return (
        <div className="space-y-4">
            {/* Search & Add - Show only when active */}
            {isActive && (
                <div className="relative z-20 space-y-4 bg-white/50 p-4 rounded-xl border border-teal-100 animate-fade-in shadow-sm">
                    {/* Block Title Input */}
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                            Section Title
                        </label>
                        <input
                            type="text"
                            value={data.title || ''}
                            onChange={(e) => onChange({ ...data, title: e.target.value })}
                            placeholder="e.g., Headliners here to main content"
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm transition-all"
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                            Search and Add Tours
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                {loading ? <FiLoader className="animate-spin" /> : <FiSearch />}
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowResults(true);
                                }}
                                onFocus={() => setShowResults(true)}
                                placeholder="Search by tour name or ID..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm transition-all"
                            />
                        </div>

                        {/* Search Results Dropdown */}
                        {showResults && (
                            <div className="absolute z-50 w-full mt-1 bg-white rounded-xl border border-slate-200 shadow-2xl max-h-60 overflow-y-auto animate-fade-in">
                                {filteredTours.length > 0 ? (
                                    filteredTours.map((tour) => (
                                        <button
                                            key={tour.id}
                                            type="button"
                                            onClick={() => addTour(tour)}
                                            className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between border-b last:border-0 border-slate-100 transition-colors"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-900 truncate">{tour.name}</p>
                                                <p className="text-xs text-slate-500">ID: {tour.id} • {tour.days} days • {tour.destination.name}</p>
                                            </div>
                                            <FiPlus className="ml-2 text-slate-400" />
                                        </button>
                                    ))
                                ) : (
                                    <div className="px-4 py-3 text-sm text-slate-500 italic">No tours found</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Selected Tours (Compact List) */}
                    {data.items.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {data.items.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-100 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                    <span className="truncate max-w-[150px]">{item.title}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeTour(index)}
                                        className="hover:text-teal-900 transition-colors"
                                    >
                                        <FiX className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Preview Area - Matches Site Style */}
            <div className={`relative z-10 transition-all duration-300 ${isActive ? 'mt-6 opacity-80 grayscale-[0.2] scale-[0.99]' : 'mt-0 opacity-100 scale-100'}`}>
                {data.title && (
                    <h3 className="text-3xl font-serif mb-10 text-slate-900">
                        {data.title}
                    </h3>
                )}
                {data.items.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {data.items.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="group relative flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                                {/* Tour Image */}
                                <div className="relative aspect-[3/2.1] overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h4 className="font-bold text-base text-white leading-tight drop-shadow-md">
                                            {item.title}
                                        </h4>
                                    </div>
                                </div>
                                {/* Tour Info Bar - Site Aesthetics (Exact match to EmbeddedTours.tsx) */}
                                <div className="bg-[#1a3528] p-2 flex items-center justify-between">
                                    <span className="text-white text-xs font-normal uppercase tracking-widest">
                                        {item.duration}
                                    </span>
                                    <div className="border border-white/50 px-2 py-1 text-white text-[10px] font-normal tracking-widest uppercase group-hover:bg-white group-hover:text-[#1a3528] transition-colors">
                                        View Trip
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : !isActive && (
                    <div className="py-20 text-center bg-white/30 rounded-2xl border-2 border-dashed border-slate-200 transition-all">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm text-teal-200 mb-4 scale-110">
                            <FiMap className="w-7 h-7" />
                        </div>
                        <p className="text-slate-500 font-medium">No tours selected</p>
                        <p className="text-slate-400 text-sm mt-1">Click to search and add tours for this block</p>
                    </div>
                )}
            </div>
        </div>
    );
};
