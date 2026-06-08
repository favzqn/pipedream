import app from "../../veremark.app.mjs";

export default {
  key: "veremark-list-requests",
  name: "List Background Check Requests",
  description:
    "Returns a ist of background check requests for your Veremark account."
    + " Optionally filter by the status change date. Format: YYYY-MM-DD"
    + " Use **Get Background Check Request** to retrieve full details for a specific request."
    + " [See the documentation](https://api.veremark.com/external/v1/docs/#tag/request/operation/listRequests)",
  version: "0.0.1",
  type: "action",
  annotations: {
    destructiveHint: false,
    openWorldHint: true,
    readOnlyHint: true,
  },
  props: {
    app,
    statusChangeDateFrom: {
      type: "string",
      label: "Status Change Date From",
      description: "Requests that have a status change on or after the submitted date. Format: YYYY-MM-DD",
      optional: true,
    },
  },
  async run({ $ }) {
    const response = await this.app.listRequests({
      $,
      params: {
        status_change_date_from: this.statusChangeDateFrom,
      },
    });

    const results = Array.isArray(response)
      ? response
      : [];

    $.export("$summary", `Retrieved ${results.length} background check request${results.length === 1
      ? ""
      : "s"}`);
    return response;
  },
};
