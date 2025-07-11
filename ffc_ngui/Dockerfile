# -------- Setup --------
ARG IMAGE=node:22.16.0-alpine3.21

FROM $IMAGE as builder

WORKDIR /usr/src/app

ENV NODE_ENV production

RUN npm install -g pnpm@10.12.1

# -------- UI --------
WORKDIR /usr/src/app/ui
COPY ffc_ngui/ui/package.json ./package.json
COPY ffc_ngui/ui/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY ffc_ngui/ui/ ./
RUN pnpm build && rm -rf node_modules

# -------- Server --------
WORKDIR /usr/src/app/server
COPY ffc_ngui/server/package.json ./package.json
COPY ffc_ngui/server/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY ffc_ngui/server/ ./
RUN ./scripts/prune_node_modules.sh
RUN pnpm compile
RUN chown -R node:node /usr/src/app/

# -------- Final stage --------
FROM $IMAGE

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/ui/ ./ui
COPY --from=builder /usr/src/app/server ./server

EXPOSE 4000

# generate environment variables and run the server
USER node
WORKDIR /usr/src/app/server
COPY --from=builder /usr/src/app/ui/prepare-and-run.sh /
RUN chmod +x /prepare-and-run.sh

CMD [ "/prepare-and-run.sh" ]