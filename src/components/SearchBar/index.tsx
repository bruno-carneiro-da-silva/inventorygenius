import cx from "classnames";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import TextInput from "@/components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { useDebouce } from "@/hooks/debouce";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  children?: React.ReactNode;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, children }) => {
  const methods = useForm();
  const { watch } = methods;
  const searchTerm = watch("search", "");

  const debouncedSearchTerm = useDebouce(searchTerm, 500);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <FormProvider {...methods}>
      <div
        className={cx(
          "bg-white flex-row flex w-full justify-between rounded-md z-0 p-5"
        )}
      >
        <div className="w-4/12">
          <TextInput
            name="search"
            placeholder="Search by using a name, phone number or platform"
            classNameContainer="!p-1"
            icon={<Search />}
            classNameIcon="text-gray-400"
          />
        </div>
        <div className="self-center">{children}</div>
      </div>
    </FormProvider>
  );
};

export default SearchBar;
