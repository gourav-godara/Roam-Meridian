import SearchToolbar from "./SearchToolbar";

function ExploreHeader({ query, onQueryChange, sort, onSortChange, onOpenFilters }) {
  return (
    <SearchToolbar
      query={query}
      onQueryChange={onQueryChange}
      sort={sort}
      onSortChange={onSortChange}
      onOpenFilters={onOpenFilters}
    />
  );
}

export default ExploreHeader;
