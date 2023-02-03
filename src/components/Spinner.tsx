const Spinner = (): JSX.Element => (
  <div
    className="inline-block h-12 w-12 animate-spin rounded-full border-[6px] border-current border-t-transparent text-white"
    role="status"
    aria-label="loading"
  >
    <span className="sr-only">Loading...</span>
  </div>
);

export default Spinner;
