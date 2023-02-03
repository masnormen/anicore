# Features and Stacks

- SWR: React Hooks for Data Fetching, which makes it easy to do pagination and loading state configuration.
- SWR also supports caching to some extend, which makes the experience of prefetching the next pagination feels nice.
- Zustand: In place of Redux, to reduce complexity and time spent, I use Zustand to easily create a universal store value
- Tailwind with clsx and twmerge: To handle Tailwind class conflict and conditional classNames.
- use-debounce: to ensure API fetching is not too frequent while the user types on the search bar
- Website is responsive!
- Dockerfile is also available if you want to build portable docker images