# API Pagination
1. Implement query parameters:
   - limit
   - offset
2. Add additional response parameters:
   - limit
   - offset
   - total_count

The `limit` option allows you to limit the number of rows returned from a 
query, while `offset` allows you to omit a specified number of rows before the 
beginning of the result set. Using both limit and offset skips both rows as well as limit the rows returned. 
`total_count` allows you to determine the total number of records

Response:
```
{
    'limit': 10,
    'offset': 20,
    'total_count': 50,
    'objects': {...}
}
```

Reference implementation:
1. organization_list (`GET /restapi/v2/organizations`)
2. clean_expenses_get (`GET /restapi/v2/organizations/<org_id>/clean_expenses`)
