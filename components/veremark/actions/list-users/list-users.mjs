import app from "../../veremark.app.mjs";

export default {
  key: "veremark-list-users",
  name: "List Users",
  description:
    "Returns all users configured for your Veremark account."
    + " [See the documentation](https://api.veremark.com/external/v1/docs/#tag/user/operation/listUsers)",
  version: "0.0.1",
  type: "action",
  annotations: {
    destructiveHint: false,
    openWorldHint: true,
    readOnlyHint: true,
  },
  props: {
    app,
  },
  async run({ $ }) {
    const users = await this.app.listUsers({
      $,
    });
    $.export("$summary", `Found ${users.length} user${users.length === 1
      ? ""
      : "s"}`);
    return users;
  },
};
