import React from "react";

export interface FormattedPriceProps {
    price: number | string | undefined;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    className?: string;
    as?: React.ElementType;
}