import {HomePageOrganizationExpensesResponse} from "./test-data-types";

export const mockHomePageOrganizationExpensesResponse: HomePageOrganizationExpensesResponse = {
    expenses: {
        last_month: {
            total: 5970.95645786637,
            date: 1738367999
        },
        this_month: {
            total: 2626.0737382853936,
            date: 1739543134
        },
        this_month_forecast: {
            total: 5556.88,
            date: 1740787199
        }
    },
    total: 15000,
    pools: [
        {
            id: "7a735f76-29c5-40a8-9b60-8e86813ab6dd",
            purpose: "business_unit",
            name: "Sunflower Inc",
            limit: 15000,
            this_month_expenses: 2626.0737382853936,
            this_month_forecast: 5556.88
        }
    ]
};