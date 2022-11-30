import { rest } from "msw";

const handlers = [
  rest.get("http://localhost:8080/v1/articles", async (req, res, ctx) => {
    return res(ctx.json([{ content: "derp derpity derp derp" }]));
  }),
];

export { handlers };
