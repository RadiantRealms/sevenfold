"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

import { Button } from "@/components/catalyst/button";
import { Heading } from "@/components/catalyst/heading";
import { Input, InputGroup } from "@/components/catalyst/input";
import { Text } from "@/components/catalyst/text";

import { LoadingProgress } from "@/components/common/loading-progress";
import { SearchTable } from "@/components/search/search-table";

import { QueriedPerson } from "@/lib/types";

export default function SearchPage() {
  const [state, setState] = useState<{
    query: string;
    results: QueriedPerson[];
    isLoading: boolean;
    hasSubmitted: boolean;
  }>({
    query: "",
    results: [],
    isLoading: false,
    hasSubmitted: false,
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setState((prevState) => ({ ...prevState, query: value }));
  }

  async function handleSearch() {
    if (!state.query.trim()) return;

    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      hasSubmitted: true,
    }));
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(state.query)}`
      );
      const data = await response.json();

      setState((prevState) => ({
        ...prevState,
        results: data,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Search Error:", error);
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }

  if (state.isLoading)
    return (
      <main>
        <LoadingProgress />
      </main>
    );

  return (
    <main>
      <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Search</Heading>
          <Text>
            You can search by name, age range (adult or child), marital status
            (single, married, or widowed), and household name.
          </Text>
          <div className="mt-4">
            <InputGroup>
              <MagnifyingGlassIcon />
              <Input
                name="search"
                placeholder="Search database&hellip;"
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
            </InputGroup>
          </div>
        </div>
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {state.hasSubmitted && state.results.length > 0 && (
        <SearchTable people={state.results} />
      )}
      {state.hasSubmitted && state.results.length === 0 && (
        <Text className="mt-4">No results found</Text>
      )}
    </main>
  );
}
