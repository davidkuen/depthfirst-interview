This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Running the server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Best viewed on Chrome on macOS. I did not test on other browsers for the purpose of this exercise.

## Tech design

Although this is a NextJS app, there's no backend here, and all the API requests are simulated with the `useFakeGETApi` helper hook. Requests artificially take 1 second. All the data is derived from `sample_responses/comments_all.json`.

I did not use a component design system -- everything here is plain React with Tailwind for styling.

For the sake of time, there's some functionality that doesn't actually work, like filtering by date -- while the bar graph days appear to be clickable, they don't actually do anything. Other missing things that I would implement in a real environment: pagination, empty states, error handling.

One UX bug I already noticed is that if you filter on a specific repository, then open an issue detail view, then the underlying page goes back to "All". (That's because we're relying on URL for both filter state and navigating into issues.)

There's more I could've fleshed out with the issue detail view as well, from a product perspective -- such as SLAs, severity, etc. -- which I'm happy to chat more about too.

## Testing

I'm choosing not to include tests in this submission because there isn't that much real logic (so I don't think the tests would be super interesting). I like to lean on snapshot tests (including visual screenshot snapshots) for making sure that rendering happens correctly. I'd write traditional unit tests for more complex UI components (perhaps, say, the `DiffHunkViewer`).

## AI usage

I used AI to generate the example issues and responses.

I also used AI to assist in writing code by writing this in Cursor, although I didn't use "agent mode", and relied on it to complete function bodies rather than write entire components for me.
