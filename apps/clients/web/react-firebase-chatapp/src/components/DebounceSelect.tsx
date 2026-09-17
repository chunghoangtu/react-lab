import { useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { debounce } from "lodash";
import { Avatar, Select, Spin, type SelectProps } from "antd";

type DebounceSelectProps = {
  fetchOptions: (...args: any[]) => Promise<any>;
  debounceTimeout?: number;
  currentOptions?: string[];
} & PropsWithChildren<Omit<SelectProps, "options" | "showSearch">>;

export default function DebounceSelect({
  fetchOptions,
  debounceTimeout = 500,
  currentOptions,
  ...props
}: DebounceSelectProps) {
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = async (value: any) => {
      setOptions([]);
      setIsFetching(true);

      const newOptions = await fetchOptions(value, currentOptions)
      setOptions(newOptions);
      setIsFetching(false);
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, currentOptions]);

  useEffect(() => {
    return () => setOptions([]);
  }, []);

  return (
    <Select
      {...props}
      labelInValue
      showSearch={{
        filterOption: false,
        onSearch: debounceFetcher,
      }}
      notFoundContent={isFetching ? <Spin size='small' /> : null}
      options={options}
      optionRender={(option) => {
        const { label, photoURL } = option.data;
        const optionLabel = String(label ?? "");

        return (
          <>
            <Avatar
              size='small'
              src={photoURL}
            >
              {photoURL ? "" : optionLabel.charAt(0).toUpperCase()}
            </Avatar>
            {` ${optionLabel}`}
          </>
        );
      }}
    />
  );
}
