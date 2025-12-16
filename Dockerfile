############################ BUILD BACKEND #############################
FROM node:22-alpine AS build_backend
WORKDIR /burn-link

COPY package.json package-lock.json .
COPY burn-link-backend/package.json burn-link-backend/
COPY burn-link-shared/package.json burn-link-shared/

RUN npm ci

COPY burn-link-backend burn-link-backend
COPY burn-link-shared burn-link-shared

WORKDIR /burn-link/burn-link-backend
RUN npm run build

############################ BUILD FRONTEND #############################
FROM node:22-alpine AS build_frontend
WORKDIR /burn-link

COPY package.json package-lock.json .
COPY burn-link-frontend/package.json burn-link-frontend/
COPY burn-link-shared/package.json burn-link-shared/

RUN npm ci

COPY burn-link-frontend burn-link-frontend
COPY burn-link-shared burn-link-shared

WORKDIR /burn-link/burn-link-frontend
RUN npm run build

############################ TARGET #############################
FROM node:22-alpine AS final

ENV TZ="GMT"
ENV PORT="8080"

WORKDIR /burn-link
COPY package.json package-lock.json burn-link-backend/package.json .
WORKDIR /burn-link/burn-link-backend

RUN npm ci --omit dev

# burn-link-shared, copy also with src folder, cause that is expected in burn-link-backend's tsconfig
COPY --from=build_backend /burn-link/burn-link-backend/dist/burn-link-backend /burn-link/burn-link-backend
COPY --from=build_backend /burn-link/burn-link-backend/dist/burn-link-shared /burn-link/burn-link-shared
COPY --from=build_frontend /burn-link/burn-link-frontend/dist /burn-link/burn-link-frontend/dist
COPY --from=build_frontend /burn-link/burn-link-frontend/public /burn-link/burn-link-frontend/public

CMD ["node", "src/main.js"]
EXPOSE 8080
