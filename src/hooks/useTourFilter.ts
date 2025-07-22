import { makeMultiParam } from "@/utils/utils";

export const useTourFilters = (searchParams: URLSearchParams) => {
    const prices = searchParams.getAll('prices').map(Number);
    const durations = searchParams.getAll('durations').map(Number);
    const seasons = searchParams.getAll('seasons');
    const hotels = searchParams.getAll('hotels');
    const tourTypes = searchParams.getAll('types');
    const destinations = searchParams.getAll('destinations');

    const [minPrice = 0, maxPrice = 20000] = prices;
    const [minDuration = 1, maxDuration = 31] = durations;

    const rangeParams = [];

    if (minPrice > 0 || maxPrice !== 20000) {
        rangeParams.push(`prices[]=${minPrice}`, `prices[]=${maxPrice}`);
    }

    if (minDuration > 1 || maxDuration !== 31) {
        rangeParams.push(`days[]=${minDuration}`, `days[]=${maxDuration}`);
    }

    const additionalParams = [
        ...rangeParams,
        ...makeMultiParam('seasons', seasons),
        ...makeMultiParam('hotels', hotels),
        ...makeMultiParam('types', tourTypes),
        ...makeMultiParam('destinations', destinations)
    ];

    const queryString = additionalParams.join('&');

    return {
        prices,
        durations,
        seasons,
        hotels,
        tourTypes,
        destinations,
        additionalParams,
        queryString
    };
};