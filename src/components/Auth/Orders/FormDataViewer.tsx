import React from "react";

export type FormDataValue =
  | string
  | number
  | boolean
  | FormDataValue[]
  | { [key: string]: FormDataValue };

type FormDataViewerProps = {
  data: Record<string, FormDataValue>;
  level?: number;
};

export const FormDataViewer: React.FC<FormDataViewerProps> = ({ data, level = 0 }) => {
  return (
    <div className="flex flex-col gap-2 w-full min-w-0">
      {Object.entries(data).map(([key, value]) => {
        const isSimple =
          typeof value !== "object" || value === null || Array.isArray(value) === false;

        return (
          <div key={key} className="flex flex-col w-full min-w-0">
            {isSimple && typeof value !== "object" ? (
              <div className="flex flex-wrap text-gray-700 w-full min-w-0">
                <span className="font-semibold whitespace-normal break-words">
                  {formatKey(key)}:
                </span>
                <span className="ml-1 text-gray-600 whitespace-pre-wrap break-all text-wrap">
                  {value?.toString()}
                </span>
              </div>
            ) : (
              <>
                <span className="font-semibold text-gray-700 whitespace-normal break-words">
                  {formatKey(key)}:
                </span>
                <div className="ml-3 min-w-0">{renderValue(value, level)}</div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

function renderValue(value: FormDataValue, level: number): React.ReactNode {
  if (Array.isArray(value)) {
    return (
      <div className="flex flex-col gap-2 mt-1 break-words">
        {value.map((item, i) => (
          <div key={i} className="break-words">
            {typeof item === "object" && item !== null ? (
              <FormDataViewer data={item as Record<string, FormDataValue>} level={level + 1} />
            ) : (
              <span className="text-gray-600 whitespace-normal break-words">
                {item?.toString()}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (typeof value === "object" && value !== null) {
    return (
      <div className="ml-2 mt-1 break-words">
        <FormDataViewer data={value as Record<string, FormDataValue>} level={level + 1} />
      </div>
    );
  }

  return (
    <span className="text-gray-600 whitespace-normal break-words">
      {value?.toString()}
    </span>
  );
}

function formatKey(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
