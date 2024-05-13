import { FiSearch } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface searchBarprops {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<searchBarprops> = ({ onSubmit }) => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!query.trim()) {
      return toast.error("Please enter search term!");
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button className={css.button} type="submit">
          <FiSearch size="16px" />
        </button>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
        <Toaster />
      </form>
    </header>
  );
};

export default SearchBar;
