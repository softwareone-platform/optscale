import csv
from datetime import datetime
import io
from typing import List, Dict, Tuple

from clickhouse_connect.driver.external import ExternalData


class ExternalDataConverter:
    def __call__(self, ext_tables: List[Dict]) -> ExternalData:
        return self._convert_external_data(ext_tables)

    @staticmethod
    def _convert_types(types_list: List[Tuple]) -> List[str]:
        return [' '.join(map(str, item)) for item in types_list]

    @staticmethod
    def _dict_to_csv_bytes(ext_data: List[Dict[str, str]],
                           structure: List[Tuple[str, str]]) -> bytes:
        output = io.StringIO(newline='')
        fieldnames = [name for name, _ in structure]
        writer = csv.DictWriter(
            output,
            fieldnames=fieldnames,
            quoting=csv.QUOTE_MINIMAL,
            delimiter=',',
            lineterminator='\n'
        )

        field_types = {name: type_.lower() for name, type_ in structure}

        # fix date format for import
        cleaned_rows = []
        for row in ext_data:
            cleaned_row = row.copy()
            for field, value in row.items():
                if field_types.get(field) == 'date' and value:
                    if isinstance(value, datetime):
                        cleaned_row[field] = value.strftime('%Y-%m-%d')
                    elif isinstance(value, str):
                        cleaned_row[field] = value.split(' ')[0]
            cleaned_rows.append(cleaned_row)
        writer.writeheader()
        writer.writerows(cleaned_rows)
        csv_bytes = output.getvalue().encode('utf-8')
        output.close()
        return csv_bytes

    def _convert_external_data(self, ext_tables: List[Dict]) -> ExternalData:
        ext_data = ExternalData()
        for t in ext_tables:
            structure = t["structure"]
            ext_data.add_file(
                file_name=t["name"],
                structure=self._convert_types(structure),
                data=self._dict_to_csv_bytes(t["data"], structure),
                fmt='CSV',
            )
        return ext_data
