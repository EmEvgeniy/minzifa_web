import React from 'react';

interface InfoBlockProps {
    title?: string;
    children: React.ReactNode;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ title = "Important", children }) => {
    return (
        <div className="bg-white p-6 rounded-2xl my-8 [&_p]:!m-0 [&_p]:!text-base [&_p]:!leading-relaxed">
            <h4 className="font-bold text-base mb-2 text-[#1a1a1a]">{title}</h4>
            {children}
        </div>
    );
};

export default InfoBlock;
