import { Page } from "@playwright/test";

import { BasePage } from "../pages/base-page";
import fs from "fs";
import path from "path";

export class MockFunctions extends BasePage {
  constructor(page: Page) {
    super(page, "");
  }

  async dataFromJSON(endpoint: string, jsonFilePath: string): Promise<void> {
    await this.page.route(endpoint, async (route) => {
      const filePath = path.join(__dirname, jsonFilePath);
      const jsonData = fs.readFileSync(filePath, "utf-8");
      const mockResponse = JSON.parse(jsonData);

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockResponse),
      });
    });
  }

}
