Bun.serve({
  fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    // Normalize the path for the root directory to serve index.html
    if (path === "/" || path === "/index.html") {
      path = "/index.html";
    }

    // Construct the full file path
    const filePath = import.meta.dir + path;

    try {
      // Attempt to serve the file
      const fileResponse = Bun.file(filePath);

      // If the file exists, return it
      return new Response(fileResponse);
    } catch (error) {
      // If the file does not exist or there's another error, return a 404 response
      console.error(`Failed to serve ${filePath}:`, error);
      return new Response("Resource not found", { status: 404 });
    }
  },

  port: 3000,
});
