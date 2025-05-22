FROM mcr.microsoft.com/playwright:v1.51.1

WORKDIR /app

RUN npm install @playwright/test@1.51.1
RUN npm install dotenv@16.4.7

# ✅ This line installs all supported browsers in a platform-safe way
RUN npx playwright install

CMD ["npx", "playwright"]
