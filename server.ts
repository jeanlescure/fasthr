import fastify from 'fastify';
import { PassThrough } from 'stream';

const defaults = {
  dir: process.cwd(),
  port: 3000,
  livePort: 35729,
  address: '0.0.0.0',
  quiet: false,
};

export default async (options) => {
  const {
    dir,
    port,
    livePort,
    address,
    quiet,
  }: any = {
    ...defaults,
    ...options,
  };

  const server = fastify({
    logger: !quiet,
  });

  server.register(require('fastify-static'), {
    root: dir,
  });

  server.addHook('onSend', async (request, reply, payload: any) => {
    if (
      (payload as any).filename
      && (/.html$/).test((payload as any).filename)
    ) {
      let newPayload = '';
      await (
        new Promise(
          resolve => (
            payload as PassThrough
          )
          .on('data', (chunk) => newPayload += chunk)
          .on('finish', resolve)
        )
      );

      newPayload = newPayload.replace(
          '</body>',
          `<script>
          document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
          ':${livePort}/livereload.js?snipver=1"></' + 'script>')
        </script></body>`
      );

      reply.header('content-length', Buffer.from(newPayload).length);

      return newPayload;
    }

    return payload;
  });

  try {
    await server.listen(port, address, () => {
      console.log(`🔥 Fast Hot Reload is running on http://${address}:${port}`);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
