# Node.js MCP Client Template

MCP TypeScript SDK 2.0 client template for stdio and Streamable HTTP.

[![][codecov-shield]][codecov-link]
[![][github-action-build-shield]][github-action-build-link]
[![][github-license-shield]][github-license-link]

The demo runs one complete workflow against the paired server:

1. Discover Tools, Resources, and Prompts.
2. Call `search_documents`.
3. Read the selected `kb://documents/{documentId}` Resource.
4. Get `review_document` with the selected document ID.

By default, the stdio example starts `@my-mcp-hub/node-mcp-server`, while the HTTP example connects
to `http://localhost:8401/mcp`. Set `MCP_SERVER_URL` to use another HTTP endpoint, or pass
`StdioDemoOptions` to `runStdioDemo` for another executable.

```bash
npm install
npm run dev
```

The test suite prefers the sibling `node-mcp-server` repository when available, falls back to the
published package in isolated environments, and verifies the same workflow over both transports:

```bash
npm test
npm run build
```

## License

[MIT](LICENSE)

[codecov-link]: https://codecov.io/gh/my-mcp-hub/node-mcp-client
[codecov-shield]: https://img.shields.io/codecov/c/github/my-mcp-hub/node-mcp-client?color=1677FF&labelColor=black&style=flat-square&logo=codecov&logoColor=white
[github-action-build-link]: https://github.com/my-mcp-hub/node-mcp-client/actions/workflows/build.yml
[github-action-build-shield]: https://img.shields.io/github/actions/workflow/status/my-mcp-hub/node-mcp-client/build.yml?branch=main&color=1677FF&label=build&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-license-link]: https://github.com/my-mcp-hub/node-mcp-client/blob/main/LICENSE
[github-license-shield]: https://img.shields.io/github/license/my-mcp-hub/node-mcp-client?color=1677FF&labelColor=black&style=flat-square
